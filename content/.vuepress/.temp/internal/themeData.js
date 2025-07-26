export const themeData = JSON.parse("{\"colorModeSwitch\":false,\"colorMode\":\"dark\",\"sidebarDepth\":3,\"sidebar\":{\"/php/\":[{\"text\":\"Topics\",\"children\":[\"README.md\",\"codeception\",\"debug\",\"phalcon\",\"snippets\",\"test\",\"yii2\"]}],\"/frontend/\":[{\"title\":\"Topics\",\"children\":[\"README.md\",\"jquery\"]}],\"/dbs/\":[{\"title\":\"Topics\",\"children\":[\"README.md\"]}],\"/python/\":[{\"title\":\"Topics\",\"children\":[\"README.md\"]}],\"/devops/\":[{\"title\":\"Topics\",\"children\":[\"README.md\",\"webservers\",\"docker\"]}],\"/testing/\":[{\"title\":\"Topics\",\"children\":[\"README.md\",\"selenium\"]}]},\"navbar\":[{\"text\":\"PHP\",\"link\":\"/php/\"},{\"text\":\"DB\",\"link\":\"/dbs/\"},{\"text\":\"DevOps\",\"link\":\"/devops/\"},{\"text\":\"Frontend\",\"link\":\"/frontend/\"},{\"text\":\"Python\",\"link\":\"/python/\"},{\"text\":\"Testing\",\"link\":\"/testing/\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
