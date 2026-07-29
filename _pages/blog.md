---
layout: default
permalink: /blog/
title: writings
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

<div class="post writings-page">

  <section class="writings-index" aria-label="Writings">
    <section class="writings-group" aria-labelledby="technical-writing">
      <h2 id="technical-writing">Technical</h2>
      <ul class="writings-list">
        {% for post in site.posts %}
          {% unless post.writing_type == "literary" %}
            <li>
              {% if post.redirect == blank %}
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              {% elsif post.redirect contains '://' %}
                <a href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
              {% else %}
                <a href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
              {% endif %}
              <span>{{ post.date | date: "%Y" }}</span>
            </li>
          {% endunless %}
        {% endfor %}
      </ul>
    </section>

    <section class="writings-group" aria-labelledby="literary-writing">
      <h2 id="literary-writing">Literary</h2>
      <ul class="writings-list">
        {% for post in site.posts %}
          {% if post.writing_type == "literary" %}
            <li>
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              <span>
                {% if post.genre %}{{ post.genre }} &middot; {% endif %}
                {% if post.display_date %}
                  {{ post.display_date }}
                {% else %}
                  {{ post.date | date: "%Y" }}
                {% endif %}
              </span>
            </li>
          {% endif %}
        {% endfor %}
      </ul>
    </section>
  </section>

</div>
