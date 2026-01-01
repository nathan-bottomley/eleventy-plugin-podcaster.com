import MarkdownIt from 'markdown-it'

const md = MarkdownIt({
  html: true,
  typographer: true
})

export default {
  tags: [
    'post'
  ],
  layout: 'layouts/post.njk',
  eleventyComputed: {
    permalink (data) {
      if (data.permalink) {
        return data.permalink
      }
      const { date, fileSlug } = data.page
      const dateURL = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`
      return `${dateURL}/${fileSlug}/`
    },
    excerpt (data) {
      // If an excerpt is set in front matter, use it
      if (data.excerpt) return md.render(data.excerpt)

      const content = data.page.rawInput

      // If an excerpt is set using comment delimiters, use it
      const excerptPattern = /<!---excerpt-->\s*(.*?)\s*<!---endexcerpt-->/s
      const match = excerptPattern.exec(content)
      if (match && match[1]) {
        return md.render(match[1])
      }
    }
  }
}
