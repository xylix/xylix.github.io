---
title: the Lazy Market Hypothesis
tagline: Theoretical markets are efficient. Real markets are efficiently lazy.
tags: []
draft: true
favourite: true
version: v0.0.7
---

# The Lazy Market, and the Effort frontier

Disclaimer: the idea here isn't new, the intention is to sharpen lenses and frames. Combine known information to form a useful model to reason about the real world with.

## The Efficient-Market hypothesis

> Efficient-Market hypothesis (EMH): asset prices reflect all available information.

EMH assumes costless information, costless cognition, and costless execution. It models a theoretically optimal market.

Real agents don't live in frictionless markets, and this is well understood. But what exactly is this gap? Lazy-Market hypothesis models it.

## The Lazy-Market Hypothesis (LMH)

Price labor, capital, risk, and cognition as real costs, and the Efficient-Market disappears. The rational agent stops chasing the EMH optimum - reaching it would cost more than it returns.

Claim: the rational agent is the lazy agent. Laziness isn't a deviation from rationality under friction; laziness is what rationality looks like once friction is in the model. The descriptive observation "real markets don't reach EMH efficiency" is the normative observation that real agents are at their actual optimum — just not the EMH optimum. The satisficing rule: stop spending effort when marginal benefit of effort equals marginal cost.
TODO: Now we have built the strong version of the thesis, which I don't think is strictly true. The true version is something like - when you account for the past learning of the agent and the meta-cost of updating then the agents are actually being _rationally lazy_? But this requires an implementation of an agent, being more agent theory or ML theory than economics, at that point.
    - Claude's idea: the new draft's strong-version footnote ("the rational agent is the lazy agent … TODO this requires agent theory") is doing real work. The old draft sidestepped this by staying descriptive ("locally rational"). I'd resolve it by saying explicitly that LMH is descriptive about which agents survive selection, not normative about ideal rationality — that dissolves the TODO without needing agent theory.
    - Another Claude idea (might go in a later section):
        > Volatility detection is itself effortful. This is descriptive — it's how you dissolve your strong-version TODO without invoking agent theory. The calibration of laziness is itself subject to LMH; that's a self-consistency note, not a new claim. Probably a paragraph in "Why LMH makes sense" or a footnote on the 2x2.

G-S[^1] already demonstrates this for information friction: a perfectly efficient market can't fund its own price-discovery substrate, so the real equilibrium has to sit somewhere short of the limit. LMH generalizes the move from information to general effort.

## Why rational agents are lazy
### The laziness 2x2
![The lazy-eager local-global 2x2](2x2-lazy-eager-local-global.svg)
NOTE: description of 2x2 for Claude Code - remove before publishing (or make into a proper accessibility alt text for the image)
* lazy + local: saves on search, settles where they land. Exploration budget matched to target. Well-fit. 
* lazy + global: saves on search, hopes to land at the top. Exploration budget too small for target. Underfits. 
* eager + global: spends on search, hunts for the top. Exploration budget matched to target. Well-fit but costly. 
* eager + local: spends on search, commits to the first peak. Exploration budget too large for target; surplus spent on overcommitment. Overfits, and therefore fragile.

Claim: rational agents satisfice their exploration budget against expected environmental volatility, and the four cells of the 2×2 are the four ways an agent can fail or succeed at achieving this: by under-spending (lazy-global), over-spending (eager-global), spending well but committing too hard (eager-local), or - the winning move - spending modestly and committing modestly (lazy-local).

### Why LMH makes sense
NOTE: Consider cutting since we now added the 2x2 above.
* Why is it rational?
    * Once effort is priced in, the rational move is to satisfice toward local optima rather than chase the global optimum, due to diminishing local returns.
    * Selection confirms this: Agents who ignore effort costs and chase global optima get outcompeted by agents who satisfice (well-chosen) local optima. Real-world markets are populated by approximately rational laziness thresholds, because the alternatives get outcompeted and lose.
    * The theoretical satisficing rule is: stop spending effort when the marginal benefit of effort = marginal cost of effort

* Effort-as-cost
* Selection

(Claude text):
Claim: the rational agent is the lazy agent. Laziness isn't a deviation from rationality under friction; laziness is what rationality looks like once friction is in the model. Selection confirms it - agents who ignore effort costs and chase the global optimum get outcompeted by agents who satisfice well-chosen local ones.


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

The ways to extract value from adaptation requiring opportunities require resources. Specifically:
* [slack](https://www.lesswrong.com/posts/yLLkWMDbC9ZNKbjDG/slack). Unspent effort budget converts directly into adaptation capacity. The eager agents already committed their efforts.
* Important out-of-scope adaptation qualities[^2]

We focus on slack because the lazy-eager axis of economic agents is about committed vs. uncommitted resources, that is, _slack_.

Lazy-local agents, by the definition of lazy, hold more slack than eager agents. This makes them structurally advantaged post frontier shock, but they pay a cost for suboptimality under the conditions the commitment was calibrated for.
    - eager-local is insured but can't capture upside
    - lazy-local captures upside but takes the hit.

Claim: When the frontier moves, agents with high-commitment, low-monitoring investments get hit hardest - they're slower to detect the shift and slower to redirect once they do. Sunk-cost dynamics make this worse: the first instinct on noticing a shock is usually to double down on the existing commitment rather than abandon it. Castles got thicker walls before they got abandoned.
    - Consequence: Larger corporations and nations get hit by effort shocks worse than small actors, on average.[^3]
    - Consequence: Armies evolved from heavy central command to mission-command because the war frontier moves constantly, and high-monitoring central command wasn't technologically feasible. (Today, it's technologically feasible, but culture-technologically difficult to execute.)
Claim: Effort frontier shocks:
    - disadvantage eager local agents
    - advantage lazy local agents.
    - eager global agents are insulated but immobile. Their commitments should weather frontier shocks, but they don't have the slack to extract value from the shocks.
    - lazy global agents usually don't survive long enough to come across frontier shifts. but if they did, they would be at the best position: slack to extract value, commitments that are insular from the frontier shock.


## Closing

- What did we learn today?
    - Nothing new.
    - But we made a new frame out of multiple lenses.
- Takeaways / food for thought:
    - Real markets are not _irrationally lazy_. They are _lazily rational_.
        - Sometimes their environment has taught them the wrong laziness function, but it's a clearer model to also model that.
            - It's easier to shift the environment than the laziness function - (TODO: reference to Scott Alexanders technology vs. culture / social change post)
    - 
- 

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

TODO: Claude's ideas (polish, edit, or leave as Claude ideas)
- Correlated laziness = systemic fragility. Big omission. LMH is currently single-agent. But when everyone satisfices against the same threat model, you get monocultures: 2008 risk models, software supply chains, antibiotic regimes, agricultural cultivars. The market-level prediction of LMH is that lazy equilibria are locally stable and globally fragile in a way EMH+friction doesn't capture. This feels like the most novel thing the framework gives you.

## Existing lit:


Economics:
    - 1980 Grossman-Stiglitz: https://en.wikipedia.org/wiki/Grossman%E2%80%93Stiglitz_paradox,
    > perfectly informationally efficient markets are an impossibility since, if prices perfectly reflected available information, there is no profit to gathering information, in which case there would be little reason to trade and markets would eventually collapse

    - 2003, Sims: Implications of Rational Inattention https://www.sciencedirect.com/science/article/abs/pii/S0304393203000291

    - 2025: Stanisław M. S. Halkiewicz: The Omniscient yet Lazy Investor https://arxiv.org/pdf/2510.24467

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
