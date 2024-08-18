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

![image-20220307154436854](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071544894.png)

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

![image-20220307154654332](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071546375.png)

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

![image-20220307154959890](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071549921.png)

### 根据<span style="color:red;font-family:'Consolas';font-weight:700;">name</span>获取元素

**语法**：`document.getElementsByName('name属性')`

作用：根据name属性获取元素对象

参数：name名称

返回值：**节点列表集合**（伪数组，数组元素是元素对象）

```js
<input type="text" value="123" name="username">
console.log(document.getElementsByName('username')); // 通过name获取,返回节点列表,类型为数组
```

![image-20220307155100147](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071551183.png)

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

![image-20220307155233161](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071552192.png)

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

![image-20220307155309799](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071553829.png)

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

![image-20220307155525478](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071555525.png)

### 执行事件的步骤

（1）获取事件源

（2）注册事件（绑定事件）

（3）添加事件处理程序（采用函数赋值形式）

![image-20220307155545404](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071555451.png)

### 常见鼠标事件

![image-20220307155600501](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071556545.png)

## 操作元素

JavaScript的 DOM 操作可以改变网页内容、结构和样式，我们可以利用 DOM 操作元素来改变元素里面的内容、属性等

注意：这些操作都是通过元素对象的属性实现的

![image-20220307155622772](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071556815.png)

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

![image-20220307160139926](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071601980.png)

### 常用元素的属性操作

innerText、innerHTML 改变元素内容

src、href

id、alt、title

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性的值</span>

**元素对象.属性名**

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性的值</span>

**元素对象.属性名=值**

![image-20220307160310880](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071603937.png)

### 表单元素的属性操作

利用DOM可以操作如下表单元素的属性：

type、<span style="color:#C00000;font-family:'Consolas';font-weight:700;">value</span>、checked、selected、disabled

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性的值</span>

**元素对象.属性名**

 

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性的值</span>

表单元素中有一些属性如：disabled、checked、selected，元素对象的这些属性的值是**布尔型**

![image-20220307160500517](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071605560.png)

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

