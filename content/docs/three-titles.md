---
title: Three titles
eleventyNavigation:
  key: Three titles
  parent: Topics
  order: 4
  excerpt: >-
    Why there are three different ways of giving titles to your episodes?
---
**Podcaster** has three different ways of giving titles to a podcast episode.

```yaml
---
title: Entering a new phase
episode:
  title: S1E1, Entering a new phase (The Power of the Daleks)
  itunesTitle: Entering a new phase (The Power of the Daleks)
---
```
<!---excerpt-->
If you've read [the documentation page about how to provide episode information to **Podcaster**][episode-information], you might have noticed that **Podcaster** offers three different titles that you could provide for a given podcast episode.

[episode-information]: docs/episode-information.md
<!---endexcerpt-->

Here's how the docs describe them:

| field | value |
| ----- | ----- |
| `title` | The title of the post on the website; by default, this will also be the title of the podcast episode. |
| `episode.title` | The title of the episode if it's different from the title of the post, above. If omitted, `title` is used instead. |
| `episode.itunesTitle` | A specific episode title for use in Apple Podcasts only. (Apple Podcasts doesn't allow episode numbers in titles, so if you want to include episode numbers elsewhere, you need to specify a separate episode title for Apple Podcasts.) |

Most of the time, the first title will be enough on its own. But here's an explanation of why you might provide the other two.

## `episode.title`

Some podcasts give each episode a title that is a funny or striking quote from the episode. Others use a title that specifies the episode's main topic. But what if you want to do both?

Our podcast [_Flight Through Entirety_][] uses quotes as titles, because that's fun, but it's helpful for listeners to know what _Doctor Who_ story is the topic of a given episode. And so we use `title` for the quote, while `episode.title` consists of the quote followed by the topic. Like this:

[_Flight Through Entirety_]: https://flightthroughentirety.com

```yaml
---
title: Plummeting Towards Sheffield
topic: Twice upon a Time
episode: 
  title: Plummeting Towards Sheffield (Twice upon a Time)
---
```

And so the post on the site will have the title _Plummeting Towards Sheffield_, but in the feed and in your podcast player of choice, the episode title will be _Plummeting Towards Sheffield (Twice upon a Time)_.

> [!TIP]
> You could use [a directory data file][] and [the `eleventyComputed` property][] to automatically calculate `episode.title` from `title` and `topic`.

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

Some podcasts include the episode number in their episode titles, but Apple Podcasts doesn't want you to do that. And so you can provide a separate Apple Podcasts--only title as `episode.itunesTitle`.

```yaml
---
title: Plummeting Towards Sheffield
episode:
  episodeNumber: 296
  title: "296: Plummeting Towards Sheffield"
  itunesTitle: Plummeting Towards Sheffield
---
```

(The [_Accidental Tech Podcast_][atp] feed and the feeds on [Relay][] provide separate Apple Podcasts titles to their episodes for precisely this reason.)

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
