---
title: Claude can Code but Claude still can't minecraft?
tagline: On AI limitations in niche domains
createdAt: 2026-01-29T12:00:00+0200
updatedAt: 2026-01-29T12:00:00+0200
tags: ['programming', 'personal']
---

Recently, in December '25 and January '26, Claude Code keeps surprising me with its level of quality in output.

But there are specific domains where it falls short, and the chat interface seems significantly worse. Let's explore one such circumstance now.

# The Setup

I've been playing a lot of modded Minecraft recently. It's all been on the FTB Evolution modpack, which is a year old and has approximately 500 mods.

Claude (mostly Opus, but also Sonnet) keeps being lazy, imprecise, or suboptimal in response to my queries.

# Example 1: Item Sorting

I ask: "Can I do an automatic sorting setup so that a pipe/input system filters for example spawners, potions, armour, weapons into different chests, and stackable items into my ME (digital storage) system?"

One of Claude's first suggestions is: "Use an import bus filtered to the items that you don't want to import."

Which... is missing the whole point. I don't want to enumerate each item. That's why I want a "smart" solution.

# Example 2: Power Generation

I ask Claude what are the best ways to burn diesel or boosted diesel/turbofuel into electricity (FE) in the modpack. It lists ~4 ways. It's being very lazy and not looking at the modlist at all to actually enumerate, and it also got the numbers wrong. The solution it listed as best actually produced ~5x more energy.

5x wrong is kind of a lot when I'm asking for a generator comparison.

# Example 3: Hallucinated Blocks

Sometimes it tells me to use a block, machine, or filter that seems like it could exist but doesn't. Very textbook hallucination.

# Analysis

I think part of the problem here is that Minecraft tech mods together have enough data to train on that Claude has some general intuitions. It feels a bit like asking someone who played a bunch of modded Minecraft some years ago, forgot or confused a bunch of mods and numbers, and also is being kind of lazy about checking docs or Google for info.

Claude has large problems grokking the nuances between mods, especially mods that have similar features. It also has trouble with modpack confusion. It keeps thinking that FTB Evolution contains mods that it doesn't, even when I basically every time specify I'm using FTB Evolution, and I asked it to make a "memory" about the modlist and am using a project for this.

The contrast with Claude Code is striking. When I'm working on code, Claude can read the actual files, check documentation, verify its assumptions. With Minecraft modding in the chat interface, it's flying blind on vibes and partial training data - and it shows.
