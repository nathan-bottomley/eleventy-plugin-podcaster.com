---
title: Modifying your build process with environment variables
eleventyNavigation:
  key: Environment variables
  parent: Reference
  order: 1
  excerpt: >-
    A list of environment variables that can be used to modify the build process  
---
Here's a list of the environment variables that can be used to modify your site's build process.

| variable | meaning |
| ----- | ----- |
| `INCLUDE_DRAFTS` | When this variable is set to `true`, draft posts will be included in the build; when it's `false`, they won't be. This overrides the normal behaviour, which is to include drafts when [ELEVENTY_RUN_MODE][] is set to `watch` or `serve` and to exclude them when ELEVENTY_RUN_MODE is set to `build`. Read more [about drafts here][drafts]. |
| `SKIP_EPISODE_CALCULATIONS` | **Podcaster** can calculate the size and duration of your episode files; but when this variable is set to `true`, those calculations will be skipped. Read more [about how **Podcaster** calculates the size and duration of your episode files here][calculate-episodes]. |

[ELEVENTY_RUN_MODE]: https://www.11ty.dev/docs/environment-vars/#eleventy-supplied
[drafts]: /docs/optional-features.md#drafts
[calculate-episodes]: /docs/sources-of-episode-information.md
