---
title: Podcaster options in your configuration file
eleventyNavigation:
  key: Podcaster options
  parent: Reference
  order: 2
  excerpt: >-
    A list of options that can you can supply to **Podcaster** when adding it to your Eleventy configuration file
---
When you add **Podcaster** to your Eleventy configuration file, you can use pass in a number of options to modify its behaviour.

| option | default | meaning |
| ----- | ----- | ----- |
| `episodeFilesDirectory` | `episode-files` | The directory where your episode audio files are stored. This should be a relative path from your project's `input` directory. |
| `episodePostsDirectory` | `episode-posts` | The directory where your episode post templates are stored. This should be a relative path from your project's `input` directory. |
| `handleDrafts` | undefined | When this is set to `true`, **Podcaster** will let you designate certain posts as drafts by setting `draft` to `true` in their front matter. These draft posts will not be included in production builds. Read more [about drafts here][drafts]. |
| `handleExcerpts` | undefined | When this is set to `true`, **Podcaster** will calculate HTML excerpts for your posts. These will be available as `excerpt` in the data cascade. Read more [about excerpts here][excerpts]. |
| `handlePageTitles` | undefined | When this is set to `true`, **Podcaster** will calculate a page title for each of your pages, based on the site title and the title the page itself. Read more [about page titles here][page-titles]. |
| `optionalFeatures` | undefined | When this is set to `true`, **Podcaster** will set `handleDrafts`, `handleExcerpts`, and `handlePageTitles` to `true`. |
| `s3Storage` | undefined | If you want **Podcaster** to calculate the sizes and durations of your episode audio files and those files are stored in S3-compatible object storage, here's where you supply **Podcaster** with the information to access that storage, in the format `{ accessKey, secretKey, bucket, region, endpoint }`. Read more [about storing your episode audio files in S3-compatible object storage here][s3-storage]. |
| `readableDateLocale` | `'en-AU'` | **Podcaster** supplies a `readableDate` filter to format dates in your templates as localised full dates, including the weekday. You can customize the locale used for formatting by setting this option: the most common locale strings in English are `'en-US'` and `'en-GB'`. Read more [about readable dates here][readable-dates]. |

[drafts]: /docs/drafts/
[excerpts]: /docs/drafts/
[page-titles]: /docs/page-titles/
[s3-storage]: /docs/s3-storage/
[readable-dates]: /docs/readable-filters/#readabledate

Here's an excerpt from an Eleventy Configuration File with most of these options set.

## eleventy.config.js { .filename }

```javascript
import Podcaster from 'eleventy-plugin-podcaster'

export default function(eleventyConfig) {
  …
  eleventyConfig.addPlugin(Podcaster, {
    episodeFilesDirectory: '../episodes',
    episodePostsDirectory: 'posts',
    handleDrafts: true,
    handleExcerpts: true,
    handlePageTitles: true,
    s3Storage: {
      accessKey: '<your-access-key>',
      secretKey: '<your-secret-key>',
      bucket: '<your-bucket-name>',
      region: 'us-east-1',
      endpoint: 'https://example-cdn.com'
    },
    readableDateLocale: 'en-US'
  })
  …
}
```
