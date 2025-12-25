export default {
  "layout": "layouts/docs.v1.njk",
  permalink(data) {
    if (data.page.fileSlug === 'v1') {
      return `/docs/v1/`;
    } else {
      return `/docs/v1/${data.page.fileSlug}/`;
    }
  },
  eleventyComputed: {
    'eleventyNavigation': {
      parent: (data) => {
        if (data.eleventyNavigation?.key !== 'Version 1') {
          return 'Version 1'
        }
      },
      key: (data) => {
        if (!data.eleventyNavigation?.key) return data.title

        return data.eleventyNavigation.key
      }
    }
  }
}
