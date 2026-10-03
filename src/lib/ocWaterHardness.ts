// Tap water hardness by Orange County water provider: the data behind
// /guides/orange-county-water-hardness-by-provider.
//
// WHERE EVERY NUMBER COMES FROM. Each row was read out of that provider's own
// annual water quality report (Consumer Confidence Report) on 2026-10-02, from
// the "Hardness, total" rows of its tables. All of them report 2025 sampling.
// Every report printed hardness both as calcium carbonate in mg/L (ppm) and in
// grains per gallon, so nothing here is converted by us: both numbers are the
// report's own. The link for each row is in GUIDE_SOURCES
// (src/lib/guideExtras.ts) with the figures written beside it.
//
//   mgL / gpg   The average the report printed for that source.
//   rangeMgL    The low and high readings the report printed. Where a report
//               has one table for several sources (Anaheim, Huntington Beach,
//               Irvine Ranch, Tustin), the range spans all of them, imported
//               water included.
//
// Only providers whose report we opened are listed. City of Orange's own site
// blocked automated reads, so its row comes from the copy of its report filed
// with the State Water Resources Control Board. Moulton Niguel, Fullerton and
// the other providers are not here because their 2026 report was not opened.
//
// Metropolitan Water District's treated imported water is not a row: it is
// the same water in every report that prints it, so the guide states it once.
//
// WHEN THE NEXT REPORTS COME OUT (each July): re-open every report, replace
// every row in one change, and bump dateModified in src/lib/guides.ts.

export type HardnessReading = {
  /** What the report calls this water, in plain words. */
  source: string;
  /** Average, mg/L as calcium carbonate (same number as ppm). */
  mgL: number;
  /** Average, grains per gallon, as printed. */
  gpg: number;
};

export type HardnessProvider = {
  provider: string;
  readings: HardnessReading[];
  /** Low and high reading printed, mg/L. */
  rangeMgL: [number, number];
  /** One short plain-language note, or none. */
  note?: string;
  /** The report's name as printed, and the year of the sampling it reports. */
  report: string;
  href: string;
};

