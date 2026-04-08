---
title: the Lazy Market Hypothesis
tagline: Some markets are (allegedly) efficient. Some markets are efficiently lazy.
tags: ['artificial-intelligence']
draft: true
favourite: true
version: v0.0.2
---

A small town in Finland. Bikes leaned against the library wall, unlocked. Not because the locks are expensive, but because nobody's ever taken one. The "security" here is that theft requires a thief, and the local supply of bike thieves is zero. If you installed a camera and a steel rack, you'd be solving a problem that doesn't exist. If a busload of opportunists rolled through, you'd lose every bike in an hour.

A mid-tier academic journal. Submissions come in, reviewers skim them, some get published. The quality filter isn't the review process. The quality filter is that writing a plausible-sounding paper used to take weeks of domain knowledge and effort. The review process is checking that the effort was spent, not that the conclusions are sound. It worked, mostly, because faking it was expensive.

A city's parking meter system, run on software last updated in 2011. The admin panel is accessible from the public internet. The password is `admin`. Nobody has exploited this, because nobody has looked, because parking meter revenue in a city of 40,000 isn't interesting to anyone with the skills to find it. TODO: check if there's a real public example of this kind of thing, or if this should stay as a constructed example.

These are all the same thing.

---

## The Lazy Market Hypothesis

The Efficient Market Hypothesis says that in liquid, well-monitored markets, prices reflect available information because someone is always trying to profit from mispricing. The moment alpha appears, someone captures it. That's what "efficient" means: continuously probed, continuously corrected.

Most of the world isn't like that.

Most of the world is held together not by active defense but by the absence of active attack. The bike isn't stolen because nobody tried. The journal isn't flooded with fakes because faking was too much work. The parking system isn't compromised, because the payoff doesn't justify the effort of looking.

I'm calling these *lazy markets*: equilibria where the current level of safety, quality, or integrity is sustained not by the strength of defenders but by the scarcity or disinterest of attackers. The system sits at a local optimum that nobody has bothered to disturb.

TODO: remove or move parenthesized part to footnotes
(The parallel to EMH is intentional.) Efficient markets price in available *information*. Lazy markets price in available *effort*. Both are stable equilibria. Both can be disrupted when their underlying assumption changes.


## Why lazy markets exist: local vs. global optimums

Lazy markets aren't accidents or oversights. They're the locally rational outcome.

Consider the incentives facing a defender. Investing in defense against attacks that aren't happening is a pure cost with no visible return. The town council that spends its budget on bike racks when no bikes have been stolen gets voted out. The journal editor who overhauls the review process when submissions look fine gets told they're wasting everyone's time. The city IT department that proposes a security audit for a system nobody has ever attacked gets its budget cut.

Defenders are locally rational to be lazy because, from where they sit, the threat isn't real. And they're *right*, until they're not. This is the local-vs-global optimum structure: locally, doing nothing is optimal because attack pressure is near zero. Globally, the system is fragile because its safety depends on a condition (attacker scarcity) that the defender doesn't control and may not even be tracking.

The global optimum *for defense* would be to make systems that are provably secure. This is not a hypothetical: it's what cryptography tries to do. Cryptographic algorithms are designed with mathematical proofs of security against specific attack classes, and some implementations go further, using formal verification to prove the code matches the spec. The result is systems where safety is a property of the design, not a bet on attacker scarcity.

Almost nothing else in software works this way. Formally verifying even a small program is expensive, slow, and requires specialized expertise. For a parking meter system, a journal submission portal, a city's SCADA interface, the cost of provable security dwarfs the value of the thing being protected. So the locally rational choice is to ship something that works, skip the proof, and rely on the fact that nobody is going to try to break your parking meters. The global optimum for defense is real, known, and almost never worth pursuing. That's what LMH explains: it's not that defenders don't know how to defend. It's that defending well is not the global optimum for the *defender's actual goals*, which include staying in budget, shipping on time, and not spending years on a formal proof for a system three people use.

No individual agent has the incentive to close this gap, because the cost of defense scales badly against the tails. If you model exploit success as a distribution, getting from a 5% exploit rate to a 1% rate is reasonable. Getting from 1% to 0.1% is expensive. Getting to 0% means formal verification, and the cost curve goes vertical. At every point along that curve, a rational defender asks: is the next increment of security worth more than what I'd lose to the exploits it prevents? And for most systems, the answer becomes "no" well before the system is actually secure. This is Patrick McKenzie's point that [the optimal amount of credit card fraud is non-zero](TODO: link to patio11 piece): Visa could reduce fraud further, but the cost of doing so would exceed the fraud losses. They're locally rational to tolerate the remaining fraud. The same logic applies everywhere lazy markets exist, only most defenders aren't even running the calculation consciously.

