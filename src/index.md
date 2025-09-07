---
layout: base.njk
title: "Catálogo"
---
<h2>Productos</h2>

<ul>
{% for product in collections.products | sort %}
  {% if product.data.published %}
    <li>
      <a href="{{ product.url }}">{{ product.data.title }} — ${{ product.data.price }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>

