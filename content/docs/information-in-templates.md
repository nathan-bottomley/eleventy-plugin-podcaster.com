---
title: Using podcast and episode information in templates
eleventyNavigation:
  key: Information in templates
---
All of the information you provide to Podcaster is available as part of the data cascade, and so you can refer to it in your templates like this {% raw %}`{{ poscast.siteUrl }}`{% endraw %} or {% raw %}`{{ episode.episodeNumber }}`{% endraw %}.

**Podcaster** calculates a few more values that you can use.

| field | value |
| ----- | ----- |
| `podcast.copyrightNotice` or `copyrightNotice` | A copyright notice calculated from information you provided to **Podcaster**. Consists of the copyright symbol, a date or date range, and the author's name. |
| `episode.url` | The full URL of the episode's file. Calculated from `podcast.episodeUrlPrefix` and `episode.filename`. |

>[!NOTE]
> **Podcaster** can also provide [an optional `pageTitle` value][pageTitle] which combines the page title and the site title, and which can be used in the `<title>` tag of a document's `<head>`, for example.

[pageTitle]: /docs/optional-features/#pagetitle-attribute

It also provides two filters that you might find helpful.

| filter | function |
| ----- | ----- |
| `readableSize` | Converts a number of bytes into a human-readable form — in megabytes to two decimal places. Suitable for displaying `episode.size`. If a number is provided as an argument to the filter, that number will be the number of decimal places shown. |
| `readableDuration` | Converts a number of seconds into a human-readable form — `h:mm:ss`. Suitable for displaying `episode.duration`. If `true` is provided as an argument to the filter, any leading zero for hours will be omitted (`mm:ss`). |

>[!NOTE]
> **Podcaster** can also provide [an optional `readableDate` value][readableDate] which displays a date in the fullest possible localised format, and which is suitable for displaying post dates or recording dates.

[readableDate]: /docs/optional-features/#readabledate-filter