![image-20220307160823469](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071608516.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">(2）通过操作className属性</span>

<span style="color:red;font-family:'Consolas';font-weight:700;">元素对象.className=值;</span>

因为class是关键字，所有使用className

 

注意：

（1）如果样式修改较多，可以采取操作类名方式更改元素样式

（2）class因为是个保留字，因此使用className来操作元素类名属性

（3）className会直接更改元素的类名，会覆盖原先的类名（要保留原先的类，可使用多类名选择器）

![image-20220307162231534](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071622587.png)

## 排他操作

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">排他思想</span>

![image-20220307162547094](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071625124.png)

如果有同一组元素，我们想要某一个元素实现某种样式， 需要用到循环的排他思想算法：

1. **所有元素全部清除样式**（干掉其他人）
2. **给当前元素设置样式** （留下我自己）
3. 注意顺序不能颠倒，首先干掉其他人，再设置自己

![image-20220307162602767](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071626813.png)

## 自定义属性操作

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">获取属性值</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 获取属性值

- element.getAttribute('属性');

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">区别</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 获取内置属性值（元素本身自带的属性）

- element.getAttribute('属性'); 主要获得自定义的属性（标准）

![image-20220307172049949](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071720008.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">设置属性值</span>

- <span style="color:red;font-family:'Consolas';font-weight:700;">element.属性='值'</span> 设置内置属性值

- element.setAttribute('属性','值');

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">区别</span>

<span style="color:red;font-family:'Consolas';font-weight:700;">element.属性</span> 设置内置属性值

element.setAttribute('属性'); 主要设置**自定义的属性**（标准）

![image-20220307172259330](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071722383.png)

<span style="color:#008AC1;font-family:'Consolas';font-weight:700;">移除属性</span>

`element.removeAttribute('属性');`

![image-20220307172325432](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203071723477.png)

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203281540147.png" alt="image-20220328153959913" style="zoom:80%;" />

## 节点操作

网页中的所有内容都是节点（标签、属性、文本、注释等），在DOM 中，节点使用 node 来表示

 

HTML DOM 树中的所有节点均可通过 JavaScript 进行访问，所有 HTML 元素（节点）均可被修改，也可以创建或删除

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132048963.png" alt="image-20220313204806224" style="zoom:80%;" />

一般地，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）这三个基本属性

- **元素**节点 nodeType 为 1
- **属性**节点 nodeType 为 2
- **文本**节点 nodeType 为 3（文本节点包含文字、空格、换行等）

实际开发中，节点操作<span style="color:#C00000;font-family:'Consolas';font-weight:700;">主要操作的是元素节点</span>

### 节点层级

利用 DOM 树可以把节点划分为不同的层级关系，常见的是**父子兄层级关系**

![image-20220313204859279](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132049163.png)

### 父级节点

`node.parentNode`

parentNode 属性可返回某节点的父节点，注意是<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**最近的一个父节点**</span>

如果指定的节点没有父节点则返回null

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132050238.png" alt="image-20220313205004259" style="zoom:80%;" />

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132052182.png" alt="image-20220313205249283" style="zoom:80%;" />

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132056811.png" alt="image-20220313205644697" style="zoom:80%;" />

### 兄弟节点

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">下一个兄弟节点</span>

（1）`node.nextSibling`

nextSibling 返回当前元素的下一个兄弟节点，找不到则返回null。同样，也是**包含所有的节点**

<span style="color:#2E75B5;font-family:'Consolas';font-weight:700;">上一个兄弟节点</span>

（2）`node.previousSibling`

previousSibling 返回当前元素上一个兄弟节点，找不到则返回null。同样，也是**包含所有的节点**

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132058188.png" alt="image-20220313205823261" style="zoom:80%;" />

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132059516.png" alt="image-20220313205946167" style="zoom:80%;" />

### 创建节点

`document.createElement('tagName')`

document.createElement()方法创建有tagName指定的HTML元素。因为这些元素原先不存在，是根据我们的需求动态生成的，称为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**动态创建元素节点**</span>



### 添加节点

（1）`node.appendChild（child）`

node.appendChild()方法将一个节点添加到指定父节点的子节点列表<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**末尾**</span>

 

（2）`node.insertBefore(child,指定元素)`

node.insertBefore()方法将一个节点添加到父节点的指定子节点<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**前面**</span>

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132102958.png" alt="image-20220313210252634" style="zoom:80%;" />

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132103891.png" alt="image-20220313210350111" style="zoom:80%;" />

### 删除节点

`node.remove()`**删除所有子节点**

**node.removeChild(child)** 方法从 node节点中删除一个**子节点**，返回删除的节点

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132104243.png" alt="image-20220313210437492" style="zoom:80%;" />

### 复制（克隆）节点

`node.cloneNode()` 方法返回调用该方法的一个副本。称为克隆节点/拷贝节点

**注意**

1.如果括号参数为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**空**</span>或者为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**false**</span>，则是**浅拷贝**，即只克隆复制节点本身，不克隆里面的子节点

2.如何括号参数为<span style="background-color:yellow;font-family:'Consolas';font-weight:400;">**true**</span>，则是**深拷贝**，会复制节点本身以及里面所有的子节点

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203132106462.png" alt="image-20220313210622748" style="zoom: 80%;" />

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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202203271949519.png" alt="image-20220327194940835" style="zoom:80%;" />

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

### 注册事件（两种方式）

给元素添加事件，称为注册事件或绑定事件

注册事件有两种方式：传统方式和监听注册方式

**传统注册方式**

- 利用 on 开头的事件 onclick
- `<button onclick="alert('hi~')"></button>`
- btn.onclick=function(){}
- 特点：注册事件的**唯一性**
- 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数

**监听注册方式**

- w3c标准 推荐方式
- addEventListener() 它是一个方法
- IE9之前的IE不支持此方法，可使用**attachEvent()**代替
- 特点：同一个元素同一个事件可以注册多个监听器
- 按注册顺序依次执行

### 事件监听

**addEventListener()事件监听（IE9以后支持）**

```js
eventTarget.addEventListener(type,listener[,useCapture])
```

eventTarget.addEventListener() 方法将指定的监听器注册到 eventTarget（目标对象）上，当该对象触发指定的事件时，就会执行事件处理函数



该方法接收**三个参数**：

type：事件类型字符串，比如click、mouseover，注意这里不要带on

listener：时间处理函数，事件发生时，会调用该监听函数

useCapture：可选参数，是一个布尔值，默认是false

**attachEvent()事件监听（IE678支持）**

```js
eventTarget.attachEvent(eventNameWithOn,callback)
```

eventTarget.attachEvent() 方法将指定的监听器注册到 eventTarget（目标对象）上，当该对象触发指定的事件时，指定的回调函数就会被执行

 

该方法接收**两个参数**：

eventNameWithOn：事件类型字符串。比如onclick、onmouseover。这里要带on

callback：事件处理函数，当目标触发事件时回调函数被调用

**注意：IE8及早期版本支持**

```js
<button>传统注册事件</button>
    <button>方法监听注册事件</button>
    <button>ie9 attachEvent</button>
    <script>
        var btns = document.querySelectorAll('button');
        // 1. 传统方式注册事件
        btns[0].onclick = function() {
            alert('hi');
        }
        btns[0].onclick = function() {
                alert('hao a u');
            }
       // 2. 事件侦听注册事件 addEventListener 
       // (1) 里面的事件类型是字符串 必定加引号 而且不带on
       // (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
        btns[1].addEventListener('click', function() {
            alert(22);
        })
        btns[1].addEventListener('click', function() {
                alert(33);
        })
        // 3. attachEvent ie9以前的版本支持
        btns[2].attachEvent('onclick', function() {
            alert(11);
        })
    </script>
```

**事件监听兼容性解决方案**

封装一个函数，函数中判断浏览器的类型；

```js
function addEventListener(element,eventName,fn){
    //判断当前浏览器是否支持addEventListener 方法
    if(element.addEventListener){
        element.addEventListener(eventName,fn); //第三个参数 默认是false
    }
    else if(element.attachEvent){
        element.attachEvent('on'+eventName,fn);
    }
    else{
        //相当于element.onclick=fn;
        element['on'+eventName]=fn;
    }
}
```

### 删除事件（解绑事件）

（1）传统注册方式

eventTatget.onclick=null;

 

（2）方法监听注册方式

- eventTarget.**removeEventListener**(type,listener[,useCapture]);
- eventTarget.**detachEvent**(eventNameWith**On**,callback);

![image-20220407155240427](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071552626.png)

**删除事件兼容性解决方案**

```js
function removeEventListener(element,eventName,fn){
            //判断当前浏览器是否支持removeEventListener方法
            if(element.removeEventListener){
                element.removeEventListener(eventName,fn); //第三个参数 默认是false
            }
            else if(element.detachEvent){
                element.detachEvent('on'+eventName,fn);
            }
            else{
                element['on'+eventName]=null;
            }
        }
```

### DOM事件流

html中的标签都是相互嵌套的，我们可以将元素想象成一个盒子装一个盒子，document是最外面的大盒子

当你**单击一个****div**时，同时你**也单击了****div****的父元素**，甚至整个页面。

 

那么是先执行父元素的单击事件，还是先执行div的单击事件 ？？？

 

**事件流** 描述的是从页面中接收事件的顺序

**事件**发生时会在元素节点之间按照**特定的顺序传播**，这个传播过程 即**DOM****事件流**

 

比如：我们给页面中的一个div注册了单击事件，当你单击了div时，也就单击了body，单击了html，单击了document

![image-20220407155343430](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071553513.png)

- 事件冒泡：IE最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到DOM最顶层节点的过程
- 事件捕获：网景最早提出，由DOM最顶层节点开始，然后逐级向下传播到最具体的元素接收的过程

> 当时的2大浏览器霸主谁也不服谁！
>
> IE 提出从目标元素开始，然后一层一层向外接收事件并响应，也就是冒泡型事件流
>
> Netscape（网景公司）提出从最外层开始，然后一层一层向内接收事件并响应，也就是捕获型事件流
>
> 
>
> 江湖纷争，武林盟主也脑壳疼！！！
>
>  
>
> 最终，w3c 采用折中的方式，平息了战火，制定了统一的标准 —--— 先捕获再冒泡。
>
> 现代浏览器都遵循了此标准，所以当事件发生时，会经历3个阶段**DOM****事件流经历****3****个阶段**
>
> 1. **捕获阶段**
> 2. **当前目标阶段**
> 3. **冒泡阶段**



**DOM事件流经历3个阶段**

1. **捕获阶段**
2. **当前目标阶段**
3. **冒泡阶段**

![image-20220407155456025](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071554094.png)

注意

（1）JS代码中只能执行捕获或者冒泡**其中的一个阶段**

（2）**onclick** **和** **attachEvent** **只能得到冒泡阶段**

（3）addEventListener(type,listener[,useCapture])第三个参数如果是**true**，表示在事件捕获阶段调用事件处理程序；如果是false（默认是false），表示在事件冒泡阶段调用事件处理程序

（4）实际开发中我们很少使用事件捕获，**更关注事件冒泡**

（5）**有些事件没有冒泡，比如onblur、onfocus、onmouseenter、onmouseleave**

（6）事件冒泡有时候会带来麻烦，有时候又会帮助到我们

**事件冒泡**

```js
<div class="father">
        <div class="son">son盒子</div>
    </div>
    <script>
        // onclick 和 attachEvent（ie） 在冒泡阶段触发
        // 冒泡阶段 如果addEventListener 第三个参数是 false 或者 省略 
        // son -> father ->body -> html -> document
        var son = document.querySelector('.son');
        // 给son注册单击事件
        son.addEventListener('click', function() {
            alert('son');
        }, false);
        // 给father注册单击事件
        var father = document.querySelector('.father');
        father.addEventListener('click', function() {
            alert('father');
        }, false);
        // 给document注册单击事件，省略第3个参数
        document.addEventListener('click', function() {
            alert('document');
        })
    </script>
```

**事件捕获**

```js
<div class="father">
        <div class="son">son盒子</div>
    </div>
    <script>
        // 如果addEventListener() 第三个参数是 true 那么在捕获阶段触发
        // document -> html -> body -> father -> son
         var son = document.querySelector('.son');
        // 给son注册单击事件，第3个参数为true
         son.addEventListener('click', function() {
             alert('son');
         }, true);
         var father = document.querySelector('.father');
        // 给father注册单击事件，第3个参数为true
         father.addEventListener('click', function() {
             alert('father');
         }, true);
        // 给document注册单击事件，第3个参数为true
        document.addEventListener('click', function() {
            alert('document');
        }, true)
    </script>
```

### 事件对象

**什么是事件对象**

事件发生后，跟事件相关的一系列信息数据的集合都放到这个对象里面，这个对象就是事件对象

比如： 

1. 谁绑定了这个事件
2. 鼠标触发事件的话，会得到鼠标的相关信息，如鼠标位置
3. 键盘触发事件的话，会得到键盘的相关信息，如按了哪个键

**事件对象的使用**

事件触发发生时就会产生事件对象，并且系统会以**实参的形式传给事件处理函数**

所以，在事件处理函数中**声明1个形参用来接收事件对象**

```js
eventTarget.onclick=function(event){
            //这个event就是事件对象，还可以写成e或者evt
        }
        eventTarget.addEventListener('click',function(event){
            //这个event就是事件对象，还可以写成e或者evt
        })
        eventTarget.addEventListener('click',fn)
        function(event){
            //这个event就是事件对象，还可以写成e或者evt
        }
```

#### 事件对象的兼容性处理

事件对象本身的获取存在兼容问题：

1. 标准浏览器中是浏览器给方法传递的参数，只需要定义形参 e 就可以获取到
2. 在 IE6~8 中，浏览器不会给方法传递参数，如果需要的话，需要到 window.event 中获取查找

**解决：**

**e=e || window.event;**

> 只要“||”前面为false, 不管“||”后面是true 还是 false，都返回 “||” 后面的值
>
> 只要“||”前面为true, 不管“||”后面是true 还是 false，都返回 “||” 前面的值

![image-20220407155749952](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071557023.png)

#### 事件对象的属性和方法

| **事件对象属性方法** | **说明**                                                     |                                   |
| -------------------- | ------------------------------------------------------------ | --------------------------------- |
| e.target             | 返回**触发**事件的对象                                       | 标准                              |
| e.srcElement         | 返回**触发**事件的对象                                       | 非标准 IE6-8使用                  |
| e.type               | 返回事件的类型 比如click mouseover **不带on**                |                                   |
| e.cancelBubble       | 该属性阻止 冒泡                                              |                                   |
| e.returnValue        | 该属性 阻止默认事件（默认行为）<br />【**return  false**（后面代码无法执行）】 | 非标准 IE6-8使用 比如不让链接跳转 |
| e.preventDefault()   | 该方法 阻止默认事件（默认行为）                              | 标准 比如不让链接跳转             |
| e.stopPropagation()  | 阻止 冒泡                                                    | 标准                              |

**e.target 和 this 的区别**

- this 是事件绑定的元素（绑定这个事件处理函数的元素）
- e.target 是事件触发的元素（点击谁，谁触发）

 

正常情况下terget 和 this是一致的，

但有一种情况不同，那就是在事件冒泡时（**父子元素有相同事件**，单击子元素，父元素的事件处理函数也会被触发执行）

这时候**this指向的是父元素**，因为它是**绑定事件的元素对象**，

而**target指向的是子元素**，因为他是**触发事件的那个具体元素对象**

![image-20220407155856543](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071558612.png)

**事件冒泡下的e.target和this**

![image-20220407155919293](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071559366.png)

### 阻止默认行为

html中一些标签有默认行为，例如a标签被单击后，默认会进行页面跳转

![image-20220407155947128](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071559197.png)

**JQuery禁止表单提交**

```js
$("#sub").click(function(e) {
     e.preventDefault();
});
```

### 阻止事件冒泡

事件冒泡本身的特性，会带来坏处，也会有好处

- 标准写法：利用事件对象里面的     stopPropagation()方法

**e.stopPropagation()**

- 非标准写法：IE6-8 利用事件对象 cancelBubble属性

**e.cancelBubble=true;**

![image-20220407160039297](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071600380.png)

**阻止事件冒泡的兼容性处理**

```js
if(e && e.stopPropagation){
            e.stopPropagation();
        }
        else{
            window.event.cancelBubble=true;
        }
```

### 事件委托

事件委托也称为事件代理，在 jQuery 里面称为事件委派

 

说白了就是，不给子元素注册事件，给父元素注册事件，把处理代码在父元素的事件中执行



**js事件中的代理**

![image-20220407160143691](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071601774.png)

**事件委托的原理**

给**父元素注册事件**，利用事件冒泡，当**子元素的事件触发**，会**冒泡到父元素**，然后去控制相应的子元素

**事件委托的作用**

- 我们只操作了一次 DOM ，提高了程序的性能
- 动态新创建的子元素，也拥有事件

![image-20220407160217442](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071602516.png)

### 常用鼠标事件

| **鼠标事件** | **触发事件**                                                 |
| ------------ | ------------------------------------------------------------ |
| onclick      | 鼠标点击左键触发                                             |
| onmouseover  | 鼠标经过触发                                                 |
| onmouseout   | 鼠标离开触发                                                 |
| onfocus      | 获得鼠标焦点触发                                             |
| onblur       | 失去鼠标焦点触发                                             |
| onmousemove  | 鼠标移动触发                                                 |
| onmouseup    | 鼠标弹起触发                                                 |
| onmousedown  | 鼠标按下触发                                                 |
| onselect     | 事件发生在元素中的文本被选中之后     事件主要用于 `<input type="text">` 或  `<textarea>` 元素 |

#### 禁止选中文字和右键菜单

**（1）禁止鼠标右键菜单**

**contextmenu**主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单

```js
document.addEventListener('contextmenu',function(e)){
    e.preventDefault();
}
```

**（2）禁止鼠标选中（selectstart 开始选中）**

```js
document.addEventListener('selectstart',function(e)){
    e.preventDefault();
}
```

![image-20220407160348401](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071603481.png)

### 鼠标事件对象

**event** 事件对象是事件相关的一系列信息的集合

 

现阶段我们主要是用鼠标事件对象 **MouseEvent** 和键盘事件对象 **keyboardEvent**

| **鼠标事件对象** | **说明**                                |          |
| ---------------- | --------------------------------------- | -------- |
| e.clientX        | 返回鼠标相对于浏览器窗口可视区的 X 坐标 |          |
| e.clientY        | 返回鼠标相对于浏览器窗口可视区的 Y 坐标 |          |
| e.pageX          | 返回鼠标相对于文档页面的 X 坐标         | IE9+支持 |
| e.pageY          | 返回鼠标相对于文档页面的 Y 坐标         | IE9+支持 |
| e.screenX        | 返回鼠标相对于电脑屏幕的  X 坐标        |          |
| e.screenY        | 返回鼠标相对于电脑屏幕的  Y 坐标        |          |

#### 获取鼠标在页面的坐标

```JS
<script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------');
            // 2. page 鼠标在页面文档的x和y坐标
            console.log(e.pageX);
            console.log(e.pageY);
            console.log('---------------------');
            // 3. screen 鼠标在电脑屏幕的x和y坐标
            console.log(e.screenX);
            console.log(e.screenY);
        })     
    </script>
```

#### 案例-跟随鼠标的天使

![image-20220407165932298](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071659381.png)

![image-20220407165947093](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071659190.png)

### 常用键盘事件

| **键盘事件** | **触发条件**                                                 |
| ------------ | ------------------------------------------------------------ |
| onkeyup      | 某个键盘按键被松开时触发                                     |
| onkeydown    | 某个键盘按键被按下时触发                                     |
| onkeypress   | 某个键盘按键被按下时触发 但是不识别功能键 比如ctrl shift 箭头等 |

注意
 （1）如果使用addEventListener不需要加on

（2）**onkeypress** 和前面2个的区别：**不识别功能键**

（3）三个事件的**执行顺序**：**keydown -> keypress -> keyup**

![image-20220407170021119](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071700198.png)

#### 键盘事件对象

| **键盘事件对象属性** | **说明**          |
| -------------------- | ----------------- |
| keyCode              | 返回该键的ASCII值 |

**注意**

（1）**onkeydown** 和 **onkeyup** **不区分**子母大小写，**onkeypress****区分**字母大小写

（2）实际开发，更多使用keydown和keyup，能识别所有键

（3）keypress 不识别功能键，但**keyCode属性能区分大小写，返回不同的ASCII值**

**使用keyCode属性判断用户按下哪个键**

```JS
<script>
        // 键盘事件对象中的keyCode属性可以得到相应键的ASCII码值
        document.addEventListener('keyup', function(e) {
            console.log('up:' + e.keyCode);
            // 我们可以利用keycode返回的ASCII码值来判断用户按下了那个键
            if (e.keyCode === 65) {
                alert('您按下的a键');
            } else {
                alert('您没有按下a键')
            }
        })
        document.addEventListener('keypress', function(e) {
            // console.log(e);
            console.log('press:' + e.keyCode);
        })
    </script>
```

![image-20220407170133288](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071701361.png)

#### 双击禁止选定文字

**双击事件**

```JS
ondblclick  
```

**双击禁止选定文字**

```JS
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
```

**文本框里面的文字处于选定状态**

```JS
input.select(); 
```

## BOM

### BOM的构成

![image-20220407170324762](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071703839.png)

### 顶级对象window

**window****对象是浏览器的顶级对象**，具有双重角色

 

（1）JS**访问浏览器窗口的一个接口**

（2）是**一个全局对象**。定义在全局作用域中的变量、函数都会变成window对象的属性和方法；在调用的时候可以省略window

 

**注意：window下的一个特殊属性**`window.name`

### window对象常见事件

#### 页面（窗口）加载事件

【1】第一种

`window.onload=function(){}`

或者

`window.addEventListener("load",function(){});`

 

window.onload是窗口（页面）加载事件，当文档内容完全加载完成会触发该事件（包括图像、脚本文件、css文件等）

**注意**

（1）window.load可以把JS代码写到页面上方，onload会等页面全部加载完成，再执行处理函数

（2）window.load传统注册事件只能写一次，如果有多个，会层叠

（3）若使用addEventListener则没有限制

【2】第二种

`document.addEventListener('DOMContentLoaded',function(){})`

 

DOMContentLoaded事件触发时，仅当DOM加载完成时，**不包括样式表、图片、flash**等

IE9以上支持！

页面图片较多，从用户访问到onload触发可能需要较长时间，交互效果无法实现，可使用DOMContentLoaded事件

![image-20220407171448004](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071714085.png)

#### 调整窗口大小事件

`window.onresize = function() {}`

`window.addEventListener("resize",function() {});`

 

window.onresize是调整窗口大小加载事件，当触发时调用函数

**注意**

（1）只要窗口大小发生像素变化，即触发事件

（2）利用此事件完成响应式布局。**window.innerWidth**当前屏幕的宽度

![image-20220407171545079](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071715154.png)

### 定时器

window 对象给我们提供了 2 个非常好用的方法-定时器

- **setTimeout()**
- **setInterval()**

#### setTimeout()炸弹定时器

**开启定时器**

```JS
window.setTimeout(调用函数,[延迟的毫秒数]);
```

setTimeout() 这个调用函数称为**回调函数callback**

 

**注意**

（1）window可省略

（2）这个调用函数可以**直接写函数**，或者**写函数名**或者采取字符串**'函数名()'**三种形式

（3）延迟的毫秒数省略默认是0，如果写，必须是毫秒

（4）定时器可能有很多，需要给定时器赋值一个标识符

![image-20220407171710196](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071717275.png)

**停止定时器**

`window.clearTimeout(timeoutID)`

clearTimeout()方法取消了先前通过调用setTimeout()建立的定时器

**注意**

（1）window可省略

（2）参数timeoutID为定时器的标识符

![image-20220407171758261](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071717333.png)

#### setInterval()闹钟定时器

**开启定时器**

```JS
window.setInterval(回调函数,[间隔的毫秒数]);
```

setInterval()方法重复调用一个函数，每隔这个时间，就调用一次回调函数

**注意**

（1）window可省略

（2）这个调用函数，可**直接写函数**或者**函数名**或者**采取字符串'函数名()'**三种形式

（3）间隔的毫秒数省略默认是0，如果写，必须是毫秒，表示每隔多少毫秒就自动调用

（4）给定时器赋值一个标识符

（5）第一次执行也是间隔毫秒数之后执行，之后每隔毫秒数就执行一次

![image-20220407171905668](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071719746.png)

**停止定时器**

`window.clearInterval(intervalID);`

clearInterval()方法取消了先前通过调用setInterval()建立的定时器

**注意**

（1）window可省略

（2）参数intervalID为定时器的标识符

### this指向问题

this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，一般情况下this的最终指向的是那个调用它的对象

 

1. **全局作用域**或者普通函数中this指向全局对象window（注意**定时器**里面的this指向window）
2. **方法调用**中谁调用this指向谁
3. **构造函数**中this指向构造函数的实例

```js
<button>点击</button>
    <script>
        // this 指向问题 一般情况下this的最终指向的是那个调用它的对象
        // 1. 全局作用域或者普通函数中this指向全局对象window（ 注意定时器里面的this指向window）
        console.log(this);
        function fn() {
            console.log(this);
        }
        window.fn();
        window.setTimeout(function() {
            console.log(this);
        }, 1000);
        // 2. 方法调用中谁调用this指向谁
        var o = {
            sayHi: function() {
                console.log(this); // this指向的是 o 这个对象
            }
        }
        o.sayHi();
        var btn = document.querySelector('button');
        btn.addEventListener('click', function() {
                console.log(this); // 事件处理函数中的this指向的是btn这个按钮对象
            })
        // 3. 构造函数中this指向构造函数的实例
        function Fun() {
            console.log(this); // this 指向的是fun 实例对象
        }
        var fun = new Fun();
    </script>
```

#### 函数内部的this指向

这些 this 的指向，是当我们调用函数的时候确定的。调用方式的不同决定了this 的指向不同

一般指向我们的调用者

![image-20220407172053949](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071720034.png)

#### 改变函数内部的this指向

**call方法**

call()方法调用一个对象。简单理解为调用函数的方式，但是它可以改变函数的this指向

应用场景: 经常做**继承**

```js
var o = {
    name: 'andy'
}
function fn(a, b) {
    console.log(this);
    console.log(a + b)
};
fn(1, 2) // 此时的this指向的是window 运行结果为3
fn.call(o, 1, 2) //此时的this指向的是对象o,参数使用逗号隔开,运行结果为3
```

![image-20220407172138617](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071721695.png)

**apply方法**

apply() 方法调用一个函数。简单理解为调用函数的方式，但是它可以改变函数的 this 指向。

应用场景: 经常跟**数组**有关系

![image-20220407172202945](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071722032.png)



**bind方法**

bind() 方法不会调用函数,但是能改变函数内部this 指向,返回的是原函数改变this之后产生的**新函数**

如果只是想改变 this 指向，并且不想调用这个函数的时候，可以使用bind

应用场景:不调用函数,但是还想改变this指向

![image-20220407172305928](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071723015.png)

**call、apply、bind三者的异同**

共同点 : 都可以改变this指向

不同点:

- call 和 apply 会调用函数, 并且改变函数内部this指向.

- call 和 apply传递的参数不一样,call传递参数使用**逗号**隔开,apply使用**数组**传递

- bind **不会调用函数**, 可以改变函数内部this指向.

  **应用场景**

1. call     经常做继承. 
2. apply经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
3. bind 不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向. 

### JS执行队列

**JS是单线程**

javascript语言一大特点是单线程，同一时间只能做一件事。javascript是为处理页面中用户的交互，以及操作DOM而诞生的，所以我们不能同时进行

 

**同步和异步**

为了解决这个问题，利用多核CPU的计算能力，HTML5提出Web Worker标准，允许javascript脚本创建多个线程

 

**同步任务**

同步任务都在主线程上执行，形成一个**执行栈**

 

**异步任务**

JS的异步是通过回调函数实现的

**一般由三种类型：**

1. 普通事件，click、resize
2. 资源加载，load、error
3. 定时器，setInterval、setTimeout

异步任务相关**回调函数**添加到**任务队列**中（任务队列也称为消息队列）

![image-20220407172440521](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071724608.png)

**JS执行机制**

1. 先执行**执行栈中的同步任务**
2. 异步任务（回调函数）放入任务队列中
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取**任务队列**中的异步任务，结束等待状态，进入执行栈，开始执行

![image-20220407172523746](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071725866.png)

### location对象

window对象提供了一个**location属性**用于**获取或设置窗体的URL**，并且可以用于**解析URL**。因为返回一个对象，也称为location对象

 

URL

**统一资源定位符**（Uniform Resource Locator,URL）是物联网上标准资源的地址，互联网每个文件都有唯一的一个URL，它包含的信息指出问文件的位置以及浏览器应该怎么处理

**URL的一般语法格式：**

```js
protocol://host[:port]/path/[?query]#fragment
http://www.itcast.cn/index.html?name=andy&age=18#link
```

| **组成** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| protocol | 通信协议  http,ftp,maito                                     |
| host     | 主机（域名） [www.itcast.com](http://www.itcast.com)         |
| port     | 端口号 可选 省略，使用默认 http默认80                        |
| path     | 路径 由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
| query    | 参数 以键值对的形式，通过&符号分隔                           |
| fragment | 片段 #后面内容 常见于链接 描点                               |

**location对象属性**

| **location对象属性** | **返回值**                       |
| -------------------- | -------------------------------- |
| **location.href**    | **获取或设置** **整个URL**       |
| location.host        | 返回主机（域名）                 |
| location.port        | 返回端口号 如果未写返回 空字符串 |
| location.pathname    | 返回路径                         |
| **location.search**  | **返回参数**                     |
| location.hash        | 返回片段 #后面内容               |

**location对象的常见方法**

| **location对象**   | **返回值**                                         |
| ------------------ | -------------------------------------------------- |
| location.assign()  | 和href一样，可以跳转页面（重定向）                 |
| location.replace() | 替换当前页面，不记录历史，无法后退                 |
| location.reload()  | 重新加载页面，刷新、F5，参数为true 强制刷新ctrl+f5 |

![image-20220407172730984](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071727079.png)

### navigator对象

navigator 对象包含有关**浏览器的信息**，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值

**判断用户那个终端打开页面，实现跳转**

```js
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机
 } else {
    window.location.href = "";     //电脑
 }
```

### history对象

window对象给我们提供了一个 history对象，与浏览器历史记录进行交互。该对象**包含用户**（在浏览器窗口中）**访问过的URL**

 

| **history对象方法** | **作用**                                              |
| ------------------- | ----------------------------------------------------- |
| back()              | 可以后退功能                                          |
| forward()           | 前进功能                                              |
| go(参数)            | 前进后退功能 参数为1 前进1个页面 参数为-1 后退1个页面 |

### 本地存储

#### 本地存储特性

（1）数据存储在用户浏览器中

（2）设置、读取方便、甚至页面刷新不丢失数据

（3）容量较大，sessionStorage约5M、localStorage约20M

（4）只能存储字符串，可以将对象JSON.stringify() 编码后存储

#### window.sessionStorage

1、生命周期为关闭浏览器窗口

2、在同一个窗口(页面)下数据可以共享

3、以键值对的形式存储使用

```js
//存储数据
sessionStorage.setItem(key, value)
//获取数据
sessionStorage.getItem(key)
//删除数据
sessionStorage.removeItem(key)
//清空数据（清除所有）
sessionStorage.clear()
```

#### window.localStorage

（1）声明周期**永久生效**，除非手动删除 否则关闭页面也会存在

（2）可以**多窗口（页面）共享**（同一浏览器可以共享）

（3）以键值对的形式存储使用

```js
//存储数据
localStorage.setItem(key, value)
//获取数据
localStorage.getItem(key)
//删除数据
localStorage.removeItem(key)
//清空数据（所有数据都清除掉）
localStorage.clear()
```

**本地存储** **localStorage** **里面只能存储字符串格式** **，因此需要把对象转换为字符串 `JSON.stringify(data)`**

**获取本地存储数据，需要把里面的字符串转换为对象格式`JSON.parse()`** **我们才能使用里面的数据**

#### 记住用户名

1. 把数据存起来，用到本地存储
2. 关闭页面，也可以显示用户名，所以用到localStorage
3. 打开页面，先判断是否有这个用户名，如果有，就在表单里面显示用户名，并且勾选复选框
4. 当复选框发生改变的时候change事件
5. 如果勾选，就存储，否则就移除

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <input type="text" id="username"> <input type="checkbox" name="" id="remember"> 记住用户名
    <script>
        var username = document.querySelector('#username');
        var remember = document.querySelector('#remember');
        if (localStorage.getItem('username')) {
            username.value = localStorage.getItem('username');
            remember.checked = true;
        }
        remember.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('username', username.value)
            } else {
                localStorage.removeItem('username');
            }
        })
    </script>
