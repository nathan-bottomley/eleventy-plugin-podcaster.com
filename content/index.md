---
title: Podcaster
numberOfLatestPostsToShow: 5
---
`eleventy-plugin-podcaster` — or **Podcaster**, as we will call it from now on — is an Eleventy plugin which lets you create a podcast and its accompanying website. You provide **Podcaster** with information about your podcast and its episodes, and it creates the podcast feed that you submit to Apple Podcasts, Spotify or any other podcast directory. And you can use the information you have provided to create pages for individual episodes, guests, topics, seasons or anything else at all.

Plenty of services exist that will host your podcast online — [Spotify][], [Acast][], [Podbean][], [Buzzsprout][], [Blubrry][]. But none of these will allow you to own your podcast's presence on the web, and none of them will give you the freedom to create a site that presents your podcast in a way that reflects its premise, tone and style.

But Eleventy and **Podcaster** will.

[Spotify]: https://podcasters.spotify.com
[Acast]: https://www.acast.com
[Podbean]: https://www.podbean.com
[Buzzsprout]: https://www.buzzsprout.com
[Blubrry]: https://blubrry.com

## Usage

Detailed and specific information about how to install and use **Podcaster** can be found in [the Documentation section](/docs) of the site, but here's a quick summary.

### 1. Install Podcaster

**Podcaster** is an Eleventy plugin. Create an Eleventy site and install the `eleventy-plugin-podcaster` plugin in the usual way.

### 2. Provide information to the plugin

- In the data directory, create a `podcast.json` file. This will contain information about your podcast and its site — at the very least, its title, the site URL, a description, its language, and its category.

- In the input directory, create an `episode-posts` directory. This directory will contain a post for each episode, a post which includes information about the episode, including its title, date, episode number and show notes.

- Optionally, in the input directory, create an `episode-files` directory for your episode MP3 files.

### 3. Create the website pages

A podcast website will usually have an index page or pages, which list and describe all the episodes as well as pages for individual episodes. You can use the information you've provided — including the posts you've made for each episode — to create these pages and many more.

### 4. Host the website

You can host a **Podcaster** site wherever you host an Eleventy site. But your podcast episode files will need to be hosted on a CDN, and you will need to include a URL prefix for that CDN in your `podcast.json` data file.

## On this site

This site hosts [the **Podcaster** documentation](/docs). It also hosts [the **Podcaster** blog](/blog), where I'll be posting tips and ideas about how you can use **Podcaster** and Eleventy to create an online presence for your podcast.

{# ## Recently on the blog

{% set latestPost = collections.post | reverse | first %}

### [{{ latestPost.data.title }}]({{ latestPost.url }})

{{ latestPost.date | readableDate }}{ .post-date }

{{ latestPost.data.excerpt | safe }}

[Continue reading…]({{ latestPost.url }})

{% if collections.post.length > 1 %}

## Previously on the blog

<!--markdownlint-disable MD033-->
<ul class="previous-posts">
{%- for post in collections.post | reverse %}
  {%- if not loop.first %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> ({{ post.date | shortDate }})</li>
  {%- endif %}
{%- endfor %}
</ul>
<!--markdownlint-enable MD033-->

{% endif %} #}
