# 14. Check new tests with mutation testing

Date: 2026-11-19
Status: Proposed

## Context

CI runs every test on every pull request, so tests must pass. That doesn't
show a test would catch a bug: a test with no assertion passes forever. Writing
the test first and watching it fail (red to green) proves a test can fail, but
nothing enforces it or checks it afterwards. Running new tests against `main`
doesn't help much here, because most pull requests add new files, and the
tests fail there only because the code is missing.

Mutation testing makes small changes to the code, such as flipping a `>` or
changing a number, and runs the tests for each change. A change no test
notices is a surviving mutant, which points at a weak test. Stryker with its
Vitest runner is the likely tool. We haven't checked it against Vitest 5 and
TypeScript 6.

## Decision

Check new tests with mutation testing in CI, on the source files a pull
request changes. The tool, the score threshold and the CI wiring are not
chosen yet; a later issue tries it and sets them.

## Consequences

- Weak tests are found automatically, not only by the reviewer.
- It adds dev dependencies and CI time, and some mutants survive harmlessly,
  so the threshold has to stay below 100%.
- It checks that tests would catch breaks in the code they run, not that the
  code does what the issue asked. The human review stays the sign-off.
- Revisit after the first trial: if the tool doesn't work with our versions or
  is too slow, write a new ADR that supersedes this one.
