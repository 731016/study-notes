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

![image-20220223105411858](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231054916.png)

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

![image-20220223105454353](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231054406.png)

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

![image-20220223105722004](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231057063.png)



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

![image-20220223105912816](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231059866.png)

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

![image-20220223110348072](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231103131.png)

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

![image-20220223110622977](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231106017.png)

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

![image-20220303204421807](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032044020.png)

- 翻译器翻译的方式有两种：一个是<span style="color:red">编译</span>，另外一个是<span style="color:red">解释</span>。两种方式之间的区别在于<span style="background-color:yellow">翻译的时间点不同</span>
- **编译器**是在代码执行<span style="background-color:yellow">**之前**进行编译</span>，生成中间代码文件
- **解释器**是在运行时<span style="background-color:yellow">**进行**及时解释</span>，并立即执行(当编译器以解释方式运行的时候，也称之为解释器)

 <span style="color:#2E75B5;font-family:'Consolas';font-weight:700">执行过程</span>

![image-20220303204855300](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032048350.png)

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

![image-20220303205406136](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032054192.png)

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

![image-20220303210042828](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032100876.png)

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">等号比较</span>

![image-20220303210107601](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032101648.png)

```js
console.log(18 == '18');
console.log(18 === '18');
```

### 逻辑运算符

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700">逻辑运算符概述</span>

逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值。后面开发中经常用于多个条件的判断

![image-20220303210301261](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032103306.png)

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

![image-20220303210538688](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032105739.png)

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

![image-20220303211420293](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032114357.png)

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

![image-20220303211703771](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032117815.png)

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

![image-20220303211738462](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032117510.png)

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

![image-20220303211822653](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032118703.png)

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

![image-20220303213456345](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032134396.png)

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

![image-20220303214742085](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032147150.png)

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

![image-20220303214827482](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203032148539.png)

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

