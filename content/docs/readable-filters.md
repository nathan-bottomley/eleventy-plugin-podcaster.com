---
title: Readable filters
eleventyNavigation:
  key: Readable filters
  parent: Reference
  excerpt: >-
    A description of the filters **Podcaster** provides for formatting dates, durations and file sizes
---

**Podcaster** provides three filters that you can use to format dates, durations and file sizes. These filters help you present information about your podcast episodes in a readable format.

## `readableDate`

The `readableDate` filter formats a date object as a localised full date, including the weekday.

The default format is **Wednesday 8 August 2025**. However, you can specify a locale for the filter when you add the plugin to your Eleventy config file.

```js
// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    readableDateLocale: 'en-GB'
  })
  .
  .
}
```

In English, the two most common locale strings are `'en-GB'` and `'en-US'`.

## `readableDuration`

The `readableDuration` filter formats a number of seconds in one of two formats — a default format, and a long format.

The default format is useful for specifying the durations of podcast episodes, and is used for that purpose in the podcast feed. It's `mm:ss` for durations of less than an hour, and `h:mm:ss` for longer durations.

{% raw %}

| number of seconds | output |
| --- | --- |
| `{{ 30 \| readableDuration }}` | 0:30 |
| `{{ 1800 \| readableDuration }}` | 30:00 |
| `{{ 3540 \| readableDuration }}` | 59:00 |
| `{{ 3660 \| readableDuration }}` | 1:01:00 |

{% endraw %}

The long format includes days and uses the full English names for units of time. It's useful for specifying the total duration of all of a podcast's episodes.

{% raw %}

| number of seconds | output |
| --- | --- |
| `{{ 86399 \| readableDuration: "long" }}` | 0 days, 23 hours, 59 minutes, 59 seconds |
| `{{ 86400 \| readableDuration: "long" }}` | 1 day, 0 hours, 0 minutes, 0 seconds |
| `{{ 90000 \| readableDuration: "long" }}` | 1 day, 1 hour, 0 minutes, 0 seconds |
| `{{ 100000.555 \| readableDuration: "long" }}` | 1 day, 3 hours, 46 minutes, 40.555 seconds |

{% endraw %}

To specify the long format, pass `"long"` to the filter. In Liquid, that will look like this: {% raw %}`{{ 3660 | readableDuration: "long" }}`{% endraw %}. In Nunjucks, it will look like this: {% raw %}`{{ 3660 | readableDuration("long") }}`{% endraw %}.

## `readableSize`

The `readableSize` filter formats a number of bytes as a human-readable size in kilobytes, megabytes or gigabytes. By default, this format includes a single number to one decimal place, followed by a standard SI unit abbreviation.

{% raw %}

| number of bytes | output |
| --- | --- |
| `{{ 1024 \| readableSize }}` | 1.0 kB |
| `{{ 28683178 \| readableSize` | 28.7 MB |
| `{{ 32004399 \| readableSize }}` | 32.0 MB |
| `{{ 1100000000 \| readableSize }}` | 1.1 GB |

{% endraw %}

If you want to specify a different precision for the number, provide the filter with the number of decimal places you want. In Liquid, that will look like this: {% raw %}`{{ 1024 | readableSize: 2 }}`{% endraw %}. In Nunjucks, it will look like this: {% raw %}`{{ 1024 | readableSize(2) }}`{% endraw %}.

{% raw %}

| number of bytes | output |
| --- | --- |
| `{{ 1024 \| readableSize: 2 }}` | 1.02 kB |
| `{{ 28683178 \| readableSize: 2 }}` | 28.68 MB |
| `{{ 32004399 \| readableSize: 2 }}` | 32.00 MB |
| `{{ 1100000000 \| readableSize: 2 }}` | 1.10 GB |

{% endraw %}
