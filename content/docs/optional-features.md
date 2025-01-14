---
title: Optional features
---
**Podcaster** includes some optional features which you might find useful for your podcasting website. These features are turned off by default, in case you want to implement them some other way. You can enable some or all of them when you include the plugin in your eleventy configuration file, like this:

```js
// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    handleDrafts: true,
    handleExcerpts: true,
    readableDateLocale: 'en-GB',
    calculatePageTitle: true
  })
  .
  .
}
```

## Drafts

If `handleDrafts` is set to `true`, the plugin will allow you to designate posts as drafts by including `draft: true` in their front matter (or elsewhere in the data cascade). By default, drafts will be included in the build when Eleventy is running in `serve` or `watch` mode, but will be excluded in `build` mode. You can override this default behaviour by setting the `INCLUDE_DRAFTS` environment variable to `true` or `false`.

## Excerpts

If `handleExcerpts` is set to `true`, the plugin will create excerpts for your podcast episode posts. Excerpts are shortened versions of your final content, which you can use on index pages or topic pages or guest pages instead of your complete post.

Excerpts are available in a template as {% raw %}`{{ excerpt }}`{% endraw %}, but you will probably access them from a collection item, where they are available as {% raw %}`{{ item.data.excerpt }}`{% endraw %}. Excerpts are HTML fragments.

**Podcaster** defines the excerpt in one of three ways, in order of priority.

1. As an `excerpt` field in the post's front matter. This should be written in Markdown.
2. The part of the post between the excerpt delimiters `<!---excerpt-->` and `<!---endexcerpt-->` .
3. The first paragraph in the post which is not nested inside another tag. (This is so that a blockquote at the beginning of a post isn't included in the excerpt.)

## `readableDate` filter

**Podcaster** optionally provides a `readableDate` filter, to match `readableDuration` and `readableSize`. It transforms a date into a localised string, which usually includes weekday, day of month, month and year.

To make **Podcaster** provide this filter, pass a locale string as one of the options when you're adding the plugin to your config file. In English, the two most common locale strings are `'en-GB'` and `'en-US'`.

## `pageTitle` attribute

**Podcaster** also supplies a `pageTitle` attribute, which will consist of the title of the page, a separator, and the title of the site. It can be used in the `<title>` tag in the `<head>` of a page, and it might also be useful in a page's Open Graph data. Like this:

```html
<head>
  .
  .
  <title>{% raw %}{{ pageTitle }}{% endraw %}</title>
  .
  <meta property="og:title" content="{% raw %}{{ pageTitle }}{% endraw %}">
  .
  .
</head>
```

For the site title, **Podcaster** uses `site.title` from the data cascade; if that's missing, it uses `podcast.title`. The default separator is `&middot;`; you can specify your own separator when you add **Podcaster** to your config file like this.

```js

// eleventy.config.js

import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  .
  .
  eleventyConfig.addPlugin(Podcaster, {
    calculatePageTitle: '|'  // specifies the pipe character as a separator
  })
  .
  .
}
```

> [!Note]
> These features aren't specific to podcast websites, and it's completely safe to ignore them. However, I use some of them in all of my podcasting websites, so I've decided to include them.
