# 微信小程序
## 修改上一页的Data
```js
let pages = getCurrentPages(); 
let currPage = pages[pages.length - 1];//当前页
let prevPage = pages[pages.length - 2];//上一页
let prevData = prevPage.data;
//prevData 就是上一页的数据
//-2是上一页
```
## 小程序中使用防抖节流函数
```js
formSubmit: tool.throttle( (that,e)=> {
		
		//此处的that就是页面对象this
        //此处的e就是点击按钮对象

	},4000),


```