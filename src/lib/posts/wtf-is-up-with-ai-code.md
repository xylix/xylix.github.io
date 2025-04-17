---
title: What is going on with AI programming?
tagline: Pondering and trying out LLM-assisted programming.
createdAt: 2025-04-17T20:52:52+0300
draft: True
tags: []
---

# TODO: (This has to be a header because otherwise prettier collapses the bullets .... .. . . .. . . . : / )

- Coherent up the story part aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
- Add some structure and meat into the non-story parts, or leave this just as a story
- Remove disclaimer

# DISCLAIMER: if this post somehow shows up in the public posts it wasn't yet supposed to, it's a draft!

#

During recent years, but especially during the last ~6 months, the belief gap between people who think current LLMs are useful for programming, and the ones who think they are bad, useless, or even have a negative contribution, has been growing.

What is up with this?

## Recent realizations

My recent investigations into AI aided programming have resulted in me updating about the following:

### What I think

I used to believe (around 2023 - early 2024) that AIs can mostly "program easy solutions for easy problems". Nowadays I would describe it with "AI can write mediocre solutions for mediocre problems".

### Where current LLMs are useful in programming:

Working with programming languages you don't know, either to learn or to write a script or to work with a cog of your system that has parts that you don't understand

- I think it is important that you can still validate the solution, so I wouldn't one shot a 400 liner AI code and just run it.
- But I would write a shell script, systemd service, lua configuration file, or a shader with significant AI help.

### Where they are frustrating

- The code is so verbose! See these [examples]:

  - (Disclaimer, because this will otherwise get brought up: I definitely do not advocate code golfing for maintanable code, or want to do that with my own config files. When I say "the AI output 50 lines of code for something where 10 would have been enough", I never mean that it could have been shorter with one-liner tricks, replacing loops with comprehensions, or other detours.

  - The AI often will, presumably because this aligns with the RL targets, try to one shot something where asking 2-5 clarifying questions would have helped a lot.
    - It will write handling for platforms that I don't care for.
    - It will sometimes write try / excepts for things that won't happen, or needn't be handled (returning an error string in a command line tool can be less useful than just letting the error propagate).
  - So the fact that the code is verbose can make it somewhat easy to read on the first pass, and it surely helps the AI "think aloud" while it's programming, but I definitely don't want my personal scripts growing by 20 lines per feature when 3 lines would have reached the result I desired, and been both more conscise and simpler to grasp in the future.
    - Some of the patterns LLM programming results in remind me of my 1st and 2nd year of university: Writing code with so many comments and so small logical units that it's (theoretically) easy to understand on the first pass, but resulting in 300 lines for things where 50 would have done the job.

### Where they fall flat

LLMs often "forget" functions or features. Often ones that aren't salient enough in their training data, or ones that were recently added.

Yesterday I tried to get ChatGPT or Gemini help me write a function in Neovim that I can use to open up links that are in form `/home/xylix/file.ext` or `file:///home/xylix/file.ext`. It wrote a decent regex! Faster than I would have, and iterating the regex with it worked well. But when I asked it for help in opening a file in the system, explicitly prompting ChatGPT with:

> How to open a file in system default application in neovim? I would like to avoid some if else where I use xdg-open or open or a windows alternative based on the OS

It gave me this:

> ✅ Simple and Cross-Platform Lua Function:

```lua
local function open_in_default_app(filepath)
  local opener = ({
    Darwin = "open",
    Linux = "xdg-open",
    Windows = "start",
  })[vim.loop.os_uname().sysname]

  if opener then
    vim.fn.jobstart({ opener, filepath }, { detach = true })
  else
    print("Unsupported OS: " .. vim.loop.os_uname().sysname)
  end
end

-- Example usage:
-- open_in_default_app("path/to/your/file.pdf")
```

> 🔍 Explanation:

    vim.loop.os_uname().sysname gives you the system name.

    The opener command is chosen automatically based on that, no manual if-else needed.

    vim.fn.jobstart() runs the command asynchronously so Neovim doesn't hang.

> 🧪 How to Use: ...

So it both didn't obey my direct ask, and ended up using open and xdg-open, and it kind of avoided the branching by using a dictionary mapping but this is not what I asked for. It feels like a gamed answer.

So then I asked gemini. Not any better. Tried googling.

Oh. [vim.ui.open](<https://neovim.io/doc/user/lua.html#vim.ui.open()>) is exactly what I was looking for.

I mentioned this to Gemini 2.5 which had done some googling (I didn't make chatGPT do any searches on this), and well:

TODO:
[gemini screenshot](from discussion https://gemini.google.com/app/cec3c3d2353c1102)

Once I linked the correct docs page it did understand that the function exists.

What's my point here? Even though LLMs process and output information differently from humans, they do their mistakes, and if you don't know the domain well enough you might miss the mistake, and end up choosing a suboptimal solution when a significantly better one was available.

Of course there are situations where say LLMs are the best non-human source of information available on a given programming library or a given function in a project.

But they do still make significant mistakes when interpreting documentation and source code, and cannot (for now) replace a human reading the source code with attention as the most accurate way of understanding an API, and perhaps are still oftentimes more flaky than necessary when reading the docs is an option. (But I don't enjoy reading long docs, I'd rather ask an LLM or read the source code myself, often.)

## Why are beliefs about LLM programming so different?

So where does the difference in peoples beliefs and experiences come from?

- LLM output significantly differs even with small details in the user prompt, or the used system prompt.

  - So some of it could be chalked down to "skill issue"

- LLMs in programming are least useful in domains where you know your tools and APIs and context well.

  - LLMs are better than humans in having a wide amount of information that they can output with a good prompt or in the correct context. But when a human already has a "wide enough" understanding, they don't offer high value.

- I was going to say LLMs are good at boilerplate and bad at some terser tools, but they are ~decent at writing regexes. Or at least creating first guesses.
