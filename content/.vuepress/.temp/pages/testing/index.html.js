export const data = JSON.parse("{\"key\":\"v-db500bd0\",\"path\":\"/testing/\",\"title\":\"Various QA-related topics\",\"lang\":\"en-US\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"Basic types of tests\",\"slug\":\"basic-types-of-tests\",\"link\":\"#basic-types-of-tests\",\"children\":[{\"level\":3,\"title\":\"Unit test\",\"slug\":\"unit-test\",\"link\":\"#unit-test\",\"children\":[]},{\"level\":3,\"title\":\"Functional test\",\"slug\":\"functional-test\",\"link\":\"#functional-test\",\"children\":[]},{\"level\":3,\"title\":\"Integration test\",\"slug\":\"integration-test\",\"link\":\"#integration-test\",\"children\":[]},{\"level\":3,\"title\":\"User-acceptance test\",\"slug\":\"user-acceptance-test\",\"link\":\"#user-acceptance-test\",\"children\":[]}]},{\"level\":2,\"title\":\"Further information\",\"slug\":\"further-information\",\"link\":\"#further-information\",\"children\":[]}],\"git\":{\"updatedTime\":1665534620000,\"contributors\":[{\"name\":\"Zoltan Fabian\",\"email\":\"zoltan.dzooli.fabian@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"testing/README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
