import { bundleAsync, browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist'
import path from 'node:path'

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('css')
  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    useLayouts: false,
    compile: async function (inputContent, inputPath) {
      const parsedInputPath = path.parse(inputPath)
      if (parsedInputPath.name.startsWith('_')) return

      if (inputContent.includes('@import')) {
        const fileList = []
        const importRuleRegex =
          /@import\s+(?:url\()?['"]?([^'");]+)['"]?\)?.*;/g

        let match
        while ((match = importRuleRegex.exec(inputContent))) {
          fileList.push(parsedInputPath.dir + '/' + match[1])
        }
        this.addDependencies(inputPath, fileList)
      }

      const targets = browserslistToTargets(browserslist())

      return async () => {
        const { code } = await bundleAsync({
          filename: inputPath,
          minify: true,
          sourceMap: false,
          targets
        })
        return code
      }
    }
  })
}
