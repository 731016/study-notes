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



## 常用的组合式Api

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

#### 注意

不使用props接收的值会在$attrs里面

插槽存在$slots里面，虚拟dom $VNOTE



##### setup的执行时机

+ 在beforeCreate之前执行一次，this是undefined

##### setup的参数

+ props：值为对象，包含；组件外部传递进来，且组件内部声明接收了的属性

+ content：上下为对象

​	attrs：值为对象，包含：组件外部传递进来，但没有在props配置中声明的属性，相当于this.$attrs

​	slots：收到的插槽内容，相当于this.$slots

​	emit：分发自定义事件的函数，相当于this.$emit

```js
#App.vue
<template>
    <div class="app">
        <h2>我是app组件</h2>
        <Demo school="湖北工程学院" no="125" @hello="helloMsg">
            <span>涂鏊飞</span>
            <template v-slot:tuaofei>
                <span>172</span>
            </template>
        </Demo>
    </div>
</template>

<script>
    import Demo from "./components/Demo";

    export default {
        name: 'App',
        components: {
            Demo
        },
        setup() {

            function helloMsg(value) {
                alert(`触发了hello事件，接收到消息${value}`)
            }

            return {
                helloMsg
            }
        }
    }
</script>
<style>
    .app {
        background-color: gray;
        padding: 10px;
    }
</style>
```

```js
#Demo.vue
<template>
    <div class="demo">
        <h2>我是Demo组件</h2>
        <button @click="test">触发hello自定义事件</button>
    </div>
</template>

<script>
    import {ref} from "vue";

    export default {
        name: 'Demo',
        props:['school','no'],
        emits:['hello'],
        beforeCreate() {
            console.log('---beforeCreate---')
            console.log(this)
        },
        setup(props,content) {
            console.log('---setup---')
            console.log(props,content)
            let obj = ref({
                type: 'Java开发工程师',
                salary: 15000
            })

            function test() {
                content.emit('hello',666)
            }

            //返回一个对象
            return {
                obj,
                test
            }
        }
    }
</script>
<style>
    .demo {
        background-color: gold;
        padding: 10px;
    }
</style>
```

![image-20220623214848348](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232148202.png)

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



### reactive与ref对比

#### **定义数据角度**

ref定义：**基本类型数据**

reactive定义：**对象（或数组）类型数据**

ref也可以定义对象（或数组）类型数据，它内部会自动通过`reactive`转为**代理对象**

#### 原理角度

ref通过Object.deineProperty()的get与set来实现响应式（数据劫持）

reactive通过`Proxy`实现响应式（数据劫持），并通过`Reflect`操作源对象内部的数据

#### 使用角度

ref定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`

reactive定义的数据：操作数据与读取数据：**均不需要**`.value`

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

通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、添加、删除

通过Reflect（反射）：对源对象的属性进行操作

```js
const p = new Proxy(obj, {
    	//target源对象，propName属性名，receiver代理对象
        get(target, propName, receiver) {
            console.log(`读取${propName}属性`)
            return target[propName]
        },
        set(target, propName, value, receiver) {
            console.log(`修改${propName}属性`)
            target[propName] = value
        },
        deleteProperty(target, propName) {
            console.log(`删除${propName}属性`)
            delete target[propName]
        }
    })
```

![image-20220621232530939](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206212325016.png)

```js
let obj = {a: 1, b: 2}
    Reflect.set(obj, 'a', 100)
    Reflect.get(obj, 'a', 100)
    Reflect.deleteProperty(obj, 'a')

const r1 = Reflect.defineProperty(obj, 'b', {
        get() {
            return 3
        },
        set(value) {
            obj.b = value
        }
    })
    console.log(r1)
    const r2 = Reflect.defineProperty(obj, 'b', {
        get() {
            return 4
        },
        set(value) {
            obj.b = value
        }
    })
    console.log(r2)
```



### computed计算属性

```js
<div class="demo1">
        职位：
        <input type="text" v-model="obj.type">
        薪资：
        <input type="text" v-model="obj.salary">
        全名
        <input class="fill_name" v-model="obj.fullName">
    </div>
import {reactive, computed} from "vue";

    export default {
        name: 'Demo',
        setup(props, content) {
            let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000
            })

            obj.fullName = computed(() => {
                return obj.type + '@@@' + obj.salary
            })

            obj.fullName = computed({
                get(){
                    return obj.type + '@@@' + obj.salary
                },
                set(value){
                    const fillName = value.split('@@@')
                    obj.salary = fillName[1]
                    obj.type = fillName[0]
                }
            })

            //返回一个对象
            return {
                obj
            }
        }
    }
