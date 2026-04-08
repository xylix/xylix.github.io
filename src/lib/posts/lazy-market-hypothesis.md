---
title: the Lazy Market Hypothesis
tagline: Some markets are (allegedly) efficient. Some markets are efficiently lazy.
tags: ['artificial-intelligence']
version: v0.0.1
---

(continuing from the tagline: (, at their local optimums.))


Examples:
1. You get a sales call about a new, better cell phone plan that is only 4.99 more expensive than your current one. You're not interested, and close the phone.
2. Scientific journals and conferences start to get bogged down in LLM-aided submissions. Solution 1: llm-aided review / pre-screening. Solution 2: Increase credentialism.
3. TODO: clarify with evolution example, don't touch for now.
4. TODO: add example 4


## What about AI alignment?

In AI alignment _local alignment_ (the AI does what you ask it to do) is very important for capability, the vendors see this, and so it's a pretty efficient market.

TODO: edit ...
But _global alignment_: lack of scheming, tail risks in LLM behaviour, ... is very much a lazy market. Labs have harmfulness classification models and guardrails, but those don't actually answer the cases where an AI agent in the wild goes and does something bad. And this is already happening. It's easy to conceptualize some examples about scheming, non-faithful chain of thought, ..., and then the complicated case of misalignment is multiple steps more difficult than this.



## Clippings / writing notes:

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
> A thought that I’m not quite sure about yet: this is connected to Nick Bostrom’s fragile world hypothesis (that some technologies destroy the world, and we might eventually invent something like this), only LMH is a softer version (because the result is not always “destroy the world”) and it’s also more mechanistic, it shows how some kinds of breaking tech work.


Yeah I agree with the connection, when I thought of this at first (I guess 2 hours ago, lol) one of the first places I went was to go look at the Precipice x-risk list in general and try to distance myself from the cybersecurity frame (where i thought of this) to think in general terms.

I think if I think about this well it might have some interesting implications for what solutions for “fragile world” things are _stable_ in the real world. Since I think the solutions that will work / become stable depend a lot on giving in enough to the local optimums while preserving what matters about the global ones.


Example: A nuclear weapons treaty that would have also banned nuclear reactors could have resulted in a safer by nuclear x-risk numbers world, but also a worse world, by many metrics.


(Well, it would have also been politically impossible to push through, probably, and partially because people’s intuitions about that world being worse because it seems worse might have been correct, IMO.)


### Claude notes:

08.04.2026 approx 10:10
Lazy Market Hypothesis — working brief
Core claim
A surprising amount of the world’s apparent stability is held together not by defenders being strong, but by attackers being scarce or unmotivated relative to available value. These are lazy markets: equilibria sustained by an effort floor rather than by intrinsic difficulty. The frame is a parallel to EMH — efficient markets price in available information; lazy markets price in laziness, and both can be disrupted when their underlying assumption changes.
The frame’s current relevance: attacker-attention is getting cheap. Lazy markets that have been stable for decades because effort was scarce are about to be stress-tested in ways their defenders never planned for.
Why lazy markets exist and were stable for so long
Human attention is the scarcest resource in the universe. Any system that successfully imposed an attention cost on attackers got most of the benefit of “real” defense for free. Institutions and infrastructure got built on top of attention-as-defense without anyone naming it as the load-bearing thing. It wasn’t visible as a defense mechanism until the assumption started to break.
The diagnostic — questions to ask about a domain
	1.	Was its current safety level earned by defenders, or inherited from attackers being rare?
	2.	If attack pressure suddenly went up, could defenders re-harden in time?
	3.	Is the value being protected growing, shrinking, or stable? (Lazy markets around shrinking value just disappear; lazy markets around growing value are time bombs.)
