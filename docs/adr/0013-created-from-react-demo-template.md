# 13. This repo was created from react-demo-template

Date: 2026-11-18
Status: Accepted

## Context

This repo was created from `react-demo-template` on 2026-11-18, and copied its
ADRs 0000 to 0011, its agent run log and its worker service. Those were
written for the template's setup: small local models in a Windows VM, started
from a phone through a small service. Here, agents work in a cloud container
with a shell and GitHub tools. The issue and pull request numbers in ADRs 0001
to 0011, such as #17 or #63, refer to `react-demo-template`, not to this repo.

## Decision

Keep ADRs 0000 to 0011 unchanged as the record of why the setup looks the way
it does, and keep numbering from there. These still apply here:

- 0001 TypeScript 6, 0002 Prettier style, 0003 short AGENTS.md, 0004 pinned
  toolchain, 0005 the issue and review loop, 0006 the pull request checklist,
  and 0009 agents read only what the task needs.
- 0008 for the `evancogan-agent` machine account, but not its token details.

These don't apply, and the files they describe are removed: 0007 (the run log
in `docs/agents/`), 0010 (the worker service in `tools/agent-worker/`) and
0011 (the VM's token scope).

## Consequences

- An agent reading an old ADR knows its issue numbers point at the template,
  and which of its decisions are still live.
- The run log, comparison plan and worker service stay in
  `react-demo-template`'s history.
- A later decision that replaces one of 0001 to 0011 gets a new ADR that
  supersedes it, as usual.
- Revisit if local-model agents are brought into this repo.
