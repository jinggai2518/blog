# vue3
## 组件
### 父子组件之间的通信

#### $emit方法
```js
const test = {
    props:['count'],
    methods:{
           addOne(){
                this.$emit('addOne',this.count+4);//使用$emit通知父组件
           } 

    },
        template:`
               <div @click ='addOne' >{{count}}</div>
        `

 } 
 const app =  Vue.createApp({
      data(){
          return {
             count:1
            }
      },
      methods:{
        handAddOne(e){
            this.count=e;
        }

      },
        template:`
        <div>
           <counter :count ='count' @add-one = 'handAddOne'/>   
        </div>
        `
        //使用@add-one监听传递时间，注意此处驼峰要改成-，监听出发handAddOne方法
    })
    app.component('counter',test);
    app.mount('#root')
```
Nuxt is an outstanding Vue SSR framework, and it is capable of doing what VuePress does. But Nuxt is designed for building applications, while VuePress is more lightweight and focused on content-centric static sites.

### VitePress

VitePress is the little brother of VuePress. It's also created and maintained by our Vue.js team. It's even more lightweight and faster than VuePress. However, as a tradeoff, it's more opinionated and less configurable. For example, it does not support plugins. But VitePress is powerful enough to make your content online if you don't need advanced customizations.

It might not be an appropriate comparison, but you can take VuePress and VitePress as Laravel and Lumen.

### Docsify / Docute

Both are great projects and also Vue-powered. Except they are both fully runtime-driven and therefore not SEO-friendly. If you don’t care for SEO and don’t want to mess with installing dependencies, these are still great choices.

### Hexo

Hexo has been serving the Vue 2.x docs well. The biggest problem is that its theming system is static and string-based - we want to take advantage of Vue for both the layout and the interactivity. Also, Hexo’s Markdown rendering isn’t the most flexible to configure.

### GitBook

We’ve been using GitBook for most of our sub project docs. The primary problem with GitBook is that its development reload performance is intolerable with a large amount of files. The default theme also has a pretty limiting navigation structure, and the theming system is, again, not Vue based. The team behind GitBook is also more focused on turning it into a commercial product rather than an open-source tool.
