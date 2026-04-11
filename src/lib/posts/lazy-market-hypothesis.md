---
title: the Lazy Market Hypothesis
tagline: Theoretical markets are efficient. Real markets are efficiently lazy.
tags: ['cognitech', 'research']
favourite: true
version: v1.0.1
createdAt: 2026-04-11T10:41:47+0300
---

# The Lazy Market, and the Effort frontier

Hypothesis: Real markets are not _irrationally lazy_. They are _lazily rational_.

## The Efficient-Market Hypothesis

> Efficient-Market Hypothesis (EMH): asset prices reflect all available information.

EMH assumes costless information, costless cognition, and costless execution. It models a theoretically optimal market.

The friction of real markets is well understood. The Lazy-Market Hypothesis is for modelling markets with friction.

## The Lazy-Market Hypothesis (LMH)

Once you price labor, capital, risk, and cognition as real costs, the Efficient-Market optimum stops being the target. Chasing the EMH optimum would cost more than the expected return.

Claim: the rational agent is the lazy agent. Laziness isn't a deviation from rationality under friction; laziness is what rationality looks like once friction is in the model. The descriptive observation "real markets don't reach EMH efficiency" is also a description of real agents at their actual optimum - just not the EMH optimum. 

The satisficing rule: stop spending effort when marginal benefit of effort equals marginal cost.

This is descriptive, not normative: it's a claim about which agents survive selection in friction-priced environments, not a claim about ideal rationality. Agents who miscalibrate their laziness function - in either direction - get outcompeted.[^1]

## Why rational agents are lazy

Grossman and Stiglitz (1980) showed that a perfectly efficient market can't fund its own price-discovery substrate: equilibrium has to sit short of the limit. LMH generalizes the move from information to effort.[^2]

### The laziness 2x2
![The lazy-eager local-global 2x2](/2x2-lazy-eager-local-global.svg)
<!--
NOTE: description of 2x2 for Claude Code - remove before publishing (or make into a proper accessibility alt text for the image)
* lazy + local: saves on search, settles where they land. Exploration budget matched to target. Well-fit. 
* lazy + global: saves on search, hopes to land at the top. Exploration budget too small for target. Underfit. 
* eager + global: spends on search, hunts for the top. Exploration budget matched to target. Well-fit but costly. 
* eager + local: spends on search, commits to the first peak. Exploration budget too large for target; surplus spent on overcommitment. Overfit, and therefore fragile.
-->
Rational agents satisfice their exploration budget against expected environmental volatility, and the four cells of the 2×2 describe categories of agent behaviour: under-spending (lazy-global), over-spending in non-volatile environments[^3] (eager-global), spending well but committing too hard (eager-local), and the historical winner[^6]: spending modestly and committing modestly (lazy-local).

### Lazy markets

In lazy markets, equilibrium rests on agent laziness. Both sides form an effort frontier: each invests more only when they think the adversary does. Credit-card fraud, low-volume markets, and cybersecurity all sit in lazy equilibria. Rational agents in adversarial fields satisfice their defence against the expected capability of their adversary instead of maximizing it, and the attacker satisfices symmetrically, aiming to just barely beat the current defence rather than maximize offensive capability. Agents who try to maximize either side end up overspending in a region of diminishing returns and get outcompeted by lazier rivals.

## When the effort frontier shifts

Once upon a time, a castle was the gold standard for area defence. Besieging was slow and costly and castles were otherwise nigh impenetrable. After explosives and artillery came in, some agents reacted with better walls, and it didn't work. Castles became a liability.

This describes an _effort frontier shock_: a change in the cost or capability landscape that invalidates the prior satisficing equilibrium. Drawing from the LMH, we can model these shocks.

Effort frontier shocks create opportunities to create value by adaptation. Who benefits from this?

