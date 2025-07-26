---
title: Getting started
eleventyNavigation:
  key: Documentation
  order: 1
---
## 1. Install the plugin

To install the npm package, type this at the command line:

```shell
npm install eleventy-plugin-podcaster
```

And then include the plugin in your Eleventy configuration file.

```javascript
// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster)
  .
  .
}
```

## 2. Provide information about your podcast

In the data directory, create a `podcast.json` file. This will contain information about your podcast and its site — at the very least, its title, the site URL, a description, its language, and its category. **Podcaster** will include this information in your podcast's feed.

Here's an minimal example.

```json
{
  "title": "Flight Through Entirety: A Doctor Who Podcast",
  "siteUrl": "https://flightthroughentirety.com",
  "description": "Flying through the entirety of Doctor Who. Originally with cake, but now with guests.",
  "language": "en-AU",
  "category": "TV & Film",
  "author": "Flight Through Entirety"
}
```

There's a lot of additional information you can provide to `podcast.json` for inclusion in your podcast feed. Read more about it here: [Information about your podcast](podcast-information.md).

## 3. Create a place for your episode MP3 files

In the input directory create an `episodeFiles` directory for your MP3 files.

```tree
episodeFiles
├── USTP 1, Yesterday's Enterprise.mp3
├── USTP 2, The House of Quark.mp3
└── USTP 3, Lineage.mp3
```

**Podcaster** assumes that the first free-standing number in the episode filename is the episode number. Like this:

```text
USTP 12, Descent, Descent, Part II.mp3     # episodeNumber = 12
2GAB 12, Joy to the World.mp3              # episodeNumber = 12 (not 2)
mp-12-a-very-servalan-plan.mp3             # episodeNumber = 12
```

We store the MP3 files in the `episodeFiles` directory so that **Podcaster** can find each file and work out its size and duration for inclusion in the podcast feed.

However, because these are large files, they shouldn't be stored in your git repository, and so make sure you add the `episodeFiles` directory to `.gitignore`.

For more information about how **Podcaster** uses this directory of MP3 files, read [Deriving information from your MP3 files](deriving-information-from-your-mp3-files.md).

## 4. Create a place for your episode posts

In the input directory, create an `episodePosts` directory. This directory will contain a post for each episode.

The filename of each episode post will include the episode's date and episode number in the filename, like this.

```tree
episodePosts
├── 2021-11-04-ep1-yesterdays-enterprise.md
├── 2021-11-12-ep2-the-house-of-quark.md
└── 2021-11-19-ep3-lineage.md
```

The front matter of each episode post will contain information about the episode, while the post content will serve as an episode description or show notes. Here's an example.

```yaml
---
title: The Star Beast
recordingDate: 2023-11-26
---
This week, we all get on the phone just hours after watching _The Star Beast_, to talk about how great Sylvia Noble is, basically. And somehow, we fail to mention Nerys even once.
```

With the default setup, **Podcaster** can work out the episode date and number from the filename of the episode post, and can work out the episode size and duration from the MP3 files in the `episodeFiles` folder. But there's more information that you can provide about an episode in the front matter of its episode post. Read more about it here: [Information about your episodes](episode-information.md).
