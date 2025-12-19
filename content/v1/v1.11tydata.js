export default {
  "layout": "layouts/docs.v1.njk",
  permalink(data) {
    return `/docs/v1/${data.page.fileSlug}/`;
  }
}
