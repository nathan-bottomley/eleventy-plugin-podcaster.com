---
title: Maintaining the correct heading structure when using an episode partial
description: >-
  How to ensure that your headings are correctly structured when a page with its own heading structure includes a partial that also contains headings
---
<!---excerpt-->
[MDN's page on HTML headings][headings] describes the best practices for using heading elements to structure a web page. In summary:

- There should be only one `<h1>` element per page.
- Do not skip heading levels: always start from `<h1>`, followed by `<h2>` and so on.

[headings]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
<!---endexcerpt-->

On a podcast website, you might have a partial that displays information about a podcast episode. That partial uses an `<h1>` element for the episode title, and uses `<h2>` elements for subheadings in the show notes.

If you include that partial on the episode page, it will follow those best practices perfectly: a single `<h1>` element for the title, and `<h2>` elements for subheadings.

But if you use that partial to list multiple episodes on a tag page, for example, you will want the tag to be the `<h1>` element, the episode titles to be `<h2>` elements, and the show notes subheadings to be `<h3>` elements.

Is it just easier to create two different partials: a single-episode partial and an episode-list partial? Possibly. But there is another way to approach this problem.

---

Here's a podcast episode partial I introduced in an [earlier blog post][].

[earlier blog post]: content/blog/2025-02-16-displaying-information-about-an-episode.md

## episode.njk { .filename }

{% raw %}

```nunjucks
{% if not post %}{% set post = collections.podcastEpisode | getCollectionItem %}{% endif %}
<article>
  {%- if linkInTitle -%}
  <h1><a href="{{ post.url }}">{{ post.data.title | safe }}</a></h1>
  {%- else -%}
  <h1>{{ post.data.title | safe }}</h1>
  {%- endif -%}
  <p class="post-metadata">Episode {{ post.data.episode.episodeNumber }} &middot; {{ post.data.topic | safe }} &middot; {{ post.date | readableDate }}</p>
  {% if excerptOnly %}
    {{ post.data.excerpt | safe }}
  {% else %}
    {{ post.content | safe }}
  {% endif %}
  <figure class="audio">
    <audio controls preload="metadata" src="{{ post.data.episode.url }}"></audio>
    <figcaption>
      Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }}
      &middot; Recorded on {{ post.data.episode.recordingDate | readableDate }}
      &middot; <a target="_blank" href="{{ post.data.episode.url }}">Download</a> ({{ post.data.episode.size | readableSize(1) }})
    </figcaption>
  </figure>
</article>
```

{% endraw %}

This partial consists of an `<article>` element with an `<h1>` element for the episode title.

And here's an episode post template, whose content is displayed as {% raw %}`{{ post.content }}`{% endraw %} inside the partial. You'll see the second-level heading `## Notes and links`.

## 2026-04-12-s4e5-torchwood-children-of-earth-day-five.md { .filename }

```diff-markdown
---
title: What the World Is Like
recordingDate: 2026-03-28
topic: "Torchwood: Children of Earth: Day Five"
diaryDate: 2009-07-10
---
It's the end of the week, and although some kids and a whole building full of public servants are dead, we all learn that even the ones who walk away from Omelas discover that the real Omelas was inside them all along.

## Notes and links

We didn't have a whole season of _Doctor Who_ in 2009, because David Tennant took a year off to play [_Hamlet_ at the Royal Shakespeare Company][rsc] in 2008/2009. In fact, it was during the interval of one of the performances in October 2008 that David Tennant appeared remotely at the National Television Awards to [announce his departure][] from the show.

[rsc]: https://www.rsc.org.uk/hamlet/past-productions/in-focus-gregory-doran-2008
[announce his departure]: https://www.theguardian.com/media/2008/oct/29/doctorwho-bbc
```

So, if we're including this partial on a tag page, how do we demote the `<h1>` element to `<h2>` and the `<h2>` element to `<h3>`?

## `headingoffset`

One day, this problem will be kind of solved for us by HTML itself. There's [a current WHATWG spec for an attribute called `headingoffset`][headingoffset]. When `headingoffset` is added to an element, the browser will change the _computed heading level_ of every heading element inside that element by adding the attribute's value to the heading element's heading level. So in an `article` element with an attribute `headingoffset="1"`, all the `<h1>` and `<h2>` elements would have computed heading levels of 2 and 3 respectively.

[headingoffset]: https://html.spec.whatwg.org/multipage/sections.html#heading-levels-&-offsets

Unfortunately, we can't use `headingoffset` right now. But in the meantime, let's add the `headingoffset` attribute to an element as a signal to tell Eleventy to rewrite every heading inside that element and then delete the attribute.

## `eleventyConfig.addTransform`

In your Eleventy config file, you can use [`eleventyConfig.addTransform`][transform] to transform the output of a template after Eleventy has
converted it. So we can let Eleventy convert our Markdown episode posts to HTML, and then we can use a custom transform to implement the `headingoffset` attribute and change the heading levels as required.

[transform]: https://www.11ty.dev/docs/transforms/

So, let's imagine that this file is the template for a tag page. We're going to repeatedly include the episode partial and pass it a `headingoffset` value of 1 each time. That way the `<h1>` inside the partial will become an `<h2>`, and any `<h2>` will become an `<h3>`, and so on.

### tag.njk { .filename }

{% raw %}

```nunjucks
<h1 class="sr-only">{{ tag }}</h1>
{% for post in collections[tag] %}
{% include 'episode.njk', linkInTitle: true, headingoffset: 1 %}
{% endfor %}
```

{% endraw %}

And now let's add the `headingoffset` attribute to the `episode.njk` partial.

### episode.njk { .filename }

{% raw %}

```diff-nunjucks
{% if not post %}{% set post = collections.podcastEpisode | getCollectionItem %}{% endif %}
- <article>
+ <article{% if headingoffset %} headingoffset="{{ headingoffset }}"{% endif %}>
  {%- if linkInTitle -%}
  <h1><a href="{{ post.url }}">{{ post.data.title | safe }}</a></h1>
  {%- else -%}
  <h1>{{ post.data.title | safe }}</h1>
  {%- endif -%}
  <p class="post-metadata">Episode {{ post.data.episode.episodeNumber }} &middot; {{ post.data.topic | safe }} &middot; {{ post.date | readableDate }}</p>
  {% if excerptOnly %}
    {{ post.data.excerpt | safe }}
  {% else %}
    {{ post.content | safe }}
  {% endif %}
  <figure class="audio">
    <audio controls preload="metadata" src="{{ post.data.episode.url }}"></audio>
    <figcaption>
      Episode {{ post.data.episode.episodeNumber }}: {{ post.data.title }}
      &middot; Recorded on {{ post.data.episode.recordingDate | readableDate }}
      &middot; <a target="_blank" href="{{ post.data.episode.url }}">Download</a> ({{ post.data.episode.size | readableSize(1) }})
    </figcaption>
  </figure>
</article>
```

{% endraw %}

And now let's implement the `headingoffset` attribute in our Eleventy config file. To create our transformation, we're going to use the `posthtml` package.

### eleventy.config.js { .filename }

```js
import posthtml from 'posthtml'

function clampHeadingLevel (level) {
  if (level < 1) return 1
  if (level > 6) return 6
  return level
}

function shiftHeadings (node, offset) {
  if (!node.content) return

  for (const child of node.content) {
    if (typeof child === 'string') continue

    const match = /^h([1-6])$/.exec(child.tag)
    if (match) {
      child.tag = `h${clampHeadingLevel(Number(match[1]) + offset)}`
    } else {
      shiftHeadings(child, offset)
    }
  }
}

export default function (eleventyConfig) {
  .
  .
  .
  eleventyConfig.addTransform('headingoffset', async function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) return content
    if (!content.includes('headingoffset')) return content

    const { html } = await posthtml([
      tree => tree.match({ attrs: { headingoffset: true } }, node => {
        const offset = parseInt(node.attrs.headingoffset, 10)
        delete node.attrs.headingoffset
        if (offset) shiftHeadings(node, offset)
        return node
      })
    ]).process(content)

    return html
  })
  .
  .
  .
}
```

---

Just a couple of points about `posthtml` to finish up.

Firstly, `posthtml` is used internally by Eleventy to perform some of its own HTML transforms. But if you're going to use it explicitly, as we have done here, you really should add it to `package.json`.

```sh
npm install posthtml --save-dev
```

And secondly, in `eleventy.config.js`, the call to the `posthtml` function isn't particularly clear. So let me explain. `posthtml` is a function that takes an array of transformations. Each of these transformations is a function that takes a parsed HTML tree and returns a modified version of that tree. `posthtml` returns a `PostHTML` instance whose asynchronous `process` method applies the transformations to some HTML content, returning a result object whose `html` property contains the transformed HTML output.