</body>
```

### 元素偏移量offset

offset 翻译过来就是偏移量， 我们使用 offset系列相关属性可以动态的得到该元素的位置（偏移）、大小等

1. 获得**元素距离**带有定位父元素的位置
2. 获得**元素自身的大小**（宽度高度）
3. 注意：返回的数值都**不带单位**

 

| **offset系列属性**   | **作用**                                                     |
| -------------------- | ------------------------------------------------------------ |
| element.offsetParent | 返回作为该元素带有定位的父级元素 如果父级都没有定位 则返回body |
| element.offsetTop    | 返回元素相对带有定位父元素上方的偏移                         |
| element.offsetLeft   | 返回元素相对带有定位父元素左边框的偏移                       |
| element.offsetWidth  | 返回自身包括padding、**边框**、内容区的宽度，返回数值不带单位 |
| element.offsetHeight | 返回自身包括padding、**边框**、内容区的高度，返回数值不带单位 |

![image-20220407173201667](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071732762.png)

**模态框拖拽**

1. 点击弹出层， 模态框和遮挡层就会显示出来 display:block;
2. 点击关闭按钮，模态框和遮挡层就会隐藏起来 display:none;
3. 在页面中拖拽的原理：鼠标按下并且移动，之后松开鼠标
4. 触发事件是鼠标按下mousedown，鼠标移动mousemove 鼠标松开 mouseup
5. 拖拽过程: 鼠标移动过程中，获得最新的值赋值给模态框的left和top值，这样模态框可以跟着鼠标走了
6. 鼠标按下触发的事件源是最上面一行，就是 id 为 title 
7. 鼠标的坐标减去 鼠标在盒子内的坐标，     才是模态框真正的位置。
8. 鼠标按下，我们要得到鼠标在盒子的坐标。
9. 鼠标移动，就让模态框的坐标 设置为 ：鼠标坐标     减去盒子坐标即可，注意移动事件写到按下事件里面。
10. 鼠标松开，就停止拖拽，就是可以让鼠标移动事件解除 

```js
// 1. 获取元素
        var login = document.querySelector('.login');
        var mask = document.querySelector('.login-bg');
        var link = document.querySelector('#link');
        var closeBtn = document.querySelector('#closeBtn');
        var title = document.querySelector('#title');
        // 2. 点击弹出层这个链接 link  让mask 和login 显示出来
        link.addEventListener('click', function() {
                mask.style.display = 'block';
                login.style.display = 'block';
            })
            // 3. 点击 closeBtn 就隐藏 mask 和 login 
        closeBtn.addEventListener('click', function() {
                mask.style.display = 'none';
                login.style.display = 'none';
            })
            // 4. 开始拖拽
            // (1) 当我们鼠标按下， 就获得鼠标在盒子内的坐标
        title.addEventListener('mousedown', function(e) {
            var x = e.pageX - login.offsetLeft;
            var y = e.pageY - login.offsetTop;
            // (2) 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
            document.addEventListener('mousemove', move)
            function move(e) {
                login.style.left = e.pageX - x + 'px';
                login.style.top = e.pageY - y + 'px';
            }
            // (3) 鼠标弹起，就让鼠标移动事件移除
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', move);
            })
        })
