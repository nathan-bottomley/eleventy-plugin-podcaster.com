---
title: Where does Podcaster get episode information from?
eleventyNavigation:
  key: Where does Podcaster get episode information from?
  parent: Topics
  order: 1
  excerpt: >-
    How **Podcaster** gets episode information from front matter, the post's filename and the episodes' audio files
---
In [the tutorial](docs/creating-a-podcast-site.md), we used the front matter of episode posts to specify the episodes' release dates, episode numbers, filenames, sizes and durations. like this:

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

However, **Podcaster** can work out all this information for you, so long as:

- you name each episode post correctly, including its date, episode number and season number, if applicable
- you tell **Podcaster** the location of your episode audio files, so it can calculate the size and duration of each file
- you name each episode audio file correctly, including its episode number and season number, if applicable

## Naming your episode posts correctly

If you name your episode posts correctly, **Podcaster** can work out the episode number (and season number, if applicable) from the filename, so that you don't have to provide `date`, `episode.episodeNumber` or `episode.seasonNumber` in the front matter.

Here are some examples of correctly named episode posts:

```tree
# /src/episode-posts

.
├── 2021-11-04-ep1-yesterdays-enterprise.md
├── 2021-11-12-ep2-the-house-of-quark.md
├── 2021-11-19-ep3-lineage.md
└── episode-posts.11tydata.js
```

And here are some examples with season numbers:

```tree
# /src/episode-posts

.
├── 2024-04-14-s1e1-the-power-of-the-daleks.md
├── 2024-04-21-s1e2-spearhead-from-space.md
├── 2024-04-28-s1e3-terror-of-the-autons.md
└── episode-posts.11tydata.js
```

### The specific filename patterns

As is usual with Eleventy, you can specify the date by putting it at the start of the filename `YYYY-MM-DD`. Then separate the date from the rest of the filename with a hyphen.

To specify just an episode number for your episode post, after the date and the subsequent hyphen put `e`, `ep` or `episode-` followed by the episode number. And after that put whatever you want. The pattern is not case-sensitive.[^episode-post-episode-pattern]

To specify a season number and an episode number for your episode post, after the date and the subsequent hyphen, put `s` followed by a the season number, then `e` followed by the episode number. After that put whatever you want. The pattern is case-insensitive. [^episode-post-season-pattern]

[^episode-post-episode-pattern]: Here's the regular expression used to analyse the undated filenames of episode posts **without** a season number: `/^(?:e|ep|episode-)(?<episodeNumber>\d+)/i`.

[^episode-post-season-pattern]: Here's the regular expression used to analyse the undated filenames of episode posts **with** a season number: `/^s(?<seasonNumber>\d+)e(?<episodeNumber>\d+)/i`.

## Telling **Podcaster** where your episode files are stored

**Podcaster** expects your episode files to be stored in one of two places:

- in a local directory named `episode-files`, relative to your site's input directory
- in an S3-compatible storage bucket

You can give **Podcaster** access to your s3-compatible storage bucket by specifying its details in your Eleventy configuration file, like this:

```javascript
import Podcaster from 'eleventy-plugin-podcaster'

export default function(eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    s3Storage: {
      accessKey: '<your-access-key>',
      secretKey: '<your-secret-key>',
      bucket: '<your-bucket-name>',
      region: 'us-east-1',
      endpoint: 'https://example-cdn.com'
    },
  })
  .
  .
})
```

### What **Podcaster** does with your episode audio files

**Podcaster** will go through your local or remote episode audio files, and calculate their size and duration. It will store this information in the data cascade as `episodeData`. You don't need to worry about this though: podcaster uses `episodeData` to calculate `episode.size` and `episode.duration` for you.

## How to name your episode files correctly

If you name your episode files correctly, **Podcaster** can work out the episode number (and season number, if applicable) from the filename, and can use that information to match the file with its corresponding episode post, so that you don't have to provide `episode.filename` in front matter.

Here's how to name your files so that **Podcaster** can match them with their posts:

- if there's no season number, make the first isolated number in the filename the episode number (where isolated means separated by hyphens, other punctuation, or spaces)[^episode-pattern]
- if there's a season number, supply the season number as `S<number>` and the episode number as `E<number>`, with or without a space in between. The pattern isn't case-sensitive[^season-pattern]

Here are some examples:

| filename | interpretation | note |
| ---- | ---- | ---- |
| FTE 296, Plummeting Towards Sheffield (Twice upon a Time).mp3 | episode 296 | |
| USTP 177, The Way of the Warrior.mp3 | episode 177 | |
| bondfinger-60-bullseye.mp3 | episode 60 | hyphens work as separators |
| 500YD S3E6, Timewyrm — Exodus.mp3 | season 3, episode 6 | the 500 is ignored because it's not isolated |

[^episode-pattern]: Here's the regular expression used to analyse the filenames of episode files **without** a season number: `/\b(?<episodeNumber>\d+)\b/`
[^season-pattern]: Here's the regular expression used to analyse the filenames of episode files **with** a season number: `/\bs(?<seasonNumber>\d+)\s*e(?<episodeNumber>\d+)\b/i`
