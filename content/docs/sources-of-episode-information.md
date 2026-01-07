---
title: Where does Podcaster get episode information from?
eleventyNavigation:
  key: Where does Podcaster’s information come from?
  parent: Topics
  order: 1
  excerpt: >-
    How **Podcaster** gets episode information from front matter, the post's filename and the episode's audio file
---
In [the tutorial](docs/getting-started.md#yesterdays-enterprise-md), we used the front matter of each episode post to specify that episode's release date, episode number, filename, size and duration.

However, **Podcaster** can work out all this information for you, so long as:

- you name each episode post correctly, including its date, episode number and season number (if it has one)
- you tell **Podcaster** the location of your episode audio files, so it can calculate the size and duration of each file
- you name each episode audio file correctly, including its episode number and season number (if it has one)

## Naming your episode posts correctly

If you name your episode posts correctly, **Podcaster** can work out the episode number (and season number, if applicable) from the filename, so that you don't have to specify `date`, `episode.episodeNumber` or `episode.seasonNumber` in the front matter.

Here are some examples of correctly named episode posts:

```plaintext
2021-11-04-ep1-yesterdays-enterprise.md
2021-11-12-ep2-the-house-of-quark.md
2021-11-19-ep3-lineage.md
```

And here are some examples with season numbers:

```plaintext
2024-04-14-s1e1-the-power-of-the-daleks.md
2024-04-21-s1e2-spearhead-from-space.md
2024-04-28-s1e3-terror-of-the-autons.md
```

### The specific filename patterns

As is usual with Eleventy, you can specify the date by putting it at the start of the filename in the format `YYYY-MM-DD`. You separate the date from the rest of the filename with a hyphen.

To specify an episode number for your episode post, after the date and the hyphen put `e`, `ep` or `episode-` followed by the episode number. And after that, put whatever you want. The pattern is not case-sensitive.

To specify a season number and an episode number for your episode post, after the date and the hyphen, put `s` followed by a the season number, then `e` followed by the episode number. After that, put whatever you want. The pattern is not case-sensitive.

> [!note]
>
> Here's the regular expression used to analyse the undated filename of an episode post **without** a season number: `/^(?:e|ep|episode-)(?<episodeNumber>\d+)/i`.
>
> And here's the regular expression used to analyse the undated filename of an episode post **with** a season number: `/^s(?<seasonNumber>\d+)e(?<episodeNumber>\d+)/i`.

## Telling **Podcaster** where your episode files are stored

**Podcaster** expects your episode files to be stored in one of two places:

- in a local directory named `episode-files`, relative to your site's input directory
- in an S3-compatible storage bucket

You can give **Podcaster** access to your s3-compatible storage bucket by specifying its details in your Eleventy configuration file, like this:

### eleventy.config.js { .filename }

```javascript
import Podcaster from 'eleventy-plugin-podcaster'

export default function(eleventyConfig) {
  …
  eleventyConfig.addPlugin(Podcaster, {
    s3Storage: {
      accessKey: '<your-access-key>',
      secretKey: '<your-secret-key>',
      bucket: '<your-bucket-name>',
      region: 'us-east-1',
      endpoint: 'https://example-cdn.com'
    },
  })
  …
}
```

### What **Podcaster** does with your episode audio files

**Podcaster** will go through your local or remote episode audio files and calculate their size and duration. It will store this information in the data cascade as `episodeData`. But you don't need to worry about those details: **Podcaster** uses `episodeData` to calculate `episode.size` and `episode.duration` for you.

## How to name your episode files correctly

If you name your episode files correctly, **Podcaster** can work out the episode number (and season number, if applicable) from the filename and can use that information to match the file with its corresponding episode post, so that you don't have to provide `episode.filename` in the front matter.

Here's how to name your episode files so that **Podcaster** can match them with their episode posts:

- If there's no season number, provide the episode number as the first isolated number in the filename (where isolated means separated by hyphens, other punctuation, or spaces).
- If there is a season number, provide the season number as `s<number>` and the episode number as `e<number>`, with or without a space in between. The pattern isn't case-sensitive.

Here are some examples:

| filename | interpretation | note |
| ---- | ---- | ---- |
| FTE 296, Plummeting Towards Sheffield (Twice upon a Time).mp3 | episode 296 | |
| USTP 177, The Way of the Warrior.mp3 | episode 177 | |
| bondfinger-60-bullseye.mp3 | episode 60 | hyphens work as separators |
| 500YD S3E6, Timewyrm — Exodus.mp3 | season 3, episode 6 | the 500 is ignored because it's not isolated |

> [!note]
> Here's the regular expression used to analyse the filename of an episode file **without** a season number: `/\b(?<episodeNumber>\d+)\b/`
>
> Here's the regular expression used to analyse the filename of an episode file **with** a season number: `/\bs(?<seasonNumber>\d+)\s*e(?<episodeNumber>\d+)\b/i`
