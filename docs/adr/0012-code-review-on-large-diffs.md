# 12. Run automated code review on large diffs

Date: 2026-11-18
Status: Accepted

## Context

The repo owner reviews every pull request against its issue, and that review
is the sign-off (ADR 0005, ADR 0006). Automated review with `/code-review`
catches things a human reviewer can miss, such as edge cases and tests that
don't test what they claim. But it's the same model reviewing its own work,
so it can't catch a misread spec, and on small diffs it costs more than it
finds. Pull request #2, a 10-line text change, needed nothing beyond the
human's review.

## Decision

Before opening a pull request whose diff changes more than 100 lines, not
counting `package-lock.json` or Markdown files, the agent runs `/code-review`,
fixes what it finds or says why not, and lists the findings in the
description. The pull request template has a checklist item for it, so the
`description` check requires every pull request to tick it or give a reason.

## Consequences

- Large diffs reach the reviewer with the obvious slips already fixed, and
  the findings are on the record.
- CI confirms the item was answered, not that a review ran. The listed
  findings are the evidence; judging them stays with the reviewer.
- The human's review stays the sign-off. Automated review never replaces it.
- Revisit the 100-line limit after a few large pull requests: lower it if
  reviews keep finding real bugs, raise it if they find nothing.
