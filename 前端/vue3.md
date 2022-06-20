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

### setup

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



### ref函数

定义响应式数据



**语法**

```js
const xxx = ref(initValue)
```

+ 创建一个包含响应式数据的<u>引用对象（reference对象）</u>
+ js中操作数据：xxx.value
+ 模板中读取数据：不需要.value，直接：`<div>{{xxx}}</div>`

?> 备注

+ 接收的数据：基本类型或对象类型
+ 基本类型数据:响应式使用`object.defineProperty()`的`get`与`set`完成
+ 对象类型：内部使用vue3的函数`reactive`函数

**处理基本类型**

```html
<template>
    <h2>我是APP组件</h2>
    <!--    不用.value模板解析时自动去读取value属性-->
    <h3>姓名：{{name}}</h3>
    <h3>年龄：{{age}}</h3>
    <h3>
        <button @click="introduce">说话</button>
        <button @click="modify">修改人的信息</button>
    </h3>
</template>

<script>
    // import {h} from 'vue'
    import {ref} from 'vue'

    export default {
        name: 'App',
        setup() {
            //使用ref函数是数据成为响应式
            let name = ref('涂鏊飞')
            let age = ref(22)

            function introduce() {
                console.log(`我是${name.value},今年${age.value}岁`)
            }

            function modify() {
                // 打印经过ref包装的响应式数据
                console.log(name)
                console.log(age)
                // 通过value属性去修改数据，vue才能去修改页面的数据
                name.value = '苏小漫'
                age.value = 18
            }

            //返回一个对象
            return {
                name,
                age,
                introduce,
                modify
            }
        }
    }
</script>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206182121082.png" alt="image-20220618212132307"  />

**处理对象类型**

```html
<template>
    <h2>我是APP组件</h2>
    <!--    不用.value模板解析时自动去读取value属性-->
    <h3>姓名：{{name}}</h3>
    <h3>年龄：{{age}}</h3>
    <h4>职位：{{obj.type}}</h4>
    <h4>薪资：{{obj.salary}}</h4>
    <h3>
        <button @click="modify">修改人的信息</button>
        <button @click="modifyJob">修改工作信息</button>
    </h3>
</template>

<script>
    import {ref} from 'vue'

    export default {
        name: 'App',
        setup() {
            //使用ref函数是数据成为响应式
            let name = ref('涂鏊飞')
            let age = ref(22)
            let obj = ref({
                type: 'Java开发工程师',
                salary: 15000
            })
            function modify() {
                // 打印经过ref包装的响应式数据
                console.log(name)
                console.log(age)
                // 通过value属性去修改数据，vue才能去修改页面的数据
                name.value = '苏小漫'
                age.value = 18
            }

            function modifyJob() {
                console.log(obj)
                console.log(obj.value)
                obj.value.type = '前端开发工程师'
                obj.value.salary = 20000
            }

            //返回一个对象
            return {
                name,
                age,
                obj,
                introduce,
                modify,
                modifyJob
            }
        }
    }
</script>
```



![image-20220618213610650](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206182136833.png)

### **reactive函数**

作用：定义一个**对象类型**的响应式数据（基本类型不要使用，用`ref`）

语法：`const 代理对象 = reactive(源对象)`接收一个对象（或数组），返回一个**代理对象（proxy对象）**

不管层级多少都可以实现响应式。内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据

```html
<template>
    <h2>我是APP组件</h2>
    <h4>职位1：{{obj1.type}}</h4>
    <h4>薪资1：{{obj1.salary}}</h4>
    <h4>数组：{{arr}}</h4>
    <h3>
        <button @click="modify">修改人的信息</button>
        <button @click="modifyJob">修改工作信息</button>
    </h3>
</template>

<script>
    // import {h} from 'vue'
    import {ref,reactive} from 'vue'

    export default {
        name: 'App',
        setup() {
            let obj1 = reactive({
                type: 'Java开发工程师',
                salary: 15000
            })
            let arr = reactive(['100','200',300])
            
            function modifyJob() {
                console.log(obj)
                console.log(obj.value)
                obj.value.type = '前端开发工程师'
                obj.value.salary = 20000

                console.log(obj1)
                obj1.type = '会计'
                obj1.salary = 5000

                arr[0] = '999'
            }

            //返回一个对象
            return {
                obj1,
                arr,
                introduce,
                modifyJob
            }
        }
    }
</script>
```



### 响应式数据原理

#### vue2

![image-20220619221747826](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206192217442.png)

```js
this.$set | this.$delete
Vue.set | Vue.delete

//通过数组下标修改
Vue.set(obj.age,0,18)
obj.splice() //数组api修改
```

```js
let obj = {
        id: 3434234354,
        age: 22
    }

    let p = {}
    Object.defineProperty(p, 'id', {
        configurable: true,
        get() {
            return obj.name
        },
        set(v) {
            console.log('修改了id属性')
            obj.name = v
        }
    })
    Object.defineProperty(p, 'age', {
        configurable: true,
        get() {
            return obj.age
        },
        set(v) {
            console.log('修改了age属性')
            obj.age = v
        }
    })
```

![image-20220620231652237](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206202316004.png)

#### vue3

-----

147。。
