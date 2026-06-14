---
title: Adding a transcript word count to your podcast About page
description: >-
  How to add a total word count of all your podcast transcripts to your about page.
---
If you have [told **Podcaster** where to find your podcast audio files][], it can provide you with some fun facts about your podcast that you can include in your podcast templates.

[told **Podcaster** where to find your podcast audio files]: docs/sources-of-episode-information.md#telling-podcaster-where-your-episode-files-are-stored

| field | value |
| ----- | ----- |
| `podcastData.numberOfEpisodes` | The number of episodes in the podcast |
| `podcastData.totalSize` | The total size in bytes of all of the episode files |
| `podcastData.totalDuration` | The total duration in seconds of all of the episode files |

A good place to include this data is on your About page. Here's an example from the [_500 Year Diary_][] website's [about page] template.

[_500 Year Diary_]: https://500yeardiary.com
[about page]: https://500yeardiary.com/about/

{% raw %}

```liquid
## Stats

There are {{ podcastData.numberOfEpisodes }} episodes of _500 Year Diary_, 
weighing in at {{ podcastData.totalSize | readableSize: 2 }} 
and lasting {{ podcastData.totalDuration | readableDuration: 'long' | replace_last: ', ', ' and ' }}.
```

{% endraw %}

> [!note]
> The `readableSize` and `readableDuration` filters [are provided by **Podcaster** itself](docs/readable-filters.md).
> `replace_last` is a standard [Liquid filter](https://shopify.github.io/liquid/filters/replace_last/).

Here's what the output looks like:

![Screenshot depicting the Stats section of the 500 Year Diary about page. The text reads: "There are 28 episodes of 500 Year Diary, weighing in at 1.88 GB and lasting 1 day, 5 hours, 55 minutes and 13.306 seconds."](/img/500yd-stats-without-word-count.png)

As I was [adding transcripts to my podcast websites](blog/2026-05-23-creating-interactive-transcripts.md), it occurred to me that there was another fun fact I could include on the about page: the total number of words spoken on the podcast.

So here's how I did that.

## Calculating a word count for the transcripts

First, a reminder of the VTT format of the transcript files. Here's an excerpt from the transcript of [Season 4, Episode 5 of _500 Year Diary_].

[Season 4, Episode 5 of _500 Year Diary_]: https://500yeardiary.com/s4/e5/

```vtt
WEBVTT

NOTE
This transcript was created on 2026-06-07 at 09:18:04

1
00:00:33.359 --> 00:00:37.679
Hello, dear listener, and welcome back to 500 year diary.

2
00:00:37.740 --> 00:00:46.140
The only Doctor Who podcast that's just thought of an excellent way you can get out of buying Christmas presents for your nieces and nephews this year.

3
00:00:46.200 --> 00:00:47.880
I'm Nathan.

4
00:00:47.939 --> 00:00:48.659
I'm Adam.

5
00:00:48.719 --> 00:00:50.219
And I'm Todd.

6
00:00:50.280 --> 00:00:53.820
It's Friday, the 10th of July, 2009.
```

Here's a summary of the format:

Each VTT file consists of blocks of text separated by blank lines. The first of these blocks is a `WEBVTT` header, which tells the browser that this is a WebVTT file. After that, there are two kinds of block — note blocks and transcript blocks. Note blocks are just plain text, but transcript blocks consist of:

- an optional line number
- a required timestamp range consisting of two timestamps separated by an arrow (`-->`)
- some lines containing the actual transcript content

Here's a JavaScript function that takes VTT content, extracts the actual transcript content, counts all the words, and returns the result:

```javascript
function countWords (vttContent) {
  const text = vttContent
    .trim()
    .split(/\n\n+/)
    .filter(block => block.includes('-->'))
    .map(block => {
      const lines = block.split('\n')
      const timeIndex = lines.findIndex(l => l.includes('-->'))
      return lines.slice(timeIndex + 1).join(' ')
    })
    .join(' ')

  return text.split(/\s+/).filter(word => word.length > 0).length
}
```

If we know the path to the transcript directory, we can use this function to count the words in all of that directory's VTT files.

```javascript
import { readdirSync, readFileSync } from 'node:fs'

const TRANSCRIPTS_DIR = './src/transcripts'

export default readdirSync(TRANSCRIPTS_DIR)
  .filter(f => f.endsWith('.vtt'))
  .reduce((total, file) => total + countWords(readFileSync(`${TRANSCRIPTS_DIR}/${file}`, 'utf8')), 0)
```

To make that available to our templates, we can include it in a global data file in the `_data` directory. Here it is:

### _data/transcriptWordCount.js { .filename }

```javascript
import { readdirSync, readFileSync } from 'node:fs'

const TRANSCRIPTS_DIR = './src/transcripts'

function countWords (vttContent) {
  const text = vttContent
    .trim()
    .split(/\n\n+/)
    .filter(block => block.includes('-->'))
    .map(block => {
      const lines = block.split('\n')
      const timeIndex = lines.findIndex(l => l.includes('-->'))
      return lines.slice(timeIndex + 1).join(' ')
    })
    .join(' ')

  return text.split(/\s+/).filter(word => word.length > 0).length
}

export default readdirSync(TRANSCRIPTS_DIR)
  .filter(f => f.endsWith('.vtt'))
  .reduce((total, file) => total + countWords(readFileSync(`${TRANSCRIPTS_DIR}/${file}`, 'utf8')), 0)
```

And so now we can use `transcriptWordCount` in our templates. Like this:

{% raw %}

```liquid
## Stats

There are {{ podcastData.numberOfEpisodes }} episodes of _500 Year Diary_, 
weighing in at {{ podcastData.totalSize | readableSize: 2 }} 
and lasting {{ podcastData.totalDuration | readableDuration: 'long' | replace_last: ', ', ' and ' }}.
The transcripts of all the episodes add up to {{ transcriptWordCount }} words.
```

{% endraw %}

And here's the output:

![Screenshot depicting the Stats section of the 500 Year Diary about page. The text reads: "There are 28 episodes of 500 Year Diary, weighing in at 1.88 GB and lasting 1 day, 5 hours, 55 minutes and 13.306 seconds. The transcripts of all the episodes add up to 320,097 words."](/img/500yd-stats-with-word-count.png)

And we're done. Silly, but fun. As I'm writing this, [_Flight Through Entirety_][] has a transcript word count of 3,033,973, and on [_Untitled Star Trek Project_][] it's 2,327,981. Am I wasting my life? Or am I hanging out with my friends chatting about my favourite TV shows? It's impossible to tell.

[_Flight Through Entirety_]: https://flightthroughentirety.com
[_Untitled Star Trek Project_]: https://untitledstartrekproject.com
