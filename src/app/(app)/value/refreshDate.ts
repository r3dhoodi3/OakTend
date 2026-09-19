// The one place the "You can refresh again on ..." date is spelled.
//
// Shared by the server action (which builds that line when the 30-day floor is
// still holding) and the client button (which builds it from the ISO date the
// page hands down), so the two can never print the same instant differently.
// A plain module rather than a helper inside either of them: actions.ts is a
// "use server" file, which may only export async functions, and a non-component
// export from a "use client" file is a client reference on the server.
//
// Fixed locale AND time zone on purpose. toLocaleDateString reads the runtime's
// own, so the server render and the hydrated client render of the same
// timestamp could disagree and React would flag a hydration mismatch.
// Pacific time because the launch market is Orange County: in UTC the printed
// day runs one ahead of the homeowner's own calendar every evening.
export function formatRefreshDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  });
}
