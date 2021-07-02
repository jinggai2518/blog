export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "Home",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "title": "Home",
    "heroImage": "./assets/img/hero.png",
    "actions": [
      {
        "text": "~ >_< ~",
        "link": "/guide/vue/less1.html",
        "type": "primary"
      }
    ],
    "features": [
      {
        "title": "vue学习笔记",
        "details": "一步跨越到VUE3的学习笔记"
      },
      {
        "title": "原生js学习笔记",
        "details": "es5,es6学习笔记"
      },
      {
        "title": "各种考试学习笔记",
        "details": "各类考试的学习笔记"
      }
    ],
    "footer": "到底啦~~"
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": 1625133471000,
    "contributors": [
      {
        "name": "jingggai2518",
        "email": "357325569@qq.com",
        "commits": 1
      }
    ]
  }
}

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
