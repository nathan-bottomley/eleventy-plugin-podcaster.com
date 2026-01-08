---
title: What’s new in version 2
---
Version 1.0.0 of **Podcaster** was released on 8 January 2025. Today, a year later, I'm happy to announce the release of Version 2.0.0.

## New documentation

Perhaps the most important change in Version 2.0.0 is a new [set of documentation](/docs/). It's simpler, I think, and more comprehensive. And there's room to add new material when it's needed.

And to support this new documentation, I've made some changes to how **Podcaster** works — changes that should make it easier to use, to understand, and to explain.

## New features

Here are **Podcaster**’s most important new features:

- The structure of a **Podcaster** project has been clarified. Your episode audio files go in the `episode-files` directory, and your episode post templates go in the `episode-posts` directory. The episode posts are available to your templates in `collections.episodePost`.
- You don't need to specify as much episode metadata in your episode posts' front matter:
  - You can specify `episode.seasonNumber`, `episode.episodeNumber` and `date` in [your episode post's filename][].
  - [**Podcaster** can work out][] `episode.size`, `episode.duration` and `episode.filename` from the files in your `episode-files` directory or from the files in an S3-compatible bucket.
- The [options](/docs/podcaster-options.md) accepted by **Podcaster** when you add it to your Eleventy configuration have been simplified.

[your episode post's filename]: /docs/sources-of-episode-information.md#naming-your-episode-posts-correctly
[**Podcaster** can work out]: /docs/sources-of-episode-information.md#telling-podcaster-where-your-episode-files-are-stored

And here are some of the other changes:

- `.m4a` episode files are explicitly supported.
- The durations of episode files are calculated more quickly, using [`music-metadata`][] instead of [`mp3-duration`][].
- The [three readable filters](/docs/readable-filters.md), `readableDate`, `readableSize` and `readableDuration`, have been given more sensible defaults and some useful options.
- `episode.duration` can be supplied in `h:mm:ss` format instead of as a number of seconds.
- [Podcast chapters](/docs/chapters/) are supported.
- Episode post [permalinks](/docs/permalinks/) can be customised.
- **Podcaster** now respects quiet mode.

[`music-metadata`]: https://www.npmjs.com/package/music-metadata
[`mp3-duration`]: https://www.npmjs.com/package/mp3-duration

As always, if you have any questions or suggestions or if you encounter any problems, please contact me on [Bluesky][] or on [Mastodon][], or on the [**Podcaster** GitHub page][github].

[Bluesky]: https://bsky.app/profile/nathanbottomley.com
[Mastodon]: https://aus.social/@nathanbottomley
[github]: https://github.com/nathan-bottomley/eleventy-plugin-podcaster

## Upgrading from Version 1 to Version 2

Version 2 breaks compatibility with Version 1. Here's how to get your Version 1 project working on Version 2.

1. **Put your episode audio files in an `episode-files` directory in your project's input directory.** Don't forget to add that directory to `.gitignore`.
2. **Put your episode post files in an `episode-posts` directory in your project's input directory.** If you have a directory data file for those posts, move that as well, and rename it to `episode-posts` plus the appropriate extension.
3. **Update the options passed to `addPlugin` in your configuration file.** Here's [a description of the new options][options].

[options]: content/docs/podcaster-options.md

You might also want to rename references to `collections.podcastEpisode` to `collections.episodePost`, although the original name is still supported.
