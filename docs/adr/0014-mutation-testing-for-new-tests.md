# 14. Check new tests with mutation testing

Date: 2026-11-19
Status: Accepted

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

Check new tests with mutation testing, using Stryker with its Vitest runner and
TypeScript checker. It runs as part of `npm run check`, so CI and local runs
use the same command, in Stryker's incremental mode so that only mutants
affected by changed code are rerun. The check fails when the mutation score is
below 90%. A later issue adds the packages, the config and the CI cache for
the incremental file. We can change the threshold later with a new ADR.

A local trial and a scratch run on a copy of the repo found that Stryker works
with Vitest 5 and TypeScript 6 (the checker needs `tsconfigFile` set to
`tsconfig.app.json`). They also found that an incremental run reports the score
over all mutants, reusing earlier results for the rest, and exits with code 1
when the score is below the `break` threshold. Of the 28 mutants, 17 counted
toward the score and 11 were compile errors. With the id test in place the
score was 100%. With that test removed, 3 mutants survived and the score was
82%, which a threshold of 80% would have accepted and 90% rejects.

## Consequences

- Weak tests are found automatically, not only by the reviewer.
- It adds dev dependencies and CI time, and some mutants survive harmlessly,
  so the threshold has to stay below 100%. At 90% with 17 scored mutants, one
  survivor is allowed and two fail the check. Each mutant counts for less as
  the code grows, so the number may need to change.
- The score covers the whole run, not each new test, so a weak test can hide
  behind strong ones. The score also cannot see code that has no mutants.
- Incremental mode does not notice changes to dev dependencies or environment
  variables, so an occasional full run (`--force`) may be needed.
- The incremental file, `reports/stryker-incremental.json`, has to survive
  between CI runs, for example in a cache.
- It checks that tests would catch breaks in the code they run, not that the
  code does what the issue asked. The human review stays the sign-off.
- Revisit after the first trial: if the tool doesn't work with our versions or
  is too slow, write a new ADR that supersedes this one.
