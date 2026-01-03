---
title: Episode information
eleventyNavigation:
  key: Episode information
  parent: Reference
  order: 4
  excerpt: >-
    A detailed list of the information about your podcast episodes that **Podcaster** can use to generate your podcast feed
---
Here's a list of the information about each episode that **Podcaster** can use to generate your podcast feed. You will normally specify this in the front matter of each episode post, but it can be specified in other ways as well.

## Required

| field | value |
| ----- | ----- |
| `title` | The title of the post on the website; by default, this will also be the title of the podcast episode. |
| `date` | The date of the post on the website; this will also be the date of the episode. (This can also be supplied [in the filename of the episode post][filename].) |
| `content` | This is the content of the episode post. |
| `episode.episodeNumber` | The episode number. It needn't be unique, but the combination of `seasonNumber` and `episodeNumber` must be unique. (This can also be supplied [in the filename of the episode post][filename].) |
| `episode.filename` | The filename of the episode's audio file. **Podcaster** can work this out for you [if it knows where your episode files are stored][storing]. |
| `episode.size` | The size of the episode's audio file in bytes. **Podcaster** can work this out for you [if it knows where your episode files are stored][storing]. |
| `episode.duration` | The duration of the episode as a number of seconds. **Podcaster** can work this out for you [if it knows where your episode files are stored][storing].) |

[filename]: docs/naming-episode-posts.md
[storing]: docs/storing-episode-files.md

## Optional

| field | value |
| ----- | ----- |
| `episode.title` | The title of the episode if it's different from the title of the post, above. If omitted, `title` is used instead. |
| `episode.itunesTitle` | A specific episode title for use in Apple Podcasts only. (Apple Podcasts doesn't allow episode numbers in titles, so if you want to include episode numbers elsewhere, you need to specify a separate episode title for Apple Podcasts.) |
| `episode.description` | A short textual description of the episode. If omitted, the `content` of the post, truncated to about 800 characters, will be used instead. |
| `episode.seasonNumber` | The season number. **Podcaster** can work this out for you [if it knows where your episode files are stored][storing]. (Most podcasts don't group their episodes into seasons.) |
| `episode.image` | The path or URL for an image specific to this episode. |
| `episode.explicit` | If the value here is `true` (or truthy), listeners are warned that this episode contains explicit language. Should be used for a single episode in a podcast that isn't itself marked as explicit. |
| `episode.type` | The type of episode. Defaults to `full`, meaning a full episode of the podcast. Other valid types are `trailer` and `bonus`. |
| `episode.chapters` | Either an array of chapter objects with start times and titles, or a relative or absolute URL to a JSON file with the same structure. For more information about chapters, see the [Chapters](/docs/chapters.md) documentation. |
| `episode.transcript` | The path or URL for a file containing a transcript of this episode. It should be a file in VTT or SRT format. |
| `episode.block` | If the value here is `true` (or truthy), the episode will be blocked from appearing in the Apple Podcasts Directory. |
| `guid` | A unique ID for the post. Normally this will be the post's URL, in which case there is no need to provide it here. It's should really only be necessary to provide it if you're importing the podcast from some other system that has assigned a guid to each post. |
| `excerpt` | A shorter version of the content of the post, written in Markdown. For use in lists of episodes where the show notes are long. For other ways of providing excerpts to **Podcaster**, check out its [optional excerpts feature][excerpts]. |

[excerpts]: /docs/excerpts.md