Adaptation requires [slack](https://www.lesswrong.com/posts/yLLkWMDbC9ZNKbjDG/slack). Unspent effort budget converts directly into adaptation capacity. The eager agents already committed their efforts. (Other out-of-scope adaptation qualities[^4])

Hypothesis: Lazy-local agents, by definition, hold more slack than eager agents. This makes them advantaged in adapting to opportunities after frontier shock, but they pay a cost for suboptimality under the old conditions the eager agents committed to.

Consequence: Effort frontier shocks:
- disadvantage eager-local agents
- advantage lazy-local agents
- eager-global agents are insulated but immobile. Their commitments should weather frontier shocks, but they don't have the slack to extract value from the shocks.
- lazy-global agents rarely live to see a frontier shift. But if they did, they would be at the best position: slack to extract value, commitments that are insular from the frontier shock.


Elaboration: When the frontier moves, agents with high-commitment, low-monitoring investments get hit hardest - they're slower to detect the shift and slower to redirect once they do. Sunk-cost dynamics make this worse: the first instinct on noticing a shock is usually to double down on the existing commitment rather than abandon it. Castles got thicker walls before they got abandoned.
- Example: Typically larger corporations and nations get hit by effort frontier shocks worse than small actors.
- Example: Armies evolved from heavy central command to mission-command because the war frontier moves constantly, and high-monitoring central command wasn't technologically feasible.

## Closing

When real agents who are winning and surviving look irrational, it often means we're not modelling their targets and cost functions in full. The interesting move isn't to scold the agents. It's to ask what the frontier looks like, and what would have to change for their satisficing point to land somewhere else.

When agents are miscalibrated, it's often easier to move the environment than to move the agents.[^5]

Real markets are not irrationally lazy. They are lazily rational.


## Appendix
<details>
<summary>Open questions</summary>

- Current trends in effort frontiers: 
    - What the LLM era does to 
        - effort-floor institutions? (Zoning complaints, grant applications, text applications in general)
        - attacker-defender dynamics (Cybersecurity, physical security)
    - Other live frontier shifts: (Remote work? Renewable energy? Cryptocurrency?)


- "Lazy economics":
    - Generalizing Grossman-Stiglitz from information cost to effort cost.
        - What survives, what breaks, and what new equilibria appear when the substrate being priced is the full stack (search, evaluation, execution, monitoring) rather than information acquisition alone? Sims' rational inattention covers part of this for attention specifically; the full generalization seems open.

    - Who pays for exploration?
        - Could generate interesting predictions on ecosystem composition
        - Implications for foundational research funding
        - How legibility of output correlates with local eagerness instead of global value
            - Do you actually get better foundational research if you measure proxies for the output value (citations, status, optimizing funding applications), or should you just give researchers budgets and let them do whatever?
        - Rational risk tolerance

    - Implications of real agent's calibrated laziness functions:
        - Correlated laziness and systemic fragility: when many agents satisfice against the same threat model, the resulting monoculture is locally stable and globally fragile (2008 risk models, monocultures, antibiotic regimes). LMH may have something to say about market-level fragility that EMH-plus-friction doesn't. Future work.
        
    - Performance of eager-global agents under effort frontier shifts and value frontier shifts 
        - Does the hypothesis hold that eager-global strategies are stabler over effort frontier shift but unstable over value frontier shifts?
            - Do some agents deliberately aim at deeper values to outcompete agents targeting shallower ones - trading short-term efficiency for shock-resistance across value-frontier shifts?
        - See "Layers of value globality"

    - Laziness-function updates:
        - How to affect agent laziness?
        - When do agents shift their positions in the 2x2 (possibly within their quadrant, but still relevantly)? Can a lazy-local agent 'ascend' to a lazy-global agent if they happen to get lucky and find a good global gold vein to extract from? Can an eager agent weather a shock and realize they need more slack?
            - Also see "Is lazy-global a selectable strategy?"


- Lazy philosophy:
    - How do agents time discounting (affects local vs global) and laziness functions (eager vs lazy) relate to each other?

    - Modelling the effects of effort frontier shifts (cost/capability landscape changes) versus value frontier shifts (what counts as valuable changes):
        - Layers of value globality.
            - Shallow-global values: Values that may shift based on megatrends or regulation.
            - Medium-global values: Objectives that have stayed constant over capitalism
            - Deep-global values: existential safety
        - Can agents aim for deeper values to outcompete agents with shallower objectives?
    

    - Implications for values of agents:
        - LMH applications to value drift (of individuals, of organizations)
        - LMH applications to addressing existential risk being irrational from the perspective of most real economic agents.
            - agent-rationality question: With rationally lazy modelling, LMH-rational agents won't fund x-risk because the individual cost-benefit math fails.
                - Implications for what kinds of coordination or externalization could change this.
            - model-coverage question: x-risk is a deep-global value, and the layers-of-globality extension is what's needed to make the framework able to talk about it at all. 

    - Where are the lazy-global agents?
        - Is lazy-global a selectable strategy?
            - Hypothesis: You cannot aim at lazy-global, but we can recognise lazy-global? Can we only recognise lazy-global in retrospect?
        - Does evolution-at-scale effectively produce lazy-global outcomes even though no individual round of selection aims at them? If selection is locally lazy-local but the surviving distribution is globally weighted toward lazy-global, what does that tell us about which other systems (markets? cultures? research ecosystems?) might have the same structure?

</details>

<details>
<summary>Related literature</summary>

Psychology:
- Simon (1956) Rational Choice and the Structure of the Environment: satisficing / bounded rationality. LMH treats satisficing points as equilibrium properties of markets rather than a cognitive property of agents, aims to model these equilibria.

Economics:
- 1980 Grossman-Stiglitz: https://en.wikipedia.org/wiki/Grossman%E2%80%93Stiglitz_paradox,
> perfectly informationally efficient markets are an impossibility since, if prices perfectly reflected available information, there is no profit to gathering information, in which case there would be little reason to trade and markets would eventually collapse
- 2003, Sims: Implications of Rational Inattention https://www.sciencedirect.com/science/article/abs/pii/S0304393203000291
- 2025: Stanisław M. S. Halkiewicz: The Omniscient yet Lazy Investor https://arxiv.org/pdf/2510.24467
- (A lot more economics I've never read.)

Internet:
- Yudkowsky, Eliezer: Inadequate Equilibria: https://equilibriabook.com/
- MacKenzie, Patrick: The optimal amount of fraud is non-zero https://www.bitsaboutmoney.com/archive/optimal-amount-of-fraud/

</details>


[^1]: Over long enough time horizons.
[^2]: See "Formally generalizing Grossman-Stiglitz from information cost to effort cost." in Open Questions.
[^3]: Why not choose your strategy based on the expected volatility? Volatility detection is itself effortful. The calibration of optimal laziness is itself subject to LMH.
[^4]: Some adaptation qualities:
> - Execution qualities
>     - Speed
>     - Ability to mobilize
> - Properties of existing commitments:
>     - cross-paradigm salvage value
>     - Ability to liquidate
>     - Optionality
> - Decisionmaking:
>     - Effective scanning
>     - Weakly holding to previous paradigms
>         - Scout Mindset

[^5]: [Astral Codex Ten: Society is fixed, Biology is Mutable](https://slatestarcodex.com/2018/04/24/society-is-fixed-biology-is-mutable/)
[^6]: In complex, volatile environments, generalists with slack tend to win. Hyper-specialists (eager-local) dominate their narrow slot while conditions hold. Pure explorers (eager-global) rarely accumulate enough fitness to persist. The animals you've heard of are mostly lazy-locals: good-enough at local-enough tasks to exploit and survive, but carrying enough reserve capacity to ride out shocks rather than be caught rigid by them. (In the longer run they become generalists, because each shock that doesn't kill them incentivizes a new strategy.) (What about lazy-global?[^7]) 
[^7]: Almost no successful agent starts at lazy-global. They start lazy-local (or eager-local), and then luck out. Cyanobacteria didn't select for their waste product to restructure the planet's atmosphere. They were just metabolizing. The "global" part is a retroactive reclassification by an observer who knows where the story goes.
