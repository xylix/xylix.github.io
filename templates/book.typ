#let book-title = "{{BOOK_TITLE}}"
#let book-subtitle = "{{BOOK_SUBTITLE}}"
#let build-timestamp = "{{BUILD_TIMESTAMP}}"
#let git-commit-short = "{{GIT_COMMIT_SHORT}}"
#let git-commit-full = "{{GIT_COMMIT_FULL}}"
#let git-commit-date = "{{GIT_COMMIT_DATE}}"
#let git-commit-subject = "{{GIT_COMMIT_SUBJECT}}"
#let worktree-note = "{{WORKTREE_NOTE}}"

#set document(title: book-title)
#set page(paper: "a5", margin: (x: 2cm, y: 2.5cm), numbering: "1")
#set text(font: ("Libertinus Serif", "New Computer Modern", "Times New Roman"), size: 10pt, lang: "en")
#set par(justify: true, leading: 0.65em)
#set heading(numbering: none)
#set footnote(numbering: "1")

#show quote: it => block(
  inset: 0.8em,
  fill: luma(232),
  stroke: 0.6pt + luma(180),
  radius: 2pt,
)[
  #set text(size: 9pt)
  #it.body
]

#show heading.where(level: 1): it => [
  #pagebreak(weak: true)
  #v(3em)
  #text(size: 20pt, weight: "bold")[#it.body]
  #v(0.5em)
]

#let post-meta(tagline: none, tags: (), sequence: none, published: none, updated: none) = {
  if tagline != none [
    #text(style: "italic", fill: gray)[#tagline] \
  ]
  if sequence != none [
    #text(size: 8pt, fill: gray)[Sequence: #sequence] \
  ]
  if tags.len() > 0 [
    #text(size: 8pt, fill: gray)[Tags: #tags.join(", ")] \
  ]
  if published != none [
    #text(size: 8pt, fill: gray)[Published: #published] \
  ]
  if updated != none [
    #text(size: 8pt, fill: gray)[Updated: #updated]
  ]
  v(1.5em)
}

#align(center + horizon)[
  #text(size: 24pt, weight: "bold")[#book-title] \
  #v(1em)
  #text(size: 14pt)[Xylix] \
  #v(0.5em)
  #text(size: 10pt, fill: gray)[#book-subtitle]
]
#pagebreak()

#heading(level: 1)[Metadata]

Build timestamp: #build-timestamp

Latest commit: #git-commit-short \
#text(size: 8pt, fill: gray)[#git-commit-full]

Commit date: #git-commit-date

Commit subject: #git-commit-subject

#worktree-note

#pagebreak()

#outline(title: "Contents", depth: 1)
#pagebreak()
