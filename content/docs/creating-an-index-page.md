---
title: How to create an index page
eleventyNavigation:
  key: How to create an index page
  parent: How-to guides
  order: 3
  excerpt: >-
    How to create an index page to display a list of podcast episodes
---
This guide shows you how to create an index page to display a list of podcast episodes.

There are a few assumptions here:

- You have read and understand the guide [How to create episode pages](/docs/creating-episode-pages.md)
- You have a `layouts/base.liquid` layout in your includes directory, which includes elements common to all of the pages on your website — the `<head>`, the `<header>`, the `<footer>` and so on
- You are familiar with Eleventy [layouts][] and [collections][].

[layouts]: https://www.11ty.dev/docs/layouts/
[collections]: https://www.11ty.dev/docs/collections/

## Creating an index page

To do this, we need to create a page that loops through the episode post collection and displays each episode. We do this in reverse, so that the most recent episode is displayed first.

Here's an example:

### index.liquid { .filename }

{% raw %}

```liquid
---
layout: layouts/base.liquid
---
{% for post in collections.episodePost reversed %}
<article class="episode">
  <h1><a href="{{ post.page.url }}">{{ post.data.title }}</a></h1>
  <p class="episode-metadata">Episode {{ post.data.episode.episodeNumber }}
    <br>{{ post.page.date | readableDate }}</p>
  {{ post.data.excerpt }}
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

You can save this file as `index.liquid` in your project's source directory, so that it becomes your site's home page.

You'll notice that it's very similar to the episode page layout from the guide [How to create episode pages](/docs/creating-episode-pages.md). But there are a few differences.

- The `title` is a link to the episode page
- The page [excerpt][] replaces the full content of the page
- We're looping through a collection, and so each `post` is a [collection item][], which means that its data is only accessible through the `post.page` and `post.data` objects.

[excerpt]: /docs/optional-features.md#excerpts
[collection item]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

## Build the site

Now build your site. Eleventy will create an index as the home page of your site.

Run Eleventy in `--serve` mode to see the created page. If you've already created episode pages for your site, the episode titles will link to those pages.
