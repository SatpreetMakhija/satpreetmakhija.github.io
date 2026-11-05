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
    <div class="writings-group">
      <ul class="writings-list">
        {% for post in site.posts %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <span>{{ post.date | date: "%B %Y" }}</span>
          </li>
        {% endfor %}
      </ul>
    </div>
  </section>
</div>
