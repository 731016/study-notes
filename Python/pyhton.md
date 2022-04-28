## 环境搭建

https://www.python.org/

![image-20220428180256069](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281802133.png)

## 设计第一个小游戏

![image-20220428180329112](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281803225.png)

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

![image-20220428180406652](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281804756.png)

**将字符串转换为整数**

使用 [int()](https://fishc.com.cn/thread-144631-1-1.html) 函数将指定的值转换成整数

**比较运算符**

![image-20220428180437006](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281804052.png)

## 变量

![image-20220428180522709](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281805822.png)

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

![image-20220428180651687](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281806792.png)

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

![image-20220428181434924](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281814958.png)

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

![image-20220428181520429](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281815461.png)

**list**是将可迭代对象以列表的形式展示出来



**指定起始数值和结束数值**

![image-20220428181539276](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281815311.png)

**增加步长**

![image-20220428181554457](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281815488.png)

```python
打印1+2+3+4+…+100的计算结果
sum=0
for i in range(101):
    sum+=i
print(sum)
```

### 断言（assert）

当这个关键字后的条件为假时，程序自动崩溃并抛出AssertionError异常

![image-20220428181646678](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281816709.png)

### break语句

中止当前循环，跳出循环体

![image-20220428182103114](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281821149.png)

### continue语句

跳出本轮循环并开始下一轮循环（开始前测试循环条件）

![image-20220428182124664](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281821700.png)

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

![image-20220428182155616](https://gitee.com/LovelyHzz/imgSave/raw/master/note/202204281821652.png)

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

