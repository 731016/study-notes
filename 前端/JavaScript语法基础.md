# 认识javascript

一种运行在**客户端**的**脚本**语言，不需要编译，由解释器逐行解释并运行

也可以基于 Node.js 技术进行服务器端编程

 

<span style="font-weight:700;color:blue">作用</span>

- 表单动态校验（密码强度检测）     （ <span style="color:red">JS 产生最初的目的</span> ）
- 网页特效
- 服务端开发(Node.js)
- 桌面程序(Electron)
- App(Cordova) 
- 控制硬件-物联网(Ruff)
- 游戏开发(cocos2d-js)

 

<span style="font-weight:700;color:blue">HTML/CSS/JS 的关系</span>

html/css 标记语言 -- **描述类语言**

js 脚本语言 -- **编程类语言**

 

<span style="font-weight:700;color:blue">浏览器执行 JS 简介</span>

浏览器分为**渲染引擎和js引擎**

（1）渲染引擎：用来解析html与css，称为内核（blink，webkit）

（2）js引擎：也称为js解释器，用来读取网页中的javascript代码，对其处理后运行（v8）

> 浏览器本身并不会执行JS代码，而是通过内置 JavaScript 引擎(解释器) 来执行 JS 代码 。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机去执行，所以 JavaScript 语言归为脚本语言，会逐行解释执行  

 

<span style="font-weight:700;color:blue">js的组成</span>

**ECMAscript**（javascript语法）、**DOM**（页面文档对象模型）、**BOM**（浏览器对象模型）

| ECMAscript | https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview |
| :--------- | ------------------------------------------------------------ |
| DOM        | 通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等） |
| BOM        | 通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等 |

<span style="font-weight:700;color:blue">书写位置</span>

行内、内嵌、外部

```html
<input type="button" value="123" onclick="alert('123')">（行内式）
<script>alert('123')</script>（内嵌）
<script src="url"></script>（外联）
```

在HTML中我们推荐使用<span style="font-weight:700;color:red">双引号</span>, JS 中我们推荐使用<span style="font-weight:700;color:red">单引号</span>



# javascript注释

<span style="font-weight:700;color:blue">单行注释</span>

 ```js
 // 单行注释 alt + /  
 ```

<span style="font-weight:700;color:blue">多行注释</span>

 ```js
 <!-- 多行注释
 	alt + shift + a -->
 ```

<span style="font-weight:700;color:blue">vscode修改快捷键</span>

*vscode* *→* *首选项按钮* *→* *键盘快捷方式* *→* *查找* *原来的快捷键* *→* *修改为新的快捷键* *→* *回车确认*

# javascript输入输出语句

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>方法</th>
        <th>说明</th>
        <th>归属</th>
    </tr>
    <tr style="background-color:#FADBD2">
        <td>alert(msg)</td>
        <td>浏览器弹出警示框</td>
        <td>浏览器</td>
    </tr>
    <tr style="background-color:#FADBD2">
        <td>console.log(msg)</td>
        <td>浏览器控制台打印输出信息</td>
        <td>浏览器</td>
    </tr>
    <tr style="background-color:#FADBD2">
        <td>prompt(info)</td>
        <td>浏览器弹出输入框，用户可以输入</td>
        <td>浏览器</td>
    </tr>
    <tr>
        <td>confirm</td>
        <td>浏览器弹出确认框，用户可以确认或取消</td>
        <td>浏览器</td>
    </tr>
</table>

<span style="font-weight:700;color:blue">注意</span>

alert() 主要用来显示消息给**用户**

console.log() 用来给**程序员**自己看运行时的消息

# 变量

变量是用于存放数据的**容器**。 我们通过 **变量名** 获取数据，甚至数据可以修改

 

变量是程序在内存中申请的一块用来存放数据的空间

## 变量的使用

<span style="font-weight:700;color:blue">声明变量</span>

```js
//声明一个 名称为age 的变量 
var age;
```

- var 是一个 JS关键字，用来声明变量( variable 变量的意思 )。计算机会自动为变量分配内存空间
- 通过变量名来访问内存中分配的空间

 

<span style="font-weight:700;color:blue">赋值</span>

  ```js
  //给 age  这个变量赋值为 10
  age = 10;
  ```

-  = 用来把右边的值赋给左边的变量空间中 此处代表赋值的意思
-  变量值是保存到变量空间里的值

 

<span style="font-weight:700;color:blue">变量的初始化</span>

```js
//声明一个变量并赋值， 我们称之为变量的初始化
//声明变量同时赋值为 18
var age  = 18;
```



<span style="font-weight:700;color:blue">变量语法扩展</span>

**更新变量**

一个变量被重新复赋值后，它原有的值就会被覆盖，变量值将以最后一次赋的值为准

```js
var age = 18;
//最后的结果就是81因为18 被覆盖掉了   
age = 81;
```



**同时声明多个变量**

同时声明多个变量时，只需要写一个 var， 多个变量名之间使用英文逗号隔开

 ```js
  var age = 10, name = 'zs', sex = 2;  
 ```

**声明变量特殊情况**

| **情况**                      | **说明**                 | **结果**  |
| ----------------------------- | ------------------------ | --------- |
| var age ; console.log (age);  | 只声明 不赋值            | undefined |
| console.log(age)              | 不声明 不赋值   直接使用 | 报错      |
| age  = 10; console.log (age); | 不声明 只赋值            | 10        |

 

<span style="font-weight:700;color:blue">变量命名规范</span>

**规则**：

- 由<span style="font-weight:700;color:red">字母</span>(A-Za-z)、<span style="font-weight:700;color:red">数字</span>(0-9)、<span style="font-weight:700;color:red">下划线</span>(_)、<span style="font-weight:700;color:red">美元符号</span>( $ )组成，如：usrAge, num01, _name
- 严格区分大小写。var app; 和 var App; 是两个变量
- 不能 以数字开头。 18age      是错误的
- 不能 是关键字、保留字。例如：var、for、while
- 变量名必须有意义。 MMD  BBD    nl  →       age 
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。myFirstName

<span style="font-weight:700;color:red">name尽量不要</span>使用



## let

ES6中新增了用于<span style="font-weight:700;background-color:yellow">声明变量</span>的关键字

<span style="font-weight:700;color:red">let声明的变量只在所处于的块级有效</span>

```js
if (true) { 
      let a = 10;
  }
 console.log(a) // a is not defined
```

**注意：**使用let关键字声明的变量才具有块级作用域，使用var声明的变量不具备块级作用域特性。

<span style="font-weight:700;color:red">不存在变量提升</span>

```js
console.log(a); // a is not defined 
 let a = 20;
```

<span style="font-weight:700;color:red">暂时性死区</span>

利用let声明的变量会绑定在这个块级作用域，**不会受外界的影响**

```js
var tmp = 123;
  if (true) { 
      tmp = 'abc';
      let tmp; 
  } 
```



**经典面试题**

```js
var arr = [];
  for (var i = 0; i < 2; i++) {
      arr[i] = function () {
          console.log(i); 
      }
  }
  arr[0]();
  arr[1]();
```

**经典面试题图解**

![image-20220223105411858](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231054916.png)

此题的关键点在于变量i是全局的，函数执行时输出的都是全局作用域下的i值



```js
let arr = [];
  for (let i = 0; i < 2; i++) {
      arr[i] = function () {
          console.log(i); 
      }
  }
  arr[0]();
  arr[1]();
```

**经典面试题图解**

![image-20220223105454353](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231054406.png)

此题的关键点在于**每次循环都会产生一个块级作用域**，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的i值



<span style="font-weight:700;color:red">小结</span>

- let关键字就是用来声明变量的
- 使用let关键字声明的变量具有块级作用域
- 在一个大括号中 使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的
- 防止循环变量变成全局变量
- 使用let关键字声明的变量没有变量提升
- 使用let关键字声明的变量具有暂时性死区特性



## const

<span style="font-weight:700;background-color:yellow">声明常量</span>，常量就是值（内存地址）不能变化的量

 

<span style="font-weight:700;color:red">具有块级作用域</span>

```js
if (true) { 
      const a = 10;
  }
 console.log(a) // a is not defined
```

<span style="font-weight:700;color:red">声明常量时必须赋值</span>

```js
const PI; // Missing initializer in const declaration
```

<span style="font-weight:700;color:red">常量赋值后，值不能修改</span>

```js
const PI = 3.14;
 PI = 100; // Assignment to constant variable.
 ​
 const ary = [100, 200];
 ary[0] = 'a';
 ary[1] = 'b';
 console.log(ary); // ['a', 'b']; 
 ary = ['a', 'b']; // Assignment to constant variable.
```

<span style="font-weight:700;color:blue">小结</span>

- const声明的变量是一个常量
- 既然是常量不能重新进行赋值，如果是<span style="color:red">基本数据类型，不能</span><span style="font-weight:700;color:red">更改值</span>，如果是<span style="color:red">复杂数据类型，不能</span><span style="font-weight:700;color:red">更改地址值</span>
- 声明 const时候**必须要给定值**

 

<span style="font-weight:700;color:blue">let、const、var 的区别</span>

- 使用 var 声明的**变量**，其作用域为该语句所在的**函数内**，且**存在变量提升**现象
- 使用 let 声明的**变量**，其作用域为该语句所在的**代码块内**，**不存在变量**提升
- 使用 const 声明的是**常量**，在后面出现的代码中**不能再修改该常量的值**

![image-20220223105722004](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231057063.png)



## 数据类型

JavaScript 是一种**弱类型**或者说动态语言

 

变量的数据类型是由 JS引擎 根据 = **右边变量值的数据类型**来<span style="font-weight:700;color:red">判断</span> 的，运行完毕之后， 变量就确定了数据类型

 

<span style="font-weight:700;color:blue">数据类型的分类</span>

- 简单数据类型 （<span style="font-weight:700;color:red">Number,String,Boolean,Undefined,Null</span>）
- 复杂数据类型 （<span style="font-weight:700;color:red">object</span>)

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>简单数据类型</th>
        <th>说明</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td style="font-weight:700">Number</td>
        <td>数字型，包含 整数值和浮点型值，如21，0.21</td>
        <td>0</td>
    </tr>
    <tr>
        <td style="font-weight:700">Boolean</td>
        <td>布尔值类型，如true，false，等价于1和0</td>
        <td>false</td>
    </tr>
    <tr>
        <td style="font-weight:700">String</td>
        <td>字符串类型，如"张三"，用户可以输入</td>
        <td>""</td>
    </tr>
    <tr>
        <td style="font-weight:700">Undefined</td>
        <td>var a;声明了变量a 但是没有赋值，此时a=indefined</td>
        <td>Undefined</td>
    </tr>
    <tr>
        <td style="font-weight:700">Null</td>
        <td>var a=null;声明变量a为空值</td>
        <td></td>
    </tr>
</table>

<span style="font-weight:700;color:blue">数字型 Number</span>

