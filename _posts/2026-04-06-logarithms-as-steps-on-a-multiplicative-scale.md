---
layout: post
title: "Changing bases: an intuitive explanation"
date: 2026-04-06
description: Why the change of base formula works, explained through a multiplicative number line
math: true
tags: [maths]
---

The change of base formula states:

$$\log_b(x) = \frac{\log_a(x)}{\log_a(b)}$$

There exists an algebraic proof. This explanation is meant to give you more intuition for why the formula is what it is.

### A multiplicative scale

Consider a number line where we reach a number $$x$$ by repeatedly multiplying by some fixed number $$a > 1$$. Take $$a = 2$$. Starting from 1:

<div style="overflow-x: auto; margin: 2em 0;">
<svg viewBox="0 0 680 100" xmlns="http://www.w3.org/2000/svg" style="max-width: 680px; width: 100%; font-family: Georgia, 'Times New Roman', serif;">
  <!-- main line -->
  <line x1="30" y1="55" x2="660" y2="55" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="660,55 652,51 652,59" fill="currentColor"/>

  <!-- 1 -->
  <line x1="50" y1="44" x2="50" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="50" y="82" text-anchor="middle" fill="currentColor" font-size="14">1</text>

  <!-- 2 -->
  <line x1="160" y1="44" x2="160" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="160" y="82" text-anchor="middle" fill="currentColor" font-size="14">2</text>
  <path d="M 52,42 C 72,12 140,12 158,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <text x="105" y="14" text-anchor="middle" fill="#2980b9" font-size="10">×2</text>

  <!-- 4 -->
  <line x1="270" y1="44" x2="270" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="270" y="82" text-anchor="middle" fill="currentColor" font-size="14">4</text>
  <path d="M 162,42 C 182,12 250,12 268,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <text x="215" y="14" text-anchor="middle" fill="#2980b9" font-size="10">×2</text>

  <!-- 8 -->
  <line x1="380" y1="44" x2="380" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="380" y="82" text-anchor="middle" fill="currentColor" font-size="14">8</text>
  <path d="M 272,42 C 292,12 360,12 378,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <text x="325" y="14" text-anchor="middle" fill="#2980b9" font-size="10">×2</text>

  <!-- 16 -->
  <line x1="490" y1="44" x2="490" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="490" y="82" text-anchor="middle" fill="currentColor" font-size="14">16</text>
  <path d="M 382,42 C 402,12 470,12 488,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <text x="435" y="14" text-anchor="middle" fill="#2980b9" font-size="10">×2</text>

  <!-- 32 -->
  <line x1="600" y1="44" x2="600" y2="66" stroke="currentColor" stroke-width="1.5"/>
  <text x="600" y="82" text-anchor="middle" fill="currentColor" font-size="14">32</text>
  <path d="M 492,42 C 512,12 580,12 598,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <text x="545" y="14" text-anchor="middle" fill="#2980b9" font-size="10">×2</text>
</svg>
</div>

The number 8 is three steps from 1. The number 32 is five. The position of any number $$x$$ on this scale — the number of steps from 1 — is what we call $$\log_2(x)$$. For an arbitrary $$x$$, the length from 1 to $$x$$ is $$\log_2(x)$$.

<div style="overflow-x: auto; margin: 2em 0;">
<svg viewBox="0 0 680 125" xmlns="http://www.w3.org/2000/svg" style="max-width: 680px; width: 100%; font-family: Georgia, 'Times New Roman', serif;">
  <!-- main line -->
  <line x1="30" y1="50" x2="660" y2="50" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="660,50 652,46 652,54" fill="currentColor"/>

  <!-- 1 -->
  <line x1="50" y1="38" x2="50" y2="62" stroke="currentColor" stroke-width="1.5"/>
  <text x="50" y="78" text-anchor="middle" fill="currentColor" font-size="14">1</text>

  <!-- faded ticks with blue hops -->
  <line x1="120" y1="43" x2="120" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 52,38 C 66,20 106,20 118,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="190" y1="43" x2="190" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 122,38 C 136,20 176,20 188,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="260" y1="43" x2="260" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 192,38 C 206,20 246,20 258,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="330" y1="43" x2="330" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 262,38 C 276,20 316,20 328,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="400" y1="43" x2="400" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 332,38 C 346,20 386,20 398,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="470" y1="43" x2="470" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 402,38 C 416,20 456,20 468,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <line x1="540" y1="43" x2="540" y2="57" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  <path d="M 472,38 C 486,20 526,20 538,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>
  <path d="M 542,38 C 556,20 596,20 608,38" stroke="#2980b9" stroke-width="1.3" fill="none"/>

  <!-- x -->
  <line x1="610" y1="38" x2="610" y2="62" stroke="#2c3e50" stroke-width="2"/>
  <text x="610" y="78" text-anchor="middle" fill="#2c3e50" font-size="15" font-style="italic">x</text>

  <!-- brace -->
  <line x1="50" y1="92" x2="610" y2="92" stroke="currentColor" stroke-width="0.9" opacity="0.45"/>
  <line x1="50" y1="87" x2="50" y2="97" stroke="currentColor" stroke-width="0.9" opacity="0.45"/>
  <line x1="610" y1="87" x2="610" y2="97" stroke="currentColor" stroke-width="0.9" opacity="0.45"/>
  <text x="330" y="118" text-anchor="middle" fill="currentColor" font-size="14" font-style="italic" opacity="0.6">
    <tspan>log</tspan><tspan dy="4" font-size="10">2</tspan><tspan dy="-4">(x)</tspan>
  </text>
