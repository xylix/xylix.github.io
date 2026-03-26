---
title: Can Claude understand (modded) Minecraft?
tagline: No. Claude can Code but Claude can't Minecraft
createdAt: 2026-01-29T12:00:00+0200
tags: ['programming', 'personal']
---

Recently, in December '25 and January '26, Claude Code has kept surprising me with its level of quality in output.

But there are specific domains where it falls short, and the chat interface seems significantly worse than Claude Code. Let's explore one such circumstance now.

# Exploration 1 - Sonnet 4.5 and the chat interface

I've been playing a lot of modded Minecraft recently. It's all been on the FTB Evolution modpack, which is a year old and has approximately 500 mods. There are some questions that are quite specific to the modpack or recent updates to mods, which means that there aren't good answers available by Googling, or the good answers take too long to find. So I tried using Claude to solve some of my questions.

But it seems Claude (mostly Opus, but also Sonnet) keeps being lazy, imprecise, or suboptimal in response to my queries.

## Example 1: Item Sorting

I ask: "Can I do an automatic sorting setup so that a pipe/input system filters for example spawners, potions, armour, weapons into different chests, and stackable items into my ME (digital storage) system?"

One of Claude's first suggestions is: "Use an import bus filtered to the items that you don't want to import."

Which... is missing the whole point. I don't want to enumerate each item. That's why I want a "smart" solution.

## Example 2: Power Generation

I ask Claude what are the best ways to burn diesel or boosted diesel/turbofuel into electricity (FE) in the modpack. It lists ~4 ways. It is being very lazy and not looking at the modlist at all to actually enumerate, and it also got the numbers wrong. The solution it listed as best actually produced ~5x more energy.

5x wrong is kind of a lot when I'm asking for a generator comparison.

## Example 3: Hallucinated Blocks

Sometimes it tells me to use a block, machine, or filter that seems like it could exist but doesn't. Very textbook hallucination.

# Exploration 2 - Claude Code

Bothered by the lackluster performance, I went and tried to use Claude Code for this. I created a folder for it, put the modlist in the folder in a CLAUDE.md file, and gave it the filepath to the folder where the minecraft instance is located so it could check configs autonomously.

This did not help at all. The Claude Code performance in similar dilemmas, including the power generation example from above, was still quite lackluster. It doesn't manage to fetch the numbers and just do the math, instead getting sidetracked into (probably) parroting general (often outdated) wisdom it has learned from the copious amounts of online content the base model has been trained on.

I did also try to prod Claude to read the actual mod project source files for information, but this led into my tokens being used very fast and context auto-compaction mid-task, which is suboptimal for a good performance on the task.

# Conclusions

I think part of the problem here is that Minecraft tech mods together have enough data to train on that Claude has some general intuitions. It feels a bit like asking someone who played a bunch of modded Minecraft some years ago, forgot or confused a bunch of mods and numbers, and also is being kind of lazy about checking docs or Google for info.

Claude has major problems grasping nuances between mods, especially mods that have similar features. It also has trouble with modpack confusion. It keeps thinking that FTB Evolution contains mods that it doesn't, even when I basically every time specify I'm using FTB Evolution, and I asked it to make a "memory" about the modlist and am using a project for this.

The contrast with Claude's performance when programming a small-to-medium sized project is striking. When I'm working on code, Claude can read the actual files, check documentation, verify its assumptions. With Minecraft mod related dilemmas Claude just doesn't end up doing enough leg work to compensate for the outdated info in its training data.

The intuitive solution to this problem would be for Claude to be able to query the in-game information that the player can retrieve from JEI / REI or in-game mod documentation, but this would require an API for Claude to query the game instance I'm playing or for it to have its own instance. (An LLM having a separate creative world where it can try solutions and then tell me which of them worked would be quite cool, but I think working in 3d videogame worlds is out of reach for current models. But perhaps something to try and document how far out of reach.)
