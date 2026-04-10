---
title: the Lazy Market Hypothesis
tagline: Theoretical markets are efficient. Real markets are efficiently lazy.
tags: []
draft: true
favourite: true
version: v0.0.10
---

# The Lazy Market, and the Effort frontier

Hypothesis: Real markets are not _irrationally lazy_. They are _lazily rational_.

## The Efficient-Market hypothesis

> Efficient-Market hypothesis (EMH): asset prices reflect all available information.

EMH assumes costless information, costless cognition, and costless execution. It models a theoretically optimal market.

The friction of real markets is well understood. The Lazy-Market Hypothesis is for modelling markets with friction.

## The Lazy-Market Hypothesis (LMH)

Price labor, capital, risk, and cognition as real costs, and the Efficient-Market optimum stops being the target. Chasing the EMH optimum costs more than it returns.

Claim: the rational agent is the lazy agent. Laziness isn't a deviation from rationality under friction; laziness is what rationality looks like once friction is in the model. The descriptive observation "real markets don't reach EMH efficiency" is also describing that real agents are at their actual optimum - just not the EMH optimum. The satisficing rule: stop spending effort when marginal benefit of effort equals marginal cost.

This is descriptive, not normative: it's a claim about which agents survive selection in friction-priced environments, not a claim about ideal rationality. Agents who miscalibrate their laziness function - in either direction - get outcompeted.[^3]

## Why rational agents are lazy

Grossman and Stiglitz (1980) showed that a perfectly efficient market can't fund its own price-discovery substrate: equilibrium has to sit short of the limit. LMH generalizes the move from information to effort.

### The laziness 2x2
![The lazy-eager local-global 2x2](/2x2-lazy-eager-local-global.svg)
NOTE: description of 2x2 for Claude Code - remove before publishing (or make into a proper accessibility alt text for the image)
* lazy + local: saves on search, settles where they land. Exploration budget matched to target. Well-fit. 
* lazy + global: saves on search, hopes to land at the top. Exploration budget too small for target. Underfit. 
* eager + global: spends on search, hunts for the top. Exploration budget matched to target. Well-fit but costly. 
* eager + local: spends on search, commits to the first peak. Exploration budget too large for target; surplus spent on overcommitment. Overfit, and therefore fragile.

Rational agents satisfice their exploration budget against expected environmental volatility, and the four cells of the 2×2 describe categories of agent behaviour: under-spending (lazy-global), over-spending in non-volatile environments[^4] (eager-global), spending well but committing too hard (eager-local), and the historical winner: spending modestly and committing modestly (lazy-local).

### Lazy markets

In lazy markets, equilibrium rests on agent laziness. Both sides form an effort frontier: each invests more only when they think the adversary does. Credit-card fraud, low-volume markets, and cybersecurity all sit in lazy equilibria. Rational agents in adversarial fields satisfice their defence against the expected capability of their adversary instead of maximizing it, and the attacker satisfices symmetrically, aiming to just barely beat the current defence rather than maximize offensive capability. Agents who try to maximize either side end up overspending in a region of diminishing returns and get outcompeted by lazier rivals.

## When the effort frontier shifts

Once upon a time, a castle was the gold standard for area defence. Besieging was effortful and castles were otherwise nigh impenetrable. After explosives and artillery came in, some agents tried to solve the problem with better walls, and it didn't work. Castles became a liability, and mobility became the gold standard.

This describes an _effort frontier shock_: a change in the cost or capability landscape that invalidates the prior satisficing equilibrium. Drawing from the LMH, we can model these shocks.

Effort frontier shocks create opportunities to create value by adaptation. Who benefits from this?

Adaptation requires [slack](https://www.lesswrong.com/posts/yLLkWMDbC9ZNKbjDG/slack). Unspent effort budget converts directly into adaptation capacity. The eager agents already committed their efforts. (Other out-of-scope adaptation qualities: [^2].)

Hypothesis: Lazy-local agents, by definition, hold more slack than eager agents. This makes them advantaged in adapting to opportunities after frontier shock, but they pay a cost for suboptimality under the old conditions the eager agents committed to.

Consequence: Effort frontier shocks:
- disadvantage eager local agents
- advantage lazy local agents
- eager global agents are insulated but immobile. Their commitments should weather frontier shocks, but they don't have the slack to extract value from the shocks.
- lazy global agents rarely live to see a frontier shift. But if they did, they would be at the best position: slack to extract value, commitments that are insular from the frontier shock.


Consequence: When the frontier moves, agents with high-commitment, low-monitoring investments get hit hardest - they're slower to detect the shift and slower to redirect once they do. Sunk-cost dynamics make this worse: the first instinct on noticing a shock is usually to double down on the existing commitment rather than abandon it. Castles got thicker walls before they got abandoned.
- Example: Larger corporations and nations get hit by effort shocks worse than small actors, on average.
- Example: Armies evolved from heavy central command to mission-command because the war frontier moves constantly, and high-monitoring central command wasn't technologically feasible.

## Closing

What did we learn today? Not much new. But a new frame out of familiar lenses could lead us somewhere.

One weakly-held consequence worth holding onto: when agents are miscalibrated, it's could be easier to move the environment than to move the agents.[^5]

Real markets are not _irrationally lazy_. They are _lazily rational_.

## Open questions:

- Current trends in effort frontiers: 
    - What the LLM era does to 
        - effort-floor institutions? (Zoning complaints, grant applications, text applications in general)
        - attacker-defender dynamics (Cybersecurity, physical security)

- LMH applications to organizations, protection mechanisms (guarding  is an important one).
- Applications to value drift (of individuals, of organizations)
- LMH applications to addressing existential risk being irrational from the perspective of most real economic agents.

- Who pays for exploration?
    - Could generate interesting predictions on ecosystem composition
    - Implications for foundational research funding.
    - How legibility of output correlates with local eagerness instead of global value
        - Do you actually get better foundational research if you measure proxies for the output value (citations, status, optimizing funding applications), or should you just give researchers budgets and let them do whatever?

- How to affect agent laziness?

- When do agents shift their positions in the 2x2 (possibly within their quadrant, but still relevantly)? Can a lazy local agent 'ascend' to a global lazy agent if they happen to get lucky and find a good global gold vein to extract from? Can an eager agent weather a shock and realize they need more slack?

- Correlated laziness and systemic fragility: when many agents satisfice against the same threat model, the resulting monoculture is locally stable and globally fragile (2008 risk models, monocultures, antibiotic regimes). LMH may have something to say about market-level fragility that EMH-plus-friction doesn't. Future work.

- Two kinds of frontier shock: 
    - effort frontier shifts (cost/capability landscape changes) versus value frontier shifts (what counts as valuable changes).
    - The post's 2x2 handles effort shifts cleanly but value shifts punish eager-global agents in a way the current model doesn't capture. There may also be stages of "globalness" of a value (surface / mid / deep), with deep-global values like existential safety being structurally invisible to LMH-rational agents whose time horizons don't reach that far. This is probably the strongest LMH frame on why x-risk gets undersupplied.

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
[^3]: Over long enough time horizons.
[^4]: Why not choose your strategy based on the expected volatility? Volatility detection is itself effortful. The calibration of laziness is itself subject to LMH.
[^5]: [Astral Codex Ten: Society is fixed, Biology is mutable](https://slatestarcodex.com/2018/04/24/society-is-fixed-biology-is-mutable/)

## Clippings / delete before publishing:
- current [adaptation](https://wordsofwhatcouldbe.substack.com/p/always-account-for-adaptation) paragraph doesn't benefit from the link but .. maybe it could still fit? But I can also be in dialog with that post without linking to it.
