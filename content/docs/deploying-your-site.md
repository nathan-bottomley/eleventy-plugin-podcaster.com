---
title: How to deploy your site and episodes
eleventyNavigation:
  key: How to deploy your site and episodes
  parent: How-to guides
  order: 4
  excerpt: >-
    How to deploy your site and episodes
---

## Deploying your site

You can deploy your podcast site — along with its feed — [the same way you would host any Eleventy site][hosting] — using either [a Jamstack provider][] linked to your source control repository or [a classic web host][] that allows you to upload the contents of your output directory.

[hosting]: https://www.11ty.dev/docs/deployment/
[a Jamstack provider]: https://www.11ty.dev/docs/deployment/#jamstack-providers
[a classic web host]: https://www.11ty.dev/docs/deployment/#classic-web-hosts

## Where to store your episodes online

Audio files can get big, and a long-running podcast will consist of quite a few of them, so you should probably host your episode files separately from your website. You can do this by using a service that provides S3-compatible object storage — a kind of online bucket where you can put a number of media files, which can be served from various points across the network.

There are many S3-compatible object storage services, including [Digital Ocean Spaces][], [Linode Object Storage][], [Backblaze B2 Cloud Storage][] and [Cloudflare R2][]. (Or even [Amazon S3][] itself, if you have a lot of money lying around.)

[Digital Ocean Spaces]: https://www.digitalocean.com/products/spaces
[Linode Object Storage]: https://www.linode.com/products/object-storage/
[Backblaze B2 Cloud Storage]: https://www.backblaze.com/cloud-storage
[Cloudflare R2]: https://developers.cloudflare.com/r2/
[Amazon S3]: https://aws.amazon.com/s3/

Your storage service will assign URLs to each of your podcast episodes: you will tell  **Podcaster** about these URLs by specifying the base URL of your episodes as `podcast.episodeUrlBase`, like this:

### podcast.json { .filename }

```diff-json
{
  "title": "Untitled Star Trek Project",
  "siteUrl": "https://untitledstartrekproject.com",
  "description": "A random Star Trek commentary podcast. With Joe and Nathan.",
  "language": "en-GB",
  "category": "TV & Film",
  "author": "Joe and Nathan",
+ "episodeUrlBase": "https://ustp.example-cdn.com"
}
```

You will specify the filename for each individual episode as `episode.filename`.

## Deploying your episodes

To deploy your episodes to your CDN host, you can write a script using [`rclone`][rclone], `rsync` or `s3cmd`, depending on your setup. `rclone` is particularly quick and versatile for this purpose.

[rclone]: https://rclone.org

Here's the script that I use to deploy the episodes for one of my podcasts to a DigitalOcean Space.

```sh
rclone sync episodes/ digitalocean:ustp -P
```

> [!TIP]
> The `-P` flag in that script gets `rclone` to print out detailed and helpful
> information about its progress.

## How will your host know about your episode files?

If your site is being built on a machine that doesn't have access to your episode audio files, **Podcaster** won't be able to [work out those files' sizes, durations or filenames][sources] for you. Or will it?

[sources]: /docs/sources-of-episode-information.md

There are two ways to give **Podcaster** the information it needs:

1. [Give **Podcaster** access to your S3 storage][s3-storage]. That way, it can  go to the S3 bucket and get the information from there.
2. First build your site locally, giving **Podcaster** access to your episode files in the `episode-files` directory. When **Podcaster** builds the site, it will store its results in a file called `cachedEpisodeData.json` in your project's source directory. Commit that file to your repostory or upload it to the remote machine that's building your site, and **Podcaster** will use it to work out the files' sizes, durations and filenames.

[s3-storage]: /docs/sources-of-episode-information/#telling-podcaster-where-your-episode-files-are-stored
