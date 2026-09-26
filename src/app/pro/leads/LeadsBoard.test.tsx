// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// The board's interactive children reach server actions (ApplyJobButton ->
// ./actions, JobStatusSelect -> the same file), which cannot be imported in a
// test process. Stubs keep this test on the one thing it is about: the sort.
// Stubbed as a real, enabled button (not null) so a test can tell "the card
// still offers the apply control" apart from "the card replaced it".
vi.mock("../ApplyJobButton", () => ({
  default: ({ leadId }: { leadId: string }) => (
    <button type="button" data-testid={`apply-${leadId}`}>
      Apply
    </button>
  ),
}));
vi.mock("../DirectRequestCard", () => ({ default: () => null }));
vi.mock("../JobStatusSelect", () => ({ default: () => null }));
vi.mock("../JobPhotoStrip", () => ({ default: () => null }));
vi.mock("@/components/OpenChatButton", () => ({ default: () => null }));

import LeadsBoard, { type OpenJobVM } from "./LeadsBoard";

// A card carries a lot of resolved display data; only the id and the label
// this test reads have to be real. Every price field went with migration 0172
// (applying is free), and with it the sort that ordered by price.
function job(id: string): OpenJobVM {
  return {
    id,
    categoryLabel: `Job ${id}`,
    city: null,
    severity: null,
    ownershipVerified: false,
    homeownerDisplay: null,
    glanceLine2: "",
    description: null,
    photoUrls: [],
    budgetLabel: null,
    chips: [],
    scope: [],
    hasPlansPermits: false,
    postedAgoLabel: null,
    timingLabel: null,
    applicants: 0,
    conflict: null,
    bigJob: false,
    insuranceRequired: false,
  };
}

// Newest first, the order the server hands over.
const openJobs = [job("a"), job("b"), job("d")];

// Full LeadsBoard props with just the open-jobs list swapped in, for tests
// that only care about one card's own fields (the applicant count, the
// glance line) rather than the sort.
function boardProps(jobs: OpenJobVM[]) {
  return {
    directRequests: [],
    insuranceCurrent: true,
    openJobs: jobs,
    sort: "new",
    hasApplied: false,
    isProMember: false,
    proTrialEligible: false,
    assigned: [],
    pendingApps: [],
    declinedApps: [],
  };
}

function renderBoard(sort: string) {
  return render(
    <LeadsBoard
      directRequests={[]}
      insuranceCurrent={true}
      openJobs={openJobs}
      sort={sort}
      hasApplied={false}
      isProMember={false}
      proTrialEligible={false}
      assigned={[]}
      pendingApps={[]}
      declinedApps={[]}
    />
  );
}

// The rendered order of the open-job cards, read off the category label.
function order(): string[] {
  return screen
    .getAllByText(/^Job [abd]$/)
    .map((el) => el.textContent!.replace("Job ", ""))
    // Each card prints the label twice (a phone glance line and the desktop
    // row), so collapse to one entry per card while keeping the order.
    .filter((id, i, all) => all.indexOf(id) === i);
}

// The "LeadsBoard sort" block (four tests: first paint from the URL, the
// client re-sort, the history write, aria-pressed) and the "member vs aging
// discount labels (0149)" block (four more: the Pro chip, the aging label,
// the "Pro members pay $X" quiet line and its absence) both lived here.
//
// Applying is free as of migration 0172, so there is no price on a card to
// discount, label or sort by - "Cheapest fee" was the only non-default order
// and the board now renders no sort control at all. What survived of those
// rules is pinned in src/lib/leadSort.test.ts (a stale ?sort=fee link still
// has to land on a working board) and in the price-free assertions below.

describe("LeadsBoard: no price anywhere on a card", () => {
  afterEach(() => cleanup());

  it("prints no dollar amount and no sort control", () => {
    render(<LeadsBoard {...boardProps(openJobs)} />);
    expect(document.body.textContent).not.toContain("$");
    // One option is no choice: the control is hidden entirely.
    expect(screen.queryByRole("button", { name: "Newest" })).toBeNull();
    expect(screen.queryByText(/Cheapest fee/)).toBeNull();
  });

  it("offers no route to the retired deposit page", () => {
    const { container } = render(<LeadsBoard {...boardProps(openJobs)} />);
    expect(container.querySelector('a[href*="/pro/billing"]')).toBeNull();
    expect(document.body.textContent).not.toContain("Add funds");
    expect(document.body.textContent).not.toContain("wallet");
  });
});

describe("LeadsBoard: applicant count reads as transparency, not a countdown", () => {
  afterEach(() => cleanup());

  it("shows a neutral, plain-English count", () => {
    render(<LeadsBoard {...boardProps([{ ...job("a"), applicants: 2 }])} />);
    const count = screen.getByText("2 pros have applied");
    expect(count).toBeInTheDocument();
    expect(count).not.toHaveClass("text-red-600");
    expect(screen.queryByText(/spots/i)).not.toBeInTheDocument();
  });

  it("uses singular wording for exactly one applicant", () => {
    render(<LeadsBoard {...boardProps([{ ...job("a"), applicants: 1 }])} />);
    expect(screen.getByText("1 pro has applied")).toBeInTheDocument();
  });

  it("still offers an enabled apply control on a job five pros have applied to", () => {
    render(<LeadsBoard {...boardProps([{ ...job("a"), applicants: 5 }])} />);
    expect(screen.getByText("5 pros have applied")).toBeInTheDocument();
    const apply = screen.getByTestId("apply-a");
    expect(apply).toBeInTheDocument();
    expect(apply).not.toBeDisabled();
    expect(screen.queryByText("Job full")).not.toBeInTheDocument();
  });
});

// CR3#6: the phone-only timing/city line sat at the 12px floor.
describe("LeadsBoard: phone glance line reads at 14px, not 12px", () => {
  afterEach(() => cleanup());

  it("renders glanceLine2 at text-sm, not text-xs", () => {
    render(
      <LeadsBoard
        {...boardProps([{ ...job("a"), glanceLine2: "This week · Anaheim" }])}
      />
    );
    const line = screen.getByText("This week · Anaheim");
    expect(line).toHaveClass("text-sm");
    expect(line).not.toHaveClass("text-xs");
  });
});

// MED-2: HomeView.tsx's "Active jobs" stat links to `${PRO_LEADS_HREF}#your-jobs`
// (the count it shows is computed from the same `assigned` list this section
// renders - see activeCount in page.tsx), so the section that count actually
// describes has to carry that id for the link to land anywhere.
describe("LeadsBoard: Your jobs section carries the #your-jobs anchor", () => {
  afterEach(() => cleanup());

  it("has id=your-jobs on the section rendering the assigned jobs heading", () => {
    render(<LeadsBoard {...boardProps([])} />);
    const heading = screen.getByRole("heading", { name: /Your jobs/ });
    expect(heading.closest("section")).toHaveAttribute("id", "your-jobs");
  });
});