JavaScript 数字类型既可以保存**整数**，也可以保存**小数**(浮点数）

 

（1）**数字型进制**

最常见的进制有二进制、八进制、十进制、十六进制

 

（2）**数字型范围**

JavaScript中数值的最大和最小值

 

最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308

最小值：Number.MIN_VALUE，这个值为：5e-32

 

（3）**数字型三个特殊值**

**Infinity** ，代表无穷大，大于任何数值

**-Infinity** ，代表无穷小，小于任何数值

**NaN** ，Not a number，代表一个非数值

 

（4）isNaN

用来判断一个变量是否为非数字的类型，返回 true 或者 false

![image-20220223105912816](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231059866.png)

<span style="font-weight:700;color:blue">字符串型 String</span>

字符串型可以是引号中的任意文本，其语法为 **双引号** "" 和 **单引号**''

 

（1）**字符串引号嵌套**

JS 可以用**单引号嵌套双引号** ，或者用**双引号嵌套单引号** (<span style="font-weight:700;background-color:yellow">外双内单，外单内双</span>)

```js
var strMsg = '我是"高帅富"程序猿';   // 可以用''包含""
var strMsg2 = "我是'高帅富'程序猿";  // 也可以用"" 包含''
```



（2）**字符串转义符**

类似HTML里面的特殊字符，字符串中也有特殊字符，我们称之为转义符。

转义符都是 <span style="font-weight:700;color:red">\ </span>开头的

 

常用的转义符及其说明如下：

| **转义符** | **解释说明**                    |
| ---------- | ------------------------------- |
| \n         | 换行符，n  是  newline   的意思 |
| \ \        | 斜杠  \                         |
| \'         | '  单引号                       |
| \"         | "双引号                         |
| \t         | tab 缩进                        |
| \b         | 空格 ，b   是   blank 的意思    |

 

（3）**字符串长度**

字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的 <span style="font-weight:700;color:red">length </span>属性可以获取整个字符串的长度

```js
var strMsg = "我是帅气多金的程序猿！";
alert(strMsg.length); // 显示 11
```



（4）**字符串拼接**

- 多个字符串之间可以使用 + 进行拼接，其拼接方式为 字符串 + 任何类型 = 拼接之后的新字符串

- 拼接前会把**与字符串相加的任何类型**转成<span style="font-weight:700;color:red">字符串</span>，再拼接成一个新的字符串

```js
//1.1 字符串 "相加"
alert('hello' + ' ' + 'world'); // hello world
//1.2 数值字符串 "相加"
alert('100' + '100'); // 100100
//1.3 数值字符串 + 数值
alert('11' + 12);     // 1112 
console.log('pink老师' + 18);        // 只要有字符就会相连 
var age = 18;
console.log('pink老师age岁啦');      // 这样不行哦
console.log('pink老师' + age);         // pink老师18
console.log('pink老师' + age + '岁啦'); // pink老师18岁啦
```



<span style="font-weight:700;color:blue">布尔型Boolean</span>

布尔类型有两个值：true 和 false ，其中 true 表示真（对），而 false 表示假（错）

布尔型和数字型相加的时候， true 的值为 1 ，false 的值为 0

```js
console.log(true + 1);  // 2
console.log(false + 1); // 1
```

<span style="font-weight:700;color:blue">Undefined和 Null</span>

一个声明后没有被赋值的变量会有一个默认值undefined ( 如果进行相连或者相加时，注意结果）

```js
var variable;
console.log(variable);           // undefined
console.log('你好' + variable);  // 你好undefined

console.log(11 + variable);     // NaN
console.log(true + variable);   //  NaN
```

一个声明变量给 null 值，里面存的值为空（学习对象时，我们继续研究null)

```js
var vari = null;
console.log('你好' + vari);  // 你好null
console.log(11 + vari);     // 11
console.log(true + vari);   //  1
```



### 获取变量的数据类型

`typeof` 可用来获取检测变量的数据类型

```js
var num = 18;
console.log(typeof num) // 结果 number
```

不同类型的返回值

![image-20220223110348072](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231103131.png)

<span style="font-weight:700;color:blue">字面量</span>

字面量是在**源代码中一个固定值的表示法**，通俗来说，就是字面量表示如何表达这个值。

- 数字字面量：8, 9, 10
- 字符串字面量：'黑马程序员', "大前端"
- 布尔字面量：true，false



### 数据类型转换

使用**表单、prompt** 获取过来的数据默认是<span style="font-weight:700;color:red">字符串类型</span>的，此时就不能直接简单的进行加法运算，而需要转换变量的数据类型

 

通常会实现3种方式的转换：

- 转换为字符串类型
- 转换为数字型
- 转换为布尔型



**转换为字符串**

| **方式**         | **说明**                     | **案例**                                              |
| ---------------- | ---------------------------- | ----------------------------------------------------- |
| toString()       | 转成字符串                   | var num=1; alert(num.toString());                     |
| String()强制转换 | 转成字符串                   | var num=1; alert(num.String());                       |
| 加号拼接字串     | 和字符串拼接的结果都是字符串 | var num=1; alert(num+"我是字符串");    alert(num+''); |

- toString() 和 String() 使用方式不一样
- 三种转换方式，更多第三种加号拼接字符串转换方式，     这一种方式也称之为<span style="font-weight:700;color:red">隐式转换</span>



<span style="font-weight:700;color:green">转换为数字型</span>（重点）♥

| **方式**                 | **说明**                       | **案例**            |
| ------------------------ | ------------------------------ | ------------------- |
| parseInt(string)函数     | 将string类型 转成 整数数值型   | parseInt('78')      |
| parseFloat(string)函数   | 将string类型 转成 浮点数值型   | parseFloat('78.21') |
| Number()强制转换函数     | 将string类型转换成数值型       | Number('12')        |
| js隐式转换（**- \* /**） | 利用算术运算符隐式转换为数值型 | '12'-0              |

- 注意 parse**I**nt 和 parse**F**loat 单词的大小写，这2个是重点
- 隐式转换是我们在进行算数运算的时候，JS 自动转换了数据类型

<span style="font-weight:700;color:blue">转换为布尔型</span>

![image-20220223110622977](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231106017.png)

- 代表空、否定的值会被转换为 false ，如 ''、0、NaN、null、undefined 
- 其余值都会被转换为 true

```js
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('小白')); // true
console.log(Boolean(12)); // true
```



## Set数据结构

ES6 提供了<span style="font-weight:700;color:red">新的数据结构 Set</span>。它类似于数组，但是<span style="font-weight:700;color:red">成员的值都是唯一的</span>，没有重复的值。

**Set本身是一个构造函数**，用来生成 Set 数据结构

 ```js
 const s = new Set();
 ```

Set函数可以<span style="font-weight:700;color:red">接受一个数组作为参数</span>，用来初始化。

 ```js
 const set = new Set([1, 2, 3, 4, 4]);//{1, 2, 3, 4}
 ```

**size**查看set里面值的数量



<span style="font-weight:700;color:blue">实例方法</span>

- <span style="font-weight:700;color:red">add(value)</span>：添加某个值，返回 Set 结构本身
- <span style="font-weight:700;color:red">delete(value)</span>：删除某个值，返回一个布尔值，表示删除是否成功
- <span style="font-weight:700;color:red">has(value)</span>：返回一个布尔值，表示该值**是否为** **Set** **的成员**
- <span style="font-weight:700;color:red">clear()</span>：清除所有成员，没有返回值

```js
const s = new Set();
  s.add(1).add(2).add(3); // 向 set 结构中添加值 
  s.delete(2)             // 删除 set 结构中的2值   
  s.has(1)                // 表示 set 结构中是否有1这个值 返回布尔值 
  s.clear()               // 清除 set 结构中的所有值
  //注意：删除的是元素的值，不是代表的索引
```

<span style="font-weight:700;color:blue">遍历</span>

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。

```js
s.forEach(value => console.log(value))
```

forEach 方法会依次为集合中的元素执行回调函数，就算元素的值是 undefined 。



**回调函数**有三个参数:

- 元素的值
- 元素的索引
- 正在遍历的集合对象

但是由于集合对象中<span style="font-weight:700;color:red">没有索引(keys)</span>，所以前两个参数都是<span style="font-weight:700;color:red">Set</span>中元素的值(values)，之所以这样设计回调函数是为了和[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) 以及[Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)的 forEach 函数用法保持一致。



## 解释型语言和编译型语言

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">概述 </span>

计算机不能直接理解任何除机器语言以外的语言，所以必须要把程序员所写的程序语言翻译成机器语言才能执行程序。程序语言翻译成机器语言的工具，被称为**翻译器**

![image-20220303204421807](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032044020.png)

- 翻译器翻译的方式有两种：一个是<span style="color:red">编译</span>，另外一个是<span style="color:red">解释</span>。两种方式之间的区别在于<span style="background-color:yellow">翻译的时间点不同</span>
- **编译器**是在代码执行<span style="background-color:yellow">**之前**进行编译</span>，生成中间代码文件
- **解释器**是在运行时<span style="background-color:yellow">**进行**及时解释</span>，并立即执行(当编译器以解释方式运行的时候，也称之为解释器)

 <span style="color:#2E75B5;font-family:'Consolas';font-weight:700">执行过程</span>

![image-20220303204855300](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032048350.png)

## 关键字和保留字

 <span style="color:#2E75B5;font-family:'Consolas';font-weight:700">标识符</span>

标识(zhi)符：就是指开发人员为变量、属性、函数、参数取的名字

 

**标识符**<span style="color:red">不能是关键字或保留字</span>

 

 <span style="color:#2E75B5;font-family:'Consolas';font-weight:700">关键字</span>

关键字：是指 JS本身**已经使用**了的字，<span style="color:red">不能再用它们充当变量名、方法名</span>

 

包括：

<span style="font-family:Consolas">break、case、catch、continue、default、delete、do、else、finally、for、function、if、in、instanceof、new、return、switch、this、throw、try、typeof、var、void、while、with 等</span>

 

 <span style="color:#2E75B5;font-family:'Consolas';font-weight:700">保留字</span>

保留字：实际上就是**预留的“**<span style="color:red">关键字</span>”，意思是现在虽然还不是关键字，但是未来可能会成为关键字，同样不能使用它们当变量名或方法名

 

包括：

<span style="font-family:Consolas">boolean、byte、char、class、const、debugger、double、enum、export、extends、fimal、float、goto、implements、import、int、interface、long、mative、package、private、protected、public、short、static、super、synchronized、throws、transient、volatile 等</span>

 

注意：如果将保留字用作变量名或函数名，那么除非将来的浏览器实现了该保留字，否则很可能收不到任何错误消息。当浏览器将其实现后，该单词将被看做关键字，如此将出现关键字错误



## 运算符

### 算数运算符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">算术运算符概述</span>

算术运算使用的符号，用于执行两个变量或值的算术运算

![image-20220303205406136](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032054192.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">浮点数的**精度**问题</span>

浮点数值的最高精度是 17 位小数，但在进行算术计算时其精确度远远不如整数

```js
var result = 0.1 + 0.2;    // 结果不是 0.3，而是：0.30000000000000004
console.log(0.07 * 100);   // 结果不是 7，  而是：7.000000000000001
```

<span style="color:red;font-weight:700">不要直接判断两个浮点数是否相等 !</span>



<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">表达式和返回值</span>

表达式：是由数字、运算符、变量等以能求得数值的有意义排列方法所得的组合  表达式最终都会有一个结果，返回给开发者，称为返回值



### 递增和递减运算符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">递增和递减运算符概述</span>

在 JavaScript 中，递增（++）和递减（ -- ）既可以放在变量前面，也可以放在变量后面

放在变量前面时，我们可以称为前置递增（递减）运算符

放在变量后面时，我们可以称为后置递增（递减）运算符

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">递增运算符</span>

前置递增运算符

++num 前置递增，就是自加1，类似于 num = num + 1，但是 ++num 写起来更简单

使用口诀：先自加，后返回值

```js
var  num = 10;
alert(++num + 10);   // 21
```

后置递增运算符

num++ 后置递增，就是自加1，类似于 num = num + 1 ，但是 num++ 写起来更简单

使用口诀：先返回原值，后自加

```js
var  num = 10;
alert(10 + num++);  // 20
```

### 比较运算符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">比较运算符概述</span>

比较运算符（关系运算符）是两个数据进行比较时所使用的运算符，比较运算后，会返回一个布尔值（true / false）作为比较运算的结果

![image-20220303210042828](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032100876.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">等号比较</span>

![image-20220303210107601](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032101648.png)

```js
console.log(18 == '18');
console.log(18 === '18');
```

### 逻辑运算符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">逻辑运算符概述</span>

逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值。后面开发中经常用于多个条件的判断

![image-20220303210301261](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032103306.png)

逻辑与&&

两边都是 true才返回 true，否则返回 false

 

逻辑或 ||

两边都是 true才返回 true，否则返回 false

 

逻辑非 ！

逻辑非（!）也叫作取反符，用来取一个布尔值相反的值，如 true 的相反值是 false

```js
var isOk = !true;
console.log(isOk);  // false
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">短路运算（逻辑中断）</span>

**短路运算的原理**

当有多个表达式（值）时,**左边的表达式值可以确定结果**时,就<span style="background-color:yellow;font-family:'Consolas'">不再继续运算右边</span>的表达式的值

 

逻辑与

语法： 表达式1 && 表达式2

- 如果第一个表达式的值为**真**，则返回**表达式2**
- 如果第一个表达式的值为**假**，则返回**表达式1**

```js
console.log( 123 && 456 );        // 456
console.log( 0 && 456 );          // 0
console.log( 123 && 456&& 789 );  // 789
```

逻辑或

语法： 表达式1 || 表达式2

- 如果第一个表达式的值为**真**，则返回**表达式1**
- 如果第一个表达式的值为**假**，则返回**表达式2**

```js
console.log( 123 || 456 );         //  123
console.log( 0 ||  456 );          //  456
console.log( 123 || 456 || 789 );  //  123
```

### 赋值运算符

用来把数据赋值给变量的运算符

![image-20220303210538688](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032105739.png)

```js
var age = 10;
age += 5;  // 相当于 age = age + 5;
age -= 5;  // 相当于 age = age - 5;
age *= 10; // 相当于 age = age * 10;
```

### 运算符优先级

- 一元运算符里面的<span style="background-color:yellow;font-family:'Consolas';font-weight:700">逻辑非</span>优先级很**高**
- 逻辑与比逻辑或优先级高

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>优先级</th>
        <th>运算符</th>
        <th>顺序</th>
    </tr>
    <tr>
        <td><span style="font-weight: 700">1</span></td>
        <td>小括号</td>
        <td>()</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">2</span></td>
        <td>一元运算符</td>
        <td>++ -- !</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">3</span></td>
        <td>算术运算符</td>
        <td style="font-weight:700">先 * / % 后 + -</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">4</span></td>
        <td>关系运算符</td>
        <td>>= > < <=</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">5</span></td>
        <td>相等运算符</td>
        <td>== != === !==</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">6</span></td>
        <td>逻辑运算符</td>
        <td style="font-weight:700">先 && 后 ||</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">7</span></td>
        <td>赋值运算符</td>
        <td>=</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">8</span></td>
        <td>逗号运算符</td>
        <td>,</td>
    </tr>
</table>

## 流程控制

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">概念</span>

在一个程序执行的过程中，各条代码的执行顺序对程序的结果是有直接影响的

流程控制就是来控制代码按照一定结构顺序来执行

流程控制主要有三种结构

![image-20220303211420293](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032114357.png)

### 顺序流程控制

顺序结构是程序中最简单、最基本的流程控制，它没有特定的语法结构，程序会按照代码的先后顺序，依次执行，程序中大多数的代码都是这样执行的

### 分支流程控制

### 分支结构

由上到下执行代码的过程中，根据不同的条件，执行不同的路径代码（执行代码多选一的过程），从而得到不同的结果

 

JS 语言提供了两种分支结构语句：<span style="background-color:yellow;font-family:'Consolas'">if 语句、switch 语句</span>



**if语句**

```js
// 条件成立执行代码，否则什么也不做
if (条件表达式) {
    // 条件成立执行的代码语句
}
```

**执行流程**

![image-20220303211703771](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032117815.png)

**if else语句（双分支语句）**

```js
// 条件成立  执行 if 里面代码，否则执行else 里面的代码
if (条件表达式) {
    // [如果] 条件成立执行的代码
} else {
    // [否则] 执行的代码
}
```

**执行流程**

![image-20220303211738462](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032117510.png)

**if else if** **语句(多分支语句)**

```js
// 适合于检查多重条件。
if (条件表达式1) {
    语句1；
} else if (条件表达式2)  {
    语句2；
} else if (条件表达式3)  {
   语句3；
 ....
} else {
    // 上述条件都不成立执行此处代码
}
```

**执行逻辑**

![image-20220303211822653](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032118703.png)

### 三元表达式

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">语法结构</span>

```js
表达式1 ? 表达式2 : 表达式3;
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">执行思路</span>

- 如果表达式1为 true ，则返回表达式2的值，如果表达式1为 false，则返回表达式3的值
- 简单理解：     就类似于 if else （双分支） 的简写



### switch分支流程控制

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">语法结构</span>

```js
switch( 表达式 ){ 
    case value1:
        // 表达式 等于 value1 时要执行的代码
        break;
    case value2:
        // 表达式 等于 value2 时要执行的代码
        break;
    default:
        // 表达式 不等于任何一个 value 时要执行的代码
}
```

- switch ：开关     转换 ， case ：小例子 选项
- 关键字 switch 后面括号内可以是**表达式**或**值**，     通常是一个变量
- 关键字 case , 后跟一个选项的表达式或值，后面跟一个冒号
- switch 表达式的值会与结构中的 case 的值做比较     
- 如果存在匹配全等(===) ，则与该 case 关联的代码块会被执行，并在遇到 break 时停止，整个 switch 语句代码执行结束
- 如果所有的 case 的值都和表达式的值不匹配，则执行 default     里的代码

注意： **执行case里面的语句时，如果没有break，则继续执行下一个case里面的语句**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">switch 语句和 if else if 语句的区别</span>

- 一般情况下，它们两个语句可以相互替换
- switch...case 语句通常处理 case为比较确定值的情况， 而 if…else…语句更加灵活，常用于范围判断(大于、等于某个范围)
- switch 语句进行条件判断后直接执行到程序的条件语句，效率更高。而if…else 语句有几种条件，就得判断多少次。
- 当分支比较少时，if… else语句的执行效率比 switch语句高。
- 当分支比较多时，switch语句的执行效率比较高，而且结构更清晰。     



## 循环

### for循环

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">语法结构</span>

```js
for(初始化变量; 条件表达式; 操作表达式 ){
     //循环体
 }
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>名称</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>初始化变量</td>
        <td>通常被用于初始化一个计数器，该表达式可以使用 var 关键字声明新的变量，这个变量帮我们来记录次</td>
    </tr>
    <tr>
        <td>条件表达式</td>
        <td>用于确定每一次循环是否能被执行。如果结果是 true 就继续循环，否则退出循环</td>
    </tr>
    <tr>
        <td>操作表达式</td>
        <td>用于确定每一次循环是否能被执行。如果结果是 true 就继续循环，否则退出循环
</td>
    </tr>
</table>

执行条件表达式，如果为<span style="font-weight:700;color:green;font-family:'Consolas'">true</span>，则执行循环体语句，否则退出循环，循环结束

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">断点调试的流程：</span>

1、浏览器中按 F12--> sources -->找到需要调试的文件-->在程序的某一行设置断点

2、Watch: 监视，通过watch可以监视变量的值的变化，非常的常用

3、摁下F11，程序单步执行，让程序一行一行的执行，这个时候，观察watch中变量的值的变化

### 双重for循环

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">双重 for 循环语法</span>

```js
for (外循环的初始; 外循环的条件; 外循环的操作表达式) {
    for (内循环的初始; 内循环的条件; 内循环的操作表达式) {  
       需执行的代码;
   }
}
```

### while循环

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">语法结构</span>

```js
while (条件表达式) {
    // 循环体代码 
}
```

<span style="background-color:yellow;font-family:'Consolas'">先执行条件表达式</span>，如果结果为 <span style="font-weight:700;color:green;font-family:'Consolas'">true</span>，则执行循环体代码；如果为 <span style="font-weight:700;color:red;font-family:'Consolas'">false</span>，则退出循环，执行后面代码

### do-while循环

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">语法结构</span>

```js
do {
    // 循环体代码 - 条件表达式为 true 时重复执行循环体代码
} while(条件表达式);
```

<span style="background-color:yellow;font-family:'Consolas'">先执行一次**循环体**代码</span>

再执行条件表达式，如果结果为 <span style="font-weight:700;color:green;font-family:'Consolas'">true</span>，则继续执行循环体代码，如果为 <span style="font-weight:700;color:red;font-family:'Consolas'">false</span>，则退出循环，继续执行后面代码

### continue、break

**continue** 关键字用于立即跳出**本次循环**，继续下一次循环

**break** 关键字用于立即跳出**整个循环**（循环结束）



## 代码规范

变量、函数的命名必须要有意义

<span style="background-color:yellow;font-family:'Consolas'">变量</span>的名称一般用**名词**

<span style="background-color:yellow;font-family:'Consolas'">函数</span>的名称一般用**动词**



### 操作符规范

```js
// 操作符的左右两侧各保留一个空格
for (var i = 1; i <= 5; i++) {
   if (i == 3) {
       break; // 直接退出整个 for 循环，跳到整个for循环下面的语句
   }
   console.log('我正在吃第' + i + '个包子呢');
}
```

**关键词、操作符之间后加空格**

![image-20220303213456345](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032134396.png)

### 单行注释规范

```js
for (var i = 1; i <= 5; i++) {
   if (i == 3) {
       break; // 单行注释前面注意有个空格
   }
   console.log('我正在吃第' + i + '个包子呢');
}
```

## 数组

### 创建数组

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">利用<span style="color:#C00000;font-family:'Consolas';font-weight:700;">new</span>创建数组</span>

```js
var 数组名=new Array();
var arr=new Array(); //创建一个新的空数组
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">利用数组<span style="color:#C00000;font-family:'Consolas';font-weight:700;">字面量</span>创建数组</span>

```js
//1. 使用数组字面量方式创建空的数组
var  数组名 = [];
//2. 使用数组字面量方式创建带初始值的数组
var  数组名 = ['小白','小黑','大黄','瑞奇'];
```

- 数组的字面量是**方括号** **[ ]** 
- 声明数组并赋值称为数组的初始化

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">数组元素的类型</span>

数组中可以存放<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">任意类型</span>的数据，例如字符串，数字，布尔值等



### 获取数组中的元素

索引 (下标) ：用来访问数组元素的序号（数组下标从 0 开始）

数组可以通过索引来访问、设置、修改对应的数组元素，可以通过“数组名[索引]”的形式来获取数组中的元素

### 遍历数组

```js
var arr = ['red','green', 'blue'];
        for(var i = 0; i < arr.length; i++)
        {
            Console.log(arrStus[i]);
        }
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">数组的长度</span>

数组的长度：默认情况下表示数组中元素的个数

使用“<span style="color:red;font-family:'Consolas';font-weight:700;">数组名.length</span>”可以访问数组元素的数量（数组长度）

- 数组的length属性可以被修改
- 如果设置的length属性值**大于**数组的元素个数，则会在数组末尾**出现空白元素**
- 如果设置的length属性值**小于**数组的元素个数，则会把**超过该值的数组元素删除**

### 数组中的新增元素

**修改length长度**

 ```js
 数组.length=新的长度
 ```

**修改数组索引号**

```js
数组[ 数组.length ] = 新数据;
var arr=['涂','鏊','飞'];
        arr[arr.length]='胡';
        arr[arr.length]='梓';
        arr[arr.length]='卓';
        for(var i=0;i<arr.length;i++){
            console.log(arr[i]);
    }
```

### 数组方法**forEach**遍历数组

```js
arr.forEach(function(value, index, array) {
        //参数一是:数组元素
        //参数二是:数组元素的索引
        //参数三是:当前的数组
    })
    //相当于数组遍历的 for循环 没有返回值
```

### 数组方法filter过滤数组

```js
var arr = [12, 66, 4, 88, 3, 7];
var newArr = arr.filter(function(value, index, array) {
    //参数一是:数组元素
    //参数二是:数组元素的索引
    //参数三是:当前的数组
    return value >= 20;
});
console.log(newArr); //[66,88] //返回值是一个新数组
```

### 数组方法some

```js
some 查找数组中是否有满足条件的元素
var arr = [10, 30, 4];
var flag = arr.some(function(value, index, array) {
    //参数一是:数组元素
    //参数二是:数组元素的索引
    //参数三是:当前的数组
    return value < 3;
});
console.log(flag); //false返回值是布尔值,只要查找到满足条件的一个元素就立马终止循环
```

### some和forEach区别

- 如果查询数组中唯一的元素, 用some方法更合适,在some 里面 遇到 return true 就是终止遍历 迭代效率更高

- **在forEach,filter   里面 return 不会终止迭代**

### 解构赋值

ES6中允许从**数组中提取值**，按照对应位置，对变量赋值，**对象**也可以实现解构

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">数组解构</span>

```js
let [a, b, c] = [1, 2, 3];
  console.log(a)//1
  console.log(b)//2
  console.log(c)//3
 //如果解构不成功，变量的值为undefined
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">对象解构</span>

```js
let person = { name: 'zhangsan', age: 20 }; 
  let { name, age } = person;
  console.log(name); // 'zhangsan' 
  console.log(age); // 20
  let {name: myName, age: myAge} = person; // myName myAge 属于别名
  console.log(myName); // 'zhangsan' 
  console.log(myAge); // 20
```

**小结**

- 解构赋值就是把数据结构分解，然后给变量进行赋值
- 如果结构不成功，变量跟数值个数不匹配的时候，变量的值为**undefined**
- 数组解构用中括号包裹，多个变量用逗号隔开，对象解构用花括号包裹，多个变量用逗号隔开
- 利用解构赋值能够让我们方便的去取对象中的属性跟方法

### 剩余参数

剩余参数语法允许我们<span style="color:#C00000;font-family:'Consolas';font-weight:700;">将一个不定数量的参数表示为一个数组</span>，不定参数定义方式，这种方式很方便的去声明不知道参数情况下的一个函数

```js
function sum (first, ...args) {
      console.log(first); // 10
      console.log(args); // [20, 30] 
  }
  sum(10, 20, 30)
```

剩余参数和解构配合使用

```js
let students = ['wangwu', 'zhangsan', 'lisi'];
 let [s1, ...s2] = students; 
 console.log(s1);  // 'wangwu' 
 console.log(s2);  // ['zhangsan', 'lisi']
```



## 函数

**封装了一段可被重复调用执行的代码块**

通过此代码块可以**实现大量代码的重复使用**

### 函数的使用

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">声明函数</span>

```js
//声明函数（命名函数）
function 函数名(){
     //函数体代码
}
```

- function 是声明函数的关键字,必须**小写**
- 由于函数一般是为了实现某个功能才定义的，     所以通常我们将**函数名命名为动词**，比如 getSum

### 调用函数

```js
//调用函数
函数名(); //通过调用函数名来执行函数体代码
```

- 调用的时候千万不要忘记添加**小括号**
- 只有调用函数时才会执行函数体代码

```js
/* 1. 普通函数 */
function fn() {
    console.log('人生的巅峰');
}
fn();

/* 2. 对象的方法 */
var o = {
    sayHi: function() {
        console.log('人生的巅峰');
    }
}
o.sayHi();

/* 3. 构造函数*/
function Star() {};
new Star();

/* 4. 绑定事件函数*/
btn.onclick = function() {}; // 点击了按钮就可以调用这个函数

/* 5. 定时器函数*/
setInterval(function() {}, 1000);
这个函数是定时器自动1秒钟调用一次

/* 6. 立即执行函数(自调用函数)*/
    (function() {
    console.log('人生的巅峰');
})();
```

### 函数的封装

函数的封装是把一个或者多个功能通过函数的方式封装起来，对外**只提供一个简单的函数接口**

### 函数的参数语法

- 形参：函数定义时设置接收调用时传入
- 实参：函数调用时传入小括号内的真实数据

![image-20220303214742085](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032147150.png)

参数的作用 : 在函数内部某些值不能固定，我们可以通过参数在调用函数时传递不同的值进去

```js
// 带参数的函数声明
function 函数名(形参1, 形参2 , 形参3...) { // 可以定义任意多的参数，用逗号分隔
  // 函数体
}
// 带参数的函数调用
函数名(实参1, 实参2, 实参3...); 
```

- 调用的时候实参值是传递给形参的
- 形参简单理解为：不用声明的变量
- 实参和形参的多个参数之间用逗号（,）分隔

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">函数形参和实参数量不匹配时</span>

![image-20220303214827482](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203032148539.png)

注意：在JavaScript中，形参的默认值是undefined

**小结：**

- 函数可以带参数也可以不带参数
- 声明函数的时候，函数名括号里面的是形参，形参的默认值为 undefined
- 调用函数的时候，函数名括号里面的是实参
- 多个参数中间用逗号分隔
- 形参的个数可以和实参个数不匹配，但是结果不可预计，我们尽量要匹配

### 函数的返回值

返回值：函数调用整体代表的数据；函数执行完成后可以通过return语句将指定数据返回

```js
// 声明函数
function 函数名（）{
    ...
    return  需要返回的值；
}
// 调用函数
函数名();    // 此时调用函数就可以得到函数体内return 后面的值
```

- 在使用 return 语句时，函数会停止执行，并返回指定的值
- 如果函数没有 return ，返回的值是 undefined

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">break ,continue ,return 的区别</span>

- break ：结束当前的循环体（如 for、while）
- continue ：跳出本次循环，继续执行下次循环（如 for、while）
- return ：不仅可以退出循环，还能够返回 return 语句中的值，同时还可以结束当前的函数体内的代码

### arguments的使用

当<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">不确定</span>有多少个**参数**传递的时候，可以用arguments来获取

arguments为当前函数的**内置对象**，所有函数都内置了，arguments对象中存储了传递的所有实参

arguments展示形式是一个**伪数组**，可以进行遍历

- **具有length属性**
- **按索引方式存储数据**
- **不具有数组的push，pop等方法**

注意：在函数内部使用该对象，用此对象<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">获取函数调用时传递的实参</span>

```js
var argFun = function(...arguments) {
            var sum = 0;
            for (var i = 0; i < arguments.length; i++) {
                sum += arguments[i];
            }
            return sum;
        }
        var sum = argFun(1, 2, 3);
        console.log(sum);
```

### 函数的三种声明方式

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">自定义函数方式(命名函数)</span>

利用函数关键字 function 自定义函数方式

```js
// 声明定义方式
function fn() {...}
// 调用  
fn();
```

- 因为有名字，所以也被称为**命名**函数
- <span style="background-color:yellow;font-family:'Consolas';font-weight:400;">调用函数的代码</span>**既可以放到**声明函数的**前面**，也可以**放在**声明函数的**后面**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">函数表达式方式(匿名函数</span>

利用函数表达式方式的写法如下： 

```js
// 这是函数表达式写法，匿名函数后面跟分号结束
 var fn = function(){...}；
 // 调用的方式，函数调用必须写到函数体下面
 fn();
```

因为函数没有名字，所以也被称为**匿名**函数

- 这个fn 里面存储的是一个函数     
- 函数表达式方式原理跟声明变量方式是一致的
- **函数调用**的代码<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">必须写到函数体后面</span>

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">方式3 new Function()</span>

```js
var f = new Function('a', 'b', 'console.log(a + b)');
 f(1, 2);
 var fn = new Function('参数1','参数2'..., '函数体')
```

**注意**
 Function 里面参数都必须是**字符串格式**

 第三种方式执行效率低，也不方便书写，因此较少使用
 **所有函数都是** **Function** **的实例(对象)** 
 函数也属于对象

```js
//立即执行函数
    ( function(){} ());
    ( function(){} ) ();
```

### 递归

**递归：**如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。简单理解:函数内部自己调用自己, 这个函数就是递归函数

**注意：**递归函数的作用和循环效果一样，由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件return

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">利用递归求1~n的阶乘</span>

```js
 //利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
  function fn(n) {
      if (n == 1) { //结束条件
        return 1;
      }
      return n * fn(n - 1);
  }
  console.log(fn(3));
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">利用递归求斐波那契数列</span>

```js
// 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
 // 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
 // 我们只需要知道用户输入的n 的前面两项(n-1 n-2)就可以计算出n 对应的序列值
 function fb(n) {
   if (n === 1 || n === 2) {
         return 1;
   }
   return fb(n - 1) + fb(n - 2);
 }
 console.log(fb(3));
```

### 箭头函数

ES6中<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">新增</span>的定义函数的方式

```js
() => {} //()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体
 const fn = () => {}//代表把一个函数赋值给fn
```

函数体中**只有一句代码**，且代码的执行结果就是**返回值**，可以<span style="color:red;font-family:'Consolas';font-weight:700;">省略大括号</span>

```js
function sum(num1, num2) { 
      return num1 + num2; 
  }
  //es6写法
  const sum = (num1, num2) => num1 + num2;
```

如果**形参只有一个**，可以<span style="color:red;font-family:'Consolas';font-weight:700;">省略小括号</span>

```js
function fn (v) {
      return v;
  } 
 //es6写法
  const fn = v => v;
```

箭头函数<span style="color:red;font-family:'Consolas';font-weight:400;">不绑定this关键字</span>，箭头函数中的this，<span style="color:red;font-family:'Consolas';font-weight:700;">指向的是函数定义位置的上下文this</span>

**箭头函数不会创建自己的this,它只会从**<span style="color:red;font-family:'Consolas';font-weight:700;">自己的作用域链的上一层继承this。</span>

```js
const obj = { name: '张三'} 
  function fn () { 
      console.log(this);//this 指向 是obj对象
      return () => { 
          console.log(this);//this 指向 的是箭头函数定义的位置，那么这个箭头函数定义在fn里面，而这个fn指向是的obj对象，所以这个this也指向是obj对象
      } 
  } 
  const resFn = fn.call(obj); 
  resFn();
```

**小结**

- 箭头函数中不绑定this，箭头函数中的this指向是它所定义的位置，可以简单理解成，定义箭头函数中的作用域的this指向谁，它就指向谁
- 箭头函数的优点在于解决了this执行环境所造成的一些问题。比如：解决了匿名函数this指向的问题（匿名函数的执行环境具有全局性），包括setTimeout和setInterval中使用this所造成的问题

**面试题**

```js
var age = 100;
 var obj = {
     age: 20,
     say: () => {
         alert(this.age)
     }
 }
 obj.say();//箭头函数this指向的是被声明的作用域里面，而对象没有作用域的，所以箭头函数虽然在对象中被定义，但是this指向的是全局作用域
```

## 作用域

代码名称的可用性范围

 

**全局作用域**

整个script标签，单个js文件

 

**局部作用域**

函数内部

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">块级作用域 {}</span>

**函数外可以调用函数内部的局部变量**

es6新增

### 变量的作用域

**全局变量**

全局作用域下的变量

 

浏览器关闭时，才销毁

 

**在函数内部，**<span style="color:#C00000;font-family:'Consolas';font-weight:700;">没有直接声明，直接赋值的变量，也是全局变量</span>

 

**局部变量**

- 局部作用域下的变量，函数内部
- 只能在函数内部使用
- 形参也是局部变量

 

程序执行完毕，即销毁

### 作用域链

内部函数访问外部函数的变量，采用链式查找的方式

## 预解析
<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">概念</span>

JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的

JavaScript 解析器在运行 JavaScript 代码的时候

分为两步：<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">预解析</span>和代码执行

-   预解析：在当前作用域下, JS 代码执行之前，浏览器会默认把带有 var 和 function 声明的变量在内存中进行提前声明或者定义
-   代码执行： 从上到下执行JS语句

**预解析会把变量和函数的声明在代码执行之前执行完成**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">函数表达式声明函数问题</span>

函数表达式创建函数，会执行变量提升，此时接收函数的变量名无法正确的调用

![image-20220307134220655](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071342874.png)

### 变量预解析

预解析也叫做变量、函数提升

变量提升（变量预解析）： 变量的声明会被提升到当前作用域的最上面，变量的赋值不会提升

![image-20220307134315087](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071343138.png)

### 函数预解析

函数提升： <span style="background-color:yellow;font-family:'Consolas';font-weight:700;">函数的声明</span>会被提升到当前作用域的最上面，但是不会调用函数

![image-20220307134422528](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071344592.png)

```js
f1();
console.log(c);
console.log(b);
console.log(a);
function f1(){
  var a=b=c=9;
  console.log(a);
  console.log(b);
  console.log(c);
}
---------------------------------------
//相当于
function f1(){
  var a=9;b=9;c=9;
  console.log(a);
  console.log(b);
  console.log(c);
}
f1();
console.log(c);//打印全局变量c
console.log(b);//全局变量b
console.log(a);//局部变量a
```

![image-20220307134454079](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071344137.png)

## 对象

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">概念</span>

在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等

 

对象是由**属性**和**方法**组成的

- 属性：事物的特征
- 方法：事物的行为

```js
var obj = {
    "name":"张三疯",
    "sex":"男",
    "age":128,
    "height":154
}
```

### 创建对象的三种方式

属性是对象的一部分，而变量不是对象的一部分，变量是单独存储数据的容器

- 变量：单独声明赋值，单独存在
- 属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征

 

方法是对象的一部分，函数不是对象的一部分，函数是单独封装操作的容器

 

- 函数：单独存在的，通过“函数名()”的方式就可以调用
- 方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调用，方法用来描述该对象的行为和功能

#### 使用字面量创建对象

就是花括号 { } 里面包含了表达这个具体事物（对象）的属性和方法；{ } 里面采取键值对的形式表示

- 键：相当于属性名
- 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）

```js
var star = {
    name : 'pink',
    age : 18,
    sex : '男',
    sayHi : function(){
        alert('大家好啊~');
    }
};
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">对象的使用</span>

**对象的属性**

对象中存储**具体数据**的 "键值对"中的 "键"称为对象的属性，即对象中存储具体数据的项

###  

**对象的方法**

对象中存储**函数**的 "键值对"中的 "键"称为对象的方法，即对象中存储函数的项

 

**访问对象的属性**

对象里面的属性调用 : <span style="background-color:yellow;font-family:'Consolas';font-weight:700;">对象.属性名</span>

对象里面属性的另一种调用方式 : <span style="background-color:yellow;font-family:'Consolas';font-weight:700;">对象['属性名']</span>，注意方括号里面的属性必须加引号 
 示例代码如下：

```js
console.log(star.name)     // 调用名字属性
console.log(star['name'])  // 调用名字属性
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">调用对象的方法</span>

对象里面的方法调用：<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">对象.方法名()</span> ，注意这个方法名字后面一定加括号 
 示例代码如下：

```js
star.sayHi(); // 调用 sayHi 方法,注意，一定不要忘记带后面的括号
```



#### 利用new object创建对象

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">创建空对象</span>

```js
var andy = new Obect();
```

通过内置构造函数Object创建对象，此时andy变量已经保存了创建出来的空对象

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">给空对象添加属性和方法</span>

通过对象操作属性和方法的方式，来为对象增加属性和方法
 示例代码如下：

```js
andy.name = 'pink';
andy.age = 18;
andy.sex = '男';
andy.sayHi = function(){
    alert('大家好啊~');
}
```

**注意**：

- Object() ：第一个字母大写     
- new     Object() ：需要 new 关键字
- 使用的格式：对象.属性 = 值;



#### 利用构造函数创建对象

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">构造函数</span>

是一种特殊的函数，主要用来**初始化对象**，即为对象成员变量赋初始值，它总与 new 运算符一起使用



我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面

 

**构造函数的封装格式**：

```js
function 构造函数名(形参1,形参2,形参3) {
      this.属性名1 = 参数1;
      this.属性名2 = 参数2;
      this.属性名3 = 参数3;
      this.方法名 = 函数体;
}
```

**构造函数的调用格式**

```js
var obj = new 构造函数名(实参1，实参2，实参3);
```

以上代码中，obj即接收到构造函数创建出来的对象。

```js
function Hero(name,type,blood){
            this.name=name;
            this.type=type;
            this.blood=blood;
            this.Attack=function(attack){
                this.attack=attack;
            }
        }
        var lianpo=new Hero('廉颇','力量型','500血量');
        lianpo.Attack('近战');
        var houyi=new Hero('后裔','射手型','100血量');
        houyi.Attack('远程');
        console.log(lianpo,houyi);
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">注意事项</span>

1. 构造函数约定**首字母大写**。
2. 函数内的属性和方法前面需要添加     **this** ，表示当前对象的属性和方法
3. 构造函数中**不需要** **return** **返回结果**
4. 当我们创建对象的时候，**必须用** **new** **来调用构造函数**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">其他</span>

构造函数，如 Stars()，抽象了对象的公共部分，封装到了函数里面，它泛指某一大类（class） 创建对象，如 new Stars()，特指某一个，通过 new 关键字创建对象的过程我们也称为对象实例化

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">new关键字的作用</span>

1. 在构造函数代码开始执行之前，创建一个空对象
2. 修改this的指向，把this指向创建出来的空对象
3. 执行函数的代码
4. 在函数完成之后，返回this---即创建出来的对象



#### Object原型对象

在Object对象的**prototype对象里封装的函数**，这些函数可以被任何对象调用。

 ```js
 obj.hasOwnProperty(‘field’)：判断某对象是否含有特定的自身属性。
 
 obj2.isPrototypeOf（obj1）：判断一个对象是否存在于另一个对象的原型链上。
 
 obj.propertyIsEnumerable(‘field’)：判断一个对象的某一个属性是否是枚举类型的。
 
 obj.toLocaleString()：将一个对象转换为本地字符串。
 
 obj.toString()：将一个对象转换为字符串。
 
 obj.valueOf()：返回对象的值，一般由js引擎、Function、Object级别函数调用，请不要覆盖、调用。
 ```



### 遍历对象

<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">for...in</span> 语句用于对数组或者对象的属性进行循环操作

```js
for (变量 in 对象名字) {
    // 在此执行代码
}
```

语法中的变量是自定义的，它需要符合命名规范，通常我们会将这个变量写为 k 或者 key

```js
for (var k in obj) {
    console.log(k);      // 这里的 k 是属性名
    console.log(obj[k]); // 这里的 obj[k] 是属性值
}
```

### 面向过程与面向对象

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">面向过程</span>

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">面向对象</span>

面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">面向过程与面向对象对比</span>

|      | **面向过程**                                                 | **面向对象**                                                 |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 优点 | 性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程 | 易维护、易复用、易扩展，由于面向对象有**封装**、**继承**、**多态**性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护 |
| 缺点 | 不易维护、不易复用、不易扩展                                 | 性能比面向过程低                                             |



## Object.defineProperty

<span style="color:red;font-family:'Consolas';font-weight:700;">Object.defineProperty</span>设置或修改对象中的属性

![image-20220307135739115](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071357179.png)

```js
Object.defineProperty(对象， 修改或新增的属性名， {
        value: 修改或新增的属性的值,
        writable: true / false, //如果值为false 不允许修改这个属性值
        enumerable: false, //enumerable 如果值为false 则不允许遍历
        configurable: false //configurable 如果为false 则不允许删除这个属性 属性是否可以被删除或是否可以再次修改特性
    })
```

## global对象

![image-20220307135824458](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071358517.png)

```js
Eval 转换为表达式
IsNan 判断是否数字
EncodeURI 字符串编码
DecodeURI 解码
```

![image-20220307135912768](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071359829.png)

## 内置对象

JavaScript 中的对象分为3种：

- **自定义对象**
- **内置对象**
- **浏览器对象**

前面两种对象是JS 基础 内容，属于 ECMAScript； 第三个浏览器对象属于 JS 独有的

### 查文档

Mozilla 开发者网络（MDN）提供了有关开放网络技术（Open Web）的信息，包括 HTML、CSS 和万维网及 HTML5 应用的 API

MDN:https://developer.mozilla.org/zh-CN/

### Math对象

Math 对象<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">不是构造函数</span>，它具有**数学常数和函数的属性和方法**。跟数学相关的运算（求绝对值，取整、最大值等）可以使用 Math 中的成员

| **属性、方法名**      | **功能**                                 |
| --------------------- | ---------------------------------------- |
| Math.PI               | 圆周率                                   |
| Math.floor()          | 向下取整                                 |
| Math.ceil()           | 向上取整                                 |
| Math.round()          | 四舍五入版 就近取整 注意  -3.5 结果是 -3 |
| Math.abs()            | 绝对值                                   |
| Math.max()/Math.min() | 求最大和最小值                           |
| Math.random()         | 获取范围在[0,1)内的随机值                |

.5会取大的值，其他值都是四舍五入

```js
console.log('-1.5：'+Math.round(-1.5));
console.log('-1.6：'+Math.round(-1.6));
```

![image-20220307140122102](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071401167.png)

**获取指定范围内的随机整数**：

```js
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
这个值不小于 min（有可能等于），并且小于（不等于）max 
}
```

[得到一个两数之间的随机整数，包括两个数在内](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random#得到一个两数之间的随机整数，包括两个数在内)

```js
function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
        }

