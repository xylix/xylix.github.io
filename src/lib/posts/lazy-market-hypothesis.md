---
title: the Lazy Market Hypothesis
tagline: Some markets are (allegedly) efficient. Some markets are efficiently lazy.
tags: ['artificial-intelligence', 'ai']
version: v0.0.1
---

A small town in Finland. Bikes leaned against the library wall, unlocked. Not because the locks are expensive, but because nobody's ever taken one. The "security" here is that theft requires a thief, and the local supply of bike thieves is zero. If you installed a camera and a steel rack, you'd be solving a problem that doesn't exist. If a busload of opportunists rolled through, you'd lose every bike in an hour.

A mid-tier academic journal. Submissions come in, reviewers skim them, some get published. The quality filter isn't the review process. The quality filter is that writing a plausible-sounding paper used to take weeks of domain knowledge and effort. The review process is checking that the effort was spent, not that the conclusions are sound. It worked, mostly, because faking it was expensive.

A city's parking meter system, run on software last updated in 2011. The admin panel is accessible from the public internet. The password is `admin`. Nobody has exploited this, because nobody has looked, because parking meter revenue in a city of 40,000 isn't interesting to anyone with the skills to find it. TODO: check if there's a real public example of this kind of thing, or if this should stay as a constructed example.

These are all the same thing.

---

## The Lazy Market Hypothesis

The Efficient Market Hypothesis says that in liquid, well-monitored markets, prices reflect available information because someone is always trying to profit from mispricing. The moment alpha appears, someone captures it. That's what "efficient" means: continuously probed, continuously corrected.

Most of the world isn't like that.

Most of the world is held together not by active defense but by the absence of active attack. The bike isn't stolen because nobody tried. The journal isn't flooded with fakes because faking was too much work. The parking system isn't compromised because the payoff doesn't justify the effort of looking.

I'm calling these *lazy markets*: equilibria where the current level of safety, quality, or integrity is sustained not by the strength of defenders but by the scarcity or disinterest of attackers. The system sits at a local optimum that nobody has bothered to disturb.

The parallel to EMH is intentional. Efficient markets price in available *information*. Lazy markets price in available *effort*. Both are stable equilibria. Both can be disrupted when their underlying assumption changes.

## Why lazy markets were stable for so long

Human attention is genuinely scarce. Every attack, every exploit, every fraud requires someone to decide it's worth their time. For most of history, most systems were protected not by how hard they were to break, but by how many other things a potential attacker could be doing instead.

This wasn't visible as a defense mechanism because it was never designed as one. It was the background condition. Infrastructure, institutions, and norms all got built on top of it without anyone naming it as load-bearing.

Attention-as-defense has a specific shape: it protects broad, shallow targets well (there are so many unlocked bikes and so few thieves) and narrow, high-value targets poorly (if your bike is made of gold, someone will notice). It degrades gracefully as long as the ratio of targets to attackers stays high. And it fails catastrophically when that ratio inverts.

## The diagnostic

Given a domain, three questions:

1. **Was its current safety level earned by defenders, or inherited from attackers being rare?** If nobody is actively maintaining the defense, it's a lazy market.
2. **If attack pressure suddenly increased 100x, could defenders re-harden in time?** If the answer is "what defenders?", you have a problem.
3. **Is the value being protected growing, shrinking, or stable?** Lazy markets around shrinking value just quietly disappear. Lazy markets around growing value are time bombs.

A domain that scores "inherited," "no," and "growing" is a lazy market approaching collapse.

## The unifying frame

EMH and LMH aren't competing theories. They're descriptions of what local rationality looks like under different cost structures.

Markets are efficient where exploiting alpha is locally rational for well-resourced agents: the cost of probing is low relative to the expected payoff, so probing happens continuously, and the equilibrium reflects that continuous probing.

Markets are lazy where exploiting vulnerabilities is locally *irrational*: the cost of attacking exceeds the expected payoff (accounting for effort, risk, opportunity cost, and the non-trivial psychological cost of becoming-an-attacker). So nobody attacks, and the equilibrium reflects *that*.

The interesting event is the phase transition between regimes. When the cost of attention drops, domains slide from LMH-shaped toward EMH-shaped. During the transition, the old equilibrium dissolves before the new one forms. That gap is where damage happens.

