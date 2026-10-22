// Free printable worksheets. Each one has its own Kit form so Kit can report
// signups per worksheet. Kit keys subscribers by email address, so someone who
// downloads several worksheets stays a single contact; each extra form just
// gets recorded on that same subscriber.
export interface Worksheet {
  slug: string;       // calculator slug, also used in URLs and tracking
  name: string;       // display name
  kitFormId: string;  // Kit form that redirects to /get/<slug>-worksheet/
  pdf: string;        // file in /public/downloads
  calculatorUrl: string;
  blurb: string;      // one line describing what's on the sheet
}

export const WORKSHEETS: Worksheet[] = [
  {
    slug: "fence-planner",
    name: "Fence Planner",
    kitFormId: "9726432",
    pdf: "/downloads/fence-planner-worksheet.pdf",
    calculatorUrl: "/calculators/fence-planner/",
    blurb: "perimeter, posts, wire and rolls",
  },
  {
    slug: "grain-bin-capacity",
    name: "Grain Bin Capacity",
    kitFormId: "10083062",
    pdf: "/downloads/grain-bin-capacity-worksheet.pdf",
    calculatorUrl: "/calculators/grain-bin-capacity/",
    blurb: "bushels and weight from bin dimensions",
  },
  {
    slug: "pasture-stocking",
    name: "Pasture Stocking",
    kitFormId: "10083066",
    pdf: "/downloads/pasture-stocking-worksheet.pdf",
    calculatorUrl: "/calculators/pasture-stocking/",
    blurb: "grazing days, head capacity and AUMs",
  },
  {
    slug: "bale-yield-planner",
    name: "Bale Yield Planner",
    kitFormId: "10083074",
    pdf: "/downloads/bale-yield-planner-worksheet.pdf",
    calculatorUrl: "/calculators/bale-yield-planner/",
    blurb: "bale count, tonnage and hauling loads",
  },
  {
    slug: "fence-energizer-sizing",
    name: "Fence Energizer Sizing",
    kitFormId: "10083080",
    pdf: "/downloads/fence-energizer-sizing-worksheet.pdf",
    calculatorUrl: "/calculators/fence-energizer-sizing/",
    blurb: "output joules and range rating",
  },
];

export const getWorksheet = (slug: string): Worksheet => {
  const w = WORKSHEETS.find((x) => x.slug === slug);
  if (!w) throw new Error(`Unknown worksheet: ${slug}`);
  return w;
};
