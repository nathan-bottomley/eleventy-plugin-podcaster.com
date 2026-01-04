---
title: The podcast feed
eleventyNavigation:
  key: The podcast feed
  parent: Topics
  order: 2
  excerpt: >-
    What is a podcast feed and how does **Podcaster** create it?
---
The podcast feed is a single [XML file][] — more specifically an [RSS feed][] — that contains all of the information about your podcast and its episodes. **Podcaster** uses all the information you supply in `podcast.json` and in the front matter of your episode posts to generate the feed.

[XML file]: https://developer.mozilla.org/en-US/docs/Web/XML/Guides/XML_introduction
[RSS feed]: https://cyber.harvard.edu/rss/rss.html

{% raw %}
By default, the feed is located at `https://{{ site.url }}/feed/podcast.xml`.
{% endraw %}

You can customise the feed's location by setting `feedPath` in `podcast.json`. However, you should retain the `.xml` extension so that the feed can be recognised as an XML document by podcast players.

When you submit your podcast to Apple Podcasts, Spotify, Google Podcasts, or any other podcast directory, you'll need to provide them with the URL of your podcast feed.

It is also good practice to include the URL of your feed in your website's `<head>` element, using the `<link>` tag with the `rel="alternate"` attribute and the `type="application/xml+rss"` attribute. Like this:

{% raw %}

```nunjucks
<link rel="alternate" type="application/rss+xml" title="Untitled Star Trek Project" href="{{ site.url }}/feed/podcast.xml" />
```

{% endraw %}