This connects directly to Yudkowsky's *Inadequate Equilibria*: his cases are about local rationality holding systems at stable *bad* points (coordination failures, signaling traps). LMH cases are about local rationality holding systems at apparently *good* but contingent points. They're cousins. Both are about the gap between local and global rationality, failing in opposite directions. NOTE: the Inadequate Equilibria connection could be its own subsection. For now, keeping it tight.

One more thing that matters for the frame: lazy markets can collapse from two directions. The obvious one: the cost of attention drops (AI makes probing cheap). The less obvious one: the *population of potential attackers shifts*. Preferences about whether to attack are sustained by culture, identity, friction, by who counts as a "normal person" doing "normal things." When those structures shift, the local rationality calculation shifts too, even without the underlying values changing. AI lowers the friction of becoming-an-attacker, which changes who's willing to be one. Both collapse paths are in play simultaneously.

## Prior work

The lazy market pattern has been stated, in narrower forms, multiple times. Dan Davies in *Lying for Money* (2018): "fraud is an equilibrium quantity." Patrick McKenzie's popular treatment of the same idea across payments, KYC, and benefits fraud. The LessWrong post "Terrorism, Tylenol, and dangerous information" (2018), which states half of LMH for terrorism: "the main constraint on an attack vector can really just be that the types of people who make attacks haven't thought of it yet." Yudkowsky's *Inadequate Equilibria* catalogues the family of stable-bad equilibria that LMH's stable-fragile equilibria are cousins to. [TODO: add links for all of these.]

What's new here is the cross-domain generalization: these are all instances of the same cost-structure phenomenon, and the transition dynamics (what happens when the cost of attention collapses across all of them simultaneously) are the part that matters most right now.

Background: Grossman-Stiglitz (1980) on why perfectly efficient markets are impossible; routine activity theory (Cohen & Felson, 1979) in criminology; Ross Anderson's economics-of-information-security work. [TODO: footnote or parenthetical, not body text.]

## Clean cases

**Cybersecurity** was the entry point for this frame, and it's the cleanest example. Most vulnerable software is vulnerable not because the vulnerability is hard to fix, but because nobody is maintaining it *and* nobody is attacking it because the payoff isn't there. The equilibrium is laziness on both sides. When automated scanning tools made probing cheap, the domains where attack payoff was high (financial services, large enterprises) transitioned to active markets with continuous defense. The long tail (small businesses, personal infrastructure, IoT devices) stayed lazy.

**Long-tail digital infrastructure.** Small-town water treatment SCADA systems, hospital HVAC controllers, building management, irrigation controllers, traffic systems. Software from 2008, one maintainer who retired, accessible from the public internet. The defense is that nobody is looking. Both axes of the diagnostic fail: no defenders, and if attack pressure rises, there's nobody to call. [TODO: find and cite a specific real example. There are dozens.]

**Effort-floor institutions.** Peer review, grant applications, college admissions essays, court filings, insurance claims, product reviews, reputation systems. All of these extract signal from "this person was willing to spend N hours on this." The signal is the effort, not the content. When the cost of producing effort-shaped output drops, the signal collapses. This is already happening with LLM-aided submissions to journals, and the defenses being deployed (LLM-aided review, increased credentialism) are themselves effort-floor structures. The lazy market is being defended by another lazy market. [TODO: is there a clean term for this recursive pattern?]

**Hardware and firmware.** If a Spectre-class vulnerability is found in deployed silicon, the patch cycle is *product generations*. There is no software fix for "the CPU is wrong." This is the unpatchable extreme of the lazy market: even if defenders wanted to respond, the medium doesn't permit it on any relevant timescale.

**Active markets as contrast.** Stock markets are the clearest counter-example. The incentive structure is maximally pro-attacker: finding inefficiencies *is the business model*. Well-funded adversaries probe the equilibrium continuously. The market isn't safe because attacking it is hard; it's safe because someone is actively defending the alpha. Other active markets: modern web security at well-resourced companies, ad fraud detection at Google scale, high-frequency trading. The unifying property is continuous, well-funded probing that forces the equilibrium to update.

## Hard cases

These are features of the frame, not bugs. A frame that cleanly sorts everything is too coarse to be useful. The productive ambiguity in specific cases is where the frame earns its keep.

### Persuasion

Partially lazy, partially active. The *closed set* of historical attack patterns (sales scripts, classic cons, cult recruiting techniques) is defended by millennia of cultural and psychological adaptation. People have heuristics against the Nigerian prince email because that pattern has been pentested for generations. That's an active market.