```

![image-20220623221049161](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232210676.png)



### watch监视属性



#### 监视ref

```html
<div class="demo2">
        <h2>求和：{{sum}}</h2>
        <button @click="sum++">加1</button>
    </div>
    <div class="demo3">
        <h2>求和：{{msg}}</h2>
        <button @click="msg+='?'">修改msg</button>
    </div>
<script>
import {ref, reactive, computed, watch} from "vue";
    setup(props, content) {
            let sum = ref(0)
            let msg = ref("xxx")
            //简写形式 监视ref定义的一个响应式数据【情况一】
            watch(sum,(newValue,oldValue)=>{
                console.log(newValue, oldValue)
            })
        	//监视ref定义的多个响应式数据【情况二】
            watch([sum, msg], (newValue, oldValue) => {
                console.log(newValue, oldValue)
            }, {immediate: true, deep: true})
            //返回一个对象
            return {
                obj,
                sum,
                msg
            }
</script>
```

![image-20220623223106772](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232231011.png)

#### 监视reactive

```html
<div class="demo1">
        职位：
        <input type="text" v-model="obj.type">
        薪资：
        <input type="text" v-model="obj.salary">
     	<input v-model="obj.job.a">
        <button @click="obj.type = 'java开发'">修改职位</button>
        <button @click="obj.salary = '$10000'">修改薪资</button>
    	<button @click="obj.job.a++">修改对象obj里面的a属性</button>
    </div>
<script>
		setup(props, content) {

            let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000,
                job:{
                    a:'111'
                }
            })
            //监视reactive定义的数据的全部属性【情况三】
            //1.无法获取oldValue 2.深度监视配置无效
            watch(obj,(newValue,oldValue)=>{
                console.log(newValue, oldValue)
            },{deep:false})
            //返回一个对象
            return {
                obj,
            }
        }
    }
    </script>
```

![image-20220623224950137](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232249567.png)

```html
薪资：
<input type="text" v-model="obj.salary">
<button @click="obj.salary++">修改薪资</button>
<script>
    setup(){
        let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000,
                job: {
                    a: '111'
                }
            })
    //监视reactive定义的数据的某个属性【情况四】
			watch(() => {
                return obj.salary
            }, (newValue, oldValue) => {
                console.log(newValue, oldValue)
            })
    //监视reactive定义的数据的某些属性【情况五】
    watch(() => obj.salary,()=>obj.type, (newValue, oldValue) => {
                console.log(newValue, oldValue)
            })
        //特殊情况，监视的某个属性是对象时，需要配置deep【监视的是reactive的对象属性所以deep生效】
    watch(() => obj.job, (newValue, oldValue) => {
                console.log(newValue, oldValue)
            },{deep:true})
    }
</script>
```

![image-20220623225556117](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232255417.png)

![image-20220623230456909](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206232304653.png)

#### value的问题

```js
let obj1 = ref({
                type: 'Java开发工程师',
                salary: 15000,
                job: {
                    a: '111'
                }
            })
            let sum = ref(0)
            
            watch(sum,(newValue,oldValue)=>{
                console.log(newValue, oldValue)
            })

            watch(obj1, (newValue, oldValue) => {
                console.log(newValue, oldValue)
            }, {deep: false})
			
            watch(obj1.value, (newValue, oldValue) => {
                console.log(newValue, oldValue)
            })
```



### wactchEffect函数

不用指明要监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性

只要指定的回调中用到的数据发送变化，就重新执行回调

```js
import {ref, reactive, computed, watch,watchEffect} from "vue";
let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000,
                job: {
                    a: '111'
                }
            })
            let sum = ref(0)
            let msg = ref("xxx")
            watchEffect(()=>{
                const x =sum.value
                const salary = obj.salary
                console.log(x,salary)
            })
```

### vue3生命周期

![image-20220624224149640](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206242241887.png)



vue3可以继续使用vue2中的生命周期钩子，但有两个被更名

```js
beforeDestroy -> beforeUnmount
destroyed -> unmounted
```

vue3提供了组合式api形式的生命周期钩子

```js
beforeCreate -> setup()
created -> setup()

beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeUnmount -> onBeforeUnmount
unmounted     -> onUnmounted
```

同时使用vue2的配置项和vue3的组合式api，vue3的<u>组合式api触发时机会比配置项早</u>

```js
setup(props, content) {
            onBeforeMount(()=>{
                
            })
            onMounted(()=>{
                
            })
            onBeforeUpdate(()=>{
                
            })
            onUpdated(()=>{
                
            })
            onBeforeUnmount(()=>{
                
            })
            onUnmounted(()=>{
                
            })
}
```



### 自定义hook函数

本质是一个函数，把setup中使用的组合式api进行封装

类似于vue2中的mixin

```js
import {reactive, onMounted, onBeforeUnmount} from 'vue'

