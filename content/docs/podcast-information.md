---
title: Podcast information
eleventyNavigation:
  key: Podcast information
  parent: Reference
  order: 3
  excerpt: >-
    A detailed list of the information about your podcast that **Podcaster** can use to generate your podcast feed
---
Here's a list of the information about your podcast that **Podcaster** can use to generate your podcast feed. You will normally specify this in a `podcast.json` file in your Eleventy project's data directory, but it can be specified in the data cascade in other ways as well.

## Required fields

| field | value |
| ----- | ----- |
| `title` | The title of your podcast. |
| `siteUrl` | The URL of your podcast website. The most popular podcast applications use this to specify a link to your website. It's also used by **Podcaster** to convert relative links to absolute links in your feed. (If `podcast.siteUrl` isn't provided, the feed template will use `site.url` instead.) |
| `description` | A short description of your podcast. The most popular podcast applications prominently display this information. |
| `language` | A code that specifies the language of the feed (rather than the podcast). You can find [a list of permissible codes][lang] at the RSS Advisory Board's website. |
| `category` | The category for the podcast. Describes he kind of show it is. Valid categories are listed in [this Apple support document][categories]. Used by podcast directories to help listeners find the podcast. |
| `author` | The creator or creators of the podcast. The most popular podcast applications prominently display this information. |

## Optional fields

| field | value |
| ----- | ----- |
| `feedPath` | The path where the podcast feed will be located. Defaults to `/feed/podcast.xml`. |
| `copyright` | The copyright owner of the podcast. If omitted, the value supplied for `author` is used instead. |
| `startingYear` | The year your podcast started. Used to express the copyright date as a range (_"© 2014–2026 Flight Through Entirety"_). If this is omitted, the copyright date will just be the current year. |
| `imagePath` | The path to your podcast logo, which should be a JPEG or PNG file 3000 × 3000 pixels in size. (You can find more detailed specifications in [this Apple support document](https://podcasters.apple.com/support/896-artwork-requirements#shows).) Defaults to `/img/podcast-logo.jpg`. |
| `subcategory` | The subcategory for the podcast. Valid subcategories are also listed in [the Apple support document][categories]. You must choose a subcategory that belongs to your chosen category. (**Podcaster** will not enforce this.) |
| `explicit` | Warns listeners that your podcast contains explicit language. In Apple Podcasts, if you include this with the value `true`, your podcast and its episodes will be badged with an 🄴 to indicate that they use explicit language. Some of the most popular podcast applications ignore this field. |
| `type` | Two possible values: `episodic` and `serial`. Defaults to `episodic`, which means that the podcast can be listened to in no particular order. Narrative podcasts (like [_Serial_](https://serialpodcast.org/home)) should be marked as `serial`. |
| `block` | If the value here is `true` or truthy, the podcast will be blocked from appearing in the Apple Podcasts Directory. |
| `owner` | An optional object in the form `{ name, email }` You might want to omit this: Apple Podcasts has deprecated it, and an email in a podcast feed will attract some spam. However, some podcast directories, like Castbox, will use the email address to identify you when you try to claim ownership of a podcast in their directory. |
| `complete` | Indicates that a podcast is complete and that no new episodes should be expected, in which case it should have the value `true`. Should be omitted otherwise. |
| `episodeUrlBase` | If you store your podcast episodes on a CDN, or if you use a podcast analytics service, this is where you specify the base URL for them. If you don't specify this, it defaults to `https://{% raw %}{{ podcast.siteUrl }}{% endraw %}/episodes/`. |
| `episodePermalinkPattern` | This specifies the pattern for the permalink for each episode post. It can include placeholders like `{episodeNumber}` and `{seasonNumber}`. The pattern is [described in detail here][episode-permalink-pattern]. |

[categories]: https://podcasters.apple.com/support/1691-apple-podcasts-categories
[lang]: https://www.rssboard.org/rss-language-codes
[episode-permalink-pattern]: /docs/permalinks.md#customising-permalinks

## Feed episode templates

For each episode of the podcast, the feed can contain two textual descriptions — `content` and `description`. `content` is HTML and will contain the show notes of an episode. `description` is a shorter plain text description of the episode.

By default, **Podcaster** will set the `content` of the feed to the `content` of an episode's post, and will set the `description` to an abbreviated version of the content (roughly its first 500 characters). And this will be perfectly fine for most podcast feeds.

However, if you want to, you can override either of these textual descriptions by providing special templates in the includes directory and adding their names to the `podcast` object.

| field | value |
| ----- | ----- |
| `episodeContentTemplate` | The name of an include template that will be used to create the show notes of each episode, as displayed in your listeners' podcast players. The content of this template should be HTML. You only need to include this if you want the show notes in podcast players to be different from the show notes on the website. |
| `episodeDescriptionTemplate` | The name of an include template that will be used to create the description of each episode. The content of this template should be plain text. If it's omitted, the description will just be an abbreviated text version of the `content` of the episode's post, or if the podcast episode's information includes a `description` field, it will be used instead. |

These templates must be Nunjucks templates, and the post for the episode must be referred to by the variable `post`. Here's a sample content template from one of my podcast websites.

```nunjucks
{%- raw %}
<p class="diary-date">{{ post.data.diaryDate | readableDate }}</p>
<p class="topic">{{ post.data.topic }}</p>
{{ post.content | safe }}
{% endraw %}
```

## Example `podcast.json` file

Here's a sample `podcast.json` file, specifying most of the fields outlined above.

### podcast.json { .filename }

```json
{
  "feedPath": "/podcast.xml",
  "title": "Flight Through Entirety: A Doctor Who Podcast",
  "siteUrl": "https://flightthroughentirety.com",
  "description": "Flying through the entirety of Doctor Who. Originally with cake, but now with guests.",
  "language": "en-AU",
  "copyright": "Flight Through Entirety",
  "startingYear": 2014,
  "imagePath": "/assets/images/podcast-logo.jpg",
  "category": "TV & Film",
  "subcategory": "TV Reviews",
  "explicit": false,
  "author": "Flight Through Entirety",
  "type": "episodic",
  "complete": false,
  "block": false,
  "owner": {
    "name": "Nathan Bottomley",
    "email": "nathan@example.com"
  },
  "episodePermalinkPattern": "/episode/{episodeNumber}",
  "episodeUrlBase": "https://example.fte-cdn.com/",
  "episodeContentTemplate": "episode-content.njk",
  "episodeDescriptionTemplate": "episode-description.njk"
}
```
