---
title: "Re: Every layer of review"
tagline: How programming faster gets bottlenecked by review
format: thread
tags: ['programming', 'cognitech']
createdAt: '2026-03-18'
draft: false
---
<!-- (old title) AI makes coding faster, but it doesn't ship faster (yet)-->

- In response to and riffing about Apenwarr's excellent piece [Every layer of review makes you 10x slower](https://apenwarr.ca/log/20260316)

- Problem: Why is making non-broken things slow?

- How do you make something non-broken?
- I think there are 2 answers:
  - In my high school we used to talk about "jumalainen visio" (god-tier vision). You just look at the problem and then see the answer. Just one-shot it.
    - This is how you can solve problems where you sort of - are _above the problem_ in skill level. Imagine a professional mathematician taking a 101 course or a programmer learning a relatively easy new language. You just sort of read the problem statement, and then do the things that make sense to your intuition, and it just works.
    - But real world problems are _messy_.
    - So then we have to resort to the normal problem solving loop:
  - Do stuff, review, iterate,
    - The thing is complicated, so we do it in chunks. And when we integrate chunks, the whole becomes even more complicated.
      - So we add processes and procedure.
      - (This is probably very familiar to you if you've worked in software or any other comparable industry, but I'll explain it because it's enlightening, if you haven't.)
      - Let's say you have a small bug. You might code the fix in a few hours.
        - It's just a bugfix, so why not just push it to production directly?
          - Sometimes you will do a mistake.
          - And you don't want a bad mistake in prod.
          - Some mistakes cost hassle. Some cost downtime. Some cost lawsuits.
            - And most companies don't want to and shouldn't bite this bullet. (When you don't yet _have_ users you might bite a lot of bullets like this. There are reasons why software development is faster in the beginning, and this is one of them.)

          - So how do we avoid pushing a mistake to production?
            - We add automated and manual reviewing.
            - Manual reviewing takes time - if it's not the kind of blocker that everyone is working on it, the work you did won't get reviewed instantly. You'll send it to someone for review. They might review it after lunch, or at start of next day - Apenwarr's example uses "5 hours" as the wall clock time and that can often be true, in a reasonable software development process.

        - Let's say you're doing something larger. You want to re-design the database for performance and efficiency reasons.
          - It will affect a lot of people's work, and it will have quite wider implications. So a normal "read it through, pay attention, possibly leave a few comments" isn't usually enough of a process for this.
          - So someone, or someones, higher up in the org chart than your team lead will want to check on this. In some companies the CTO might be present, and multiple team leads, and possibly some architects.
          - So guess what: This is way slower than just the review.
          - Even if your database re-design one shot the problem, just arranging the time for the approval meeting will take time. And if you didn't, this might require multiple meetings, some iteration, etc.
          - Apenwarrs example puts this at about a week, he was probably talking about a bit smaller of a design doc than a whole database re-design, but it's still the right order of magnitude.

        - Okay. Let's say your team is just one of multiple teams, your team is the backend team. A high-priority customer needs a new interface. The frontend team makes the interfaces, with input from the design team.
          - So the process might look something like this: You get someone from the backend team, someone from the design team, and someone from the frontend team into a meeting. Possibly the sales / customer rep who promised the customer the feature, as well.
            - You agree to some kind of implementation specs. (Which will, if you're lucky, get iterated on over time. If you're not lucky, you might first need to do many rounds of design, to try and one-shot it. Remember what I said about one-shotting earlier?)
            - And then after you have some agreed upon parts that each team will work on, people get to work.
              - Each team has to do the "week long" process at least once just to internally agree what is useful. And you will need to coordinate.
              - This happens.
            - Then you make some backend endpoints, design team figures out some designs, the frontend team makes frontend.
            - Then it's tried out and something doesn't work. Say, there's some important data missing. No designed UI component for this one important part, that wasn't obvious before.
            - Here we go again.
            - Repeat until done.
            - Then you might be done in a significant amount of weeks. Say 12 weeks, approx. one fiscal quarter.
          - Apenwarrs example for this was "Get it on some other team’s calendar to do all that", and I guess I used an example of multi-team cooperation. I've mostly worked in startups, so this seems like a realistic timeline to me. In an enterprise just one other team doing their part might take the quarter and the integration would be multi-quarter, I guess.
        - And then after that example he has a magnitude larger one again, 10 quarters / 2.5 yrs.

  - So this is actually close to what _good_ processes look like.
    - [These things, they take time.](https://www.youtube.com/watch?v=0d6yBHDvKUw)

- Okay. So now we add AI. What does current AI add, in software engineering?
  - It makes it faster _to create_.
  - You can make prototypes, you can implement features, you can run large refactors.
  - It makes the "code is cheap" more true than ever before.

- So what does this imply for the software engineering process as a whole?
  - You can build your own part of the code faster. The AI can even fix some of the problems that come up in reviewing.
  - But if everyone is using AI to make their parts faster, there is also going to be more stuff to review.
  - So the _delay_ before the feature you built is reviewed and merged and deployed might not actually get any faster.

  - I think one implication here that Apenwarr doesn't touch on, and that maybe is unsustainable over the longer term, is that the way this dilemma leads is that you will be working on _more stuff_ and the reviewer(s) will start their workdays with longer backlogs of stuff to review.
    - I think the Pragmatic Engineer writes well on the implications here: https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what
      > The good: software engineers more valuable than before. Tech lead traits in more demand, being more “product-minded” to be a baseline at startups, and being a solid software engineer and not just a “coder” will be more sought-after than before.
      > The ugly: uncomfortable outcomes. More code generated will lead to more problems, weak software engineering practices start to hurt sooner, and perhaps a tougher work-life balance for devs.
    - In any case, the pipeline will eventually be saturated.

- So when you need some feature X shipped, it will still take significant time. Even if you're writing the code faster.
- Okay, so what do we actually do about this?
  - Apenwarr's post goes deep on this: drawing on Deming's manufacturing quality philosophy, the Toyota Production System, and how trust (not more review layers) is what actually makes quality scale. And how software hasn't managed to internalize this lesson.
    - I'm not going to try to summarize it better than he wrote it. Go read the post.
    - The part that stuck with me most is this idea that we need to ~backpropagate trust and quality to the process.
      - Apenwarr generally talks about how US auto employees weren't able to bring the Toyota-style quality culture, pressing a "I noticed a defect, stop the production line" button, because they were scared of getting fired.
      - Honestly, I think we might need to bring that to our AI coding agents somehow. The AI Coding agent should have a way to say "Hey, I can keep implementing this, but I think this architecture sucks because of x, y, z, and you should consider fixing this."
        - But: Current LLMs are _even more_ reluctant to stop working when they notice that stuff is broken.
          - So guess what: They let even more defects through than humans.
          - Solving this would be very valuable for AI-assisted software engineering.
