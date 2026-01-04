---
title: Permalinks
eleventyNavigation:
  key: Permalinks
  order: 2
  parent: Topics
  excerpt: >-
    How **Podcaster** creates permalinks for your episode posts and how they can be overridden
---
**Podcaster** assigns permalinks to your episode posts, which means that they can have their own pages and their own unique URLs.

For episodes without season numbers, the permalink will be `/{episodeNumber}/`. For episodes with season numbers, the permalink will be `/s{seasonNumber}/e{episodeNumber}/`.

```plaintext
https://flightthroughentirety.com/297/
https://500yeardiary.com/s3/e6/
```

This is quite a common pattern for podcast episode URLs. It's concise, straightforward and easy to extrapolate from.

## Customising permalinks

However, if you prefer something else, you can customise the permalink structure by supplying `podcast.episodePermalinkPattern` in your `podcast.json` file.

Here are some example patterns for a hypothetical Season 2, Episode 1 called _Daleks Daleks_.

| permalink pattern | example |
| --- | --- |
| `/episode/{episodeNumber}/` | /episode/1/ |
| `/podcast/{episodeNumber}/` | /podcast/1/ |
| `/season/{seasonNumber}/episode/{episodeNumber}/` | /season/2/episode/1/ |
| `/{episodeNumber}-{titleSlug}/` | /1-daleks-daleks/ |

And here's the list of placeholders you can use in your permalink patterns:

| placeholder | description |
| --- | --- |
| `{episodeNumber}` | The episode number |
| `{seasonNumber}` | The season number |
| `{titleSlug}` | The title of the episode post, [slugified][] |

[slugified]: https://www.11ty.dev/docs/filters/slugify/
