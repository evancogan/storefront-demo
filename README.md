# Storefront Demo

An online storefront demo built with React and TypeScript. It was created from `react-demo-template`, so it starts with the same setup, checks and agent workflow.

## How changes get in

- Every change is small and starts as an issue that says what "done" means.
- Every change goes through a pull request on its own branch.
- CI runs lint, tests and a build on every pull request. Nothing merges unless it passes.
- I read every diff before merging, whether I wrote it or an AI agent did.

# What I've learned

These are questions asked while learning about mutation testing, with the answers given at the time. The answers come from general knowledge of Stryker, not from its current docs or a trial run, so check them before relying on them.

## Questions and answers

_Do the tests in a pull request have to pass in CI, and is writing them enforced?_

Tests that are real do. CI runs `npm test` on every PR, and `AGENTS.md` requires `npm run check` to pass. Every issue is to list that CI passes. Writing tests is not enforced. A PR with no tests can still pass on CI, and the "tests cover the change" checklist item is self-reported.

_Can the new tests themselves be tested?_

They can, this is actually the primary goal of mutation testing. "Who tests the testers?" asks us who is checking and ensuring the tests are actually testing? This is even more important than ever in a post-AI computer science field. (Society of Research Software Engineering, 2025) Fail-before, pass-after runs the new tests against `main`'s code, where they should fail, then against the pull request's code. It is weak for new files, because the tests fail only because the code is missing

_What is mutation testing?_

Mutation testing changes the code in small ways to check if a test fails for each change. The changes are small, one-at-a-time source changes such as `+` to `-`, `>` to `>=`, `true` to `false` or a number to `0`, and runs the tests for each. The altered tests are called **mutants** and it's a good thing to check for them and have them removed.

_What is Stryker?_

The best-known open-source mutation testing tool for JavaScript and TypeScript (StrykerJS, packages under `@stryker-mutator/`). The core package generates mutants and reports results. A test runner plugin, `@stryker-mutator/vitest-runner` for us, runs the tests for each mutant. It prints a terminal summary, can write an HTML report that shows each survivor as a diff, takes a small config file, and has an incremental mode that reruns only the mutants affected by changed code. Whether current versions work with Vitest 5 and TypeScript 6 has not been checked.

_How is mutation testing different from TDD?_

Both prove a test can fail, but they break different things at different times. In red to green, you write a test first and watch it fail because the code doesn't exist yet, then write the code that turns it green. The test stays as written and the code changes. In mutation testing the order is green, red, green: the code and tests already pass, the tool breaks the code (not the test) in a small way, the test should go red, and the tool restores the code. So it isn't breaking the new test; it is breaking the code the test is supposed to protect. TDD is a habit the author follows once per behavior, and nothing enforces it. Mutation testing is automatic, runs after the fact, and tries many variations of every line. It catches tests that were red for the wrong reason, and code added after the test went green that nothing checks. They work together. Neither checks that the code does what the issue asked.

# Findings

<!-- Findings from trying mutation testing (ADR 0014) go here. -->

# Citations and Further Resources

Society of Research Software Engineering. (2025, February 24). Mutation testing: Who tests the testers? [Video]. YouTube. https://www.youtube.com/watch?v=uoxT2pRenQs
‌
