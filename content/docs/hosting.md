---
title: Hosting your podcast episode files
eleventyNavigation:
  key: Hosting episode files
---

MP3 files can get big, and a long-running podcast will consist of quite a few of them, so you should probably host your podcast files separately from your website. You can do this by using a host that provides object storage — a kind of online bucket where you can put a number of media files, which the host can serve across the nextwork.

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
