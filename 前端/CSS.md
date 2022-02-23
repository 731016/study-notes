CSS概念

CSS（Cascading Style Sheet），CSS样式表或层叠样式表（级联样式表）

### 作用

- **设置**HTML页面中的文本内容（字体、大小、对齐方式等）、图片的外形（宽高、边框样式、边距等）以及**版面的布局和外观显示样式**

- css以html为基础，提供了丰富的功能，如字体、颜色、背景的控制及整体排版等，而且还可以针对不同的浏览器设置不同的样式

### 引入CSS的三种方法

#### (1)行内式（内联样式）

**概念**

​	行内样式、行间样式

​	通过标签的style属性来设置元素的样式

**基本语法**

```HTML
<标签名 style="属性1:属性值1;属性2:属性值2;"> 内容 </标签名>
```

多组属性值之间使用"`;`"隔开

#### (2)内部样式表（内嵌样式表）

**概念**

​	内嵌式

​	将CSS代码集中写在HTML文档的**head头部标签**中，并用style标签定义

**基本语法**

```html
<head>
    <style type="text/css"[可省略]>
        选择器 {
            属性1:属性值1;
            属性2:属性值2;
        }
    </style>
</head>
```

只能控制当前页面

#### (3)外部样式表（外链式）

**概念**

​	链入式

​	将所有的样式放在一个或多个以.css为扩展名的外部样式表文件中

​	通过link标签将外部样式表文件链接到HTML文件中

**基本语法**

```html
<link rel="stylesheet" type="text/css" href="css文件路径">
```

- 单标签
- link标签放在head头部标签中，并指定link标签的三个属性

| **属性** | **作用**                                                     |
| -------- | ------------------------------------------------------------ |
| rel      | 定义当前文档与被链接文档之间的关系，"stylesheet"表示一个样式表文件 |
| type     | 定义所链接文档的类型，"text/css"表示css样式表                |
| href     | 定义所链接外部样式表文件的URL                                |



## CSS选择器

### 作用

找到特定HTML页面元素

### CSS基础选择器

#### 标签选择器

**概念**

​	HTML标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的CSS样式

**语法**

```css
标签名 {属性1:属性值1; }
```

**作用**

​	把某一类标签**全部**选择出来

#### 类选择器

使用"`.`"（英文点号）进行标识，后面紧跟类名

- **类名选择器**

```css
.类名 {
    属性1:属性值1;
}
```

- **标签**

```html
<p class="类名"></p>  
```

多类名选择（一个标签内部只能有一个class）

```html
<span class="G font100">G</span>
<span class="two_o font100">o</span>
<span class="three_o font100">o</span>
<span class="G font100">g</span>
<span class="l font100">l</span>
<span class="e font100">e</span>
```

```css
.font100 {
    font-size: 100px;
}
.G {
  color: blue;
}
.two_o {
  color: red;
}
.three_o {
  color: orange;
}
.l {
  color: green;
}
```

#### id选择器

使用**#**进行标识，后面紧跟id名

- **id****选择器**

```css
#id名 {属性1:属性值1;}  
```

- **标签**

  ```html
  <p id="id名"></p>
  ```

元素的id值是**唯一**的

#### 通配符选择器

用*****号标识

**基本语法**

 ```css
 * {属性1:属性值1;}
 ```

会匹配页面所有的元素，降低页面响应速度



- 尽量少用通用选择器*
- 尽量少用ID选择器
- 不使用无具体语义定义的标签选择器div span



## CSS文字文本样式

### font字体

#### 1.字体风格

```css
.line_2 {
        font-style: italic;
}
```

| **属性** | **作用**                                                |
| -------- | ------------------------------------------------------- |
| normal   | 默认值，浏览器会显示标准的字体样式  font-style: normal; |
| Italic   | 浏览器会显示斜体的字体样式                              |

#### 2.字体粗细

```css
.line_2 {
    font-weight: 700;
}
```

| **属性值** | **描述**                                        |
| ---------- | ----------------------------------------------- |
| normal     | 默认值（**不加粗**的）**400**                   |
| bold       | 定义粗体（加粗的）**700**                       |
| 100~900    | 400 等同于 normal，而  **700** 等同于  **bold** |

#### 3.字号大小

```css
body {
        font-size: 16px;
}
```

![image-20220222162250866](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221622911.png)

#### 4.字体

```css
.line_1 {
    font-family: "宋体";
}
```

可以同时指定多个字体，中间以逗号隔开，表示如果浏览器不支持第一个字体，则会尝试下一个，直到找到合适的字体

```css
p {
    font-family: Arial,"Microsoft Yahei","微软雅黑";
}
```

中文字体需要加英文状态下的引号，**英文字体一般不需要加引号**；

当需要设置英文字体时，**英文字体名必须位于中文字体名之前**；

若字体名中包含**空格**、**#**、**$**等符号，则该字体必须**加**英文状态下的**单引号或双引号**



**Unicode字体**

