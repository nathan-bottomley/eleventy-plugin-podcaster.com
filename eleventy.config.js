import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin, RenderPlugin } from '@11ty/eleventy'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import pluginNavigation from '@11ty/eleventy-navigation'
import jsYaml from 'js-yaml'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import MarkdownIt from 'markdown-it'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItFootnote from 'markdown-it-footnote'
import cssPlugin from './_config/css-plugin.js'
import pluginFilters from './_config/filters.js'

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  let hasLoggedAboutDrafts = false
  eleventyConfig.addPreprocessor('drafts', 'md', (data, _content) => {
    let shouldIncludeDrafts = false
    if (process.env.INCLUDE_DRAFTS === 'true') {
      shouldIncludeDrafts = true
    } else if (process.env.INCLUDE_DRAFTS === 'false') {
      shouldIncludeDrafts = false
    } else {
      shouldIncludeDrafts = (process.env.ELEVENTY_RUN_MODE !== 'build')
    }
    if (!hasLoggedAboutDrafts) {
      if (shouldIncludeDrafts) {
        console.log('Including drafts.')
      } else {
        console.log('Excluding drafts.')
      }
      hasLoggedAboutDrafts = true
    }
    if (data.draft && !shouldIncludeDrafts) {
      return false
    }
  })

  // Markdown

  const markdownLibrary = MarkdownIt({
    html: true,
    typographer: true
  }).use(MarkdownItGitHubAlerts).use(MarkdownItAttrs).use(MarkdownItFootnote)
  eleventyConfig.setLibrary('md', markdownLibrary)

  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig
    .addPassthroughCopy({
      './public/': '/'
    })
    .addPassthroughCopy('./content/feed/pretty-atom-feed.xsl')

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}')

  // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
  // Adds the {% css %} paired shortcode
  eleventyConfig.addBundle('css', {
    toFileDirectory: 'dist',
  })
  // Adds the {% js %} paired shortcode
  eleventyConfig.addBundle('js', {
    toFileDirectory: 'dist',
  })

  // Official plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  })
  eleventyConfig.addPlugin(pluginNavigation)
  eleventyConfig.addPlugin(HtmlBasePlugin)
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
  eleventyConfig.addPlugin(cssPlugin)
  eleventyConfig.addPlugin(RenderPlugin)

  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom', // or 'rss', 'json'
    outputPath: '/feed/feed.xml',
    stylesheet: 'pretty-atom-feed.xsl',
    collection: {
      name: 'post'
    },
    metadata: {
      language: 'en',
      title: 'The Podcaster Blog',
      subtitle: 'Hosting a podcast and creating its website with Eleventy.',
      base: 'https://eleventy-plugin-podcaster.com/',
      author: {
        name: 'Nathan Bottomley'
      },
      eleventyImport: {
        collections: 'post'
      }
    }
  })

  // YAML data files
  eleventyConfig.addDataExtension('yaml,yml', (content) => jsYaml.load(content))

  // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // File extensions to process in _site folder
    extensions: 'html',

    // Output formats for each image.
    formats: ['avif', 'webp', 'auto'],

    // widths: ['auto'],

    defaultAttributes: {
      // e.g. <img loading decoding> assigned on the HTML tag will override these values.
      loading: 'lazy',
      decoding: 'async',
    }
  })

  // Filters
  eleventyConfig.addPlugin(pluginFilters)

  eleventyConfig.addPlugin(IdAttributePlugin, {
    // by default we use Eleventy’s built-in `slugify` filter:
    // slugify: eleventyConfig.getFilter('slugify'),
    // selector: 'h1,h2,h3,h4,h5,h6', // default
  })

  eleventyConfig.addGlobalData('eleventyComputed.pageTitle', () => {
    return data => {
      if (data.title && data.title.length > 0 && data.title !== data.site.title) {
        return `${data.title} &middot ${data.site.title}`
      } else {
        return data.site.title
      }
    }
  })

  eleventyConfig.addShortcode('currentBuildDate', () => {
    return (new Date()).toISOString()
  })

  eleventyConfig.addPassthroughCopy('content/_redirects')

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior('passthrough')
}

export const config = {
  // Control which files Eleventy will process
  // e.g.: *.md, *.njk, *.html, *.liquid
  templateFormats: [
    'md',
    'njk',
    'html',
    'liquid',
    '11ty.js',
  ],

  // Pre-process *.md files with: (default: `liquid`)
  markdownTemplateEngine: 'njk',

  // Pre-process *.html files with: (default: `liquid`)
  htmlTemplateEngine: 'njk',

  // These are all optional:
  dir: {
    input: 'content',          // default: '.'
    includes: '../_includes',  // default: '_includes' (`input` relative)
    data: '../_data',          // default: '_data' (`input` relative)
    output: '_site'
  },

  // -----------------------------------------------------------------
  // Optional items:
  // -----------------------------------------------------------------

  // If your site deploys to a subdirectory, change `pathPrefix`.
  // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

  // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
  // it will transform any absolute URLs in your HTML to include this
  // folder name and does **not** affect where things go in the output folder.

  // pathPrefix: '/',
}