```

**仿京东放大镜**

- 整个案例可以分为三个功能模块
- 鼠标经过小图片盒子， 黄色的遮挡层 和  大图片盒子显示，离开隐藏2个盒子功能
- 黄色的遮挡层跟随鼠标功能。 
- 移动黄色遮挡层，大图片跟随移动功能。

 

1. 黄色的遮挡层跟随鼠标功能。
2. 把鼠标坐标给遮挡层不合适。因为遮挡层坐标以父盒子为准。
3. 首先是获得鼠标在盒子的坐标。 
4. 之后把数值给遮挡层做为left 和top值。
5. 此时用到鼠标移动事件，但是还是在小图片盒子内移动。
6. 发现，遮挡层位置不对，需要再减去盒子自身高度和宽度的一半。
7. 遮挡层不能超出小图片盒子范围。
8. 如果小于零，就把坐标设置为0
9. 如果大于遮挡层最大的移动距离，就把坐标设置为最大的移动距离
10. 遮挡层的最大移动距离：小图片盒子宽度     减去 遮挡层盒子宽度

```js
window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当我们鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        // (1). 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (4) 如果x 坐标小于了0 就让他停在0 的位置
        // 遮挡层的最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    })
})
```

#### offset和style的区别

**offset**

- offset 可以得到**任意样式表**中的样式值
- offset 系列获得的数值是没有单位的
- offsetWidth 包含padding+border+width
- offsetWidth 等属性是**只读属性**，只能获取不能赋值

所以，我们想要获取元素大小位置，用**offset**更合适

 

**style**

- style 只能得到**行内样式表**中的样式值
- style.width 获得的是**带有单位**的字符串
- style.width 获得**不包含padding和border** **的值**
- style.width 是**可读写属性**，可以获取也可以赋值

所以，我们想要给元素更改值，则需要用**style**改变

### 元素可视区client

client 翻译过来就是客户端，我们使用 client 系列的相关属性来获取元素可视区的相关信息

通过 client 系列的相关属性可以动态的得到该元素的边框大小、元素大小等

 

| **client系列属性**  | **作用**                                                     |
| ------------------- | ------------------------------------------------------------ |
| element.clientTop   | 返回元素上边框的大小                                         |
| element.clientLeft  | 返回元素左边框的大小                                         |
| element.clientWidth | 返回自身包括padding、内容区的宽度，不含边框，返回数值不带单位 |
| element.clineHeight | 返回自身包括padding、内容区的宽度，不含边框，返回数值不带单位 |

![image-20220407173405786](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071734880.png)

**仿淘宝固定右侧侧边栏**

- 原先侧边栏是绝对定位
- 当页面滚动到一定位置，侧边栏改为固定定位
- 页面继续滚动，会让 返回顶部显示出来

1. 需要用到页面滚动事件 scroll 因为是页面滚动，所以事件源是document
2. 滚动到某个位置，就是判断页面被卷去的上部值。
3. 页面被卷去的头部：可以通过window.pageYOffset 获得 如果是被卷去的左侧window.pageXOffset
4. 注意，元素被卷去的头部是element.scrollTop ,     如果是页面被卷去的头部     则是     window.pageYOffset
5. 其实这个值 可以通过盒子的 offsetTop可以得到，如果大于等于这个值，就可以让盒子固定定位了

```js
//1. 获取元素
        var sliderbar = document.querySelector('.slider-bar');
        var banner = document.querySelector('.banner');
        // banner.offestTop 就是被卷去头部的大小 一定要写到滚动的外面
        var bannerTop = banner.offsetTop
            // 当我们侧边栏固定定位之后应该变化的数值
        var sliderbarTop = sliderbar.offsetTop - bannerTop;
        // 获取main 主体元素
        var main = document.querySelector('.main');
        var goBack = document.querySelector('.goBack');
        var mainTop = main.offsetTop;
        // 2. 页面滚动事件 scroll
        document.addEventListener('scroll', function() {
            // console.log(11);
            // window.pageYOffset 页面被卷去的头部
            // console.log(window.pageYOffset);
            // 3 .当我们页面被卷去的头部大于等于了 172 此时 侧边栏就要改为固定定位
            if (window.pageYOffset >= bannerTop) {
                sliderbar.style.position = 'fixed';
                sliderbar.style.top = sliderbarTop + 'px';
            } else {
                sliderbar.style.position = 'absolute';
                sliderbar.style.top = '300px';
            }
            // 4. 当我们页面滚动到main盒子，就显示 goback模块
            if (window.pageYOffset >= mainTop) {
                goBack.style.display = 'block';
            } else {
                goBack.style.display = 'none';
            }
        })