function getRandomNum(min, max) {
            return parseInt(Math.random() * (max - min + 1)) + min;
        }
```

### 日期对象

Date是一个<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">构造函数</span>，所以使用时**需要实例化**后才能使用其中具体方法和属性

Date 实例用来处理日期和时间

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">使用Date实例化日期对象</span>

**获取当前时间必须实例化**

```js
var now=new Date();
```

**获取指定时间的日期对象**

```js
var future = new Date('2019-5-1 18:03:00');
```

注意：如果创建实例时并未传入参数，则得到的日期对象是**当前时间对应的日期对象**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">使用Date实例的方法和属性</span>

![image-20220307140455859](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071404939.png)

```js
function DateTime() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1; // [0-11]
            let day = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let senconds = date.getSeconds();
            return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + senconds + '秒';
        }
        console.log(DateTime());
        let day = date.getDay(); //一周第几天
        let millisecond = date.getTime(); // 获取当前时间的毫秒值
        console.log(day);
        console.log(millisecond);
        let localTime = date.toLocaleDateString(); //获取本机时间
        console.log(localTime);
        let localdate = date.toLocaleTimeString(); //获取本机日期
        console.log(localdate);
        console.log(date.toLocaleString());
```

![image-20220307140520822](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071405881.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">通过Date实例获取总毫秒数</span>

**总毫秒数的含义**

基于1970年1月1日（世界标准时间）起的毫秒数

 

获取总毫秒数

```js
// 实例化Date对象
var now = new Date();
// 1. 用于获取对象的原始值
console.log(date.valueOf()) 
console.log(date.getTime()) 
// 2. 简单写可以这么做
var now = + new Date();         
// 3. HTML5中提供的方法，有兼容性问题
var now = Date.now();
```

![image-20220307140612689](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071406763.png)

```js
function countDown(time){
    var nowtime=+ new Date();
    var inputtime=+new Date(time);
    var counttime=(inputtime-nowtime)/1000;
    var d=parseInt(counttime/60/60/24);
    d=d<10?'0'+d:d;
    var h=parseInt(counttime/60/60%24);
    h=h<10?'0'+h:h;
    var m=parseInt(counttime/60%60);
    m=m<10?'0'+m:m;
    var s=parseInt(counttime%60);
    s=s<10?'0'+s:s;
    return d+'天'+h+'时'+m+'分'+s+'秒';
}
console.log(countDown('2021-3-21 18:30:00'));
```

![image-20220307140630776](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071406839.png)

```js
function  countDown(time) {
            var  nowtime = + new  Date();
            var  inputtime = +new  Date(time);
            var  counttime = (inputtime - nowtime) / 1000;
            var  d = parseInt(counttime / 60 / 60 / 24);
            d = d < 10 ? '0' + d : d;
            var  h = parseInt(counttime / 60 / 60 % 24);
            h = h < 10 ? '0' + h : h;
            var  m = parseInt(counttime / 60 % 60);
            m = m < 10 ? '0' + m : m;
            var  s = parseInt(counttime % 60);
            s = s < 10 ? '0' + s : s;
            return  d + '天' + h + '时' + m + '分' + s + '秒';
        }
        setInterval(function() {
            console.log(countDown('2021-7-12 17:18:00'));
        }, 1000);
