---
title: the Lazy Market Hypothesis
tagline: Theoretical markets are efficient. Real markets are efficiently lazy.
tags: []
draft: true
favourite: true
version: v0.0.8
---

# The Lazy Market, and the Effort frontier

Claim: Real markets are not _irrationally lazy_. They are _lazily rational_.

Disclaimer: the idea here isn't new. The goal is sharpening a lens by combining known ideas into a model useful for reasoning about real markets

## The Efficient-Market hypothesis

> Efficient-Market hypothesis (EMH): asset prices reflect all available information.

EMH assumes costless information, costless cognition, and costless execution. It models a theoretically optimal market.

The friction of real markets is well understood. But how to model it? Predicting realistically frictional markets is Lazy-Market hypothesis' end goal.

## The Lazy-Market Hypothesis (LMH)

Price labor, capital, risk, and cognition as real costs, and the Efficient-Market optimum stops being a target. The rational agent stops chasing the EMH optimum, since reaching it would cost more than it returns.

Claim: the rational agent is the lazy agent. Laziness isn't a deviation from rationality under friction; laziness is what rationality looks like once friction is in the model. The descriptive observation "real markets don't reach EMH efficiency" is the normative observation that real agents are at their actual optimum - just not the EMH optimum. The satisficing rule: stop spending effort when marginal benefit of effort equals marginal cost.
    - Claude's v0.0.7 idea: This is descriptive, not normative: it's a claim about which agents survive selection in friction-priced environments, not a claim about ideal rationality. Agents who miscalibrate their laziness function — in either direction — get outcompeted.
    - NOTE: Old Claude idea: Volatility detection is itself effortful. This is descriptive — it's how you dissolve your strong-version TODO without invoking agent theory. The calibration of laziness is itself subject to LMH; that's a self-consistency note, not a new claim. Probably a paragraph in "Why LMH makes sense" or a footnote on the 2x2.


## Why rational agents are lazy

Prior work on the subject: in 1980 G-S[^1] demonstrates a paradox for efficient markets: a perfectly efficient market can't fund its own price-discovery substrate, so the real equilibrium has to sit somewhere short of the limit. LMH generalizes the move from information to general effort.


### The laziness 2x2
![The lazy-eager local-global 2x2](2x2-lazy-eager-local-global.svg)
NOTE: description of 2x2 for Claude Code - remove before publishing (or make into a proper accessibility alt text for the image)
* lazy + local: saves on search, settles where they land. Exploration budget matched to target. Well-fit. 
* lazy + global: saves on search, hopes to land at the top. Exploration budget too small for target. Underfits. 
* eager + global: spends on search, hunts for the top. Exploration budget matched to target. Well-fit but costly. 
* eager + local: spends on search, commits to the first peak. Exploration budget too large for target; surplus spent on overcommitment. Overfits, and therefore fragile.

Claim: rational agents satisfice their exploration budget against expected environmental volatility, and the four cells of the 2×2 are the four ways an agent can fail or succeed at achieving this: by under-spending (lazy-global), over-spending (eager-global), spending well but committing too hard (eager-local), or - the winning move - spending modestly and committing modestly (lazy-local).

Claim: over market history lazily local agents perform the best. 
    Note: But the optimal strategy is, to some degree, a function of volatility: in turbulent environments eager-global should outperform lazily local strategies.

### Lazy markets

* In lazy markets, equilibrium rests on agent laziness. Both sides form an effort frontier: each invests more only when the think the adversary does
    * Credit-card fraud, low-volume markets, cybersecurity - all feature heavy laziness
    * The general trend: Rational agents in adversarial playing fields satisfice their defence against expected capability of their adversary, instead of maximizing defence.
    * The attacker also tries to satisfice against just barely beating the defender's defences, instead of maximizing their offensive capability.
    * Agents who try to maximize defence end up overspending in an area of diminishing returns, and so they eventually lose.


## When the effort frontier shifts

Once upon a time, a castle was the gold standard for area defence. (besieging was effortful and castles were otherwise basically impenetrable.) After explosives and artillery came in, some agents tried to solve the problem with better walls, and it didn't work. Castles became a liability, and mobility became the gold standard.

This describes an _effort frontier shock_: a change in the cost or capability landscape that invalidates the prior satisficing equilibrium. Drawing from the LMH, we can model these shocks.

Effort frontier shocks create opportunities to create value by adaptation. Who benefits from this?

