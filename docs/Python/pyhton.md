## 环境搭建

https://www.python.org/

![image-20220428180256069](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281802133.png)

## 设计第一个小游戏

![image-20220428180329112](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281803225.png)

```python
""" 用python设计第一个游戏 """

temp = input("不妨猜一下小甲鱼现在心里想的是哪个数字：")
guess = int(temp)

if guess == 8:
    print("你是小甲鱼心里的蛔虫嘛？！")
    print("哼，猜中了也没奖励！")
else:
    print("猜错啦，小甲鱼现在心里想的是8！")

print("游戏结束，不玩啦^_^")
```

![image-20220428180406652](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281804756.png)

**将字符串转换为整数**

使用 [int()](https://fishc.com.cn/thread-144631-1-1.html) 函数将指定的值转换成整数

**比较运算符**

![image-20220428180437006](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281804052.png)

## 变量

![image-20220428180522709](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281805822.png)

### 创建并访问变量

**创建一个变量**

Python 的变量无需声明，只需要一次赋值，该变量就能够被成功创建：

```python
>>> x = 3
```

 

**访问一个变量**

简单，当一个变量被创建之后，使用变量名就可以直接访问该变量了：

```python
>>> print(x)
3
```

### 变量名命名规则

**变量名**

变量名呢，通常是由字母、数字和下划线（_）构成，但千万不能以数字打头，比如 loveyou1314 是合法的变量名，而 520baby 却是非法的。

```python
>>> loveyou1314 = 1314
>>> 520baby = 520
SyntaxError: invalid syntax
```

另外，变量名是区分大小写的，也就是 FishC、fishc 在 Python 看来，是两个完全不同的名字。

 

勇于尝试的同学可能会发现，Python3 还支持中文字符作为变量名，是的：

```python
>>> 幸运数 = 588
>>> print(幸运数)
588
```

## 字符串

![image-20220428180651687](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281806792.png)

### 字符串

**字符串（Single quotes）**

Python 字符串的编写方式多种多样，主要有：Single quotes、Double quotes 还有 Triple quoted 三种形式。



其中，Single quotes 是使用一对单引号将文本包含起来：

```python
>>> print('I love China')
I love China
```

**字符串（Double quotes）**

 

那么 Double quotes 就是使用一对双引号将文本包含起来：

```python
>>> print("I love FishC")
I love FishC
```

混合使用 Single quotes 和 Double quotes 的技巧：

```python
>>> print("Let's go!")
Let's go!
>>> print('"Life is short, you need Python."')
"Life is short, you need Python."
```

**原始字符串**

 

使用原始字符串，可以避免反斜杠（\）被当作转义字符解析：

```python
>>> 未使用原始字符串
>>> print("D:\three\two\one\now")
D:    hree    wo\one
ow
>>> # 使用原始字符串
>>> print(r"D:\three\two\one\now")
D:\three\two\one\now
```

 

**字符串（Triple quotes）**

 

通常，使用三引号字符串来引用多行文本：

```python
>>> poetry = """
面朝大海，春暖花开
 
从明天起，做一个幸福的人
喂马、劈柴，周游世界
从明天起，关心粮食和蔬菜
我有一所房子，面朝大海，春暖花开
 
从明天起，和每一个亲人通信
告诉他们我的幸福
那幸福的闪电告诉我的
我将告诉每一个人
 
给每一条河每一座山取一个温暖的名字
陌生人，我也为你祝福
愿你有一个灿烂的前程
愿你有情人终成眷属
愿你在尘世获得幸福
我只愿面朝大海，春暖花开
"""
```

### 字符串的加法乘法

**字符串加法和乘法**

 

字符串相加我们叫做拼接，就是将字符串组合成一个长的新的字符串：

```python
>>> '520' + '1314'
'5201314'
```

 

还可以使用乘法符号（*）进行复制。

```python
print("I Love hzz\n" * 520)
```

## 条件分支

### if-else结构

```python
if-else结构
if 条件：
条件为真（true）执行的操作
else：
条件为假（false）执行的操作
 
简写形式：
if 条件：
条件为真（true）执行的操作
elif 条件：
条件为真（true）执行的操作
else：
条件为假（false）执行的操作
 
悬挂else问题
缩进问题
```

### while循环

```python
while循环结构
while 条件：
        条件为真（true）执行的操作（循环体）

打印1+2+3+4+…+100的计算结果
i=1
sum=0

while i<=100:
    sum+=i
    i+=1
print(sum)
```

### for循环

for循环语句的语法如下：

```python
for 变量 in 可迭代对象：
       循环体
```

可迭代对象：指那些元素可以被单独提取出来的对象

![image-20220428181434924](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281814958.png)

**range**()

一个BIF函数，可为指定的整数生成一个数字序列

语法如下：

```python
range(stop)
range(start,stop)
range(start,stop,step)
```

参数只能是整数

 

**只有一个参数**

![image-20220428181520429](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281815461.png)

**list**是将可迭代对象以列表的形式展示出来



**指定起始数值和结束数值**

![image-20220428181539276](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281815311.png)

**增加步长**

![image-20220428181554457](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281815488.png)

```python
打印1+2+3+4+…+100的计算结果
sum=0
for i in range(101):
    sum+=i
print(sum)
```

### 断言（assert）

当这个关键字后的条件为假时，程序自动崩溃并抛出AssertionError异常

![image-20220428181646678](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281816709.png)

### break语句

中止当前循环，跳出循环体

![image-20220428182103114](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281821149.png)

### continue语句

跳出本轮循环并开始下一轮循环（开始前测试循环条件）

![image-20220428182124664](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281821700.png)

### else语句

```python
while和for循环语句后也可加上一个else语句，语法如下：
while 条件：
      循环体
else：
      条件不成立时执行的内容

for 变量 in 可迭代对象
      循环体
else：
      条件不成立时执行的内容
```

![image-20220428182155616](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204281821652.png)

## 随机数

```python
random模块
返回随机的整数
>>> import random
>>> random.randint(1,100)
52
>>> random.randint(1,34)
1
>>> random.randint(3,45)
43
```

## 数据类型

整型

长度只限于计算机的虚拟内存总数

```python
>>> 7462874/3434
2173.2306348281886
```

 

浮点型

科学计数法表示大数

```python
>>> a=0.000000000003
>>> a
3e-12
```

 

布尔类型

true/false两种类型，true相当于1，flase相当于0

```python
>>> True + True

2

>>> True * False

0

>>> True/False

Traceback (most recent call last):

 File "<pyshell#15>", line 1, in <module>

  True/False

ZeroDivisionError: division by zero
```



 

类型转换

int()将一个字符串或浮点数转换为一个整数

```python
>>> a='520'
>>> b=int(a)
>>> a,b
('520', 520)
>>> c=5.99
>>> d=int(c)
>>> c,d
(5.99, 5)
```

 

float()将一个字符串或整数转换成一个浮点数

```python
>>> a='520'

>>> b=float(a)

>>> b

520.0

>>> c=520

>>> d=float(c)

>>> d

520.0

>>> c,d

(520, 520.0)
```



 

str()将一个数或任何其他类型转换成一个字符串

```python
>>> a=5.99

>>> b=str(a)

>>> b

'5.99'

>>> c=str(5e15)

>>> c

'5000000000000000.0'
```



 

获取类型信息

type（）函数

```python
>>> type('520')

<class 'str'>

>>> type(5.20)

<class 'float'>

>>> type(520)

<class 'int'>

>>> type(True)

<class 'bool'>
```



 

**isinstance**（）函数

| 两个参数 |                  |
| -------- | ---------------- |
| 第一个   | 待确定类型的数据 |
| 第二个   | 指定一个数据类型 |

```python
>>> a='胡梓卓'

>>> isinstance(a,str)

True

>>> isinstance(520,float)

False

>>> isinstance(520,int)

True
```

## 常用操作符

### 算数操作符

```python
+

-

*

** 幂运算操作符，双星号左侧为底数，右侧为指数
>>> 3**4
81

/
>>> 3/2
1.5

// 计算结果取比商小的最大整数值（取整）
>>> 3//2
1

%取余
>>> 5%2
1
>>> 4%2
0
```

### 优先级

先乘除后加减

 

幂运算操作符比其左侧的一元操作符优先级高，比其右侧的一元操作符优先级低

```python
>>> 5**-2

0.04

>>> 5**2

25
```



 

| python操作符 | 优先级          |
| ------------ | --------------- |
| 幂运算       | **              |
| 正负号       | + -             |
| 算数运算符   | / // + - *      |
| 比较运算符   | < <= > >= == != |
| 逻辑运算符   | not and or      |

### 比较操作符

```python
根据表达式的值得真假返回布尔类型值

<

<=

>

>=

==

!=

>>> 3<4
True
>>> 's'>'b'
True
```

### 逻辑操作符

```python
and 两边同时为假，结果才为假

or 左边或右边任意一边为真，结构都为真

not 一元操作符，得到一个和操作数相反的布尔类型值
>>> not True
False
>>> not 4
False

>>> 5>3<4
True
>>> 5>3 and 3<4
True
```

### 三元操作符

```python
if x<y:
    small=x
else:
    small=y

三元操作符语法：
small=x if 条件 else y
```

## 列表、元组和字符串

### 列表

使用中括号将数据包裹起来（数据之间使用逗号分隔）

![image-20220507100137194](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071001121.png)

上面创建的是匿名的列表，无法使用

可使用变量名

![image-20220507100218704](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071002882.png)

列表**支持各种不同的数据存放**

![image-20220507100315345](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071003720.png)

可创建空列表

![image-20220507100342996](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071003354.png)

**向列表添加元素**

（1）使用**append()**方法：向列表末尾添加元素

![image-20220507100430473](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071004072.png)

append()属于列表对象的一个方法

 

append()方法**只支持一个参数**

（2）添加多个数据，可使用**extend()**方法向列表末尾添加多个元素：

![image-20220507100522243](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071005282.png)

extend()使用一个列表来扩充另一个列表，参数是另一个列表

（3）向列表任意位置插入元素，可使用**insert()**方法

两个参数：

【1】指定待插入的位置（索引值）；支持负数：表示与列表末尾的相对距离

【2】待插入的元素值

![image-20220507100608218](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071006711.png)

**从列表获取元素**

通过索引值可直接获取列表中的某一个元素

![image-20220507100637873](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071006535.png)

访问列表最后一个元素，使用**len()函数**获取该列表长度，减1，即为最后一个元素的索引值

![image-20220507100706122](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071007238.png)

当索引值为负数时，表示从列表的末尾反向索引

![image-20220507100727039](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071007750.png)

若要交换位置

![image-20220507100753717](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071007117.png)

若开发抽奖功能

random的choice()方法可从一个非空的序列中随机获取一个元素

![image-20220507100829423](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071008922.png)

列表可以包含另一个列表，若要获取内部子列表的某一个元素，可使用两次索引

![image-20220507100848648](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071008751.png)

**从列表删除元素**

**remove()**方法：指定一个待删除的元素

![image-20220507100943620](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071009878.png)

**pop()**方法:取出并删除元素，参数为索引值

![image-20220507101008989](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071010237.png)

**del**语句：可删除元素和整个变量

![image-20220507101029642](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071010102.png)

**列表切片**

使用一个冒号隔开两个索引值，左边是开始位置，右边是结束位置

结束位置上的元素不包含

![image-20220507101059135](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071011042.png)

若想获取列表最后几个元素

![image-20220507101140943](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071011303.png)

列表切片不会修改自身的组成结构和数据，只是为列表创建一个新的拷贝并返回



**进阶**

列表切片可接受第三个参数，代表步长，默认值为**1**

![image-20220507101233365](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071012934.png)

直接作用于原始列表的操作

（1）del语句作用于列表切片

（2）切片后为列表赋值

**常用操作符**

当列表包含多个元素，默认从第一个元素开始比较

![image-20220507101323165](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071013709.png)

连接操作符（+）：并不能实现列表添加新元素的操作

![image-20220507101346709](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071013097.png)

重复操作符（*）

![image-20220507101511907](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071015246.png)

成员关系操作符（in,not in）：只能判断一个层次的成员关系

![image-20220507101536099](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071015999.png)

去除列表中重复的数据

![image-20220507101614110](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071016820.png)

**count()**方法：统计某个元素在列表中出现的次数

![image-20220507101709812](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071017988.png)

**index()**方法：返回某个元素在列表中第一次出现的索引值

![image-20220507101636610](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071016264.png)

**reverse()**方法：将整个列表翻转

![image-20220507101734795](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071017137.png)

**sort()**方法：对列表进行排序

![image-20220507101752766](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071017759.png)



默认从小到大

 

语法：sort(func,key,reverse)

三个参数：

【1】设置排序的算法，默认使用归并排序

【2】关键字

【3】sort(reverse=False)默认

![image-20220507101815412](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071018453.png)

### 元组

元组和列表的最大区别：**元组只可读，不可写**

**创建和访问一个元组**

创建元组大部分时候使用小括号

![image-20220507101915557](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071019870.png)

访问元组也是通过索引值访问一个或多个元素

![image-20220507101932819](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071019220.png)

复制一个元组，可通过切片实现

![image-20220507101953126](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071019318.png)

元组的标识符

若要元组中**只包含一个元素**，可在该元素后添加一个逗号（，）实现

小括号可省略

![image-20220507102014566](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071020685.png)

**更新和删除元组**

利用切片和拼接实现更新元组的目的

**id()**函数用于返回指定对象的唯一ID值

![image-20220507102043280](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071020942.png)

使用del语句删除整个元组

![image-20220507102108607](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071021678.png)

很少使用del去删除整个元组，Pyhton的垃圾回收机制会对某个对象不再被使用的时候自动进行清理

### 字符串

切片也可应用于字符串

![image-20220507102141643](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071021935.png)

字符串一旦确定就不能修改，只能使用切片

![image-20220507102202731](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071022400.png)

旧的字符串还在，变量名指向拼接后的字符串；旧的字符串失去变量的引用，Python的垃圾回收机制将其释放

#### 各种内置方法

| **方法**       | **含义**                     |
| -------------- | ---------------------------- |
| **casefold()** | 将字符串的所有字符修改为小写 |

![image-20220507102242472](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071022734.png)

修改字符串并不是修改原字符串，而是返回字符串修改后的一个拷贝

| **方法**                      | **含义**                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| **count(sub,[,start[,end]])** | 返回sub参数在字符串里面出现的次数     start和end参数可选，指定统计范围 |

![image-20220507102316660](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071023825.png)

| **方法**                                                     | **含义**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **find(sub[,start[,end]]) **    **index(sub[,start[,end]])** | 检查sub参数是否包含在字符串中，如果有则返回第一个出现位置的索引值，否则返回-1；index方法找不到将抛出ValueError异常  start和end参数可选，指定统计范围 |

![image-20220507102408725](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071024997.png)

| **方法**                     | **含义**                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| **replace(old,new[,count])** | 将字符串中的old参数指定的字符串替换成new参数指定的字符串     count参数可选，表示最多替换次数不超过count |

![image-20220507102432791](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071024077.png)

| **方法**                        | **含义**                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| **split(sep=None,maxsplit=-1)** | 以空白字符作为分隔符对字符串进行分割     sep参数指定分隔符，默认是空白字符     maxsplit参数设置最大分割次数，默认是不限制 |

![image-20220507102501851](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071025165.png)

| **方法**           | **含义**                                                     |
| ------------------ | ------------------------------------------------------------ |
| **join(iterable)** | 以字符串作为分隔符，插入到iterable参数迭代出来的所有字符串之间     如果iterable中包含任何非字符串值，将抛出TypeError异常 |

![image-20220507102528231](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071025861.png)

#### 格式化 format

format()方法接收位置参数和关键字参数，均传递到一个名为replacement的字段，在字符串内用大括号{}表示

![image-20220507102605108](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071026225.png)

若将位置参数和关键字参数综合使用，位置参数必须在关键字参数之前，否则会报错

![image-20220507102625327](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071026804.png)

要打印大括号

![image-20220507102646042](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071026991.png)

#### 格式化操作符：%

| Python         | 格式化符号及其含义                   |
| -------------- | ------------------------------------ |
| **符号**       | **含义**                             |
| **%c**         | 格式化字符及其ASCII码                |
| **%s**         | 格式化字符串                         |
| **%d**         | 格式化整数                           |
| **%o**         | 格式化无符号八进制数                 |
| **%x**  **%X** | 格式化无符号十六进制数               |
| **%f**         | 格式化浮点数字，可指定小数点后的精度 |
| **%e**  **%E** | 用科学计数法格式化浮点数             |
| **%g**  **%G** | 根据值得大小决定使用%f或%e           |

![image-20220507102723107](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071027476.png)

使用格式化方法拼接字符串

![image-20220507102741396](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071027429.png)

拼接字符串的三种方法

（1）简单字符串拼接，使用+

（2）复杂，有格式化需求，使用%

（3）大量字符串拼接，尤其发生在循环体内部，使用join()

| Python   | 格式化操作符的辅助命令                                 |
| -------- | ------------------------------------------------------ |
| **符号** | **含义**                                               |
| **m.n**  | m显示最小总宽度，n是小数点后的位数                     |
| **-**    | 结果左对齐                                             |
| **+**    | 在正数前面显示加号（+）                                |
| **#**    | 在八进制数前面显示'0o'，在十六进制数前面显示'0x'或'0X' |
| **0**    | 显示的数字前面填充'0'代替空格                          |

![image-20220507102809336](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071028572.png)

#### Python的转义字符以及含义

| 符号 | 说明                 |
| ---- | -------------------- |
| \'   | 单引号               |
| \"   | 双引号               |
| \a   | 发出系统响铃声       |
| \b   | 退格符               |
| \n   | 换行符               |
| \t   | 横向制表符（TAB）    |
| \v   | 纵向制表符           |
| \r   | 回车符               |
| \f   | 换页符               |
| \o   | 八进制数代表的字符   |
| \x   | 十六进制数代表的字符 |
| \0   | 表示一个空字符       |
| \\   | 反斜杠               |

### 序列

`list([iterable])`用于把一个迭代对象转换为列表

![image-20220507102910439](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071029213.png)

**tuple([iterable])**用于把一个迭代对象转换为元组

`str(obj)`把obj对象转换为字符串

`len(sub)`返回sun参数的长度

![image-20220507103037566](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071030173.png)

**max()-保证序列或参数的数据类型统一**

用于返回序列或参数集合中的最大值

![image-20220507103111881](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071031036.png)

 

**min()-保证序列或参数的数据类型统一**

用于返回序列或参数集合中的最小值

![image-20220507103141934](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071031006.png)

**sum(iterable[,start])**

用于返回序列iterable的所有元素值的总和，可选参数start默认值为0

![image-20220507103208333](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071032685.png)

**sorted(iterable,key=None,reverse=False)**

用于返回一个排序的新列表；内建方法sort()是实现列表原地排序

![image-20220507103241246](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071032398.png)

**reversed(sequence)**

用于返回迭代序列的值；列表的内建方法是原地翻转，reversed（）是返回一个翻转的迭代器对象

![image-20220507103306329](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071033551.png)

**enumerate(iterable)**

生成由二元组（元素数量为2的元组）构成的一个迭代对象，每个二元组由可迭代参数的索引号及其对应的元素组成

![image-20220507103336094](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071033346.png)

`zip(iter1[,iter2][…])`用于返回由各个可迭代参数**共同组成的元组**

![image-20220507103413195](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071034488.png)

## 函数

**创建和调用函数**

使用**def**关键字

```python
def myfirstfunction():
    print("helloworld")
```

**调用函数**

```python
myfirstfunction()
```

**函数的参数**

![image-20220507103541442](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071035534.png)

**函数的返回值**

使用return返回，若无返回值默认返回none；若返回多个值默认以元组的形式进行打包；也可利用列表返回

![image-20220507103609509](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071036796.png)

### 形参和实参

形式参数-parameter
实际参数-argument

### 函数文档

![image-20220507103643840](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071036101.png)

文档字符串可通过特殊属性`__doc__`获取

![image-20220507103707378](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071037556.png)

**获取函数文档**

`help()`

![image-20220507103732734](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071037820.png)

### 关键字参数

固定的参数称为关键字参数

 

传入实参时，明确指定形参的关键字参数

![image-20220507103759753](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071038972.png)

### 默认参数

定义函数时，位置参数必须在默认参数前面

![image-20220507103827368](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071038623.png)

### 收集参数（可变参数）

在参数前面加上星号（*）

![image-20220507103900326](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071039605.png)

把标志为收集参数的参数们打包成一个**元组**

![image-20220507103920415](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071039463.png)

若定义的函数中带有收集参数，可将**其他参数设置为默认参数**

![image-20220507103940526](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071039509.png)

sep参数：指定多个参数之间的分隔符，默认是空格

end参数：指定以什么字符结束打印，默认是换行

file参数：指定输出的位置

flush参数：指定是否强制刷新缓存



星号（*）在形参中的作用是“打包”

在实参中的作用是“解包”

![image-20220507104008233](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071040211.png)

两个星号（**）的收集函数表示将参数们打包成字典的形式

收集参数2种打包形式：

- 元组
- 字典

![image-20220507104054951](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071040956.png)

当参数带两个星号（**）时，传递给函数的任意数量的key=value实参会被打包进一个字典中

![image-20220507104111507](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071041925.png)

## 变量的作用域

### 局部变量

局部变量-->定义在函数内部的变量

作用域：只能在函数内部有效，不能在函数外部被引用

### 全局变量

全局变量-->在函数外部定义

作用域-->整个模块

若在函数内部修改全局变量的值，Python会创建一个新的局部变量来替代，原本的全局变量不会被改变



### global关键字

可**修改全局变量的值**

![image-20220507104222297](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071042340.png)

### 内嵌函数

Python函数定义是支持嵌套的

![image-20220507104252794](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071042101.png)

内部函数整个作用域都在外部函数之内

 

在嵌套函数中，**内部函数可以引用外部函数局部变量**

![image-20220507104312582](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071043910.png)

### LEGB原则

- L-Local --> 函数内的名字空间
- E-Enclosing     function locals --> 嵌套函数中外部函数的名字空间
- G-Global --> 函数定义所在模块的名字空间
- B-Builtin --> 内置模块的名字空间

变量的查找顺序是：L -> E -> G -> B

### 闭包

在一个内部函数里对在外部作用域的变量进行引用，这个内部函数就是一个闭包

 

使用**nonlocal**关键字可声明变量**不是局部变量**

![image-20220507104355015](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071043293.png)

### 装饰器

**装饰器（****decorator****）**功能：将被装饰的函数当作参数传递给与装饰器对应的函数，并返回包装后的被装饰的函数

 

log(eat)将eat函数作为参数传递给log()

 

使用用**语法糖**【Syntactic sugar】（在计算机语言中添加的某种语法，对语言的功能没有影响，方便程序员使用）

```python
def log(func):
        def wrapper():
                print("开始调用eat()函数...")
                func()
                print("结束调用eat()函数...")
        return wrapper

"""def eat():
        print("开始吃了")
eat=log(eat) --代替--
eat()
"""
print("----------------")

@log
def eat():
        print("开始吃了")
eat()
```

![image-20220507104437733](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071044967.png)

多参数问题可使用收集参数解决，调用时使用（*）解包

```python
def log(func):
        def wrapper(*params):
                print("开始调用")
                func(*params)
                print("end")
                return wrapper
```

可使用多层装饰器

```python
@buffer
@performance
@log
def eat(name):
        print("%s吃了"%name)
```

### 函数式编程

**lambda**

允许使用lambda关键字创建匿名函数

```python
def ds(x):
        return 2*x+1
ds(5)
```

```python
lambda x:2*x+1
```

基本语法：

- 使用冒号（：）分隔函数的参数及返回值
- 冒号左边放置函数的参数，若存在多个参数，使用逗号（，）分隔
- 冒号右边是函数的返回值

执行语句后返回一个**函数对象**，要进行调用需要绑定一个变量

```python
g=lambda x:2*x+1
g(5)
```



**filter()**

filter()函数是一个过滤器，可在大量数据里面提取有用的数据

这个内置函数由两个参数：

可以是函数或none；

(1)函数 --> 将第二个可迭代对象里的每一个元素作为函数的参数进行计算，把**返回True的值筛选出来**

(2)None --> 将第二个参数中为True的值筛选出来

```python
temp =filter(None,[1,0,True,False])
list(temp)
```

```python
def odd(x):
        return x%2
temp=filter(odd,range(10))
list(temp)
```

```pyhton
list(filter(lambda x:x%2,range(10)))
```



**map()**

“映射”

这个内置函数有两个参数：

可是函数或可迭代对象

(1)将可迭代对象的每一个元素作为函数的参数进行运算加工，直到全部加工完成

(2)第二个参数是收集参数，支持多个迭代对象；map()会从所有可迭代对象中依次取一个元素组成元组，将其传递给func

 

注意：若可迭代对象的长度不一致，则**按较短的迭代结束**

```python
list(map(lambda x,y:x+y,[1,3,5],[10,30,50,66,88]))
```

![image-20220507104746602](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071047939.png)

### 递归

```python
>>> import sys
>>> sys.set函数名limit(10000) #将递归深度限制设置为一万层
```

写一个求阶乘的函数

```python
#非递归版本
def recursion(n):
    result=n
    for i in range(1,n):
        result*=i
    return result
number=int(input('请输入一个整数：'))
result=recursion(number)
print("%d的阶乘是：%d"%(number,result))
```

```python
#递归版本
def factorial(n):
    if n==1:
        return 1
    else:
        return n*factorial(n-1)
number=int(input('请输入一个整数:'))
result=factorial(number)
print('%d的阶乘是：%d'%(number,result))
```

斐波那契数列

```python
#迭代实现
def fab(n):
    a1=1
    a2=1
    a3=1
    if n<1:
        print("输入错误")
        return -1
    while(n-2)>0:
        a3=a1+a2
        a1=a2
        a2=a3
        n-=1
    return a3
result=fab(20)
if result!=-1:
    print("总共有%d对小兔子出生！"%result)
```

```python
#递归实现
def fab(n):
    if n<1:
        print('输入错误')
        return -1
    if n==1 or n==2:
        return 1
    else:
        return fab(n-1)+fab(n-2)
result=fab(20)
if result!=-1:
    print("总共有%d对小兔子出生！"%result)
```

汉诺塔

```python
#汉诺塔递归
def hanoi(n,x,y,z):
    if n==1:
        print(x,"-->",z)
    else:
        hanoi(n-1,x,z,y)
        print(x,"-->",z)
        hanoi(n-1,y,x,z)
n=int(input("输入层数:"))
hanoi(n,'x','y','z')
```

![image-20220507105229023](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071052519.png)

## 字典和集合

### 创建和访问字典

"键（key）"-->"值（value）"

字典是Python中唯一的**映射类型**，指两个元素集之间元素相互"对应"的关系

**创建和访问字典**

![image-20220507105316211](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071053615.png)

字典使用大括号**{}**定义；字典由"**键**"和"值"共同构成构成，每一对键值组合成为"项"

字典的键必须独一无二，但值不必，**值可以取任何数据类型**，但必须是**不可变**的

声明一个空字典

![image-20220507105346431](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071053598.png)

也可以使用**dict()内置函数**来创建字典

参数可以是一个序列（不能是多个），必须要**打包成一个元组（或列表）**

![image-20220507105412219](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071054562.png)

可通过提供具有映射关系的参数创建字典

![image-20220507105430852](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071054819.png)

**键的位置不能加字符串的引号！**

访问字典里的值，把相应的键放入方括号，若该键不在映射中，则抛出KeyError

![image-20220507105451508](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071054714.png)

还有一种创建方法，直接给字典的键赋值，若键值存在，则改写键对应的值；若不存在，则创建一个新的键并赋值

![image-20220507105512137](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071055563.png)

字典中不允许同一个键出现两次，最后一个值会覆盖前面的值

**键必须不可变**，可以用**数值**、**字符串**、**元组**；不能使用列表



创键字典的5种方法

![image-20220507105534438](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071055698.png)

字典不支持**拼接**和**重复**操作

### 各种内置方法

（1）fromkeys(seq[,value])

用于创建并返回一个新的字典

两个参数：

- 字典的键
- （可选）传入键的对应值；默认none

![image-20220507105612049](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071056499.png)

（2）keys(),values(),items()

Keys()用于返回字典中的键

Values()返回字典中所有的值

Items()返回字典中所有的键值对

![image-20220507105635649](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071056076.png)

（3）get(key[,default])

当**键值不存在时**，返回**none**

![image-20220507105658349](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071056325.png)

希望找不到数据时返回指定的值

![image-20220507105712588](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071057756.png)

若不知道一个键是否在字典中，可以使用**成员资格操作符**（in或not in）

![image-20220507105730165](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071057485.png)

清空字典，使用**clear()**方法

![image-20220507105744709](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071057771.png)

（4）copy()

拷贝（浅拷贝）整个字典

![image-20220507105810096](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071058370.png)

（5）pop(key,[,default])和popitem()

Pop()给定键弹出对应的值

Popitem()弹出一个项

![image-20220507105837197](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071058283.png)

（6）setdefault(key[,default])

Setdefault()在字典中找不到相应的键时，会**自动添加**

![image-20220507110029465](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071100656.png)

（7）update([other])

更新字典

![image-20220507110049194](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071100291.png)

### 创建集合

用大括号括起来一堆数字但没有体现映射关系，即为集合

 

集合特点：**唯一**

 

集合时**无序**的，不能通过索引其中的某一个元素

 

**创建集合**

2种方法：

- 使用**大括号{}**括起来
- 使用**set()内置函数**

![image-20220507110133536](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071101578.png)

Set()能去除重复元素

![image-20220507110148590](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071101644.png)

将无序的集合转换成列表不能保证原来的列表顺序

**访问集合**

可使用迭代把集合中的数据依次读出来

![image-20220507110214001](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071102117.png)

也可以使用in和not in判断元素是否在集合中存在

使用add()方法可以为集合添加元素

使用remove()方法可以删除集合中已知的元素

![image-20220507110236449](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071102827.png)

### 不可变集合

使用**frozenset()函数**

![image-20220507110304207](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071103555.png)

## 永久存储

### 文件

**打开文件**

使用**open()内置函数**打开文件并返回文件对象

| **打开模式** | **执行操作**                                         |
| ------------ | ---------------------------------------------------- |
| 'r'          | 以只读方式打开文件（默认）                           |
| 'w'          | 以**写入**的方式打开文件，会**覆盖已存在的文件**     |
| 'x'          | 若**文件已经存在**，使用此模式打开将**引发异常**     |
| 'a'          | 以**写入**模式打开，若文件存在，则在**末尾追加写入** |
| 'b'          | 以**二进制模式**打开文件                             |
| 't'          | 以**文本模式**打开（默认）                           |
| '+'          | **可读写模式**（可添加到其他模式中使用）             |
| 'U'          | 通用换行符支持                                       |

![image-20220507110348272](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071103322.png)

**文件对象的方法**

| **文件对象的方法** | **执行操作**                                                 |
| ------------------ | ------------------------------------------------------------ |
| Close()            | 关闭文件                                                     |
| Read(size=-1)      | 从文件读取size个字符，当**未给定size**或给定**负值**时，**读取剩余的所有字符** |
| Readline()         | 从文件中**读取一整行字符串**                                 |
| Write(str)         | 将**字符串str写入文件**                                      |
| Writelines(seq)    | 向**文件写入字符串序列seq**，seq应该是一个返回字符串的可迭代对象 |
| Seek(offest,from)  | 在文件中**移动文件指针**，从from（0代表文件起始位置，1代表当前位置，2代表文件末尾） |
| Tell()             | **返回当前文件中的位置**                                     |

**文件关闭**

Python的垃圾回收机制会在**文件对象的引用**计数降到0时，自动关闭文件

 

**文件的读取和定位**

Read()以**字节**为单位读取

 

**文件的写入**

使用'**w**'模式写入文件，此前的文件内容会全部删除，要追加内容一定要使用'**a**'模式打开文件

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

**mode**是一个可选的字符串参数，用来指定文件打开模式

**buffering**是一个整数可选项，用于设置缓冲策略，传入0关闭缓冲（仅允许在二进制模式下），1选择行缓冲（尽用于文本模式），大于1的整数用于指示某个固定大小的块缓冲区的字节大小

**encoding**是用于编码或解码文件的编码名称。该参数应仅用于文本模式

**errors**是一个字符串可选项，用于指定如何操作编、解码的错误（不能用于二进制模式）

**newline**控制通用换行模式如何运行（只支持文本模式），该值可以是None, ”, ‘\n’、’\r’和’\r\n’

如果**closefd**为False，且给定文件描述符（而不是文件名），那么当文件关闭时底层文件描述符将保持打开。如果给定文件名，**closefd**必须为True（默认）。否则将引发错误。

**opener**可以传递调用一个自定义打开器，然后通过调用**opener**获取文件对象的底层文件描述符。**opener**必须返回一个打开文件

描述符

![image-20220507110502806](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202205071105091.png)



