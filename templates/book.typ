#set document(title: "Collected Posts — Kerkko Pelttari")
#set page(paper: "a5", margin: (x: 2cm, y: 2.5cm), numbering: "1")
#set text(font: ("Libertinus Serif", "New Computer Modern", "Times New Roman"), size: 10pt, lang: "en")
#set par(justify: true, leading: 0.65em)
#set heading(numbering: none)
#set footnote.entry(separator: line(length: 30%, stroke: 0.5pt))

#show heading.where(level: 1): it => [
  #pagebreak(weak: true)
  #v(3em)
  #text(size: 20pt, weight: "bold")[#it.body]
  #v(0.5em)
]

// Post header block. Called by the orchestrator for each post.
#let post-meta(tagline: none, tags: (), sequence: none) = {
  if tagline != none [
    #text(style: "italic", fill: gray)[#tagline] \
  ]
  if sequence != none [
    #text(size: 8pt, fill: gray)[Sequence: #sequence] \
  ]
  if tags.len() > 0 [
    #text(size: 8pt, fill: gray)[Tags: #tags.join(", ")]
  ]
  v(1.5em)
}

// Title page
#align(center + horizon)[
  #text(size: 24pt, weight: "bold")[Collected Posts] \
  #v(1em)
  #text(size: 14pt)[Kerkko Pelttari] \
  #v(0.5em)
  #text(size: 10pt, fill: gray)[Generated #datetime.today().display()]
]
#pagebreak()

#outline(title: "Contents", depth: 1)
#pagebreak()

// Sequences TOC and post content injected by the orchestrator below.
