---
layout: page
hide_title: true
title: bookshelf
permalink: /bookshelf/
nav: true
nav_order: 1
---

<div class="bookshelf">
  {% for book in site.data.bookshelf %}
  <article class="bookshelf-entry">
    <h2><a href="{{ book.goodreads | escape }}">{{ book.title | escape }}</a></h2>
    <p class="bookshelf-author">{{ book.author | escape }}</p>
    {% if book.note != blank %}
    <div class="bookshelf-note">{{ book.note | markdownify }}</div>
    {% endif %}
  </article>
  {% endfor %}
</div>
