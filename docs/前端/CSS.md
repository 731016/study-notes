## CSS概念

CSS（Cascading Style Sheet），CSS样式表或层叠样式表（级联样式表）

**作用**

- **设置**HTML页面中的文本内容（字体、大小、对齐方式等）、图片的外形（宽高、边框样式、边距等）以及**版面的布局和外观显示样式**

- css以html为基础，提供了丰富的功能，如字体、颜色、背景的控制及整体排版等，而且还可以针对不同的浏览器设置不同的样式

### 引入CSS的三种方法

<span style="font-weight:700;color:blue"> (1)行内式</span><span style="font-weight:700;color:green">（内联样式）</span>

**概念**

​	行内样式、行间样式

​	通过标签的style属性来设置元素的样式

**基本语法**

```HTML
<标签名 style="属性1:属性值1;属性2:属性值2;"> 内容 </标签名>
```

多组属性值之间使用"`;`"隔开



<span style="font-weight:700;color:blue">(2)内部样式表</span><span style="font-weight:700;color:green">（内嵌样式表）</span>

**概念**

​	内嵌式

​	将CSS代码集中写在HTML文档的<span style="font-weight:700;background-color:yellow">**head头部标签**</span>中，并用style标签定义

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



<span style="font-weight:700;color:blue">(3)外部样式表</span><span style="font-weight:700;color:green">（外链式）</span>

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

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>rel</td>
        <td>定义当前文档与被链接文档之间的关系，"stylesheet"表示一个样式表文件</td>
    </tr>
    <tr>
        <td>type</td>
        <td>定义所链接文档的类型，"text/css"表示css样式表</td>
    </tr>
    <tr>
        <td>href</td>
        <td>定义所链接外部样式表文件的URL</td>
    </tr>
</table>



## CSS选择器

<span style="color:blue">**作用**</span>

<span style="background-color:yellow">找到特定HTML页面元素</span>

### CSS基础选择器



<span style="color:blue;font-weight:700">标签选择器</span>

**概念**

​	HTML标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的CSS样式

**语法**

```css
标签名 {属性1:属性值1; }
```

**作用**

​	把某一类标签**全部**选择出来



<span style="color:blue;font-weight:700">类选择器</span>

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



<span style="color:blue;font-weight:700">id选择器</span>

使用<span style="color:red;font-weight:700">**#**</span>进行标识，后面紧跟id名

- **id选择器**

```css
#id名 {属性1:属性值1;}  
```

- **标签**

  ```html
  <p id="id名"></p>
  ```

元素的id值是<span style="background-color:yellow;font-weight:700">**唯一**</span>的



<span style="color:blue;font-weight:700">通配符选择器</span>

用<span style="color:red;font-weight:700">*</span>号标识

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

<span style="color:blue;font-weight:700">1.字体风格</span>

```css
.line_2 {
        font-style: italic;
}
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>normal</td>
        <td>默认值，浏览器会显示标准的字体样式  font-style: normal;</td>
    </tr>
    <tr>
        <td>Italic</td>
        <td>浏览器会显示斜体的字体样式</td>
    </tr>
</table>

<span style="color:blue;font-weight:700">2.字体粗细</span>

```css
.line_2 {
    font-weight: 700;
}
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>normal</td>
        <td>默认值（不加粗的）400</td>
    </tr>
    <tr>
        <td>bold</td>
        <td>定义粗体（加粗的）700</td>
    </tr>
    <tr>
        <td>100~900</td>
        <td>400 等同于 normal，而 700 等同于 bold</td>
    </tr>
</table>

<span style="color:blue;font-weight:700">3.字号大小</span>

```css
body {
        font-size: 16px;
}
```

![image-20220222162250866](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221622911.png)

<span style="color:blue;font-weight:700">4.字体</span>

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

当需要设置英文字体时，<span style="background-color:yellow">**英文字体名必须位于中文字体名之前**；</span>

若字体名中包含<span style="color:red;font-weight:700">空格、#、$</span>等符号，则该字体必须**加**英文状态下的**单引号或双引号**



**Unicode字体**

