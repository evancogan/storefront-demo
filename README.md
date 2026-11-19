# Storefront Demo

An online storefront demo built with React and TypeScript. It was created from `react-demo-template`, so it starts with the same setup, checks and agent workflow.

## How changes get in

- Every change is small and starts as an issue that says what "done" means.
- Every change goes through a pull request on its own branch.
- CI runs lint, tests and a build on every pull request. Nothing merges unless it passes.
- I read every diff before merging, whether I wrote it or an AI agent did.

## Status

The repo was just created from the template. The app is still Vite's starter page. The next step is replacing it with the storefront.

## Agent workspace

Agents work in their own clone as `evancogan-agent`, currently a GitHub Codespace. The repo owner reviews and merges every change through pull requests.

## What we learned

These are questions asked while learning about mutation testing, with the answers given at the time. The answers come from general knowledge of Stryker, not from its current docs or a trial run, so check them before relying on them.

### Questions and answers

**Do the tests in a pull request have to pass in CI, and is writing them enforced?**

Tests that exist must pass: CI runs `npm test` on every pull request, `AGENTS.md` requires `npm run check` to pass, and every issue lists "CI passes". Writing tests is not enforced: a pull request with no tests still passes CI, and only the "Tests cover the change" checklist item covers it, which is self-reported.

**Can the new tests themselves be tested?**

Yes, in two ways. Fail-before, pass-after runs the new tests against `main`'s code, where they should fail, then against the pull request's code. It is weak for new files, because the tests fail only because the code is missing. Mutation testing changes the code in small ways and checks that a test fails for each change. It works for new files, so it fits this repo better.

**What is mutation testing?**

A tool makes one small change at a time to the source, such as `+` to `-`, `>` to `>=`, `true` to `false` or a number to `0`, and runs the tests for each. If a test fails, the mutant is killed, which is good. If every test passes, the mutant survived, which points at a weak test. The mutation score is killed mutants divided by total mutants. Some mutants change nothing observable (equivalent mutants) and always survive, so the threshold stays below 100%. It checks that tests catch breaks in the code, not that the code does what the issue asked.

**What is Stryker?**

The best-known open-source mutation testing tool for JavaScript and TypeScript (StrykerJS, packages under `@stryker-mutator/`). The core package generates mutants and reports results. A test runner plugin, `@stryker-mutator/vitest-runner` for us, runs the tests for each mutant. It prints a terminal summary, can write an HTML report that shows each survivor as a diff, takes a small config file, and has an incremental mode that reruns only the mutants affected by changed code. Whether current versions work with Vitest 5 and TypeScript 6 has not been checked.

**How do we adopt it?**

Trial first, on a throwaway branch: install `@stryker-mutator/core` and `@stryker-mutator/vitest-runner`, write a `stryker.config.json` that mutates `src/**/*.ts(x)` without test files, `setupTests.ts` or `main.tsx`, and run `npx stryker run`. Look at compatibility, run time, score, survivors and incremental mode. Then adopt it through small issues: add the packages and config, add a CI workflow that runs on changed files, make the check required in GitHub settings, and move ADR 0014 to `Accepted`.

**How is mutation testing different from TDD?**

Both prove a test can fail, but they break different things at different times. In red to green, you write a test first and watch it fail because the code doesn't exist yet, then write the code that turns it green. The test stays as written and the code changes. In mutation testing the order is green, red, green: the code and tests already pass, the tool breaks the code (not the test) in a small way, the test should go red, and the tool restores the code. So it isn't breaking the new test; it is breaking the code the test is supposed to protect. TDD is a habit the author follows once per behavior, and nothing enforces it. Mutation testing is automatic, runs after the fact, and tries many variations of every line. It catches tests that were red for the wrong reason, and code added after the test went green that nothing checks. They work together. Neither checks that the code does what the issue asked.

### Findings

<!-- Findings from trying mutation testing (ADR 0014) go here. -->
