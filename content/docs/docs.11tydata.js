export default {
  layout: 'layouts/docs.njk',
  eleventyComputed: {
    'eleventyNavigation': {
      parent: (data) => {
        if (data.eleventyNavigation?.key !== 'Documentation') {
          return 'Documentation'
        }
      },
      key: (data) => {
        if (!data.eleventyNavigation?.key) return data.title

        return data.eleventyNavigation.key
      }
    }
  }
}
