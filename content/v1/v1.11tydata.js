export default {
  layout: 'layouts/docs.v1.njk',
  permalink (data) {
    if (data.page.fileSlug === 'v1') {
      return '/v1/docs/'
    } else {
      return `/v1/docs/${data.page.fileSlug}/`
    }
  }
}