```

### 数组对象

#### 创建数组的两种方式

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">字面量方式</span>

```js
var arr = [1,"test",true];
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">new Array()</span>

```js
var arr = new Array();
```

注意：上面代码中arr创建出的是一个空数组，如果需要**使用构造函数Array**<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">创建非空数组</span>，可以在创建数组时传入参数，参数传递规则如下：

- 如果只传入**一个参数**，则参数规定了**数组的长度**
- 如果传入了**多个参数**，则参数称为**数组的元素**

#### 检测是否为数组

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">instanceof 运算符</span>

判断一个对象是否是某个构造函数的实例

```js
var arr = [1, 23];
var obj = {};
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">Array.isArray()</span>

判断一个对象是否为数组，isArray() 是 HTML5 中提供的方法

```js
var arr = [1, 23];
var obj = {};
console.log(Array.isArray(arr));   // true
console.log(Array.isArray(obj));   // false
```

#### 添加删除数组元素的方法

![image-20220307141014432](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071410515.png)

#### 数组排序

![image-20220307141059301](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071410367.png)

注意：sort方法需要传入参数来设置升序、降序排序

- 如果传入“**function(a,b){ return a-b;}**”，则为升序
- 如果传入“**function(a,b){ return b-a;}**”，则为降序

#### 数组索引方法

![image-20220307141140053](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071411121.png)

**去除重复元素**

```js
function Delete_Duplicate_Elements(arr){
    var newarr=[];
    for(var i=0;i<arr.length;i++){
        if(newarr.indexOf(arr[i])==-1)
        {
            newarr.push(arr[i]);
        }
    }
    return newarr;
}
```

#### 数组转换为字符串

![image-20220307141233015](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071412085.png)

注意：join方法如果不传入参数，则按照 “<span style="background-color:yellow;font-family:'Consolas';font-weight:700;"> , </span>”拼接元素

#### 其他方法

![image-20220307141324125](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071413193.png)

#### Array的扩展方法

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">扩展运算符. . .（展开语法）</span>

扩展运算符可以将<span style="color:red;font-family:'Consolas';font-weight:700;">数组</span>或者<span style="color:red;font-family:'Consolas';font-weight:700;">对象</span>转为<span style="color:red;font-family:'Consolas';font-weight:700;">用逗号分隔的参数序列</span>

```js
let ary = [1, 2, 3];
  ...ary  // 1, 2, 3
  console.log(...ary);    // 1 2 3,相当于下面的代码
  console.log(1,2,3);
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">扩展运算符可以应用于<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">合并数组</span></span>

