---
title: How to create an index page
eleventyNavigation:
  key: How to create an index page
  parent: How-to guides
  order: 3
  excerpt: >-
    How to create an index page to create a list of podcast episodes
---
This guide shows you how to create an index page to display a list of podcast episodes.

There are a few assumptions here:

- You have read and understand the guide [How to create episode pages](/docs/how-to-create-episode-pages.md)
- You have a `layouts/base.njk` layout in your includes directory, which includes elements common to all of the pages on your website — the `<head>`, the `<header>`, the `<footer>` and so on
- You are familiar with Eleventy [layouts][] and [collections][].

[layouts]: https://www.11ty.dev/docs/layouts/
[collections]: https://www.11ty.dev/docs/collections/

## Creating an index page

Our first step is to create a page that loops through the episode post collection and displays each episode.

Here's a simple example:

{% raw %}

```nunjucks
---
layout: layouts/base.njk
---
{% for post in collections.episodePost | reverse %}
<article class="episode">
  <h1><a href="{{ post.page.url }}">{{ post.data.title | safe }}</a></h1>
  <p class="episode-metadata">Episode {{ post.data.episode.episodeNumber }}
    <br>{{ post.page.date | readableDate }}</p>
  {{ post.data.excerpt | safe }}
  <figure class="audio">
    <audio controls preload="metadata" src="{{ post.data.episode.url }}"></audio>
    <figcaption>
      Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }}
      &middot; {{ post.data.episode.duration | readableDuration }}
      &middot; <a target="_blank" href="{{ post.data.episode.url }}">Download</a>
      ({{ post.data.episode.size | readableSize }})
    </figcaption>
  </figure>
</article>
{% endfor %}
```

{% endraw %}

You can save this file as `index.njk` in your project's source directory, so that it becomes your site's home page.

You'll notice that it's very similar to the episode page template from the guide [How to create episode pages](/docs/how-to-create-episode-pages.md). There are a few differences though.

- The `title` is now a link to the episode page
- The `content` is now an [excerpt][] of the episode page
- We're looping through a collection, and so each `post` is a [collection item][], which means that its data is accessible through the `post.page` and `post.data` objects.

[excerpt]: /docs/optional-features.md#excerpts
[collection item]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

## Build the site

Now build your site. Eleventy will create an index as the home page of your site.

Run Eleventy in `--serve` mode to see the created page. If you've already created episode pages for your site, the episode titles will link to those pages.
