---
title: Presenting an episode on your site
date: 2025-02-16
---
<!---excerpt-->
In my first post a few weeks ago, I showed you [a simple way to create a home page][last-post] for your podcast — by creating a template which loops through the `podcastEpisode` collection and renders some HTML containing the information for each episode.

[last-post]: blog/2025-01-06-creating-a-home-page.md

Today, I'm going to show you an include file which presents more extensive detail about an episode. This include file can be used by itself on the episode's dedicated page, but it can also be used as part of a list of episodes — like an index page or a tag page, for example.

An include file like this is sometimes called a **partial**.
<!---endexcerpt-->

***

Here's the code for the partial. It's a Nunjucks template.

{% raw %}

```nunjucks
{% if not post %}{% set post = collections.podcastEpisode | getCollectionItem %}{% endif %}
<article>
  {%- if linkInTitle -%}
  <h1><a href="{{ post.url }}">{{ post.data.title | safe }}</a></h1>
  {%- else -%}
  <h1>{{ post.data.title | safe }}</h1>
  {%- endif -%}
  <p class="post-metadata">Episode {{ post.data.episode.episodeNumber }} &middot; {{ post.data.topic | safe }} &middot; {{ post.date | readableDate }}</p>
  {% if excerptOnly %}
    {{ post.data.excerpt | safe }}
  {% else %}
    {{ post.content | safe }}
  {% endif %}
  <figure class="audio">
    <audio controls preload="metadata" src="{{ post.data.episode.url }}"></audio>
    <figcaption>
      Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }}
      &middot; Recorded on {{ post.data.episode.recordingDate | readableDate }}
      &middot; <a target="_blank" href="{{ post.data.episode.url }}">Download</a> ({{ post.data.episode.size | readableSize(1) }})
    </figcaption>
  </figure>
</article>
```

{% endraw %}

Let's start with that cryptic first line.

{% raw %}

```nunjucks
{% if not post %}{% set post = collections.podcastEpisode | getCollectionItem %}{% endif %}
```

{% endraw %}

This line allows us to use this partial in two different contexts — as part of a list of episodes, or by itself on the episode's page.

Let's say we're looping through some episodes to display a list.

{% raw %}

```nunjucks
{% for post in collections.podcastEpisode | reverse %}
{% include 'episode.njk' %}
{% endfor %}
```

{% endraw %}

When we're looping through a collection of posts like that, each post is represented by a [**collection item**][]. If our loop variable is `post`, we will refer to the post's date or content as {% raw %}`{{ post.date }}` or `{{ post.content }}`, and to its front matter data as `{{ post.data.title }}` and `{{ post.data.topic }}`{% endraw %}.

[**collection item**]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

When we're _not_ looping through a collection, we can refer to all that data more simply, as {% raw %}`{{ date }}`, `{{ content }}`, `{{ title }}` and `{{ topic }}`{% endraw %}.

To make this partial usable in both contexts, the partial assumes that it's dealing with a collection item called `post`. The first line checks if there's a `post` variable defined already. If there is, the partial assumes that we're in a loop and that that's the current collection item. If not, it fetches the  collection item for the current page from the `podcastEpisode` collection and assigns that to `post`.

> [!note]
> This means that if you use this partial in a loop, the loop variable must be called `post`.

***

Let's continue.

We put all of the episode's information inside an `<article>` element — a single HTML element which we can give its own margins or backgrounds or borders.

{% raw %}

Within that element, the first piece of information presented is the title.

{% raw %}

```nunjucks
{%- if linkInTitle -%}
<h1><a href="{{ post.url }}">{{ post.data.title | safe }}</a></h1>
{%- else -%}
<h1>{{ post.data.title | safe }}</h1>
{%- endif -%}
```

{% endraw %}

When this partial is used in a list, we probably want the title to link out to the episode's dedicated page. To make this happen, we set the `linkInTitle` variable to `true`, like this:

{% raw %}

```nunjucks
----
linkInTitle: true
---
{% for post in collections.podcastEpisode | reverse %}
{% include 'episode.njk' %}
{% endfor %}
```

{% endraw %}

After the title, there's a line of episode metadata: the episode number, the topic and the release date.

And then after that, there's either the post content, which will contain the episode's full show notes, or the post excerpt, which is shorter version of the show notes which might be used in a list. The variable `excerptOnly` determines which.

{% raw %}

```nunjucks
----
excerptOnly: true
---
{% for post in collections.podcastEpisode | reverse %}
{% include 'episode.njk' %}
{% endfor %}
```

{% endraw %}

Excerpts are an optional feature of **Podcaster**. They're quite flexible: they have a sensible default, while allowing you to set them how you would like. [Here's how excerpts are explained in the documentation.](/docs/optional-features/#excerpts)

After that, there's an audio player, accompanied by a caption containing the episode number and title, the recording date, and a link for downloading the episode (accompanied by the size of the episode, for the sake of politeness).

***

And that's that. The partial presented here is a simplified version of the one I use on the _Flight Through Entirety_ website, so go and [take a look at the site's home page][fte] if you want to see it in action.

[fte]: https://flightthroughentirety.com
