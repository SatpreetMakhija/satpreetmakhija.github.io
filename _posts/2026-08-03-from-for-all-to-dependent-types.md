---
layout: post
title: "How Universal Proofs Motivate Dependent Types"
date: 2026-08-03
last_updated: 2026-08-03
description: Why proving a universal statement naturally leads to a dependent function
status: "Conceptual Note"
math: true
tags: [type-theory, proofs, dependent-types, curry-howard]
---

One of the first claims we learn to prove about natural numbers is:

$$
\forall n : \mathbb{N},\; n + 0 = n.
$$

Read as ordinary mathematics, this says that adding zero to any natural number leaves it unchanged. Read through the Curry–Howard correspondence, however, it also gives a useful motivation for dependent types.

Under Curry–Howard, propositions are types and proofs are terms inhabiting those types. The concrete proposition

$$
1 + 0 = 1
$$

is therefore a type. A proof of the proposition is a term of that type. Similarly,

$$
2 + 0 = 2
$$

is another proposition-type. The two propositions have the same shape, but they are not literally the same type: one expresses an equality involving $1$, while the other expresses an equality involving $2$.

So what type corresponds to the universal statement?

## A family of propositions

We can begin by giving the repeated pattern a name:

$$
P(n) \coloneqq (n + 0 = n).
$$

Now $P$ is a family of types indexed by natural numbers. Supplying an index selects a particular member of the family:

$$
P(1) = (1 + 0 = 1),
$$

$$
P(2) = (2 + 0 = 2),
$$

and so on.

The word *dependent* refers to this relationship. The proposition-type $P(n)$ depends on the value of $n$. It is not possible to choose the result type without first knowing which natural number we are talking about.

There is a small but important distinction here: $n$ itself does not have a dependent type. Its type is simply $\mathbb{N}$. What depends on $n$ is the proposition we must prove:

$$
n : \mathbb{N}
$$

$$
P(n) : \mathsf{Type}.
$$

Saying that “the type of $n$ is dependent” puts the dependency in the wrong place. The input has an ordinary type; the result type varies with the input.

## A universal proof is a function

Suppose we have a proof of

$$
\forall n : \mathbb{N},\; P(n).
$$

We should be able to give this proof any natural number and obtain evidence for the corresponding proposition. If we give it $1$, it must return a proof of $P(1)$. If we give it $2$, it must return a proof of $P(2)$.

That sounds like a function:

$$
p(n) = \text{a proof of } P(n).
$$

But it is not an ordinary function type $A \to B$, where the codomain $B$ is fixed once and for all. Here the type of the output changes with the input. The appropriate type is a dependent function type, also called a $\Pi$-type:

$$
p : \prod_{n : \mathbb{N}} P(n).
$$

Substituting the definition of $P$ gives:

$$
p : \prod_{n : \mathbb{N}} (n + 0 = n).
$$

The universal theorem therefore corresponds to one type—the whole $\Pi$-type—but that type is formed from the family $P(n)$. A term inhabiting it must work uniformly across every member of the family.

Applying such a proof specializes both its value and its type:

$$
p(1) : 1 + 0 = 1,
$$

$$
p(2) : 2 + 0 = 2.
$$

This is the computational content of universal quantification. To prove “for every $n$,” we construct something that accepts an arbitrary $n$ and produces the proof appropriate to that $n$.

## What does the proof look like?

The shape of the type tells us what the proof must do, but the definition of addition determines how much work is needed to build it.

Suppose addition is defined by recursion on its second argument, with the rule

$$
n + 0 \equiv n.
$$

Then $n + 0$ reduces to $n$ by definition. The required equality is reflexivity, and the proof has the simple form

$$
p \coloneqq \lambda n.\, \mathsf{refl}_n.
$$

The expression $\lambda n$ introduces the arbitrary natural number. For that $n$, $\mathsf{refl}_n$ supplies a proof of $n = n$, which is also a proof of $n + 0 = n$ after the definition of addition is unfolded.

If addition is defined differently—for example, by recursion on its first argument—the same theorem may require induction instead. That changes how we construct the inhabitant, but it does not change the theorem's dependent function type.

## Why the dependency matters

It may be tempting to imagine the universal statement as one very large conjunction:

$$
P(0) \land P(1) \land P(2) \land \cdots
$$

The $\Pi$-type gives a more useful picture. A proof is not an infinite list of unrelated proofs stored somewhere. It is a uniform method that produces the right proof when given an index.

This also explains why ordinary function types are a special case of dependent function types. If the output type does not actually vary with the input—if $P(n)$ is always the same type $B$—then

$$
\prod_{n : A} B
$$

behaves like the familiar function type

$$
A \to B.
$$

Dependent functions generalize ordinary functions by allowing the codomain to mention the argument.

So the path from universal quantification to dependent types is quite direct:

1. Each concrete proposition $P(n)$ is a type.
2. Varying $n$ gives a family of types.
3. A proof valid for every $n$ takes an $n$ and returns a term of the corresponding type $P(n)$.
4. Such a proof is a dependent function, with type $\prod_{n : \mathbb{N}} P(n)$.

The input is still just a natural number. It is the proof obligation that moves with it.
