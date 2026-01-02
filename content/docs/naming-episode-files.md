---
title: How to name your episode files
eleventyNavigation:
  key: How to name your episode files
  parent: How-to guides
  order: 2
  excerpt: >-
    How to name your episode file to specify a season number and episode number
---
In [the tutorial](docs/creating-a-podcast-site.md), we used the front matter of episode posts to specify the episodes' release dates and episode numbers, like this:

```markdown
---
title: Yesterday’s Enterprise
date: 2021-11-04
episode:
  episodeNumber: 1
  filename: "USTP 1, Yesterday's Enterprise.mp3"
  size: 58747007
  duration: 3601.293
---
After the _Enterprise-C_ emerges from a mysteriously swirly space anomaly, Joe and Nathan find themselves in an alternate timeline where _Star Trek: The Next Generation_ is dramatically and impractically lit, full of incident, and sceptical about the 1990s belief in the End of History. _Star Trek: Discovery_ Series 1 arrives nearly 30 years too early, in _Yesterday’s Enterprise_.
```

However, **Podcaster** also allows you to specify these details in the filename itself. If you name your episode posts like this, you don't need to specify `date` or `episode.episodeNumber` in the front matter.

```tree
# /src/episode-posts

.
├── 2021-11-04-ep1-yesterdays-enterprise.md
├── 2021-11-12-ep2-the-house-of-quark.md
├── 2021-11-19-ep3-lineage.md
├── 2021-11-26-ep4-forget-me-not.md
├── 2021-12-03-ep5-the-corbomite-maneuver.md
└── episode-posts.11tydata.js
```

This also works with season numbers.

```tree
# /src/episode-posts

.
├── 2024-04-14-s1e1-the-power-of-the-daleks.md
├── 2024-04-21-s1e2-spearhead-from-space.md
├── 2024-04-28-s1e3-terror-of-the-autons.md
├── 2024-05-05-s1e4-the-christmas-invasion.md
├── 2024-05-12-s1e5-torchwood-everything-changes.md
├── 2024-05-19-s1e6-sja-invasion-of-the-bane.md
└── episode-posts.11tydata.js
```

## The patterns themselves

As is usual with Eleventy, you can specify the date by putting it at the start of the filename `YYYY-MM-DD` Then separate the date from the rest of the filename with a hyphen.

To specify just an episode number for your episode post, after the date and the subsequent hyphen, put `e`, `ep` or `episode-` followed by the episode number. And after that put whatever you want. The pattern is not case-sensitive.[^episode-pattern]

To specify a season number and an episode number for your episode post, after the date and the subsequent hyphen, put `s` followed by a the season number, then `e` followed by the episode number. After that put whatever you want. The pattern is case-insensitive. [^season-pattern]

[^episode-pattern]: Here's the regular expression used to analyse the filename with the date and its subsequent hyphen removed: `/^(?:e|ep|episode-)(?<episodeNumber>\d+)/i`.

[^season-pattern]: Here's the regular expression used to analyse the filename with the date and its subsequent hyphen removed: `/^s(?<seasonNumber>\d+)e(?<episodeNumber>\d+)/i`.