```js
// 方法一 
  let ary1 = [1, 2, 3];
  let ary2 = [3, 4, 5];
  let ary3 = [...ary1, ...ary2];
  // 方法二 
  ary1.push(...ary2);
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">将类数组或可遍历对象转换为真正的数组</span>

```js
let oDivs = document.getElementsByTagName('div'); 
 oDivs = [...oDivs];
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">构造函数方法：Array.<span style="color:red;font-family:'Consolas';font-weight:700;">from()</span></span>

将<span style="color:red;font-family:'Consolas';font-weight:700;">伪数组</span>或<span style="color:red;font-family:'Consolas';font-weight:700;">可遍历对象</span>**转换为真正的数组**

```js
//定义一个集合
 let arrayLike = {
     '0': 'a',
     '1': 'b',
     '2': 'c',
     length: 3
 }; 
 //转成数组
 let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

方法还可以接受第二个参数，作用类似于数组的map方法，**用来对每个元素进行处理**，将处理后的值放入返回的数组

```js
let arrayLike = { 
      "0": 1,
      "1": 2,
      "length": 2
  }
  let newAry = Array.from(arrayLike, item => item *2)//[2,4]
```

注意：如果是对象，那么属性需要写对应的索引

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例方法：<span style="color:red;font-family:'Consolas';font-weight:700;">find()</span></span>

用于找出**第一个**符合条件的数组成员，如果没有找到返回**undefined**

```js
let ary = [{
      id: 1,
      name: '张三'
  }, { 
      id: 2,
      name: '李四'
  }]; 
  let target = ary.find((item, index) => item.id == 2);//找数组里面符合条件的值，当数组中元素id等于2的查找出来，注意，只会匹配第一个
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例方法：<span style="color:red;font-family:'Consolas';font-weight:700;">findIndex()</span></span>