- 文件编码(GB2312、UTF-8）不匹配会产生乱码
- xp系统不支持 类似微软雅黑的中文

<span style="color:red">**解决**</span>

（1）使用英文代替 `font-family:"Microsoft Yahei"`

（2）使用Unicode编码代替 `font-family:"\5FAE\8F6F\96C5\9ED1"`

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>字体名称</th>
        <th>英文名称</th>
        <th>Unicode编码</th>
    </tr>
    <tr>
        <td><span style="">宋体</span></td>
        <td>SimSum</td>
        <td>\5B8B\4F53</td>
    </tr>
    <tr>
        <td><span style="">新宋体</span></td>
        <td>NSimSun</td>
        <td>\65B0\5B8B\4F53</td>
    </tr>
    <tr>
        <td><span style="">黑体</span></td>
        <td>SimHei</td>
        <td>\9ED1\4F53</td>
    </tr>
    <tr style="background-color:#F4B183;">
        <td><span style="">微软雅黑</span></td>
        <td>Microsoft YaHei</td>
        <td>\5FAE\8F6F\96C5\9ED1</td>
    </tr>
    <tr>
        <td><span style="">楷体_GB2312</span></td>
        <td>KaiTi_GB2312</td>
        <td>\6977\4F53_GB2312</td>
    </tr>
    <tr>
        <td><span style="">隶书</span></td>
        <td>LiSu</td>
        <td>\96B6\4E66</td>
    </tr>
    <tr>
        <td><span style="">幼园</span></td>
        <td>YouYuan</td>
        <td>\5E7C\5706</td>
    </tr>
    <tr>
        <td><span style="">华文细黑</span></td>
        <td>STXihei</td>
        <td>\534E\6587\7EC6\9ED1</td>
    </tr>
    <tr>
        <td><span style="">细明体</span></td>
        <td>MingLiU</td>
        <td>\7EC6\660E\4F53</td>
    </tr>
    <tr>
        <td><span style="">新细明体</span></td>
        <td>PMingLiU</td>
        <td>\65B0\7EC6\660E\4F53</td>
    </tr>
</table>

<span style="color:blue;font-weight:700">基本语法</span>

```css
选择器 { font: font-style  font-weight  font-size/line-height  font-family;}
```

```css
.p {
    font: italic 700 20px "微软雅黑";
}
```

<span style="background-color:yellow">**注意：**</span>

- <span style="color:red">使用font属性时，必须按上面语法格式中的顺序书写，不能更换顺序，各个属性以**空格**隔开。</span>
- 其中不需要设置的属性可以省略（取默认值），但必须保留<span style="color:red;font-family:'Consolas'">**font-size**</span>和<span style="color:red;font-family:'Consolas'">**font-family**</span>属性，<span style="color:green">**否则font属性将不起作用**</span>



## CSS外观属性



### 文本颜色

**作用**

<span style="background-color:yellow;font-family:'Consolas'">**color**</span>属性用于定义文本的颜色

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>表示</th>
        <th>属性值</th>
    </tr>
    <tr>
        <td>预定义的颜色值</td>
        <td>red，green，blue，还有我们的御用色 pink</td>
    </tr>
    <tr>
        <td>十六进制</td>
        <td>#FF0000，#FF6600，#29D794</td>
    </tr>
    <tr>
        <td>RGB代码</td>
        <td>rgb(255,0,0)或rgb(100%,0%,0%)</td>
    </tr>
</table>

### **文本**水平对齐方式

**text-align**属性用于设置文本内容的水平对齐，相当于html中的align对齐属性

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>解释</th>
    </tr>
    <tr>
        <td>left</td>
        <td>左对齐（默认值）</td>
    </tr>
    <tr>
        <td>right</td>
        <td>右对齐</td>
    </tr>
    <tr>
        <td>center</td>
        <td>居中对齐</td>
    </tr>
</table>

**是让盒子里面的内容水平居中，** **而不是让盒子居中对齐**

### 行间距

<span style="background-color:yellow;font-family:'Consolas'">**line-height**</span>属性用于设置行间距（行与行之间的距离）（字符的垂直距离）**行高**



**单位**

​	line-height常用属性值单位分别为<span style="background-color:yellow;font-family:'Consolas'">**像素px**</span>，**相对值em**和**百分比%**

 

**一般情况下，行距比字号大7，8像素**



### 首行缩进

<span style="background-color:yellow;font-family:'Consolas'">**text-indent**</span>属性用于设置首行文本的缩进

**属性值**

​	可为不同单位的数量，**em字符宽度的倍数**、或相对于浏览器窗口宽度的百分比%，允许使用负值

```css
/*1em就是一个字的宽度*/
p {
    text-indent:2em;
}
```

### 文本修饰

<span style="background-color:yellow;font-family:'Consolas'">**text-decoration** </span>通常我们用于给链接修改装饰效果

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td style="color:red">none</td>
        <td>默认。定义标准的文本。 取消下划线（最常用）</td>
    </tr>
    <tr>
        <td style="color:red">underline</td>
        <td>定义文本下的一条线。下划线 也是我们链接自带的（常用）</td>
    </tr>
    <tr>
        <td>overline</td>
        <td>定义文本上的一条线。（不用）</td>
    </tr>
    <tr>
        <td>line-through</td>
        <td>定义穿过文本下的一条线。（不常用）</td>
    </tr>
</table></body>

### 文字阴影

**text-shadow**为文字添加阴影。可以为文字与<span style="font-family:'Consolas';color:#005282"> [text-decorations](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) 添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在X和Y方向的偏移量、模糊半径和颜色值组成。</span>

### 背景透明

opacity属性指定了一个元素的**不透明度**。换言之，opacity属性指定了一个元素后面的背景的被覆盖程度。



当opacity属性的值应用于某个元素上时，是把这个元素（包括它的内容）当成一个整体看待，即使这个值没有被子元素继承。

因此，<span style="font-family:'Consolas';color:#C00000">**一个元素和它包含的子元素都会具有和元素背景相同的透明度，哪怕这个元素和它的子元素有不同的opacity属性值。**</span>



[属性值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity#values)

`<number>`

<span style="font-family:'Consolas';color:#005282"> [<number>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) 是一个0.0到1.0范围内的数字值,这个数值既包含也代表通道的透明度，也就是alpha通道的值。任何一个溢出这个取值区间的值，尽管有效，但会被解析为在取值范围内最靠近它的值。</span>

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>值</th>
        <th>解释</th>
    </tr>
    <tr>
        <td>0</td>
        <td>元素完全透明 (即元素不可见).</td>
    </tr>
    <tr>
        <td>任何一个位于0.0-1.0之间的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/number">number</a> </td>
        <td>元素半透明 (即元素后面的背景可见).</td>
    </tr>
    <tr>
        <td>1</td>
        <td>元素完全不透明(即元素后面的背景不可见).</td>
    </tr>
</table></body>



## css复合选择器

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>选择器</th>
        <th>作用</th>
        <th>特征</th>
        <th>使用情况</th>
        <th>隔开符号及用法</th>
    </tr>
    <tr>
        <td>后代选择器</td>
        <td>用来选择元素后代</td>
        <td>是选择所有的子孙后代</td>
        <td>较多</td>
        <td>符号是空格 .nav a</td>
    </tr>
    <tr style="background-color:#F4B183;">
        <td>子代选择器</td>
        <td>选择 最近一级元素</td>
        <td>只选亲儿子</td>
        <td>较少</td>
        <td>符号是> .nav>p</td>
    </tr>
    <tr>
        <td>交集选择器</td>
        <td>选择两个标签交集的部分</td>
        <td>既是 又是</td>
        <td>较少</td>
        <td>没有符号 p.one</td>
    </tr>
    <tr style="background-color:#F4B183;">
        <td>并集选择器</td>
        <td>选择某些相同样式的选择器</td>
        <td>可以用于集体声明</td>
        <td>较多</td>
        <td>符号是逗号 .nav, .header</td>
    </tr>
    <tr style="background-color:#F4B183;">
        <td>链接伪类选择器</td>
        <td>给链接更改状态</td>
        <td></td>
        <td>较多</td>
        <td>重点记住 a{} 和 a:hover 实际开发的写法</td>
    </tr>
</table>



### 后代选择器

<span style="color:#2E75B5">**概念**</span>

后代选择器又称为包含选择器

 

<span style="color:#2E75B5">**作用**</span>

用来选择元素或元素组的**子孙后代**

其写法就是把外层标签写在前面，内层标签写在后面，中间用**空格**分隔

 

<span style="color:#2E75B5">**语法**</span>

```css
.class h3 {
    color:red;
    font-size:16px;
}
```

![image-20220222163318811](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221633888.png)

### 子元素选择器

**作用**

子元素选择器只能选择作为某元素**子元素(亲儿子)**的元素

 

其写法就是把父级标签写在前面，子级标签写在后面，中间跟一个 <span style="color:red">`>`</span> 进行连接

 

**语法**

```css
.class>h3 {
    color:red;
    font-size:14px;
}
```

![image-20220222163429952](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221634019.png)

### 交集选择器（不常用）

**条件**

交集选择器由两个选择器构成，找到的标签必须满足：既有标签一的特点，也有标签二的特点

![image-20220222163500928](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221635017.png)

交际选择器 是并且的意思。即…又…的意思

```css
p.one是类名为one的段落标签
```

### 并集选择器

![image-20220222163538697](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221635781.png)

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

<span style="color:#2E75B5">**作用**</span>

用于向某些选择器添加特殊的效果



<span style="background-color:yellow;font-family:'consolas'">**顺序【lvha】不要颠倒！！！**</span>

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

a链接具有默认样式，<span style="background-color:yellow;font-family:'consolas'">**需要给链接单独指定样式**</span>

![image-20220222163743584](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221637640.png)



## 标签的显示模式

**标签的分类**

html标签一般分为**块标签**和**行内标签**（块元素和行内元素）

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>元素模式</th>
        <th>元素排列</th>
        <th>设置样式</th>
        <th>默认宽度</th>
        <th>包含</th>
    </tr>
    <tr>
        <td>块级元素</td>
        <td>一行只能放一个块级元素</td>
        <td>可以设置宽度高度</td>
        <td>容器的100%</td>
        <td>容器内可以包含任何标签</td>
    </tr>
    <tr>
        <td>行内元素</td>
        <td>一行可以放多个行内元素</td>
        <td>不可以直接设置宽度高度</td>
        <td>它本身内容的宽度</td>
        <td>容纳文本或则其他行内元素</td>
    </tr>
    <tr>
        <td>行内块元素</td>
        <td>一行放多个行内块元素</td>
        <td>可以设置宽度和高度</td>
        <td>它本身内容的宽度</td>
        <td></td>
    </tr>
</table>

### 块级元素block-level

常见的块元素有`<h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>`等，其中`<div>`标签是最典型的块元素

**块级元素的特点**

（1）独占一行

（2）高度，宽度、外边距以及内边距都可以控制

（3）宽度默认是**容器（父级宽度）的100%**

（4）是一个容器及盒子，里面可以放**行内**或者**块级**元素

**注意：**

只有 文字才 能组成段落 因此<span style="background-color:yellow;font-family:'Consolas'"> **p 里面不能放块级元素**</span>，特别是 <span style="color:red;font-family:'Consolas'">**p里面不能放div** </span>

同理还有这些标签`h1,h2,h3,h4,h5,h6,dt`，他们都是文字类块级标签，里面不能放其他块级元素

### 行内元素inline-level

常见的行内元素有`<a>、<strong>、<b>、<em>、<i>、<del>、<s>、<ins>、<u>、<span>`等，其中`<span>`标签最典型的行内元素。有的地方也成内联元素

<span style="color:#2E75B5;font-family:'Consolas'">**行内元素的特点**</span>

（1）相邻行内元素在一行上，一行可以显示多个

（2）**高、宽直接设置是无效的**

（3）默认宽度就是它**本身内容的宽度**。

（4）行内元素**只能容纳文本**或则**其他行内元素**

<span style="color:#2E75B5;font-family:'Consolas'">**注意：**</span>

链接里面不能再放链接

特殊情况a里面可以放块级元素，但是给a转换一下块级模式最安全

### 行内块元素inline-block

在行内元素中有几个特殊的标签`<img />、<input />、<td>`，可以对它们设置**宽高**和对齐属性，有些资料可能会称它们为行内块元素

<span style="color:#2E75B5;font-family:'Consolas'">**行内块元素的特点**</span>

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231623628.png" alt="image-20220223162350559" style="zoom:80%;" />



## 单行文本垂直居中

![image-20220223162425794](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231624876.png)



<span style="background-color:yellow;font-family:'Consolas'">**文字的行高等于盒子的高度**</span>

行高 = 上距离 + 内容高度 + 下距离 

 

**行高和高度的三种关系**

行高 = 高度 文字会 垂直居中

如果行高 > 高度 文字会 偏下 

如果行高 < 高度 文字会 偏上 



![image-20220222164856123](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221648169.png)

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

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>参数</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>repeat</td>
        <td>背景图像在纵向和横向上平铺（默认的）</td>
    </tr>
    <tr>
        <td>no-repeat</td>
        <td>背景图像不平铺</td>
    </tr>
    <tr>
        <td>repeat-x</td>
        <td>背景图像在横向上平铺</td>
    </tr>
    <tr>
        <td>repeat-y</td>
        <td>背景图像在纵向平铺</td>
    </tr>
</table>

**背景位置**

```css
background-position : length || length
background-position : position || position
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>参数</th>
        <th>值</th>
    </tr>
    <tr>
        <td>length</td>
        <td>百分数 | 由浮点数字和单位标识符组成的长度值</td>
    </tr>
    <tr>
        <td>position</td>
        <td>top | center | bottom | left | center | right 方位名词</td>
    </tr>
</table>

**注意：**

（1）必须先指定background-image属性

（2）position 后面是x，y坐标；可以使用方位名词 或 精确单位

（3）若指定两个值都是方位名词，则前后顺序无关，效果一致

（4）若只指定一个方位名词，另一个值**默认居中对齐**

（5）若position后面是精确坐标，第一个为x，第二个为y

（6）若指定一个精确坐标，则数值为x坐标，另一个默认垂直居中

（7）若指定两个值为精确单位和方位名词混合使用，则第一个值为x坐标，第二个值为y坐标

<span style="color:#2E75B5;font-family:'Consolas'">**背景附着**</span>

背景是滚动/固定

```css
background-attachment: fixed | scroll;
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>参数</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>scroll</td>
        <td>背景图像是随对象内容滚动</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>背景图像固定</td>
    </tr>
</table>

<span style="color:#2E75B5;font-family:'Consolas'">**背景简写**</span>

无强制标准

```css
background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;
background: #fff url(image.jpg) repeat-y  scroll center top;
```

<span style="color:#2E75B5;font-family:'Consolas'">**背景透明**</span>

```css
background: rgba(0, 0, 0, 0.3);  
```

（1）最后一个参数alpha 透明度 取值范围 0~1

（2）可以省略0.3的0

（3）盒子里面的内容不受影响



## css三大特性

<span style="color:#2E75B5;font-family:'Consolas'">**层叠性**</span>

**概念**

多种CSS样式的叠加

是浏览器处理冲突的一个能力,如果一个属性通过两个相同选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉

**原则**

样式冲突，遵循的原则是<span style="background-color:yellow;font-family:'Consolas'">**就近原则**</span>

样式不冲突，不会层叠

 

<span style="color:#2E75B5;font-family:'Consolas'">**继承性**</span>

**概念**

子标签会继承父标签的某些样式，如文本颜色和字号

想要设置一个可继承的属性，只需将它应用于父元素

子元素可以继承父元素的样式（`text-，font-，line-`这些元素<span style="background-color:yellow;font-family:'Consolas'">开头</span>的可以继承，以及<span style="color:red;font-family:'Consolas'">`color`</span>属性）

 

<span style="color:#2E75B5;font-family:'Consolas'">**优先级**</span>

**概念**

定义CSS样式时，经常出现两个或更多规则应用在同一元素上

（1）选择器**相同**，则执行层叠性

（2）选择器**不同**，就会出现优先级的问题



### 权重计算公式

![image-20220222165738714](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221657768.png)

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>标签选择器</th>
        <th>计算权重公式</th>
    </tr>
    <tr>
        <td>继承或者 *</td>
        <td>0,0,0,<i style="background-color:yellow">0</i></td>
    </tr>
    <tr>
        <td>每个元素（标签选择器）</td>
        <td>0,0,0,<i style="background-color:yellow">1</i></td>
    </tr>
    <tr>
        <td>每个类，伪类</td>
        <td>0,0,<i style="background-color:yellow">1,0</i></td>
    </tr>
    <tr>
        <td>每个ID</td>
        <td>0,<i style="background-color:yellow">1,0,0</i></td>
    </tr>
    <tr>
        <td>每个行内样式 style=""</td>
        <td><i style="background-color:yellow">1,0,0,0</i></td>
    </tr>
    <tr>
        <td>每个!important 重要的（样式属性后面添加）</td>
        <td>∞ 无穷大</td>
    </tr>
</table>

值从左到右，左面的最大，一级大于一级，数位之间没有进制，级别之间不可超越

### 权重叠加

![image-20220222165836094](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221658152.png)

<span style="background-color:yellow;font-family:'Consolas'">**注意**</span>

数位之间<span style="background-color:yellow;font-family:'Consolas'">**没有进制**</span>

比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况

 

**继承的权重为0**

这个不难，但是忽略很容易绕晕。其实，我们修改样式，<span style="background-color:yellow;font-family:'Consolas'">**一定要看该标签有没有被选中**</span>

（1）如果**选中了**，那么以上面的公式来计权重。谁大听谁的

（2）如果**没有选中**，那么<span style="background-color:yellow;font-family:'Consolas'">权重是0</span>，因为继承的权重为0

![image-20220223163942563](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231639632.png)

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

![image-20220223163957877](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231639957.png)

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

![image-20220222170709121](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221707173.png)

<span style="color:#C00000;font-family:'Consolas">**盒子模型box-sizing**</span>

![image-20220222170645385](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221706454.png)

**content-box**

默认值，标准盒子模型。<span style="color:#008AC1;font-family:'Consolas'"> [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。注意: 内边距、边框和外边距都在这个盒子的外部。 比如说，</span>.box {width: 350px; border: 10px solid black;} 在浏览器中的渲染的实际宽度将是 370px。

 尺寸计算公式：

```
width = 内容的宽度

height = 内容的高度
```

宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。

 

**border-box**

<span style="color:#008AC1;font-family:'Consolas'"> [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式 时Internet Explorer使用的[盒模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)。注意，填充和边框将在盒子内 , 例如,</span> .box {width: 350px; border: 10px solid black;} 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。

 尺寸计算公式：

```
width= border + padding +内容的宽度

height= border + padding +内容的高度
```



 ## 盒子边框

```css
border : border-width || border-style || border-color 
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>border-width</td>
        <td>定义边框粗细，单位：px</td>
    </tr>
    <tr>
        <td>border-style</td>
        <td>边框的样式</td>
    </tr>
    <tr>
        <td>border-color</td>
        <td>边框颜色</td>
    </tr>
</table>

边框的样式：

（1）none：没有边框（忽略所有边框的宽度[默认值]）

（2）solid：边框为**实线**

（3）dashed：边框为**虚线**

（4）dotted：边框为**点线**

```css
简写形式
border: 1px solid red; 没有顺序
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>上边框</th>
        <th>下边框</th>
        <th>左边框</th>
        <th>右边框</th>
    </tr>
    <tr>
        <td>border-top-style:样式;</td>
        <td>border-bottom-style:样式;</td>
        <td>border-left-style:样式;</td>
        <td>border-right-style:样式;</td>
    </tr>
    <tr>
        <td>border-top-width:宽度;</td>
        <td>border- bottom-width:宽度;</td>
        <td>border-left-width:宽度;</td>
        <td>border-right-width:宽度;</td>
    </tr>
    <tr>
        <td>border-top-color:颜色;</td>
        <td>border- bottom-color:颜色;</td>
        <td>border-left-color:颜色;</td>
        <td>border-right-color:颜色;</td>
    </tr>
    <tr>
        <td>border-top:宽度 样式 颜色;</td>
        <td>border-bottom:宽度 样式 颜色;</td>
        <td>border-left:宽度 样式 颜色;</td>
        <td>border-right:宽度 样式 颜色;</td>
    </tr>
</table>

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

通过表格的`cellspacing="0"`,将单元格与单元格之间的距离设置为0，

但是两个单元格之间的边框会**出现重叠**，从而使边框变粗

 

通过表格属性：

```css
table{ border-collapse:collapse; }
```

collapse 单词是合并的意思

border-collapse:collapse; 表示相邻边框合并在一起



## 内边距padding

![image-20220222170548566](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221705618.png)

padding属性用于设置内边距 **是指** **边框与内容之间的距离**

 

| **属性**       | **作用** |
| -------------- | -------- |
| padding-left   | 左内边距 |
| padding-right  | 右内边距 |
| padding-top    | 上内边距 |
| padding-bottom | 下内边距 |

 

当我们给盒子指定padding值之后， 发生了2件事情：

1. 内容和边框 有了距离，添加了内边距。
2. <span style="background-color:yellow;font-family:'Consolas'">**盒子会变大了**</span>

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>值的个数</th>
        <th>表达意思</th>
    </tr>
    <tr>
        <td>1个值</td>
        <td>padding：上下左右内边距;</td>
    </tr>
    <tr>
        <td>2个值</td>
        <td>padding: 上下内边距 左右内边距 ；</td>
    </tr>
    <tr>
        <td>3个值</td>
        <td>padding：上内边距 左右内边距 下内边距；</td>
    </tr>
    <tr>
        <td>4个值</td>
        <td>padding: 上内边距 右内边距 下内边距 左内边距 ；</td>
    </tr>
</table>

### 内盒尺寸计算**（元素实际大小）**

**宽度**
 Element Height = content height + padding + border （Height为内容高度）

 

**高度**
 Element Width = content width + padding + border （Width为内容宽度）

 

**盒子的实际的大小** **=** **内容的宽度和高度** **+** **内边距** **+** **边框**



### padding不会影响盒子大小的情况

如果没有给一个盒子指定<span style="background-color:yellow;font-family:'Consolas';font-weight:700">宽度</span>， 此时，如果给这个盒子指定padding， 则不会撑开盒子

![image-20220222170511403](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221705470.png)

## 外边距margin

![image-20220222170733145](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221707207.png)

margin属性用于设置外边距。 margin就是控制**盒子和盒子之间的距离**

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>作用</th>
    </tr>
    <tr>
        <td>margin-left</td>
        <td>左外边距</td>
    </tr>
    <tr>
        <td>margin-right</td>
        <td>右外边距</td>
    </tr>
    <tr>
        <td>margin-top</td>
        <td>上外边距</td>
    </tr>
    <tr>
        <td>margin-bottom</td>
        <td>下外边距</td>
    </tr>
</table>

### 块级盒子水平居中

可以让一个**块级盒子实现<span style="background-color:yellow;font-family:'Consolas'">水平</span>居中**必须：

- 盒子**必须指定**了**宽度**（width）
- 然后就给**左右的外边距都设置为auto**

 

常用三种写法：

![image-20220222170825529](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221708585.png)



### 文字居中和盒子居中区别

盒子内的文字水平居中是 **text-align: center**, 而且还可以让 <span style="background-color:yellow;font-family:'Consolas'">行内元素和行内块</span>居中对齐

 

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

![image-20220222170933739](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221709802.png)

```css
* {
    padding:0;         /* 清除内边距 */
    margin:0;          /* 清除外边距 */
}
```

**注意：**

行内元素为了照顾兼容性， 尽量<span style="background-color:yellow;font-family:'Consolas'">只设置**左右内外边距**</span>， 不要设置上下内外边距



### 外边距合并

<span style="color:#2E75B5;font-family:'Consolas'">(1) **相邻块元素垂直外边距的合并**</span>

当上下相邻的两个块元素相遇时，如果**上面的元素有下外边距**margin-bottom，

**下面的元素有上外边距**margin-top，则他们之间的垂直间距不是margin-bottom与margin-top之和，

<span style="background-color:yellow;font-family:'Consolas'">**取两个值中的较大者**</span>这种现象被称为相邻块元素垂直外边距的合并（也称外边距塌陷）

![image-20220222171040644](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221710712.png)

**解决方案：<span style="background-color:yellow;font-family:'Consolas'">尽量给只给一个盒子添加margin值</span>**

<span style="color:#2E75B5;font-family:'Consolas'">(2) **嵌套块元素垂直外边距的合并**（塌陷）</span>

对于两个嵌套关系的块元素，如果**父元素没有<span style="background-color:yellow;font-family:'Consolas'">上内边距</span>及<span style="background-color:yellow;font-family:'Consolas'">边框</span>**

父元素的上外边距会与子元素的上外边距发生合并

合并后的外边距为两者中的**较大**者

![image-20220222171130322](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221711389.png)

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

<span style="color:#2E75B5;font-family:'Consolas'">**原因：**</span>

margin 会有外边距合并 还有 ie6下面margin 加倍的bug（讨厌）所以最后使用

padding 会影响盒子大小， 需要进行加减计算（麻烦） 其次使用

width 没有问题（嗨皮）我们经常使用宽度剩余法 高度剩余法来做



## ps基本操作以及常用快捷键

- 文件--打开 -- 可以打开 我们要测量的图片
- `ctrl+r` 可以打开标尺 或者 视图 -- 标尺
- 右击标尺， 把里面的单位改为 像素 
- ctrl+ 加号 键 可以 放大 视图 ctrl+ 减号 缩小视图
- 按住`空格键`， 鼠标可以 变成小手 ，拖动 ps 视图
- 用选区 拖动 可以 测量 大小 
- ctrl+ d 可以取消选区     或者旁边空白处点击一下也可以取消选区

![image-20220222171403781](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221714859.png)

## 去掉列表默认的样式

无序和有序列表前面默认的列表样式，在不同浏览器显示效果不一样，而且也比较难看，所以，我们一般上来就直接去掉这些列表样式就行了。 代码如下

```css
li { list-style: none; }
```

## 圆角边框(CSS3)

**语法**

  ```css
  border-radius:length;  
  ```

其中每一个值可以为 数值或百分比的形式。 

 

技巧： 让一个正方形 变成**圆圈** 

  ```css
  border-radius: 50%;  
  ```

<span style="background-color:yellow;font-family:'Consolas'">矩形就只用 用 高度的一半就好</span>

![image-20220222171546998](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221715058.png)

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

<span style="color:#2E75B5;font-family:'Consolas'">**圆角矩形设置4个角**</span>

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

![image-20220222171706717](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221717809.png)

前两个属性是必须写的。其余的可以省略

 

**外阴影** **(outset)** **是默认**的 但是**不能写** 想要内阴影可以写 **inset**



## css布局的三种机制

CSS 提供了 **3** **种机制**来设置盒子的摆放位置，分别是**普通流**（标准流）、**浮动**和**定位**

+ <span style="color:#2E75B5;font-family:'Consolas'">**普通流（标准流）**</span>

**块级元素**会独占一行，**从上向下**顺序排列；

常用元素：div、hr、p、h1~h6、ul、ol、dl、form、table

**行内元素**会按照顺序，**从左到右**顺序排列，碰到父元素边缘则自动换行；

常用元素：span、a、i、em等

 

+ <span style="color:#2E75B5;font-family:'Consolas'">**浮动**</span>

让盒子从普通流中**浮**起来,主要作用让多个块级盒子一行显示

 

+ <span style="color:#2E75B5;font-family:'Consolas'">**定位**</span>

将盒子**定**在浏览器的某一个**位**置——CSS 离不开定位，特别是后面的 js 特效

## 浮动

**浮动？**  

它可以实现<span style="background-color:yellow;font-family:'Consolas'">多个元素一行显示</span>，但是中间会有空白缝隙  它不能实现盒子<span style="background-color:yellow;font-family:'Consolas'">左右对齐 </span>



<span style="color:#2E75B5;font-family:'Consolas'">**概念**</span>

元素的浮动是指**设置了浮动属性的元素**会

（1）脱离标准普通流的控制

（2）移动到指定位置



<span style="color:#2E75B5;font-family:'Consolas'">**作用**</span>

**让多个盒子(div)水平排列成一行**，可以实现盒子的左右对齐等等

 

浮动最早是用来**控制图片**，实现<span style="color:#C00000;font-family:'Consolas">**文字环绕图片的效果**</span>



在 CSS 中，通过<span style="background-color:yellow;font-family:'Consolas"> **float** </span>中文， 属性定义浮动，语法如下：

```css
选择器 { float: 属性值; }
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>none</td>
        <td>元素不浮动（默认值）</td>
    </tr>
    <tr>
        <td>left</td>
        <td>元素向左浮动</td>
    </tr>
    <tr>
        <td>right</td>
        <td>元素向右浮动</td>
    </tr>
</table>

![image-20220222172056533](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221720618.png)

浮动——特性<span style="background-color:yellow;font-family:'Consolas"> **float属性会改变元素display属性**</span>

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>特点</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>浮</td>
        <td>加了浮动的盒子是浮起来的，漂浮在其他标准流盒子的上面。</td>
    </tr>
    <tr>
        <td>漏</td>
        <td>加了浮动的盒子是不占位置的，它原来的位置漏给了标准流的盒子。</td>
    </tr>
    <tr>
        <td>特</td>
        <td>特别注意：浮动元素会改变display属性， 类似转换为了行内块，但是元素之间没有空白缝隙</td>
    </tr>
</table>

给浮动的元素**添加一个<span style="background-color:yellow;font-family:'Consolas">标准流</span>的父亲**，最大化的减小了对其他标准流的影响



### 浮动(float)的扩展

<span style="color:#2E75B5;font-family:'Consolas'">**（1）浮动元素与父盒子的关系**</span>

子盒子的浮动参照父盒子对齐

不会与父盒子的边框重叠，也不会超过父盒子的内边距

![image-20220222172217548](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221722619.png)

<span style="color:#2E75B5;font-family:'Consolas'">**（2）浮动元素与兄弟盒子的关系**</span>

在一个父级盒子中，如果**前一个兄弟盒子**是：

**浮动**的，那么**当前盒子**会与前一个盒子的顶部对齐；

**普通流**的，那么**当前盒子**会显示在前一个兄弟盒子的下方

![image-20220222172247817](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221722882.png)

浮动只会影响**当前**的或者是**后面**的<span style="background-color:yellow;font-family:'Consolas'">标准流</span>盒子，<span style="background-color:yellow;font-family:'Consolas'">**不会影响前面的标准流**</span>

<span style="color:#2E75B5;font-family:'Consolas'">**建议**</span>

**如果一个盒子里面有多个子盒子，<span style="background-color:yellow;font-family:'Consolas'">如果其中一个盒子浮动了，其他兄弟也应该浮动防止引起问题</span>**



## 清除浮动

![image-20220222172536746](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221725824.png)

<span style="color:#2E75B5;font-family:'Consolas'">**总结**</span>

由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响

准确地说，并不是清除浮动，而是**清除浮动后造成的影响**

 

<span style="color:#2E75B5;font-family:'Consolas'">**清除浮动本质**</span>

清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题

<span style="background-color:yellow;font-family:'Consolas'">清除浮动</span>之后， 父级就会根据浮动的子盒子**自动检测高度**

父级有了高度，就**不会影响**下面的标准流了

 

<span style="color:#C00000;font-family:'Consolas">**清除浮动的方法**</span>

在CSS中，**clear属性**用于清除浮动

<span style="color:#2E75B5;font-family:'Consolas'">**语法**</span>

```css
选择器{clear:属性值;}   clear 清除
```

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>left</td>
        <td>不允许左侧有浮动元素（清除左侧浮动的影响）</td>
    </tr>
    <tr>
        <td>right</td>
        <td>不允许右侧有浮动元素（清除右侧浮动的影响）</td>
    </tr>
    <tr style="background-color:#F4B183;">
        <td>both</td>
        <td>同时清除左右两侧浮动的影响</td>
    </tr>
</table>

<span style="color:#2E75B5;font-family:'Consolas'">Why?清除浮动</span>

1. 父级没高度    

2. 子盒子浮动了    

3. 影响下面布局了，我们就应该清除浮动了       



### 额外标签法(隔墙法)

是W3C推荐的做法是通过在**浮动元素末尾<span style="background-color:#FF99CC;font-family:'Consolas'">添加一个空的标签</span>**

例如 

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

<span style="background-color:yellow;font-family:'Consolas'">**:after**</span> **方式为空元素额外标签法的升级版，好处是不用单独加标签了** 

<span style="color:#2E75B5;font-family:'Consolas'">**使用方法**</span>

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

![image-20220222173339731](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221733815.png)

## 切图插件

Cutterman是一款运行在photoshop中的插件，能够自动将你需要的图层进行输出， 以替代传统的手工 "导出web所用格式" 以及使用切片工具进行挨个切图的繁琐流程。 它支持各种各样的图片尺寸、格式、形态输出，方便你在pc、ios、Android等端上使用它不需要你记住一堆的语法、规则，纯点击操作，方便、快捷，易于上手

 

官网: http://www.cutterman.cn/zh/cutterman

 

注意： cutterman插件要求你的ps **必须是完整版**，不能是绿色版，所以大家需要从新安装完整版本



## CSS属性书写顺序

<span style="color:#2E75B5;font-family:'Consolas'">**布局定位属性**</span>

```css
display / position / float / clear / visibility / overflow

（建议 display 第一个写，毕竟关系到模式）
```

<span style="color:#2E75B5;font-family:'Consolas'">**自身属性**</span>

```css
width / height / margin / padding / border / background
```

<span style="color:#2E75B5;font-family:'Consolas'">**文本属性**</span>

```css
color / font / text-decoration / text-align / vertical-align / white- space / break-word
```

<span style="color:#2E75B5;font-family:'Consolas'">**其他属性**（CSS3）</span>

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

<span style="color:#2E75B5;font-family:'Consolas'">**Chrome提示的常见布局错误**</span>

![image-20220222173749849](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221737944.png)

![image-20220222173811870](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221738972.png)

![image-20220222173825466](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221738556.png)

![image-20220222173840948](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221738051.png)

## 定位

<span style="background-color:yellow;font-family:'Consolas'">将盒子**定**在某一个**位**置 自由的漂浮在其他盒子(包括标准流和浮动)的上面 )</span>

 

**标准流**在最底层 (海底) ------- **浮动** 的盒子 在 中间层 (海面) ------- **定位**的盒子 在 最上层 （天空）

 

**定位** **=** **定位模式** **+** **边偏移**

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>边偏移属性</th>
        <th>示例</th>
        <th>描述</th>
    </tr>
    <tr>
        <td><span style="font-weight: 700">top</span></td>
        <td>top:80px</td>
        <td>顶端偏移量，定义元素相对于其父元素上边线的距离</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">bottom</span></td>
        <td>bottom:80px</td>
        <td>底部偏移量，定义元素相对于其父元素下边线的距离</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">left</span></td>
        <td>left:80px</td>
        <td>左侧偏移量，定义元素相对于其父元素左边线的距离</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">right</span></td>
        <td>right:80px</td>
        <td>右侧偏移量，定义元素相对于其父元素右边线的距离</td>
    </tr>
</table>

**注意：**

1. **边偏移**需要和**定位模式**联合使用，**单独使用无效**

1. **`top`** 和 **`bottom`** <span style="color:#C00000;font-family:'Consolas">不要同时使用</span>
2. **`left`** 和 **`right`**     <span style="color:#C00000;font-family:'Consolas">不要同时使用</span>



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

![image-20220222174009262](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221740342.png)

| **定位模式**     | **是否脱标占有位置** | **移动位置基准**       | **模式转换（行内块）** | **使用情况**             |
| ---------------- | -------------------- | ---------------------- | ---------------------- | ------------------------ |
| 静态static       | 不脱标，正常模式     | 正常模式               | 不能                   | 几乎不用                 |
| 相对定位relative | 不脱标，占有位置     | 相对自身位置移动       | 不能                   | 基本单独使用             |
| 绝对定位absolute | 完全脱标，不占有位置 | 相对于定位父级移动位置 | 能                     | 要和定位父级元素搭配使用 |
| 固定定位fixed    | 完全脱标，不占有位置 | 相对于浏览器移动位置   | 能                     | 单独使用，不需要父级     |

### 静态定位（static）

**静态定位**是元素的默认定位方式，<span style="background-color:yellow;font-family:'Consolas'">无定位</span>的意思

 

静态定位 按照**<span style="color:red;font-family:'Consolas'">标准流</span>特性摆放位置**，它**没有边偏移**

 

静态定位在布局时我们几乎不用的

### 相对定位（relative）

**相对定位**是元素**相对**于它 原来在标准流中的位置 来说的

![image-20220222174111139](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221741235.png)

**相对定位的特点**

相对于 自己原来在标准流中位置来移动的

原来**<span style="background-color:yellow;font-family:'Consolas'">在标准流的区域继续占有</span>**，后面的盒子仍然以标准流的方式对待它





### 绝对定位（absolute）

**绝对定位**是元素以带有定位的父级元素来移动位置

 

1. **完全脱标** —— 完全不占位置； 
2. **父元素<span style="background-color:yellow;font-family:'Consolas'">没有定位</span>**，则以**浏览器**为准定位（Document     文档）

![image-20220222174247717](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221742814.png)

3. **父元素要有定位**

   将元素依据最近的**<span style="background-color:yellow;font-family:'Consolas'">已经定位</span>**（绝对、固定或相对定位）的**<span style="background-color:yellow;font-family:'Consolas'">父元素</span>**（祖先）进行定位

   ![image-20220222174318626](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221743724.png)

   **绝对定位的特点**

   - 绝对是以带有定位的父级元素来移动位置     （拼爹型） 如果父级都没有定位，则以浏览器文档为准移动位置
   - <span style="background-color:yellow;font-family:'Consolas'">不保留原来的位置</span>，完全是脱标的

    

   **定位口诀** **——** **子绝父相**

    

   **绝对定位盒子的居中**

   **注意**：**绝对定位/固定定位的盒子**不能通过设置 `margin: auto` 设置**水平居中**

   ![image-20220222174412134](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221744221.png)

   <span style="background-color:yellow;font-family:'Consolas'">left: 50%;</span>：让**盒子的左侧**移动到**父级元素的水平中心位置**

   <span style="background-color:yellow;font-family:'Consolas'">margin-left: -100px;</span>：让盒子**向左**移动**<span style="background-color:yellow;font-family:'Consolas'">自身宽度的一半</span>**

   ![image-20220222174434756](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221744841.png)

   ### 固定定位（fixed）

   **固定定位**是**绝对定位**的一种特殊形式

   1. **完全脱标** —— 完全不占位置；
1. <span style="background-color:yellow;font-family:'Consolas'">只认**浏览器的可视窗口**</span> —— 浏览器可视窗口 + 边偏移属性 来设置元素的位置
   
- 跟**父元素没有任何关系**；<span style="background-color:yellow;font-family:'Consolas'">单独使用</span>的
   - **不随滚动条滚动**

   ![image-20220222174531724](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221745828.png)
   
### 堆叠顺序（z-index）

在使用**定位**布局时，可能会**出现盒子重叠的情况**。

加了定位的盒子，默认**<span style="background-color:yellow;font-family:'Consolas'">后来者居上</span>**， 后面的盒子会压住前面的盒子

应用 **<span style="background-color:yellow;font-family:'Consolas';color:red">z-index</span>** 层叠等级属性可以**调整盒子的堆叠顺序**

![image-20220222174604386](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202221746468.png)

**z-index 的特性如下**

1. **属性值**：**正整数**、**负整数**或 **0**，默认值是     0，<span style="background-color:yellow;font-family:'Consolas'">数值越大，盒子越靠上</span>；
   
2. 如果**属性值相同**，则按照书写顺序，**后来居上**；
   
3. **数字后面<span style="background-color:yellow;font-family:'Consolas'">不能加单位</span>**
   

**注意**：z-index 只能应用于<span style="color:green;font-family:'Consolas'">**<u>相对定位</u>**、**<u>绝对定位</u>**和**<u>固定定位</u>**</span>的元素，<span style="background-color:yellow;font-family:'Consolas'">其他**标准流**、**浮动**和**静态定位**无效</span>



### 定位改变display属性

- 可以用<span style="color:red;font-family:'Consolas'">inline-block </span>转换为行内块
   - 可以用浮动 <span style="color:red;font-family:'Consolas'">    float    </span> 默认转换为行内块（类似，并不完全一样，因为浮动是脱标的）
- <span style="color:red;font-family:'Consolas'">绝对定位和固定定位</span>也和浮动类似，     默认转换的特性 转换为行内块
  
    
  

一个行内的盒子，如果加了**浮动**、**固定定位**和**绝对定位**，不用转换，就可以给这个盒子直接设置宽度和高度等

 

**<span style="color:blue;font-family:'Consolas'">同时注意</span>**

**<span style="background-color:#C3D69B;font-family:'Consolas'">浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并</span>**的问题。 （我们以前是用padding border overflow解决的）

也就是说，我们给盒子改为了浮动或者定位，就不会有垂直外边距合并的问题了



## 元素的隐藏与显示

**（1）dispaly显示**

设置或检索对象是否及如何显示

**<span style="color:#C00000;font-family:'Consolas">display: none</span>** <span style="background-color:yellow;font-family:'Consolas">隐藏对象</span>

**<span style="color:#C00000;font-family:'Consolas">display：block</span>** 除了转换为块级元素之外，同时还有显示元素的意思

**特点**

隐藏之后，**<span style="background-color:yellow;font-family:'Consolas">不再保留位置</span>**

![image-20220223172723356](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231727457.png)

**（2）visibility可见性**

设置或检索对象是否及如何显示

<span style="color:#C00000;font-family:'Consolas">**visibility：visible ;**</span> 对象可视

**<span style="color:#C00000;font-family:'Consolas">visibility：hidden ;</span>** 对象

**特点**

隐藏之后，**<span style="background-color:yellow;font-family:'Consolas">继续保留原有位置</span>**

![image-20220223172949631](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231729731.png)

**（3）overflow溢出**

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>visible</td>
        <td>不剪切内容也不添加滚动条</td>
    </tr>
    <tr>
        <td>hidden</td>
        <td>不显示超过对象尺寸的内容，超出的部分隐藏掉</td>
    </tr>
    <tr>
        <td>scroll</td>
        <td>不管超出内容否，总是显示滚动条</td>
    </tr>
    <tr>
        <td>auto</td>
        <td>超出自动显示滚动条，不超出不显示滚动条</td>
    </tr>
</table>



## css用户界面样式

- 更改用户的鼠标样式 (滚动条因为兼容性非常差，我们不研究) 
- 表单轮廓等。
- 防止表单域拖拽

<span style="color:#2E75B5;font-family:'Consolas'">**鼠标样式cursor**</span>

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>default</td>
        <td>小白 默认</td>
    </tr>
    <tr style="background-color:#FADBD2;">
        <td>pointer</td>
        <td>小手</td>
    </tr>
    <tr>
        <td>move</td>
        <td>移动</td>
    </tr>
    <tr>
        <td>text</td>
        <td>文本</td>
    </tr>
    <tr>
        <td>not-allowed</td>
        <td>禁止</td>
    </tr>
</table>

```html
<ul>
        <li style="cursor:default">我是小白</li>
        <li style="cursor:pointer">我是小手</li>
        <li style="cursor:move">我是移动</li>
        <li style="cursor:text">我是文本</li>
        <li style="cursor:not-allowed">我是文本</li>
</ul>
```

**<span style="color:#2E75B5;font-family:'Consolas'">轮廓线outline</span>**

![image-20220223090347339](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230903409.png)

是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用

```css
outline : outline-color ||outline-style || outline-width

取消轮廓线
outline: 0; 或者 outline: none;
```

**<span style="color:#2E75B5;font-family:'Consolas'">防止拖拽文本域resize</span>**

![image-20220223090442141](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230904195.png)

```html
<textarea  style="resize: none;"></textarea>
```



## vertical-align垂直对齐

- 有宽度的块级元素居中对齐，是margin: 0 auto;
- 让文字居中对齐，是 text-align: center;

 

它只针对于<span style="background-color:yellow;font-family:'Consolas'">**行内元素**或者**行内块元素**</span>

![image-20220223090532597](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230905669.png)

```css
vertical-align : baseline |top |middle |bottom
```

**通常用来控制图片表单与文字的对齐**



**<span style="color:#008AC1;font-family:'Consolas'">图片、表单和文字对齐</span>**

默认的图片会和文字基线对齐

![image-20220223090628316](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230906381.png)

**<span style="color:#008AC1;font-family:'Consolas'">去除图片底侧空白缝隙</span>**

**原因**

图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐

就是图片底侧会有一个空白缝隙



**解决**

- 给img     `vertical-align:middle | top| bottom`等等； 让图片<span style="background-color:yellow;font-family:'Consolas'">不要和基线对齐</span>
- 给img 添加 `display：block;` 转换为块级元素就不会存在问题了



## 溢出的文字省略号显示

<span style="color:#008AC1;font-family:'Consolas'">**white-space**</span>

设置或检索对象内文本显示方式。通常我们使用于强制一行显示内容

```css
white-space:normal; 默认处理方式

white-space:nowrap;　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行
```

<span style="color:#008AC1;font-family:'Consolas'">**text-overflow 文字溢出**</span>

设置或检索是否使用一个省略标记（...）标示对象内文本的溢出

```css
text-overflow : clip ；不显示省略标记（...），而是简单的裁切

text-overflow：ellipsis ； 当对象内文本溢出时显示省略标记（...）
```

![image-20220223090834008](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230908072.png)



## CSS精灵技术（sprite)

**为了有效地<span style="color:#008AC1;font-family:'Consolas'">减少</span>服务器接受和发送请求的次数，<u>提高</u>页面的加载速度**



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

![image-20220223091404243](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230914310.png)

<span style="background-color:yellow;font-family:'Consolas'">**png格式为透明背景**</span>

<span style="background-color:yellow;font-family:'Consolas'">**72px为网页显示像素**</span>



## 滑动门

为了使各种特殊形状的背景能够自适应元素中文本内容的多少，出现了CSS滑动门技术

**<span style="color:#008AC1;font-family:'Consolas'">核心技术</span>**

利用CSS精灵（主要是背景位置）和 **盒子padding撑开宽度**, 以便能适应不同字数的导航栏

 

**<span style="color:#008AC1;font-family:'Consolas'">总结</span>**

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

**<span style="color:#008AC1;font-family:'Consolas'">负边距+定位：水平垂直居中</span>**

**<span style="color:#008AC1;font-family:'Consolas'">压住盒子相邻边框</span>**

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

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>描述</th>
        <th>css</th>
    </tr>
    <tr>
        <td><span style="font-weight: 700">transition</span></td>
        <td>简写属性，用于在一个属性中设置四个过渡属性</td>
        <td>3</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">transition-property</span></td>
        <td>规定应用过渡的 CSS 属性的名称</td>
        <td>3</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">transition-duration</span></td>
        <td>定义过渡效果花费的时间，默认是 0</td>
        <td>3</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">transition-timing-function</span></td>
        <td>规定过渡效果的时间曲线，默认是 "ease"</td>
        <td>3</td>
    </tr>
    <tr>
        <td><span style="font-weight: 700">transition-delay</span></td>
        <td>规定过渡效果何时开始，默认是 0</td>
        <td>3</td>
    </tr>
</table>

**属性**

属性就是你想要**变化的** **css** **属性**， 宽度高度 背景颜色 内外边距都可以 

如果想要所有的属性都变化过渡， 写一个**all** 就可以

**花费时间**

transition-duration 花费时间 单位是 秒（必须写单位） s ms 比如 0.5s 这个s单位必须写 ms 毫秒

**运动曲线**

默认是 ease

![image-20220223092012176](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230920257.png)

**何时开始**

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

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>选择符</th>
        <th>简介</th>
    </tr>
    <tr>
        <td>E[att]</td>
        <td>选择<span style="background-color:yellow;font-family:'Consolas'">具有</span>att属性的E元素</td>
    </tr>
    <tr>
        <td>E[att="val"]</td>
        <td>选择具有att属性且属性值<span style="background-color:yellow;font-family:'Consolas'">等于</span>val的E元素</td>
    </tr>
    <tr>
        <td>E[att^="val"]</td>
        <td>匹配具有att属性、且属性值以val<span style="background-color:yellow;font-family:'Consolas'">开头</span>的E元素</td>
    </tr>
    <tr>
        <td>E[att$="val"]</td>
        <td>匹配具有att属性、且属性值以val<span style="background-color:yellow;font-family:'Consolas'">结尾</span>的E元素</td>
    </tr>
    <tr>
        <td>E[att*="val"]</td>
        <td>匹配具有att属性、且属性值中<span style="background-color:yellow;font-family:'Consolas'">含有</span>val的E元素</td>
    </tr>
</table>

类选择器、属性选择器、伪类选择器 **权重=10**

### 结构伪类选择器

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>选择符</th>
        <th>简介</th>
    </tr>
    <tr>
        <td>E:first-child</td>
        <td>匹配父元素中的<span style="background-color:yellow;font-family:'Consolas'">第一个</span>子元素E</td>
    </tr>
    <tr>
        <td>E:last-child</td>
        <td>匹配父元素中<span style="background-color:yellow;font-family:'Consolas'">最后一个</span>E元素</td>
    </tr>
    <tr>
        <td>E:nth-child(n)</td>
        <td>匹配父元素中的<span style="background-color:yellow;font-family:'Consolas'">第n个</span>子元素E</td>
    </tr>
    <tr>
        <td>E:first-of-type</td>
        <td><span style="background-color:#99CCFF;font-family:'Consolas'">指定类型</span>E的<span style="background-color:yellow;font-family:'Consolas'">第一个</span></td>
    </tr>
    <tr>
        <td>E:last-of-type</td>
        <td><span style="background-color:#99CCFF;font-family:'Consolas'">指定类型</span>E的<span style="background-color:yellow;font-family:'Consolas'">最后一个</span></td>
    </tr>
    <tr>
        <td>E:nth-of-type(n)</td>
        <td><span style="background-color:#99CCFF;font-family:'Consolas'">指定类型</span>E的<span style="background-color:yellow;font-family:'Consolas'">第n个</span></td>
    </tr>
</table>

n可以是数字、关键字、公式

- 关键词[even]偶数 odd 奇数
- n为公式，则从0开始计算
- 第0个元素或超出元素的个数会被忽略

![image-20220223175220503](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202231752596.png)

### 伪元素选择器

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>选择符</th>
        <th>简介</th>
    </tr>
    <tr>
        <td>::before</td>
        <td>在元素内部的前面插入内容</td>
    </tr>
    <tr>
        <td>::after</td>
        <td>在元素内部的后面插入内容</td>
    </tr>
</table>

- before和after必须有 **<span style="color:red">content属性</span>**
- before和after创建一个元素，但是属于<span style="background-color:yellow">行内元素</span>
- 在dom看不见创建的元素，被称为**伪元素**
- 伪元素和标签选择器一样，**<span style="background-color:yellow">权重=1</span>**

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230927734.png" alt="image-20220223092727642" style="zoom:80%;" />

### 2D转换 transform

**转换（transform）**：可以实现元素的位移、旋转、缩放等效果

- 移动：transform
- 旋转：rotate
- 缩放：scale

 

2D转换：改变标签在二维平面上的位置和形状的一种技术

#### 移动 translate

可以改变元素在页面中的位置，类似**<span style="background-color:yellow">定位</span>**

![image-20220223092840019](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230928082.png)

**<span style="color:blue">语法</span>**

```css
transform: translate(x,y);或者分开写
transform: translateX(n);
transform: translateY(n);
```

**<span style="color:red">重点</span>**

- 定义2D转换中的移动，沿着X和Y轴移动元素
- translate最大的优点：**<span style="background-color:yellow">不会影响到其他元素的位置</span>**
- translate中的百分比单位是相对于自身元素的translate:(50%,50%);
- **对<span style="background-color:yellow">行内</span>标签没有效果**

 

**盒子居中对齐，可使用`transform:translate(-50%, -50%)`来代替盒子尺寸改变外边距固定的写法**

#### 旋转 rotate

让元素在二维平面内顺时针旋转或逆时针旋转

![image-20220223093017668](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230930732.png)

**<span style="color:blue">语法</span>**

```css
transform: rotate(度数);
```

**<span style="color:red">重点</span>**

- rotate里面跟度数，单位是**<span style="background-color:yellow">deg</span>** rotate(45deg)
- 角度为正时，顺时针，负时，为逆时针
- 默认旋转的中心点是元素的中心点

#### 转换中心点 transform-origin

设置元素转换的中心点

**<span style="color:blue">语法</span>**

```css
transform-origin: x y;  
```

**<span style="color:red">重点</span>**

- 注意后面的参数x 和 y 用**<span style="background-color:yellow">空格隔开</span>**
- x y 默认转换的中心点是元素的中心点 （50%，50%）
- 可以给x y 设置 **像素** 或者 **方位名词** （top bottom left right center）



#### 缩放 scale

可以放大和缩小

![image-20220223093204758](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230932825.png)

**<span style="color:blue">语法</span>**

 ```css
  transform: scale(x,y);  
 ```

**<span style="color:red">注意</span>**

- x和y用**<span style="background-color:yellow">逗号分隔</span>**
- transform：scale(1,1)     宽和高都放大一倍，相对于没有放大
- transform：scale(2,2)     宽和高都放大了2倍
- transform：scale(2) **只写一个参数，相当于第二个参数和第一个一样**
- transform：scale(0.5,0.5)     缩小
- 优点：**可以设置转换中心点，默认以中心点缩放，<span style="background-color:yellow">不影响其他盒子</span>** 

#### 综合写法

- 同时使用多个转换，其**格式**为

 ```css
  transform: translate() rotate() scale();  
 ```

- 其**<span style="color:red">顺序</span>**会影响转换的效果（先旋转会改变坐标轴方向）

- 同时有位移和其他属性时，要把**<u><span style="background-color:yellow">位移放到最前面</span></u>**



### 动画 animation

动画（animation）可通过设置多个节点来精确控制一个或一组动画

#### 动画的基本使用

**<span style="color:blue">基本使用</span>**

- 定义动画
- 调用动画

**<span style="color:blue">用keyframes定义动画（类似定义类选择器）</span>**

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

**<span style="color:blue">元素使用动画</span>**

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

（1）0% 是动画的**<span style="color:red">开始</span>**，100% 是动画的**完成**

（2）在 **<span style="color:red">@keyframes</span>** 中规定某项CSS样式，就能创建由当前样式逐渐改为新样式的动画效果

（3）动画是使元素从一种样式逐渐变化为另一种样式的效果；可以改变任意多的样式和**次数**

（4）用百分比规定变化发生的时间，或用关键词"<span style="background-color:yellow">form</span>"和"<span style="background-color:yellow">to</span>"，等同于**0%**和**100%**

#### 动画属性

<table style="font-family:'Consolas';" cellspacing="0">
    <tr style="background-color:#92D050;color: #fff">
        <th>属性</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>@keyframes</td>
        <td>规定动画</td>
    </tr>
    <tr>
        <td>animation</td>
        <td>@keyframes动画的名称【必要】</td>
    </tr>
    <tr style="background-color:#F4B183">
        <td>animation-name</td>
        <td>@keyframes动画的名称【必要】</td>
    </tr>
    <tr style="background-color:#F4B183">
        <td>animation-duration</td>
        <td>动画完成一个周期所花费的秒或毫秒，默认是0【必要】</td>
    </tr>
    <tr>
        <td>animation-timing-function</td>
        <td>
            动画的速度曲线，默认是"ease"
            <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230942151.png" alt="image-20220223094223054">
            <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230944676.png" alt="image-20220223094446593">
        </td>
    </tr>
    <tr>
        <td>animation-delay</td>
        <td>动画何时开始，默认是0</td>
    </tr>
    <tr>
        <td>animation-iteration-count</td>
        <td>动画被播放的次数，默认是1，还有infinite(∞)</td>
    </tr>
    <tr>
        <td>animation-direction</td>
        <td>动画是否在下一个周期逆向播放，默认是"normal"，alternate(逆播放)</td>
    </tr>
    <tr style="background-color:#B2A1C7">
        <td>animation-play-state</td>
        <td>动画是否正在运行或暂停，默认是"running"，还有"paused"</td>
    </tr>
    <tr>
        <td>animation-fill-mode</td>
        <td>动画结束状态，保持forwards 回到起始backwards</td>
    </tr>
</table>

**<span style="color:blue">简写属性</span>**

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画次数或者结束的状态;
```

**<span style="color:red">热点图</span>**

放大时会向四周扩散

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
```

<span style="background-color:yellow">添加多个动画，用逗号分隔</span>

```css
animation: w 5s steps(6) infinite forwards,move 3s forwards;
```



### 3D转换

**三维坐标系**

立体空间，由3个轴组成

![image-20220223094710177](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230947263.png)

![image-20220223094724360](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230947433.png)

#### 3D移动 translate3d

```css
transform: translateX(100px); /*仅在x轴移动*/
transform: translateY(100px);/*仅在y轴移动*/
transform: translateZ(100px);/*仅在x轴移动（注意：translateZ一般用px单位）*/
transform: translate3d(x,y,z);/*x、y、z分别指要移动的轴的方向的距离*/
```

#### 透视 perspective

**<span style="color:red">透视写在被观察元素的父盒子上面</span>**

<span style="color:red">d</span>：视距，人眼睛到屏幕的距离

<span style="color:red">z</span>：z轴，物体距离屏幕的距离，z轴越大（正值）看到的物体越大

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

<span style="background-color:yellow">`transform-style：preserve-3d；`</span>子元素开启立体空间

写给父级，影响子盒子



### 浏览器私有前缀

为了兼容老版本

 

**<span style="color:blue">私有前缀</span>**

- **-moz-**：firefox浏览器私有属性
- **-ms-**：ie浏览器私有属性
- **-webkit-**：safari、chrome私有属性
- **-o-**：Opera私有属性

**<span style="color:blue">提倡写法</span>**

```css
-moz-border-radius:10px;
-webkit-border-radius:10px;
-o-border-radius:10px;
border-radius:10px;
```

### 背景线性渐变 gradient background

**<span style="color:red">语法</span>**

```css
background: linear-gradient(left, #FA5A55, #FFCE51);
background: -webkit-linear-gradient(left top, #FA5A55, #FFCE51);
background: -webkit-linear-gradient(起始方向, 颜色1, 颜色2, ...);
```

背景渐变必须添加浏览器私有前缀

起始方向可以是：方位名词 或者 度数，如果省略默认为top

CSS **linear-gradient()** 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于<span style="color:blue">[<gradient>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient)数据类型，是一种特别的[<image>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image)数据类型。</span>

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

![image-20220223095243331](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202202230952403.png)