The *open set* of novel persuasion patterns has no such defense. When a new persuasion technique appears (targeted microcontent, AI-personalized emotional manipulation, synthetic social proof at scale), there's no accumulated cultural immunity. The frame predicts that persuasion gets cooked at the margins, not in the center. The known attacks stay defended. The novel ones walk through.

TODO: this is the section where the "preferences are sustained by structures" point from the notes should land. The friction of becoming-a-manipulator is part of what's kept the lazy-market side of persuasion stable. If AI lowers that friction...

### Scientific publishing

A lazy market actively collapsing in real time, which the reader can verify by checking their own field's recent conferences. The recursive structure is the interesting part: the defenses being deployed are themselves lazy-market structures.

LLM-aided review as a response to LLM-aided submissions is the same cost structure one level up. Increased credentialism (requiring institutional affiliations, senior co-authors, track records) is a different lazy-market defense: it extracts signal from "this person invested years in a career," which is a higher effort floor but the same mechanism. Both defenses work until the cost of clearing the new floor drops, and both have collateral damage (excluding legitimate outsiders, calcifying hierarchies).

The post-hoc interesting question: what would a genuinely *active* defense of scientific publishing look like? Replication requirements, prediction markets on findings, adversarial review by people incentivized to find errors rather than check boxes. These are expensive, which is exactly why the field has been using effort-floor defenses instead. TODO: this paragraph is gesturing at something important but is still vague. Sharpen.

### Biosecurity

Two-axis answer. The natural attack surface is heavily defended: an active market with hundreds of millions of years of immune-system pentesting, hardened by selection. Pathogens that can get through are genuinely capable adversaries. This isn't a lazy market; it's a very active one with a very effective defense.

The *intentional* attack surface is partially lazy. Historically: small set of actors with both capability and intent, legal and ethical barriers acting as effort floor, wet-lab tacit knowledge as an additional barrier. The frame predicts that intentional bioattacks may look more like "lazy market gets disrupted" than the natural-pathogen baseline would suggest, because the bottleneck has been effort and access rather than fundamental difficulty.

[TODO: I am hedging this heavily because biosecurity is out of my core competence. The structural analysis seems sound to me but I want to flag explicitly that the object-level claims about what's easy or hard in biology are places where I could be wrong. The frame applies regardless of where the actual difficulty bar is; it's a question about what the defense depends on, not about absolute difficulty.]

### AI alignment

This is the meta-case.

*Local alignment* (the AI does what you ask it to do) is roughly an active market. Continuous, well-funded probing: red teams, bug bounties, deployment feedback loops, the entire RLHF pipeline, user reports. When a jailbreak appears, it gets patched. The defense is active because local alignment is load-bearing for the business model. This is the part of AI safety where the incentives are already aligned with the defense.