```

#### 淘宝 flexible.js 源码分析

**立即执行函数**

立即执行函数 **`(function(){})()` 或者 `(function(){}())`**

主要作用： 创建一个独立的作用域。 避免了命名冲突问题

**html文字大小**

![image-20220407173555374](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071735489.png)

**设置html元素的文字大小（rem大小）**

![image-20220407173621021](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071736127.png)

**页面尺寸改变时，重新设置rem大小**

![image-20220407173648326](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071736434.png)

下面三种情况都会刷新页面都会触发 load 事件

- a标签的超链接
- F5或者刷新按钮（强制刷新）
- 前进后退按钮

 

但是 火狐中，有个特点，有个“**往返缓存**”，这个缓存中不仅保存着页面数据，还保存了DOM和JavaScript的状态；实际上是将整个页面都保存在了内存里。

所以此时**后退按钮不能刷新页面**。

此时可以使用 pageshow事件来触发。

这个事件在页面显示时触发，无论页面是否来自缓存。

在重新加载页面中，pageshow会在load事件触发后触发；

根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件

**注意这个事件给window添加**

**移动端浏览器不支持0.5px写法，适配**

![image-20220407173729922](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071737041.png)

### 元素滚动scroll

scroll 翻译过来就是滚动的，我们使用 scroll 系列的相关属性可以动态的得到该元素的大小、滚动距离

| **scroll属性**       | **作用**                                       |
| -------------------- | ---------------------------------------------- |
| element.scrollTop    | 返回被卷去的上侧距离，返回数值不带单位         |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位         |
| element.scrollWidth  | 返回自身实际的宽度，不含边框，返回数值不带单位 |
| element.scrollHeight | 返回自身实际的高度，不含边框，返回数值不带单位 |

页面被卷去的头部：可以通过**window.pageYOffset** 获得 如果是被卷去的左侧**window.pageXOffset**

![image-20220407173800830](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071738925.png)

**页面被卷去的头部**

如果浏览器的高（或宽）度不足以显示整个页面时，会自动出现滚动条。当滚动条向下滚动时，页面上面被隐藏掉的高度，我们就称为页面被卷去的头部。滚动条在滚动时会触发 onscroll事件

 

**页面被卷去的头部兼容性解决方案**

需要注意的是，页面被卷去的头部，有兼容性问题，因此被卷去的头部通常有如下几种写法：

1. 声明了 DTD，使用 document.documentElement.scrollTop
2. 未声明 DTD，使用 document.body.scrollTop
3. 新方法 window.pageYOffset和 window.pageXOffset，IE9 开始支持

```js
function getScroll() {
    return {
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
 } 
使用的时候  getScroll().left
```



### **三大系列总结**

![image-20220407173853850](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071738953.png)

他们主要用法：

1.offset系列 经常用于获得元素位置  offsetLeft offsetTop

2.client经常用于获取元素大小 clientWidth clientHeight

3.scroll 经常用于获取滚动距离 scrollTop scrollLeft 

4.注意页面滚动的距离通过 window.pageXOffset  获得

### mouseenter 和mouseover的区别

- 当鼠标移动到元素上时就会触发mouseenter 事件
- 类似 mouseover，它们两者之间的差别是
- **mouseover** **鼠标经过自身盒子会触发，经过子盒子还会触发**
- mouseenter  只会经过自身盒子触发
- 之所以这样，就是因为**mouseenter不会冒泡**
- 跟mouseenter搭配鼠标离开 **mouseleave** **同样不会冒泡**

### 动画函数封装

**动画实现原理**

**核心原理**：**通过定时器** **setInterval()** **不断移动盒子位置**

实现步骤：

1. 获得盒子当前位置
2. 让盒子在当前位置加上1个移动距离
3. 利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加**定位**，才能使用element.style.left

#### 动画函数给不同元素记录不同定时器

如果多个元素都使用这个动画函数，每次都要var 声明定时器；我们可以给不同的元素使用不同的定时器（自己专门用自己的定时器）

 

核心原理：利用 JS 是一门动态语言，可以很方便的给当前对象添加属性

注意函数需要传递2个参数：**动画对象** 和 **移动到的距离**

```js
function animate(obj, target) {
            // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
            // 解决方案就是 让我们元素只有一个定时器执行
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                if (obj.offsetLeft >= target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';
            }, 30);
        }