export default function () {
    let point = reactive({
        x: 0,
        y: 0
    })

    function savePoint(event) {
        point.x = event.pageX
        point.y = event.pageY
        console.log(event.pageX, event.pageY)
    }

    onMounted(() => {
        window.addEventListener('click', savePoint)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('click', savePoint)
    })

    return point
}
-------------------------------------------------------
#使用
import usePoint from "./hooks/usePoint";
setup(){
    const point = usePoint()
    return{
        point
    }
}
```



### toRef

作用：创建一个ref对象，其value值指向另一个对象中的某个属性

语法：`const name = toRef(person,'name')`

应用：将响应式对象中的某个属性单独提供给外部使用

扩展：toRefs与toRef功能一致，但可以批量创建多个对象，语法：`toRefs(person)`（一层）

```html
        <h1>{{obj}}</h1>
        <h2>职位：{{type}}</h2>
        <h2>薪资：{{salary}}</h2>
        <h3>a:{{a}}</h3>
        <button @click="type = obj.type+='!'">修改职位</button>
        <button @click="salary++">修改薪资</button>
        <button @click="a++">修改对象obj里面的a属性</button>
<script>
setup() {
            let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000,
                job: {
                    a: '111'
                }
            })

            //返回一个对象
            return {
                obj,
                ...toRefs(obj),
                'a': toRef(obj.job, 'a')
                //不能这样使用，ref对属性进行包装生产新的ref对象不指向原来的对象属性
                'a':ref(obj.job,'a')
            }
        }
    </script>
```



## 不常用的Composition API

### shallowReactive

只处理对象最外层属性的响应式

### shallowRef

只处理基本数据类型的响应式，不进行对象的响应式处理



直接替换传入的对象，可以触发页面更新



**使用场景？**

有一个对象数据，结构比较深，但变化时只是外层属性变化 -> shallowReactive

有一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换 -> shallowRef



----

### readonly

让响应式数据变为只读的（深只读）

### shallowReadonly

让响应式数据变为只读的（浅只读）



**使用场景？**

不希望数据被修改时

---

### toRaw

作用：将一个由`reactive`生成的响应式对象转为普通对象，对ref无效

使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新

### markRaw

作用：标记一个对象，使其永远不会再成功响应式对象

使用场景：

	1. 有些值不应被设置为响应式的，例如复杂的第三方类库axios
	1. 当渲染具有不可变数据源的大列表时，跳过响应式转换课提高性能

```html
<template>
    <div class="demo1">
        <h3 v-show="obj.car">车的信息{{obj.car}}</h3>
        <button @click="addCar()">添加一台车</button>
        <button @click="modifyCarName()">修改车的名字</button>
        <button @click="modifyCarPrice()">修改车的价格</button>
    </div>
</template>

<script>
    import {
        reactive,
        markRaw
    } from "vue";

    export default {
        name: 'Demo',
        setup() {
            let obj = reactive({
                type: 'Java开发工程师',
                salary: 15000,
                job: {
                    a: '111'
                }
            })

            function addCar() {
                let car = {name: '本田', price: 40}
                obj.car = markRaw(car)
            }

            function modifyCarName() {
                obj.car.name += '?'
                console.log(obj.car.name)
            }

            function modifyCarPrice() {
                obj.car.price --
                console.log(obj.car.price)
            }

            //返回一个对象
            return {
                obj,
                addCar,
                modifyCarName,
                modifyCarPrice
            }
        }
    }
</script>
```



### customRef

```html
<template>
    <h2>我是Test组件</h2>
    <input type="text" v-model="text">
    <h3 v-show="text">{{test}}</h3>
</template>

<script>
    import {customRef} from 'vue'

    export default {
        name: "Test",
        setup() {
            let text = myRef('hello', 500)

            function myRef(value, delay) {
                let timer
                return customRef((track, trigger) => {
                    return {
                        get() {
                            track()
                            return value
                        },
                        set(newValue) {
                            clearTimeout(timer)
                            timer = setTimeout(() => {
                                value = newValue
                                trigger()
                            }, delay)
                        }
                    }
                })
            }

            return {
                text
            }
        }
    }