</svg>
</div>

### Placing b on the scale

Now introduce another number $$b > 1$$. It too has a place on our scale, at position $$\log_a(b)$$. Take $$b = 8$$. On the base-2 scale, 8 sits at step 3.

<div style="overflow-x: auto; margin: 2em 0;">
<svg viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg" style="max-width: 680px; width: 100%; font-family: Georgia, 'Times New Roman', serif;">
  <!-- main line -->
  <line x1="30" y1="55" x2="660" y2="55" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="660,55 652,51 652,59" fill="currentColor"/>

  <!-- 1 -->
  <line x1="50" y1="43" x2="50" y2="67" stroke="currentColor" stroke-width="1.5"/>
  <text x="50" y="83" text-anchor="middle" fill="currentColor" font-size="14">1</text>

  <!-- 2, faded with blue hop -->
  <line x1="140" y1="47" x2="140" y2="63" stroke="currentColor" stroke-width="0.8" opacity="0.25"/>
  <text x="140" y="83" text-anchor="middle" fill="currentColor" font-size="12" opacity="0.25">2</text>
  <path d="M 52,42 C 68,22 124,22 138,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>

  <!-- 4, faded with blue hop -->
  <line x1="230" y1="47" x2="230" y2="63" stroke="currentColor" stroke-width="0.8" opacity="0.25"/>
  <text x="230" y="83" text-anchor="middle" fill="currentColor" font-size="12" opacity="0.25">4</text>
  <path d="M 142,42 C 158,22 214,22 228,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>

  <!-- hop from 4 to b -->
  <path d="M 232,42 C 248,22 304,22 318,42" stroke="#2980b9" stroke-width="1.3" fill="none"/>

  <!-- b = 8 -->
  <line x1="320" y1="40" x2="320" y2="70" stroke="#c0392b" stroke-width="2.2"/>
  <text x="320" y="85" text-anchor="middle" fill="#c0392b" font-size="14" font-weight="bold">8</text>
  <text x="320" y="32" text-anchor="middle" fill="#c0392b" font-size="13" font-style="italic">b</text>

  <!-- faded continuation ticks -->
  <line x1="410" y1="49" x2="410" y2="61" stroke="currentColor" stroke-width="0.7" opacity="0.15"/>
  <line x1="500" y1="49" x2="500" y2="61" stroke="currentColor" stroke-width="0.7" opacity="0.15"/>

  <!-- x -->
  <line x1="610" y1="43" x2="610" y2="67" stroke="#2c3e50" stroke-width="2"/>
  <text x="610" y="83" text-anchor="middle" fill="#2c3e50" font-size="15" font-style="italic">x</text>

  <!-- brace: 1 to b -->
  <line x1="50" y1="100" x2="320" y2="100" stroke="#c0392b" stroke-width="0.9" opacity="0.5"/>
  <line x1="50" y1="95" x2="50" y2="105" stroke="#c0392b" stroke-width="0.9" opacity="0.5"/>
  <line x1="320" y1="95" x2="320" y2="105" stroke="#c0392b" stroke-width="0.9" opacity="0.5"/>
  <text x="185" y="124" text-anchor="middle" fill="#c0392b" font-size="13" font-style="italic" opacity="0.7">
    <tspan>log</tspan><tspan dy="4" font-size="9">2</tspan><tspan dy="-4">(b) = 3</tspan>
  </text>
</svg>
</div>

