# vuex-crossviews-shared
vuex跨窗口共享插件

支持移动端多webview页面vuex共享

[![NPM version](https://img.shields.io/npm/v/vuex-crossviews-shared.svg)](https://www.npmjs.com/package/vuex-crossviews-shared)
[![NPM downloads](https://img.shields.io/npm/dm/vuex-crossviews-shared.svg)](https://www.npmjs.com/package/vuex-crossviews-shared)

## 依赖

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## 安装

```bash
npm install --save vuex-crossviews-shared
```

## 使用

```js
import sharedVuex from 'vuex-crossviews-shared'

const store = new Vuex.Store({
  // ...
  plugins: [sharedVuex()],
})
```

## API
### `sharedVuex([options])`

- `key <String>`: storage存储的key. (default: **h5_vuex**)
- `paths <Array>`: 需要持久化存储的state数据.例：`['a.b.c', 'a.b.d']` (default: **[]**)
- `filter <Function>`: 对触发storage更新的commit筛选方法(default: `()=>true`).如：
   ```
   filter = (mutation) => {
     if (mutation.type === 'example') {
        return true;
     }
   };
   ```
   唯一参数是mutation对象
- `event <Object>`: 自定以事件方法，用来做发布和响应自定义事件. (default: **localstorage的原生监听事件，可能在ios上的UIWebView中失效**)
   它应包含三个方法：
   ```javascript
   //发布事件
   event.emit({
        type: key,
        data: state,
   });
   //取消事件
   event.off({
	type: key,
	handler: window._vuexhandle,
   });
   //注册事件
   event.on({
	type: key,
        handler: window._vuexhandle,
   });
   ```
