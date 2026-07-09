---
layout: post
title: "Reading Moggi: computations as effectful maps"
date: 2026-07-09
last_updated: 2026-07-09
description: First pass on how monads separate values from computations
status: "Reading Note"
math: true
tags: [semantics, monads, effects, computation]
---

Reading: [Eugenio Moggi, "Notions of computation and monads"](https://doi.org/10.1016/0890-5401(91)90052-4), *Information and Computation* 93(1), 55-92, 1991.

This note tracks a natural first modeling move one might make when trying to understand Moggi's paper, why that move is tempting, and why the monadic framing changes it.

Suppose we want to model a program such as:

$$
\texttt{Int} \to \texttt{Maybe}\ \texttt{String}
$$

The first approach is to treat it as an ordinary function:

$$
f : A \to B
$$

where $A$ is the input type $\texttt{Int}$, and $B$ is taken to be the whole output type $\texttt{Maybe}\ \texttt{String}$. This is a reasonable first framing, but it misses the important semantic distinction. It treats $\texttt{Maybe}\ \texttt{String}$ as just another output type. Moggi's move is to distinguish values from computations that may produce values.

A better shape is:

$$
f : A \to M B
$$

Now $B$ is the value type we hope to get, and $M B$ is a computation of type $M$ that may produce a $B$. For the example above, the corrected reading is: $A$ is $\texttt{Int}$, $B$ is $\texttt{String}$, and $M$ is $\texttt{Maybe}$. So the program has the shape:

$$
\texttt{Int} \to \texttt{Maybe}\ \texttt{String}
$$

which is understood semantically as:

$$
A \to M B
$$

The point is not merely that the output type is larger. The point is that the codomain is being read as a computation type.

One small correction to the starting picture: $\texttt{Hask}$ should not be treated as merely a set of types. It is better, at least informally, to think of a category whose objects are types and whose arrows are functions or programs. This is already an idealization, because real Haskell has partiality and nontermination, but the category picture is the useful one for the reading.

## Why ordinary composition breaks

If programs were just pure functions, composition would have the familiar shape:

$$
f : A \to B
$$

$$
g : B \to C
$$

and then:

$$
g \circ f : A \to C
$$

But the effectful example is not pure in that sense. If

$$
f : A \to M B
$$

then applying $f$ to an input does not give a plain $B$. It gives a computation $M B$. So an ordinary function

$$
g : B \to C
$$

cannot simply be composed after $f$, because $g$ expects a $B$, not an $M B$.

The effectful version of the next program should instead be written:

$$
g : B \to M C
$$

Now the question is: how do we compose $f : A \to M B$ with $g : B \to M C$?

This is where the monad matters. A monad gives a way to sequence computations. In one notation, it gives $\operatorname{bind}$:

$$
\operatorname{bind} : M B \to (B \to M C) \to M C
$$

Equivalently, it gives a Kleisli extension operation that turns

$$
g : B \to M C
$$

into

$$
g^\* : M B \to M C
$$

Then the composite has the right shape:

$$
A \xrightarrow{f} M B \xrightarrow{g^\*} M C
$$

So the corrected composition story is not that $g : B \to C$ becomes $g : M B \to C$. That would still try to get a pure $C$ out of an effectful input. The monadic story sends us from $M B$ to $M C$, preserving the fact that the computation is effectful.

If $g : B \to C$ is genuinely pure, it can still be lifted. One can map it across the computation:

$$
M B \to M C
$$

or compose it with $\operatorname{return}$ to view it as:

$$
B \to M C
$$

But this is a special case. The central effectful composition is between maps of the form $A \to M B$.

## What generalizes

The second problem in the starting notes was lack of generalization. There are many different effects one might want to model: failure, exceptions, state, nondeterminism, input/output, and so on. The contribution is not that one single $M$ magically captures every effect. Rather, the same abstract shape can be reused:

$$
A \to M B
$$

The particular choice of $M$ determines the notion of computation. For failure, $M$ might be $\texttt{Maybe}$. For nondeterminism, $M$ might collect several possible results. For state, $M$ must remember how a state is threaded through the computation. For input/output, $M$ marks that the computation interacts with the external world.

So $M$ is not just decoration around $B$. It is the semantic structure that says what kind of computation we are talking about.

This also means the result should not be overstated. Basic monads give a uniform way to talk about many effects, but combining effects is a further problem. If a program has failure and state and input/output, it is not enough to say "use a monad" and be done. One still has to say which monad, how the effects interact, and what laws the resulting structure satisfies.

## What Moggi clarifies

The main clarification is the separation between values and computations. A value of type $B$ is not the same thing as a computation that may produce a value of type $B$. Once this distinction is made, a program with effects should not be modeled as a plain map from values to values:

$$
A \to B
$$

It should be modeled as a map from values to computations:

$$
A \to M B
$$

This gives a disciplined way to reason about effects without pretending that every program is a total pure function. The monad packages the relevant notion of computation, and Kleisli composition explains how effectful programs can still be sequenced.

The next thing to understand is how the monad laws correspond to sensible behavior of sequencing. It is also worth asking which effects fit this picture cleanly, which ones require more structure, and what exactly is preserved when we move from ordinary functions to Kleisli arrows.
