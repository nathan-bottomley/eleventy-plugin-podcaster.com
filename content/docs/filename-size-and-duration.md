---
title: Working out episodes' filenames, sizes and durations
eleventyNavigation:
  key: Filename, size and duration
---
## A folder full of MP3 files

**Podcaster** can work out the filename, size and duration of your podcast episode files if you give it access to a local folder full of your podcast's episode files.

You do this when you add **Podcaster** to your config file, by supplying a relative or absolute path to the `episodesDir` option. By default, **Podcaster** assumes that this directory is called `episodes` and that it is at the top level of your project directory.

```js
// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    episodesDir: '~/podcasts/episodes'
  })
  .
  .
}
```

Before Eleventy starts building your site, **Podcaster** will go through the episode's directory and gather information about the filenames, the durations and the sizes of the files.

It will save the information it gathers as a JSON file in your project's data directory: `episodesData.json`. However, you never need to refer to this file yourself — **Podcaster** [makes the information available to your templates](information-in-templates.md) as `episode.filename`, `episode.size` and `episode.duration` for each episode.

## Filenames **(new in version 1.2.0)**

So that **Podcaster** can work out which filename goes with which episode, your files need to be named with some kind of consistent naming convention, which includes the episode number and the season number, if applicable. Here are some examples.

```text
FTE 296, Plummeting Towards Sheffield (Twice upon a Time).mp3 
500YD S1E2, The Pertwee I Have in My Head (Spearhead from Space).mp3
```

You create a specification of this convention to **Podcaster** when as a regular expression and pass it as an `episodeFilenamePattern` option to the `addPlugin` call in your configuration file.

```js
  eleventyConfig.addPlugin(Podcaster, {
    episodeFilenamePattern: /FTE (?<episodeNumber>\d+), .*\.mp3/
  })
```

or

```js
  eleventyConfig.addPlugin(Podcaster, {
    episodeFilenamePattern: /500YD S(?<seasonNumber>\d+)E(?<episodeNumber>\d+), .*\.mp3/
  })
```

For this to work, you need to name the capture groups `episodeNumber` and `seasonNumber`, as in the examples above.

## What about building remotely?

When you're building your site locally, you can point **Podcaster** at a local directory full of your podcast's episode files, run your build and let **Podcaster** do its thing.

But what if you host your site on a Jamstack provider and that host is building your site for you remotely? It almost certainly won't have access to a directory like that.

And so with **Podcaster** you can run your build locally first and then commit the resulting `episodesData.json` file to your repository. If you do that, the build process on your host will use that file's information to work our the size and duration of your episodes, even though it doesn't have access to the episode files themselves.

## Skipping the process

When Eleventy is running in `--serve` mode, **Podcaster** will analyse your MP3 files only once during a session. To get it to run the analysis again, you need to restart the web server.

If you don't want to run the analysis during a build, you can just set the environment variable `SKIP_EPISODE_CALCULATIONS` to `true`.

```sh
SKIP_EPISODE_CALCULATIONS=true npx @11ty/eleventy
```
