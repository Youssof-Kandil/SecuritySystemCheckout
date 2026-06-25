# Security System Checkout

A single-page bundle builder for Wyze security systems. Pick cameras, a monitoring plan, sensors, and accessories — the live review panel updates in real time and persists your configuration across sessions.

---

## Index

1. [Instructions](#instructions)
2. [Stack](#stack)
3. [Project Structure](#project-structure)
4. [Covered Scenarios](#covered-scenarios)
5. [Limitations](#limitations)

---

## Instructions

**Requirements:** Node 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Build for production:**

```bash
npm run build
npm run preview
```

---

## Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) + [Vite 8](https://vite.dev) | UI framework + build tooling |
| [Zustand 5](https://zustand-demo.pmnd.rs) | Client state with localStorage persistence |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling via `@theme` tokens |
| [Radix UI — Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) | Accessible, animated accordion primitive |
| [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) | SVG → React component imports (`?react`) |

All product data is driven from local JSON files under `src/data/`. No backend required.

---

## Project Structure

```
src/
├── data/
│   ├── cameras.json        # 5 cameras, some with color variants
│   ├── plans.json          # Cam Unlimited monitoring plan
│   ├── sensors.json        # Motion sensor + required Sense Hub
│   └── protection.json     # MicroSD card accessory
│
├── store/
│   └── useStore.js         # Zustand store — quantities, variants, accordion state
│
├── components/
│   ├── common/
│   │   ├── CountStepper.jsx   # Shared quantity stepper (used in cards + review panel)
│   │   └── VariantChip.jsx    # Color/variant selector chip
│   │
│   ├── accordion/
│   │   ├── AccordionStep.jsx  # Radix accordion item — step header + product grid
│   │   └── ProductCard.jsx    # Product card with image, badge, variants, stepper, price
│   │
│   └── review/
│       ├── ReviewPanel.jsx    # Composes the full review sidebar
│       ├── ReviewSection.jsx  # Labelled section group (Cameras, Sensors, etc.)
│       ├── ReviewItem.jsx     # Single line item — thumbnail, stepper, price
│       ├── ReviewShipping.jsx # Static free shipping row
│       ├── ReviewTotals.jsx   # Satisfaction badge, financing pill, totals, savings
│       └── ReviewActions.jsx  # Checkout button + Save for later link
│
├── assets/
│   ├── fonts/              # Gilroy (5 weights) + TT Norms Pro Bold
│   └── ...                 # Product PNGs, stage SVGs, icons
│
├── App.jsx                 # Two-column grid layout shell
├── main.jsx
└── index.css               # Tailwind base + @font-face + @theme design tokens
```

---

## Covered Scenarios

These are good things to try when reviewing the prototype:

**Camera gate**
- Load the page with no cameras selected — the Checkout button is disabled and shows a tooltip on hover: *"Please choose at least 1 camera to continue."*
- Add at least one camera — the button becomes active immediately.

**Variant quantities are independent**
- On the Wyze Cam v4, add 2 White units, then switch to Grey — the stepper resets to 0 (Grey's own count), while White's 2 remain.
- Both White and Grey appear as separate line items in the review panel.
- Switching back to White shows 2 again — no data was lost.

**Required item cannot be removed**
- The Wyze Sense Hub is marked *Required* and ships free. Both the `−` button and the `+` button in the review panel are disabled — it cannot be removed or changed.
- Calling `decrement('wyze-sense-hub')` directly in the store also floors at 1.

**Review panel stays in sync**
- Incrementing or decrementing a camera in the accordion card updates the count and total in the review panel instantly (and vice versa — the same Zustand key drives both steppers).

**Totals update live**
- As quantities change, `activeTotal`, `compareAtTotal`, savings, and the financing pill all recalculate on every render.

**Session persistence**
- Configure a system, close the tab, reopen — quantities and active variants are restored from `localStorage`. The accordion always reopens on Step 1 (cameras).
- Click *Save my system for later* — a confirmation alert fires (state is already auto-saved on every change).

**Odd-count product grids**
- Steps with an odd number of products (e.g. 5 cameras) center the last card at `sm:` breakpoint and up; on mobile it is full-width like every other card.

**Accordion navigation**
- Each step ends with a *Next: …* button that advances to the following step.
- Clicking an open step's header collapses it; clicking a closed step opens it and closes the previous one.
- The *N selected* badge is visible on all steps whenever at least one product is chosen.

---

## Limitations

> Images are low quality as they are basically sourced from the Figma at the existing quality. Didn't put much time into getting high-quality images or mapping them from Figma at a higher quality
> didn't add more products or plans, as I focused most on the functionality and Figma accuracy.
> Some counters were grey, which hinted they were disabled, but this was not mentioned in the take-home description, as far as I remember reading, so I made them accurate to Figma but didn't define maximum stock or whatever. They are just grey; they do not disable
> didnt implement the backend, but added separate JSONs to simulate the responses from different endpoints.
> added the " let's start text everywhere, even though they were not mentioned in the bigger screens, for consistency's sake
> I chose the horizontal layout for the product cards from the design and continued with it throughout the whole implementation. So, vertical implementation of camera cards was not implemented. It would not have made sense to force vertical alignment when the screen was smaller, so I stuck with this implementation for UX sake
