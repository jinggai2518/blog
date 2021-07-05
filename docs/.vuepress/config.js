module.exports = {
  lang: 'zh-CN',
  title: '井盖的blog',
  description: '井盖的blog',
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
  base: '/blog/',
  themeConfig: {
   logo: 'https://vuejs.org/images/logo.png',
   lastUpdated:true,
   navbar: [
    {
      text: 'vue',
      link: '/guide/vue.html',
      //activeMatch: '/',
    },
    {
      text: 'js',
      link: '/guide/exam.html',
     // activeMatch: '/',
    },
    {
      text: 'exam',
      link: '/guide/js.html',
     // activeMatch: '/',
    },
  ],
  
  },
  //themeConfig END

}
