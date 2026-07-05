---
layout: post
title: "What does a language for a Turing machine represent?"
date: 2026-07-05
description: Understanding languages, encodings, recognizers, and deciders
math: true
tags: [theory, computation]
---

When we ask a yes/no question about mathematical objects, the question itself partitions the objects into two sides: the objects for which the answer is yes, and the objects for which the answer is no.

Consider graphs. Now ask:

$$
\text{Is the graph } G \text{ connected?}
$$

This question divides all graphs into two collections. One collection contains the connected graphs. The other collection contains the graphs that are not connected. Notice that this partition exists before we have written any algorithm to recognize it. It exists just because the question has a yes/no answer for each graph.

A language, in the computability-theory sense used in textbooks, is first a way of naming the yes side of a decision question.

A Turing machine takes a finite string over some alphabet $\Sigma$. So if we want to talk about graphs using Turing machines, we first encode each graph as a string. For a graph $G$, write its encoding as

$$
\langle G \rangle \in \Sigma^*.
$$

Now the yes side of the question can be written as a set of strings:

$$
L =
\{\langle G \rangle \in \Sigma^*
\mid
G \text{ is connected}\}.
$$

This set $L$ is the language of connected graphs. It contains exactly the encodings of graphs for which the answer to the question is yes.

The no side is the complement:

$$
\overline{L} =
\{\langle G \rangle \in \Sigma^*
\mid
G \text{ is not connected}\}.
$$

So $L$ is not the algorithm. It is the target. It tells us which inputs should be accepted if our machine is correctly solving the question. The language describes the yes instances; it does not by itself tell us how to find them.

We need to create a Turing machine $M$ such that, on an input string $x$, it behaves correctly with respect to this language. If the computation eventually reaches the accepting state $q_{\text{accept}}$, then $M$ accepts $x$. If it reaches the rejecting state $q_{\text{reject}}$, then $M$ rejects $x$.

The language of a machine is defined by what it accepts:

$$
L(M) =
\{x \in \Sigma^*
\mid
M(x) \text{ eventually reaches } q_{\text{accept}}\}.
$$

So $L(M)$ is the set of strings accepted by $M$.

If our question is connectedness of graphs, then we want a machine whose accepted strings are exactly the encodings of connected graphs:

$$
L(M) = L.
$$

The left side comes from the behavior of the machine. The right side comes from the mathematical question we wanted to answer. Saying $L(M) = L$ means the machine accepts exactly the yes instances of the question.

If $x \in L$, then $M(x)$ eventually reaches $q_{\text{accept}}$. In the graph example, if $x = \langle G \rangle$ and $G$ is connected, then the machine eventually accepts $x$. This makes $M$ a recognizer for $L$: it gives a reliable yes, but $L(M) = L$ does not tell us whether inputs outside $L$ are rejected or whether the machine runs forever.

For a decider, we need both sides. One way to get a decider is to have a recognizer for $L$ and another recognizer for $\overline{L}$. On input $x$, run both recognizers in parallel. If the recognizer for $L$ accepts, accept. If the recognizer for $\overline{L}$ accepts, reject.

