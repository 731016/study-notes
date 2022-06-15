# Vue3

## 创建vue3.0工程

### vue-cli创建

```js
## @vue/cli版本4.5.0
vue --version
## 安装或升级@vue/cli
npm install -g @vue/cli
## 创建
vue create 项目名
## 启动
cd 项目名
npm run serve
```

### vite创建

[Vite | Next Generation Frontend Tooling (vitejs.dev)](https://cn.vitejs.dev/)

```js
## 创建工程
npm init vite-app 项目名
## 进入工程目录
cd 项目名
## 安装依赖
npm install
## 运行
npm run dev
```



## 改变

### main.js

去除Vue构造函数，改为createApp

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

template模板下可以不用写div标签

```html
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```



## 组合式Api

`setup`

```html
<template>
    <h2>我是APP组件</h2>
    <h3>姓名：{{name}}</h3>
    <h3>年龄：{{age}}</h3>
    <h3>
        <button @click="introduce">说话</button>
    </h3>
</template>

<script>
    // import {h} from 'vue'

    export default {
        name: 'App',
        setup() {
            let name = '涂鏊飞'
            let age = 22

            function introduce() {
                console.log(`我是${name},今年${age}岁`)
            }

            //返回一个对象
            return {
                name,
                age,
                introduce
            }
            //返回一个渲染函数
            // return () => h('h1', '涂鏊飞')
        }
    }
</script>
```

!> 注意点

1. 尽量不要与vue2配置混合使用
   + vue2配置（data、methods、computed）**可以访问到**setup中的属性、方法
   + 但在setup中**不能访问**到vue2配置（data、methods、computed）
   + 如果有重名，setup优先
2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性



142。。。待续

