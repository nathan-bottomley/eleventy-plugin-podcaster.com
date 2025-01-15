---
draft: yes
title: Displaying information about an episode
date: 2025-01-22
---
<!---excerpt-->
In my first post a few weeks ago, I showed you [a simple way to create a home page][last-post] for your podcast — by creating a template which loops through the `podcastEpisode` collection and renders some HTML for each post.

[last-post]: 2025-01-06-creating-a-home-page.md

Today, I'm going to walk you through the include file that I use on one of my podcast websites, [_500 Year Diary_][500yd]. This include file displays information about a single podcast episode, both on that episode's page and whenever the episode appears as part of a list, on an index or tag page, for example.

A template like this, which is included on a page and which displays a particular piece of content, is often referred to as a **partial**.

[500yd]: https://500yeardiary.com
<!---endexcerpt-->

Here's the code for the partial. It's a Liquid template. We'll go through it bit by bit in a moment.

{% raw %}

```liquid
{# _includes/episode.liquid #}

{% unless post %}{% assign post = collections.podcastEpisode | getCollectionItem %}{% endunless %}
<article class="podcast-episode">
  <p class="diary-date">{{ post.data.diaryDate | readableDate }}</p>
  <p class="topic">{{ post.data.topic }}</p>
  {% if linkInTitle %}
  <h1 class="podcast-episode-title"><a href="{{ post.url }}">{{ post.data.title }}</a></h1>
  {% else %}
  <h1 class="podcast-episode-title">{{ post.data.title }}</h1>
  {% endif %}
  <p class="podcast-episode-information">
    <a href="/season/{{ post.data.episode.seasonNumber }}">{{ season[post.data.episode.seasonNumber].name }}</a>, 
    Episode {{ post.data.episode.episodeNumber }}<br>
    {{ post.date | readableDate }}.
  </p>
  {% if excerptOnly %}{{ post.data.excerpt }}{% else %}{{ post.content }}{% endif %}
  <figure type="audio">
    <audio preload="none" data-preload="none" data-duration="{{ post.data.episode.duration }}">
      <source src="{{ post.data.episode.url }}" type="audio/mp3">
    </audio>
    <figcaption>
    {{ season[post.data.episode.seasonNumber].name }}, Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }} &middot;
    <a download href="{{ post.data.episode.url }}">Download</a> &middot;
    <a target="_blank" href="{{ post.data.episode.url }}">Open in new window</a> &middot;
    Duration: {{ post.data.episode.duration | readableDuration }} &middot;
    {{ post.data.episode.size | readableSize }} &middot;
    Recorded on {{ post.data.recordingDate | readableDate }}<br>
    Subscribe:&nbsp;&nbsp;
    {%- for subscription in podcast.subscriptions %}
      {%- if not forloop.first %} &middot;{% endif %} <a href="{{ subscription.url }}">{{ subscription.name }}</a>
    {% endfor -%}
  </figure>
</article>
```

{% endraw %}

Let's start with that cryptic first line.

{% raw %}

```liquid
{% unless post %}{% assign post = collections.podcastEpisode | getCollectionItem %}{% endunless %}
```

{% endraw %}

This line allows us to include this partial in two different contexts — either as part of a list of episodes or by itself on the episode's page.

When you're looping through a collection of posts to create a list, each post is presented as a [**collection item**][]. If your loop variable is `post`, you will refer to the post's date or content as {% raw %}`{{ post.date }}` or `{{ post.content }}`, and to its front matter data as `{{ post.data.title }}` and `{{ post.data.topic }}`{% endraw %}.

[**collection item**]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

On a page that presents a single post, you refer to that data more simply, as {% raw %}`{{ date }}`, `{{ content }}`, `{{ title }}` and `{{ topic }}`{% endraw %}.

So this first line checks if there's a `post` variable, and if not, it fetches the current page's collection item, so that we can say {% raw %}`{{ post.date }}` or `{{ post.data.title }}`{% endraw %} in both contexts.

***

Let's go on.

{% raw %}

```liquid
<article class="podcast-episode">
  <p class="diary-date">{{ post.data.diaryDate | readableDate }}</p>
  <p class="topic">{{ post.data.topic }}</p>
```

{% endraw %}

We put all of episode's information inside an `<article>` element, so that it's a single HTML element which we can give its own margins or backgrounds or borders.

The first two child elements of that `<article>` are information specific to the _500 Year Diary_ podcast, where each episode refers to a particular date in history and a particular topic. That information appears prominently whenever an episode is described on the website. That information can also be included on the podcast feed so that it appears in your listeners' podcast apps. More of that in a later post.

