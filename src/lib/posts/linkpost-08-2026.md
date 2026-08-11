---
title: Linkpost (August 2026)
tags: ['links']
tagline: Readings from ~recent times
---

I've been reading a bunch of stuff lately and wanted to make a public list with short descriptions so - here it is.


Vaguely categorized.


On research:
- Richard Hamming's [You and your research](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html) talk transcript. I keep revisiting this. It's a great primer on the fact that even though you can't just decide to succeed in solving something significant, there are habits and strategies you can apply to your research which result in meaningful differences between researchers.
    - highlights:
        - >  I find that the major objection is that people think great science is done by luck. 
        - > And I will cite Pasteur who said, "Luck favors the prepared mind." And I think that says it the way I believe it. There is indeed an element of luck, and no, there isn't. The prepared mind sooner or later finds something important and does it. So yes, it is luck. The particular thing you do is luck, but that you do something is not.
        - > One of the characteristics of successful scientists is having courage. Once you get your courage up and believe that you can do important problems, then you can. If you think you can't, almost surely you are not going to. Courage is one of the things that Shannon had supremely. You have only to think of his major theorem. He wants to create a method of coding, but he doesn't know what to do so he makes a random code. Then he is stuck. And then he asks the impossible question, "What would the average random code do?" He then proves that the average code is arbitrarily good, and that therefore there must be at least one good code. Who but a man of infinite courage could have dared to think those thoughts? That is the characteristic of great scientists; they have courage. They will go forward under incredible circumstances; they think and continue to think.


- Holden Karnofsky's texts [Useful vices for wicked problems](https://www.cold-takes.com/useful-vices-for-wicked-problems/), [Minimal trust investigations](https://www.cold-takes.com/minimal-trust-investigations/) and [Learning by writing](https://www.cold-takes.com/learning-by-writing/) are very useful toolkit pieces for how to think and write and research difficult subjects.

