---
title: How to deploy your site and your episodes
eleventyNavigation:
  key: How to deploy your site and your episodes
  parent: How-to guides
  order: 4
  excerpt: >-
    How to deploy your site and your episodes
---

## Deploying your site

You can deploy your podcast site — along with its feed — [the same way you would host any Eleventy site][hosting], using [a Jamstack provider][] linked to your source control repository or using [a classic web host][] which will allow you to upload the contents of your output directory.

[hosting]: https://www.11ty.dev/docs/deployment/
[a Jamstack provider]: https://www.11ty.dev/docs/deployment/#jamstack-providers
[a classic web host]: https://www.11ty.dev/docs/deployment/#classic-web-hosts

However, your podcast episode files should be hosted somewhere else, preferably on a Content Delivery Network (CDN), which will let your listeners download your episodes promptly and quickly.

## Uploading your episodes

MP3 files can get big, and a long-running podcast will consist of quite a few of them, so you should probably host your podcast files separately from your website. You can do this by using a host that provides object S3-compatible object storage — a kind of online bucket where you can put a number of media files, which the host can serve from various points across the nextwork.

Many hosts offer such a service, including [Digital Ocean Spaces][], [Linode Object Storage][], [Backblaze B2 Cloud Storage][] and [Cloudflare R2][].

[Digital Ocean Spaces]: https://www.digitalocean.com/products/spaces
[Linode Object Storage]: https://www.linode.com/products/object-storage/
[Backblaze B2 Cloud Storage]: https://www.backblaze.com/cloud-storage
[Cloudflare R2]: https://developers.cloudflare.com/r2/

Your host will assign URLs to each of your podcast episodes: you will tell  **Podcaster** about these URLs by defining `podcast.episodeUrlBase` as the base URL for all of your podcast episodes, like this: `https://example-podcast.sfo3.digitaloceanspaces.com`. You will provide the filename for each individual episode as `episode.filename`.

To deploy your episodes to your CDN host, you can write a script using [`rclone`][rclone], `rsync` or `s3cmd`, depending on your setup. `rclone` is particularly quick and versatile for this purpose.

[rclone]: https://rclone.org

Here's the script that I use to deploy the episodes for one of my podcasts to a DigitalOcean Space.

```sh
rclone sync episodes/ digitalocean:startlingbarbarabain -P
```

> [!TIP]
> The `-P` flag in that script gets `rclone` to print out detailed and helpful
> information about its progress.

## But how will my host know about my episode files?

If your site is being built on a machine that doesn't have access to your episode audio files, **Podcaster** won't be able to [work out those files' sizes, durations or filenames][sources] for you. Or will it?

[sources]: /docs/sources-of-episode-information.md

There are two ways to solve this problem:

1. [Give **Podcaster** access to your S3 storage][s3-storage]. That way, **Podcaster** can just go to the S3 bucket and get the information it needs from there.
2. First build your site locally, giving **Podcaster** access to your episode files in the `episode-files` directory. When **Podcaster** analyses the files, it will store its results in a file called `cachedEpisodeData.json` in your projects source directory. Then commit that file to your repostory or upload it to the remote machine that's building your site, and **Pocaster** will use it to work out the files' sizes, durations and filenames.

[s3-storage]: /docs/sources-of-episode-information/#telling-podcaster-where-your-episode-files-are-stored