A domain scoring badly on (1) and (2) is a lazy market about to collapse. The 2x2 of lazy vs active × patchable vs unpatchable generates the taxonomy.
Active markets — the contrast case
Stock markets are the cleanest contrast. The incentive structure is already maximally pro-attacker — finding inefficiencies is the business model — and well-funded racers are continuously probing the equilibrium. The market isn’t safe because attacking it is hard; it’s safe because someone is actively defending the alpha. Most of the world has nobody actively defending.
Other active markets: modern web security at well-resourced companies, ad fraud at Google scale, high-frequency trading. The unifying property is continuous well-funded probing that forces the equilibrium to update.
Clean cases where the frame applies
	∙	Cybersecurity (the entry point): never held together by “this is hard,” held together by “nobody bothered.” Most vulnerable software is vulnerable because no one is maintaining it and no one is attacking because there’s nothing in it worth the effort.
	∙	Long-tail digital infrastructure: small-town water treatment, hospital HVAC, building management, irrigation controllers, traffic systems. Software from 2008, one maintainer who retired, online by accident. Both axes fail.
	∙	Effort-floor institutions: peer review, grant applications, college admissions, court filings, insurance claims, reviews, reputation systems. All extracting signal from “willing to spend N hours.” Signal collapsing.
	∙	Hardware/firmware/ICS as the unpatchable extreme: if a Spectre-shaped vulnerability is found in deployed silicon, the patch cycle is product generations. There is no software fix for “the CPU is wrong.”
	∙	Bike locks in a small town, walking into a building wearing a high-vis vest, vexatious litigation rate-limited by attention, tax fraud “too small to audit”: physical/social examples that show the pattern isn’t digital-specific.
Hard cases — the productive ambiguity
These are features of the frame, not bugs. A frame that cleanly sorts everything is too coarse to be interesting; productive ambiguity in specific places is where the frame earns its keep.
Persuasion. Partially lazy. The closed set of historical attack patterns (sales scripts, classic cons, cult recruiting) is heavily defended by cultural and psychological adaptation — that’s an active market with millennia of pentesting. The open set of novel attack patterns has no such defense. Frame’s prediction: persuasion gets cooked at the margins, not in the center.
Scientific journals and conferences. A lazy market actively collapsing in real time and the reader can verify it. The recursive interesting part: defenders know it’s collapsing and their defenses (LLM-review, credentialism) are themselves lazy-market structures. The lazy market is being defended by another lazy market. This generalizes — many current “AI defenses” are lazy-market structures and will fail for the same reasons.
Biosecurity. Two-axis answer. The natural attack surface is heavily defended (active market, hundreds of millions of years of immune-system pentesting, hardened by selection). The intentional attack surface is partially lazy (small attempt set historically, legal/ethical barriers acting as effort floor, wet-lab tacit skill as additional barrier). Frame predicts that intentional bioattacks may look more like “lazy market gets disrupted” than the natural-pathogen baseline would suggest. Hedge heavily — out of strength area — but the structural analysis is sharp.
AI alignment — the meta-case and probably the climax. Local alignment is roughly an active market: continuous well-funded probing via red teams, bug bounties, deployment feedback, the entire RLHF pipeline. Global/asymptotic alignment has almost none of this — the value being protected isn’t yet realized, the relevant attackers don’t yet exist, and it’s defended entirely by “nobody is currently smart enough to break it.” That’s textbook lazy market structure, and it’s the lazy market with the highest stakes.
The Onni-response on adaptation rate
Onni’s “Always Account for Adaptation” makes a real and important point: systems adapt, equilibria reassert, doom predictions tend to underweight homeostasis. The lazy market frame is a refinement of this, not a counter to it.
The refinement: adaptation has units. When the perturbation timescale is faster than the adaptation timescale, you get a transient regime — and some transients contain things that don’t unwind. Hardware in the field can’t be un-deployed. Trust, once broken, takes generations to rebuild. People who get defrauded once stay poorer. The new equilibrium might be fine; the trip there is the part that matters.
The lazy market frame tells you which adaptations are too slow to matter on the relevant timescale.
What happens when a lazy market gets disrupted
Three outcomes:
	∙	(a) Active defense. Expensive, only viable for high-value targets.
	∙	(b) Structural change that removes the vulnerability. Slow, often impossible.
	∙	(c) Accept the lower equilibrium and adapt. Most common historically, often painful.
