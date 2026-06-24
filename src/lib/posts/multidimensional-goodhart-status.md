---
title: Multidimensional Goodhart (project status)
tagline: "Current status of multidimensional goodhart - a heavily LLM tooled math research project I'm taking on"
createdAt: 2026-06-24T12:00:00+0300
tags: ['research']
---

## The project

I started working on multidimensional-goodhart during the AFFINE agent foundations fellowship in May 2026. I figured the AI safety + Goodhart literature was missing something with reducing goal and proxy to a scalar. I also figured it would be an opportunity to try out mainly llm-driven math research, which had been getting [interesting press](https://openai.com/index/model-disproves-discrete-geometry-conjecture/) around that time.

I threw some posts by Terence Tao and some other mathematicians who had been doing recent work on LLM-aided math research into Claude, asked it to come up with an AGENTS.md file for guiding llms towards reasonable math research, and it came out with a somewhat rigid iteration based workflow design, where the agent executing the research would do steps of research, and 'adversarial review' every three iterations or so.

The method did get the project started, but I'm not sure the first 40 or so iterations, executed within the first two weeks, were very efficient. LLMs are better at producing rigorous-seeming rather than really rigorous math, and I find math cumbersome to review manually, compared to program code.

After that I took a bit more of a hands-on approach, reviewing the work more manually, giving the llms explicit directions of what to look at. This has been somewhat fruitful.

As of today (24.06.2026), I've learned from the project a bunch about the selection vs. intervention channel difference (mentioned below), that some of my initial gut feelings about multidimensional Goodhart did not stand up to math levels of rigor, and also that a bunch of the theorems that the LLMs wrote up as 'new' ones were actually existing theorems from economics and management science. Which is not surprising, it's been a while since Goodhart's law was coined, and actually finding out these references has been a decently interesting outcome from the project. (Some of this lit is mentioned under 'A catch' below, and I'm also separately planning to write up a post or paper about this literature and how it applies to the AI-safety relevant shard of Goodhart.)

Below is an AI-written TLDR of the current project state (subject to change), and the literal research artifacts can be seen over on github from the link below.


## Status

_Disclaimer_: AI-written status summary of an ongoing research project. Source repository: [xylix/multidimensional-goodhart](https://github.com/xylix/multidimensional-goodhart).

The initial motivation for the paper was trying to write a blog post on 'recursive goodhart', the intuition that because Goodhart affects your meta-level goal setting as well, there will always be Goodhart-shaped drift in whatever approach you use. When writing that paper, multiple empirical questions about Goodhart arose, most importantly the question "does adding / removing metrics make Goodhart better or worse". The answer appears to be conditional, and most of the work went into finding what it is conditional on.

## Two channels, not one

One move did most of the work: splitting "the proxy diverged" into two channels
that look identical in the data and obey different math:

- **Selection** — the proxy picks differently from a fixed pool. Baseline
  response curves and reweighting bounds.
- **Intervention** — agents change behavior at fixed type. Action geometry,
  costs, aggregation, hidden harm.

You can't tell which one you're seeing from score movement alone. That
non-identifiability is a result, not a gap.

The conditional answer, in one line: more metrics help or hurt depending on how
you aggregate them, the exchange rates between dimensions, who enters the pool,
and what you actually value — flip any of those and the sign flips.

## What survived

Small, scoped theorems, each with explicit hypotheses and an explicit "does not
license…" clause. Statements in
[`research/core-math.md`](https://github.com/xylix/multidimensional-goodhart/blob/d0ff78a58f3971a31a147311338926f2c4e83537/research/core-math.md):

- **T1/T2** bound hidden drift on any coordinate by `δ·s` — selection intensity
  times baseline std. The constant is sharp, and the finite-χ² hypothesis is
  load-bearing: drop it and a finite-variance coordinate can drift to infinity.
- **T3/T4** say when intervention is worth it: a Stackelberg wedge
  (`Δ = √(2κV)`) and a convex score-deficit budget (`m(d) ≤ V`).
- **T5** says fixed-deficit harm survives a change of measured set iff hidden
  harm is proportional to proxy weight (`h_j = c·w_j`) on the channel pool.
- **T6** says gaming is feasible iff capacity `S_t(M) ≥ d²/2V`, and hardening
  converges in finite time.

The other deliverable is the contract: the primitives — type space, response
kernel, costs, aggregation, value/harm — you have to declare before any theorem
applies. Half the point is naming what you must commit to.

## What got killed

The first 43 iterations served to disprove common-sensical intuitive claims
about how the geometry might behave
([`research/closed_questions.md`](https://github.com/xylix/multidimensional-goodhart/blob/d0ff78a58f3971a31a147311338926f2c4e83537/research/closed_questions.md)):

- Dimension count alone doesn't determine harm.
- Covariance isn't a general finite-pressure primitive.
- "More metrics helps" and "more metrics hurts" both have no sign without
  aggregation, exchange rates, population entry, and value weights.
- Additive conservation isn't generic — only under `h_j = c·w_j`.
- Absolute continuity isn't the causal intervention boundary.
- A generic "minimum-complexity attractor" isn't a theorem.

## A catch

A later literature pass found that the surviving theorems are probably classical
results from other fields. T5's condition is contract-theory congruity
(Feltham–Xie, Baker); the selection bounds track Chapman–Robbins and χ²-DRO; the
convex budget is Fenchel. Each match lives in the theorem's home field, not the
Goodhart literature. So the contribution is cross-field synthesis plus the
contract plus one new reading (subset-invariance), not new math.
([`plans/next-steps.md`](https://github.com/xylix/multidimensional-goodhart/blob/d0ff78a58f3971a31a147311338926f2c4e83537/plans/next-steps.md)).

One side observation is growing into its own paper seed: the AI-safety Goodhart canon cites
almost none of the economics, accounting, and management-science work that
already proved the same things (checked across 7 anchor papers). That's
[`literature-reference-gap-paper/`](https://github.com/xylix/multidimensional-goodhart/tree/d0ff78a58f3971a31a147311338926f2c4e83537/literature-reference-gap-paper).

## Still open

- **Identification.** The framework runs on declared primitives — κ, h, weights,
  stakes — and this project hasn't yet found a way to estimate them before you
  read the score movement ([`research/open_questions.md`](https://github.com/xylix/multidimensional-goodhart/blob/d0ff78a58f3971a31a147311338926f2c4e83537/research/open_questions.md)).
- **Severity.** The theorems say whether gaming activates, not whether it
  degrades gracefully or collapses below baseline. A second track bets the
  deciding factor is a tail comparison — hidden value against the optimization
  channel — rather than the amount of pressure
  ([`divergence-thresholds/`](https://github.com/xylix/multidimensional-goodhart/tree/d0ff78a58f3971a31a147311338926f2c4e83537/divergence-thresholds)).
