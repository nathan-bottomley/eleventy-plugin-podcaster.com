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

And then add the plugin in your Eleventy configuration file.

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

When you add **Podcaster** in your Eleventy configuration file, you can also provide a set of options to customise **Podcaster**’s behaviour. You can read more about these options here: [Installing Podcaster](installing-podcaster.md).

## 2. Tell the plugin about your podcast and its episodes

To create your podcast feed, **Podcaster** needs to know about your podcast and about its episodes. You tell it about your podcast by including a `podcast.json` file in your data directory. You tell it about your podcast's episodes by including a template for each episode in an `episodePosts` directory inside your input directory. Optionally, you can let **Podcaster** work out the filenames, sizes and durations of your audio files by putting them all in an `episodeFiles` directory inside your input directory.

### About your podcast

To tell **Podcaster** about your podcast, create a `podcast.json` file in [your Eleventy project's data directory][data-directory]. This file will contain information about your podcast — at the very least, its title, the site URL, a description, its language, and its category.

[data-directory]: https://www.11ty.dev/docs/config/#directory-for-global-data-files

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

There's a more information about your podcast that you can include in `podcast.json`. Read more about it here: [About your podcast](podcast-information.md).

### About your podcast's episodes

To tell **Podcaster** about your podcast's episodes, you create a template for each episode and put it in an `episodePosts` directory inside your project's input directory. This template will include information about the episode in its front matter, such as its publication date, its episode number, the name of its audio file, the size of its audio file in bytes, and the duration of its audio file in seconds. The content of the template will be used as the episode's description or show notes.

Here's an example:

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

There's more information about an episode that you can include in its template's front matter. Read more about it here: [About your podcast's episodes](episode-information.md).

Instead of including publication date and episode number in the template's front matter, you can include it in its filename.

```tree
episodePosts
├── 2021-11-04-ep1-yesterdays-enterprise.md
├── 2021-11-12-ep2-the-house-of-quark.md
└── 2021-11-19-ep3-lineage.md
```

### Your episode audio files

You also need to tell **Podcaster** about each episode's audio file: it's filename, its size in bytes, and its duration in seconds.

You can do this in the front matter of the episode's template.

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

But if you are developing your site locally, you can get **Podcaster** to work out this information for you when it builds your site. To make this happen, create an `episodeFiles` directory inside your Eleventy project's input directory and put all your audio files in it.

When you build your site locally, **Podcaster** will analyse each audio file in the `episodeFiles` directory to calculate its size and duration. It will also work out which file belongs to each episode. It does this by checking every filename, assuming that the first free-standing number in the filename is the episode number (which you have already included in the template's filename or the template's front matter).

```text
USTP 12, Descent, Descent, Part II.mp3     # episodeNumber = 12
2GAB 12, Joy to the World.mp3              # episodeNumber = 12 (not 2)
mp-12-a-very-servalan-plan.mp3             # episodeNumber = 12
```

But what if you are building your site remotely, using [a Jamstack provider][] that triggers a build when you commit to your git repository? You can still get **Podcaster** to calculate this information for you. Read more about it here: [Building a **Podcaster** site remotely](building-remotely.md).

[a Jamstack provider]: https://www.11ty.dev/docs/deployment/#jamstack-providers

## 3. Create the website pages

## 4. Host the website
