---
title: Calculated data
eleventyNavigation:
  key: Calculated data
  order: 6
  parent: Reference
  excerpt: >-
    What podcast and episode data is calculated by **Podcaster** for use in your templates
---
Here's the information that **Podcaster** calculates and provides to your templates, in addition to the information that you provide yourself.

## Episode data

| field | value |
| ----- | ----- |
| `episode.url` | The full URL of the episode's audio file. Calculated from `podcast.episodeUrlBase` and `episode.filename`. |

## Podcast data

| field | value |
| ----- | ----- |
| `podcast.copyrightNotice` or `copyrightNotice` | A copyright notice calculated from information you provided to **Podcaster**. Consists of the copyright symbol, a date or date range, and the author's name. |

The following information is only available if **Podcaster** [has been told where to find your episode audio files][storing].

[storing]: http://localhost:8080/docs/sources-of-episode-information/#telling-podcaster-where-your-episode-files-are-stored

| field | value |
| ----- | ----- |
| `podcastData.numberOfEpisodes` | The number of episodes in the podcast |
| `podcastData.totalSize` | The total size in bytes of all of the episode files |
| `podcastData.totalDuration` | The total duration in seconds of all of the episode files |
