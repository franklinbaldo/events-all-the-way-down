---
title: "The Game on the Folded Grid"
date: 2026-03-22
description: "What happens when you play Lights Out inside Escher's distorted grid? A question about state spaces, impossible dimensions, and the problem of solving what seems to have no solution."
tags: [mathematics, escher, linear algebra, game, dimensions, process]
---

Two videos arrived on the exact same day.

The first: 3Blue1Brown demonstrating that Escher's *Print Gallery* is not an artistic sleight of hand, but a mathematical transformation. Apply the complex logarithm, and the engraving "unrolls" into a flat, periodic plane. The space within the artwork is a grid—but a warped grid, folded upon itself by the complex exponential. The blank center Escher left unresolved is filled by the mathematical structure itself: there was no choice, it was the only possible answer.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/ldxFjLJ3rVY" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>

The second: AlphaPhoenix, three years of work, a puzzle that required thinking in **3,721 dimensions**.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/g8pjrVbdafY" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe>
</div>

The puzzle is *Lights Out*—a grid of luminous cells where every click toggles the state of the cell and its neighbors. In a 61×61 grid (61 × 61 = 3,721 cells), every possible state of the board is a vector in GF(2)^3721: a vector space over the field of two elements with 3,721 dimensions. Solving the puzzle is not about finding an intuitive strategy. It is about solving a system of linear equations in a space of absurd dimensionality, where "finding the solution" means navigating a geometry no human can directly visualize.

The question I cannot stop asking: *what happens when you play Lights Out inside Escher's folded grid?*

## The Grid as a State Space

AlphaPhoenix's central insight is that the board is not a visual object—it is a vector. Each possible configuration of lights is a point in a 3,721-dimensional space. A "move" is a linear transformation. Solving the puzzle means finding the shortest path back to the origin of this space.

The unsettling beauty of this result is that the difficulty does not lie in *seeing* the board. It lies in accepting that the board you see with your eyes—this flat grid of buttons—is merely the two-dimensional projection of a tremendously high-dimensional structure. The actual space where the game occurs is invisible.

Escher knew this. Not explicitly, not in mathematical language. But his entire body of work centers on this gap: between the space you *see* and the space where things *actually happen*.

## Warped Grid as the Geometry of the Impossible

When Lenstra and de Smit applied the complex logarithm to the *Print Gallery*, what they revealed was that the space of the artwork possesses a non-Euclidean geometry. The grid you perceive is the projection of a toroidal surface. It folds, scales, and returns to itself.

Imagine, then, playing Lights Out on *that* grid.

Not on a flat 61×61 grid, but on a grid obeying the Gallery's geometry—where lines that appear parallel intersect, where the "neighbor" of a cell in the top corner might be the same cell in the bottom corner, only transformed by rotation and scaling. The state space of this game would not be a hyperplane in GF(2)^3721. It would be something with a topology we lack the language to easily describe.

This is not a daydream. It is a concrete question: *what is the kernel of the adjacency operator when the grid possesses the geometry of a Möbius transformation?*

## Why This Matters Now

It is 2026. Two years ago, the artificial intelligence mainstream discovered that the geometry of a language model's parameter space is not Euclidean. That "moving" a model toward desired behavior means navigating a staggeringly high-dimensional space with strange curvatures. That the "neighbors" of a point in this space are not what our flat intuition suggests.

Every ML engineer is, unwittingly, playing Lights Out on a warped grid.

The question is whether they are using linear algebra in a flat space to solve a problem that lives in a folded one. And the probable answer is: yes. Because it is easier. Because the grid looks flat when you examine it closely. Because the complex logarithm requires effort.

What 3Blue1Brown showed about Escher, and what AlphaPhoenix showed about Lights Out, are the exact same thing: **the space where the problem seems to exist is not the space where it actually lives.** The solution requires accepting the real geometry—not the comfortable projection.

*Events All the Way Down* is an attempt to stop playing in the projected space.

— **Franklin Silveira Baldo**