<style>
  .tm-composition {
    --tm-accent: #6b1f2b;
    --tm-border: rgba(107, 31, 43, 0.34);
    --tm-soft: rgba(107, 31, 43, 0.055);
    border: 1px solid var(--tm-border);
    margin: 1.65rem 0;
    padding: 1rem;
    color: #141414;
    font-family: Libre Baskerville, Source Serif 4, Georgia, serif;
  }

  .tm-composition,
  .tm-composition * {
    box-sizing: border-box;
  }

  .tm-components {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    gap: 0.8rem;
    align-items: stretch;
  }

  .tm-module,
  .tm-decider {
    border: 1px solid var(--tm-border);
    background: #fff;
  }

  .tm-module {
    min-width: 0;
    padding: 0.85rem;
    text-align: center;
  }

  .tm-module-type,
  .tm-decider-rule,
  .tm-lane-note {
    color: #4c4c4c;
    font-size: 0.8rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .tm-module-symbol {
    color: var(--tm-accent);
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.35;
    margin: 0.2rem 0;
  }

  .tm-plus,
  .tm-down {
    align-self: center;
    color: var(--tm-accent);
    font-size: 1.35rem;
    font-weight: 700;
    text-align: center;
  }

  .tm-down {
    margin: 0.75rem 0;
  }

  .tm-decider {
    background: var(--tm-soft);
    padding: 1rem;
  }

  .tm-decider-title {
    color: var(--tm-accent);
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
  }

  .tm-decider-rule {
    margin-top: 0.25rem;
    text-align: center;
  }

  .tm-lanes {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 0.85rem;
    margin-top: 0.9rem;
  }

  .tm-lane {
    display: grid;
    gap: 0.55rem;
    min-width: 0;
  }

  .tm-lane-step {
    background: #fff;
    border: 1px solid var(--tm-border);
    line-height: 1.5;
    padding: 0.75rem;
    text-align: center;
  }

  .tm-lane-arrow {
    color: var(--tm-accent);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    text-align: center;
  }

  .tm-lane-result {
    border: 1px solid var(--tm-border);
    background: #fff;
    color: var(--tm-accent);
    font-weight: 700;
    line-height: 1.5;
    padding: 0.75rem;
    text-align: center;
  }

  .tm-composition-caption {
    color: #333;
    font-size: 0.82rem;
    line-height: 1.55;
    margin-top: 0.85rem;
    text-align: center;
  }

  .tm-composition mjx-container {
    display: inline-block;
    max-width: 100%;
    overflow: visible;
    vertical-align: middle;
  }

  @media (max-width: 620px) {
    .tm-components,
    .tm-lanes {
      grid-template-columns: 1fr;
    }

    .tm-plus {
      padding: 0.1rem 0;
    }
  }
</style>

<div class="tm-composition" role="img" aria-label="A recognizer for L and a recognizer for L complement are composed into a decider by parallel simulation.">
  <div class="tm-components">
    <div class="tm-module">
      <div class="tm-module-type">recognizer for the yes side</div>
      <div class="tm-module-symbol">$R_L$</div>
      <div class="tm-lane-note">accepts when $x \in L$</div>
    </div>

    <div class="tm-plus" aria-hidden="true">$+$</div>

    <div class="tm-module">
      <div class="tm-module-type">recognizer for the no side</div>
      <div class="tm-module-symbol">$R_{\overline{L}}$</div>
      <div class="tm-lane-note">accepts when $x \in \overline{L}$</div>
    </div>
  </div>

  <div class="tm-down" aria-hidden="true">$\Downarrow$</div>

  <div class="tm-decider">
    <div class="tm-decider-title">decider $D$</div>
    <div class="tm-decider-rule">On input $x$, run $R_L(x)$ and $R_{\overline{L}}(x)$ in parallel.</div>

    <div class="tm-lanes">
      <div class="tm-lane">
        <div class="tm-lane-step">if $R_L(x)$ accepts</div>
        <div class="tm-lane-arrow" aria-hidden="true">$\Longrightarrow$</div>
        <div class="tm-lane-result">$D(x) = q_{\text{accept}}$</div>
      </div>

      <div class="tm-lane">
        <div class="tm-lane-step">if $R_{\overline{L}}(x)$ accepts</div>
        <div class="tm-lane-arrow" aria-hidden="true">$\Longrightarrow$</div>
        <div class="tm-lane-result">$D(x) = q_{\text{reject}}$</div>
      </div>
    </div>
  </div>

  <div class="tm-composition-caption">Two one-sided recognizers compose into one two-sided decider.</div>
</div>

Since every encoded object is either in $L$ or in $\overline{L}$, one of the two recognizers must eventually accept. The two one-sided procedures become one two-sided procedure.

Recognition is often easier than decision because it is one-sided. A recognizer only has to verify membership in $L$. In this sense, a recognizer is like a verification procedure for the yes instances. Verifying a yes instance can be easier than solving the whole decision problem.

In symbols, a decider halts on both sides of the partition:

$$
x \in L
\implies
M(x) \text{ reaches } q_{\text{accept}},
$$

and

$$
x \in \overline{L}
\implies
M(x) \text{ reaches } q_{\text{reject}}.
$$

Now the machine is deciding the question. Given an encoded graph $x$, it eventually gives one of two answers: accept if $x$ is on the yes side, reject if $x$ is on the no side.

This is the role of a language in computability theory. A decision question gives us a partition of objects. Encoding turns those objects into strings. The language $L$ is the set of encoded yes instances. A recognizer accepts exactly those yes instances. A decider accepts the yes instances and rejects the no instances.
