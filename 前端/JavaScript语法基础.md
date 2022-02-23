# 认识javascript

一种运行在**客户端**的**脚本**语言，不需要编译，由解释器逐行解释并运行

也可以基于 Node.js 技术进行服务器端编程

 

**作用**

- 表单动态校验（密码强度检测）     （ <span style="color:red">JS 产生最初的目的</span> ）
- 网页特效
- 服务端开发(Node.js)
- 桌面程序(Electron)
- App(Cordova) 
- 控制硬件-物联网(Ruff)
- 游戏开发(cocos2d-js)

 

**HTML/CSS/JS 的关系**

html/css 标记语言 -- **描述类语言**

js 脚本语言 -- **编程类语言**

 

**浏览器执行 JS 简介**

浏览器分为**渲染引擎和js引擎**

（1）渲染引擎：用来解析html与css，称为内核（blink，webkit）

（2）js引擎：也称为js解释器，用来读取网页中的javascript代码，对其处理后运行（v8）

> 浏览器本身并不会执行JS代码，而是通过内置 JavaScript 引擎(解释器) 来执行 JS 代码 。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机去执行，所以 JavaScript 语言归为脚本语言，会逐行解释执行  

 

**js的组成**

**ECMAscript**（javascript语法）、**DOM**（页面文档对象模型）、**BOM**（浏览器对象模型）

| ECMAscript | https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview |
| :--------- | ------------------------------------------------------------ |
| DOM        | 通过 DOM 提供的接口可以对页面上的各种元素进行操作（大小、位置、颜色等） |
| BOM        | 通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等 |

**书写位置**

行内、内嵌、外部

```html
<input type="button" value="123" onclick="alert('123')">（行内式）
<script>alert('123')</script>（内嵌）
<script src="url"></script>（外联）
```

在HTML中我们推荐使用**双引号**, JS 中我们推荐使用**单引号**



# javascript注释

**单行注释**

 ```js
 // 单行注释 alt + /  
 ```

**多行注释**

 ```js
 <!-- 多行注释
 	alt + shift + a -->
 ```

**vscode修改快捷键**

*vscode* *→* *首选项按钮* *→* *键盘快捷方式* *→* *查找* *原来的快捷键* *→* *修改为新的快捷键* *→* *回车确认*

# javascript输入输出语句

| **方法**         | **说明**                                 | **归属** |
| ---------------- | ---------------------------------------- | -------- |
| alert(msg)       | 浏览器**弹出警示框**                     | 浏览器   |
| console.log(msg) | 浏览器**控制台打印**输出信息             | 浏览器   |
| prompt(info)     | 浏览器**弹出输入框**，用户可以输入       | 浏览器   |
| confirm          | 浏览器**弹出确认框**，用户可以确认或取消 | 浏览器   |

**注意**

alert() 主要用来显示消息给**用户**

console.log() 用来给**程序员**自己看运行时的消息

# 变量

变量是用于存放数据的**容器**。 我们通过 **变量名** 获取数据，甚至数据可以修改

 

变量是程序在内存中申请的一块用来存放数据的空间

## 变量的使用

**声明变量**

```js
//声明一个 名称为age 的变量 
var age;
```

- var 是一个 JS关键字，用来声明变量( variable 变量的意思 )。计算机会自动为变量分配内存空间
- 通过变量名来访问内存中分配的空间

 

**赋值**

  ```js
  //给 age  这个变量赋值为 10
  age = 10;
  ```

-  = 用来把右边的值赋给左边的变量空间中 此处代表赋值的意思
-  变量值是保存到变量空间里的值

 

**变量的初始化**

```js
//声明一个变量并赋值， 我们称之为变量的初始化
//声明变量同时赋值为 18
var age  = 18;
```



**变量语法扩展**

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

 

**变量命名规范**

**规则**：

- 由**字母**(A-Za-z)、**数字**(0-9)、**下划线**(_)、**美元符号**( $ )组成，如：usrAge, num01, _name
- 严格区分大小写。var app; 和 var App; 是两个变量
- 不能 以数字开头。 18age      是错误的
- 不能 是关键字、保留字。例如：var、for、while
- 变量名必须有意义。 MMD  BBD    nl  →       age 
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。myFirstName

**name尽量不要**使用



## let

ES6中新增了用于声明变量的关键字

**let声明的变量只在所处于的块级有效**

```js
if (true) { 
      let a = 10;
  }
 console.log(a) // a is not defined
```

**注意：**使用let关键字声明的变量才具有块级作用域，使用var声明的变量不具备块级作用域特性。

**不存在变量提升**

```js
console.log(a); // a is not defined 
 let a = 20;
```

**暂时性死区**

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



**小结**

- let关键字就是用来声明变量的
- 使用let关键字声明的变量具有块级作用域
- 在一个大括号中 使用let关键字声明的变量才具有块级作用域 var关键字是不具备这个特点的
- 防止循环变量变成全局变量
- 使用let关键字声明的变量没有变量提升
- 使用let关键字声明的变量具有暂时性死区特性



## const

