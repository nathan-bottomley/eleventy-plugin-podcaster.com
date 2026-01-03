---
title: Where to store your episode files
---
In [the tutorial](docs/creating-a-podcast-site.md), we used the front matter of episode posts to specify the episodes' filenames, sizes in bytes, and durations in seconds:

```markdown
---
title: Yesterday’s Enterprise
date: 2021-11-04
episode:
  episodeNumber: 1
  filename: "USTP 1, Yesterday's Enterprise.mp3"
  size: 58747007 # in bytes
  duration: 3601.293 # in seconds
---
After the _Enterprise-C_ emerges from a mysteriously swirly space anomaly, Joe and Nathan find themselves in an alternate timeline where _Star Trek: The Next Generation_ is dramatically and impractically lit, full of incident, and sceptical about the 1990s belief in the End of History. _Star Trek: Discovery_ Series 1 arrives nearly 30 years too early, in _Yesterday’s Enterprise_.
```

However, if you tell **Podcaster** where your episode files are stored, and if you name your episode files correctly, it can work out `episode.filename`, `episode.size`, and `episode.duration` for you. (It does this at build time, by going through every file and recording its size and duration.)

## How to tell **Podcaster** where your episode files are stored

**Podcaster** expects your episode files to be stored in a directory named `episode-files`, relative to your site's input directory.

If you want to store them in different directory, when you add the **Podcaster** plugin to your Eleventy configuration file, you can specify that directory as an absolute path or a path relative to your site's input directory. Like this:

```javascript

import Podcaster from 'eleventy-plugin-podcaster'

export default function(eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    episodeFilesDirectory: '../episodes'
  })
  .
  .
})
```

Alternatively, you can give **Podcaster** access to an S3-compatible storage bucket, by specifying details of the bucket in your Eleventy configuration file, like this:

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

## How to name your episode files correctly

If you name your episode files correctly, **Podcaster** can work out the episode number (and season number, if applicable), and can use that information to match the file with its corresponding post.

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

[^episode-pattern]: The regular expression used is `/\b(?<episodeNumber>\d+)\b/`
[^season-pattern]: The regular expression used is `/\bs(?<seasonNumber>\d+)\s*e(?<episodeNumber>\d+)\b/i`
