---
title: How to create episode pages
eleventyNavigation:
  key: How to create episode pages
  parent: How-to guides
  order: 1
  excerpt: >-
    How to create web pages for each of your episode posts
---
This guide shows you how to create web pages for each of your episode posts.

There are a few assumptions here:

- You have an `episode-posts` folder in your input directory, with an episode post template for each of your podcast episodes
- You have a `layouts/base.njk` layout in your includes directory, which includes elements common to all of the pages on your website — the `<head>`, the `<header>`, the `<footer>` and so on
- You are familiar with Eleventy [layouts][] and [data directory files][]
- You know how to build and serve your site locally

[layouts]: https://www.11ty.dev/docs/layouts/
[data directory files]: https://www.11ty.dev/docs/data-template-dir/

## Create an episode layout

Our first step is to create layout file that displays information about a podcast episode. An include file like this is sometimes called a **partial**.

Here's a simple example:

{% raw %}

```nunjucks
---
layout: layouts/base.njk
---
<article class="episode">
  <h1>{{ title | safe }}</h1>
  <p class="episode-metadata">Episode {{ episode.episodeNumber }}
    <br>{{ date | readableDate }}</p>
  {{ content | safe }}
  <figure class="audio">
    <audio controls preload="metadata" src="{{ episode.url }}"></audio>
    <figcaption>
      Episode {{ episode.episodeNumber }}: {{ title }}
      &middot; {{ episode.duration | readableDuration }}
      &middot; <a target="_blank" href="{{ episode.url }}">Download</a>
      ({{ episode.size | readableSize }})
    </figcaption>
  </figure>
</article>
```

{% endraw %}

To re-create this layout in your project, you can copy the code block above, and then paste the code in a file called `layouts/episode.njk` in your includes directory. Then you can customise it as much as you like, perhaps by including more of [the information that **Podcaster** knows about your podcast episodes](/docs/episode-information.md).

## Create a data directory file

Now we need to apply this layout to all of our episode posts. To do this, create a directory data file in the `episode-posts` directory called `episode-posts.json`, and add this code:

```json
{
  "layout": "layouts/episode.njk"
}
```

## Build the site

Now build your site. Eleventy will use the episode layout to create a page for each of your episode posts using the episode layout and the episode partial.

So when you run Eleventy in `--serve` mode, you can see the created pages at `http://localhost:8080/1/`, `http://localhost:8080/2/`, and so on. (The port number might be different, and if your episodes have season numbers, they'll be included in the URL. See [Permalinks](/docs/permalinks.md) for more information.)

> [!note]
>
> The partial presented here is a simplified version of the one I use on the _Flight Through Entirety_ website, so go and [take a look at the site's home page][fte] if you want to see it in action.

[fte]: https://flightthroughentirety.com