Extracting value by adapting to a frontier shock requires resources. Specifically:
* [slack](https://www.lesswrong.com/posts/yLLkWMDbC9ZNKbjDG/slack). Unspent effort budget converts directly into adaptation capacity. The eager agents already committed their efforts.
* Important out-of-scope adaptation qualities[^2]

We focus on slack because the lazy-eager axis of economic agents is about committed vs. uncommitted resources, that is, _slack_.

Claim: When the frontier moves, agents with high-commitment, low-monitoring investments get hit hardest - they're slower to detect the shift and slower to redirect once they do. Sunk-cost dynamics make this worse: the first instinct on noticing a shock is usually to double down on the existing commitment rather than abandon it. Castles got thicker walls before they got abandoned.
    - Consequence: Larger corporations and nations get hit by effort shocks worse than small actors, on average.[^3]
    - Consequence: Armies evolved from heavy central command to mission-command because the war frontier moves constantly, and high-monitoring central command wasn't technologically feasible. (Today, it's technologically feasible, but culture-technologically difficult to execute.)
Claim: Effort frontier shocks:
    - disadvantage eager local agents
    - advantage lazy local agents.
    - eager global agents are insulated but immobile. Their commitments should weather frontier shocks, but they don't have the slack to extract value from the shocks.
    - lazy global agents usually don't survive long enough to come across frontier shifts. but if they did, they would be at the best position: slack to extract value, commitments that are insular from the frontier shock.

Lazy-local agents, by the definition of lazy, hold more slack than eager agents. This makes them advantaged in adapting to opportunities after frontier shock, but they pay a cost for suboptimality under the old conditions the eager agents committed to.

## Closing

- What did we learn today?
    - Nothing new.
    - But we made a new frame out of multiple lenses.
- Takeaways / food for thought:
    - Real markets are not _irrationally lazy_. They are _lazily rational_.
        - Sometimes their environment has taught them the wrong laziness function, but a good model has to model this.
            - It may even be easier to shift the environment than the laziness function - see [Astral Codex Ten: Society is fixed, Biology is mutable](https://slatestarcodex.com/2018/04/24/society-is-fixed-biology-is-mutable/)

## Open questions:
- Current trends in effort frontiers: 
    - What the LLM era does to 
        - effort-floor institutions? (Zoning complaints, grant applications, text applications in general)
        - attacker-defender dynamics (Cybersecurity, physical security)

- LMH applications to organizations, protection mechanisms (guarding  is an important one).
- Applications to value drift (of individuals, of organizations)
- LMH applications to addressing existential risk being irrational from the perspective of most real economic agents.

- Who pays for exploration — this is also generative (predicts ecosystem composition), and it pairs naturally with correlated fragility.
    - Implications for foundational research funding.
    - How legibility of output correlates with local eagerness instead of global value
        - Do you actually get better foundational research if you measure proxies for the output value (citations, status, optimizing funding applications), or should you just give researchers budgets and let them do whatever?

- When do agents shift their positions in the 2x2 (possibly within their quadrant, but still relevantly)? Can a lazy local agent 'ascend' to a global lazy agent if they happen to get lucky and find a good global gold vein to extract from? Can an eager agent weather a shock and realize they need more slack?

- Correlated laziness and systemic fragility: when many agents satisfice against the same threat model, the resulting monoculture is locally stable and globally fragile (2008 risk models, monocultures, antibiotic regimes). LMH may have something to say about market-level fragility that EMH-plus-friction doesn't. Future work.

## Existing literature:

Economics:
- 1980 Grossman-Stiglitz: https://en.wikipedia.org/wiki/Grossman%E2%80%93Stiglitz_paradox,
> perfectly informationally efficient markets are an impossibility since, if prices perfectly reflected available information, there is no profit to gathering information, in which case there would be little reason to trade and markets would eventually collapse
- 2003, Sims: Implications of Rational Inattention https://www.sciencedirect.com/science/article/abs/pii/S0304393203000291
- 2025: Stanisław M. S. Halkiewicz: The Omniscient yet Lazy Investor https://arxiv.org/pdf/2510.24467
- (A lot more economics I've never read.)

Internet:
- Yudkowsky, Eeliezer: Inadequate Equilibria: https://equilibriabook.com/
- MacKenzie, Patrick: The optimal amount of fraud is non-zero https://www.bitsaboutmoney.com/archive/optimal-amount-of-fraud/


[^1]: 1980 Grossman-Stiglitz: https://en.wikipedia.org/wiki/Grossman%E2%80%93Stiglitz_paradox
[^2]: Adaptation qualities:
> - Execution qualities
>     - Speed
>     - Ability to mobilize
> - Properties of existing commitments:
>     - cross-paradigm salvage value
>     - Ability to liquidate
>     - Optionality
> - Cognitive / organization tech:
>     - Effective scanning
>     - Weakly holding to previous paradigms
>         - Scout Mindset

[^3]: "But what about small corporations going bankrupt"? The downside of effort frontier shock effect is limited for small agents, due to bankruptcies, and the upside is unlimited.


## Clippings / delete before publishing:
- current [adaptation](https://wordsofwhatcouldbe.substack.com/p/always-account-for-adaptation) paragraph doesn't benefit from the link but .. maybe it could still fit? But I can also be in dialog with that post without linking to it.
