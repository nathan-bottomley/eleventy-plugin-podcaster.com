---
title: Creating a home page
---
<!---excerpt-->

You can put whatever you want on your podcast site's home page, but the most obvious and straightforward approach is to present a list of episode in reverse chronological order, that is, with the most recent episode at the top.

Here's how to do that.

<!---endexcerpt-->

**Podcaster** requires all of [your episode templates](docs/episode-information.md) to have the tag `podcastEpisode`. That means you can refer to the full list of your episode templates as `collections.podcastEpisode`.

Here's a Liquid template that creates a list of episodes.

{% raw %}

```liquid
---
title: Maximum Power
---
{% for post in collections.podcastEpisode %}
<article>
  <h2>{{ post.title }}</h2>
  <p class="episode-number">{{ post.data.episode.episodeNumber }}</p>
  <p class="publication-date">{{ post.date | date: "%A %e %B %Y" }}</p>
  {{ post.content }}
  <audio controls src="{{ post.episode.url }}" preload="none" type="audio/mp3">
</article>
{% endfor %}
```

{% endraw %}

This appr