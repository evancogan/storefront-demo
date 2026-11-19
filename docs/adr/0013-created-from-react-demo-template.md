# 13. This repo was created from react-demo-template

Date: 2026-11-19
Status: Accepted

## Context

This repo was created from `react-demo-template` on 2026-11-18, and copied its
ADRs 0000 to 0011, its agent run log, its model comparison plan and its worker
service. Those were written for the template's setup: small local models in a
Windows VM, started from a phone through a small service. This repo keeps that
setup for local-model agents, and agents also work here in a cloud container
with a shell and GitHub tools. The issue and pull request numbers in ADRs 0001
to 0011, such as #17 or #63, refer to `react-demo-template`, not to this repo.
ADR 0012 was written in this repo.

## Decision

Keep ADRs 0000 to 0011 unchanged as the record of why the setup looks the way
it does, and keep numbering from there. All of them still apply here,
including 0007 (the run log in `docs/agents/`), 0010 (the worker service in
`tools/agent-worker/`) and 0011 (the VM's token scope), because the
local-model setup stays.

## Consequences

- An agent reading an old ADR knows its issue numbers point at the template,
  and that its decisions are still live.
- The run log, comparison plan and worker service stay in this repo for the
  local-model agents.
- A later decision that replaces one of 0001 to 0011 gets a new ADR that
  supersedes it, as usual.
- Revisit if the local-model setup is retired. Remove its files and supersede
  0007, 0010 and 0011 then.