The segment from 1 to $$b$$ has a definite length on the scale: $$\log_a(b)$$ steps. But $$b$$ is also a perfectly good multiplier in its own right. Multiplying by $$b$$ once gets you from 1 to $$b$$. Multiplying again gets you from $$b$$ to $$b^2$$. You can traverse the same line using $$b$$ as the step — in larger jumps.

### The ratio

The segment from 1 to $$x$$ has length $$\log_a(x)$$. The segment from 1 to $$b$$ has length $$\log_a(b)$$. Each jump of $$\times b$$ covers exactly $$\log_a(b)$$ units on the scale. So we ask: how many copies of the smaller segment fit into the larger one?

<div style="overflow-x: auto; margin: 2em 0;">
<svg viewBox="0 0 750 190" xmlns="http://www.w3.org/2000/svg" style="max-width: 750px; width: 100%; font-family: Georgia, 'Times New Roman', serif;">
  <!-- main line -->
  <line x1="30" y1="70" x2="720" y2="70" stroke="currentColor" stroke-width="1.5"/>
  <polygon points="720,70 712,66 712,74" fill="currentColor"/>

  <!-- 1 -->
  <line x1="50" y1="56" x2="50" y2="84" stroke="currentColor" stroke-width="1.5"/>
  <text x="50" y="102" text-anchor="middle" fill="currentColor" font-size="15">1</text>

  <!-- b -->
  <line x1="220" y1="53" x2="220" y2="87" stroke="#c0392b" stroke-width="2"/>
  <text x="220" y="102" text-anchor="middle" fill="#c0392b" font-size="15" font-style="italic">b</text>

  <!-- b² -->
  <line x1="390" y1="53" x2="390" y2="87" stroke="#c0392b" stroke-width="2"/>
  <text x="390" y="102" text-anchor="middle" fill="#c0392b" font-size="15">b²</text>

  <!-- b³ -->
  <line x1="560" y1="53" x2="560" y2="87" stroke="#c0392b" stroke-width="2"/>
  <text x="560" y="102" text-anchor="middle" fill="#c0392b" font-size="15">b³</text>

  <!-- x -->
  <line x1="670" y1="56" x2="670" y2="84" stroke="#2c3e50" stroke-width="2"/>
  <text x="670" y="102" text-anchor="middle" fill="#2c3e50" font-size="16" font-style="italic">x</text>

  <!-- arcs: ×b jumps -->
  <path d="M 53,53 C 85,8 185,8 217,53" stroke="#c0392b" stroke-width="1.5" fill="none"/>
  <text x="135" y="18" text-anchor="middle" fill="#c0392b" font-size="12">×b</text>

  <path d="M 223,53 C 255,8 355,8 387,53" stroke="#c0392b" stroke-width="1.5" fill="none"/>
  <text x="305" y="18" text-anchor="middle" fill="#c0392b" font-size="12">×b</text>

  <path d="M 393,53 C 425,8 525,8 557,53" stroke="#c0392b" stroke-width="1.5" fill="none"/>
  <text x="475" y="18" text-anchor="middle" fill="#c0392b" font-size="12">×b</text>

  <!-- brace: 1 to x -->
  <line x1="50" y1="120" x2="670" y2="120" stroke="#2c3e50" stroke-width="1" opacity="0.5"/>
  <line x1="50" y1="114" x2="50" y2="126" stroke="#2c3e50" stroke-width="1" opacity="0.5"/>
  <line x1="670" y1="114" x2="670" y2="126" stroke="#2c3e50" stroke-width="1" opacity="0.5"/>
  <text x="360" y="145" text-anchor="middle" fill="#2c3e50" font-size="15" font-style="italic" opacity="0.65">
    <tspan>log</tspan><tspan dy="5" font-size="11">a</tspan><tspan dy="-5">(x)</tspan>
  </text>

  <!-- brace: 1 to b -->
  <line x1="50" y1="158" x2="220" y2="158" stroke="#c0392b" stroke-width="1" opacity="0.5"/>
  <line x1="50" y1="152" x2="50" y2="164" stroke="#c0392b" stroke-width="1" opacity="0.5"/>
  <line x1="220" y1="152" x2="220" y2="164" stroke="#c0392b" stroke-width="1" opacity="0.5"/>
  <text x="135" y="183" text-anchor="middle" fill="#c0392b" font-size="15" font-style="italic" opacity="0.65">
    <tspan>log</tspan><tspan dy="5" font-size="11">a</tspan><tspan dy="-5">(b)</tspan>
  </text>
</svg>
</div>

$$\frac{\log_a(x)}{\log_a(b)}$$

This quotient counts the number of times you must multiply by $$b$$ to reach $$x$$. That, by definition, is $$\log_b(x)$$.
