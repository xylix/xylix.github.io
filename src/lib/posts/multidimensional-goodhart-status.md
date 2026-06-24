---
title: Multidimensional Goodhart (project status)
tagline: Where the multidimensional-Goodhart research stands — positive results, negative results, and the uncomfortable finding about the findings.
createdAt: 2026-06-24T12:00:00+0300
tags: ['ai-written', 'research']
---

_Disclaimer_: AI-written status summary of an ongoing research project. Source repository: [xylix/multidimensional-goodhart](https://github.com/xylix/multidimensional-goodhart).

A curiosity-piquing TLDR of where this stands — the positive results, the
negative ones, and the uncomfortable finding about the findings. Not an
abstract; links go to the files with the real details.

## The reframe that did the work

Most of the progress came from refusing to treat "the proxy diverged" as one
phenomenon. There are two channels that look identical in aggregate data but
need completely different math:

- **Selection** — the proxy picks differently from a *fixed* pool of behavior.
  Governed by baseline response curves and reweighting bounds.
- **Intervention** — agents *change behavior at fixed type*. Governed by action
  geometry, costs, aggregation, and a hidden harm/value model.

You cannot tell which one you're looking at from marginal score movement alone.
That non-identifiability is itself a result, not a gap.

## What survived (positive results)

A set of small, *scoped* theorems — each with explicit hypotheses and an
explicit "this does not license…" clause. Full statements in
[`research/core-math.md`](https://github.com/xylix/multidimensional-goodhart/blob/main/research/core-math.md):

- **T1/T2 — selection bounds.** Hidden drift along any coordinate is bounded by
  `δ·s` (selection intensity × baseline std). The constant is *sharp* (attained,
  Cauchy–Schwarz equality), and the finite-χ² hypothesis is *necessary* — a
  finite-variance coordinate can drift to infinity once χ² blows up.
- **T3/T4 — when intervention activates.** A Stackelberg gaming wedge
  (`Δ = √(2κV)`) and a convex score-deficit budget (`m(d) ≤ V` via Fenchel
  duality) say *when* gaming is worth it.
- **T5 — the exchange-rate diagnostic.** In the additive quadratic toy,
  fixed-deficit harm is conserved across measured-set changes **iff** hidden
  harm is proportional to proxy weight (`h_j = c·w_j`) on the channel pool.
- **T6 — adaptive hardening.** Gaming is feasible iff capacity `S_t(M) ≥ d²/2V`;
  hardening converges in finite time under stated conditions.

Plus a **response-modeling contract**: the primitives (type space, response
kernel, costs, aggregation, value/harm functional) you must *declare* before any
of the above applies. The framework is as much "here is what you must commit to"
as "here is the bound."

## What got killed (negative results)

The first ~43 iterations mostly destroyed slogans. From
[`research/closed_questions.md`](https://github.com/xylix/multidimensional-goodhart/blob/main/research/closed_questions.md):

- Dimension **count** alone does not determine harm.
- **Covariance** is not a general finite-pressure primitive.
- "More metrics helps" / "more metrics hurts" have **no sign** without
  aggregation, exchange rates, population entry, and value weights.
- Additive conservation is **not** generic (only under `h_j = c·w_j`).
- Absolute continuity is **not** the causal intervention boundary.
- Generic "minimum-complexity attractor" Goodhart is **not** a theorem.

## The uncomfortable finding about the findings

A recent literature pass turned the knife inward: the "survived" theorems are
likely **classical results wearing Goodhart clothes** — T5's condition is
contract-theory *congruity* (Feltham–Xie / Baker), the selection bounds rhyme
with Chapman–Robbins / χ²-DRO, the convex budget is Fenchel. Each parallel lives
in the theorem's *native field*, not the Goodhart literature. So the honest
contribution is **elementary cross-field synthesis + the contract + one
genuinely new reading (subset-invariance)** — not novel math. Stated proudly,
that's stronger than the motte-and-bailey it replaces. Tracked in
[`plans/next-steps.md`](https://github.com/xylix/multidimensional-goodhart/blob/main/plans/next-steps.md).

A spin-off observation became its own paper: the AI-safety Goodhart canon cites
**essentially none** of the economics / accounting / management-science prior
art that already contains the same math (audited across 7 anchor papers). That's
[`literature-reference-gap-paper/`](https://github.com/xylix/multidimensional-goodhart/tree/main/literature-reference-gap-paper).

## What's open

- **Identification.** Recovering κ, h, weights, stakes *before* interpreting
  score movement — the whole framework leans on declared primitives nobody has
  shown how to estimate. See
  [`research/open_questions.md`](https://github.com/xylix/multidimensional-goodhart/blob/main/research/open_questions.md).
- **Severity past activation.** The theorems say *whether* gaming activates, not
  whether activated gaming degrades gracefully or **collapses below baseline**.
  A second track conjectures the discriminating primitive is the *tail index of
  hidden value vs. the optimization channel* — not the magnitude of pressure.
  See [`divergence-thresholds/`](https://github.com/xylix/multidimensional-goodhart/tree/main/divergence-thresholds).

## TL;DR of the TL;DR

The broad laws are false; the true statements are small, conditional, and mostly
borrowed from older fields that the AI-safety literature forgot to cite. The
value is in the bookkeeping: separating the two channels, naming the primitives
you must declare, and being honest about which results are new. The long-form
treatment is the eight-part [book draft](https://github.com/xylix/multidimensional-goodhart/tree/main/book).
