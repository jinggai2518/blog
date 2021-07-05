import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/","Home",["/index.html","/README.md"]],
  ["v-c19856a4","/guide/exam.html","vue3",["/guide/exam.md"]],
  ["v-e5218278","/guide/js.html","vue3",["/guide/js.md"]],
  ["v-fffb8e28","/guide/","vue3",["/guide/index.html","/guide/README.md"]],
  ["v-7911f002","/guide/vue.html","vue3",["/guide/vue.md"]],
  ["v-3706649a","/404.html","",[]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
