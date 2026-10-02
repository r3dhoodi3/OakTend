import type { Chore } from "@/lib/chores";

// The words on every /guides/how-to/<slug> page. Types, dates, grouping and
// the reminder rule are in src/lib/chores.ts; read the note there first.
//
// SOURCING RULE (same as GUIDE_SOURCES in src/lib/guideExtras.ts): every
// figure, interval and rule on a page comes from a source in that page's
// `sources`, opened on 2026-10-01 unless the entry says otherwise. Steps are
// plain procedure from those sources or the equipment maker; anything nobody
// could source was cut, not guessed. Where a maker and an agency disagree on
// an interval, the page says who says what.
//
// COPY RULES: no em or en dashes, plain words, one fact once. If a longer
// guide already covers something (how hard OC water is, Zone 0, the shutoffs),
// link it in relatedGuides instead of restating it. src/lib/chores.test.ts
// enforces the dash rule, title lengths and source shape.
//
// Written from public agency and manufacturer guidance only. No competitor's
// wording, tables or images were used.

export const CHORES: Chore[] = [
  // ---------------------------------------------------------------- safety
  {
    slug: "test-smoke-and-co-alarms",
    title: "How to test smoke and carbon monoxide alarms",
    metaTitle: "How to test smoke and CO alarms",
    description:
      "Test smoke and carbon monoxide alarms every month, find the manufacture date, and know when the whole alarm needs replacing. For Orange County homes.",
    system: "safety",
    season: "monthly",
    what: "Press the test button on every smoke alarm and carbon monoxide (CO) alarm in the house, keep the batteries fresh, and swap out any alarm that has reached its age limit.",
    whyOC:
      "An alarm only protects you if it still works, and nothing tells you it has quietly failed except a test. California also changed the rules for new alarms: a battery-only smoke alarm sold here must have a sealed battery rated for at least 10 years and show its manufacture date on the device.",
    howOften:
      "Test every alarm once a month. The U.S. Fire Administration says to replace a smoke alarm 10 years after its manufacture date.",
    tools: ["Step stool", "Fresh batteries, if your alarms take them", "Vacuum with a brush attachment"],
    steps: [
      "Tell everyone at home that you are testing, so nobody panics.",
      "Press and hold the test button until the alarm sounds. If your alarms are interconnected, check that the others sound too.",
      "Repeat on every smoke alarm and every CO alarm, on every floor.",
      "Lightly vacuum the vents on each alarm to clear dust.",
      "If an alarm uses a replaceable 9-volt battery, change it at least once a year, and right away if it chirps.",
      "Find the manufacture date printed on each alarm. Replace any smoke alarm 10 years past that date, and any CO alarm at the age its maker gives.",
      "Check coverage: smoke alarms inside each bedroom, outside each sleeping area and on every level; CO alarms on every level and outside sleeping areas.",
    ],
    callAPro:
      "Call a licensed electrician if a hardwired alarm keeps chirping or fails after you replace it, since the wiring or the interconnect may be the problem.",
    safety:
      "The CPSC notes that pressing the test button checks the alarm's circuits, not the accuracy of its CO sensor, which is why age matters. If a CO alarm goes off for real, get everyone outside before you do anything else.",
    relatedGuides: ["/guides/new-homeowner-first-year-orange-county"],
    sources: [
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/",
        label: "U.S. Fire Administration: smoke alarms",
        supports:
          "Test smoke alarms monthly, replace them 10 years from the manufacture date, change 9-volt batteries at least once a year, and where to place them.",
      },
      {
        href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=13114",
        label: "California Health and Safety Code section 13114",
        supports:
          "Battery-only smoke alarms sold in California need a nonreplaceable battery that lasts at least 10 years, and must display the date of manufacture.",
      },
      {
        href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center/Carbon-Monoxide-Questions-and-Answers",
        label: "U.S. Consumer Product Safety Commission: carbon monoxide questions and answers",
        supports:
          "Put CO alarms on every level and outside sleeping areas; the test button checks the circuitry, not the sensor's accuracy.",
      },
      {
        href: "https://ocfa.org/safety-programs/smoke-alarm-home-escape-plan/",
        label: "Orange County Fire Authority: smoke alarms and home escape plan",
        supports:
          "Test smoke alarms once a month and replace the alarm every 10 years. Opened 2026-09-21 for the maintenance checklist.",
      },
    ],
  },
  {
    slug: "test-gfci-outlets",
    title: "How to test GFCI outlets",
    metaTitle: "How to test GFCI outlets",
    description:
      "Test each GFCI outlet once a month with its test and reset buttons, and know what a failed test means. A short how-to for Orange County homeowners.",
    system: "safety",
    season: "monthly",
    what: "A GFCI (ground fault circuit interrupter) outlet cuts the power almost instantly when current leaks where it should not, such as through a person. Its built-in test and reset buttons tell you whether it still does that.",
    whyOC:
      "GFCIs guard the places where power and water meet: kitchens, bathrooms, laundry sinks, garages and outdoor outlets. A GFCI that has failed still looks and works like a normal outlet, so the only way to know is to test it. In an older house, some of those spots may have no GFCI at all, because the requirement arrived room by room between 1973 and 2005.",
    howOften:
      "The CPSC says to test every GFCI once a month, after it is installed and after a power failure.",
    tools: ["A small lamp or night light"],
    steps: [
      "Plug a lamp into the GFCI outlet and turn it on.",
      "Press the TEST button. The lamp should go off.",
      "Press the RESET button. The lamp should come back on.",
      "Plug the lamp into any other outlets on the same circuit and repeat, because one GFCI can protect outlets downstream of it.",
      "Do the same at every GFCI: kitchen, bathrooms, laundry, garage and outside.",
      "Write down any outlet that failed either step.",
    ],
    callAPro:
      "If the lamp stays on after you press TEST, the CPSC says the GFCI is not working or was not installed correctly. If it will not reset, it needs replacing. Either way, call a licensed electrician.",
    safety:
      "Treat a GFCI that fails the test as giving no shock protection at all, and keep water and outdoor tools away from it until it is fixed.",
    relatedGuides: ["/guides/orange-county-home-age", "/guides/electrical-panel-upgrade-cost"],
    sources: [
      {
        href: "https://www.cpsc.gov/s3fs-public/099_0.pdf",
        label: "U.S. Consumer Product Safety Commission: GFCI fact sheet",
        supports:
          "Test every GFCI monthly, after installation and after a power failure; the lamp test and what a failed test or failed reset means; when GFCIs became required outdoors (1973), in bathrooms (1975), garages (1978), kitchens (1987) and at laundry and utility sinks (2005).",
      },
    ],
  },
  {
    slug: "check-fire-extinguisher",
    title: "How to check a home fire extinguisher",
    metaTitle: "How to check a home fire extinguisher",
    description:
      "A quick monthly look at your fire extinguisher's gauge, pin and hose, plus when to use it and when to just get out. For Orange County homeowners.",
    system: "safety",
    season: "monthly",
    what: "Give your extinguisher a quick look: pressure, pin, hose, body and where it hangs. It takes a minute and tells you whether it will work when you grab it.",
    whyOC:
      "An extinguisher that has lost pressure, or sits behind the trash cans, is no help in the first seconds of a kitchen or garage fire. The U.S. Fire Administration recommends a multipurpose A-B-C extinguisher for most homes.",
    howOften:
      "Look it over regularly. The U.S. Fire Administration notes some models need shaking every month and others need pressure testing every few years, so check the label on yours.",
    tools: ["Your extinguisher and its label"],
    steps: [
      "Read the pressure gauge, if it has one. The needle should sit in the normal (usually green) band.",
      "Check that the pull pin and its seal are in place.",
      "Look over the can, hose and nozzle for dents, rust, cracks or a blocked opening.",
      "Read the label for your model's shaking or testing schedule, and follow it.",
      "Make sure it hangs where you can reach it quickly, on your way out of the room rather than past the fire.",
      "Replace or recharge it after any use, even a short one, as the label directs.",
    ],
    callAPro:
      "If the gauge reads too high or too low, or the can is damaged, have it recharged by a fire extinguisher service company or replace it. The U.S. Fire Administration notes some models can be recharged and others cannot.",
    safety:
      "Use it only if everyone has been alerted, someone has called the fire department, the fire is small and contained, you are clear of the smoke and you have a way out. Then: pull the pin, aim low at the base of the fire, squeeze the lever slowly and sweep side to side.",
    relatedGuides: [],
    sources: [
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/fire-extinguishers/",
        label: "U.S. Fire Administration: fire extinguishers",
        supports:
          "A-B-C extinguishers for most homes; check pressure gauges and look for damaged, dented or rusted parts; some need monthly shaking and others pressure testing every few years; some can be recharged; the questions to answer before fighting a fire; the PASS method.",
      },
    ],
  },
  {
    slug: "anchor-furniture-and-tvs",
    title: "How to anchor furniture and TVs for earthquakes",
    metaTitle: "How to anchor furniture and TVs",
    description:
      "Strap bookcases, dressers and TVs to wall studs so they stay put in an earthquake and cannot tip onto a child. Steps for Orange County homes.",
    system: "safety",
    season: "yearly",
    what: "Fasten tall or top-heavy furniture, and every TV, to the wall with anti-tip brackets and straps screwed into the studs.",
    whyOC:
      "Orange County sits in earthquake country, and the Earthquake Country Alliance reports that 55 percent of injuries in the 1994 Northridge earthquake came from falling furniture and objects. The same straps prevent the everyday tip-over that the CPSC warns about with dressers and TVs.",
    howOften:
      "Once for each piece, then give the straps a tug when you test your alarms or move furniture.",
    tools: ["Anti-tip furniture and TV strap kit", "Stud finder", "Drill and bits", "Screwdriver"],
    steps: [
      "Start with the pieces near beds, couches and where kids play, plus every TV.",
      "Find a wall stud behind each piece with a stud finder.",
      "Screw the wall bracket into the stud.",
      "Attach the matching bracket to the top back of the furniture or to the TV, per the kit's instructions.",
      "Push the piece back against the wall, connect the strap and snug it up.",
      "Tug on it to make sure it holds.",
      "Move heavy things to low shelves, and hang mirrors and pictures on closed hooks.",
    ],
    callAPro:
      "Ask a handyman to do it if the wall is masonry or you cannot find a stud where the piece sits, or if the item is very heavy, like a gun safe or a large aquarium.",
    safety:
      "Anchor it even if it feels heavy enough to stay put. The CPSC's guidance is to anchor all furniture with drawers, doors or shelves, because pulled-out drawers shift the weight forward.",
    relatedGuides: ["/guides/earthquake-retrofit-orange-county"],
    sources: [
      {
        href: "https://www.anchorit.gov",
        label: "U.S. Consumer Product Safety Commission: Anchor It!",
        supports:
          "Anchor furniture with drawers, doors and shelves to prevent tip-overs; the kit, the steps and the tug test.",
      },
      {
        href: "https://www.earthquakecountry.org/step1/",
        label: "Earthquake Country Alliance: Step 1, secure your space",
        supports:
          "Secure top-heavy furniture to wall studs and TVs with straps; 55 percent of Northridge earthquake injuries came from falling furniture or objects; move heavy items low; hang mirrors and pictures on closed hooks.",
      },
    ],
  },

  {
    slug: "put-out-a-grease-fire",
    title: "How to prevent and put out a stovetop grease fire",
    metaTitle: "How to put out a grease fire",
    description:
      "Cooking is the leading cause of home fires. How to keep a pan from catching, and what to do in the first seconds if it does: lid on, burner off.",
    system: "safety",
    season: "yearly",
    what: "A small fire in a pan on the stove, usually oil or grease that got too hot. Most are preventable, and the right first move puts one out in seconds.",
    whyOC:
      "The U.S. Fire Administration says cooking is by far the leading cause of home fires and home fire injuries, and that the leading factor in cooking fires that spread beyond the pan was equipment left unattended, at 37 percent.",
    howOften:
      "Every time you cook with oil. Walk everyone in the house through the steps once a year, and keep a lid next to the stove.",
    tools: ["A pan lid or baking sheet that fits your largest pan", "An A-B-C fire extinguisher nearby"],
    steps: [
      "Stay with the pan while you fry or sear. If you leave the kitchen, turn the burner off.",
      "Keep the heat moderate. If the oil starts to smoke, it is too hot: turn it down.",
      "Turn pot handles toward the back of the stove so nobody bumps them.",
      "If the pan catches fire, slide the lid or a baking sheet over it to smother the flames.",
      "Turn off the burner and leave the lid on until the pan is completely cool.",
      "Never carry a burning pan, and never pour water on burning grease.",
      "If the fire is not out in seconds or spreads past the pan, get everyone out, close the door behind you and call 911 from outside.",
    ],
    callAPro:
      "Call the fire department for any fire you cannot smother right away. If flames reached the hood or cabinets, have the range and hood checked before you use them again.",
    safety:
      "Water makes burning oil splatter and spread. Our extinguisher how-to covers when it is safe to use one and how.",
    relatedGuides: [],
    sources: [
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/cooking/",
        label: "U.S. Fire Administration: cooking fire safety",
        supports:
          "Cooking is the leading cause of home fires and fire injuries; unattended equipment (37 percent) was the leading factor in nonconfined cooking fires; stand by your pan and turn the burner off if you leave; fires start when the heat is too high; turn handles to the back; cover a burning pan with a lid or baking sheet.",
      },
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/fire-extinguishers/",
        label: "U.S. Fire Administration: fire extinguishers",
        supports: "A-B-C extinguishers for most home fires, and when it is safe to use one.",
      },
    ],
  },

  // ----------------------------------------------------------------- water
  {
    slug: "flush-tank-water-heater",
    title: "How to flush a tank water heater",
    metaTitle: "How to flush a tank water heater",
    description:
      "Drain the sediment out of a gas or electric tank water heater with a garden hose, step by step, and know when to leave an old valve alone.",
    system: "water",
    season: "fall",
    what: "Flushing means running water out of the drain valve at the bottom of the tank until it comes out clear. It washes out the mineral sediment that settles on the tank floor.",
    whyOC:
      "Heating water makes its minerals drop out, and Orange County's water is hard, so tanks here collect sediment faster. Our hard water guide shows how hard your supplier's water is and what scale does to a heater.",
    howOften:
      "At least once a year; the Irvine Ranch Water District recommends yearly. A.O. Smith's manuals call for every 6 months. Follow your own heater's manual.",
    tools: ["Garden hose", "Bucket", "Work gloves", "A flat screwdriver, if the drain valve has a slot"],
    steps: [
      "Electric: switch off the heater's breaker. Gas: turn the gas control to OFF and close the gas shutoff valve on the supply line.",
      "Open a hot water tap in the house and let it run until the water is no longer hot.",
      "Screw a garden hose onto the drain valve near the bottom of the tank and run it to a floor drain or outside, lower than the valve.",
      "Secure the hose so it cannot whip loose.",
      "Open the drain valve and let the water run until it comes out clear.",
      "Close the drain valve and take off the hose.",
      "Refill the tank with a hot tap open so the air escapes. Close that tap once water flows steadily.",
      "Only with the tank full, turn the breaker back on, or turn the gas on and relight as your manual describes.",
    ],
    callAPro:
      "Call a plumber if the drain valve will not open, will not close or keeps dripping afterward, or if the tank itself is leaking. On an old tank that has never been flushed, the valve can clog or fail to reseal, so it can be wiser to leave it and plan for a replacement.",
    safety:
      "The water coming out can be hot enough to burn, so keep hands and pets clear of the hose end. Do not turn the power or gas back on until the tank is full again.",
    relatedGuides: ["/guides/hard-water-orange-county", "/guides/water-heater-replacement-cost"],
    sources: [
      {
        href: "https://assets.aosmith.com/damroot/Original/10004/100349445.pdf",
        label: "A.O. Smith: electric water heater instruction manual, draining and flushing",
        supports:
          "Drain and flush every 6 months; secure the hose; run a hot tap until it is no longer hot; flush until the water runs clean; refill with a hot tap open.",
      },
      {
        href: "https://www.manualslib.com/manual/593645/A-O-Smith-Fvir.html?page=24",
        label: "A.O. Smith: FVIR gas water heater manual, draining and flushing (hosted by ManualsLib)",
        supports: "On a gas heater, close the manual gas shutoff and set the gas control to OFF before draining.",
      },
      {
        href: "https://www.irwd.com/learn/water-quality-report/",
        label: "Irvine Ranch Water District: water quality questions and answers",
        supports:
          "Imported Colorado River and Northern California water is typically hard, and the district recommends flushing the water heater once a year. Opened 2026-09-21.",
      },
    ],
  },
  {
    slug: "test-water-heater-relief-valve",
    title: "How to test a water heater relief valve",
    metaTitle: "How to test a water heater relief valve",
    description:
      "Lift the lever on your water heater's temperature and pressure relief valve once a year to make sure it opens and reseats. What to do if it drips.",
    system: "water",
    season: "yearly",
    what: "The temperature and pressure relief valve (the T&P valve) is the safety valve near the top of the tank. It opens if the water gets too hot or the pressure too high. Testing it means lifting its lever and checking it closes again.",
    whyOC:
      "It is the last line of defense if a thermostat fails. A valve that never gets exercised can stick, and you only find out by testing it. Each valve has a discharge pipe that should run down toward the floor or a drain with nothing blocking the end.",
    howOften:
      "At least once a year, according to A.O. Smith's manual. Do it when you flush the tank.",
    tools: ["Bucket", "Work gloves", "Closed-toe shoes"],
    steps: [
      "Find the valve and follow its discharge pipe to where it ends. Make sure nothing blocks the opening.",
      "Put a bucket under the end of the pipe and make sure nobody is standing near it.",
      "Lift the valve's lever and let it snap back. Do this a few times.",
      "Check that water stops flowing once the lever is down.",
      "Watch the end of the pipe for a few minutes to be sure it is not still dripping.",
    ],
    callAPro:
      "If the valve keeps letting water out after you release the lever, A.O. Smith says to close the cold water supply to the heater and replace the valve. A plumber can do that the same day.",
    safety:
      "The water that comes out can be scalding. Keep your hands and face away from the pipe, and never cap or plug the discharge pipe.",
    relatedGuides: ["/guides/water-heater-replacement-cost"],
    sources: [
      {
        href: "https://assets.aosmith.com/damroot/Original/10004/100349445.pdf",
        label: "A.O. Smith: water heater instruction manual, temperature-pressure relief valve",
        supports:
          "Operate the valve by hand at least once a year; the water may be extremely hot; if it keeps releasing water, close the cold water inlet and replace it; the discharge line ends near the floor or a drain.",
      },
      {
        href: "https://www.manualslib.com/manual/774043/A-O-Smith-Gdhe-50.html?page=47",
        label: "A.O. Smith: GDHE 50 manual (hosted by ManualsLib)",
        supports: "Lift the lever several times until the valve seats properly and operates freely.",
      },
    ],
  },
  {
    slug: "descale-tankless-water-heater",
    title: "How to descale a tankless water heater",
    metaTitle: "How to descale a tankless water heater",
    description:
      "Flush scale out of a tankless water heater with white vinegar through its service valves. Why hard Orange County water makes it a yearly job.",
    system: "water",
    season: "yearly",
    what: "Descaling (also called flushing) means circulating white vinegar through a tankless heater's heat exchanger, through the service valves under the unit, to dissolve mineral scale.",
    whyOC:
      "Noritz says hard water builds scale inside the heat exchanger, which cuts heat transfer and restricts flow. Orange County water is hard, so this is not a job to skip.",
    howOften:
      "At least once a year, according to Rinnai and Noritz, and more often with hard water or heavy use.",
    tools: [
      "Service valve kit on the heater (most installs have one)",
      "Hoses for the service valves",
      "Bucket",
      "4 gallons of undiluted white vinegar",
      "A small submersible pump, if your manual calls for one",
    ],
    steps: [
      "Turn off the power to the heater, and close its gas supply.",
      "Close the cold, hot and main water valves at the unit.",
      "With the hot valve fully closed, slowly unscrew the purge port caps to let the pressure out.",
      "Connect the hoses to the service valves and run the outlet hose into the bucket.",
      "Open the purge ports and circulate the vinegar as your manual directs. Rinnai says this can take up to 45 minutes.",
      "Close the purge ports, take off the hoses and screw the caps back on snug, not overtightened.",
      "Open the water valves, restore gas and power, and run a hot tap until the water flows steadily without air.",
    ],
    callAPro:
      "Call the installer or a plumber if your heater has no service valves (they can add them), if anything leaks, or if error codes come back after a flush.",
    safety:
      "Rinnai says to use only white vinegar and never chemical solutions. Release pressure slowly, and only after the hot valve is shut.",
    relatedGuides: ["/guides/hard-water-orange-county"],
    sources: [
      {
        href: "https://www.rinnai.us/residential/flushing-my-rinnai-tankless-water-heater",
        label: "Rinnai: flushing a Rinnai tankless water heater",
        supports:
          "The flushing steps, 4 gallons of undiluted white vinegar, no chemical solutions, up to 45 minutes.",
      },
      {
        href: "https://www.rinnai.us/residential/faq",
        label: "Rinnai: residential FAQ",
        supports: "Flush a tankless water heater at least once a year.",
      },
      {
        href: "https://noritz.com/faq",
        label: "Noritz: tankless water heater FAQ",
        supports:
          "Flush annually, more often with hard water; scale in the heat exchanger reduces heat transfer and restricts flow.",
      },
    ],
  },
  {
    slug: "check-home-water-pressure",
    title: "How to check your home's water pressure",
    metaTitle: "How to check your home's water pressure",
    description:
      "Screw a gauge onto a hose bib, open the tap and read it. Why 80 psi is the plumbing code limit, and when you need a pressure regulator.",
    system: "water",
    season: "yearly",
    what: "You thread an inexpensive pressure gauge onto an outdoor hose bib or the washing machine's cold tap, open the tap fully and read the number.",
    whyOC:
      "The plumbing code requires a pressure regulator when the street pressure coming into a house is over 80 psi, because pressure that high is hard on fixtures, water heater valves and appliance hoses. A regulator that has worn out can let high pressure through without anyone noticing.",
    howOften:
      "No agency publishes a schedule. Check once when you move in, and again if a toilet runs on its own, faucets drip or your relief valve weeps.",
    tools: ["Water pressure gauge with hose threads"],
    steps: [
      "Make sure no water is running anywhere in the house.",
      "Screw the gauge onto an outdoor hose bib or the washing machine's cold water tap.",
      "Open the tap all the way and read the gauge.",
      "Compare: a water district's guideline puts normal indoor pressure at 45 to 65 psi, and code caps it at 80 psi.",
      "Close the tap and remove the gauge.",
      "If you have a regulator (often a bell-shaped valve where the main line enters the house), note your reading so you can spot it creeping up later.",
    ],
    callAPro:
      "Call a licensed plumber if the reading is over 80 psi, either to install a regulator or to replace a failing one. When a regulator goes in, the code also calls for an expansion tank on the cold water line after it.",
    safety:
      "Leave adjusting or replacing a regulator to a plumber, and keep the expansion tank in mind: the code pairs the two.",
    relatedGuides: ["/guides/slab-leak-signs"],
    sources: [
      {
        href: "https://forms.iapmo.org/email_marketing/codespotlight/2018/Jan4.htm",
        label: "IAPMO: Uniform Plumbing Code section 608.2, excessive water pressure",
        supports:
          "A pressure regulator is required where static pressure exceeds 80 psi and must reduce it to 80 psi or less; an expansion tank goes downstream of the regulator. California's plumbing code is based on the Uniform Plumbing Code.",
      },
      {
        href: "https://www.epa.gov/system/files/documents/2023-08/ws-homes-TRM-1-FreeofLeaksTechSheet.pdf",
        label: "EPA WaterSense: free of leaks technical sheet",
        supports:
          "Attach a gauge to the washing machine cold water faucet or a hose bib, open it fully and take a reading.",
      },
      {
        href: "https://www.padredam.org/135/Water-Pressure",
        label: "Padre Dam Municipal Water District (San Diego County): water pressure",
        supports: "Normal indoor water pressure ranges from 45 to 65 psi; a regulator is required above 80 psi.",
      },
    ],
  },
  {
    slug: "toilet-leak-dye-test",
    title: "How to test a toilet for a silent leak",
    metaTitle: "How to test a toilet for a silent leak",
    description:
      "Put food coloring in the tank, wait 10 minutes and look in the bowl. How to find a silent toilet leak and fix a worn flapper yourself.",
    system: "water",
    season: "yearly",
    what: "A silent toilet leak is water slipping from the tank into the bowl past a worn flapper. You cannot hear it, but a few drops of food coloring will show it.",
    whyOC:
      "The EPA says a worn flapper can silently waste thousands of gallons a year. It shows up only on the water bill, and a new flapper is one of the cheapest plumbing parts in the house.",
    howOften:
      "Once a year, and any time the water bill jumps. The EPA says flappers wear out and should be replaced at least every five years.",
    tools: ["Food coloring or a dye tablet", "A replacement flapper that fits your toilet, if it fails"],
    steps: [
      "Take the lid off the tank.",
      "Add a few drops of food coloring or a dye tablet to the tank water.",
      "Do not flush. Wait 10 minutes.",
      "Look in the bowl. Any color there means the flapper or the flush valve seal is leaking.",
      "Flush right away so the dye does not stain the tank.",
      "To replace the flapper: close the supply valve at the wall, flush to empty the tank, unhook the old flapper and chain, and fit a new one of the same type.",
      "Turn the water back on and repeat the test.",
    ],
    callAPro:
      "If color still reaches the bowl with a new flapper, the flush valve seat may be worn or cracked. A plumber can replace the flush valve or the tank parts.",
    safety:
      "Skip in-tank tablets that contain chlorine: New York City's water department warns they can eat away at the rubber parts that seal the tank.",
    relatedGuides: ["/guides/slab-leak-signs"],
    sources: [
      {
        href: "https://www.epa.gov/watersense/fix-leak-week",
        label: "EPA WaterSense: Fix a Leak Week",
        supports:
          "Color in the bowl after 10 minutes means a leak; flush right after; a worn flapper can silently leak thousands of gallons a year; replace flappers at least every five years.",
      },
      {
        href: "https://www.epa.gov/system/files/documents/2023-08/ws-homes-TRM-1-FreeofLeaksTechSheet.pdf",
        label: "EPA WaterSense: free of leaks technical sheet",
        supports: "Color in the bowl means the flapper or flush valve seal is leaking and needs replacing.",
      },
      {
        href: "https://www.nyc.gov/site/dep/water/detecting-toilet-leaks.page",
        label: "New York City Department of Environmental Protection: detecting toilet leaks",
        supports: "In-tank cleaning products with chlorine can corrode the rubber parts of the flush valve.",
      },
    ],
  },

  // ------------------------------------------------------------------ hvac
  {
    slug: "change-hvac-air-filter",
    title: "How to change your furnace and AC air filter",
    metaTitle: "How to change your HVAC air filter",
    description:
      "Find your furnace or AC filter, pick the right size and MERV rating, and swap it in a few minutes. Plus what to change on smoky Santa Ana days.",
    system: "hvac",
    season: "monthly",
    what: "Your furnace and central AC pull air through one filter, usually in a slot at the furnace or air handler, or behind a return grille in a wall or ceiling. Changing it means swapping in a clean one of the same size.",
    whyOC:
      "A clogged filter chokes airflow, so the system works harder and cools or heats less. Filters matter most here on wildfire smoke days, when the EPA suggests a MERV 13 filter, running the fan on On instead of Auto, and setting the system to recirculate.",
    howOften:
      "ENERGY STAR says to check it every month and change it when it looks dirty, or at least every 3 months.",
    tools: ["New filter in the same size", "Flashlight", "Marker"],
    steps: [
      "Turn the system off at the thermostat.",
      "Find the filter: in a slot at the furnace or air handler, or behind a return grille.",
      "Slide the old filter out and read the size printed on its edge.",
      "Note the airflow arrow on the frame. It points toward the furnace or blower, away from the return grille.",
      "Slide the new filter in with the arrow the same way. It should fit snugly, with no gaps around the edges and no bending.",
      "Write the date on the frame, close the slot or grille and turn the system back on.",
    ],
    callAPro:
      "Ask an HVAC technician before moving to a high-MERV filter on an older system with a 1-inch slot. The Department of Energy notes a thick high-MERV filter can restrict airflow there, and a lower rating may be the better fit.",
    safety:
      "Turn the system off before you open the filter slot so the blower is not pulling in unfiltered air and dust. The EPA notes a filter only cleans the air while the system is running.",
    relatedGuides: ["/guides/santa-ana-wind-wildfire-home-prep", "/guides/hvac-replacement-cost"],
    sources: [
      {
        href: "https://www.energystar.gov/sites/default/files/asset/document/HeatingCoolingGuide%20FINAL_9-4-09_0.pdf",
        label: "ENERGY STAR: a guide to energy-efficient heating and cooling",
        supports:
          "Check the filter every month and change it if it is dirty, or at least every three months; the filter may be in the duct system rather than the equipment.",
      },
      {
        href: "https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home",
        label: "EPA: guide to air cleaners in the home",
        supports:
          "Choose MERV 13 or as high as the system allows; the filter should fit snugly without bending; it filters only while the system runs.",
      },
      {
        href: "https://www.epa.gov/indoor-air-quality-iaq/wildfires-and-indoor-air-quality-iaq",
        label: "EPA: wildfires and indoor air quality",
        supports: "During smoke, use a MERV 13 filter, set the fan to On instead of Auto, and use recirculate.",
      },
      {
        href: "https://www.energy.gov/sites/default/files/2013/11/f5/hvac_guide.pdf",
        label: "U.S. Department of Energy: guide to HVAC system maintenance (Building America)",
        supports: "In older air handlers with 1-inch filter slots, high-MERV 1-inch filters may block airflow.",
      },
    ],
  },
  {
    slug: "clean-ac-condenser",
    title: "How to clean your outdoor AC unit",
    metaTitle: "How to clean your outdoor AC unit",
    description:
      "Clear leaves and debris from the outdoor AC condenser, rinse the coil and straighten bent fins before summer. A short how-to for Orange County homes.",
    system: "hvac",
    season: "spring",
    what: "The outdoor box of a central AC holds the condenser coil, the compressor and a big fan. Cleaning it means clearing debris from around and inside it so it can shed heat.",
    whyOC:
      "The Department of Energy says annual maintenance helps an AC run efficiently and last longer, and that split systems need leaves and debris cleared from the fan, compressor and condenser. Do it in spring, before the hot months, when HVAC companies are still easy to book.",
    howOften: "Once a year in spring, and after a windstorm drops leaves around it.",
    tools: ["Gloves", "Soft brush", "Garden hose with a gentle spray nozzle", "Fin comb"],
    steps: [
      "Turn the AC off at the thermostat, then switch off the outdoor disconnect (the small box on the wall next to the unit) or its breaker.",
      "Pull leaves, grass and trash away from the sides and out of the top grille.",
      "Cut back plants so the unit has open space on every side.",
      "Brush loose dirt off the coil fins gently.",
      "Rinse the coil with a gentle spray from a garden hose. Do not use a pressure washer, which flattens the fins.",
      "Straighten any bent fins with a fin comb.",
      "Let it dry, then turn the power back on.",
    ],
    callAPro:
      "If the unit still runs poorly after cleaning, makes new noises, ices up or blows warm air, the Department of Energy's advice is to hire a certified professional for anything beyond basic maintenance. Refrigerant work needs a licensed technician.",
    safety:
      "Always cut the power at the disconnect before reaching near the fan. The thermostat alone does not make it safe.",
    relatedGuides: ["/guides/hvac-replacement-cost"],
    sources: [
      {
        href: "https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf",
        label: "U.S. Department of Energy: Energy Saver 101, home cooling",
        supports:
          "Annual maintenance improves efficiency and unit life; clear debris and leaves from the fan, compressor and condenser; straighten bent fins with a fin comb; hire a certified professional for more than basic maintenance.",
      },
      {
        href: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
        label: "ENERGY STAR: heating and cooling maintenance checklist",
        supports: "Have cooling checked in spring, before the busy season. Opened 2026-09-21 for the maintenance checklist.",
      },
    ],
  },
  {
    slug: "clear-ac-condensate-drain",
    title: "How to check your AC condensate drain",
    metaTitle: "How to check your AC condensate drain",
    description:
      "Your AC pulls water out of the air, and a clogged drain line can send it into the ceiling. How to check the line and clear a simple clog.",
    system: "hvac",
    season: "spring",
    what: "As it cools, your AC pulls water out of the air. A condensate drain line carries that water from a pan under the indoor coil to the outside or a drain. Algae and dirt can plug it.",
    whyOC:
      "A plugged drain can cause water damage inside the house and raise indoor humidity, and it can breed bacteria and mold, according to ENERGY STAR. In homes with the air handler in the attic, an overflow shows up as a ceiling stain.",
    howOften:
      "Check it at the start of cooling season and once or twice during summer. ENERGY STAR includes the condensate drain in the yearly cooling check.",
    tools: ["Flashlight", "Towels", "A stiff wire or a wet and dry vacuum"],
    steps: [
      "Turn the AC off at the thermostat.",
      "Find the drain line at the indoor unit and follow it to where it ends outside or at a drain.",
      "Look at the pan under the coil, if you can reach it, for standing water, and check nearby for stains.",
      "Clear a clog at the outside end with a stiff wire, or by holding a wet and dry vacuum hose over the end.",
      "Turn the AC back on and, after a while, confirm water drips steadily from the end of the line.",
    ],
    callAPro:
      "If the pan keeps filling, water drips from the unit or the ceiling, or the line plugs again soon after you clear it, have an HVAC technician clean and test the drain and any overflow switch.",
    safety:
      "Turn the system off before working near the indoor unit, and be careful on attic joists: step only on framing, never on the ceiling drywall between them.",
    relatedGuides: ["/guides/hvac-replacement-cost"],
    sources: [
      {
        href: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
        label: "ENERGY STAR: heating and cooling maintenance checklist",
        supports: "Check and inspect the condensate drain on a central AC, furnace or heat pump in cooling mode.",
      },
      {
        href: "https://www.energystar.gov/sites/default/files/asset/document/HeatingCoolingGuide%20FINAL_9-4-09_0.pdf",
        label: "ENERGY STAR: a guide to energy-efficient heating and cooling",
        supports: "A plugged drain can cause water damage, affect indoor humidity and breed bacteria and mold.",
      },
      {
        href: "https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf",
        label: "U.S. Department of Energy: Energy Saver 101, home cooling",
        supports: "Pass a stiff wire through the unit's drain channels occasionally to prevent clogs.",
      },
    ],
  },

  // ------------------------------------------------------------ appliances
  {
    slug: "clean-dryer-vent",
    title: "How to clean a dryer vent",
    metaTitle: "How to clean a dryer vent",
    description:
      "Lint is the leading factor in home dryer fires. Clean the lint screen every load and the vent duct every year, with these steps.",
    system: "appliances",
    season: "yearly",
    what: "Clean the lint screen after every load, and once a year clear the duct that carries hot, damp air from the back of the dryer to the vent outside.",
    whyOC:
      "Lint burns easily, and it builds up where you cannot see it. The U.S. Fire Administration says failure to clean was the leading factor in home clothes dryer fires from 2018 to 2020, at 31 percent.",
    howOften:
      "The U.S. Fire Administration says to clean the lint filter every time you use the dryer and the vent ductwork every year.",
    tools: ["Dryer vent brush kit", "Vacuum with a hose attachment", "Screwdriver or nut driver for the duct clamp"],
    steps: [
      "Clean the lint screen. This one is every load.",
      "Unplug the dryer. For a gas dryer, also close the gas valve behind it.",
      "Pull the dryer out from the wall and loosen the clamp to take off the duct.",
      "Brush and vacuum lint out of the duct, the dryer's outlet and the wall pipe.",
      "Go outside and clear lint from the vent hood. Check that its flap opens freely.",
      "Reattach the duct, push the dryer back without crushing or kinking it, and restore power and gas.",
      "Run the dryer and check that air blows out strongly at the outside vent.",
    ],
    callAPro:
      "Hire a dryer vent cleaning company if the duct runs a long way, goes up through the roof or attic, or clothes still take too long to dry after you clean it. For a gas dryer, a gas smell or a loose gas connection needs a licensed technician.",
    safety:
      "Plug the dryer and washer straight into a wall outlet, never an extension cord, which the U.S. Fire Administration warns against for major appliances.",
    relatedGuides: [],
    sources: [
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/basement-and-garage/",
        label: "U.S. Fire Administration: basement and garage fire safety",
        supports:
          "Clean the lint filter every time you use the dryer and the vent ductwork every year; plug washers and dryers directly into wall outlets.",
      },
      {
        href: "https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/appliance-and-electrical/",
        label: "U.S. Fire Administration: appliance and electrical fire safety",
        supports:
          "Failure to clean (31 percent) was the leading factor in home clothes dryer fires from 2018 to 2020; never use an extension cord with a major appliance.",
      },
    ],
  },
  {
    slug: "clean-bathroom-exhaust-fan",
    title: "How to clean a bathroom exhaust fan",
    metaTitle: "How to clean a bathroom exhaust fan",
    description:
      "A dusty bathroom fan leaves shower steam in the room, and moisture feeds mold. How to clean the fan and check that it actually pulls air.",
    system: "appliances",
    season: "yearly",
    what: "Take the cover off the bathroom fan, clean the dust off the grille and the blades, and check that it still pulls air out of the room.",
    whyOC:
      "The EPA says the key to mold control is moisture control, and its first advice for bathrooms is to run the fan or open a window while showering. A fan clogged with dust moves much less air, so the steam stays in the room.",
    howOften:
      "No agency gives an interval. A yearly cleaning, or whenever the mirror stays fogged long after a shower, keeps it working.",
    tools: ["Step stool", "Vacuum with a brush attachment", "Damp cloth", "Screwdriver, if the cover is screwed on"],
    steps: [
      "Turn the fan off. If the switch is shared with a light, also turn off the breaker for that circuit.",
      "Pull the cover down. Most are held by two spring clips you squeeze together; some have a screw.",
      "Wash the cover in warm soapy water and let it dry.",
      "Vacuum the dust off the fan blades and the housing with the brush attachment.",
      "Put the cover back and turn the fan on.",
      "Hold a square of toilet paper up to the grille. It should be pulled against it. If not, the fan or the duct needs attention.",
    ],
    callAPro:
      "Call an electrician or HVAC contractor if the fan hums but barely moves air, is loud, or is vented into the attic instead of outside.",
    safety:
      "Cut the power before reaching into the housing; the blades and motor are inches from your fingers.",
    relatedGuides: [],
    sources: [
      {
        href: "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home",
        label: "EPA: a brief guide to mold, moisture and your home",
        supports:
          "The key to mold control is moisture control; run the bathroom fan or open the window when showering.",
      },
      {
        href: "https://www.energystar.gov/products/ventilation_fans",
        label: "ENERGY STAR: ventilation fans",
        supports: "Proper ventilation helps control moisture and remove odors.",
      },
    ],
  },

  {
    slug: "fix-jammed-garbage-disposal",
    title: "How to free a jammed garbage disposal",
    metaTitle: "How to free a jammed garbage disposal",
    description:
      "A disposal that hums but will not spin is usually jammed. Free it from under the sink with a hex wrench and the reset button, and keep grease out.",
    system: "appliances",
    season: "yearly",
    what: "When a disposal hums but does not turn, or goes silent, something is wedged between the plate and the grind ring. You can almost always free it from underneath with the small hex wrench that came with it.",
    whyOC:
      "Grease is what OC San, the sewer agency for much of Orange County, asks people to keep out of the drain entirely: it builds up in pipes and leads to clogs and sewer overflows. OC San says one busy household can pour more than a gallon a month down the drain without noticing. Let it cool in a container and put it in the trash.",
    howOften:
      "Only when it jams. Keeping grease, fats and oils out of the sink every day is what keeps it, and the pipes after it, flowing.",
    tools: ["The disposal's hex wrench, or a standard 1/4 inch Allen wrench", "Flashlight", "Tongs or pliers"],
    steps: [
      "Turn the disposal switch off. If you can reach the plug under the sink, unplug it too.",
      "Shine a flashlight into the drain and pull out anything you can see with tongs or pliers, never your hand.",
      "Under the sink, find the hole in the center of the bottom of the unit and fit the hex wrench into it.",
      "Work the wrench back and forth in both directions until it turns a full circle freely.",
      "Let the motor cool. InSinkErator says to allow up to 20 minutes.",
      "Press the small red reset button on the bottom of the unit. If it had tripped, it sits slightly lower than the housing.",
      "Turn on cold water, then the disposal, and check that it spins.",
    ],
    callAPro:
      "Call a plumber if it jams again and again, leaks from the bottom, or the reset button keeps tripping. If several drains back up at once, the problem is past the disposal; our sewer line guide explains what to check.",
    safety:
      "InSinkErator's rule is simple: never put your hand in the disposal, even with the switch off.",
    relatedGuides: ["/guides/sewer-line-orange-county"],
    sources: [
      {
        href: "https://www.insinkerator.com/en-us/support/fixing-a-jammed-garbage-disposal",
        label: "InSinkErator: fixing a jammed garbage disposal",
        supports:
          "Switch off first; the hex wrench or a 1/4 inch Allen wrench in the hole at the bottom; work it back and forth; the red reset button sits lower when tripped; cool for up to 20 minutes; never put your hand in the disposal.",
      },
      {
        href: "https://ocsan.gov/news/the-slippery-truth-about-fats-oils-and-grease/",
        label: "Orange County Sanitation District: the slippery truth about fats, oils and grease",
        supports:
          "Grease builds up in pipes and leads to clogs and overflows; a busy household can pour over a gallon a month into the drain; collect it in a container and put it in the trash once cool.",
      },
    ],
  },
  {
    slug: "recaulk-tub-or-shower",
    title: "How to recaulk a tub or shower",
    metaTitle: "How to recaulk a tub or shower",
    description:
      "Cut out cracked or moldy caulk, clean and dry the joint, and lay a new bead of 100 percent silicone. Why you never caulk over mold.",
    system: "appliances",
    season: "yearly",
    what: "Caulk seals the joint where the tub or shower pan meets the tile or wall. When it cracks, peels or stays black after cleaning, you cut it out and lay a fresh bead.",
    whyOC:
      "A failed bead lets shower water run behind the tile, where it soaks the wall and framing out of sight. The EPA says the key to mold control is moisture control, and this joint is one of the most common ways water gets into a bathroom wall.",
    howOften:
      "No fixed schedule. Look at it when you clean the bathroom, and redo it as soon as it cracks, pulls away or stays moldy after cleaning.",
    tools: [
      "Caulk removal tool or razor scraper",
      "Detergent and a scrub brush",
      "Rubbing alcohol",
      "Painter's tape",
      "100 percent silicone sealant made for kitchens and baths, and a caulk gun",
    ],
    steps: [
      "Cut along both edges of the old bead and pull it all out. Scrape off what is left.",
      "Scrub any mold off the surface with detergent and water.",
      "Wipe the joint with rubbing alcohol and let it dry completely.",
      "Run painter's tape about 1/8 inch from each side of the joint.",
      "Lay one steady bead along the joint without stopping halfway.",
      "Smooth it right away, before the surface skins over.",
      "Pull the tape while the caulk is still wet.",
      "Keep the joint dry and untouched for 24 hours.",
    ],
    callAPro:
      "If the tile or wall feels soft, tiles are loose, or mold keeps coming back after you dry and reseal, water may already be inside the wall. Have a plumber or licensed contractor look for a leak.",
    safety:
      "Do not caulk over mold, which the EPA warns against: clean it off and dry the joint first. Open a window or run the fan while you work.",
    relatedGuides: [],
    sources: [
      {
        href: "https://gesealants.com/projects-howtos/how-to-recaulk-your-bathtub-for-a-fresh-mold-free-finish/",
        label: "GE Sealants: how to recaulk your bathtub",
        supports:
          "Remove the old caulk; tape about 1/8 inch from each side; shape the bead before it skins; avoid touching or wetting the seal for 24 hours; silicone rather than acrylic in wet areas.",
      },
      {
        href: "https://www.epa.gov/mold/what-are-basic-mold-cleanup-steps",
        label: "EPA: what are basic mold cleanup steps?",
        supports: "Scrub mold off hard surfaces with detergent and water and dry completely; do not paint or caulk moldy surfaces.",
      },
      {
        href: "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home",
        label: "EPA: a brief guide to mold, moisture and your home",
        supports: "The key to mold control is moisture control.",
      },
    ],
  },

  // --------------------------------------------------------------- outside
  {
    slug: "clean-gutters",
    title: "How to clean your gutters before the rain",
    metaTitle: "How to clean gutters before the rain",
    description:
      "Clear gutters and downspouts in fall, before the December to March rains in Orange County, and set up the ladder so it cannot slide out.",
    system: "outside",
    season: "fall",
    what: "Scoop leaves and debris out of the gutters, then flush the gutters and downspouts with a hose so rain runs off the roof and away from the house.",
    whyOC:
      "NOAA's 30-year averages for John Wayne Airport put about 8.9 of the year's 11.2 inches of rain in December through March, often in a few heavy storms. A gutter packed with summer leaves overflows against the walls and foundation, and the EPA lists clean gutters and soil that slopes away from the house as basic moisture and mold control. Dry leaves in a gutter are also fuel for embers, which our wildfire guide covers.",
    howOften:
      "At least once a year in the fall, before the first real storm, and again after a Santa Ana wind event drops leaves on the roof.",
    tools: ["Extension ladder in good condition", "Gloves", "Bucket or tarp", "Garden hose"],
    steps: [
      "Check the ladder for damage before you use it.",
      "Set it on firm, level ground at about a 75 degree angle, and have someone hold it if you can.",
      "Scoop debris into a bucket, working toward the downspout.",
      "Move the ladder often. Keep your body between the rails instead of reaching out to the side.",
      "Flush the gutter with the hose and watch the water leave the downspout.",
      "If a downspout is clogged, flush it from the top, or from the bottom upward.",
      "Check that the downspout outlet sends water at least a few feet away from the foundation and toward a drain or the street, not toward a neighbor's wall.",
    ],
    callAPro:
      "Hire a gutter or roofing contractor for a second story, a steep or tile roof you would have to walk on, or gutters that have pulled away from the fascia.",
    safety:
      "The CDC says many ladder injuries happen at home, and about 40 percent of ladder injuries come from the ladder sliding out at the base because it was set at the wrong angle. Do not overreach, and never carry a heavy load up the ladder.",
    relatedGuides: ["/guides/santa-ana-wind-wildfire-home-prep", "/guides/roof-replacement-cost"],
    sources: [
      {
        href: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-1991-2020&stations=USW00093184&format=json&dataTypes=MLY-PRCP-NORMAL",
        label: "NOAA National Centers for Environmental Information: 1991-2020 monthly precipitation normals, John Wayne Airport",
        supports:
          "Normals sum to 11.18 inches a year, 8.89 of it December through March. Fetched 2026-09-25 for the maintenance checklist.",
      },
      {
        href: "https://www.cdc.gov/niosh/falls/ladder/index.html",
        label: "CDC NIOSH: ladder safety",
        supports:
          "Many ladder injuries happen at home; set extension ladders at about a 75 degree angle; slide-outs at the base cause about 40 percent of ladder injuries.",
      },
      {
        href: "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home",
        label: "EPA: a brief guide to mold, moisture and your home",
        supports: "Clean and repair roof gutters regularly, and make sure the ground slopes away from the foundation.",
      },
    ],
  },
  {
    slug: "set-sprinklers-for-rainy-season",
    title: "How to set your sprinklers for the rainy season",
    metaTitle: "How to set sprinklers for the rainy season",
    description:
      "Most Orange County yards need no freeze prep. Turn the timer down for the wet months, pause it when it rains and fix broken heads first.",
    system: "outside",
    season: "fall",
    what: "In colder places, winterizing means draining the lines before they freeze. In most of Orange County it means something simpler: fixing broken heads while the plants still need water, then turning the controller down or off for the wet months.",
    whyOC:
      "Most of the year's rain falls from December through March, and a timer set for August will keep watering through a storm. California's water board has long asked people to pause irrigation during rain and for two days after. The Irvine Ranch Water District publishes a month by month watering schedule you can follow.",
    howOften:
      "Twice a year: in fall before the rains, and again in spring when you turn it back up. Pause it after every real rain.",
    tools: ["Small flags or tape", "Replacement spray heads or nozzles", "Your controller's manual"],
    steps: [
      "Run each zone by hand in daylight and watch every head.",
      "Flag any head that is broken, missing, tilted or buried in the grass.",
      "Look for pooling or a soggy patch where the head meets the pipe. That is a leaking joint.",
      "Turn any head that sprays the driveway, sidewalk or a wall back toward the plants.",
      "Fix or replace the flagged heads.",
      "Lower the run times for fall, then switch the controller to off or rain mode for the wettest months.",
      "After a rain, leave it paused for at least two days.",
    ],
    callAPro:
      "Call an irrigation contractor if a zone will not shut off, a valve leaks, or you cannot find a leak you suspect. If you are replacing the controller anyway, a WaterSense labeled smart controller adjusts to the weather by itself, and our rebates guide lists local rebates.",
    safety:
      "Before digging to reach a buried pipe, find out where gas and electric lines run. Shallow hand digging around a sprinkler head is normally fine; anything deeper is not.",
    relatedGuides: ["/guides/orange-county-home-rebates-2026", "/guides/slab-leak-signs"],
    sources: [
      {
        href: "https://www.epa.gov/watersense/sprinkler-spruce",
        label: "EPA WaterSense: sprinkler spruce-up",
        supports:
          "Flag broken sprinkler heads, check for leaks at the joints, and turn heads that spray driveways, sidewalks or walls toward the landscape.",
      },
      {
        href: "https://www.waterboards.ca.gov/water_issues/programs/conservation_portal/regs/emergency_regulation.html",
        label: "California State Water Resources Control Board: water conservation emergency regulation (archived)",
        supports: "Turn off or pause irrigation while it rains and for two days after rain.",
      },
      {
        href: "https://www.epa.gov/watersense/watersense-labeled-controllers",
        label: "EPA WaterSense: labeled irrigation controllers",
        supports: "WaterSense labeled controllers use local weather and landscape conditions to set watering schedules.",
      },
      {
        href: "https://www.irwd.com/learn/save-water-money/watering-guide/",
        label: "Irvine Ranch Water District: watering guide",
        supports: "The district publishes a month by month irrigation schedule. Opened 2026-09-21.",
      },
      {
        href: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-1991-2020&stations=USW00093184&format=json&dataTypes=MLY-PRCP-NORMAL",
        label: "NOAA National Centers for Environmental Information: 1991-2020 monthly precipitation normals, John Wayne Airport",
        supports: "Most of the year's rain (8.89 of 11.18 inches) falls December through March. Fetched 2026-09-25.",
      },
    ],
  },
  {
    slug: "seal-roof-rat-entry-points",
    title: "How to find and seal roof rat entry points",
    metaTitle: "How to seal roof rat entry points",
    description:
      "Roof rats travel on fences and power lines in Orange County. Find the gaps they use, seal them with the right mesh, and trim branches off the roof.",
    system: "outside",
    season: "yearly",
    what: "Walk around and over the outside of the house looking for the small openings roof rats use to get into attics and walls, then close them with materials rats cannot chew through.",
    whyOC:
      "UC's pest program says roof rats favor warm, coastal climates, and the Orange County Mosquito and Vector Control District says they travel neighborhoods along utility lines and fence tops. Sealing entry points is one of the main things the district asks homeowners to do.",
    howOften:
      "Once a year, and after any roof, vent, solar or cable work that may have opened a gap.",
    tools: [
      "Flashlight",
      "Galvanized hardware cloth, 1/2 inch mesh",
      "Tin snips and work gloves",
      "Steel wool or sheet metal for small gaps",
      "Pruning saw",
    ],
    steps: [
      "At dusk, watch fence tops and utility lines near the house for rats on the move.",
      "In daylight, check the roofline, eaves, attic vents and where the roof meets the walls for gaps and torn screens.",
      "Check where pipes, wires, cables and AC lines go through the walls.",
      "Seal any opening larger than 1/4 inch with steel wool, wire screen or sheet metal.",
      "Cover vents with 1/2 inch galvanized hardware cloth. Skip chicken wire; rats get through it.",
      "Prune tree limbs to at least 3 feet from the roof, and pull vines off the walls.",
      "Bring pet food in at night and keep birdseed and fallen fruit picked up.",
    ],
    callAPro:
      "Call a pest control company if you hear scratching in the attic or find droppings inside. The Orange County Mosquito and Vector Control District also answers questions about rats and can tell you what it offers in your area.",
    safety:
      "Do not sweep or vacuum droppings. The CDC says to wear rubber or plastic gloves, soak them with a mix of 1 1/2 cups of bleach in a gallon of water (or an EPA-registered disinfectant) for 5 minutes, then wipe them up.",
    relatedGuides: ["/guides/termites-orange-county"],
    sources: [
      {
        href: "https://ipm.ucanr.edu/home-and-landscape/rats/",
        label: "UC IPM Pest Notes: Rats (updated June 2025)",
        supports:
          "Roof rats prefer warm and coastal climates; seal openings larger than 1/4 inch with steel wool, wire screen or sheet metal; use 1/2 inch galvanized mesh on vents, not chicken wire; prune limbs within 3 feet of a roof; rats travel utility lines and fence tops at dusk.",
      },
      {
        href: "https://www.ocvector.org/rats",
        label: "Orange County Mosquito and Vector Control District: rats",
        supports: "Roof rats use utility lines and fences to move around; identify and seal entry points.",
      },
      {
        href: "https://www.cdc.gov/healthy-pets/rodent-control/clean-up.html",
        label: "CDC: how to clean up after rodents",
        supports:
          "Do not sweep or vacuum droppings; wear rubber or plastic gloves; 1.5 cups of bleach per gallon of water; soak for 5 minutes.",
      },
    ],
  },
];
