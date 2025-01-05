---
layout: post
title: "Choosing the right axioms"
date: 2025-01-05
description: A framework to help you choose the right axioms

---



I recently went down the rabbit hole of studying Real Analysis. As part of the first exercise, we constructed natural numbers using **Peano’s axioms**. One of these axioms is often described as “ensuring no circularity”—meaning we don’t define a natural number in terms of itself or create logical loops. Essentially, it’s the idea that 
$$0$$ 
(or the “first” natural number) is not the successor of any other number. This ensures you can’t keep going backwards indefinitely and end up with something like “this number created itself.”

This made me wonder: **How do we choose the correct axioms in the first place?**

I had a vague sense of what an axiom stands for: it’s something so fundamental that we just accept it, because denying it seems impossible if we want to build a coherent theory. For example, we accept the “no circularity” rule in Peano arithmetic because we know, from our usual understanding of how counting works, that numbers don’t loop back on themselves.

In some sense, defining axioms is a backward process rather than a forward one: we look at the structures we already use—like arithmetic—and peel back the layers to find the simplest building blocks. For instance:

- **Multiplication** can be defined as repeated addition.  
- **Addition** can be defined as repeated increment.  
- **Increment** (the “successor” operation) is often written as 
$$n \mapsto n + 1$$ 
and is the point where we say, “Okay, we can’t break this down further.”

So we stop at increment and make it an axiom: “There exists a successor function that behaves in this fundamentally simple way.” We basically say, “We can’t derive it from anything more basic, so we accept it as foundational.”

Now, look at **Euclidean geometry**. It’s famously built from five postulates (axioms):

1. A straight line segment can be drawn between any two points.  
2. Any finite straight line segment can be extended indefinitely in a straight line.  
3. A circle can be drawn with any center and any distance (radius).  
4. All right angles are equal to one another.  
5. *(The Parallel Postulate)* If a straight line intersects two other straight lines such that the sum of the interior angles on one side is less than two right angles, those two lines (if extended far enough) will meet on that side.

The first four seem pretty straightforward—basically describing how lines, segments, and circles behave. But the fifth one, the **Parallel Postulate**, says that if lines have certain angle properties, they’ll meet (or never meet) under certain conditions. Historically, Euclid tried to derive this from the first four but couldn’t. After centuries of attempts, mathematicians concluded the parallel postulate must stand on its own—so it’s part of the foundation.

I recently read (in the footnotes of a book whose name I’ve unfortunately forgotten) a neat idea from **Bertrand Russell**. He suggested that one way we judge the strength or validity of our axioms is whether they lead us to statements we *already believe* to be true. So, for the natural numbers, we already have the idea that we can keep incrementing a number forever and it’ll keep getting bigger. That’s why we accept an axiom like 
$$n + 1 > n$$ 
—it neatly matches our intuition that numbers don’t loop back on themselves and can grow indefinitely.

Here are a few general guidelines we can gather from this:

1. **Work backwards** to find the axioms that cannot be further derived.  
2. **Accept as axioms** those that seem both intuitively reasonable and resistant to being proved by other axioms.  
3. **Use earlier results** (like known theorems or observed truths) to test whether your axioms are powerful or consistent enough.

The short version to choosing the right axioms is: we figure out the irreducible pieces, test them against what we think is “obviously true,” and then put them at the foundation of our system. That’s all “axioms” really are—rock-bottom assumptions that shape the entire universe that follows.

To be honest, writing this post does make me wonder if I can do the same for choosing the right axioms to lead my life. I’ll tackle this in another post.