```

#### 缓动动画原理

缓动动画就是让元素运动速度有所变化，最常见的是让速度慢慢停下来

思路：

1. 让盒子每次移动的距离慢慢变小，速度就会慢慢落下来。
2. 核心算法： (目标值 - 现在的位置)  / 10  做为每次移动的距离步长
3. 停止的条件是：     让当前盒子位置等于目标位置就停止定时器 
4. 注意步长值需要取整

#### 动画函数多个目标值之间移动

可以让动画函数从 800 移动到 500

当我们点击按钮时候，判断步长是正值还是负值

1.如果是正值，则步长往大了取整

2.如果是负值，则步长 向小了取整

#### 动画函数添加回调函数

**回调函数原理**：函数可以作为一个参数。将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数，这个过程就叫做回调

 

回调函数写的位置：**定时器结束的位置**

```js
function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}
```

### pc端常见特效

#### 网页轮播图

轮播图也称为焦点图，是网页中比较常见的网页特效

 

功能需求：

1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮

2.点击右侧按钮一次，图片往左播放一张，以此类推，左侧按钮同理

3.图片播放的同时，下面小圆圈模块跟随一起变化

4.点击小圆圈，可以播放相应图片

5.鼠标不经过轮播图，轮播图也会自动播放图片

6.鼠标经过，轮播图模块， 自动播放停止

```js
window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // num = circle = index;
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });
    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})
