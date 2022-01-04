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
> + 数组写法 :style="{fontSize:xxx}" xxx是动态值
>
> + 对象写法 :style="[a,b]" a,b是<u>样式对象</u>
>
>   **样式对象：**
>
>   <img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112302226467.png" alt="image-20211230222623754" style="zoom:80%;" />

## 条件渲染

> `v-show`=xxx `display:none`隐藏样式（xxx为布尔值）
>
> `v-if`=xxx 删除结点,不展示的dom被移除。适用于切换频率较低的场景
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