*Global alignment* (the AI doesn't scheme, doesn't have misaligned long-term goals, doesn't produce catastrophic tail-risk behavior) has almost none of this. The value being protected isn't yet realized. The relevant "attackers" (misaligned mesa-optimizers, deceptive alignment, goal drift under distribution shift) don't yet exist at scale. And it's defended primarily by "nobody is currently smart enough to break it" and "current models aren't capable enough for this to matter."

That's textbook lazy market structure, and it's the lazy market with the highest stakes.

The specific diagnostic: Was the current safety level earned or inherited? Inherited. (Current frontier models appear globally aligned mostly because they're not capable enough for misalignment to be a meaningful strategy.) Can defenders re-harden if pressure increases? Unclear, and the "defenders" are largely the same organizations generating the pressure. Is the value growing? Yes, by orders of magnitude per year.

NOTE: This section should be hedged less than my instinct suggests. The analysis is structural, not empirical. You don't need to believe any specific alignment threat model to accept that the structure of the defense looks lazy-market-shaped. The claim is about what the defense depends on, not about what will happen.

## On adaptation rates

A fair response to all of the above: systems adapt. Equilibria reassert. Doom predictions tend to underweight homeostasis. The immune system adapted; so will institutions. This is Onni's "Always Account for Adaptation" point, and it's real. [TODO: replace "Onni's point" with the actual reference/context; the reader won't know who Onni is.]

The lazy market frame is a refinement of this, not a counter. The refinement: adaptation has *units*. It runs at a speed. When the perturbation timescale is faster than the adaptation timescale, you get a transient regime, and some transients contain damage that doesn't unwind.

Hardware in the field can't be un-deployed. Trust, once broken, takes generations to rebuild. People who get defrauded stay poorer. Scientific credibility lost to a flood of fake papers isn't recovered by later improving the review process. The new equilibrium might be fine; the trip there is the part that matters.

The lazy market frame tells you which adaptations are too slow to matter on the relevant timescale. If the perturbation is "automated scanning of every public-facing server on earth" and the adaptation cycle is "IT department reviews security policy annually," the adaptation exists but is irrelevant. [TODO: cite "A Theory of Equilibrium in the Offense-Defense Balance" (LessWrong, 2024) in this section.]

## What happens when a lazy market gets disrupted

Three outcomes, and most domains will land on one of these:

**(a) Active defense.** The domain transitions from lazy to active. Continuous monitoring, real-time response, well-funded defense teams. This is expensive. It's viable for high-value targets: financial systems, critical infrastructure, frontier AI labs. It's not viable for the long tail. You can't hire a security team for every small-town water system.

**(b) Structural change that removes the vulnerability.** Redesign the system so the attack surface doesn't exist. Move the parking meter system offline. Replace effort-floor credentialing with something that doesn't depend on effort being expensive. This is slow and often impossible, because the vulnerability is usually a feature of the system's design, not a bug.

**(c) Accept the lower equilibrium.** The new normal is worse. More fraud, more spam, more exploitation, more noise. Systems that used to work stop working. The remaining signal gets extracted by whoever can filter through the noise. Everyone else gets a worse deal.

Most disrupted lazy markets end up at (c). The interesting question is which ones we should try to drag toward (a) or (b), and whether we can.

## The AI connection

To be clear: this post isn't an AI risk post. The lazy market frame applies whether or not AI exists. Lazy markets have been collapsing for as long as technology has been changing cost structures: the printing press collapsed the effort-floor defense of manuscript culture; industrialized agriculture collapsed the lazy market of subsistence farming's natural pest resistance.

What makes AI the current instantiation worth naming: the cost of *attacker-attention* is collapsing across many domains simultaneously. Every lazy market priced in attention being expensive. AI makes attention cheap. Not in the future, not contingent on further capability gains. Current models, deployed at current scale, with current infrastructure, are already enough to shift the cost structure for many lazy markets.

This is a subplot of the AI story, not the main plot. But it's the subplot most likely to play out fastest, because it doesn't require anything we don't already have.

TODO: reference the Mythos thread here. Cybersecurity is one application of the frame, not the motivation for it. Don't let this section become the climax; the hard cases section is the climax.

## Predictions

If this frame is right, it makes specific predictions: [TODO: formalize these more carefully. The Twitter thread had some numbers; I want to be more precise here about what would count as confirmation vs. disconfirmation.]

- Lazy-market-shaped collapses (domains where security/quality/integrity degrades not because of new capabilities but because of new accessibility of existing capabilities) become visibly more frequent over the next 12 months.
- The domains hit first are the ones with the worst diagnostic scores: inherited defense, no re-hardening capacity, growing value. Effort-floor institutions (review systems, credentialing, reputation systems) should be early casualties.
- Defenses that are themselves lazy-market structures (LLM-review of LLM-submissions, AI-generated spam filters for AI-generated spam) provide temporary relief and then fail for the same reasons.
- Active-defense transitions happen in high-value domains and don't happen in the long tail, leading to an increasing gap between well-defended and poorly-defended systems.
- 70% odds a frontier AI model breaks some prediction market or stock market anomaly within 365 days; 5% the attribution is ambiguous human-vs-model. [TODO: this one is from the Twitter thread and needs re-evaluation. Is it actually a lazy-market prediction or an EMH prediction?]

Calendar reminders: July 8 and October 8, 2026 to check these against reality.

## The personal version

Here's the exercise. Look at your own life and ask: which things that are currently "fine" are fine because nobody has bothered to test them?

Your email account's security. The lock on your storage unit. The assumption that your neighbors won't read your mail. The informal agreements you haven't put in writing. The reputation you haven't had to defend.

Most of these will stay fine. The point isn't paranoia. The point is noticing which things you're treating as *robust* that are actually *untested*. Robust and untested feel the same from the inside until the test arrives.

[TODO: this closing section is the weakest part of the draft. It's doing the "and now, a personal reflection" move that every blog post does. Either find a way to make it land harder or cut it and end on predictions.]