用于找出**第一个**符合条件的数组成员的**位置**，如果没有找到返回**-1**

```js
let ary = [1, 5, 10, 15];
 let index = ary.findIndex((value, index) => value > 9); 
 console.log(index); // 2
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例方法：<span style="color:red;font-family:'Consolas';font-weight:700;">includes()</span></span>

判断某个数组**是否包含**给定的值，返回**布尔值**。

```js
[1, 2, 3].includes(2) // true 
[1, 2, 3].includes(4) // false
```

### 获取对象的属性名

<span style="color:red;font-family:'Consolas';font-weight:700;">Object.keys</span>(对象) 获取到当前对象中的属性名 ，返回值是一个**数组**

```js
var obj = {
        id: 1,
        pname: '小米',
        price: 1999,
        num: 2000
    };
    var result = Object.keys(obj)
    console.log(result) //[id，pname,price,num]
```

## 字符串对象

![image-20220307142144297](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071421387.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">字符串的不可变性</span>

指的是里面的值不可变，虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间

避免大量拼接字符串！

![image-20220307142233200](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071422280.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">根据字符返回索引及发现次数</span>

```js
function lookup_element(str){
    var s=prompt('输入要查找的字符');
    var count=0;
    var index=str.indexOf(s);
    while(index !== -1){
        console.log(index);
        count++;
        index=str.indexOf(s,index+1);
    }
    console.log('0出现的次数：'+count);
}
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">根据位置返回字符</span>

![image-20220307142322869](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071423952.png)

![image-20220307142336369](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071423445.png)

![image-20220307142347763](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071423859.png)

![image-20220307142400035](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071424136.png)

```js
var str = new String('html');
        console.log(str.length); // 字符长度
        console.log(str.charAt(2)); // 返回指定位置的字符 参数为下标
        console.log(str.charCodeAt(2)); // 返回指定字符的unicode编码 参数下标
        console.log(str.concat('123456')); // 连接字符串
        console.log(str.slice(1, 3)); // 根据下标 返回字符串 包含前一个下标，不包含后一个下标
        console.log(str.substring(1, 3)); //  返回两个索引号之间的字符 包含前一个下标，不包含后一个下标
        console.log(str.substr(1, 1)); // 从第一个参数开始截取，后一个参数为要截取的长度
        console.log(str.indexOf('t')); // (从前往后)根据字符找到下标，未找到返回-1
        console.log(str.lastIndexOf('r')); // (从后往前)根据字符找到下标，未找到返回-1
        console.log(str.trim()); // 删除字符串两端空格
        console.log(str.toUpperCase()); //转大写
        console.log(str.toLowerCase()); // 转小写
        console.log(str.split('t')); //分割字符串数组
        console.log(str.split('t')[0]); //分割字符串数组
        console.log(str.split('t')[1]); //分割字符串数组
```

![image-20220307142420063](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071424132.png)

### **trim**方法去除字符串两端的空格

**返回新字符串**

```js
var str = '   hello   '
console.log(str.trim()) //hello 去除两端空格
var str1 = '   he l l o   '
console.log(str.trim()) //he l l o  去除两端空格
```

### String的扩展方法

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">模板字符串</span>

ES6新增的**创建字符串**的方式，使用<span style="color:red;font-family:'Consolas';font-weight:700;">反引号``</span>定义

 ```js
 let name = `zhangsan`;
 ```

模板字符串中可以**解析变量**

```js
let name = '张三'; 
 let sayHello = `hello,my name is ${name}`; // hello, my name is zhangsan
```

模板字符串中**可以换行**

```js
let result = { 
      name: 'zhangsan', 
      age: 20,
      sex: '男' 
  } 
  let html = ` <div>
      <span>${result.name}</span>
      <span>${result.age}</span>
      <span>${result.sex}</span>
  </div> `;
```

在模板字符串中可以**调用函数**

```js
const sayHello = function () { 
     return '哈哈哈哈 追不到我吧 我就是这么强大';
  }; 
  let greet = `${sayHello()} 哈哈哈哈`;
  console.log(greet); // 哈哈哈哈 追不到我吧 我就是这么强大 哈哈哈哈
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例方法：<span style="color:red;font-family:'Consolas';font-weight:700;">startsWith()</span> 和 <span style="color:red;font-family:'Consolas';font-weight:700;">endsWith()</span></span>

- startsWith()：表示**参数字符串是否在原字符串的<span style="color:red;font-family:'Consolas';font-weight:700;">头部</span>**，**返回布尔值**
- endsWith()：表示**参数字符串是否在原字符串的<span style="color:red;font-family:'Consolas';font-weight:700;">尾部</span>**，**返回布尔值**

```js
let str = 'Hello world!';
 str.startsWith('Hello') // true 
 str.endsWith('!')       // true
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例方法：<span style="color:red;font-family:'Consolas';font-weight:700;">repeat()</span></span>

repeat方法表示将**原字符串重复n次**，

```js
返回一个新字符串
 'x'.repeat(3)      // "xxx" 
 'hello'.repeat(2)  // "hellohello"
```

## 基本包装类型

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">简单类型（基本数据类型，值类型）</span>

在存储时变量中存储的是<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">值本身</span>，包括string，number，boolean，undefined，null(对象)

## 复杂数据类型

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">复杂数据类型（引用类型）</span>

在存储时变量中存储的仅仅是<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">地址（引用）</span>，通过new关键字创建的对象（系统对象，自定义对象），如Object，Array，Date等

## 堆栈

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">堆栈控件分配类别</span>

（1）栈（操作系统）：由操作系统自动分配释放存放函数的参数值、局部变量的值等；其操作方式类似于数据结构中的栈

（2）堆（操作系统）：存储复杂类型（对象），一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收

![image-20220307143128841](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071431916.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">简单数据类型的存储方式</span>

值类型变量的数据直接存放在变量（栈空间）中

![image-20220307143200269](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071432343.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">复杂数据类型的存储方式</span>

**引用类型变量**（栈空间）里**存放**的是<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">地址</span>，真正的**对象实例**存放在<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">堆空间</span>中

## 简单类型传参

函数的形参可看作一个变量，当把一个值类型变量作为参数传给函数的形参时，实际是把<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">变量在栈空间里的值</span>复制了一份给形参，如果在方法内部对形参做任何修改，都不会影响到外部变量

```js
function fn(a){
    a++;
    console.log(a);
}
var x=10;
fn(x);
console.log(x);
```

![image-20220307143348666](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071433738.png)

## 复杂数据类型传参

函数的形参可看作一个变量，当把引用类型变量传给形参时，其实是把变量在**栈空间里保存的<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">堆地址</span>**复制给形参，形参和实参其实保存的是同一个堆地址，即操作的是同一个对象

```js
function Person(name) {
    this.name = name;
}
function f1(x) { // x = p
    console.log(x.name); // 2. 这个输出什么 ?    
    x.name = "张学友";
    console.log(x.name); // 3. 这个输出什么 ?    
}
var p = new Person("刘德华");
console.log(p.name);    // 1. 这个输出什么 ?   
f1(p);
console.log(p.name);    // 4. 这个输出什么 ? 
```

![image-20220307143435414](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071434479.png)

## 构造函数和原型

### 静态成员和实例成员

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">实例成员</span>

实例成员就是构造函数<span style="color:#C00000;font-family:'Consolas';font-weight:700;">内部</span>通过<span style="color:#C00000;font-family:'Consolas';font-weight:700;">this添加的成员</span> 如下列代码中uname age sing 就是实例成员,实例成员<span style="color:#C00000;font-family:'Consolas';font-weight:700;">只能通过**实例化的对象**来访问</span>

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    this.sing = function() {
        console.log('我会唱歌');
    }
}
var ldh = new Star('刘德华', 18);
console.log(ldh.uname); //实例成员只能通过实例化的对象来访问
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">静态成员</span>

静态成员 <span style="color:red;font-family:'Consolas';font-weight:700;">在构造函数本身上添加的成员</span> 如下列代码中 sex 就是静态成员,静态成员<span style="color:red;font-family:'Consolas';font-weight:700;">只能通过**构造函数**来访问</span>

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    this.sing = function() {
        console.log('我会唱歌');
    }
}
Star.sex = '男';
var ldh = new Star('刘德华', 18);
console.log(Star.sex); //静态成员只能通过构造函数来访问
```

### 构造函数的问题

![image-20220307143732101](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071437183.png)

### 构造函数原型prototype

构造函数通过原型分配的函数是所有对象所<span style="color:red;font-family:'Consolas';font-weight:700;">**共享的**</span>

JavaScript 规定，每一个<span style="color:blue;font-family:'Consolas';font-weight:700;">构造函数</span>都有一个<span style="color:red;font-family:'Consolas';font-weight:700;">prototype属性</span>，指向另一个对象

注意这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有

我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以<span style="color:red;font-family:'Consolas';font-weight:700;">共享</span>这些<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">方法</span>

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function() {
    console.log('我会唱歌');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
ldh.sing();
zxy.sing();
```

