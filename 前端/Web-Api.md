## Web API介绍

**API的概念**

API（Application Programming Interface，应用程序编程接口）是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，无需理解其内部工作机制细节，只需**直接调用**

 

**Web API的概念**

Web API 是浏览器提供的一套操作**浏览器功能**和**页面元素**的 API ( BOM 和 DOM )

 

MDN 详细 API : https://developer.mozilla.org/zh-CN/docs/Web/API

 

因为 Web API 很多，所以我们将这个阶段称为 Web APIs

 

此处的 Web API 特指浏览器提供的一系列API(很多**函数**或对象**方法**)，即操作网页的一系列工具

例如：操作html标签、操作页面地址的方法

## DOM介绍

**什么是DOM？**

文档对象模型（Document Object Model，简称DOM），是 [W3C ](https://baike.baidu.com/item/W3C)组织推荐的处理[可扩展标记语言](https://baike.baidu.com/item/可扩展置标语言)（html或者xhtml）的标准[编程接口](https://baike.baidu.com/item/编程接口)

 

W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式

**DOM树**

![image-20220307154436854](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071544894.png)

DOM树 又称为文档树模型，把文档映射成树形结构，通过节点对象对其处理，处理的结果可以加入到当前的页面。

- 文档：一个页面就是一个文档，DOM中使用document表示
- 节点：网页中的所有内容，在文档树中都是节点（标签、属性、文本、注释等），使用node表示
- 标签节点：网页中的所有标签，通常称为元素节点，又简称为“元素”，使用element表示

## 获取元素

### 根据<span style="font-weight:700;color:#00B050;font-family:'Consolas'">ID</span>获取

操作页面上的某部分(显示/隐藏，动画)，需要先获取到该部分对应的元素，再对其进行操作

<span style="background-color:yellow;font-family:'Consolas';font-weight:700;">语法</span>：<span style="color:red;font-family:'Consolas';font-weight:700;">document.getElementById(id)</span>

作用：根据**ID**获取元素对象

参数：**id**值，区分大小写的字符串

返回值：**元素对象** 或 <span style="color:#008AC1;font-family:'Consolas';font-weight:700;">null</span>

![image-20220307154654332](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071546375.png)

**返回元素对象，方便查看**

```js
console.dir();
```

### 根据<span style="color:red;font-family:'Consolas';font-weight:700;">类名</span>获取元素

**语法**：`document.getElementsByClassName('类名')`

作用：根据类名获取元素对象

参数：类名

返回值：**HTML集合**（伪数组，数组元素是元素对象）

```js
<p class="con">后哦阿胶高哦电话费㐎</p>
console.log(document.getElementsByClassName('con')); //根据类名返回html集合
```

![image-20220307154959890](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071549921.png)

### 根据<span style="color:red;font-family:'Consolas';font-weight:700;">name</span>获取元素

**语法**：`document.getElementsByName('name属性')`

作用：根据name属性获取元素对象

参数：name名称

返回值：**节点列表集合**（伪数组，数组元素是元素对象）

```js
<input type="text" value="123" name="username">
console.log(document.getElementsByName('username')); // 通过name获取,返回节点列表,类型为数组
```

![image-20220307155100147](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071551183.png)

### 根据<span style="font-weight:700;color:#00B050;font-family:'Consolas'">标签名</span>获取元素

**语法**：`document.getElementsByTagName('标签名')`

**得到这个元素里面的所有标签**

 		`element.getElementsByTagName('标签名')`

作用：根据标签名获取元素对象

参数：标签名

返回值：**元素对象集合**（伪数组，数组元素是元素对象）

```js
<body>
    <ul>
        <li>知否知否，应是等你好久11</li>
        <li>知否知否，应是等你好久22</li>
        <li>知否知否，应是等你好久33</li>
        <li>知否知否，应是等你好久44</li>
        <li>知否知否，应是等你好久55</li>
    </ul>
    <ul id="nav">
        <li>生僻字</li>
        <li>生僻字</li>
        <li>生僻字</li>
        <li>生僻字</li>
        <li>生僻字</li>
    </ul>
    <script>
        // 1.返回的是 获取过来元素对象的集合 以伪数组的形式存储的
        var lis = document.getElementsByTagName('li');
        console.log(lis);
        console.log(lis[0]);
        // 2. 我们想要依次打印里面的元素对象我们可以采取遍历的方式
        for (var i = 0; i < lis.length; i++) {
            console.log(lis[i]);
        }
        // 3. element.getElementsByTagName()  可以得到这个元素里面的某些标签
        var nav = document.getElementById('nav'); // 这个获得nav 元素
        var navLis = nav.getElementsByTagName('li');
        console.log(navLis);
    </script>
</body>
```

![image-20220307155233161](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071552192.png)

注意：getElementsByTagName()获取到是**动态集合**，即：当页面增加了标签，这个集合 中也就增加了元素

### H5新增元素获取方式

```js
1.根据类名返回元素对象集合
document.getElementsByClassName('类名');

2.根据指定选择器返回第一个元素对象
document.querySelector('选择器');

3.根据指定选择器返回所有元素对象集合
document.querySelectorAll('选择器');
```

![image-20220307155309799](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071553829.png)

```js
<body>
    <div class="box">盒子1</div>
    <div class="box">盒子2</div>
    <div id="nav">
        <ul>
            <li>首页</li>
            <li>产品</li>
        </ul>
    </div>
    <script>
        // 1. getElementsByClassName 根据类名获得某些元素集合
        var boxs = document.getElementsByClassName('box');
        console.log(boxs);
        // 2. querySelector 返回指定选择器的第一个元素对象  切记 里面的选择器需要加符号 .box  #nav
        var firstBox = document.querySelector('.box');
        console.log(firstBox);
        var nav = document.querySelector('#nav');
        console.log(nav);
        var li = document.querySelector('li');
        console.log(li);
        // 3. querySelectorAll()返回指定选择器的所有元素对象集合
        var allBox = document.querySelectorAll('.box');
        console.log(allBox);
        var lis = document.querySelectorAll('li');
        console.log(lis);
    </script>
</body>
```

### 获取特殊元素（body，html）

**获取body元素**

```js
1.返回body元素对象
document.body
```

**获取html元素**

```js
2.返回html元素对象
document.documentElement
```

```js
document.documentElement：获取HTML标签的dom对象
document.docType：获取HTML文档的文档头字符
Document.title：获取title的文字标题

• images：全部图片DOM对象集合。
• anchors：全部带name属性的A标签DOM对象集合。
• links：全部带href属性的A标签DOM对象集合。
• forms：全部表单DOM对象集合。
• Script：全部javascript标签DOM对象
```

## 事件基础

**事件概述**

JavaScript 使我们有能力创建动态页面，而事件是可以被 JavaScript 侦测到的行为

 

简单理解： **触发---响应机制**

 

网页中的每个元素都可以产生某些可以触发 JavaScript 的事件，例如，我们可以在用户点击某按钮时产生一个 事件，然后去执行某些操作

### 事件三要素

- 事件源（谁）：触发事件的元素
- 事件类型（什么事件）： 例如 click 点击事件
- 事件处理程序（做啥）：事件触发后要执行的代码(函数形式)，事件处理函数

![image-20220307155525478](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071555525.png)

### 执行事件的步骤

（1）获取事件源

（2）注册事件（绑定事件）

（3）添加事件处理程序（采用函数赋值形式）

![image-20220307155545404](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071555451.png)

### 常见鼠标事件

![image-20220307155600501](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071556545.png)

## 操作元素

JavaScript的 DOM 操作可以改变网页内容、结构和样式，我们可以利用 DOM 操作元素来改变元素里面的内容、属性等

注意：这些操作都是通过元素对象的属性实现的

![image-20220307155622772](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071556815.png)

### 改变元素内容（获取或设置）

<span style="color:red;font-family:'Consolas';font-weight:700;">element.innerText</span>

从起始位置到终止位置的内容，但它**去除html标签**，同时**空格**和**换行**也会**去掉**

<span style="color:red;font-family:'Consolas';font-weight:700;">element.innerHTML</span>

起始位置到终止位置的全部内容，**包括html标签**，同时**保留空格和换行**



<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">innerText改变元素内容</span>

```js
<body>
    <button>显示当前系统时间</button>
    <div>某个时间</div>
    <p>1123</p>
    <script>
        // 当我们点击了按钮，  div里面的文字会发生变化
        // 1. 获取元素 
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        // 2.注册事件
        btn.onclick = function() {
            // div.innerText = '2019-6-6';
            div.innerHTML = getDate();
        }
        function getDate() {
            var date = new Date();
            // 我们写一个 2019年 5月 1日 星期三
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dates = date.getDate();
            var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            var day = date.getDay();
            return '今天是：' + year + '年' + month + '月' + dates + '日 ' + arr[day];
        }
    </script>
</body>
```

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">innerText和innerHTML的区别</span>

- 获取内容时的区别：

innerText会去除空格和换行，而innerHTML会保留空格和换行

- 设置内容时的区别：

innerText不会识别html，而innerHTML会识别

![image-20220307160139926](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071601980.png)

### 常用元素的属性操作

innerText、innerHTML 改变元素内容

src、href

id、alt、title

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性的值</span>

**元素对象.属性名**

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性的值</span>

**元素对象.属性名=值**

![image-20220307160310880](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071603937.png)

### 表单元素的属性操作

利用DOM可以操作如下表单元素的属性：

type、<span style="color:#C00000;font-family:'Consolas';font-weight:700;">value</span>、checked、selected、disabled

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性的值</span>

**元素对象.属性名**

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性的值</span>

表单元素中有一些属性如：disabled、checked、selected，元素对象的这些属性的值是**布尔型**

![image-20220307160500517](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071605560.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取select下拉列表的值</span>

```js
<select name="" id="options">
    <option value="0">+</option>
    <option value="1">-</option>
    <option value="2">×</option>
    <option value="3">÷</option>
</select>

var selects = document.getElementById('options');
var index = selects.options[selects.selectedIndex].value;

selectedIndex 获取已被选中的<option></option>的value值
options 获取所有<option></option>数组，通过得到的value，用下标获取值
```

### 样式属性操作

我们可以通过 JS 修改元素的大小、颜色、位置等样式

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">常用样式</span>

<span style="color:red;font-family:'Consolas';font-weight:700;">element.style</span>行内样式操作

<span style="color:red;font-family:'Consolas';font-weight:700;">element.className</span> 类名样式操作

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">（1）通过操作style属性</span>

元素对象的style属性也是一个对象

<span style="color:red;font-family:'Consolas';font-weight:700;">元素对象.style.样式属性=值;</span>

**注意**：

（1）JS里面的样式采取驼峰命名法 比如 fontSize、backgroundColor

（2）修改style样式操作，产生的是行内样式，css权重比较高

![image-20220307160823469](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071608516.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">(2）通过操作className属性</span>

<span style="color:red;font-family:'Consolas';font-weight:700;">元素对象.className=值;</span>

因为class是关键字，所有使用className

 

注意：

（1）如果样式修改较多，可以采取操作类名方式更改元素样式

（2）class因为是个保留字，因此使用className来操作元素类名属性

（3）className会直接更改元素的类名，会覆盖原先的类名（要保留原先的类，可使用多类名选择器）

![image-20220307162231534](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071622587.png)

## 排他操作

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">排他思想</span>

![image-20220307162547094](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071625124.png)

如果有同一组元素，我们想要某一个元素实现某种样式， 需要用到循环的排他思想算法：

1. **所有元素全部清除样式**（干掉其他人）
2. **给当前元素设置样式** （留下我自己）
3. 注意顺序不能颠倒，首先干掉其他人，再设置自己

![image-20220307162602767](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071626813.png)

## 自定义属性操作

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性值</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 获取属性值

- element.getAttribute('属性');

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">区别</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 获取内置属性值（元素本身自带的属性）

- element.getAttribute('属性'); 主要获得自定义的属性（标准）

![image-20220307172049949](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071720008.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性值</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性='值'</span> 设置内置属性值

- element.setAttribute('属性','值');

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">区别</span>

<span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 设置内置属性值

element.setAttribute('属性'); 主要设置**自定义的属性**（标准）

![image-20220307172259330](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071722383.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">移除属性</span>

`element.removeAttribute('属性');`

![image-20220307172325432](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203071723477.png)

### H5自定义属性

**自定义属性的目的**

为了保存并使用数据；有些数据可以保存到页面中而不用保存到数据库中

通过`getAttribute('属性')`获取



**新增：设置H5自定义属性**

H5规定自定义属性**data-**开头做为属性名并且赋值

```html
比如 <div data-index="1"></div>
或者使用JS设置
element.setAttribute('data-index',2)
```

**获取H5自定义属性**

兼容性获取 `element.getAttribute('data-index')`;

H5新增`element.dataset.index` 或者 `element.dataset['index']` ie11才开始支持 



可以通过 `HTMLElement.dataset.testValue` ( 或者是 `HTMLElement.dataset["testValue"]` ) 来访问

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203281540147.png" alt="image-20220328153959913" style="zoom:80%;" />

## 节点操作

网页中的所有内容都是节点（标签、属性、文本、注释等），在DOM 中，节点使用 node 来表示

 

HTML DOM 树中的所有节点均可通过 JavaScript 进行访问，所有 HTML 元素（节点）均可被修改，也可以创建或删除

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132048963.png" alt="image-20220313204806224" style="zoom:80%;" />

一般地，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）这三个基本属性

- **元素**节点 nodeType 为 1
- **属性**节点 nodeType 为 2
- **文本**节点 nodeType 为 3（文本节点包含文字、空格、换行等）

实际开发中，节点操作<span style="color:#C00000;font-family:'Consolas';font-weight:700;">主要操作的是元素节点</span>

### 节点层级

利用 DOM 树可以把节点划分为不同的层级关系，常见的是**父子兄层级关系**

![image-20220313204859279](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132049163.png)

### 父级节点

`node.parentNode`

parentNode 属性可返回某节点的父节点，注意是<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**最近的一个父节点**</span>

如果指定的节点没有父节点则返回null

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132050238.png" alt="image-20220313205004259" style="zoom:80%;" />

### 子节点

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">所有子节点</span>

（1）`parentNode.childNodes`（标准）

parentNode.childNodes 返回包含指定节点的子节点的集合，该集合为即时更新的集合

**注意**

返回值<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**包含了所有的子节点**</span>，包括元素节点，文本节点等

如果只想要获得里面的元素节点，则需要专门处理。所以不提倡使用childNodes



<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">子元素节点</span>

（2）`parentNode.children`（非标准）

parentNode.children 是一个只读属性，返回所有的子元素节点；它<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**只返回子元素节点**</span>，其余节点不返回

各个浏览器支持使用

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132052182.png" alt="image-20220313205249283" style="zoom:80%;" />

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">第1个子节点</span>

（3）`parentNode.firstChild`

firstChild返回第一个子节点，找不到则返回null。同样，也是**包含所有的节点**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">最后1个子节点</span>

（4）`parentNode.lastChild`

lastChild返回最后一个子节点，找不到则返回null。同样，也是**包含所有的节点**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">第1个子元素节点</span>

（5）`parentNode.firstElementChild`

firstElementChild返回第一个子元素节点，找不到则返回null

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">最后1个子元素节点</span>

（6）`parentNode.lastElementChild`

lastElementChild返回最后一个子元素节点，找不到则返回null



**注意**

firstElementChild和lastElementChild两种方法有<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">兼容性问题</span>，IE9以上支持



**解决方案**

（1）如果想要**第一个子元素节点**，可使用`parentNode.children[0]`

（2）如果想要**最后一个子元素节点**，可使用`parentNode.children[parentNode.children.length - 1]`

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132056811.png" alt="image-20220313205644697" style="zoom:80%;" />

### 兄弟节点

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">下一个兄弟节点</span>

（1）`node.nextSibling`

nextSibling 返回当前元素的下一个兄弟节点，找不到则返回null。同样，也是**包含所有的节点**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">上一个兄弟节点</span>

（2）`node.previousSibling`

previousSibling 返回当前元素上一个兄弟节点，找不到则返回null。同样，也是**包含所有的节点**

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132058188.png" alt="image-20220313205823261" style="zoom:80%;" />

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">下一个兄弟元素节点（兼容性）</span>

（3）`node.nextElementSibling`

nextElementSibling 返回当前元素下一个兄弟元素节点，找不到返回null

 

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">上一个兄弟元素节点（兼容性）</span>

（4）`node.previousElementSibling`

previousElementSibling 返回当前元素上一个兄弟元素节点，找不到返回null



**注意**

nextElementSibling和previousElementSibling存在**兼容性**问题，IE9以上才支持

**解决方法：**

封装一个兼容性函数

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132059516.png" alt="image-20220313205946167" style="zoom:80%;" />

### 创建节点

`document.createElement('tagName')`

document.createElement()方法创建有tagName指定的HTML元素。因为这些元素原先不存在，是根据我们的需求动态生成的，称为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**动态创建元素节点**</span>



### 添加节点

（1）`node.appendChild（child）`

node.appendChild()方法将一个节点添加到指定父节点的子节点列表<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**末尾**</span>

 

（2）`node.insertBefore(child,指定元素)`

node.insertBefore()方法将一个节点添加到父节点的指定子节点<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**前面**</span>

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132102958.png" alt="image-20220313210252634" style="zoom:80%;" />

**select添加节点，通过Otions构造函数**

```js
<script>
        var arrPro = ['湖北省', '湖南省', '四川省', '广东省'];
        function createPro() {
            var pro = document.getElementById('pro');
            for (let i = 0; i < arrPro.length; i++) {
                pro.options.add(new Option(arrPro[i], i));
            }
        };
        window.addEventListener('load', function() {
            createPro();
        });
    </script>
</head>
<body>
    <select name="" id="pro">
        
    </select>
</body>
```

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132103891.png" alt="image-20220313210350111" style="zoom:80%;" />

### 删除节点

`node.remove()`**删除所有子节点**

**node.removeChild(child)** 方法从 node节点中删除一个**子节点**，返回删除的节点

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132104243.png" alt="image-20220313210437492" style="zoom:80%;" />

### 复制（克隆）节点

`node.cloneNode()` 方法返回调用该方法的一个副本。称为克隆节点/拷贝节点

**注意**

1.如果括号参数为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**空**</span>或者为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**false**</span>，则是**浅拷贝**，即只克隆复制节点本身，不克隆里面的子节点

2.如何括号参数为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**true**</span>，则是**深拷贝**，会复制节点本身以及里面所有的子节点

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203132106462.png" alt="image-20220313210622748" style="zoom: 80%;" />

### 创建元素的三种方式

```js
document.write()
element.innerHTML
document.createElement()
```

**区别**

1. document.write是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
2. innerHTML 是将内容写入某个DOM节点，不会导致页面全部重绘
3. innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
4. createElement() 创建多个元素效率稍低一点，但是结构更清晰

**总结**

**不同浏览器下，innerHTML 效率要比 createElement高**

<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202203271949519.png" alt="image-20220327194940835" style="zoom:80%;" />

#### innerTHML和createElement效率对比

innerHTML字符串拼接方式（效率低）

```js
function fn() {
            var d1 = +new Date();
            var str = '';
            for (var i = 0; i < 1000; i++) {
                document.body.innerHTML += '<div style="width:100px; height:2px; border:1px solid blue;"></div>';
            }
            var d2 = +new Date();
            console.log(d2 - d1); //2263
        }
        fn();
    </script>
```

createElement方式（效率一般）

```js
function fn() {
            var d1 = +new Date();
    
            for (var i = 0; i < 1000; i++) {
                var div = document.createElement('div');
                div.style.width = '100px';
                div.style.height = '2px';
                div.style.border = '1px solid red';
                document.body.appendChild(div);
            }
            var d2 = +new Date();
            console.log(d2 - d1);//23
        }
        fn();
```

innerHTML数组方式（效率高）

```js
function fn() {
            var d1 = +new Date();
            var array = [];
            for (var i = 0; i < 1000; i++) {
                array.push('<div style="width:100px; height:2px; border:1px solid blue;"></div>');
            }
            document.body.innerHTML = array.join('');
            var d2 = +new Date();
            console.log(d2 - d1); //7
        }
        fn();
```

#### 浅拷贝 深拷贝

浅拷贝只是拷贝一层

深拷贝拷贝多层

 

**浅拷贝** `Object.assign(新对象,要拷贝的对象)` ES6新增

利用**递归函数**进行深拷贝

```js
var data = [{
        name: '胡梓卓',
        age: 18,
        bir: [{
            date: '1999 - 10 - 19',
            address: '湖北省天门市皂市镇白龙寺西路20号'
        }]
    }, {
        name: '涂鏊飞',
        age: 21,
        bir: [{
            date: '2000 - 1 - 11',
            address: '湖北省天门市皂市镇舒滩村二组1号'
        }],
    }];
    var arr = {};
    Object.assign(arr, data);
    console.log('浅拷贝');
    data[0].age = 999;
    console.log(arr)
    console.log('-----分割线-----');
    function deepCopy(newDate, oldData) {
        for (var k in oldData) {
            var item = oldData[k];
            if (item instanceof Array) {
                newDate[k] = [];
                deepCopy(newDate[k], item);
            } else if (item instanceof Object) {
                newDate[k] = {};
                deepCopy(newDate[k], item);
            } else {
                newDate[k] = item;
            }
        }
    }
    function getId(json, name) {
        var newArray = {};
        json.forEach(function(item) {
            if (item.name == name) {
                newArray = item;
            } else if (item.bir && item.bir.length > 0) {
                newArray = getId(item.bir, name)
            }
        });
        return newArray;
    }
    // console.log(getId(data, '涂鏊飞'));
    deepCopy(arr, data);
    // data.bir.date = '1999-10-19';
    console.log('深拷贝');
    data[0].age = 888;
    console.log(arr);
```

#### insertAdjacent(HTML/Text/Element)

**语法**

https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML#语法

```js
element.insertAdjacentHTML(position, text);
```

**insertAdjacentHTML()** 方法将指定的文本解析为 [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 元素，并将结果节点插入到DOM树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用innerHTML操作更快。

```js
element.insertAdjacentText(position,element)
```

`insertAdjacentText()` 方法将一个给定的文本节点插入在相对于被调用的元素给定的位置
返回值：Void

```js
element.insertAdjacentElement(position,element)
```

`insertAdjacentElement()` 方法将一个给定的元素节点插入到相对于被调用的元素的给定的一个位置
返回值：插入的元素，插入失败则返回null

----

**position**

一个 [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，表示插入内容相对于元素的位置，并且必须是以下字符串之一：

- 'beforebegin'：元素自身的前面。
- '**afterbegin**'：插入元素内部的第一个子节点之前。
- '**beforeend**'：插入元素内部的最后一个子节点之后。
- 'afterend'：元素自身的后面。

**text**

是要被解析为HTML或XML元素，并插入到DOM树中的 [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)。

**Element**

要插入到树中的元素

------

[位置名称的可视化](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML#位置名称的可视化)

```js
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
注意： beforebegin和afterend位置，仅在节点在树中且节点具有一个parent元素时工作
```

## 事件操作
