---
title: Three titles
eleventyNavigation:
  key: Three titles
  parent: Topics
  order: 4
  excerpt: >-
    Why there are three different ways of giving titles to your episodes?
---
**Podcaster** has three different ways of giving titles to a podcast episode: `title`, `episode.title`, and `episode.itunesTitle`.

```yaml
---
title: Entering a new phase
episode:
  title: S1E1, Entering a new phase (The Power of the Daleks)
  itunesTitle: Entering a new phase (The Power of the Daleks)
---
```

Here's how the docs describe them:

| field | value |
| ----- | ----- |
| `title` | The title of the post on the website; by default, this will also be the title of the podcast episode. |
| `episode.title` | The title of the episode if it's different from the title of the post, above. If omitted, `title` is used instead. |
| `episode.itunesTitle` | A specific episode title for use in Apple Podcasts only. (Apple Podcasts doesn't allow episode numbers in titles, so if you want to include episode numbers elsewhere, you need to specify a separate episode title for Apple Podcasts.) |

Most of the time, `title` will be enough on its own. But here's why you might specify the other two.

## `episode.title`

`title` specifies the title of the post on the website. But if you want podcast players to display a different title, you specify that title as `episode.title`.

Episodes of our podcast [_Flight Through Entirety_][] have both a title and a topic. The title is a fun quote from the conversation, while the topic is the name of the _Doctor Who_ story we're discussing. We use the title as the post title on the website, but we provide both the title and the topic to podcast players. Like this:

[_Flight Through Entirety_]: https://flightthroughentirety.com

```yaml
---
title: Plummeting Towards Sheffield
topic: Twice upon a Time
episode: 
  title: Plummeting Towards Sheffield (Twice upon a Time)
---
```

And so the post on the site will have the title _Plummeting Towards Sheffield_, but in podcast players, the episode title will be _Plummeting Towards Sheffield (Twice upon a Time)_.

> [!TIP]
> You could use [a directory data file][] and [the `eleventyComputed` property][] to automatically calculate `episode.title` from `title` and `topic`.

### episode-posts.json { .filename }

```json
{
  "eleventyComputed": {
    {% raw %}"episode.title": "{{ title }} ({{ topic }})"{% endraw %}
  }
}
```

[a directory data file]: https://www.11ty.dev/docs/data-template-dir/
[the `eleventyComputed` property]: https://www.11ty.dev/docs/data-computed/

## `episode.itunesTitle`

Some podcasts include the episode number in their episode titles, but Apple Podcasts doesn't want you to do that. And so you can specify a separate Apple Podcasts-only title as `episode.itunesTitle`.

```yaml
---
title: Plummeting Towards Sheffield
episode:
  episodeNumber: 296
  title: "296: Plummeting Towards Sheffield"
  itunesTitle: Plummeting Towards Sheffield
---
```

(The [_Accidental Tech Podcast_][atp] feed and the feeds on [Relay][] specify separate Apple Podcasts titles for their episodes for precisely this reason.)

[atp]: https://atp.fm
[Relay]: https://relay.fm

> [!TIP]
> Again, this is also the sort of thing you could use a directory data file and `eleventyComputed` to calculate.

```json
{
  "eleventyComputed": {
    {% raw %}"episode.title": "{{ episode.episodeNumber }}: {{ title }}",
    "episode.itunesTitle": "{{ title }}"{% endraw %}
  }
}
```