![image-20220307143955633](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071439704.png)

### 对象原型

对象都会有一个属性 <span style="color:red;font-family:'Consolas';font-weight:700;">`__proto__`</span> 指向<span style="color:red;font-family:'Consolas';font-weight:700;">构造函数的 prototype 原型对象</span>，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 `__proto__ `原型的存在。

`__proto__`对象原型和原型对象 prototype 是等价的

`__proto__`对象原型的意义就在于为对象的查找机制提供一个方向，或者说一条路线，但是它是一个非标准属性，因此实际开发中，不可以使用这个属性，它只是内部指向原型对象 prototype

![image-20220307144137084](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071441163.png)

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function() {
    console.log('我会唱歌');
}
var ldh = new Star('刘德华 ', 18);
var zxy = new Star('张学友 ', 19);
ldh.sing();
console.log(ldh);
console.log(ldh.__proto__ === Star.prototype);
```

![image-20220307144155780](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071441856.png)

### constructor构造函数

```js
对象原型（ __proto__）和构造函数（prototype）原型对象里面都有一个属性 constructor 属性 ，constructor 我们称为构造函数，因为它指回构造函数本身。

constructor 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。

一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。
```

如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
//很多情况下，需要手动的利用constructor属性 指回 原来的构造函数
Star.prototype = {
    //如果修改了原来的原型对象，给原型对象赋值的是一个对象，则必须手动利用constructor指回原来的构造函数
    constructor: Star, //手动设置指回原来的构造函数
    sing: function() {
        console.log('我会唱歌');
    },
    movie: function() {
        console.log('我会演电影');
    }
}
var zxy = new Star('张学友', 19);
console.log(zxy);
```

![image-20220307144924276](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071449366.png)

### 构造函数实例和原型对象三角关系

1. **构造函数**的<span style="color:red;font-family:'Consolas';font-weight:700;">prototype属性</span>指向了**构造函数**<span style="color:red;font-family:'Consolas';font-weight:700;">原型对象</span>

2. **实例对象**是由<span style="background-color:yellow;font-family:'Consolas';font-weight:500;">构造函数</span>创建的,**实例对象**的<span style="color:red;font-family:'Consolas';font-weight:700;">`__proto__`属性</span>指向了<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">构造函数</span>的<span style="color:red;font-family:'Consolas';font-weight:700;">原型对象</span>

3. <span style="background-color:yellow;font-family:'Consolas';font-weight:400;">构造函数</span>的<span style="color:red;font-family:'Consolas';font-weight:700;">原型对象</span>的<span style="color:red;font-family:'Consolas';font-weight:700;">constructor属性</span>指向了**构造函数**,**实例对象**的<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">原型的<span style="color:red;font-family:'Consolas';font-weight:700;">constructor属性</span></span>也指向了<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">构造函数</span>

![image-20220307145246090](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071452186.png)

### 原型链

每一个实例对象又有一个<span style="color:red;font-family:'Consolas';font-weight:700;">proto属性</span>，指向的构造函数的原型对象，构造函数的原型对象也是一个对象，也有**proto**属性，这样一层一层往上找就形成了<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">原型链</span>

![image-20220307145408423](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071454520.png)

### 原型链和成员的查找机制

任何**对象**都有<span style="color:red;font-family:'Consolas';font-weight:700;">原型对象</span>,也就是<span style="color:red;font-family:'Consolas';font-weight:700;">prototype属性</span>,任何**原型对象**也是一个**对象**,该对象就有<span style="color:red;font-family:'Consolas';font-weight:700;">proto属性</span>,这样一层一层往上找,就形成了一条链,我们称此为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">原型链</span>



当**访问一个对象的属性（包括方法）**时，首先查找这个<span style="color:red;font-family:'Consolas';font-weight:700;">对象自身</span>有没有该属性

 

如果没有就<span style="color:red;font-family:'Consolas';font-weight:700;">查找它的原型</span>（也就是 __proto__指向的 prototype 原型对象）

 

如果还没有就<span style="color:red;font-family:'Consolas';font-weight:700;">查找原型对象的原型</span>（Object的原型对象）

 

依此类推一直找到 <span style="color:red;font-family:'Consolas';font-weight:700;">Object </span>为止（null）



`__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线

### 原型对象中this的指向

**构造函数中的this**和**原型对象的this**,都指向我们<span style="color:red;font-family:'Consolas';font-weight:700;">new出来的实例对象</span>

```js
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
var that;
Star.prototype.sing = function() {
    console.log('我会唱歌');
    that = this;
}
var ldh = new Star('刘德华', 18);
// 1. 在构造函数中,里面this指向的是对象实例 ldh
console.log(that === ldh); //true
// 2.原型对象函数里面的this 指向的是 实例对象 ldh
```

![image-20220307145714100](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071457182.png)

### 通过原型为数组扩展内置方法

```js
Array.prototype.sum = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};
//此时数组对象中已经存在sum()方法了 可以始终 数组.sum()进行数据的求和
```



## 对象与类

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">对象</span>

对象是由**属性**和**方法**组成的：是一个<span style="color:red;font-family:'Consolas';font-weight:700;">无序键值对的集合</span>,指的是一个<span style="color:red;font-family:'Consolas';font-weight:700;">具体的事物</span>

- 属性：事物的<span style="color:red;font-family:'Consolas';font-weight:700;">特征</span>，在对象中用<span style="color:red;font-family:'Consolas';font-weight:700;">属性</span>来表示（常用名词）
- 方法：事物的<span style="color:red;font-family:'Consolas';font-weight:700;">行为</span>，在对象中用<span style="color:red;font-family:'Consolas';font-weight:700;">方法</span>来表示（常用动词）

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">创建对象</span>

```js
//字面量创建对象
var ldh = {
    name: '刘德华',
    age: 18
}
console.log(ldh);
//构造函数创建对象
function Star(name, age) {
    this.name = name;
    this.age = age;
}
var ldh = new Star('刘德华', 18) //实例化对象
console.log(ldh);
```

![image-20220307145936973](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071459054.png)

### 创建类

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">类</span>

在 ES6 中新增加了类的概念，可以使用 <span style="color:red;font-family:'Consolas';font-weight:700;">class</span> 关键字声明一个类，之后以这个类来实例化对象。

<span style="color:red;font-family:'Consolas';font-weight:700;">类</span>抽象了对象的公共部分，它<span style="color:red;font-family:'Consolas';font-weight:700;">泛指</span>某一大类（class）

<span style="color:red;font-family:'Consolas';font-weight:700;">对象特指</span>某一个，通过类实例化一个具体的对象



<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">创建类</span>

**语法**

```js
//步骤1使用class关键字
class name {
    //class body
}
//步骤2 使用定义的类创建实例 注意new关键字
var xx = new name();
```

<span style="color:red;font-family:'Consolas';font-weight:700;">constructor()</span>方法是类的构造方法（默认），<span style="color:red;font-family:'Consolas';font-weight:700;">用于传递参数返回实例对象</span>，通过new命令生成对象实例时，自动调用此方法。如果没有定义，类内部会自动创建一个<span style="color:red;font-family:'Consolas';font-weight:700;">constructor()</span>

 

示例

```js
//1.创建类 class 创建一个 明星类
class Star {
    //类的共有属性放到constructor里面
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
//2.利用类创建对象 new
var ldh = new Star('刘德华', 18);
console.log(ldh);
```

![image-20220307150225325](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071502411.png)



### 类创建添加属性和方法

```js
//1.创建类class 创建一个类
class Star {
    //类的共有属性放到constructor里面 constructor是 构造器或者构造函数
    constructor(uname, age) {
            this.uname = uname;
            this.age = age;
        } //方法与方法之间不需要添加逗号
    sing(song) {
        console.log(this.uname + '唱' + song);
    }
}
//2.利用类创建对象 new
var ldh = new Star('刘德华', '18');
console.log(ldh); //Star{uname:"刘德华",age:18}
ldh.sing('冰雨');
```

![image-20220307150254694](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071502769.png)

**注意:**

- 通过class 关键字创建类, 类名我们还是习惯性定义<span style="color:red;font-family:'Consolas';font-weight:700;">首字母大写</span>
- 类里面有个<span style="color:red;font-family:'Consolas';font-weight:700;">constructor 函数</span>,可以<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">接受传递过来的参数,同时返回实例对象</span>
- constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们**不写这个函数**,类也会<span style="color:red;font-family:'Consolas';font-weight:700;">自动生成</span>这个函数
- **多个函数方法之间不需要添加逗号分隔**
- 生成实例 <span style="color:red;font-family:'Consolas';font-weight:700;">new 不能省略</span>
- 语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function

### 类的继承

**语法**

```js
//父类
class Father {
}
//子类继承父类
class Son extends Father {
}
```

示例

```js
class Father {
    constructor(surname) {
        this.surname = surname;
    }
    say() {
        console.log('你的姓名是' + this.surname);
    }
}
class Son extends Father {
    //这样子类就继承了父类的属性和方法
}
var damao = new Son('刘');
damao.say();
```

![image-20220307150452298](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071504379.png)

<span style="color:red;font-family:'Consolas';font-weight:700;">子类使用super关键字访问父类的方法</span>

```js
//定义了父类
class Father {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        console.log(this.x + this.y);
    }
}
//子元素继承父类
class Son extends Father {
    constructor(x, y) {
        super(x, y); //使用super调用父类中的构造函数
    }
}
var son = new Son(1, 2);
son.sum();
```

![image-20220307150543115](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071505198.png)

**注意:** 

（1）继承中,如果**实例化子类输出一个方法**,先看子类有没有这个方法,如果有就<span style="color:red;font-family:'Consolas';font-weight:700;">先执行子类的</span>

（2）继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)

（3）如果子类想要继承父类的方法,同时在自己内部扩展自己的方法,利用super 调用父类的构造函数,<span style="color:red;font-family:'Consolas';font-weight:700;">super 必须在子类this之前调用</span>

```js
//父类有加法方法
class Father {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        console.log(this.x + this.y);
    }
}
//子类继承父类的加法方法 同时扩展减法方法
class Son extends Father {
    constructor(x, y) {
        //利用super调用父类的构造函数super必须在子类this之前调用，放到this之后会报错
        super(x, y);
	      this.x = x;
        this.y = y;
    }
    subtract() {
        console.log(this.x - this.y);
    }
}
var son = new Son(5, 3);
son.subtract();
son.sum();
```

![image-20220307150634713](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071506793.png)

(4) 时刻注意this的指向问题,类里面的<span style="color:red;font-family:'Consolas';font-weight:700;">共有的属性</span>和<span style="color:red;font-family:'Consolas';font-weight:700;">方法一定要加this使用</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">constructor中的this</span>指向的是new出来的<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">实例对象 </span>
- <span style="color:red;font-family:'Consolas';font-weight:700;">自定义的方法</span>,一般也指向的new出来的<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">实例对象</span>
- <span style="color:red;font-family:'Consolas';font-weight:700;">绑定事件之后this</span>指向的就是<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">触发事件的事件源</span>

（5）在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象

## 继承

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">call()</span>

- call()可以调用函数
- call()可以修改this的指向,使用call()的时候     参数一是修改后的this指向,参数2,参数3..使用逗号隔开连接

```js
function fn(x, y) {
    console.log(this);
    console.log(x + y);
}
var o = {
    name: 'andy'
};
fn.call(o, 1, 2); //调用了函数此时的this指向了对象o
```

![image-20220307151627543](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071516626.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">子构造函数继承父构造函数的属性</span>

1. 先定义一个父构造函数
2. 再定义一个子构造函数
3. 子构造函数继承父构造函数的属性(使用call方法)

```js
//1.父构造函数
function Father(uname, age) {
    //this 指向父构造函数的对象实例
    this.uname = uname;
    this.age = age;
}
//2.子构造函数
function Son(uname, age, score) {
    //this 指向子构造函数的对象实例
    // 3. 使用call方式实现子继承父的属性
    Father.call(this, uname, age);
    this.score = score;
}
var son = new Son('胡梓卓', 18, 100);
console.log(son);
```

![image-20220307151701988](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071517082.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">借用原型对象继承方法</span>

1. 先定义一个父构造函数
2. 再定义一个子构造函数
3. 子构造函数继承父构造函数的属性(使用call方法)

```js
// 1. 父构造函数
function Father(uname, age) {
    // this 指向父构造函数的对象实例
    this.uname = uname;
    this.age = age;
}
Father.prototype.money = function() {
    console.log(100000);
};
// 2 .子构造函数 
function Son(uname, age, score) {
    // this 指向子构造函数的对象实例
    Father.call(this, uname, age);
    this.score = score;
}
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
Son.prototype = new Father();
// 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;
// 这个是子构造函数专门的方法
Son.prototype.exam = function() {
    console.log('孩子要考试');
}
var son = new Son('刘德华', 18, 100);
console.log(son);
```

![image-20220307151734910](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071517010.png)



## 严格模式

JavaScript 除了提供正常模式外，还提供了严格模式（strict mode）。

 

ES5 的严格模式是采用具有限制性 JavaScript变体的一种方式，即在严格的条件下运行 JS 代码。

 

严格模式在 IE10 以上版本的浏览器中才会被支持，旧版本浏览器中会被忽略。

 

严格模式对正常的 JavaScript 语义做了一些更改： 

1.消除了 Javascript 语法的一些不合理、不严谨之处，减少了一些怪异行为。

2.消除代码运行的一些不安全之处，保证代码运行的安全。

3.提高编译器效率，增加运行速度。

4.禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class,enum,export, extends, import, super 不能做变量名

### 开启严格模式

严格模式可以应用到<span style="color:red;font-family:'Consolas';font-weight:700;">整个脚本</span>或<span style="color:red;font-family:'Consolas';font-weight:700;">个别函数</span>中。因此在使用时，我们可以将严格模式分为为脚本开启严格模式和为函数开启严格模式两种情况。

- <span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">情况一 :为脚本开启严格模式</span>

有的 script 脚本是严格模式，有的 script 脚本是正常模式，这样不利于文件合并，所以可以将整个脚本文件放在一个立即执行的匿名函数之中。这样独立创建一个作用域而不影响其他 script 脚本文件。

```js
(function (){
   //在当前的这个自调用函数中有开启严格模式，当前函数之外还是普通模式
 "use strict";
        var num = 10;
 function fn() {}
 })();
 //或者 
 <script>
   "use strict"; //当前script标签开启了严格模式
 </script>
 <script>
             //当前script标签未开启严格模式
 </script>
