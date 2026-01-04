---
title: Chapters
eleventyNavigation:
  key: Chapters
  parent: Topics
  order: 5
  excerpt: >-
    What are chapters and how can you create them with Podcaster?
---
> [!note]
> Chapters do not seem to be well supported right now. This feature is offered in a spirit of hope rather than certainty.

Podcast chapters divide a podcast into sections, each with a start time and a title, as well as an optional image and an optional link. Most podcast players support them — showing them in a table of contents and displaying the chapter image on screen during playback.

Until now, the most common way to create podcast chapters was to add them to the MP3 file itself. More recently, it's been possible to create chapters using a JSON file. This file contains an array of chapter objects, each with a start time and a title, as well as an optional image and link.

**Podcaster** supports chapters using the `episode.chapters` in an episode post's front matter. `episode.chapters` can be one of three things:

- a relative path to a JSON file containing the chapters
- a URL to a JSON file containing the chapters
- an array of objects, with a `startTime` property in seconds, a `title` property, an optional `image` property, and an optional `url` property.

If you provide a path or a URL, you will need to create the JSON chapters file yourself and ensure that it's in the right place. The format of the file is [documented here][chapter-format], but here's an example:

[chapter-format]: https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/examples/chapters/jsonChapters.md

```json
{
  "version": "1.2.0",
  "chapters": [
    {
      "startTime": 0,
      "title": "Introduction",
    },
    {
      "startTime": 600,
      "title": "Main Content",
      "image": "/images/chapter2.jpg",
    },
    {
      "startTime": 1200,
      "title": "Conclusion",
      "image": "/images/chapter3.jpg",
      "url": "https://example.com/chapter3"
    }
  ]
}
```

But if you don't want to generate chapters files yourself, you can get **Podcaster** to generate them from an episode's front matter, like this:

```yaml
episode:
  chapters:
    - startTime: 0
      title: Introduction
    - startTime: 600
      title: Main Content
      image: https://example.com/images/chapter2.jpg
    - startTime: 1200
      title: Conclusion
      image: /images/chapter3.jpg
      url: https://example.com/chapter3
```

`startTime` may be expressed as a timestamp — `5:00` for 300 seconds, for example. `image` and `url` must both be absolute URLs.

**Podcaster** will generate a `chapters.json` file based on this data, will save it as `chapters.json` in the episode's directory, and will include a reference to it in the pocast feed.