This is the same structure as other collective action problems, but with a twist: in most collective action problems, the participants *know* there's a problem they're failing to coordinate on. In a lazy market, the participants often don't even see the problem. The bike hasn't been stolen. The system hasn't been breached. Everything looks fine.

This is also why lazy markets are so stable. It's not just that defending is expensive. It's that the signal that you *should* defend doesn't arrive until the attack does, at which point the lazy market has already collapsed. The information that would trigger the transition from lazy to active defense is generated by the very event the defense is meant to prevent.

NOTE: The "preferences" angle from the notes could land here: lazy markets are also sustained by the fact that most people who *could* attack don't, for reasons of culture, identity, and friction, not just cost-benefit calculation. The local optimum is held in place by both defender laziness and attacker preferences. Both can shift.


## The diagnostic

Given a domain, three questions:

1. **Was its current safety level earned by defenders, or inherited from attackers being rare?** If nobody is actively maintaining the defense, it's a lazy market.
2. **If attack pressure suddenly increased 100x, could defenders re-harden in time?** If the answer is "what defenders?", you have a problem.
3. **Is the value being protected growing, shrinking, or stable?** Lazy markets around shrinking value just quietly disappear. Lazy markets around growing value are time bombs.

A domain that scores "inherited," "no," and "growing" is a lazy market approaching collapse.


## Prior work

The lazy market pattern has been stated, in narrower forms, multiple times. Dan Davies in *Lying for Money* (2018): "fraud is an equilibrium quantity." Patrick McKenzie's popular treatment of the same idea across payments, KYC, and benefits fraud. The LessWrong post "Terrorism, Tylenol, and dangerous information" (2018), which states half of LMH for terrorism: "the main constraint on an attack vector can really just be that the types of people who make attacks haven't thought of it yet." Yudkowsky's *Inadequate Equilibria* catalogues the family of stable-bad equilibria that LMH's stable-fragile equilibria are cousins to. [TODO: add links for all of these.]

What's new here is the cross-domain generalization, and specifically the transition dynamics: what happens when the cost structure shifts across many lazy markets simultaneously.

Background: Grossman-Stiglitz (1980) on why perfectly efficient markets are impossible; routine activity theory (Cohen & Felson, 1979) in criminology; Ross Anderson's economics-of-information-security work. [TODO: footnote or parenthetical, not body text.]