Most disrupted lazy markets end up at (c). Part of the post can be about which ones we should try to drag toward (a) or (b).
The AI connection (as application of the frame, not motivation)
The cost of attacker-attention is collapsing, and every lazy market priced in attention being expensive. This isn’t the AI risk story; it’s a subplot — but it’s the subplot most likely to play out fastest, because it doesn’t require any further capability gains. Current models are already enough; the infrastructure just needs deployment.
Reference the Mythos thread here without making the post about Mythos. Cybersecurity is one application of the frame, not the motivation for it.
Predictions / falsifiability
Pull from the Twitter thread:
	∙	70% odds a frontier AI model breaks some prediction or stock market within 365 days; 5% it’s ambiguous human-vs-model.
	∙	“Lazy market pattern visibly applying to more domains in 3-6 months” — define what evidence would count as “yes, called it” vs “hmm, not really” now, so future-self can check honestly.
Voice and structural notes for drafting
	∙	Audience: rationalist/EA/AI-safety adjacent. Can assume EMH familiarity, Goodhart, equilibrium reasoning.
	∙	Open with examples, not the name. Triad of visibly different domains — at least one non-tech — so the click happens before the label. Candidate triad: bike locks in a small town, peer review at a mid-tier journal, an unmaintained server running a city’s parking system. End the section with “these are all the same thing.”
	∙	Don’t open with AI. First ~60% of the post should be non-AI so the frame doesn’t get pre-categorized as “an AI take.” Bring AI in as application, not motivation.
	∙	The hard-cases section is where the post earns its keep. Write it first and most carefully. Persuasion, journals, biosecurity, alignment — each gets its own subsection. These are the most original part.
	∙	Cut examples ruthlessly. The frame applies to so many things that the post will want to grow forever. Pick three or four strongest per cell of the 2x2 and stop. Every additional example past the necessary minimum dilutes the thesis into a list.
	∙	Hedge biosecurity heavily but include it. The structural analysis is interesting; don’t let the out-of-lane discomfort kill the section.
	∙	Hedge AI alignment less than tempted. The analysis is structural, not empirical — defensible even from people who disagree about alignment substance.
Tagline and opener
Tagline (short): Some markets are (allegedly) efficient. Some are efficiently lazy.
Opening line of the post (long version): Some markets are (allegedly) efficient. Some markets are efficiently lazy, sitting at a local optimum nobody’s bothered to disturb.
The “(allegedly)” is doing the rhetorical work — playful about EMH, earns the right to invent a parallel concept. “Nobody’s bothered” foreshadows the recurring phrase of the post.
Post title is a separate decision and should be more inviting than the concept name. Candidates: “Things were safe because nobody bothered” or “The hidden defense that’s about to disappear.” The concept gets named in the post; the title is what makes someone click.
Suggested spine
	1.	Three examples, no name yet — the triad. End with “these are all the same thing.”
	2.	Name and define. EMH parallel. Core claim in one sentence.
	3.	Why lazy markets are stable for so long — the attention-as-defense story.
	4.	The diagnostic — two or three questions.
	5.	Clean cases — cyber, infrastructure, effort-floor institutions, hardware. Recycle the algorithmic trading contrast.
	6.	Hard cases — persuasion, journals, biosecurity, alignment. The long middle. The most original section.
	7.	The Onni-response on adaptation rate — brief, generous.
	8.	What happens when lazy markets get disrupted — the (a)/(b)/(c) trichotomy.
	9.	The AI connection as application of the frame.
	10.	Predictions and falsifiability.
	11.	Close on the personal — notice the lazy markets in your own life. Which “fine” things are actually “nobody bothered” things.