```

#### 节流阀

防止轮播图按钮连续点击造成播放过快

 

**节流阀目的**：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发

 

**核心实现思路**：利用回调函数，添加一个变量来控制，锁住函数和解锁函数

 

 开始设置一个变量var flag= true;

If(flag){flag = false; do something}    关闭水龙头

利用回调函数动画执行完毕， flag = true   打开水龙头

#### 返回顶部

1. 带有动画的返回顶部
2. 此时可以继续使用我们封装的动画函数
3. 只需要把所有的left 相关的值改为 跟     页面垂直滚动距离相关就可以了
4. 页面滚动了多少，可以通过 window.pageYOffset 得到
5. 最后是页面滚动，使用 window.scroll(x,y)

```js
//1. 获取元素
        var sliderbar = document.querySelector('.slider-bar');
        var banner = document.querySelector('.banner');
        // banner.offestTop 就是被卷去头部的大小 一定要写到滚动的外面
        var bannerTop = banner.offsetTop
            // 当我们侧边栏固定定位之后应该变化的数值
        var sliderbarTop = sliderbar.offsetTop - bannerTop;
        // 获取main 主体元素
        var main = document.querySelector('.main');
        var goBack = document.querySelector('.goBack');
        var mainTop = main.offsetTop;
        // 2. 页面滚动事件 scroll
        document.addEventListener('scroll', function() {
                // console.log(11);
                // window.pageYOffset 页面被卷去的头部
                // console.log(window.pageYOffset);
                // 3 .当我们页面被卷去的头部大于等于了 172 此时 侧边栏就要改为固定定位
                if (window.pageYOffset >= bannerTop) {
                    sliderbar.style.position = 'fixed';
                    sliderbar.style.top = sliderbarTop + 'px';
                } else {
                    sliderbar.style.position = 'absolute';
                    sliderbar.style.top = '300px';
                }
                // 4. 当我们页面滚动到main盒子，就显示 goback模块
                if (window.pageYOffset >= mainTop) {
                    goBack.style.display = 'block';
                } else {
                    goBack.style.display = 'none';
                }
            })
            // 3. 当我们点击了返回顶部模块，就让窗口滚动的页面的最上方
        goBack.addEventListener('click', function() {
            // 里面的x和y 不跟单位的 直接写数字即可
            // window.scroll(0, 0);
            // 因为是窗口滚动 所以对象是window
            animate(window, 0);
        });
```

#### 筋斗云

1. 利用动画函数做动画效果
2. 原先筋斗云的起始位置是0
3. 鼠标经过某个小li，把当前小li的offsetLeft 位置做为目标值即可
4. 鼠标离开某个小li，就把目标值设为 0
5. 如果点击了某个小li， 就把li当前的位置存储起来，做为筋斗云的起始位置

```js
window.addEventListener('load', function() {
            // 1. 获取元素
            var cloud = document.querySelector('.cloud');
            var c_nav = document.querySelector('.c-nav');
            var lis = c_nav.querySelectorAll('li');
            // 2. 给所有的小li绑定事件 
            // 这个current 做为筋斗云的起始位置
            var current = 0;
            for (var i = 0; i < lis.length; i++) {
                // (1) 鼠标经过把当前小li 的位置做为目标值
                lis[i].addEventListener('mouseenter', function() {
                    animate(cloud, this.offsetLeft);
                });
                // (2) 鼠标离开就回到起始的位置 
                lis[i].addEventListener('mouseleave', function() {
                    animate(cloud, current);
                });
                // (3) 当我们鼠标点击，就把当前位置做为目标值
                lis[i].addEventListener('click', function() {
                    current = this.offsetLeft;
                });
            }
        })