- 文件编码(GB2312、UTF-8）不匹配会产生乱码
- xp系统不支持 类似微软雅黑的中文

**解决**

（1）使用英文代替 `font-family:"Microsoft Yahei"`

（2）使用Unicode编码代替 `font-family:"\5FAE\8F6F\96C5\9ED1"`

| **字体名称** | **英文名称**     | **Unicode** **编码** |
| ------------ | ---------------- | -------------------- |
| 宋体         | SimSun           | \5B8B\4F53           |
| 新宋体       | NSimSun          | \65B0\5B8B\4F53      |
| 黑体         | SimHei           | \9ED1\4F53           |
| 微软雅黑     | Microsoft  YaHei | \5FAE\8F6F\96C5\9ED1 |
| 楷体_GB2312  | KaiTi_GB2312     | \6977\4F53_GB2312    |
| 隶书         | LiSu             | \96B6\4E66           |
| 幼园         | YouYuan          | \5E7C\5706           |
| 华文细黑     | STXihei          | \534E\6587\7EC6\9ED1 |
| 细明体       | MingLiU          | \7EC6\660E\4F53      |
| 新细明体     | PMingLiU         | \65B0\7EC6\660E\4F53 |

#### 基本语法

```css
选择器 { font: font-style  font-weight  font-size/line-height  font-family;}
```

```css
.p {
    font: italic 700 20px "微软雅黑";
}
```

**注意：**

- 使用font属性时，必须按上面语法格式中的顺序书写，不能更换顺序，各个属性以**空格**隔开。
- 其中不需要设置的属性可以省略（取默认值），但必须保留**font-size**和**font-family**属性，**否则font属性将不起作用**



## CSS外观属性

### 文本颜色

**作用**

**color**属性用于定义文本的颜色

| **表示**       | **属性值**                              |
| -------------- | --------------------------------------- |
| 预定义的颜色值 | red，green，blue，还有我们的御用色 pink |
| 十六进制       | #FF0000，#FF6600，#29D794               |
| RGB代码        | rgb(255,0,0)或rgb(100%,0%,0%)           |

### **文本**水平对齐方式

**text-align**属性用于设置文本内容的水平对齐，相当于html中的align对齐属性

| **属性** | **解释**         |
| -------- | ---------------- |
| left     | 左对齐（默认值） |
| right    | 右对齐           |
| center   | 居中对齐         |

**是让盒子里面的内容水平居中，** **而不是让盒子居中对齐**

### 行间距

**line-height**属性用于设置行间距（行与行之间的距离）（字符的垂直距离）**行高**



**单位**

​	line-height常用属性值单位分别为**像素****px**，**相对值****em**和**百分比****%**

 

**一般情况下，行距比字号大7，8像素**



### 首行缩进

**text-indent**属性用于设置首行文本的缩进

**属性值**

​	可为不同单位的数量，**em字符宽度的倍数**、或相对于浏览器窗口宽度的百分比%，允许使用负值

```css
/*1em就是一个字的宽度*/
p {
    text-indent:2em;
}
```

### 文本修饰

**text-decoration** 通常我们用于给链接修改装饰效果

| **值**        | **描述**                                               |
| ------------- | ------------------------------------------------------ |
| **none**      | 默认。定义标准的文本。  取消下划线（最常用）           |
| **underline** | 定义文本下的一条线。下划线  也是我们链接自带的（常用） |
| overline      | 定义文本上的一条线。（不用）                           |
| line-through  | 定义穿过文本下的一条线。（不常用）                     |

### 文字阴影

**text-shadow**为文字添加阴影。可以为文字与 [text-decorations](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) 添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在X和Y方向的偏移量、模糊半径和颜色值组成。

### 背景透明

opacity属性指定了一个元素的**不透明度**。换言之，opacity属性指定了一个元素后面的背景的被覆盖程度。



当opacity属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个整体看待，即使这个值没有被子元素继承。

因此，**一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的opacity属性值。**

### [属性值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity#values)

`<number>`

 [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) 是一个0.0到1.0范围内的数字值,这个数值既包含也代表通道的透明度，也就是alpha通道的值。任何一个溢出这个取值区间的值，尽管有效，但会被解析为在取值范围内最靠近它的值。

| **值**                                                       | **释义**                                |
| ------------------------------------------------------------ | --------------------------------------- |
| 0                                                            | 元素完全透明 (即元素不可见).            |
| 任何一个位于0.0-1.0之间的 [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) | 元素半透明 (即元素后面的背景可见).      |
| 1                                                            | 元素完全不透明(即元素后面的背景不可见). |



## css复合选择器

| 选择器             | **作用**                     | **特征**                 | **使用情况** | **隔开符号及用法**                          |
| ------------------ | ---------------------------- | ------------------------ | ------------ | ------------------------------------------- |
| **后代选择器**     | **用来选择元素后代**         | **是选择所有的子孙后代** | **较多**     | **符号是空格 .nav a**                       |
| 子代选择器         | 选择 最近一级元素            | 只选亲儿子               | 较少         | 符号是**>** .nav>p                          |
| 交集选择器         | 选择两个标签交集的部分       | 既是 又是                | 较少         | **没有符号**  p.one                         |
| **并集选择器**     | **选择某些相同样式的选择器** | **可以用于集体声明**     | **较多**     | **符号是逗号 .nav, .header**                |
| **链接伪类选择器** | **给链接更改状态**           |                          | **较多**     | **重点记住 a{} 和  a:hover 实际开发的写法** |

### 后代选择器

**概念**

后代选择器又称为包含选择器

 

**作用**

用来选择元素或元素组的**子孙后代**

其写法就是把外层标签写在前面，内层标签写在后面，中间用**空格**分隔

 

**语法**

```css
.class h3 {
    color:red;
    font-size:16px;
}
```

![image-20220222163318811](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221633888.png)

### 子元素选择器

**作用**

子元素选择器只能选择作为某元素**子元素(亲儿子)**的元素

 

其写法就是把父级标签写在前面，子级标签写在后面，中间跟一个 `>` 进行连接

 

**语法**

```css
.class>h3 {
    color:red;
    font-size:14px;
}
```

![image-20220222163429952](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221634019.png)

### 交集选择器（不常用）

**条件**

交集选择器由两个选择器构成，找到的标签必须满足：既有标签一的特点，也有标签二的特点

![image-20220222163500928](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221635017.png)

交际选择器 是并且的意思。即…又…的意思

```css
p.one是类名为one的段落标签
```

### 并集选择器

![image-20220222163538697](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221635781.png)

```css
比如  .one, p , #test {color: #F00;}  
表示   .one 和 p  和 #test 这三个选择器都会执行颜色为红色。 
通常用于集体声明
```

### 链接伪类选择器

类选择器是**一个点**

```css
.demo {}  
```

伪类选择器用2个点（冒号）

 ```css
 :link {} 
 ```

**作用**

用于向某些选择器添加特殊的效果



**顺序【lvha】不要颠倒！！！**

```css
未访问的连接
a:link

已访问的连接
a:visited

鼠标移动到链接上
a:hover

选定的链接
a:active
```

a链接具有默认样式，**需要给链接单独指定样式**

![image-20220222163743584](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221637640.png)



## 标签的显示模式

**标签的分类**

html标签一般分为**块标签**和**行内标签**（块元素和行内元素）

| **元素模式** | **元素排列**           | **设置样式**           | **默认宽度**     | **包含**                 |
| ------------ | ---------------------- | ---------------------- | ---------------- | ------------------------ |
| 块级元素     | 一行只能放一个块级元素 | 可以设置宽度高度       | 容器的100%       | 容器级可以包含任何标签   |
| 行内元素     | 一行可以放多个行内元素 | 不可以直接设置宽度高度 | 它本身内容的宽度 | 容纳文本或则其他行内元素 |
| 行内块元素   | 一行放多个行内块元素   | 可以设置宽度和高度     | 它本身内容的宽度 |                          |

### 块级元素block-level

常见的块元素有`<h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>`等，其中`<div>`标签是最典型的块元素

**块级元素的特点**

（1）独占一行

（2）高度，宽度、外边距以及内边距都可以控制

（3）宽度默认是**容器（父级宽度）的100%**

（4）是一个容器及盒子，里面可以放**行内**或者**块级**元素

**注意：**

只有 文字才 能组成段落 因此 **p 里面不能放块级元素**，特别是 **p里面不能放div** 

同理还有这些标签h1,h2,h3,h4,h5,h6,dt，他们都是文字类块级标签，里面不能放其他块级元素

### 行内元素inline-level

常见的行内元素有`<a>、<strong>、<b>、<em>、<i>、<del>、<s>、<ins>、<u>、<span>`等，其中`<span>`标签最典型的行内元素。有的地方也成内联元素

**行内元素的特点**

（1）相邻行内元素在一行上，一行可以显示多个

（2）**高、宽直接设置是无效的**

（3）默认宽度就是它**本身内容的宽度**。

（4）行内元素**只能容纳文本**或则**其他行内元素**

**注意：**

链接里面不能再放链接

特殊情况a里面可以放块级元素，但是给a转换一下块级模式最安全

### 行内块元素inline-block

在行内元素中有几个特殊的标签`<img />、<input />、<td>`，可以对它们设置**宽高**和对齐属性，有些资料可能会称它们为行内块元素

**行内块元素的特点**

（1）和相邻行内元素（行内块）在一行上,但是之间会有**空白缝隙**。一行可以显示多个

（2）默认宽度就是它**本身内容的宽度**

（3）**高度，行高、外边距以及内边距**都可以控制

### 标签显示模式转换

**块** --> **行内**

```css
display: inline;
```

**行内** --> **块**

```css
display: block;  
```

**块、行内**元素 --> **行内块**

```css
display: inline-block;  
```

```html
<div>块级元素</div>
<div>块级元素</div>
<span>行内元素</span>
<span>行内元素</span>
<a href="#">百度</a>
<a href="#">新浪</a>

span {
  /* 行内-->块 */
  display: block;
  width: 100px;
  height: 100px;
  background-color: blueviolet;
}
div {
  /* 块-->行内 */
  display: inline;
  width: 200px;
  height: 200px;
  background-color: orange;
}
a {
  /* 行内，块-->行内块 */
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: red;
}
```

![块 级 元 素 块 级 元 素 ](data:image/png;base64,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QE5C4lyb+PH/Jq5OXvvp1q1ffRMARCchcaoqzX/akgrGPgCil5AsS0zcVOulYkmFbwKA6CQmTmXVksolelEVJA6A6CUkTnV1jVt06vgmAIgO9RoAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAckgcAHJIHABySBwAcqJJnEsTzaen/Xo5mrqxo/fsoUt+C8B8iSJxpg8dHlcDNwf9ZuEmhkabeyeKfx0AJaqi5cl1s2ZlVrt9e9p+nV36QNX3352zTwh3oG3Ur6nB02e7Bxr69q9q1xt6sLD3Sr97IMSyg280bar3G6l04rQfX+pfKoMs75Iktm/G9KHeCwf8eo6y7LOonuEmvwaUpyITx2aEiqpP5po4kbMR1razddejvqFEkTgod0UlzqWJ5sPjPQV1VDsy8us5iHCgkc8wp23N4Lblq/xGCSBxUO4KT5yEuNHd+GZHPmMTkzhjyf05fIxj3ujW/E5tGOMAMgpNnN/39l5QsS7qBix5DXZCEye0MbrEuXPqw/O7h/1GHkpnpEPioNwVXzl2c6uuLS1H1lX7lhyEhYtNhMbHL2+s9Q1OQuIUUPq1wlLDBWXKnpvd6H8qvx9HCImDcld04tgI6LQxYaPHN6flKzIhieOvQKWUbDKOcWxqpFyNcvuTnsua1EGZa9fx1Ndd115P4gBRK+5+HD0cMCOOnrW2ez+66vL+1uRlZ4N+RPftWEvaydHgVyZuutp+3r13Xm/G0/tsY0XH5uGzzb0Jiw2v1svblpdi3AD3gWISZ/B0QWWRUJcm7KCj6ci21r5OkwU7hu74h7Jqq2n2a7mo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)

## 单行文本垂直居中

![顶 中 基  基 线 和 基 线 的 距 离 为 行 高  基 底  线 线 ](data:image/png;base64,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)

**文字的行高等于盒子的高度**

行高 = 上距离 + 内容高度 + 下距离 

 

**行高和高度的三种关系**

行高 = 高度 文字会 垂直居中

如果行高 > 高度 文字会 偏下 

如果行高 < 高度 文字会 偏上 



![image-20220222164856123](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221648169.png)

```html
<a href="#">体育</a>
<a href="#">娱乐</a>
<a href="#">汽车</a>

a {
  /* 行内，块-->行内块 */
  display: inline-block;
  width: 100px;
  height: 30px;
  text-align: center;
  background-color: pink;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  /* 行高==高度让单行文字垂直居中 */
  line-height: 30px;
}
a:hover {
  background-color: red;
  color: yellow;
}
```

## css背景

**背景颜色**

```css
background-color: 颜色值; 默认transparent 透明的
```

**背景图片**

```css
background-image: none | url(地址);
```

地址不要加**引号**

**背景平铺**

```css
background-repeat: no-repeat | repeat | repeat-x | repeat-y;
```

| **参数**  | **作用**                             |
| --------- | ------------------------------------ |
| repeat    | 背景图像在纵向和横向上平铺（默认的） |
| no-repeat | 背景图像不平铺                       |
| repeat-x  | 背景图像在横向上平铺                 |
| repeat-y  | 背景图像在纵向平铺                   |

**背景位置**

```css
background-position : length || length
background-position : position || position
```

| **参数** | **值**                                                       |
| -------- | ------------------------------------------------------------ |
| length   | 百分数 \| 由浮点数字和单位标识符组成的长度值                 |
| position | **top** \| **center** \| **bottom** \| **left** \| **center** \| **right** 方位名词 |

**注意：**

（1）必须先指定background-image属性

（2）position 后面是x，y坐标；可以使用方位名词 或 精确单位

（3）若指定两个值都是方位名词，则前后顺序无关，效果一致

（4）若只指定一个方位名词，另一个值**默认居中对齐**

（5）若position后面是精确坐标，第一个为x，第二个为y

（6）若指定一个精确坐标，则数值为x坐标，另一个默认垂直居中

（7）若指定两个值为精确单位和方位名词混合使用，则第一个值为x坐标，第二个值为y坐标

**背景附着**

背景是滚动/固定

```css
background-attachment: fixed | scroll;
```

| **参数** | **作用**                 |
| -------- | ------------------------ |
| scroll   | 背景图像是随对象内容滚动 |
| fixed    | 背景图像固定             |

**背景简写**

无强制标准

```css
background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;
background: #fff url(image.jpg) repeat-y  scroll center top;
```

**背景透明**

```css
background: rgba(0, 0, 0, 0.3);  
```

（1）最后一个参数alpha 透明度 取值范围 0~1

（2）可以省略0.3的0

（3）盒子里面的内容不受影响



## css三大特性

### 层叠性

**概念**

多种CSS样式的叠加

是浏览器处理冲突的一个能力,如果一个属性通过两个相同选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉

**原则**

样式冲突，遵循的原则是**就近原则**

样式不冲突，不会层叠

 

### 继承性

**概念**

子标签会继承父标签的某些样式，如文本颜色和字号

想要设置一个可继承的属性，只需将它应用于父元素

子元素可以继承父元素的样式（**`text-，font-，line-`这些元素开头**的可以继承，以及`color`属性）

 

### 优先级

**概念**

定义CSS样式时，经常出现两个或更多规则应用在同一元素上

（1）选择器**相同**，则执行层叠性

（2）选择器**不同**，就会出现优先级的问题



### 权重计算公式

![image-20220222165738714](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221657768.png)

| **标签选择器**                            | **计算权重公式** |
| ----------------------------------------- | ---------------- |
| **继承**或者 *****                        | 0,0,0,**0**      |
| 每个元素（**标签选择器**）                | 0,0,0,**1**      |
| 每个**类**，**伪类**                      | 0,0,**1,0**      |
| 每个**ID**                                | 0,**1,0,0**      |
| 每个**行内样式**  style=""                | **1,0,0,0**      |
| 每个!important 重要的（样式属性后面添加） | ∞ 无穷大         |

值从左到右，左面的最大，一级大于一级，数位之间没有进制，级别之间不可超越

### 权重叠加

![image-20220222165836094](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221658152.png)

**注意**

数位之间**没有进制**

比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况

 

**继承的权重为0**

这个不难，但是忽略很容易绕晕。其实，我们修改样式，**一定要看该标签有没有被选中**

（1）如果**选中了**，那么以上面的公式来计权重。谁大听谁的

（2）如果**没有选中**，那么权重是0，因为继承的权重为0

![用喀수 ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAA3CAIAAABB47lGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAANiSURBVHhe7Zs/T9tAGIfP/QSIKWGDgbVSBiQy0okhi7NhMTJ16MJmSyWSs3UgA1PVhcjZ4iUSTLBUciQkInXo0oFMYFeqUL6B+95xzflfiIlF3pi+j07Cd7YJPD7/7rUFWhiGjFgu7+RXYomQdARIOgIkHQGSjgBJR4CkI0DSESDpCJB0BEg6AiQdAZKOAElHgKQjQNIRIOkIkHQESDoCJB0Bko4ASUcgv/Sg19G07lD2XkJw2dRa7ewzR22t1ew9yF4Ohu2W1rwMZK+cFJrpwqaW0XJfG5CnM9e4etm1dG+qyU8UrSwXo3i86M5RGH6eNt9ZkzvyUKmZZzs6exy/yJa+40c+UbX+fkUesdosP9NFTEWmZ/XGZROjqkZmBNEbYs6f1Q27Wv1ObieA6XbGPlZvmHPUP9iQg8Jp1Vj3wsNdCB8uNMEW38Wj/Oce31CoE+WA4JkfIMaa4386KMc8B0B6PnznlLFzT/YE/oXOTnTnXnYF6cPEyIkdG7p37BNm38ou59ZmMHLh+7Iv8c4ZO3USgwnyHLNSFI8X1/g6TQZoVWMid0gervuJEYjyjQOzYVuDad0ybA8suAnM/UppZmsBXn0hDX70RcSMvnTiYV0zvS23/4OvoMNu3WK2Fw8WRSzxM1qu/FklXnshDa5/ufqaDjeEO7HqnV6vG5P1VPwJa1Z96rHTixUzkNfqomY0b0seWBbmSucPI8KFyI27uvSiKvHaplpFU4y+Gcw53oYt2wM764ZxxzeUsobN9zUiI9BKtCQuRK6ZHq+LVYCM/6SKkxhB77ulb+9tyi7bPYTTzRkh8h9RPF4iscBbZCGFaT6xj4s/sFCmRwjGj+nAVfdB8HtkN1Lzmr9siSiDogWu2yAy0tLao6dD/xH7CPH9odhXI28w02cjakFIj1kzubLfN2tyW1Ezo74yMz16Fk+keRGf55iVYnHpwyvDZXrz/av8sjNfpSXW81QrxTuvuf9dB9ULFNHZwAKbeseU8TQv3gfUvMwlFNJmYMFMz7gnssl+W1AuFqhewvDIgcIbovYsY5Ecj1PPn0SCudJ3zdQrUx4ssRdM01oeGtwWuvOBysLnoH/eRaBIyUgsCElHgKQjQNIRIOkIkHQESDoCJB0Bko4ASUeApCNA0hEg6UuHsb9gOSwNCNbtAgAAAABJRU5ErkJggg==)

```html
<div class="demo">
    <p>胡梓卓</p>
</div>

div {
    color: red;
}
p {
    color: green;
}
.demo {
    color: blue;
}
```

![文 字 ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAyCAIAAAB53arNAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAIXSURBVGhD7ZlBasJAFIZnegJxpe7SI7gImBt00U3cKV0V1z2AggbiXtelCJZkpxvB3iCCYKAXqCuNq+INpsnkUbFN0pmpBhnnQ8h7iQP+vJn/zUS82WyQ7NzAVWquQiQejUYQyst1VJIQAqG8KOORBSVSFpRIWVAiZUGJlAUlUhaUyAy2bt3CfR8yPsKxQ3cHSR4IV1KrFlBnVne3kLOze59M981ynjrD86Qont1DaOxBxkMwN1EP2StIz80fh+bFKzY+IObj1iMPmjssN/dwgxnb67ZrEJ+IWCsDgTPIqBt9OnACSGOyhyRAK2yLzI1M2NdkSSsi9LlOWUjrdVixolaC9LLgecfj9/HMd1qTRgVuHIgedex70q7CjSNCO31uTiFJIZreJ56kB+KCspHqNN4YCU6zlR06kJh7scPnrslrZuOYPWTOj9cjA7HHCgzkhbeFJBRTqIzUk/LqIvx9kk6ww4/7kbJxJhdNQ+TlMm2eZuRAKHIUpAeTuwRb/V+PPakJxVo5oZOWfsRWVM6VFNu71h51M46my5dFHF0wAiIXfQuXl8hpEdJyTNQxLFx/y/NQwQ2XyEgetgxfD0iXbgkqjUmXBLo5XZax8MkrB2DaZhI3tGwX/f4OS2cX3zwIwXYKKTjBU4NtXxpW2+iE198OSbd+EIdnjbQ94BlQ/0/KghIpC0qkLCiRsqBEyoISKQtXIBKhL61yOLYDhrQJAAAAAElFTkSuQmCC)

```html
/* 21 */
        .c1 .c2 div{  
            color: blue;
        }
        /* 101 */
        
        /* 101 */
        #box1 div { 
            color:yellow;
        }
        /* 就近原则 */
        div #box3 {  
            color:green;
        }
    </style>
</head>
<body>
    <div id="box1" class="c1">
        <div id="box2" class="c2">
            <div id="box3" class="c3">
                文字
            </div>
        </div>
    </div>
</body>
```

## 盒子模型

- 盒子模型有元素的**内容**、**边框**（border）、**内边距**（padding）、和**外边距**（margin）组成
- 盒子里面的文字和图片等元素是     内容区域
- 盒子的厚度     我们成为 盒子的边框 
- 盒子内容与边框的距离是内边距（类似单元格的     cellpadding)
- 盒子与盒子之间的距离是外边距（类似单元格的     cellspacing）