- Wei Dai: [Legible vs. illegible AI safety problems](https://www.lesswrong.com/posts/PMc65HgRFvBimEpmJ/legible-vs-illegible-ai-safety-problems) offers another useful lens for thinking about foundational research, here specifically in the context of AI safety.
    - > Some AI safety problems are legible (obvious or understandable) to company leaders and government policymakers, implying they are unlikely to deploy or allow deployment of an AI while those problems remain open (i.e., appear unsolved according to the information they have access to). But some problems are illegible (obscure or hard to understand, or in a common cognitive blind spot), meaning there is a high risk that leaders and policymakers will decide to deploy or allow deployment even if they are not solved. (Of course, this is a spectrum, but I am simplifying it to a binary for ease of exposition.)
    - > Problems that are illegible to leaders and policymakers are also more likely to be illegible to researchers and funders, and hence neglected. I think these considerations have been implicitly or intuitively driving my prioritization of problems to work on, but only appeared in my conscious, explicit reasoning today.
    - > Perhaps the most important strategic insight resulting from this line of thought is that making illegible safety problems more legible is of the highest importance, more so than directly attacking legible or illegible ones, the former due to the aforementioned effect of accelerating timelines, and the latter due to the unlikelihood of solving a problem and getting the solution incorporated into deployed AI, while the problem is obscure or hard to understand, or in a cognitive blind spot for many, including key decision makers.


On specifically Goodhart's law (my main research object for the last few months):
- Scott Garrabrant's [Goodhart Taxonomy](https://www.lesswrong.com/posts/EbFABnst8LsidYs5Y/goodhart-taxonomy) and the follow-up [Categorizing variants of Goodhart's Law](https://arxiv.org/abs/1803.04585) by David Manheim and Garrabrant.
    - This is especially useful when trying to consider examples and counterexamples and classifying whether a certain phenomena is 'Goodhart-shaped'.

- El-mhamdi and Hoang [On Goodhart’s law, with an application to value alignment](https://arxiv.org/pdf/2410.09638) and the follow-up piece by Majka and El-mhamdi [The Strong, Weak and Benign Goodhart’s law.
An independence-free and paradigm-agnostic formalisation](https://arxiv.org/pdf/2505.23445) offer some interesting proof work.

Conceptual AI alignment work:
- Plex on [Product Alignment is not Superintelligence Alignment (and we need the latter to survive)](https://www.lesswrong.com/posts/mrwYCNocXCP2hrWt8/product-alignment-is-not-superintelligence-alignment-and-we) and relatedly the gears of ascension [stating it in terms of  local vs asymptotic alignment](https://www.lesswrong.com/posts/mrwYCNocXCP2hrWt8/product-alignment-is-not-superintelligence-alignment-and-we?commentId=cNkmPHdsPjfM7bj6o). 
    - Core point being: highlighting the gap of why organizations iterating on better and better 'product alignment' (which is what the incentives point towards) does not necessarily or even likely generalize to superintelligence.
    - I personally prefer a local vs global dichotomy, but am mildly worried I might be subtly wrong that these are equivalent?
        - (Possibly relatedly I like 'temporally local' as a concept handle in my brain.)
        - Gears states
            > local alignment: your (empirical or formal) alignment bounds are tight enough that your alignment generalizes within a known regime.
            > asymptotic alignment: you have some form of confidence that your alignment uncertainty goes down as the model does more work.
        - but I would frame it something like (keeping local the same) 
            > global alignment: your alignment bounds are tight enough over the whole possible deployment space

- Andrew Critch's [Safety isn’t safety without a social model (or: dispelling the myth of per se technical safety)](https://www.lesswrong.com/posts/F2voF4pr3BfejJawL/safety-isn-t-safety-without-a-social-model-or-dispelling-the)
    - > As an AI researcher who wants to do technical work that helps humanity, there is a strong drive to find a research area that is definitely helpful somehow, so that you don’t have to worry about how your work will be applied, and thus you don’t have to worry about things like corporate ethics or geopolitics to make sure your work benefits humanity.
    - > Unfortunately, no such field exists. In particular, technical AI alignment is not such a field, and technical AI safety is not such a field. It absolutely matters where ideas land and how they are applied, and when the existence of the entire human race is at stake, that’s no exception.
    - I think this is a good point, and goes slightly against various commonly held beliefs. (e.g. claims directionally aligned with "you can and should choose a safe research topic") (not because safety is not important but because something being 'safe' is causally complicated!)
    - `Myth #2: "There’s a {technical AI safety VS AI capabilities} dichotomy or spectrum of technical AI research, which also corresponds to {making humanity more safe VS shortening AI timelines}."` especially goes against naive implications of differential safety research.



Economics
- Bengt Holmström's and Paul Milgrom's [Multitask Principal-Agent Analyses: Incentive Contracts, Asset Ownership, and Job Design](https://people.duke.edu/~qc2/BA532/1991%20JLEO%20Holmstrom%20Milgrom.pdf). Models such basic phenomena as why fixed wages make sense and offers good analysis.

~Philosophy:
- Andrew Critch's [Schelling goodness, and shared morality as a goal](https://www.lesswrong.com/posts/TkBCR8XRGw7qmao6z/schelling-goodness-and-shared-morality-as-a-goal) is a good piece on moral dilemma schelling points.
    - I've been thinking with the lens of 'morality as a coordination tool' a lot and this has been helpful.

On.. x-risks, in general:
- Damon Binder's [Destroying the universe: How hard can it be?](https://defensesindepth.bio/destroying-the-universe-how-hard-can-it-be/) is a very well written piece about the possibility and risk of triggering a false vacuum decay.



Other:
- [The AFFINE retrospective](https://www.lesswrong.com/posts/PEiiRuSKpmjPxS4pW/affine-a-retrospective). It was fun to read a retrospective on a program I attended. And also amusing to see it start with a testimonial from me.
    - > “AFFINE was the best month of intellectual exploration I have had the opportunity to engage in, ever. Usually opportunities like this are limited to a day or a weekend, which both limits depth, forces a sprint-type mindset, and generally is quite limiting. At AFFINE I had time to wander towards and through interesting ideas.”
        - I still endorse this. Of course there is a caveat in the sense that I have never attended an intense monthlong programme before, but also based on what I've heard from people about other programs I am quite satisfied I attended specifically AFFINE.
    - Kabir Kumar's comment also describes it well - 
        - > This was the best AI Safety event I've ever been to. Unlike every other event like I've heard of, thanks to the organizers we actually spent a lot more time on trying to understand Illegible Problems in alignment, in ways I think was actually useful and something I could see being useful for actually trying to understand the problem.
        - > I don't think this would have happened if the organizing team didnt have people who actually understood the problem deeply (limited by how much understanding of the problem is available right now, of course).
