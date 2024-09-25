---
title: 'Learning from Haskell'
tagline: 'Learning to program, from Haskell'
slug: learning-from-haskell
date_published: 2020-08-19T04:34:54.000Z
updatedAt: 2020-12-23T19:26:37.000Z
tags: ['programming']
---

What Haskell (specifically the basics in form of [https://haskell.mooc.fi/](https://haskell.mooc.fi/) ) taught me. (Spoiler: it taught me a lot of blind spots in my knowledge.)

I used to think that I can learn functional programming well enough without ever touching Haskell or any other purely pure language. I also used to think that isolation of side effects on type level would be a hassle. Now I think I was incorrect.

Something I was right about before I touched Haskell was that I did understand `map` and `filter`. A predicate is quite a simple concept. A functor is somewhat simple ([http://www.haskellforall.com/2012/09/the-functor-design-pattern.html](http://www.haskellforall.com/2012/09/the-functor-design-pattern.html) ).

"Lazy lists sound just like pythons generators with different consumption sugar" was something I said aloud last year, and I still don't think that's completely wrong in many of the common cases of returning lazy linked lists in functional programming.

"Academic terminology about programming language concepts just makes things confusing" was also something I used to think. This I found to be wrong in many ways. Academic terminology allows good (but never perfect) consistency in documentation and explaining different terms. It also enables translating terminology nicely between programming languages / libraries / concepts. Most `fantasyland` JavaScript and TypeScript libraries use the same terminology as Haskell does, which makes the concepts nicely mappable in a readers head.

I was very wrong about understanding `reduce` . Through forcing to think problems in ways of recursion (raw pattern matching base case recursion, recursion with helper methods like fold(l|r)), I had to learn new ways of thinking about iteration. Before I thought this would be useless, "why would I want to solve problems that intuitively map to for loops with recursion", but thinking in `fold`s and `scan`s (which I haven't yet used once) has the advantage of generalizing well. Helper functions for these abstract recursive processing functions can be generalized over other problems.

So I did have to bend and accept that Haskell can, did and will teach me more about functional programming paradigms. What about type paradigms? Since I just completed about 40 hours of work in a 101 level Haskell course I haven't yet had time to delve into GHC extensions or other more interesting type features. The basic Type Class and Instance combination was already familiar to me from programming in Rust, altough Haskell's one is a bit more permissive and allows some orphan instances.

Haskell's type inference has been stellar, altough the type error messages could often be more helpful (again Rust has stellar inference AND great error messages).