TODO: the placement of this section is an open question. It might work better earlier (right after definition, to borrow credibility before explaining the mechanism) or later (after the clean cases, when the reader already believes the frame and wants to know if it's original). Currently here as a compromise.


## Clean cases

**Cybersecurity** is the cleanest example. Most vulnerable software is vulnerable not because the vulnerability is hard to fix, but because nobody is maintaining it *and* nobody is attacking it because the payoff isn't there. The equilibrium is laziness on both sides. When automated scanning tools made probing cheap, the domains where attack payoff was high (financial services, large enterprises) transitioned to active markets with continuous defense. The long tail (small businesses, personal infrastructure, IoT devices) stayed lazy.

**Effort-floor institutions.** Peer review, grant applications, college admissions essays, court filings, insurance claims, product reviews, reputation systems. All of these extract signal from "this person was willing to spend N hours on this." The signal is the effort, not the content. When the cost of producing effort-shaped output drops, the signal collapses.

**Long-tail digital infrastructure.** Small-town water treatment SCADA systems, hospital HVAC controllers, building management, traffic systems. Software from 2008, one maintainer who retired, accessible from the public internet. Both axes of the diagnostic fail: no defenders, and no re-hardening capacity. [TODO: find a specific real example.]

**Active markets as contrast.** Stock markets are the clearest counter-example. The incentive structure is maximally pro-attacker: finding inefficiencies *is the business model*. Well-funded adversaries probe the equilibrium continuously. The market isn't safe because attacking it is hard; it's safe because someone is actively defending the alpha. The unifying property of active markets is continuous, well-funded probing that forces the equilibrium to update.


## What happens when the lazy-efficient frontier moves

Every technology shift moves the boundary between what's lazily defended and what needs active defense. This isn't new. What's new is the speed and breadth of the current shift.

The historical pattern is instructive. Medieval fortifications were a lazy-market defense: building a castle was expensive, and the pool of actors with the resources to besiege one was small. Safety came from the effort floor. Then explosives arrived, and then mobile artillery, and the entire defensive paradigm shifted from "walls" to "maneuver." The lazy market of "nobody can breach these walls" collapsed, and what replaced it (field armies, strategic depth, mobile defense) was fundamentally different in kind, not just degree. The transition period was bloody. Actors who tried to solve the new problem with better walls lost.

The pattern: when the frontier moves, the domains that get hit aren't the ones that were already actively defended. The domains that get hit are the ones that were lazily defended and didn't know it. And the defenders' first instinct is almost always to reinforce the old defense rather than switch paradigms.

Adaptation matters, but adaptation has a speed. When the perturbation is faster than the adaptation, you get a transient, and some transients contain damage that doesn't unwind. Hardware in the field can't be un-deployed. Trust, once broken, takes generations to rebuild. People who get defrauded stay poorer. The new equilibrium might be fine; the trip there is the part that matters.


## Case: the current cybersecurity situation

The lazy-efficient frontier in cybersecurity is moving right now. Automated scanning, AI-assisted vulnerability discovery, and commoditized exploit kits are lowering the cost of attack across the board. The high-value targets already transitioned to active defense years ago. The question is what happens to the long tail.

The fortification-to-mobility analogy: perimeter-based security (firewalls, network boundaries, "keep the bad guys out") is the castle wall. It worked when the attacker pool was small and the effort floor was high. The mobility equivalent is probably zero-trust architecture and continuous monitoring: assume breach, verify everything, defend in depth rather than at the boundary.

But here's the lazy-market problem with that transition: zero-trust is expensive, complex, and requires continuous investment. The organizations that most need it (the long tail: small businesses, municipal systems, hospitals, schools) are exactly the ones least equipped to deploy it. The defenders who most need to adapt are the ones with the least capacity to adapt. This is predictable from the frame: lazy markets collapse hardest where the defense was laziest.

TODO: What specific predictions does this generate? Which cybersecurity domains are about to collapse that people aren't talking about? What does the new equilibrium look like for the long tail?


## Case: AI treaties and the EMH/LMH distinction

Nuclear arms control is the dominant mental model for AI governance, and the analogy might be structurally wrong.

Nuclear weapons capability is closer to an active market than a lazy one. The effort floor is enormous: enrichment infrastructure, weapons physics expertise, delivery systems, testing capacity. The set of actors who could cross that floor was small and identifiable. Treaties worked (to the extent they did) partly because the problem had this structure: you could bind a small number of known players and cover most of the risk.

AI capability has a fundamentally different cost structure. The effort floor is lower and dropping. The set of actors with meaningful capability is large and growing. Training runs are expensive but inference is cheap; fine-tuning is cheaper still; and the knowledge required is widely distributed. This is LMH-shaped: the current level of "safety" in many AI-adjacent domains is sustained not by how hard it is to do dangerous things with AI, but by the fact that most people with the capability haven't been motivated to try.

If this framing is right, it has implications for what governance structures can work. Treaties modeled on nuclear precedent (binding a small number of identifiable actors) address the EMH-shaped part of the problem (frontier labs, major state programs) and miss the LMH-shaped part (the long tail of capable actors with cheap access). The LMH-shaped part might need different tools: norms rather than treaties, infrastructure-level controls rather than actor-level controls, defense investment in the domains that are lazily defended rather than the domains that are already actively defended.

TODO: This section needs the nuclear treaty history to be more specific. Which treaties, what worked, what didn't, and why. The structural argument is clear but it needs concrete anchoring. Also: the "nuclear reactors" example from the notes (a treaty that banned reactors alongside weapons would have been safer by narrow x-risk metrics but worse overall) is relevant here. The point is that good governance of lazy markets has to account for local optimums, not just global ones.

TODO: there's also a connection to the Fragile World Hypothesis (Bostrom) here. LMH is a softer, more mechanistic version of FWH. FWH says "some technologies destroy the world." LMH says "some equilibria are sustained by effort floors, and when those floors drop, the equilibrium collapses." FWH is the extreme case where the collapse is existential. Worth a sentence or two, not a section.


TODO: cut entire predictions section, work the model to a better shape, and only then actually predict things.

## Predictions

If this frame is right, it makes specific predictions: [TODO: formalize these more carefully.]

- Lazy-market-shaped collapses (domains where security/quality/integrity degrades because of new *accessibility* of existing capabilities, not new capabilities) become visibly more frequent over the next 12 months.
- The domains hit first are the ones with the worst diagnostic scores: inherited defense, no re-hardening capacity, growing value. Effort-floor institutions (review systems, credentialing, reputation systems) should be early casualties.
- Defenses that are themselves lazy-market structures (LLM-review of LLM-submissions, AI-generated spam filters for AI-generated spam) provide temporary relief and then fail for the same structural reasons.
- Governance approaches modeled on active-market structures (binding small numbers of identifiable actors) underperform relative to governance approaches that address lazy-market dynamics (lowering defense costs, infrastructure-level controls).
- The gap between well-defended and poorly-defended systems increases, because active-defense transitions are expensive and only viable for high-value targets.

Calendar reminders: July 8 and October 8, 2026 to check these against reality.


---

## Writing notes (not for publication):

- Credibility sections (prior work, clean cases) placement is TBD. Might move earlier or later.
- The hard cases from the old spine (persuasion, biosecurity, alignment) are cut. Alignment got partially absorbed into the AI treaties section. The others can come back if the post needs more substance, but the current arc is tighter without them.
- The "Onni-response" is folded into section 7 (adaptation has a speed).
- Old clippings and conversation notes are archived below for reference.

- TODO: Important: We should add an "alignment is capability" example and how AI alignment is a domain where local / immediate alignment is an efficient market and deep / global / asymptotic alignment (e.g. no hidden misalignment) is a lazy market.

### Archived clippings:

- what are the nth order implications of lazy market theory / shifts in the laziness-frontier

what is a lazy market:
> "the incentives do not incentivize 'defenders' to invest in defence because the attack / breach cost doesn't realize (yet)" is how i'd frame the cybersec part.
    > Uh I think one other abstract way to think about this is that this is an instance of local vs global optimization phenomena.
    - And if you invest in the global optimum before optimizing enough for the local optimum, you get outcompeted.

what does it imply:
> general form of the implication: as humanity / tech develops new capabilities this frontier of which things have gotten away with ~security by no attackers being interested / security by laziness will sometimes shift significantly

- -> As the laziness frontier shifts, what happens:
    - New areas of 'defence' become valuable to invest in
    - Some old areas of defence become useless (aka we get new optimally-lazy areas)
        > ( think of the downfall of castles and walls as explosives got developed.)


---
(not my thought)
> A thought that I'm not quite sure about yet: this is connected to Nick Bostrom's fragile world hypothesis (that some technologies destroy the world, and we might eventually invent something like this), only LMH is a softer version (because the result is not always "destroy the world") and it's also more mechanistic, it shows how some kinds of breaking tech work.


Yeah I agree with the connection, when I thought of this at first (I guess 2 hours ago, lol) one of the first places I went was to go look at the Precipice x-risk list in general and try to distance myself from the cybersecurity frame (where i thought of this) to think in general terms.

I think if I think about this well it might have some interesting implications for what solutions for "fragile world" things are _stable_ in the real world. Since I think the solutions that will work / become stable depend a lot on giving in enough to the local optimums while preserving what matters about the global ones.


Example: A nuclear weapons treaty that would have also banned nuclear reactors could have resulted in a safer by nuclear x-risk numbers world, but also a worse world, by many metrics.


(Well, it would have also been politically impossible to push through, probably, and partially because people's intuitions about that world being worse because it seems worse might have been correct, IMO.)




# Attempt 2
(Xylix using the previous material as inspiration but writing from scratch, with her own words.)

## Defining

### The Efficient-Market Hypothesis (EMH)

> The efficient-market hypothesis (EMH) is a hypothesis in financial economics that states that asset prices reflect all available information. [^1]

Often people talk about the EMH either being true or not. Economists probably talk with more caveats but I'm not an economist. 

To me the EMH as stated contains a core flaw: It doesn't account for the cost of acting on a given piece of information, monetarily or in investor effort.

And this is a core piece of understanding illiquid markets. And it's also a core piece of understanding the real world. Why?

### Defining the Lazy-Market Hypothesis (LMH)

> The lazy-market hypothesis states that price equilibria reflect not all available information, but only the information whose exploitation clears the prevailing effort threshold.

It is a weaker, more concrete instance of EMH. Where EMH describes optimal markets, LMH describes realistic markets. 

(Source: I made it. (Relevant, but not trying to work on the abstraction level we're working with: The Omniscient yet Lazy Investor[^2]))

### Theory: why do lazy markets exist?

- The EMH defines economic markets / agents as arriving at the global optima.
    - But if you do this in the real world the real world punches you in the face.
    - So most agents who perform well chase local optima.
- 


### Claims and applications

- Most real-world economic agents are lazily rational if we take their laziness treshold as given.
    - And real world competition and market pressure outcompetes agents who are too eager.
    - The 
- Like many other markets, LMH generalizes to describing non-financial markets.
    - The "EMH" shaped corporation chases the global optimum - a lazy corporation chases the local optimum, often winning.
    - 

### Examples:

- The politician who is honestly acting for the good of a nation, and who isn't implementing Policy X that is theoretically optimal is not being irrational - they are constrained by attention, and being lazily rational. Not by the attention of reading the "theoretically optimal" policy proposals - by the attention of evaluating which theoretical policy proposals actually make sense, and how they relate to the other politics they are executing, etc.
- The corporation that is investing the minimal amount that fits their implicit (not explicit, because that might be illegal) risk model of cyber attack harm in cyber defence is _being lazily rational_. The real world often rewards this behaviour.

- You are the credit card fraud minimization executive in a corporation that does a lot of credit card based business. You try to get fraud to zero. Your company goes bankrupt.
    - > the optimal amount of fraud is greater than zero. [^3]
    - In my own words I'd describe the problem as: If you have a problem that is ~normally distributed, if you want to move the distributions midpoint far enough from the 0% that the tail doesn't actually touch it, you have to spend more money than you will gain moving the distribution far enough left.
        - You can actually change the shape of the problem, but then you need to do math. And not statistics math (or the insurance companies would have cracked this), but mathematical proofs. And you can't prove a bit about human behaviour.

The primary claim here is that most agents who _win_ are being _lazily rational_. And their laziness function is mostly good for their environment.

TODO: Steal patio11's "optimal credit card fraud is non-zero" reference.


### Counter-examples: Domains that chase the global optima
- Cryptography: Humanity, academia, corporations do actually invest in having systems that are theoretically provably secure.
    - Importantly still very rarely do economic agents bother to invest enough to make their implementations provably secure.
    - And you run into other problems: Bad actors, backdoors, ...
- ~math
- 

## When lazy actors meet

Let's look at the credit card fraud example again. Intuitively we have the "defender", who is the corporation selling goods, and the "attacker", which is an actor committing credit card fraud.

We can even approximate the equilibrium with a formula:
attack_success = defence_investment * defence_efficiency - attack_investment * attack_efficiency < 0

## Why is it relevant now?

It used to be efficient to build castles. Then someone went and invented explosives, and later mortars. Warfare changed from a defenders game into a mobility game. 

Historically, cybersecurity has been held together by the attacker's laziness. Anyone who has seriously thought about security, applying [security mindset](https://intelligence.org/2017/11/25/security-mindset-ordinary-paranoia/), is probably aware that most systems in the public internet are hackable, with the right resources.

Security is almost always a competition between the efficiency of attack and defence and between resource investment. Like the formula before.

Security people like to say that security by obscurity is not real security, but there is a part where it contributes. It reduces attack efficiency. If every adversary has to first figure out what you are running, it will reduce efficiency, to some degree.

But also, security has always been a game of making attacks non-profitable, not impossible.

I don't know how close we are to chorus, but I think what [Claude's Mythos is doing](https://cyberpress.org/anthropic-introduces-claude-mythos-preview-with-advanced-zero-day-discovery-capabilities/), is definitely at least the intro for an era change in cybersecurity.

If exploit-building becomes a commodity that can be purchased through API's or self-hosted in open-source models, given enough time, if we don't put in significant effort to hardening the internet it won't know what hit it.

And building better walls won't be enough. We'll need a paradigm change.

<!--When real-world states change and the information propagates, efficient market models update. When the effort treshold moves, lazy markets move, and they move the efficient markets with them.

Technological change is the best example I can think of.

There used to be -->


## What can't the lazy markets predict right?

- Out-of-distribution effects, unknown unknowns, black swans. Some of these are definitionally unpredictable, but there is a general shape where 


[^1]: [Wikipedia: Efficient-market hypothesis](https://en.wikipedia.org/wiki/Efficient-market_hypothesis)
[^2]: A formalized sub-scenario of lazy markets, is how I'd describe it: [The Omniscient yet Lazy Investor](https://arxiv.org/pdf/2510.24467)
[^3]: [Bits About Money: The optimal amount of fraud is non-zero](https://www.bitsaboutmoney.com/archive/optimal-amount-of-fraud/)
