---
title: Describing a podcast episode
date: 2025-01-26
---
<!---excerpt-->
Podcasts are an audio medium, of course, but your listeners' podcast players  describe each of your episodes using text — a title, a short description and a long description.

And so **Podcaster** lets you provide all three of those.

I've [posted about titles already][titles] — so let's talk about the short and long descriptions.

[titles]: 2025-01-15-three-titles.md
<!---endexcerpt-->
## Short description

**Podcaster** lets you provide the short description for your episode in the front matter of that episode's post as `episode.description`. This is plain text, and podcast players usually show it — or the start of it — in list views.

If you don't provide `episode.description`, **Podcaster** will use the first 800 or so characters — about 150 words — of the long description instead.

## Long description

**Podcaster** takes your episode's long description from the content of the episode's post. This is HTML, which means it can include styled text, headings and — most importantly — links, which are just the sort of things you need for an episode's show notes.

Podcast players differ in how well they present these — but all of the common ones will at least show links and paragraphs correctly.

## Customising these descriptions

If you want to customise how `episode.description` is calculated from the content of your post, or if you want to add additional information to your show notes, **Podcaster** lets you customise both of these descriptions.

If `podcast.episodeDescriptionTemplate` exists, it's assumed to contain the name of a template in your includes directory; the same with `podcast.episodeContentTemplate`. If those templates exist, they are included in your podcast feed, specifying the short and long descriptions respectively.

### Sample templates

Here's a sample _episode description template_ that reduces the length of the short description to 255 characters. Remember, the short description produced by this template needs to be plain text.

```liquid
{% raw %}{{ post.content | safe | striptags(true) | truncate(255) }}{% endraw %}
```

And here's a sample _episode content template_ based on the one from my _Star Trek_ podcast site. It includes the stardate and first broadcast date of the _Star Trek_ episode we discuss in a given podcast episode. The long description produced here is in HTML.

```liquid
<p>
  <em>
    {% raw %}First broadcast on {{ post.data.starTrek.broadcast | readableDate }}.  
    Stardate: {{ post.data.starTrek.stardate }}.{% endraw %}
  </em>
</p>
{{ post.content | safe }}
```

The episode description template and the episode content template both need to be Nunjucks templates, and both need to refer to the podcast episode's post as `post`, using [the collection item data structure][collection-item].

[collection-item]: https://www.11ty.dev/docs/collections/#collection-item-data-structure

---

> [!NOTE] Unnecessary technical detail
> **Podcaster** includes the short description in the feed as the contents of the `<itunes:summary>` and `<description>` tags.
> It includes the long description in the feed as the content of the `<content:encoded>` tag, inside a CDATA section.