// Alphabetical by provider.
export const OC_WATER_HARDNESS: HardnessProvider[] = [
  {
    provider: "Anaheim Public Utilities",
    readings: [
      { source: "Groundwater", mgL: 316, gpg: 18 },
      { source: "Imported water treated at the Lenain plant", mgL: 298, gpg: 17 },
    ],
    rangeMgL: [162, 431],
    note: "Groundwater served over 80 percent of customers in 2025.",
    report: "2026 Water Quality Report",
    href: "https://www.anaheim.net/DocumentCenter/View/70594/2026-Water-Quality-Report",
  },
  {
    provider: "City of Fountain Valley",
    readings: [{ source: "Local groundwater", mgL: 217, gpg: 13 }],
    rangeMgL: [171, 256],
    note: "The city did not import any water in 2025.",
    report: "2026 Water Quality Report",
    href: "https://www.fountainvalley.gov/DocumentCenter/View/24438",
  },
  {
    provider: "City of Garden Grove",
    readings: [{ source: "Groundwater", mgL: 303, gpg: 18 }],
    rangeMgL: [187, 346],
    report: "2026 Water Quality Report",
    href: "https://ggcity.org/sites/default/files/garden-grove-2026-wq-report-english-web_0.pdf",
  },
  {
    provider: "Golden State Water, Cowan Heights system",
    readings: [{ source: "Source water", mgL: 236, gpg: 13.8 }],
    rangeMgL: [191, 280],
    report: "2026 Annual Water Quality Report",
    href: "https://www.gswater.com/sites/main/files/file-attachments/water-quality-cowan-heights.pdf",
  },
  {
    provider: "Golden State Water, Placentia-Yorba Linda system",
    readings: [{ source: "Source water", mgL: 188, gpg: 11.0 }],
    rangeMgL: [67.1, 299],
    report: "2026 Annual Water Quality Report",
    href: "https://www.gswater.com/sites/main/files/file-attachments/water-quality-placentia-yorba-linda.pdf",
  },
  {
    provider: "Golden State Water, West Orange County system",
    readings: [{ source: "Source water", mgL: 237, gpg: 13.8 }],
    rangeMgL: [62.9, 369],
    report: "2026 Annual Water Quality Report",
    href: "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },
  {
    provider: "City of Huntington Beach",
    readings: [{ source: "Groundwater", mgL: 162, gpg: 10 }],
    rangeMgL: [58.9, 280],
    note: "About 85 percent groundwater and 15 percent imported water in 2025.",
    report: "Water Quality Report, reporting year 2025",
    href: "https://www.huntingtonbeachca.gov/Documents/Departments/Utilities/Drinking%20Water%20Quality/Water%20Quality%20Report%20CCR%20HuntingtonBeach2026FINAL.pdf",
  },
  {
    provider: "Irvine Ranch Water District",
    readings: [
      { source: "Local groundwater", mgL: 214, gpg: 12.5 },
      { source: "Local surface water", mgL: 293, gpg: 17.1 },
    ],
    rangeMgL: [52.0, 469],
    report: "2026 Water Quality Report",
    href: "https://publications.irwd.com/view/967451735",
  },
  {
    provider: "Mesa Water District",
    readings: [{ source: "Groundwater", mgL: 113, gpg: 6.6 }],
    rangeMgL: [20.6, 293],
    note: "All local groundwater.",
    report: "2026 Consumer Confidence Report",
    href: "https://www.mesawater.org/sites/default/files/2026-06/final2026consumerconfidencereport.pdf",
  },
  {
    provider: "City of Newport Beach",
    readings: [{ source: "Groundwater", mgL: 232, gpg: 14 }],
    rangeMgL: [47.5, 475],
    note: "About 85 percent groundwater and 15 percent imported water.",
    report: "2026 Annual Water Quality Report",
    href: "https://www.newportbeachca.gov/home/showpublisheddocument/78695/639150596746970000",
  },
  {
    provider: "City of Orange",
    readings: [{ source: "All sources", mgL: 300, gpg: 18 }],
    rangeMgL: [130, 380],
    report: "Consumer Confidence Report 2025",
    href: "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010027&Year=2025&isCert=false",
  },
  {
    provider: "City of Santa Ana",
    readings: [{ source: "Groundwater", mgL: 239, gpg: 14 }],
    rangeMgL: [130, 307],
    note: "About 85 percent groundwater and 15 percent imported water.",
    report: "2025 Water Quality Tables",
    href: "https://santaanaccr.org/wp-content/uploads/2026/06/sa_ccr_2025_WQ_tables.pdf",
  },
  {
    provider: "Santa Margarita Water District",
    readings: [{ source: "Water delivered", mgL: 256, gpg: 15 }],
    rangeMgL: [210, 300],
    note: "Imported water, part of it treated at Irvine Ranch Water District's Baker plant.",
    report: "2026 Water Quality Report",
    href: "https://smwd.com/DocumentCenter/View/6349/2026-Water-Quality-Report",
  },
  {
    provider: "City of Tustin",
    readings: [
      { source: "City groundwater", mgL: 377, gpg: 22 },
      { source: "East Orange County Water District groundwater", mgL: 333, gpg: 20 },
    ],
    rangeMgL: [133, 609],
    report: "2026 Annual Report, reporting year 2025",
    href: "https://www.tustinca.org/DocumentCenter/View/20391",
  },
];

// Metropolitan Water District's treated imported water, which most of the
// providers above buy some of. Huntington Beach, Irvine Ranch, Santa Ana
// (Diemer plant) and Tustin printed 236 mg/L; Santa Ana's Weymouth plant 234
// and Anaheim 235. All printed 14 grains per gallon, Irvine Ranch 13.8.
export const MWD_IMPORTED = { mgLLow: 234, mgLHigh: 236, gpg: 14 };

// The conversion every report that explains it prints: one grain per gallon
// is 17.1 mg/L of hardness.
export const MG_L_PER_GRAIN = 17.1;

// Low and high reading as words for the page. JavaScript drops a trailing
// zero (Irvine Ranch printed 52.0), which does not change the value.
export function formatRange([low, high]: [number, number]): string {
  return `${low} to ${high}`;
}
