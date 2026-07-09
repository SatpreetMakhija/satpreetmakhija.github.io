---
layout: default
permalink: /blog/
title: notebook
nav: true
nav_order: 2
pagination:
  enabled: false
  collection: posts
  permalink: /page/:num/
  per_page: 20
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3  # The number of links after the current page
---

<div class="post notebook-page">

  <header class="post-header notebook-header">
    <h1 class="post-title">Notes</h1>
    <p class="notebook-intro">
      Working notes on programming languages, semantics, computation, and mathematics. Entries remain open to revision.
    </p>
  </header>

  {% assign note_types = "Reading Note|Technical Note|Conceptual Note" | split: "|" %}

  <section class="notebook-board" aria-label="Notebook sections">
    {% for note_type in note_types %}
      <section class="notebook-column">
        <h2>{{ note_type }}</h2>
        {% if note_type == "Reading Note" %}
          <p class="notebook-column-desc">Understanding developed while reading papers, books, talks, or lecture notes.</p>
        {% elsif note_type == "Conceptual Note" %}
          <p class="notebook-column-desc">Careful attempts to clarify ideas, tensions, motivations, and possible connections.</p>
        {% elsif note_type == "Technical Note" %}
          <p class="notebook-column-desc">Focused explanations of mathematical or computational concepts.</p>
        {% endif %}

        <ul class="notebook-list">
          {% assign note_count = 0 %}
          {% for post in site.posts %}
            {% if post.status == note_type %}
              {% assign note_count = note_count | plus: 1 %}
              <li>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                <span>{{ post.date | date: "%b %-d, %Y" }}</span>
              </li>
            {% endif %}
          {% endfor %}
          {% if note_count == 0 %}
            <li class="notebook-empty">No entries yet.</li>
          {% endif %}
        </ul>
      </section>
    {% endfor %}
  </section>

  <section class="notebook-archive">
    <h2>Earlier / industry writing</h2>
    <ul class="notebook-archive-list">
      {% for post in site.posts %}
        {% if post.status == "Industry Writing" or post.status == nil %}
          <li>
            <span>{{ post.date | date: "%Y" }}</span>
            {% if post.redirect == blank %}
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% elsif post.redirect contains '://' %}
              <a href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
            {% else %}
              <a href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </section>

</div>