声明常量，常量就是值（内存地址）不能变化的量

 

**具有块级作用域**

```js
if (true) { 
      const a = 10;
  }
 console.log(a) // a is not defined
```

**声明常量时必须赋值**

```js
const PI; // Missing initializer in const declaration
```

**常量赋值后，值不能修改**

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

**小结**

- const声明的变量是一个常量
- 既然是常量不能重新进行赋值，如果是**基本数据类型，不能**更改值**，如果是**复杂数据类型，不能**更改地址值**
- 声明 const时候**必须要给定值**

 

**let、const、var** **的区别**

- 使用 var 声明的**变量**，其作用域为该语句所在的**函数内**，且**存在变量提升**现象
- 使用 let 声明的**变量**，其作用域为该语句所在的**代码块内**，**不存在变量**提升
- 使用 const 声明的是**常量**，在后面出现的代码中**不能再修改该常量的值**

![image-20220223105722004](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231057063.png)



## 数据类型

JavaScript 是一种**弱类型**或者说动态语言

 

变量的数据类型是由 JS引擎 根据 = **右边变量值的数据类型**来**判断** 的，运行完毕之后， 变量就确定了数据类型

 

**数据类型的分类**

- 简单数据类型 （**Number**,**String**,**Boolean**,**Undefined**,**Null**）

- 复杂数据类型 （**object**)

| **简单数据类型** | **说明**                                        | **默认值** |
| ---------------- | ----------------------------------------------- | ---------- |
| **Number**       | 数字型，包含 整数值和浮点型值，如21，0.21       | 0          |
| **Boolean**      | 布尔值类型，如true，false，等价于1和0           | false      |
| **String**       | 字符串类型，如"张三"                            | ""         |
| **Undefined**    | var a;声明了变量a 但是没有赋值，此时a=indefined | indefined  |
| **Null**         | var a=null;声明变量a为空值                      |            |

**数字型** **Number**

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

**字符串型** **String**

字符串型可以是引号中的任意文本，其语法为 **双引号** "" 和 **单引号**''

 

（1）**字符串引号嵌套**

JS 可以用**单引号嵌套双引号** ，或者用**双引号嵌套单引号** (**外双内单，外单内双**)

```js
var strMsg = '我是"高帅富"程序猿';   // 可以用''包含""
var strMsg2 = "我是'高帅富'程序猿";  // 也可以用"" 包含''
```



（2）**字符串转义符**

类似HTML里面的特殊字符，字符串中也有特殊字符，我们称之为转义符。

转义符都是 `\ `开头的

 

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

字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的 **length** 属性可以获取整个字符串的长度

```js
var strMsg = "我是帅气多金的程序猿！";
alert(strMsg.length); // 显示 11
```



（4）**字符串拼接**

- 多个字符串之间可以使用 + 进行拼接，其拼接方式为 字符串 + 任何类型 = 拼接之后的新字符串

- 拼接前会把**与字符串相加的任何类型**转成字符串，再拼接成一个新的字符串

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



**布尔型Boolean**

布尔类型有两个值：true 和 false ，其中 true 表示真（对），而 false 表示假（错）

布尔型和数字型相加的时候， true 的值为 1 ，false 的值为 0

```js
console.log(true + 1);  // 2
console.log(false + 1); // 1
```

**Undefined**和 **Null**

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

**获取检测变量的数据类型**

`typeof` 可用来获取检测变量的数据类型

```js
var num = 18;
console.log(typeof num) // 结果 number
```

不同类型的返回值

![image-20220223110348072](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231103131.png)

**字面量**

字面量是在**源代码中一个固定值的表示法**，通俗来说，就是字面量表示如何表达这个值。

- 数字字面量：8, 9, 10
- 字符串字面量：'黑马程序员', "大前端"
- 布尔字面量：true，false



### 数据类型转换

使用**表单、prompt** 获取过来的数据默认是字符串类型的，此时就不能直接简单的进行加法运算，而需要转换变量的数据类型

 

通常会实现3种方式的转换：

- 转换为字符串类型
- 转换为数字型
- 转换为布尔型



**转换为字符串**

![image-20220223110507308](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231105360.png)

- toString() 和 String() 使用方式不一样
- 三种转换方式，更多第三种加号拼接字符串转换方式，     这一种方式也称之为**隐式转换**



**转换为数字型**（重点）♥

![image-20220223110540912](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202231105963.png)

- 注意 parse**I**nt 和 parse**F**loat 单词的大小写，这2个是重点
- 隐式转换是我们在进行算数运算的时候，JS 自动转换了数据类型

**转换为布尔型**

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

ES6 提供了新的数据结构 Set。它类似于数组，但是**成员的值都是唯一**的，没有重复的值。

**Set本身是一个构造函数**，用来生成 Set 数据结构

 ```js
 const s = new Set();
 ```

Set函数可以**接受一个数组作为参数**，用来初始化。

 ```js
 const set = new Set([1, 2, 3, 4, 4]);//{1, 2, 3, 4}
 ```

**size**查看set里面值的数量
