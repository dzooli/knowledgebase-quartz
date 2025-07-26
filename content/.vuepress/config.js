module.exports = {
  lang: "en-US",
  title: "Developer's Knowledgebase",
  description: "Various knowledge from my personal developer experience",
  head: [
    ["meta", { name: "theme-color", content: "#0066ff" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "PHP",
        items: [
          { text: "Index", link: "/php/" },
          { text: "Codeception", link: "/php/codeception/" },
          { text: "Debug", link: "/php/debug/" },
          { text: "Phalcon", link: "/php/phalcon/" },
          { text: "Snippets", link: "/php/snippets/" },
          { text: "Yii2", link: "/php/yii2/" },
        ],
      },
      {
        text: "DB",
        link: "/dbs/",
      },
      {
        text: "DevOps",
        items: [
          { text: "Index", link: "/devops/" },
          { text: "Docker", link: "/devops/docker" },
          { text: "Web Servers", link: "/devops/webservers" },
        ],
      },
      {
        text: "Frontend",
        items: [
          { text: "Index", link: "/frontend/" },
          { text: "JQuery", link: "/frontend/jquery/" },
        ],
      },
      {
        text: "Python",
        link: "/python/",
      },
      {
        text: "Testing",
        items: [
          { text: "Index", link: "/testing/" },
          { text: "Selenium", link: "/testing/selenium/" },
        ],
      },
    ],
  },

  plugins: ["@vuepress/plugin-medium-zoom"],
};
