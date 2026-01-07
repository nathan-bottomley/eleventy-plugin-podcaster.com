---
title: Getting started
eleventyNavigation:
  key: Getting started
  parent: Tutorials
  excerpt: >-
    Create a podcast website step-by-step and learn about its structure

---

This tutorial will guide you through the process of creating a podcast site with Eleventy and **Podcaster**.

The tutorial doesn't cover all of **Podcaster**'s features, but it will show the basics and familiarise you with the structure of an Eleventy podcast project.

This tutorial doesn't include deploying your site or submitting your podcast to Apple Podcasts, Spotify, or other podcast directories.

## 1. Create your Eleventy site and install **Podcaster**

- Create a new Eleventy site, following the procedure described in the [Eleventy documentation](https://www.11ty.dev/docs/).

- Install **Podcaster**'s npm package by typing this at the command line:

```shell
npm install --save-dev eleventy-plugin-podcaster
```

- And then add the plugin to your Eleventy configuration file, like this:

### eleventy.config.js {.filename}

```javascript
import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(Podcaster)
}
```

## 2. Create a `podcast.json` file for your podcast's metadata

- Create a `podcast.json` file in [your Eleventy project's data directory][data-directory]. This file will contain information about your podcast — at the very least, its title, the site URL, a description, its language, and its category. Like this:

[data-directory]: https://www.11ty.dev/docs/config/#directory-for-global-data-files

### podcast.json { .filename }

```json
{
  "title": "Untitled Star Trek Project",
  "siteUrl": "https://untitledstartrekproject.com",
  "description": "A random Star Trek commentary podcast. With Joe and Nathan.",
  "language": "en-GB",
  "category": "TV & Film",
  "author": "Joe and Nathan"
}
```

## 3. Specify an image for your podcast

- Create an `img` directory inside [your project's input directory][input-directory].
- Put your podcast's image file in this directory. **Podcaster** will expect your image file to be called `podcast-logo.jpg`. (The image should be square and at least 1400 × 1400 pixels, but preferably 3000 × 3000 pixels.)
- Add this line to your Eleventy configuration file, immediately after the line `eleventyConfig.addPlugin(Podcaster)`:

### eleventy.config.js { .filename }

```diff-javascript
import Podcaster from 'eleventy-plugin-podcaster'

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(Podcaster)
+ eleventyConfig.addPassthroughCopy('img')
}
```

[input-directory]: https://www.11ty.dev/docs/config/#input-directory

## 4. Create an `episode-files` directory for your episodes' audio files

- Create an `episode-files` directory inside [your project's input directory][input-directory].
- Put your podcast's episode audio files in this directory. These can be in MP3 or M4A format
- Add the `episode-files` directory to your `.gitignore` file. (The files here will be too large to commit to Git.)

## 5. Create an `episode-posts` directory for your episodes' templates

- Create an `episode-posts` directory inside [your project's input directory][input-directory].
- For each episode, create a template in this directory. These templates will include information about the episode in their front matter, such as its publication date, its episode number, the name of its audio file, the size of its audio file in bytes, and the duration of its audio file in seconds. The content of the template will be used as the episode's description or show notes, like this:

### yesterdays-enterprise.md { .filename }

```markdown
---
title: Yesterday’s Enterprise
date: 2021-11-04
episode:
  episodeNumber: 1
  filename: "USTP 1, Yesterday's Enterprise.mp3"
  size: 58747007 # in bytes
  duration: 3601.293 # in seconds
---
After the _Enterprise-C_ emerges from a mysteriously swirly space anomaly, Joe and
Nathan find themselves in an alternate timeline where _Star Trek: The Next
Generation_ is dramatically and impractically lit, full of incident, and sceptical
about the 1990s belief in the End of History. _Star Trek: Discovery_ Series 1
arrives nearly 30 years too early, in _Yesterday’s Enterprise_.
```

Once you've completed this step, you have supplied **Podcaster** with enough information to generate your podcast's RSS feed. Build your site by running `npx @11ty/eleventy` in your project directory, and your podcast feed will be created at `/_site/feed/podcast.xml`.

## 6. Create an episode page for each episode

- Create a base layout called `base.liquid` in [your project's layouts directory][layouts-directory]. Here's an example:

[layouts-directory]: https://www.11ty.dev/docs/config/#directory-for-layouts-optional

### base.liquid { .filename }

{% raw %}

```liquid
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }}</title>
</head>
<body>
  {{ content }}
</body>
</html>
```

{% endraw %}

- Create an episode post layout called `episode-post.liquid` in [your project's layouts directory][layouts-directory]. Here's an example:

{% raw %}

### episode-post.liquid { .filename }

```liquid
---
layout: layouts/base.liquid
---
<article>
  <h1>{{ title }}</h1>
  <p class="episode-number">Episode {{ episode.episodeNumber }}</p>
  <p class="publication-date">{{ date | date: "%A %e %B %Y" }}</p>
  {{ content }}
  <audio controls src="{{ episode.url }}" preload="none">
</article>
```

{% endraw %}

- Create a JSON file called `episode-posts.json` in your `episode-posts` directory with the following content:

### episode-posts.json { .filename }

```json
{
  "layout": "layouts/episode-post.liquid"
}
```

## 7. Create an index page as the home page

- Create a template in [your project's input directory][input-directory] called `index.liquid`. This template will loop through the `episodePost` collection and display information about each episode. Like this:

### index.liquid { .filename }

{% raw %}

```liquid
---
title: Untitled Star Trek Project
layout: layouts/base.liquid
permalink: "/"
---
<h1>{{ title }}</h1>
{% for post in collections.episodePost reversed %}
<article>
  <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
  <p class="episode-number">Episode {{ post.data.episode.episodeNumber }}</p>
  <p class="publication-date">{{ post.date | date: "%A %e %B %Y" }}</p>
  {{ post.content }}
  <audio controls src="{{ post.data.episode.url }}" preload="none">
</article>
{% endfor %}
```

{% endraw %}

Once you've completed this step, you have supplied **Podcaster** with enough information to generate your podcast's website. Run `npx @11ty/eleventy --serve` in your project directory and check out your new site.

## Conclusion

If you've followed these steps, you have created a podcast website using **Podcaster**.

Here are the ideas introduced in this tutorial:

- how to install **Podcaster**
- how to specify information about your podcast in `podcast.json`
- putting your episode audio files in the `episode-files` directory
- how to specify information about each episode in the templates in the `episode-posts` directory
- how to create an episode page for each episode
- how to create an episode index as the home page

You will find more detailed coverage of these topics in [the rest of the **Podcaster** documentation](/docs).