![image-20220222170709121](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221707173.png)

**盒子模型box-sizing**

![image-20220222170645385](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221706454.png)

**content-box**

默认值，标准盒子模型。 [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。注意: 内边距、边框和外边距都在这个盒子的外部。 比如说，.box {width: 350px; border: 10px solid black;} 在浏览器中的渲染的实际宽度将是 370px。

 尺寸计算公式：

width = 内容的宽度

height = 内容的高度

宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。

 

**border-box**

 [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式 时Internet Explorer使用的[盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)。注意，填充和边框将在盒子内 , 例如, .box {width: 350px; border: 10px solid black;} 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。

 尺寸计算公式：

*width* *= border + padding +* *内容的宽度*

*height* *= border + padding +* *内容的高度*



 ## 盒子边框

```css
border : border-width || border-style || border-color 
```

| **属性**     | **作用**               |
| ------------ | ---------------------- |
| Border-width | 定义边框粗细，单位：px |
| Border-style | 边框的样式             |
| Border-color | 边框颜色               |

边框的样式：

（1）none：没有边框（忽略所有边框的宽度[默认值]）

（2）solid：边框为**实线**

（3）dashed：边框为**虚线**

（4）dotted：边框为**点线**

```css
简写形式
border: 1px solid red; 没有顺序
```

| **上边框**                  | **下边框**                     | **左边框**                   | **右边框**                    |
| --------------------------- | ------------------------------ | ---------------------------- | ----------------------------- |
| border-top-style:样式;      | border-bottom-style:样式;      | border-left-style:样式;      | border-right-style:样式;      |
| border-top-width:宽度;      | border- bottom-width:宽度;     | border-left-width:宽度;      | border-right-width:宽度;      |
| border-top-color:颜色;      | border- bottom-color:颜色;     | border-left-color:颜色;      | border-right-color:颜色;      |
| border-top:宽度  样式 颜色; | border-bottom:宽度  样式 颜色; | border-left:宽度  样式 颜色; | border-right:宽度  样式 颜色; |

```html
用户名:<input type="text">
<br />
密码:<input type="password">

input {
 /* border-top: 2px solid green;
  border-left: 1px dashed #000;
  border-right: 1px dashed #000;
  border-bottom: 3px dotted blue; */

  border: none;
  border-bottom: 2px solid red;
}
```

## 表格的细线边框

通过表格的cellspacing="0",将单元格与单元格之间的距离设置为0，

但是两个单元格之间的边框会**出现重叠**，从而使边框变粗

 

通过表格属性：

```css
table{ border-collapse:collapse; }
```

collapse 单词是合并的意思

border-collapse:collapse; 表示相邻边框合并在一起



## 内边距padding

![image-20220222170548566](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221705618.png)

padding属性用于设置内边距 **是指** **边框与内容之间的距离**

 

| **属性**       | **作用** |
| -------------- | -------- |
| padding-left   | 左内边距 |
| padding-right  | 右内边距 |
| padding-top    | 上内边距 |
| padding-bottom | 下内边距 |

 

当我们给盒子指定padding值之后， 发生了2件事情：

1. 内容和边框 有了距离，添加了内边距。
2. **盒子会变大了**

| **值的个数** | **表达意思**                                     |
| ------------ | ------------------------------------------------ |
| 1个值        | padding：上下左右内边距;                         |
| 2个值        | padding: 上下内边距  左右内边距 ；               |
| 3个值        | padding：上内边距  左右内边距 下内边距；         |
| 4个值        | padding: 上内边距  右内边距 下内边距 左内边距 ； |

### 内盒尺寸计算**（元素实际大小）**

**宽度**
 Element Height = content height + padding + border （Height为内容高度）

 

**高度**
 Element Width = content width + padding + border （Width为内容宽度）

 

**盒子的实际的大小** **=** **内容的宽度和高度** **+** **内边距** **+** **边框**



### padding不会影响盒子大小的情况

如果**没有给一个盒子指定宽度**， 此时，如果给这个盒子指定padding， 则不会撑开盒子

![image-20220222170511403](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221705470.png)

## 外边距margin

![image-20220222170733145](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221707207.png)

margin属性用于设置外边距。 margin就是控制**盒子和盒子之间的距离**

| **属性**      | **作用** |
| ------------- | -------- |
| margin-left   | 左外边距 |
| margin-right  | 右外边距 |
| margin-top    | 上外边距 |
| margin-bottom | 下外边距 |

### 块级盒子水平居中

可以让一个**块级盒子实现水平居中**必须：

- 盒子**必须指定**了**宽度**（width）
- 然后就给**左右的外边距都设置为****auto**

 

常用三种写法：

![image-20220222170825529](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221708585.png)

### 文字居中和盒子居中区别

盒子内的文字水平居中是 **text-align: center**, 而且还可以让 行内元素和行内块居中对齐

 

块级盒子水平居中 左右**margin** 改为 **auto** 

### 插入图片和背景图片区别

插入图片 我们用的最多 比如产品展示类 移动位置只能靠盒模型 **padding margin**

 

背景图片我们一般用于小图标背景 或者 超大背景图片 背景图片 只能通过 **background-position**

```css
img {  
    width: 200px;/* 插入图片更改大小 width 和 height */
    height: 210px;
    margin-top: 30px;  /* 插入图片更改位置 可以用margin 或padding  盒模型 */
    margin-left: 50px; /* 插入当图片也是一个盒子 */
}
div {
    width: 400px;
    height: 400px;
    border: 1px solid purple;
    background: #fff url(images/sun.jpg) no-repeat;
    background-position: 30px 50px; /* 背景图片更改位置 我用 background-position */
```

### 清除元素的默认内外边距

![image-20220222170933739](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221709802.png)

```css
* {
    padding:0;         /* 清除内边距 */
    margin:0;          /* 清除外边距 */
}
```

**注意：**

行内元素为了照顾兼容性， 尽量只设置**左右内外边距**， 不要设置上下内外边距

### 外边距合并

#### (1) 相邻块元素垂直外边距的合并

当上下相邻的两个块元素相遇时，如果**上面的元素有下外边距**margin-bottom，

**下面的元素有上外边距**margin-top，则他们之间的垂直间距不是margin-bottom与margin-top之和，

**取两个值中的较大者**这种现象被称为相邻块元素垂直外边距的合并（也称外边距塌陷）

![image-20220222171040644](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221710712.png)

**解决方案：尽量给只给一个盒子添加margin值**

#### (2) 嵌套块元素垂直外边距的合并（塌陷）

对于两个嵌套关系的块元素，如果**父元素没有上内边距及边框**

父元素的上外边距会与子元素的上外边距发生合并

合并后的外边距为两者中的**较大**者

![image-20220222171130322](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221711389.png)

**解决方案：**

+ 可以为**父**元素定义**上边框**

 ```css
  border-top: 1px solid transparent;  
 ```

+ 可以为**父**元素定义**上内边距**

  ```css
  padding-top: 1px;  
  ```

+ 可以为父元素添加`overflow:hidden`



## 盒子模型布局稳定性

按照 优先使用 宽度 （width） 其次 使用内边距（padding） 再次 外边距（margin）

  width > padding >  margin  

**原因：**

margin 会有外边距合并 还有 ie6下面margin 加倍的bug（讨厌）所以最后使用

padding 会影响盒子大小， 需要进行加减计算（麻烦） 其次使用

width 没有问题（嗨皮）我们经常使用宽度剩余法 高度剩余法来做

## ps基本操作以及常用快捷键

- 文件--打开 -- 可以打开 我们要测量的图片
- ctrl+r 可以打开标尺 或者 视图 -- 标尺
- 右击标尺， 把里面的单位改为 像素 
- ctrl+ 加号 键 可以 放大 视图 ctrl+ 减号 缩小视图
- 按住空格键， 鼠标可以 变成小手 ，拖动 ps 视图
- 用选区 拖动 可以 测量 大小 
- ctrl+ d 可以取消选区     或者旁边空白处点击一下也可以取消选区

![image-20220222171403781](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221714859.png)

## 去掉列表默认的样式

无序和有序列表前面默认的列表样式，在不同浏览器显示效果不一样，而且也比较难看，所以，我们一般上来就直接去掉这些列表样式就行了。 代码如下

```css
li { list-style: none; }
```

## 圆角边框(CSS3)

## 语法

  ```css
  border-radius:length;  
  ```

其中每一个值可以为 数值或百分比的形式。 

 

技巧： 让一个正方形 变成**圆圈** 

  ```css
  border-radius: 50%;  
  ```

矩形就只用 用 高度的一半就好

![image-20220222171546998](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221715058.png)

```html
<p class="test">今日特价</p>
.test {
    margin: auto;
    width: 120px;
    height: 30px;
    background-color: red;
    color: white;
    text-align: center;
    line-height: 30px;
    border-radius: 7px;
}
```

**圆角矩形设置4个角**

圆角矩形可以为4个角分别设置圆度， 但是是有顺序的

```css
border-top-left-radius:20px;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
border-bottom-left-radius:20px;
```

里面数值不同，我们也可以按照简写的形式，具体格式如下:

```css
border-radius: 左上角 右上角  右下角  左下角;
```

## 盒子阴影

```css
/*语法*/
box-shadow:水平阴影 垂直阴影 模糊距离（虚实）  阴影尺寸（影子大小）  阴影颜色  内/外阴影；
```

![image-20220222171706717](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221717809.png)

前两个属性是必须写的。其余的可以省略

 

**外阴影** **(outset)** **是默认**的 但是**不能写** 想要内阴影可以写 **inset**



## css布局的三种机制

CSS 提供了 **3** **种机制**来设置盒子的摆放位置，分别是**普通流**（标准流）、**浮动**和**定位**

+ 普通流（标准流）

**块级元素**会独占一行，**从上向下**顺序排列；

常用元素：div、hr、p、h1~h6、ul、ol、dl、form、table

**行内元素**会按照顺序，**从左到右**顺序排列，碰到父元素边缘则自动换行；

常用元素：span、a、i、em等

 

+ 浮动

让盒子从普通流中**浮**起来,主要作用让多个块级盒子一行显示

 

+ 定位

将盒子**定**在浏览器的某一个**位**置——CSS 离不开定位，特别是后面的 js 特效

### 浮动

![image-20220222171830011](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221718085.png)

在 CSS 中，通过 **float** 中文， 属性定义浮动，语法如下：

```css
选择器 { float: 属性值; }
```

| **属性值** | **描述**                 |
| ---------- | ------------------------ |
| **none**   | 元素不浮动（**默认值**） |
| **left**   | 元素向**左**浮动         |
| **right**  | 元素向**右**浮动         |

![image-20220222172056533](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221720618.png)

浮动——特性 **float属性会改变元素display属性**

| **特点** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| 浮       | 加了浮动的盒子**是浮起来**的，漂浮在其他标准流盒子的上面。   |
| 漏       | 加了浮动的盒子**是不占位置的**，它原来的位置**漏给了标准流的盒子**。 |
| 特       | **特别注意**：浮动元素会改变display属性，  类似转换为了行内块，但是元素之间没有空白缝隙 |

给浮动的元素**添加一个标准流的父亲**，最大化的减小了对其他标准流的影响

### 浮动(float)的扩展

**（1）浮动元素与父盒子的关系**

子盒子的浮动参照父盒子对齐

不会与父盒子的边框重叠，也不会超过父盒子的内边距

![image-20220222172217548](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221722619.png)

**（2）浮动元素与兄弟盒子的关系**

在一个父级盒子中，如果**前一个兄弟盒子**是：

**浮动**的，那么**当前盒子**会与前一个盒子的顶部对齐；

**普通流**的，那么**当前盒子**会显示在前一个兄弟盒子的下方

![image-20220222172247817](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221722882.png)

浮动只会影响**当前**的或者是**后面**的标准流盒子，**不会影响前面的标准流**

**建议**

**如果一个盒子里面有多个子盒子，如果其中一个盒子浮动了，其他兄弟也应该浮动防止引起问题**



## 清除浮动

![image-20220222172536746](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221725824.png)

**总结**

由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响

准确地说，并不是清除浮动，而是**清除浮动后造成的影响**

 

**清除浮动本质**

清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题

清除浮动之后， 父级就会根据浮动的子盒子**自动检测高度**

父级有了高度，就**不会影响**下面的标准流了

 

**清除浮动的方法**

在CSS中，**clear属性**用于清除浮动

**语法**

```css
选择器{clear:属性值;}   clear 清除
```

| **属性值** | **描述**                                   |
| ---------- | ------------------------------------------ |
| left       | 不允许左侧有浮动元素（清除左侧浮动的影响） |
| right      | 不允许右侧有浮动元素（清除右侧浮动的影响） |
| both       | 同时清除左右两侧浮动的影响                 |

Why?清除浮动

1. 父级没高度    

2. 子盒子浮动了    

3. 影响下面布局了，我们就应该清除浮动了       



### 额外标签法(隔墙法)

是W3C推荐的做法是通过在**浮动元素末尾添加一个空的标签**例如 

```html
<div style=”clear:both”></div>
```

或则其他标签br等亦可

```html
<div class="one">
    <div class="damao"></div>
    <div class="ermao"></div>
    <div class="clear"></div>
</div>
<div class="two"></div>
/*清除浮动*/
.clear {
    clear: both;
}
```

- 优点： 通俗易懂，书写方便
- 缺点：     添加许多无意义的标签，结构化较差

### 父级添加overflow属性方法

```css
可以给父级添加： overflow为 hidden| auto| scroll  都可以实现
overflow: scroll;
```

优点： 代码简洁

缺点： 内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素

### 使用after伪元素清除浮动

```css
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    *zoom: 1;
}/* IE6、7 专有 */
```

优点： 符合闭合浮动思想 结构语义化正确

缺点： 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout

代表网站： 百度、淘宝网、网易等

### 使用双伪元素清除浮动

```css
.clearfix:before,
.clearfix:after {
    content: "";
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}
```

优点： 代码更简洁

缺点： 由于IE6-7不支持:after，使用 zoom:1触发 hasLayout

代表网站： 小米、腾讯等



## 常用图片格式

```
1. jpg图像格式： 
JPEG（.JPG）对色彩的信息保留较好，高清，颜色较多，我们产品类的图片经常用jpg格式的
2. gif图像格式：
GIF格式最多只能储存256色，所以通常用来显示简单图形及字体，但是可以保存透明背景和动画效果
3. png图像格式
是一种新兴的网络图形格式，结合了GIF和JPEG的优点，具有存储形式丰富的特点，能够保持透明背景
4. PSD图像格式
PSD格式是Photoshop的专用格式，里面可以存放图层、通道、遮罩等多种设计草稿
```



## PS切片工具

![image-20220222173339731](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221733815.png)

## 切图插件

Cutterman是一款运行在photoshop中的插件，能够自动将你需要的图层进行输出， 以替代传统的手工 "导出web所用格式" 以及使用切片工具进行挨个切图的繁琐流程。 它支持各种各样的图片尺寸、格式、形态输出，方便你在pc、ios、Android等端上使用它不需要你记住一堆的语法、规则，纯点击操作，方便、快捷，易于上手

 

官网: http://www.cutterman.cn/zh/cutterman

 

注意： cutterman插件要求你的ps **必须是完整版**，不能是绿色版，所以大家需要从新安装完整版本



## CSS属性书写顺序

### 布局定位属性

```css
display / position / float / clear / visibility / overflow

（建议 display 第一个写，毕竟关系到模式）
```

### 自身属性

```css
width / height / margin / padding / border / background
```

### 文本属性

```css
color / font / text-decoration / text-align / vertical-align / white- space / break-word
```

### 其他属性（CSS3）

```css
content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …
```

```css
.jdc {
    display: block;
    position: relative;
    float: left;

    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;

    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);

    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

## 布局流程

```
（1）必须确定页面的版心（可视区）， 我们测量可得知
（2）分析页面中的行模块，以及每个行模块中的列模块；其实页面布局，就是一行行罗列而成
（3）制作HTML结构。我们还是遵循，先有结构，后有样式的原则。结构永远最重要
（4）然后开始运用盒子模型的原理，通过DIV+CSS布局来控制网页的各个模块
```

## chrome调试工具

**F12** **或者** **ctrl+shift+I**

**Chrome提示的常见布局错误**

![image-20220222173749849](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221737944.png)

![image-20220222173811870](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221738972.png)

![image-20220222173825466](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221738556.png)

![image-20220222173840948](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221738051.png)

## 定位

将盒子**定**在某一个**位**置 自由的漂浮在其他盒子(包括标准流和浮动)的上面 )

 

**标准流**在最底层 (海底) ------- **浮动** 的盒子 在 中间层 (海面) ------- **定位**的盒子 在 最上层 （天空）

 

**定位** **=** **定位模式** **+** **边偏移**

| **边偏移属性** | **示例**     | **描述**                                               |
| -------------- | ------------ | ------------------------------------------------------ |
| top            | top: 80px    | **顶端**偏移量，定义元素相对于其父元素**上边线的距离** |
| bottom         | bottom: 80px | **底部**偏移量，定义元素相对于其父元素**下边线的距离** |
| left           | left: 80px   | **左侧**偏移量，定义元素相对于其父元素**左边线的距离** |
| right          | right: 80px  | **右侧**偏移量，定义元素相对于其父元素**右边线的距离** |

**注意：**

1. **边偏移**需要和**定位模式**联合使用，**单独使用无效**

1. **top** 和 **bottom** 不要同时使用
2. **left** 和 **right**     不要同时使用



## 定位模式

在 CSS 中，通过 position 属性定义元素的**定位模式**，语法如下：

```css
选择器 { position: 属性值; }
```

| **值**   | **语义**     |
| -------- | ------------ |
| static   | **静态**定位 |
| relative | **相对**定位 |
| absolute | **绝对**定位 |
| fixed    | **固定**定位 |

![image-20220222174009262](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221740342.png)

| **定位模式**     | **是否脱标占有位置** | **移动位置基准**       | **模式转换（行内块）** | **使用情况**             |
| ---------------- | -------------------- | ---------------------- | ---------------------- | ------------------------ |
| 静态static       | 不脱标，正常模式     | 正常模式               | 不能                   | 几乎不用                 |
| 相对定位relative | 不脱标，占有位置     | 相对自身位置移动       | 不能                   | 基本单独使用             |
| 绝对定位absolute | 完全脱标，不占有位置 | 相对于定位父级移动位置 | 能                     | 要和定位父级元素搭配使用 |
| 固定定位fixed    | 完全脱标，不占有位置 | 相对于浏览器移动位置   | 能                     | 单独使用，不需要父级     |

### 静态定位（static）

**静态定位**是元素的默认定位方式，无定位的意思

 

静态定位 按照**标准流特性摆放位置**，它**没有边偏移**

 

静态定位在布局时我们几乎不用的

### 相对定位（relative）

**相对定位**是元素**相对**于它 原来在标准流中的位置 来说的

![image-20220222174111139](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221741235.png)

**相对定位的特点**

相对于 自己原来在标准流中位置来移动的

原来**在标准流的区域继续占有**，后面的盒子仍然以标准流的方式对待它





### 绝对定位（absolute）

**绝对定位**是元素以带有定位的父级元素来移动位置

 

1. **完全脱标** —— 完全不占位置； 
2. **父元素没有定位**，则以**浏览器**为准定位（Document     文档）

![image-20220222174247717](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221742814.png)

3. **父元素要有定位**

   将元素依据最近的**已经定位**（绝对、固定或相对定位）的**父元素**（祖先）进行定位

   ![image-20220222174318626](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221743724.png)

   **绝对定位的特点**

   - 绝对是以带有定位的父级元素来移动位置     （拼爹型） 如果父级都没有定位，则以浏览器文档为准移动位置
   - 不保留原来的位置，完全是脱标的

    

   **定位口诀** **——** **子绝父相**

    

   **绝对定位盒子的居中**

   **注意**：**绝对定位/固定定位的盒子**不能通过设置 `margin: auto` 设置**水平居中**

   ![image-20220222174412134](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221744221.png)

   left: 50%;：让**盒子的左侧**移动到**父级元素的水平中心位置**

   margin-left: -100px;：让盒子**向左**移动**自身宽度的一半**

   ![image-20220222174434756](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221744841.png)

   

   ### 固定定位（fixed）

   **固定定位**是**绝对定位**的一种特殊形式

   1. **完全脱标** —— 完全不占位置；

   1. 只认**浏览器的可视窗口** —— 浏览器可视窗口 + 边偏移属性 来设置元素的位置

   - 跟**父元素没有任何关系**；单独使用的
   - **不随滚动条滚动**

   ![image-20220222174531724](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221745828.png)

   ### 堆叠顺序（z-index）

   在使用**定位**布局时，可能会**出现盒子重叠的情况**。

   加了定位的盒子，默认**后来者居上**， 后面的盒子会压住前面的盒子

   应用 **z-index** 层叠等级属性可以**调整盒子的堆叠顺序**

   ![image-20220222174604386](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221746468.png)

   **z-index 的特性如下**

   1. **属性值**：**正整数**、**负整数**或 **0**，默认值是     0，数值越大，盒子越靠上；

   2. 如果**属性值相同**，则按照书写顺序，**后来居上**；

   3. **数字后面****不能加单位**

   **注意**：z-index 只能应用于**<u>相对定位</u>**、**<u>绝对定位</u>**和**<u>固定定位</u>**的元素，其他**标准流**、**浮动**和**静态定位**无效

   

   ### 定位改变display属性

   - 可以用inline-block 转换为行内块
   - 可以用浮动     float     默认转换为行内块（类似，并不完全一样，因为浮动是脱标的）
   - 绝对定位和固定定位也和浮动类似，     默认转换的特性 转换为行内块

    

   一个行内的盒子，如果加了**浮动**、**固定定位**和**绝对定位**，不用转换，就可以给这个盒子直接设置宽度和高度等

    

   **同时注意**

   **浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并**的问题。 （我们以前是用padding border overflow解决的）

   也就是说，我们给盒子改为了浮动或者定位，就不会有垂直外边距合并的问题了



## 元素的隐藏与显示

### （1）dispaly显示

![image-20220222175144642](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221751728.png)

### （2）visibility可见性

![image-20220222175212349](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202221752435.png)

### （3）overflow溢出

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容

| **属性值**  | **描述**                                   |
| ----------- | ------------------------------------------ |
| **visible** | 不剪切内容也不添加滚动条                   |
| **hidden**  | 不显示超过对象尺寸的内容，超出的部分隐藏掉 |
| **scroll**  | 不管超出内容否，总是显示滚动条             |
| **auto**    | 超出自动显示滚动条，不超出不显示滚动条     |

## css用户界面样式

- 更改用户的鼠标样式 (滚动条因为兼容性非常差，我们不研究) 
- 表单轮廓等。
- 防止表单域拖拽

### 鼠标样式cursor

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状

| **属性值**      | **描述**  |
| --------------- | --------- |
| **default**     | 小白 默认 |
| **pointer**     | 小手      |
| **move**        | 移动      |
| **text**        | 文本      |
| **not-allowed** | 禁止      |

```html
<ul>
        <li style="cursor:default">我是小白</li>
        <li style="cursor:pointer">我是小手</li>
        <li style="cursor:move">我是移动</li>
        <li style="cursor:text">我是文本</li>
        <li style="cursor:not-allowed">我是文本</li>
</ul>
```

### 轮廓线outline

![image-20220223090347339](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230903409.png)

是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用

```css
outline : outline-color ||outline-style || outline-width

取消轮廓线
outline: 0; 或者 outline: none;
```

### 防止拖拽文本域resize

![image-20220223090442141](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230904195.png)

```html
<textarea  style="resize: none;"></textarea>
```



## vertical-align垂直对齐

- 有宽度的块级元素居中对齐，是margin: 0 auto;
- 让文字居中对齐，是 text-align: center;

 

它只针对于**行内元素**或者**行内块元素**

![image-20220223090532597](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230905669.png)

```css
vertical-align : baseline |top |middle |bottom
```

**通常用来控制图片表单与文字的对齐**



### 图片、表单和文字对齐

默认的图片会和文字基线对齐

![image-20220223090628316](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230906381.png)

### 去除图片底侧空白缝隙

**原因**

图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐

就是图片底侧会有一个空白缝隙



**解决**

- 给img     `vertical-align:middle | top| bottom`等等； 让图片不要和基线对齐
- 给img 添加 `display：block;` 转换为块级元素就不会存在问题了



## 溢出的文字省略号显示

### white-space

设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容

```css
white-space:normal; 默认处理方式

white-space:nowrap;　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行
```

### text-overflow 文字溢出

设置或检索是否使用一个省略标记（...）标示对象内文本的溢出

```css
text-overflow : clip ；不显示省略标记（...），而是简单的裁切

text-overflow：ellipsis ； 当对象内文本溢出时显示省略标记（...）
```

![image-20220223090834008](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230908072.png)



## CSS精灵技术（sprite)

**为了有效地<u>减少</u>服务器接受和发送请求的次数，<u>提高</u>页面的加载速度**



CSS 精灵其实是将网页中的一些背景图像**整合到一张大图**中（精灵图），然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确**定位到精灵图中的某个小图**

 

- background-image
- background-repeat
- background-position属性进行背景定位
- 其中最关键的是使用`background-position` 属性精确地定位

 

css精灵技术**主要针对于背景图片**，插入的图片img 是不需要这个技术的。

精确测量，每个小背景图片的大小和 位置

给盒子指定小背景图片时， 背景定位基本都是 **负值**

```css
div{
    background:url(../images/abcd.jpg)no-repeat;
    float:left;
}
.h{
    width:101px;
    height:106px;
    background-position:-220px-141px;
}
.z{
    width:115px;
    height:97px;
    background-position:-485px-560px;
}
```

![image-20220223091404243](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230914310.png)

**png格式为透明背景**

**72px为网页显示像素**



## 滑动门

为了使各种特殊形状的背景能够自适应元素中文本内容的多少，出现了CSS滑动门技术

### 核心技术

利用CSS精灵（主要是背景位置）和 **盒子padding撑开宽度**, 以便能适应不同字数的导航栏

 

### 总结

1. a     设置 背景左侧，padding撑开合适宽度
2. span 设置背景右侧， padding撑开合适宽度 剩下由文字继续撑开宽度
3. 之所以a包含span就是因为 整个导航都是可以点击的

```css
<body>
    <div class="nav">
        <ul>
            <li>
                <a href="#">
                    <span>首页</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span>帮助与反馈</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span>公众平台</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span>开发平台</span>
                </a>
            </li>
        </ul>
    </div>
</body>
 


* {
    padding: 0;
    margin: 0;
}
li {
    list-style: none;
    margin: 5px;
    float: left;
}
li a {
    text-decoration: none;
    font-size: 14px;
    color: #fff;
    line-height: 33px;
}
body {
    background: url(../images/wx.jpg) repeat-x;
}
.nav {
    margin-top: 20px;
}
.nav a {
    display: inline-block;
    height: 33px;
    background: url(../images/to.png) no-repeat;
    padding-left: 15px;
}
.nav a span {
    display: inline-block;
    height: 33px;
    background: url(../images/to.png) no-repeat top right;
    padding-right: 15px;
}
.nav a:hover {
    background-image: url(../images/ao.png);
}
.nav a:hover span {
    background-image: url(../images/ao.png);
}
```

## margin负值

**负边距+定位：水平垂直居中**

### 压住盒子相邻边框

```css
margin-left:-1px;
margin-top:-1px;
```

```css
使用div盒子鼠标经过样式会出现问题
div:hover {
border:1px solid #f40;
}
使用相对定位-保留位置
div:hover {
    border:1px solid #f40;
    position: relative;
}
如果已经存在相对定位，使用z-index: 1
```

```css
CSS三角形
width:0;
height:0;
border-top: 10px solid red;
border-right: 10px solid green;
border-bottom: 10px solid blue;
border-left: 10px solid pink;
```

1. 我们用css 边框可以模拟三角效果

1. **宽度高度为0**

1. 我们**4个边框都要写**，     只保留需要的边框颜色，其余的不能省略，都改为 `transparent` 透明就好了
2. 为了照顾兼容性 低版本的浏览器，加上 `font-size:0; line-height: 0;`



## 过渡

过渡（transition)

是CSS3中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果

 

过渡动画：是从一个状态 渐渐的过渡到另外一个状态

 

经常和 `:hover` 一起 搭配使用

**语法格式**:

```css
transition: 要过渡的属性  花费时间  运动曲线  何时开始;
```

| **属性**                   | **描述**                                   | **CSS** |
| -------------------------- | ------------------------------------------ | ------- |
| transition                 | 简写属性，用于在一个属性中设置四个过渡属性 | 3       |
| transition-property        | 规定应用过渡的 CSS 属性的名称              | 3       |
| transition-duration        | 定义过渡效果花费的时间，默认是  0          | 3       |
| transition-timing-function | 规定过渡效果的时间曲线，默认是  "ease"     | 3       |
| transition-delay           | 规定过渡效果何时开始，默认是  0            | 3       |

### 属性

属性就是你想要**变化的** **css** **属性**， 宽度高度 背景颜色 内外边距都可以 

如果想要所有的属性都变化过渡， 写一个**all** 就可以

### 花费时间

transition-duration 花费时间 单位是 秒（必须写单位） s ms 比如 0.5s 这个s单位必须写 ms 毫秒

### 运动曲线

默认是 ease

![image-20220223092012176](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230920257.png)

### 何时开始

默认是 0s 鼠标触发就立即开始 可以设置 延迟触发时间

```css
div {
    width: 200px;
    height: 100px;
    background-color: pink;
    /* transition: 要过渡的属性  花费时间  运动曲线  何时开始; */
	/*如果有多组属性，使用逗号隔开*/
    transition: width 0.6s ease 0s, height 0.3s ease-in 1s;
    /* transtion 过渡的意思  这句话写到div里面而不是 hover里面 */
}
div:hover {  /* 鼠标经过盒子，我们的宽度变为400 */
    width: 600px;
    height: 300px
}
transition: all 0.6s;  /* 所有属性都变化用all 就可以了  后面俩个属性可以省略 */
```



## 获得焦点元素

`:focus` 伪类 选择器用于选取获得焦点的元素 。 我们这里主要针对的是 **表单元素**

:hover

**语法**：

```css
.total input {
    border: 1px solid #ccc;
    height: 30px;
    width: 40px;
    transition: all .5s;
}
/*这个input 获得了焦点*/
.total input:focus {
    width: 80px;
    border: 1px solid skyblue;
}
```



## css3

### 属性选择器

| **选择符**      | **简介**                                        |
| --------------- | ----------------------------------------------- |
| `E[att]  `      | 选择**具有`att属性`**的E元素                    |
| `E[att="val"]`  | 选择具有att属性且属性值**等于`val`**的E元素     |
| `E[att^="val"]` | 匹配具有att属性、且属性值**以`val开头`**的E元素 |
| `E[att$="val"]` | 匹配具有att属性、且属性值**以`val结尾`**的E元素 |
| `E[att="val"]`  | 匹配具有att属性、且属性值中**含有val**的E元素   |

类选择器、属性选择器、伪类选择器 **权重=10**

### 结构伪类选择器

| **选择符**         | **简介**                                   |
| ------------------ | ------------------------------------------ |
| `E:first-child`    | 匹配**父元素**中的**<u>第一个</u>子元素E** |
| `E:last-child`     | 匹配**父元素**中**<u>最后一个</u>E元素**   |
| `E:nth-child(n)`   | 匹配**父元素**中的**<u>第n个</u>子元素E**  |
| `E:first-of-type`  | **<u>指定类型</u>E的第一个**               |
| `E:last-of-type`   | **<u>指定类型</u>E的最后一个**             |
| `E:nth-of-type(n)` | **<u>指定类型</u>E的第n个**                |

n可以是数字、关键字、公式

- 关键词[even]偶数 odd 奇数
- n为公式，则从0开始计算
- 第0个元素或超出元素的个数会被忽略

| **公式** | **取值**                       |
| -------- | ------------------------------ |
| 2n       | 偶数                           |
| 2n+1     | 奇数                           |
| 5n       | 5 10  15…                      |
| n+5      | 从第5个开始（包含第5个）到最后 |
| -n+5     | 前5个（包含第5个）             |

### 伪元素选择器

| **选择符** | **简介**                 |
| ---------- | ------------------------ |
| `::before` | 在元素内部的前面插入内容 |
| `::after`  | 在元素内部的后面插入内容 |

- before和after必须有 **content属性**
- before和after创建一个元素，但是属于行内元素
- 在dom看不见创建的元素，被称为**伪元素**
- 伪元素和标签选择器一样，**权重=1**

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230927734.png" alt="image-20220223092727642" style="zoom:80%;" />

### 2D转换 transform

**转换（transform）**：可以实现元素的位移、旋转、缩放等效果

- 移动：transform
- 旋转：rotate
- 缩放：scale

 

2D转换：改变标签在二维平面上的位置和形状的一种技术

#### 移动 translate

可以改变元素在页面中的位置，类似**定位**

![image-20220223092840019](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230928082.png)

**语法**

```css
transform: translate(x,y);或者分开写
transform: translateX(n);
transform: translateY(n);
```

**重点**

- 定义2D转换中的移动，沿着X和Y轴移动元素
- translate最大的优点：**不会影响到其他元素的位置**
- translate中的百分比单位是相对于自身元素的translate:(50%,50%);
- **对行内标签没有效果**

 

**盒子居中对齐，可使用`transform:translate(-50%, -50%)`来代替盒子尺寸改变外边距固定的写法**

#### 旋转 rotate

让元素在二维平面内顺时针旋转或逆时针旋转

![image-20220223093017668](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230930732.png)

**语法**

```css
transform: rotate(度数);
```

**重点**

- rotate里面跟度数，单位是**deg** rotate(45deg)
- 角度为正时，顺时针，负时，为逆时针
- 默认旋转的中心点是元素的中心点

#### 转换中心点 transform-origin

设置元素转换的中心点

**语法**

```css
transform-origin: x y;  
```

**重点**

- 注意后面的参数x 和 y 用**空格隔开**
- x y 默认转换的中心点是元素的中心点 （50%，50%）
- 可以给x y 设置 **像素** 或者 **方位名词** （top bottom left right center）



#### 缩放 scale

可以放大和缩小

![image-20220223093204758](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230932825.png)

**语法**

 ```css
  transform: scale(x,y);  
 ```

**注意**

- x和y用**逗号分隔**
- transform：scale(1,1)     宽和高都放大一倍，相对于没有放大
- transform：scale(2,2)     宽和高都放大了2倍
- transform：scale(2) **只写一个参数，相当于第二个参数和第一个一样**
- transform：scale(0.5,0.5)     缩小
- 优点：**可以设置转换中心点，默认以中心点缩放，不影响其他盒子** 

#### 综合写法

- 同时使用多个转换，其**格式**为

 ```css
  transform: translate() rotate() scale();  
 ```

- 其**顺序**会影响转换的效果（先旋转会改变坐标轴方向）

- 同时有位移和其他属性时，要把**<u>位移放到最前面</u>**



### 动画 animation

动画（animation）可通过设置多个节点来精确控制一个或一组动画

#### 动画的基本使用

##### 基本使用

- 定义动画
- 调用动画

##### 用keyframes定义动画（类似定义类选择器）

```css
@keyframes 动画名称 {
     0% {
        width: 100px;
    }
    100% {
        width: 300px;
    }
}
```

##### 元素使用动画

```css
div {
    width: 200px;
    height: 200px;
    background-color: aqua;
    margin: 100px auto;
    /* 调用动画 */
    animation-name: 动画名称;
    /* 持续时间 */
    animation-duration: 持续时间;
}
```

```css
@keyframes move {
    0% {
        transform: translate(0,0);
    }
    25% {
        transform: translate(1000px,0);
    }
    50% {
         transform: translate(1000px,100px);
    }
    75% {
        transform: translate(0px,100px);
    }
    100% {
        transform: translate(0,0px);
    }
}
div {
    width: 200px;
    height: 200px;
    background-color: palegreen;
    animation-name: move;
    animation-duration: 3s;
}
```

#### 动画序列

（1）0% 是动画的**开始**，100% 是动画的**完成**

（2）在 **@keyframes** 中规定某项CSS样式，就能创建由当前样式逐渐改为新样式的动画效果

（3）动画是使元素从一种样式逐渐变化为另一种样式的效果；可以改变任意多的样式和**次数**

（4）用百分比规定变化发生的时间，或用关键词"form"和"to"，等同于**0%**和**100%**

#### 动画属性

| @keyframes                | 规定动画                                                     |
| ------------------------- | ------------------------------------------------------------ |
| animation                 | 所有动画属性的简写属性，除了**animation-play-state**属性     |
| **animation-name**        | @keyframes动画的名称**【必要】**                             |
| **animation-duration**    | 动画完成一个周期所花费的秒或毫秒，默认是0**【必要】**        |
| animation-timing-function | 动画的速度曲线，默认是"ease" <br> ![image-20220223094223054](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230942151.png)<br> ![image-20220223094446593](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230944676.png) |
| animation-delay           | 动画何时开始，默认是0                                        |
| animation-iteration-count | 动画被播放的次数，默认是1，还有**infinite**(∞)               |
| animation-direction       | 动画是否在下一个周期逆向播放，默认是"normal"，**alternate**(逆播放) |
| **animation-play-state**  | **动画是否正在运行或暂停，默认是"running"，还有"paused"**    |
| animation-fill-mode       | 动画结束状态，保持**forwards** 回到起始**backwards**         |

##### 简写属性

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画次数或者结束的状态;
```

##### 热点图

放大时会向四周扩散

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
```

添加多个动画，用逗号分隔

```css
animation: w 5s steps(6) infinite forwards,move 3s forwards;
```



### 3D转换

**三维坐标系**

立体空间，由3个轴组成

![image-20220223094710177](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230947263.png)

![image-20220223094724360](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230947433.png)

#### 3D移动 translate3d

```css
transform: translateX(100px); /*仅在x轴移动*/
transform: translateY(100px);/*仅在y轴移动*/
transform: translateZ(100px);/*仅在x轴移动（注意：translateZ一般用px单位）*/
transform: translate3d(x,y,z);/*x、y、z分别指要移动的轴的方向的距离*/
```

#### 透视 perspective

**透视写在被观察元素的父盒子上面**

**d**：视距，人眼睛到屏幕的距离

**z**：z轴，物体距离屏幕的距离，z轴越大（正值）看到的物体越大

#### 3D旋转 rotate3d

让元素在三维平面沿着x轴，y轴，z轴或者自定义轴进行旋转

```css
transform: translate3d(100px,100px,-800px);
transform: rotateX(45deg);/*沿着x轴正方向旋转45度*/
transform: rotateY(45deg);/*沿着y轴正方向旋转45度*/
transform: rotateZ(45deg);/*沿着z轴正方向旋转45度*/
transform: rotate3d(x,y,z,deg);/*沿着自定义轴旋转deg角度（了解）*/
transform: rotate3d(1,1,0,45deg);矢量
```

#### 3D呈现 transform-style

控制子元素是否开启三维立体环境

`transform-style：flat；`子元素不开启3d立体空间 默认

`transform-style：preserve-3d；`子元素开启立体空间

写给父级，影响子盒子



### 浏览器私有前缀

为了兼容老版本

 

#### 私有前缀

- **-moz-**：firefox浏览器私有属性
- **-ms-**：ie浏览器私有属性
- **-webkit-**：safari、chrome私有属性
- **-o-**：Opera私有属性

#### 提倡写法

```css
-moz-border-radius:10px;
-webkit-border-radius:10px;
-o-border-radius:10px;
border-radius:10px;
```

### 背景线性渐变 gradient background

**语法**

```css
background: linear-gradient(left, #FA5A55, #FFCE51);
background: -webkit-linear-gradient(left top, #FA5A55, #FFCE51);
background: -webkit-linear-gradient(起始方向, 颜色1, 颜色2, ...);
```

背景渐变必须添加浏览器私有前缀

起始方向可以是：方位名词 或者 度数，如果省略默认为top

CSS **linear-gradient()** 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于[<gradient>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient)数据类型，是一种特别的[<image>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image)数据类型。

```css
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/*从#DAECF9开始到#DAECF9结束，#DAECF9从40%开始，#DAECF9从80%开始*/
background: -webkit-linear-gradient(top, #DAECF9, #DAECF9, #C6E3F8 40%, #DAECF9 80%);
```

![image-20220223095243331](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202202230952403.png)

