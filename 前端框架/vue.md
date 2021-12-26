[表单输入绑定 — Vue.js 中文文档 (bootcss.com)](https://vuejs.bootcss.com/guide/forms.html)

## 使用vue插件

[GitHub - vuejs/devtools: ⚙️ Browser devtools extension for debugging Vue.js applications.](https://github.com/vuejs/devtools)

## 关闭生成环境Tip

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112191550766.png" alt="image-20211219155006661" style="zoom:80%;" />

## helloworld

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src=https://cn.vuejs.org/js/vue.js></script>
</head>
<body>
    <div id="main">
        <h2>{{name}}</h2>
    </div>
    <script>
        Vue.config.productionTip = false;
        new Vue({
            el:'#main',
            data:{
                name:'胡梓卓'
            }
        })
    </script>                                                                                                                  
</body>
</html>
```

## 模板语法

### 插值语法

解析标签体内容，可读取data中的所有属性

> 插值表达式{{js表达式}} 也可以写vue实例上所有的
>
> 一个Vue实例只能接管一个容器
>
> + 如果有多个容器，只对第一个有效
> + 如果有多个实例，只对第一个vue实例生效

### 指令语法

解析标签（标签属性、标签体内容、绑定事件...）

```vue
<div id="main">
        <h2>{{name}}</h2>
        <a v-bind:href="jsInit.url">vuejs文件</a>
        <!-- 简写 -->
        <a :href="jsInit.url">vuejs文件</a>
    </div>
<script>
        Vue.config.productionTip = false;
        new Vue({
            el:'#main',
            data:{
                jsInit:{
                    url:'https://cn.vuejs.org/js/vue.js'
                },
                name:'胡梓卓'
            }
        })
    </script>
```

## 数据绑定

```vue
<!-- 单向数据绑定 -->
        <input type="button" v-bind:value="name">
        <input type="button" :value="name">
        <br>
        <!-- 双向数据绑定 -->
        <input type="button" v-model:value="name">
        <input type="button" v-model="name">
```

> v-bind 数据只能从data流向也页面
>
> v-model一般只用于表单元素(input、select)

## el与data的两种写法

```vue
<script>
      Vue.config.productionTip = false;
      const v = new Vue({
        // el:'#main',
        // data:{
        //     jsInit:{
        //         url:'https://cn.vuejs.org/js/vue.js'
        //     },
        //     name:'胡梓卓'
        // }
        data: function () {
          return {
            jsInit: {
              url: "https://cn.vuejs.org/js/vue.js",
            },
            name: "胡梓卓"
          };
        },
      });
      v.$mount("#main");
    </script>
```

## MVVM

> m 模型
>
> v 视图
>
> vm 视图模型 数据绑定 dom监听

## 数据代理

```js
Object.defineProperties
```

```js
let number = 18;
      let person = {
        name: "胡梓卓",
        sex: "男",
      };
      Object.defineProperty(person, 'age', {
        value: 21,
        enumerable: true, //枚举，默认false
        writable: true, //可修改，默认false
        configurable: true, //可删除，默认false

        get: function () {
          return number;
        },
        set(value) {
          number = value;
        }
      });
```

> <u>通过vm对象来代理data对象中的属性的操作（get/set）</u>
>
> **基本原理**：通过Object.defineProperty()把data对象中的所有属性添加到vm上，并添加getter/setter，
>
> 在getter/setter内部去操作

## 事件处理