```

### 触屏事件

移动端浏览器兼容性较好，我们不需要考虑以前 JS 的兼容性问题，可以放心的使用原生 JS 书写效果，但是移动端也有自己独特的地方

比如触屏事件 touch（也称触摸事件），Android和 IOS 都有

 

touch 对象代表一个触摸点

触摸点可能是一根手指，也可能是一根触摸笔

触屏事件可响应用户手指（或触控笔）对屏幕或者触控板操作

 

常见的触屏事件如下：

| **触屏touch事件** | **说明**                      |
| ----------------- | ----------------------------- |
| touchstart        | 手指触摸到一个DOM元素时触发   |
| touchmove         | 手指在一个DOM元素上滑动时触发 |
| touchend          | 手指从一个DOM元素上移开时触发 |

#### 触摸事件对象（TouchEvent）

TouchEvent 是一类描述手指在触摸平面（触摸屏、触摸板等）的状态变化的事件。这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少，等等

touchstart、touchmove、touchend 三个事件都会各自有事件对象

 

触摸事件对象重点我们看三个常见对象列表：

| **触屏列表**     | **说明**                                         |
| ---------------- | ------------------------------------------------ |
| touchs           | 正在触摸屏幕的所有手指的一个列表                 |
| **targetTouchs** | **正在触摸当前DOM元素上的手指的一个列表**        |
| changedTouches   | 手指状态发生了改变的列表，从无到有，从有到无变化 |

#### 移动端拖动元素

1. touchstart、touchmove、touchend可以实现拖动元素
2. 但是拖动元素需要当前手指的坐标值     我们可以使用 targetTouches[0] 里面的pageX 和 pageY 
3. 移动端拖动的原理：  手指移动中，计算出手指移动的距离。然后用盒子原来的位置 + 手指移动的距离
4. 手指移动的距离： 手指滑动中的位置 减去 手指刚开始触摸的位置
             拖动元素三步曲：
             （1） 触摸元素 touchstart： 获取手指初始坐标，同时获得盒子原来的位置
             （2） 移动手指 touchmove： 计算手指的滑动距离，并且移动盒子
             （3） 离开手指 touchend:

注意： `手指移动也会触发滚动屏幕所以这里要阻止默认的屏幕滚动 e.preventDefault();`

### 移动端常见特效

#### classList属性

classList属性是HTML5新增的一个属性，返回元素的类名。但是ie10以上版本支持

该属性用于在元素中添加，移除及切换 CSS 类

 

有以下方法：

```js
//添加类：
element.classList.add('类名');
focus.classList.add('current');
//移除类：
element.classList.remove('类名');
focus.classList.remove('current');
//切换类：
element.classList.toggle('类名');
focus.classList.toggle('current');

注意:以上方法里面，所有类名都不带点
```

#### 移动端轮播图

移动端轮播图功能和基本PC端一致

- 可以自动播放图片
- 手指可以拖动播放轮播图

 

1. 自动播放功能
2. 开启定时器
3. 移动端移动，可以使用translate 移动
4. 想要图片优雅的移动，请添加过渡效果

![image-20220407174447947](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071744049.png)

1. 自动播放功能-无缝滚动
2. 注意，我们判断条件是要等到图片滚动完毕再去判断，就是过渡完成后判断
3. 此时需要添加检测过渡完成事件 **transitionend** 
4. 判断条件：如果索引号等于 3 说明走到最后一张图片，此时     索引号要复原为 0
5. 此时图片，去掉过渡效果，然后移动
6. 如果索引号小于0， 说明是倒着走， 索引号等于2 
7. 此时图片，去掉过渡效果，然后移动

![image-20220407174516380](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071745481.png)

1. 小圆点跟随变化效果
2. 把ol里面li带有current类名的选出来去掉类名 remove
3. 让当前索引号的小li 加上 current  add
4. 但是，是等着过渡结束之后变化，所以这个写到 transitionend 事件里面

![image-20220407174539633](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071745720.png)

1. 手指滑动轮播图
2. 本质就是ul跟随手指移动，简单说就是移动端拖动元素
3. 触摸元素touchstart： 获取手指初始坐标
4. 移动手指touchmove： 计算手指的滑动距离，并且移动盒子
5. 离开手指touchend:  根据滑动的距离分不同的情况
6. 如果移动距离小于某个像素 就回弹原来位置
7. 如果移动距离大于某个像素就上一张下一张滑动。
8. 滑动也分为左滑动和右滑动判断的标准是     移动距离正负 如果是负值就是左滑 反之右滑 
9. 如果是左滑就播放下一张 （index++）
10. 如果是右滑就播放上一张 (index--)

![image-20220407174600220](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071746331.png)

![image-20220407174614304](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071746402.png)

1. 滚动某个地方显示
2. 事件：scroll页面滚动事件 
3. 如果被卷去的头部（window.pageYOffset ）大于某个数值
4. 点击，window.scroll(0,0) 返回顶部

![image-20220407174628372](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071746471.png)

#### click延时解决方案

移动端 click 事件会有 300ms 的延时，原因是移动端屏幕双击会缩放(double tap to zoom) 页面

 

**解决方案**

（1）禁用缩放。 浏览器禁用默认的双击缩放行为并且去掉300ms 的点击延迟

```js
<meta name="viewport" content="user-scalable=no">  
```



（2）利用touch事件自己封装这个事件解决300ms 延迟

**原理**

1. 当我们手指触摸屏幕，记录当前触摸时间
2. 当我们手指离开屏幕，     用离开的时间减去触摸的时间
3. 如果时间小于150ms，并且没有滑动过屏幕，     那么我们就定义为点击

```js
//封装tap，解决click 300ms 延时
        function tap(obj, callback) {
            var isMove = false;
            var startTime = 0; // 记录触摸时候的时间变量
            obj.addEventListener('touchstart', function(e) {
                startTime = Date.now(); // 记录触摸时间
            });
            obj.addEventListener('touchmove', function(e) {
                isMove = true; // 看看是否有滑动，有滑动算拖拽，不算点击
            });
            obj.addEventListener('touchend', function(e) {
                if (!isMove && (Date.now() - startTime) < 150) { // 如果手指触摸和离开时间小于150ms 算点击
                    callback && callback(); // 执行回调函数
                }
                isMove = false; //  取反 重置
                startTime = 0;
            });
        }
        //调用  
        tap(div, function() { // 执行代码  });
```

（3）使用插件。fastclick 插件解决300ms 延迟

![image-20220407174739376](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071747474.png)

### 移动端常用开发插件

JS 插件是 js 文件，它遵循一定规范编写，方便程序展示效果，拥有特定功能且方便调用。如轮播图和瀑布流插件。

 

特点：它一般是为了解决某个问题而专门存在，其功能单一，并且比较小。

 

我们以前写的animate.js 也算一个最简单的插件

**fastclick** 插件解决 300ms 延迟。 

使用延时GitHub官网地址： https://github.com/ftlabs/fastclick

 

**插件的使用**

![image-20220407174806293](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204071748392.png)

**Swiper 插件的使用**

中文官网地址： https://www.swiper.com.cn/ 

1. 引入插件相关文件
2. 按照规定语法使用[https://www.swiper.com.cn/usage/index.html]

 

**其他移动端常见插件**

lsuperslide： http://www.superslide2.com/

iscroll： https://github.com/cubiq/iscroll

 

**插件的使用总结**

1.确认插件实现的功能

2.去官网查看使用说明

3.下载插件

4.打开demo实例文件，查看需要引入的相关文件，并且引入

5.复制demo实例文件中的结构html，样式css以及js代码

 

**移动端视频插件** **zy.media.js** **[**https://github.com/ireaderlab/zyMedia]**

H5 给我们提供了 video 标签，但是浏览器的支持情况不同。

不同的视频格式文件，我们可以通过source解决。

 

但是外观样式，还有暂停，播放，全屏等功能我们只能自己写代码解决。

这个时候我们可以使用插件方式来制作。

我们可以通过 JS 修改元素的大小、颜色、位置等样式。

### 移动端常用开发框架

框架，顾名思义就是一套架构，它会基于自身的特点向用户提供**一套**较为完整的解决方案。

框架的控制权在框架本身，使用者要按照框架所规定的某种规范进行开发。

 

插件一般是为了解决某个问题而专门存在，其功能单一，并且比较小。

 

前端常用的框架有 Bootstrap、Vue、Angular、React 等；既能开发PC端，也能开发移动端

 

前端常用的移动端插件有 **swiper**、**superslide**、**iscroll**等

 

框架： 大而全，一整套解决方案

插件： 小而专一，某个功能的解决方案

#### bootstrap

https://v3.bootcss.com/

 

Bootstrap 是一个简洁、直观、强悍的前端开发框架，它让 web 开发更迅速、简单。

它能开发PC端，也能开发移动端 

 

Bootstrap JS插件使用步骤：

（1）引入相关js 文件

（2）复制HTML 结构

（3）修改对应样式

（4）修改相应JS 参数