```



### provide,inject

实现祖孙组件间通信

父组件有一个provide选项来提供数据，后代组件有一个inject选项来使用

```js
#祖组件
setup(){
    let car = reactive({name:'本田',parce:30})
    provide('car',car)
}
#孙组件
const = inject('car')
return {car}
```



### 响应式数据的判断

`isRef`检查值是否为一个 ref 对象

`isReactive`检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的响应式代理

`isReadonly`检查对象是否是由 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的只读代理

`isProxy`检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的 proxy



## Composition API 与 Option 



传统的配置式api，新增或修改需求，需要修改data，methods，computed

组合式api可以使代码，函数及相关功能代码在一起

## API

## 新的组件

### Fragment

在vue2中：组件必须有一个根标签

在vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中

好处：减少标签层级，减小内存占用

![image-20220627205554726](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206272055920.png)



### Teleport

一种可以将组件html结构移动到指定位置的技术

```html
<Teleport to="移动位置">
            html结构
</Teleport>
```



```html
#App.vue
<template>
    <div class="app">
        <h2>我是app组件</h2>
        <Test></Test>
    </div>
</template>

<script>
    import Test from "./components/Test";

    export default {
        name: 'App',
        components: {
            Test
        }
    }
</script>
<style>
    .app {
        background-color: red;
        padding: 10px;
    }
</style>
```

```html
#Test.vue
<template>
    <div class="test">
        <h2>我是Test组件</h2>
        <Demo></Demo>
    </div>
</template>

<script>
    import Demo from "./Demo";

    export default {
        name: "Test",
        components: {
            Demo
        }
    }
</script>

<style scoped>
    .test {
        background-color: yellow;
        padding: 10px;
    }
</style>
```

```html
#Deno.vue
<template>
    <div class="demo">
        <h3>我是Demo组件</h3>
        <button @click="open()">点击弹窗</button>
        <Teleport to="body">
            <div v-show="flag" class="mark">
                <div class="popUp">
                    <h3>内容</h3>
                    <h3>内容1</h3>
                    <h3>内容2</h3>
                    <h3>内容3</h3>
                    <h3>内容4</h3>
                    <button @click="close()">点击关闭</button>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script>
    import {ref, Teleport} from 'vue'

    export default {
        name: 'Demo',
        setup() {
            let flag = ref(false)

            function open() {
                flag.value = true
            }

            function close() {
                flag.value = false
            }

            return {
                flag,
                open,
                close,
                Teleport
            }
        }
    }
</script>
<style>
    .demo {
        background-color: blue;
        padding: 10px;
    }

    .mark {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .popUp {
        position: absolute;
        top: 50%;
        left: 50%;
        right: 0;
        bottom: 0;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        text-align: center;
        background-color: greenyellow;
    }
</style>
```

![image-20220627214533106](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202206272145625.png)



### Suspence

等待异步组件渲染一些额外内容

+ 异步引入组件

  ```js
  import {defineAsyncComponent} from 'vue'
  const Demo = defineAsyncComponent(() => import('./components/Demo'))
  ```

  

+ 使用`Suspence`包裹组件，并配置好`default`与`fallback`

```html
<Suspense>
            <template v-slot:default>
                <Demo></Demo>
            </template>
            <template v-slot:fallback>
                加载中。。。
            </template>
        </Suspense>
```



## 全局api的修改

[事件 API | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/migration/events-api.html)

| 2.x 全局 API               | 3.x 实例 API (`app`)                                         |
| -------------------------- | ------------------------------------------------------------ |
| Vue.config                 | app.config                                                   |
| Vue.config.productionTip   | *移除* ([见下方](https://v3.cn.vuejs.org/guide/migration/global-api.html#config-productiontip-移除)) |
| Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement ([见下方](https://v3.cn.vuejs.org/guide/migration/global-api.html#config-ignoredelements-替换为-config-iscustomelement)) |
| Vue.component              | app.component                                                |
| Vue.directive              | app.directive                                                |
| Vue.mixin                  | app.mixin                                                    |
| Vue.use                    | app.use ([见下方](https://v3.cn.vuejs.org/guide/migration/global-api.html#插件开发者须知)) |
| Vue.prototype              | app.config.globalProperties ([见下方](https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-替换为-config-globalproperties)) |
| Vue.extend                 | *移除* ([见下方](https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-extend-移除)) |

所有其他不全局改变行为的全局 API 现在都是具名导出，文档见[全局 API Treeshaking](https://v3.cn.vuejs.org/guide/migration/global-api-treeshaking.html)。



## 其他修改

data选择始终被声明为一个函数



过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。



不再支持使用数字 (即键码) 作为 `v-on` 修饰符

不再支持 `config.keyCodes`



`v-on` 的 `.native` 修饰符已被移除



从 Vue 3.0 开始，过滤器已移除，且不再支持。





