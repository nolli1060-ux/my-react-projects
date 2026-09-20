# Addis Eats Day 34 Profile

## Before

The existing application was profiled during the "add dish" interaction using the React DevTools Profiler workflow from the module:

1. Record a profile while doing the slow interaction.
2. Find the component with the longest bar.
3. Ask why it rendered.
4. Apply the smallest fix.
5. Record again and compare.

No measured before/after timings were supplied by the module or available from this project archive, so this file does not invent timing values.

## Change made

The menu search state remains inside `Menu`, where it is owned by the component that uses it. This follows the module's "move state down" guidance before adding memoisation.

The cart also continues to use narrow Zustand selectors, so consumers subscribe only to the values they read.

## Verification

Use React DevTools Profiler to record the interaction after running the app. Compare the render duration and the components that render before and after the change.

The module specifically recommends measuring first and removing any optimisation that does not produce a measurable improvement.
