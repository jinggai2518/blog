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
      link: '/guide/js.html',
     // activeMatch: '/',
    },
    {
      text: '微信小程序',
      link: '/guide/wx.html',
     // activeMatch: '/',
    },
    {
      text: 'exam',
      link: '/guide/exam.html',
     // activeMatch: '/',
    },
    {
      text: '理财',
      link: '/guide/money.html',
     // activeMatch: '/',
    },
  ],
  
  },
  //themeConfig END

}
