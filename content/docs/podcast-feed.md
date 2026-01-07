---
title: The podcast feed
eleventyNavigation:
  key: The podcast feed
  parent: Topics
  order: 2
  excerpt: >-
    What is a podcast feed and how does **Podcaster** create it?
---
One of **Podcaster**’s main jobs is to create your podcast feed. A podcast feed is a single [XML file][] — more specifically an [RSS feed][] — that contains all the information about your podcast — specifically, the information you provide in `podcast.json` and in the front matter of your episode posts.

[XML file]: https://developer.mozilla.org/en-US/docs/Web/XML/Guides/XML_introduction
[RSS feed]: https://cyber.harvard.edu/rss/rss.html

{% raw %}
By default, the feed is located at `https://{{ site.url }}/feed/podcast.xml`.
{% endraw %}

You can customise the feed's location by setting `feedPath` in `podcast.json`. However, you should retain the `.xml` extension, so that the feed can be recognised as an XML document by podcast directories and podcast players.

When you submit your podcast to Apple Podcasts, Spotify, or some other podcast directory, you'll need to provide them with the URL of your podcast feed.

It is also good practice to include the URL of your feed in your website's `<head>` element, using the `<link>` tag with the `rel="alternate"` attribute and the `type="application/xml+rss"` attribute. Like this:

{% raw %}

```nunjucks
<link rel="alternate" type="application/rss+xml" title="Untitled Star Trek Project" href="{{ site.url }}/feed/podcast.xml" />
```

{% endraw %}
