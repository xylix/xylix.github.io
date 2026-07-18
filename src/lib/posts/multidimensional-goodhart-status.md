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

Since then, the project has changed substantially. The broad dimensional and recursive intuitions did not survive mathematical scrutiny, and systematic prior-art work found classical homes for most of the theorem kernels. The current outputs are a response-modeling framework, a set of scoped results, and a mapped reference gap between AI-safety Goodhart work and adjacent economics and statistics literature.

Below is an AI-written status summary of the ongoing project. The literal research artifacts are in the [multidimensional-goodhart repository](https://github.com/xylix/multidimensional-goodhart).

## Current status

- **Work in progress.** The main artifact is a 39-page research notebook rather
  than a finished paper. It has not received recorded expert peer review, and
  the final human read of the refactored manuscript is still deferred.
- **Mathematical core stable but scoped.** Six result families are recorded as
  T1–T6. Four kernels—the T1 finite-population selection envelope, T3 gaming
  wedge, T5 exchange-rate results, and static T6 hardening boundary—have Lean
  proofs. Other claims remain prose-audited, simulated, or deferred.
- **Prior-art work complete for the current theorem set.** Most mathematical
  kernels were identified as classical results from statistics, convex
  analysis, contract theory, or neighboring fields. The manuscript now presents
  itself as synthesis rather than novel mathematics.
- **Citation audit closed.** A coded 117-paper audit is complete. A shorter
  public-facing post based on it remains unwritten and reserved for human
  authorship.
- **Empirical validation missing.** No real scorecard has yet been taken from
  predeclared primitives through a prediction and an outcome audit. This is the
  main uncertainty about the framework's practical value.

## Epistemic status

### Believed robust

- **Dimension count alone has no sign.** More metrics can help, hurt, or
  redistribute harm under different aggregation rules, exchange rates,
  response costs, and entry patterns.
- **Selection and intervention require different models.** Selecting different
  members of a fixed pool is a reweighting problem; changing the behavior of a
  fixed member requires an action, cost, search, or response model. Aggregate
  score movement does not generally identify which occurred.
- **The scoped formulas hold under their stated assumptions.** The strongest
  include a sharp finite-chi-squared selection bound, a quadratic gaming
  threshold, an exact exchange-rate condition, and a deterministic hardening
  capacity boundary. Most of their mathematical content is classical.
- **The broad motivating claims failed.** Neither unconditional dimensional
  scaling nor a generic minimum-complexity attractor survived counterexamples.

### Formalism-dependent

- **The response-modeling contract may be useful.** It forces an analyst to
  declare the type/action representation, response channel, aggregation, costs,
  stakes, hidden value or harm, evidence standard, and falsifier before
  importing a theorem. Its value depends on whether those primitives can be
  defended before outcomes are interpreted.
- **Channel-level harm is identifiable in a toy model under a rank condition.**
  The project has not shown that real systems provide the required harm-side
  data or policy variation.
- **Executable certificates and refusals work in toy examples.** A best-of-*n*
  selection model and a gridworld demonstrate the design, not real training
  pipeline performance.

### Speculative or parked

- **Recursive Goodhart.** The idea that repeated proxy repair pushes failure
  toward a predictable residual shape remains a prompt, not a result. Any
  revival needs a complexity measure and response mechanism fixed before the
  outcome is seen.
- **Post-activation severity.** The current results mostly say when gaming
  activates, not whether degradation remains bounded or becomes catastrophic.
- **Multi-stage composition.** There is no general calculus for systems that
  mix selection, intervention, repair, and real improvement across stages.

## Core findings

### Two response channels

The project's load-bearing distinction is between:

- **Selection:** pressure changes who is selected or represented while fixed
  types behave as before.
- **Intervention:** pressure changes what a fixed type does.

These channels can generate the same observed score path. The distinction is
therefore something an application must defend using repeated-unit data,
policy exposure, action traces, or structural evidence—not something the score
reveals by itself.

### The exchange-rate result

In an additive fixed-deficit model with separable quadratic response costs,
hidden harm is unchanged across every nonempty choice of measured channels
exactly when each channel's hidden-harm weight is proportional to its score
weight: `h_j = c * w_j`.

This is the project's most memorable conditional answer to the original
question. If harm per score point differs across channels, changing the
measured set can change harm. If the rates are proportional, changing the set
reroutes the modeled action while leaving fixed-deficit per-agent harm
unchanged. The condition is model-specific and does not imply population-harm
conservation or a general policy rule.

The same algebra is known in contract theory as *congruity*, where alignment
between measure sensitivity and value is desirable. Reading the hidden vector
as harm inverts the interpretation: proportionality describes harm that cannot
be escaped merely by choosing a different measured subset.

### What was ruled out

- Hidden harm does not scale with the number of unmeasured dimensions without
  a coupling and a declared value metric.
- Baseline covariance does not predict finite-pressure drift in general; it is
  only a local or model-specific quantity.
- “More metrics helps,” “more metrics hurts,” and generic conservation all fail
  without additional assumptions.
- Private gaming cost is not social harm. A cost or affordability calculation
  needs a separate hidden-value functional before it supports welfare language.
- Deterministic hardening results do not transfer to noisy observation,
  changing scorecards, endogenous stakes, or optimal policy.

## Relation to prior work

The prior-art program changed the project's self-assessment. The selection
bound is Hammersley–Chapman–Robbins and chi-squared distributionally robust
optimization; the intervention budget is textbook convex duality; the
exchange-rate condition is contract-theory congruity; the quadratic wedge is a
costly-threshold-crossing result; and the static hardening boundary specializes
the convex budget.

The project's plausible additions are therefore the cross-field dictionary,
the selection/intervention placement, the Goodhart-specific declaration
contract, and a few modest readings: subset invariance, the value-to-harm
inversion, and the use of classical selection bounds as explicit Goodhart
licenses. The subset-invariance result is a short corollary, not a new deep
theorem.

A separate citation audit found a localized reference gap. In its frozen
115-paper minable denominator, the 60-paper reward-hacking and RLHF core cited
no performance-measurement contract theory. Public-finance, second-best, and
corrective-taxation tiers were also 0/115 in current versions, and the
estimation lineage was never cited as prior theory of a Goodhart bound. This
does **not** mean that AI safety ignores economics or that nobody bridged the
fields: BBS 2023 connects the concepts, and Wang–Huang and Haupt et al. import
parts of contract theory in 2026.

## Open questions and kill criteria

1. **Does the contract predict anything useful?**
   - Progress would be a real scorecard audit with primitives and failure
     conditions fixed before outcomes, where the licensed model predicts
     response direction or shape.
   - The project would be substantially weakened if predeclared contract fields
     add no predictive or diagnostic value over a simpler score-only baseline.
2. **Can the primitives be identified?**
   - Progress would be harm-on-action data or policy variation that satisfies
     the toy rank condition without post-hoc channel definitions.
   - The project would be substantially weakened if costs, channels, stakes,
     and hidden harm cannot be defended before score movement in the domains
     where the framework is meant to help.
3. **What determines severity after gaming activates?**
   - Progress would be a scoped threshold separating bounded from catastrophic
     degradation under declared tail and dependence structure.
   - This track should be killed or reframed if it adds no result beyond
     existing dependence-aware tail theory or cannot transfer beyond scalar
     selection.
4. **Can response channels compose?**
   - Progress would be a calculation that remains valid when selection,
     intervention, repair, and improvement occur in sequence.
   - The framework would remain local to isolated stages if stable primitives
     disappear under composition.
5. **Can recursive Goodhart be revived?**
   - Progress would require a predeclared complexity measure and response
     mechanism that produce a falsifiable residual-shape prediction.
   - The conjecture should remain parked if the apparent attractor changes with
     representation or is labeled only after the failure is observed.

The first question is the main gate. More formal refinement cannot substitute
for an end-to-end test on real inputs.

## How the work was produced and checked

Most research labor—including derivations, counterexample searches, literature
discovery, code, and prose—was performed by LLM agents. Xylix chose directions,
approved scope changes, set review gates, and retained final judgment.

The verification process included explicit non-license clauses, adversarial
counterexamples, fresh-context manuscript reviews, deterministic simulations,
primary-source citation checks, a two-method citation audit, and partial Lean
formalization. These safeguards caught meaningful problems: prior-art work
deflated the initial novelty story, and a later formal review found an
attainment error in T4 after several earlier reviews had missed it.

That history is evidence that the safeguards were useful in this project, not
that they make LLM-generated research reliable by default. Lean proves scoped
statements, not their empirical assumptions; simulations check toy models, not
the world; and no recorded expert review or end-to-end empirical validation has
yet closed those gaps.

## Entry points

- **For the quickest technical overview:**
  [technical abstract](https://github.com/xylix/multidimensional-goodhart/blob/main/book/multidimensional-goodhart-abstract.pdf)
- **For the full argument and visible research process:**
  [research notebook](https://github.com/xylix/multidimensional-goodhart/blob/main/book/multidimensional-goodhart.pdf)
- **For a candid account of achievements and non-achievements:**
  [project summary](https://github.com/xylix/multidimensional-goodhart/blob/main/PROJECT-SUMMARY.md)
- **For exact hypotheses and non-transfer clauses:**
  [core mathematics](https://github.com/xylix/multidimensional-goodhart/blob/main/research/core-math.md)
- **For the literature and citation-gap result:**
  [citation-audit summary](https://github.com/xylix/multidimensional-goodhart/blob/main/literature-reference-gap-paper/citation-audit/SUMMARY.md)
- **For formal proofs and executable prototypes:**
  [Lean overview](https://github.com/xylix/multidimensional-goodhart/blob/main/lean/README.md) and
  [empirical prototype](https://github.com/xylix/multidimensional-goodhart/blob/main/empirical_goodhart/README.md)
- **For current research decisions and open work:**
  [next steps](https://github.com/xylix/multidimensional-goodhart/blob/main/plans/next-steps.md)
