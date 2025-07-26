export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"https://v1.vuepress.vuejs.org/hero.png\",\"tagline\":\"My developer knowledgebase\",\"footer\":\"Made by Zoltan Fabian\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1665534620000,\"contributors\":[{\"name\":\"Zoltan Fabian\",\"email\":\"zoltan.dzooli.fabian@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")

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
