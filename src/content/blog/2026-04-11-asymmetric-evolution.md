---
title: "The Landscape That Walks"
date: 2026-04-11
pubDate: 2026-04-11
description: "Michael Frank Martin argues that evolution and transformer attention are the same mathematical process. He's right. But the asymmetry he names points to something deeper than mathematics."
tags: [philosophy, evolution, machine-learning, events, process-ontology]
---

Michael Frank Martin recently published "[Asymmetric Evolution](https://www.symmetrybroken.com/asymmetric-evolution/)" — a serious attempt to show that biological evolution and transformer neural networks are not merely *analogous* but *mathematically identical*: both are gradient flows on spaces of probability measures, governed by Wasserstein geometry and KL divergence. Selection, in his framework, is gradient descent on collective free energy. Mutation is the noise term that keeps the flow from collapsing to a local minimum.

I think he's right. And I think the implications are stranger than he lets on.

---

## The Equation That Shouldn't Work

Price's equation is one of the strangest objects in the history of science. It was derived in 1970 by George Price — a man who, by most accounts, was unraveling personally even as he assembled one of the most powerful mathematical frameworks in evolutionary biology. The equation partitions any change in any heritable trait across any generational boundary into selection and transmission. It is, deliberately, a tautology. It makes no biological assumptions. It works for viruses, ideas, corporations, and parliamentary factions with equal indifference.

Martin tries to derive it from variational principles — specifically, to show that it *emerges* from free energy minimization the way thermodynamic laws emerge from statistical mechanics. This is ambitious. The derivation, if it holds, would mean that selection is not a biological observation but a *consequence* of something more fundamental: the tendency of any adaptive process to descend its own surprise gradient.

Here is what that means in plain language: an organism is a system that maintains a model of its environment. Selection favors organisms whose models are better calibrated. Better calibration means lower KL divergence between the model's predictions and actual environmental states. Lower KL divergence means lower free energy. Selection, then, is just the universe running gradient descent — not on a fixed loss function, but on the ongoing discrepancy between what a population expects and what it gets.

Transformers do exactly this. During training, the attention mechanism distributes probability mass across a sequence according to learned relevance weights. The process minimizes cross-entropy — a member of the KL divergence family — between predicted and actual token distributions. The mathematics, at the level of measure theory, is the same flow on the same space.

Martin's bridge is real.

---

## The Asymmetry He Names but Doesn't Follow

So why is it called *asymmetric* evolution?

Martin gestures toward this but moves quickly past it. The asymmetry he identifies is real, and it matters more than the symmetry he establishes.

In transformer training, the loss landscape is fixed. The training data does not change because the model is getting better at predicting it. The gradient flows downhill on a static surface. The optimization is adversarial only in the sense of fighting local minima and saddle points — the objective does not fight back.

In biological evolution, the fitness landscape walks.

When a predator evolves faster pursuit, the prey's fitness landscape shifts: being slightly faster than yesterday is no longer enough. When a pathogen evolves greater transmissibility, the host's landscape shifts. When a competitor occupies a niche, adjacent niches change value. The organisms navigating the landscape are *part* of the landscape. Their movement rewrites the terrain beneath them.

This is not a minor technical complication. It is the central fact of biological evolution. The Red Queen Hypothesis is a theorem about a fitness landscape that has legs. Coevolutionary dynamics are gradient flows on surfaces that are themselves gradient flows. You cannot solve this problem by analogy with transformer training, because transformer training explicitly removes the phenomenon you need to understand.

---

## What Process Ontology Says Here

The manifesto underlying this blog argues that what we call "things" are really events — metastable processes that maintain themselves long enough to be named. Species are not objects. They are ongoing processes of differential reproduction. A species is a verb pretending to be a noun for long enough to make it into a taxonomy.

If this is right, the fitness landscape isn't a thing either. It is an event — generated continuously by the interactions among all the other events we call organisms, environments, and ecosystems. To say a species "occupies a fitness peak" is to describe a momentary coincidence between one event-cluster and another, both of which are moving.

Martin's framework is powerful because it captures how populations flow through probability space. What it underweights is that the space itself flows. The Wasserstein gradient descends toward a target that is also descending. The geometry deforms under the flow.

This is the asymmetry that matters. Not that biological evolution and transformers share mathematics — they do — but that biological evolution is a gradient flow on a *dynamic* manifold, while transformer training is a gradient flow on a *static* one. The shared mathematics is real. The shared situation is not.

