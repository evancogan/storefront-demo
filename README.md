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
