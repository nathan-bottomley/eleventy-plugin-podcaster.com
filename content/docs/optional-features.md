---
title: Optional features
eleventyNavigation:
  key: Optional features
  order: 3
  parent: Topics
  excerpt: >-
    **Podcaster**’s optional features: drafts, excerpts and page titles
---
**Podcaster** includes three features that are useful for podcast websites but not essential. For this reason, these three features are optional. To opt-in to them, you must specify them in your Eleventy configuration file.

## eleventy.config.js { .filename }

```javascript
export default function(eleventyConfig) {
  …
  eleventyConfig.addPlugin(Podcaster, {
    handleDrafts: true,
    handleExcerpts: true,
    handlePageTitles: true
  })
  …
}
```

> [!note]
> There's a shorthand for specifying all three options at once: `optionalFeatures: true`.

## Drafts

You mark a post as a draft by including `draft: true` in its front matter.

By default, drafts are **omitted** from builds when you run Eleventy in `build` mode, which is the default. They are **included** when you run Eleventy in `serve` or `watch` mode.

You can override this behaviour by setting the environment variable `INCLUDE_DRAFTS` to `true` or `false`.

## Excerpts

An excerpt is a short summary of an episode post, usually the first paragraph. Excerpts are HTML, even if the post itself is Markdown.

Here's how **Podcaster** calculates a post's excerpt.

- if a Markdown excerpt is explicitly specified in front matter as `excerpt`, that is converted to HTML and returned
- if an excerpt is explicitly specified using the delimiters `<!---excerpt-->` and `<!---endexcerpt-->`, that is converted to HTML, if necessary, and returned
- the first paragraph not in a blockquote is returned

You can use excerpts in your templates. They are particularly useful in lists of episodes with long show notes.

## Page titles

**Podcaster** can also generate page titles. These titles are designed for use in the `<head>` of your pages, as the content of the `<title>` element and possibly the `<meta property="og:title">` element.

{% raw %}

```liquid
<title>{{ pageTitle }}</title>
```

{% endraw %}

By default, the page title is the title of the post, followed by a `&middot;`, followed by the site title. If the page title and the site title are the same, the site title is omitted.

If you want to change the delimiter from `&middot;` to something else, you can specify your custom delimiter as the value of the `handlePageTitles` option in your Eleventy configuration file, like this:

### eleventy.config.js { .filename }

```javascript
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(Podcaster, {
    handlePageTitles: '|'
  })
}
```