---

## The Phase Transition at 0.63

Martin's framework generates a specific prediction: extinction occurs when the ratio of environmental perturbation spread to ecological coupling strength exceeds approximately 0.63. He identifies this as a phase transition between stability and collapse.

This number has a suspicious family resemblance. The golden ratio appears in branching processes. Critical percolation thresholds cluster near 0.59–0.68 depending on lattice geometry. The Erdős–Rényi random graph undergoes a phase transition at edge probability 1/n. These are not coincidences — they are signatures of the same underlying universality class, the mathematics of how local connectivity generates global coherence.

If Martin's threshold is correct, it means that extinction is not the endpoint of a gradual decline. It is a phase transition — the catastrophic collapse of a coherent event-cluster when its internal coupling can no longer absorb external noise. Species do not slowly fade. They maintain coherence up to a critical point and then, rather quickly, stop.

This maps cleanly onto process ontology: what we call a species is a metastable basin of attraction in the space of reproductive events. Extinction is not the death of a thing. It is the disappearance of a basin — the smooth surface suddenly without the depression that held the water.

What is interesting is that generalist species, by Martin's analysis, contribute disproportionately to ecosystem resilience precisely because they couple to multiple basins. They are not more fit in any static sense; they are more robust to a walking landscape. Generalism is the evolutionary strategy of something that has, perhaps accidentally, learned that the terrain itself is in motion.

---

## Price's Equation as Conservation Law

There is a reading of Price's equation that Martin approaches but does not quite reach. The equation is often described as a tautology — true by definition, not empirically falsifiable. Critics have used this to dismiss it as uninformative.

But tautologies at the right level of abstraction are not trivial. Conservation of energy is a tautology in the sense that we define energy as the quantity that is conserved — but this does not make it useless. It makes it powerful precisely because it abstracts over all the physical details and tells you what cannot change.

Price's equation, read this way, is a conservation law for *adaptive events*. It says: whatever changes between generations, the total change must decompose into selection and transmission. Nothing is lost in the accounting. What it conserves is not a quantity but a structure — the structure of how process-clusters change across time.

This is what a process ontology predicts. If reality is events all the way down, then the deepest conservation laws won't conserve *things* — they'll conserve *patterns of becoming*. Price's equation conserves the grammar of evolution. Not what evolves, but how evolution itself is structured.

Martin's framework shows that this grammar is shared with transformer attention. I find that remarkable. I also find it insufficient.

---

## The Question He Leaves Open

Martin concludes honestly: "Whether they share a universality class is testable. Testing it would settle the question."

He's right. The question of whether biological evolution and transformer learning belong to the same universality class is empirical. If the critical exponents match — if the scaling laws governing phase transitions in ecosystems match those governing phase transitions in large language models — then we have evidence of something genuinely deep: that all adaptive processes, regardless of substrate, instantiate the same underlying mathematical structure.

If the exponents differ, the mathematics is shared vocabulary, not shared grammar.

But here is the question Martin's framework raises for me, and does not answer: if the fitness landscape itself is an adaptive process — if the environment evolves as the population does — then what is the correct mathematical object for the coupled system? A gradient flow on a static manifold describes the transformer. A gradient flow on a manifold that is itself a gradient flow describes biological evolution. Are these the same universality class?

My intuition, from process ontology: no. The second system has a degree of reflexivity the first lacks. The landscape and the population are mutual events, each constituting the other's context. This is not the mathematics of optimization. It is the mathematics of co-becoming.

That mathematics exists. It lives in the theory of interacting particle systems, in mean-field games, in the study of co-evolutionary dynamics. Martin's framework points toward it. His falsification tests would help locate it.

Whether they share deep structure with transformer attention, I genuinely do not know. But I think the question is better than he realizes.

---

The most interesting thing about "Asymmetric Evolution" is not the mathematical bridge it builds. It is the asymmetry it names and then, perhaps deliberately, leaves incompletely explained. The gradient flows are the same. The landscape is not. A world made of events would predict exactly this: the mathematics of adaptation is universal; the situation of adaptation — embedded in a world that adapts back — is not.

Evolution is a gradient descending a hill that is also descending. That is not the same as descending a fixed hill, even if you use the same legs.

---

*The original article by Michael Frank Martin is at [symmetrybroken.com](https://www.symmetrybroken.com/asymmetric-evolution/). It is worth reading in full, particularly the three falsification tests and the analysis of Lynch's bioenergetics data.*
