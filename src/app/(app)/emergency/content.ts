import { Droplet, Wind, Snowflake, Zap, Toilet, ShowerHead } from "lucide-react";
import type { PanicFlow, PrepKey } from "./PanicCard";

// Six panic flows for the /emergency page. Short sentences, imperative, most
// important action first. Each maps to an existing SERVICE_CATEGORIES value so
// the button under the steps lands in the normal post-a-job flow
// (/contractors?category=...) with the category already picked.
export const FLOWS: PanicFlow[] = [
  {
    key: "burst_pipe",
    icon: Droplet,
    title: "Burst pipe or water everywhere",
    subtitle: "Stop the water first, then deal with the mess.",
    category: "plumbing",
    desc: "Emergency: burst pipe, water everywhere. Need someone today.",
    prepKey: "water_shutoff",
    steps: [
      "Turn off your water main right now. That stops the flooding.",
      "If water is near outlets or your breaker panel, turn off power to that area, but only if you can reach the panel without stepping in water. If you'd have to stand in water, don't, leave it for an electrician.",
      "Move anything valuable or electrical away from the water.",
      "Soak up standing water with towels, a mop, or a wet vac if you have one.",
      "Once the water's off, call a local licensed plumber. Call 911 if anyone is hurt or trapped, if a ceiling is sagging, or if water is reaching wiring you can't shut off.",
    ],
  },
  {
    key: "gas_smell",
    icon: Wind,
    title: "You smell gas",
    subtitle: "Leave first. Call from outside.",
    category: "plumbing",
    desc: "Emergency: gas smell in the home. Needs inspection and repair after the utility company clears it.",
    // No prepKey on purpose (legal review 2026-09-19, N-99): the saved gas
    // shutoff photo must never sit under "Leave the house right now". Nothing
    // on this card should suggest staying inside to operate a shutoff.
    steps: [
      "Leave the house right now and take everyone with you, pets included. Don't stop to pack anything.",
      "On your way out, don't flip any light switches, don't unplug anything, don't light a match, don't use the garage door opener, and don't start a car near the house. Don't use your phone until you're outside and away from the building.",
      "Once you're outside and well away, call 911 or your gas company's 24-hour emergency line. If the smell is strong, you hear hissing, or anyone feels sick, call 911 first.",
      "Don't go back inside for any reason, including to shut off the gas, until the gas company or fire department says it's safe.",
      "Never turn the gas back on yourself. The gas company does that and relights your appliances.",
    ],
  },
  {
    key: "no_heat",
    icon: Snowflake,
    title: "No heat in winter",
    subtitle: "Check the easy stuff first.",
    category: "hvac",
    desc: "Emergency: no heat in winter. Need a pro today.",
    prepKey: "breaker_panel",
    steps: [
      "Never heat your home with an oven, stove, grill, or generator. They can fill the house with carbon monoxide. If a carbon monoxide alarm sounds, or anyone has a headache, dizziness, or nausea, get everyone outside to fresh air and call 911 from outside.",
      "If your hands and the floor are dry and the panel isn't wet, hot, buzzing, or smelling of burning, check the breaker for your furnace or heat pump. If it's tripped, switch it fully off, then back on, once. If it trips again, leave it off and call an electrician.",
      "Check your furnace filter. A clogged filter can shut the whole system down. Swap it if it looks dirty.",
      "Check your thermostat: batteries, and that it's set to heat, above room temperature.",
      "If anyone in the home is very young, elderly, or has a medical condition, or the indoor temperature is dropping toward 50°F, treat this as urgent: call a local licensed heating company today, or call 911 if someone is in danger from the cold.",
    ],
  },
  {
    key: "power_out",
    icon: Zap,
    title: "Power out or breaker keeps tripping",
    subtitle: "Look for danger first, then check the panel.",
    category: "electrical",
    desc: "Emergency: power out or breaker tripping repeatedly. Need an electrician.",
    prepKey: "breaker_panel",
    steps: [
      "Before you touch the panel: if you smell burning, see scorch marks, or the panel is wet, hot, or buzzing, leave it alone and call an electrician, or 911 if you see smoke or fire. Otherwise, with dry hands and a dry floor, check for a tripped breaker. Switch it fully off, then back on, once. If it trips again, leave it off and call an electrician.",
      "Press reset on any GFCI outlets. They're often in kitchens, bathrooms, garages, and outdoors.",
      "Check if your neighbors also lost power. If so, it's a utility outage: call your power company to report it, not a pro.",
      "If you see a downed power line, stay far away, don't touch it or anything it's touching, and call 911 and your power company right away.",
      "If the breaker won't stay reset, or you smell burning, or an outlet is warm or scorched, stop resetting it and call a local licensed electrician.",
    ],
  },
  {
    key: "sewage_backup",
    icon: Toilet,
    title: "Sewage backup or overflowing toilet",
    subtitle: "Stop using water, then protect yourself.",
    category: "plumbing",
    desc: "Emergency: sewage backup or toilet overflow. Need a plumber urgently.",
    steps: [
      "Stop using every drain and toilet in the house right now. Adding more water makes it worse.",
      "Don't open any sewer cap or cleanout yourself. That can release sewage into the house or yard.",
      "Keep kids and pets away from the area. Sewage is a health hazard: don't touch it with bare hands, and wash up if you do.",
      "Open a window or run a fan for ventilation if you can do it without walking through the mess.",
      "Call a local licensed plumber. If it's backing up from more than one drain or spreading fast, treat it as urgent and call now rather than waiting.",
    ],
  },
  {
    key: "water_heater",
    icon: ShowerHead,
    title: "Water heater leaking or dead",
    subtitle: "Cut the water and the fuel, then deal with the puddle.",
    category: "plumbing",
    desc: "Emergency: water heater leaking or not working. Need a plumber today.",
    prepKey: "water_shutoff",
    steps: [
      "If you smell gas, stop, leave the house, and treat it as a gas leak. Otherwise, turn off the water to the tank. The cold water inlet valve sits on top of the water heater; turn it clockwise until it stops. Can't find it or it won't budge? Shut off your water main instead.",
      "Shut off the gas or power to the heater only if you can reach it with dry hands and without stepping in water. Gas unit: turn the gas control knob on the front of the tank to off. Electric unit: turn off the water heater's breaker at your panel. Never touch the unit's wiring.",
      "Don't drain the tank yourself. The water inside can burn badly. Leave that to the plumber.",
      "Move anything valuable away from the water and soak up what you can.",
      "Call a local licensed plumber today. A leaking tank won't fix itself. Call 911 if anyone is hurt, or if water is reaching wiring you can't shut off.",
    ],
  },
];

// Metadata for the three "be ready before it happens" prep slots.
export const PREP_ITEMS: Array<{ key: PrepKey; label: string }> = [
  { key: "water_shutoff", label: "Water main shutoff" },
  { key: "gas_shutoff", label: "Gas shutoff" },
  { key: "breaker_panel", label: "Breaker panel" },
];