***

{% raw %}

```liquid
  {% if linkInTitle %}
  <h1 class="podcast-episode-title"><a href="{{ post.url }}">{{ post.data.title }}</a></h1>
  {% else %}
  <h1 class="podcast-episode-title">{{ post.data.title }}</h1>
  {% endif %}
```

{% endraw %}

Here's where we put the post's title, which is usually (but not always) the same as the title of the podcast episode.

On an index page or a tag page, you can include `linkInTitle: true` in the front matter, and the title will be a link to the episode's own page. If you omit `linkInTitle` the title will just be text, which is what you want on 

***

{% raw %}

```liquid
  <p class="podcast-episode-information">
    <a href="/season/{{ post.data.episode.seasonNumber }}">{{ season[post.data.episode.seasonNumber].name }}</a>, 
    Episode {{ post.data.episode.episodeNumber }}<br>
    {{ post.date | readableDate }}.
  </p>
```

{% endraw %}

This paragraph contains metadata about the podcast episode: the name of the season (which is a link to the season page), the episode number and the date of release.

There's only one season of _500 Year Diary_ right now, but each season will have its own page, with a picture, a short blurb and a list of episodes. [Take a look here](https://500yeardiary.com/season/1).

But there's a global data file called `season.json` which contains the name of the season.

```json
{
  "1": {
    "name": "New Beginnings"
  }
}
```

I will undoubtedly add more information to it later. (If I don't, I guess I could just turn it into an array of names and amend this part of the partial.)

***

{% raw %}

```liquid
  {% if excerptOnly %}{{ post.data.excerpt }}{% else %}{{ post.content }}{% endif %}
```

{% endraw %}

This part of the partial displays the show notes. If `excerptOnly` is set to `true`, only the first paragraph of the show notes is included; otherwise the page includes the complete shownotes.

On [the _500 Year Diary_ website][500yd], the index pages and the episode pages contain the complete show notes. Season pages contain the excerpt only, and so they include `excerptOnly: true` in their front matter.

Excerpts are an optional feature of **Podcaster**. They're quite flexible: they have a sensible default, while allowing you to set them how you would like. [Here's how excerpts are explained in the documentation.](/docs/optional-features/#excerpts)

***

{% raw %}

```liquid
  <figure type="audio">
    <audio controls preload="none" data-preload="none" data-duration="{{ post.data.episode.duration }}">
      <source src="{{ post.data.episode.url }}" type="audio/mp3">
    </audio>
    <figcaption>
    {{ season[post.data.episode.seasonNumber].name }}, Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }} &middot;
    <a download href="{{ post.data.episode.url }}">Download</a> &middot;
    <a target="_blank" href="{{ post.data.episode.url }}">Open in new window</a> &middot;
    Duration: {{ post.data.episode.duration | readableDuration }} &middot;
    {{ post.data.episode.size | readableSize }} &middot;
    Recorded on {{ post.data.recordingDate | readableDate }}<br>
    Subscribe:&nbsp;
    {%- for subscription in podcast.subscriptions %}
      {%- if not forloop.first %} &middot;{% endif %} <a href="{{ subscription.url }}">{{ subscription.name }}</a>
    {% endfor -%}
  </figure>
```

{% endraw %}

Whenever an episode appears on the site, it's accompanied by an audio player so that the visitor can listen to the episode directly from the site.

Here we present the audio in [a `<figure>` element][figure]; the `<figure>` element is for self-contained content used for illustrative purposes, and which can contain a caption element, `<figcaption>`.

[figure]: https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element

The audio itself is an `<audio>` element with the `controls` attribute, which presents an audio player on the page. `preload="none` prevents the page from loading the audio before the user asks for it. The `data-preload` and `data-duration` attributes are used by the [Vidstack](https://vidstack.io) library, which replaces the native HTML audio element with a styleable player using progressive enhancement.

The `<figcaption>` element presents quite a bit of information about the episode. This includes the title, which is here so that the listener knows what episode they are playing — the show notes can be quite long and the player is often quite a distance away from the heading of the post. Also included are links to download the episode or listen to it in another window, as well as the duration of the episode and its size in megabytes. Finally, in an always be closing kind of way, there is a list of subscription links, which are added to the data cascade in a global data file, `_data/podcast.json`.

***

And that's that. You can see this partial in action on the [_500 Year Diary_][500yd] website. Please feel free to [get in touch](about.md) if you have any questions or comments.