Reminders to self
	∙	The Twitter thread is the entry point; this post is the durable thing. Take the time the thread couldn’t.
	∙	Sections 3 (why-stable) and 6 (hard cases) are load-bearing. Don’t run out of energy before them.
	∙	Calendar reminders set for July 8 and October 8, 2026 to check the 3-6 month prediction.

08.04.2026 approx 10:33 
Intellectual lineage (the big one)

The post has a real lineage to claim, not just adjacent fields. Specifically:

Dan Davies, Lying for Money (2018): the line "fraud is an equilibrium quantity." This is the closest existing formal statement of LMH, scoped to fraud.
Patrick McKenzie, "The optimal amount of fraud is non-zero" (2022) and "The fraud supply chain": the popular treatment, with explicit credit to Davies. McKenzie has been writing case studies of LMH-shaped dynamics for years across payments, debt collection, KYC, benefits fraud — without naming the general pattern.
Yudkowsky, "An Equilibrium of No Free Energy" / Inadequate Equilibria (2017): the rationalist canonical work on stable bad equilibria. LMH is a type of inadequate equilibrium Yudkowsky doesn't focus on. His cases are coordination failures, signaling traps, principal-agent problems. Yours is equilibria sustained by attacker scarcity. Distinct mechanism, same family. This is the prior text the post is most directly in dialogue with and cannot be ignored.
LessWrong, "Terrorism, Tylenol, and dangerous information" (2018): states one half of LMH for the specific case of terrorism. Quote: "the main constraint on an attack vector can really just be that the types of people who make attacks haven't thought of it yet." Existence proof that the rationalist community is receptive to this framing.
Eliezer's "Security Mindset" sequence (2017): adjacent psychological/methodological angle on the gap between effort-based defense and real defense. One-line acknowledgment, not deep engagement.
"Access to powerful AI might make computer security radically easier" (2024, Buck Shlegeris-adjacent): the optimistic counterpart to your thread. LMH gives you a clean response — AI helps active markets defend, doesn't help lazy markets because their defenders aren't defending, they're absent.
"A Theory of Equilibrium in the Offense-Defense Balance" (LessWrong, 2024): does some of the same work as your Onni-response, formally. Cite in that section.
Background fields to name-drop without explaining: Grossman-Stiglitz (1980) on why perfectly efficient markets are impossible because information has a cost; routine activity theory (Cohen & Felson, 1979) in criminology; Ross Anderson's economics-of-information-security tradition.



Positioning shift this enables

LMH is no longer "an internet stranger has a take." It's a generalization of an existing serious tradition with credible lineage. Davies stated it for fraud; McKenzie wrote case studies; Yudkowsky catalogued related equilibrium failures; the Tylenol post stated a version for terrorism. Nobody did the cross-domain generalization.
The post should claim modest novelty: not "I invented this" but "here's the cross-domain pattern; here's what's specifically new (transition dynamics); here's why it matters now."
The "Lazy Market Hypothesis" name is pitched well for this — modest, EMH-parallel, not a manifesto.

The unifying frame (the second big one)

EMH and LMH are both descriptions of what local rationality looks like under different cost structures. Markets are efficient where exploiting alpha is locally rational; markets are lazy where it isn't. The interesting question is always what would have to change for the calculation to flip.
The unification: wherever you see a stable equilibrium, ask what the local rationality calculation looks like for the agents who aren't disrupting it. Sometimes the answer is "they tried, and prices reflect their efforts" (EMH-shaped). Sometimes it's "they didn't try, because trying wasn't worth it" (LMH-shaped). Same family of equilibria, different mechanism.
Phase transition between the two regimes happens when the cost of attention changes. Lower attention costs move domains from LMH-shaped toward EMH-shaped, and the transition is the part that matters — because during the transition, the equilibrium the system was resting on dissolves before the new one forms.
This connects LMH directly to Inadequate Equilibria: Yudkowsky's cases are local rationality holding the system at a bad point (stable bad). LMH cases are local rationality holding the system at an apparently good but contingent point (stable fragile). They're cousins — both are about the gap between local and global rationality, failing in opposite directions.