```

+ <span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">情况二: 为函数开启严格模式</span>

要给某个函数开启严格模式，需要把“use strict”; (或 'use strict'; ) 声明放在函数体所有语句之前。

```js
function fn(){
 "use strict";
 return "123";
 } 
 //当前fn函数开启了严格模式
```



### 严格模式中的变化

**文档参考**：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

```js
'use strict'
    num = 10
    console.log(num) //严格模式后使用未声明的变量
        -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        var num2 = 1;
    delete num2; //严格模式不允许删除变量
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    function fn() {
        console.log(this); // 严格模式下全局作用域中函数中的 this 是 undefined
    }
    fn();
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
    function Star() {
        this.sex = '男';
    }
    // Star();严格模式下,如果 构造函数不加new调用, this 指向的是undefined 如果给他赋值则 会报错.
    var ldh = new Star();
    console.log(ldh.sex);
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    setTimeout(function() {
        console.log(this); //严格模式下，定时器 this 还是指向 window
    }, 2000);
```

函数内的参数不能同名
函数必须声明在顶层（不允许在非函数代码块[if，for]内声明函数）



## 高阶函数

高阶函数是对其他函数进行操作的函数，它<span style="color:red;font-family:'Consolas';font-weight:700;">接收函数作为参数</span>或<span style="color:red;font-family:'Consolas';font-weight:700;">将函数作为返回值输出</span>

![image-20220307152109660](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071521754.png)

此时fn 就是一个高阶函数

函数也是一种数据类型，同样可以作为参数，传递给另外一个参数使用。最典型的就是作为回调函数。

同理函数也可以作为返回值传递回来

## 闭包

闭包（closure）指<span style="color:red;font-family:'Consolas';font-weight:700;">有权访问另一个函数作用域中变量的函数</span>。

简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量

![image-20220307152146067](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071521170.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">闭包的作用</span>

作用：**延伸变量的作用范围**

```js
function fn() {
        var num = 10;
        function fun() {
            console.log(num);
        }
        return fun;
    }
    var f = fn();
    f();
```

## 正则表达式

正则表达式（ **Regular Expression** ）是用于<span style="color:red;font-family:'Consolas';font-weight:700;">匹配字符串中字符组合的模式</span>。

在JavaScript中，正则表达式也是**对象**。

 

正则表通常被用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字或者下划线， 昵称输入框中可以输入中文(<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">匹配</span><span style="color:red;font-family:'Consolas';font-weight:700;">reg.test()</span>)。

 

此外，正则表达式还常用于过滤掉页面内容中的一些敏感词(<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">替换</span><span style="color:red;font-family:'Consolas';font-weight:700;">reg.replace(regexp,'新字符')</span>)，或从字符串中获取我们想要的特定部分(<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">提取</span><span style="color:red;font-family:'Consolas';font-weight:700;">match(reg)</span>)等 。

其他语言也会使用正则表达式，本阶段我们主要是利用JavaScript 正则表达式完成表单验证

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">正则表达式的特点</span>

1. 灵活性、逻辑性和功能性非常的强。
2. 可以迅速地用极简单的方式达到字符串的复杂控制。
3. 对于刚接触的人来说，比较晦涩难懂。比如：^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$
4. 实际开发,一般都是直接复制写好的正则表达式. 但是要求会使用正则表达式并且根据实际情况修改正则表达式. 比如用户名: /^[a-z0-9_-]{3,16}$/

### 在js中的使用

在 JavaScript 中，可以通过两种方式创建一个正则表达式。

（1）<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">通过调用<span style="color:red;font-family:'Consolas';font-weight:700;">RegExp对象</span>的构造函数创建</span>

```js
 var regexp = new RegExp(/123/);
 console.log(regexp);
```

（2）<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">利用<span style="color:red;font-family:'Consolas';font-weight:700;">字面量</span>创建 正则表达式</span>

```js
var rg = /123/;
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">测试正则表达式 </span>

<span style="color:red;font-family:'Consolas';font-weight:700;">test() 正则对象方法</span>，用于**检测字符串是否符合该规则**，该对象会返回 **true** 或 false，其参数是测试字符串。

```js
var rg = /123/;
 console.log(rg.test(123));//匹配字符中是否出现123  出现结果为true
 console.log(rg.test('abc'));//匹配字符中是否出现123 未出现结果为false
```

![image-20220307152631048](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071526138.png)

#### 正则表达式中的特殊字符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">正则表达式的组成</span>

一个正则表达式可以由**简单的字符**构成，比如 /abc/，也可以是**简单和特殊字符**的组合，比如 /ab*c/ 。其中特殊字符也被称为<span style="color:red;font-family:'Consolas';font-weight:700;">元字符</span>，在正则表达式中是具有**特殊意义**的专用符号，如 ^ 、$ 、+ 等

 

特殊字符非常多，可以参考：

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

 

jQuery 手册：正则表达式部分

[正则测试工具](https://tool.oschina.net/regex)



#### 边界符

正则表达式中的边界符（位置符）用来**提示字符所处的位置**，主要有两个字符

| **边界符** | **说明**                       |
| ---------- | ------------------------------ |
| ^          | 表示匹配行首的文本（以谁开始） |
| $          | 表示匹配行尾的文本（以谁结束） |

如果 ^和 $ 在一起，表示必须是精确匹配。

```js
var rg = /abc/; // 正则表达式里面不需要加引号 不管是数字型还是字符串型
    // /abc/ 只要包含有abc这个字符串返回的都是true
    console.log(rg.test('abc'));
    console.log(rg.test('abcd'));
    console.log(rg.test('aabcd'));
    console.log('---------------------------');
    var reg = /^abc/;
    console.log(reg.test('abc')); // true
    console.log(reg.test('abcd')); // true
    console.log(reg.test('aabcd')); // false
    console.log('---------------------------');
    var reg1 = /^abc$/; // 精确匹配 要求必须是 abc字符串才符合规范
    console.log(reg1.test('abc')); // true
    console.log(reg1.test('abcd')); // false
    console.log(reg1.test('aabcd')); // false
    console.log(reg1.test('abcabc')); // false
```

#### 字符类

字符类表示有一系列字符可供选择，**只要匹配其中一个**就可以了。所有可供选择的字符都放在方括号内。

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">[] 方括号</span>

表示有一系列字符可供选择，只要匹配其中一个就可以了

```js
var rg = /[abc]/; // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
    console.log(rg.test('andy')); //true
    console.log(rg.test('baby')); //true
    console.log(rg.test('color')); //true
    console.log(rg.test('red')); //false
    var rg1 = /^[abc]$/; // 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
    console.log(rg1.test('aa')); //false
    console.log(rg1.test('a')); //true
    console.log(rg1.test('b')); //true
    console.log(rg1.test('c')); //true
    console.log(rg1.test('abc')); //true
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    var reg = /^[a-z]$/ //26个英文字母任何一个字母返回 true  - 表示的是a 到z 的范围  
    console.log(reg.test('a')); //true
    console.log(reg.test('z')); //true
    console.log(reg.test('A')); //false
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
    //字符组合
    var reg1 = /^[a-zA-Z0-9]$/; // 26个英文字母(大写和小写都可以)任何一个字母返回 true  
    -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
    //取反 方括号内部加上 ^ 表示取反，只要包含方括号内的字符，都返回 false 。
    var reg2 = /^[^a-zA-Z0-9]$/;
    console.log(reg2.test('a')); //false
    console.log(reg2.test('B')); //false
    console.log(reg2.test(8)); //false
    console.log(reg2.test('!')); //true
```

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">量词符</span>

量词符用来<span style="color:red;font-family:'Consolas';font-weight:700;">设定某个模式出现的次数</span>。

| **量词** | **说明**        |
| -------- | --------------- |
| *        | 重复0次或更多次 |
| +        | 重复1次或更多次 |
| ?        | 重复0次或1次    |
| {n}      | 重复n次         |
| {n,}     | 重复n次或更多次 |
| {n,m}    | 重复n到m次      |

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">括号总结</span>

1.大括号 量词符. 里面表示重复次数

2.中括号 字符集合。匹配方括号中的任意字符. 

3.小括号表示优先级

[正则表达式在线测试](https://c.runoob.com/)



#### 预定义类

预定义类指的是**某些常见模式的简写方式**

![image-20220307153006089](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071530203.png)

```js
验证座机号码
 var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
 var reg = /^\d{3,4}-\d{7,8}$/;
```

### 正则表达式中的替换

replace() 方法可以实现**替换字符串操作**，用来替换的**参数**可以是**一个字符串**或是一个**正则表达式**。

![image-20220307153045980](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071531710.png)

```js
var str = 'andy和red';
 var newStr = str.replace('andy', 'baby');
 console.log(newStr)//baby和red
 //等同于 此处的andy可以写在正则表达式内
 var newStr2 = str.replace(/andy/, 'baby');
 console.log(newStr2)//baby和red
 //全部替换
 var str = 'abcabc'
 var nStr = str.replace(/a/,'哈哈')
 console.log(nStr) //哈哈bcabc
 //全部替换g
 var nStr = str.replace(/a/a,'哈哈')
 console.log(nStr) //哈哈bc哈哈bc
 //忽略大小写i
 var str = 'aAbcAba';
 var newStr = str.replace(/a/gi,'哈哈')//"哈哈哈哈bc哈哈b哈哈"
```

**案例:过滤敏感词汇**

```js
 <textarea name="" id="message"></textarea> <button>提交</button>
 <div></div>
 <script>
     var text = document.querySelector('textarea');
     var btn = document.querySelector('button');
     var div = document.querySelector('div');
     btn.onclick = function() {
         div.innerHTML = text.value.replace(/激情|gay/g, '**');
     }
 </script>
```
