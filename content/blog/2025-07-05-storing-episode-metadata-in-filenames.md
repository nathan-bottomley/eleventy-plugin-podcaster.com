---
title: Storing episode metadata in filenames
---
<!---excerpt-->
Each podcast episode in **Podcaster** is represented by a template with the tag `podcastEpisode`. On my podcast websites, I put all the podcast episode templates in a `/src/posts` folder, and I give each template the `podcastEpisode` tag by using a directory data file.

So my `/src/posts` folder looks like this:

```tree
# /src/posts

.
├── 2021-11-04-ep1-yesterdays-enterprise.md
├── 2021-11-12-ep2-the-house-of-quark.md
├── 2021-11-19-ep3-lineage.md
├── 2021-11-26-ep4-forget-me-not.md
├── 2021-12-03-ep5-the-corbomite-maneuver.md
└── posts.11tydata.js
```
<!---endexcerpt-->

And the directory data file looks like this:

```javascript
// posts.11tydata.js

export default {
  'tags': ['podcastEpisode']
}
```

The value exported from the directory data file gets added to the data cascade for all the templates in that directory.

But are there any other properties that we can calculate in the directory data file?

Eleventy will already calculate a post's date from the dates at the start of the filename. I include that date so that posts are listed in chronological order, but it also means that I don't have to specify the post date in the template's front matter.

I include the episode number in the filename as well. Can I use the directory data file to calculate the episode number from the filename too?

Turns out, I can. Here's an updated directory data file.

```javascript
// posts.11tydata.js

export default {
  tags: ['podcastEpisode'],
  eleventyComputed: {
    'episode.episodeNumber' (data) {
      if (data.episode?.episodeNumber) {
        return data.episode?.episodeNumber
      }
      const matchResult = data.page.fileSlug.match(/^ep(\d+)/)
      if (matchResult) {
        return parseInt(matchResult[1])
      }
    }
  }
}
```

[`eleventyComputed`][eleventyComputed] lets you calculate data values based on values that have been already calculated. Here we're getting the page's `fileSlug`, which is just the filename with the date at the beginning removed. We search for the letters `ep` at the start of the `fileSlug`, we get the number that appears after that, and then we return it as `episode.episodeNumber`, which is where **Podcaster** wants to find it.

[eleventyComputed]: https://www.11ty.dev/docs/data-computed/

What about podcasts with seasons? Here's a file listing from the _500 Year Diary_ podcast website.

```tree
# /src/posts

.
├── 2024-04-14-s1e1-the-power-of-the-daleks.md
├── 2024-04-21-s1e2-spearhead-from-space.md
├── 2024-04-28-s1e3-terror-of-the-autons.md
├── 2024-05-05-s1e4-the-christmas-invasion.md
├── 2024-05-12-s1e5-torchwood-everything-changes.md
└── 2024-05-19-s1e6-sja-invasion-of-the-bane.md
```

And here's the directory data file that calculates both `episode.episodeNumber` and `episode.seasonNumber` from the post's filename.

```javascript
export default {
  tags: ['podcastEpisode'],
  eleventyComputed: {
    'episode.episodeNumber' (data) {
      if (data.episode?.episodeNumber) {
        return data.episode?.episodeNumber
      }
      const matchResult = data.page.fileSlug.match(/^s(?:\d+)e(\d+)/)
      if (matchResult) {
        return parseInt(matchResult[1])
      }
    },
    'episode.seasonNumber' (data) {
      if (data.episode?.seasonNumber) {
        return data.episode?.seasonNumber
      }
      const matchResult = data.page.fileSlug.match(/^s(\d+)/)
      if (matchResult) {
        return parseInt(matchResult[1])
      }
    }
  }
}
```

The [episode data documentation][] makes it seem like you need to provide a lot of information in the front matter of your podcast episode templates. But using the technique I just described, as well as [**Podcaster's** automatic calculation of episode size and duration][size-and-duration] and the defaults **Podcaster** provides, you can get the front matter data down to nearly nothing. Here's an example from _500 Year Diary_, with no **Podcaster**-specific front matter at all.

[episode data documentation]: docs/episode-information.md
[size-and-duration]: docs/filename-size-and-duration.md

```yaml
---
title: Where Kelsey Went
recordingDate: 2024-04-19
topic: "The Sarah Jane Adventures: Invasion of the Bane"
diaryDate: 2007-01-01
---
```
