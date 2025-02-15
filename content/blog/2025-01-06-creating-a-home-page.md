---
title: Creating a home page
---
<!---excerpt-->

You can put whatever you want on your podcast site's home page, but the most obvious and straightforward approach might be to present a list of episodes in reverse chronological order.

Here's how to do that.

<!---endexcerpt-->

**Podcaster** requires all of [your episode templates](docs/episode-information.md) to have the tag `podcastEpisode`. That means you can refer to the full list of your episode templates as `collections.podcastEpisode`. This list is in chronological order

Using that collection, we can write a Liquid template that presents a list of podcast episodes.

{% raw %}

```liquid
---
title: Maximum Power
layout: layouts/base.html
---
{% for post in collections.podcastEpisode | reverse %}
<article>
  <h2>{{ post.data.title }}</h2>
  <p class="episode-number">{{ post.data.episode.episodeNumber }}</p>
  <p class="publication-date">{{ post.date | date: "%A %e %B %Y" }}</p>
  {{ post.content }}
  <audio controls src="{{ post.data.episode.url }}" preload="none">
</article>
{% endfor %}
```

{% endraw %}

The list this presents contains each episode's title, episode number, date and show notes, as well as an audio player to play the episode on.

As it is, this template doesn't scale to podcasts with many episodes, and it might not include quite enough information about each episode. The first problem can be solved by using [Eleventy's pagination feature](https://www.11ty.dev/docs/pagination/); the second could be solved by adding more details, like [the information enumerated here](docs/podcast-information.md). We will follow up both of these solutions in future blog posts.

In any case, this is the basic approach I have taken on all of my podcast websites. There's [a list of them here](/docs/#podcaster-in-action), so take a look if you want to see it in action.