The "preferences" attack point and how to frame it

The frame ("agents are locally rational") is at risk of becoming a tautology if you don't constrain it. The bite comes from: local preferences may systematically diverge from preferences agents would endorse on reflection, and this divergence is itself part of what holds lazy markets in place.
Concretely: most people who could commit small fraud or pick low-hanging exploit fruit don't, even when expected value is positive. The reasons (ethical priors, identity, status, opportunity cost, friction of becoming-an-attacker) are real preferences but culturally and psychologically maintained, not fundamental.
Therefore lazy markets can collapse from two directions: (a) cost of attention drops (the AI story directly); (b) population of potential attackers shifts toward people with different preferences (the cultural story, also being driven by AI indirectly — by lowering the friction of becoming-an-attacker, AI changes who's willing to be one).
Framing discipline: don't say "preferences may be irrational" — that's a philosophical swamp. Say instead: "preferences are sustained by structures that can change — by culture, identity, friction, by who counts as a 'normal person' doing 'normal things.' When those structures shift, the local rationality calculation shifts too, even if the underlying values don't." This formulation does the same work without committing you to claims about the rationality of preferences in the abstract, and connects cleanly to the AI story (AI changes structures, not values).

Structural placement of the unification section

The unification belongs after the diagnostic and before the cases. Reader needs LMH as a concrete thing before they can appreciate it as a member of a family.
Two or three paragraphs. Don't try to fully formalize. Point at the shape.
This is the section that makes the post feel deep and citable rather than just useful. Worth getting right.

The integration paragraph for prior work

Probably one paragraph mid-post (~150 words), name-checking Davies, McKenzie, Yudkowsky, the Tylenol post. Plus a sentence or footnote on Grossman-Stiglitz / routine activity theory / Anderson.
Discipline: name and link, do not explain. The reader who needs explanation will Google; the reader who doesn't will appreciate not being condescended to.
Suggested framing: "Yudkowsky catalogued why bad equilibria persist. I want to add a type he didn't focus on: equilibria that appear fine because the actors who would disrupt them haven't bothered, and what happens when the cost of bothering collapses."

Updated spine (revised from the brief)
The brief's spine still mostly holds, but with two insertions:

Three examples, no name yet.
Name and define. EMH parallel.
Why lazy markets are stable for so long — attention-as-defense.
The diagnostic.
NEW: The unifying frame. EMH and LMH as two cost-structure regimes of local rationality. The phase transition. The cousinship with Inadequate Equilibria.
NEW: Intellectual lineage paragraph. Davies, McKenzie, Yudkowsky, Tylenol post, brief footnote for the cross-field references.
Clean cases — cyber, infrastructure, effort-floor institutions, hardware. Algorithmic trading contrast.
Hard cases — persuasion, journals, biosecurity, alignment. The long middle. Most original section.
Onni-response on adaptation rate. (Cite the offense-defense LW post here.)
What happens when lazy markets get disrupted — the (a)/(b)/(c) trichotomy.
The AI connection as application of the frame.
Predictions and falsifiability.
Close on the personal.

Status check

Sections 5 (unification) and 8 (hard cases) are now the two load-bearing original-contribution sections. Sections 3 and 6 are credibility-establishing and shouldn't be skipped, but they're scaffolding rather than the core.
The post is more publishable than it was six messages ago, not less, because the lineage gives intellectual cover and the unification gives conceptual depth. The risk has shifted from "is this novel enough?" to "can I do justice to the unification without bloating the post?"
You're cleared to draft. The next useful conversation is probably either (a) drafting the unification section as prose to test whether the framing holds together, or (b) drafting the hard-cases section, since that's where the post earns its keep intellectually.
