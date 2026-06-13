---
name: design-pattern
description: On-demand. Analyze a file, feature, or selection and propose + apply a design pattern (Strategy, Factory, Adapter, Repository, Observer, Command, Decorator, etc.) — ONLY if the code's actual complexity warrants it. Refuses to apply patterns when YAGNI applies.
---

# design-pattern

The user invoked this skill. They want you to evaluate a piece of code for design-pattern opportunities and, if justified, apply one.

## Process

1. **Read the target** the user pointed at. If they didn't point at anything specific, ask: "Which file or feature?"
2. **Identify the actual pain.** Don't pattern-match on surface syntax. Look for:
   - **Strategy** — multi-branch `if`/`switch` over a type/mode where each branch has non-trivial logic AND new branches will be added.
   - **Factory** — repeated, conditional construction of objects of the same family across the codebase.
   - **Adapter** — code is tightly coupled to a third-party API shape and you want to swap it OR isolate it for testing.
   - **Repository** — direct DB/HTTP calls scattered through application/presentation layers (in this project, this is **already the convention** — flag any violation).
   - **Observer / EventEmitter** — multiple unrelated subsystems need to react to the same event.
   - **Command** — actions need to be undoable, queueable, or logged uniformly.
   - **Decorator** — orthogonal cross-cutting behavior (logging, caching, retry) wrapping a core operation.
   - **Builder** — object construction with many optional fields where order matters.
   - **State** — an object's behavior changes based on internal state and the state transitions are non-trivial.
3. **Apply the YAGNI test.** Refuse if:
   - There's only ONE current variant/branch (pattern adds indirection for no benefit).
   - The duplication is < 3 instances (rule of three).
   - The "future flexibility" is hypothetical, not requested.
   - The pattern would make the code harder to read for a 2-person team.
     Say so explicitly: "No pattern needed here because X."
4. **If justified**, explain in 2–4 sentences: pattern name, what problem it solves _in this code_, and the trade-off (what you give up). Then implement.
5. **Respect the architecture.** This project uses Clean Architecture (see `AGENTS.md`). Patterns must fit the right layer:
   - Repository, Adapter → `infrastructure/`
   - Strategy, Command, State → usually `domain/` or `application/`
   - Factory, Builder → wherever the constructed object lives
   - Observer → `shared/infrastructure/` or `application/`

## Bias

This codebase prefers concrete code over abstractions. Three similar lines beats a wrong abstraction. When in doubt, **do not apply the pattern**. Recommend it for a future refactor and move on.

## Output format

- **Verdict:** "Pattern needed: <name>" or "No pattern needed."
- **Why:** 2–3 sentences pointing at specific lines.
- **Trade-off:** what gets harder.
- **Implementation:** the edits (only if verdict was positive).
