## 第一章 数据库基础

### 数据库系统概述

**数据**：包括数字、文本、图像、音频、视频

**数据库**（DataBase，DB）：存放数据的仓库，将数据关联起来按一定格式存放在计算机上

**数据库管理系统**（DataBase Management System,DBMS）：按一定的数据模型组织数据，管理数据库



3个阶段：

-->**人工管理阶段**（20世纪50年代以前）主要用于科学计算 依赖于人工管理

	特点：
		（1）数据不保存
		（2）使用应用程序管理数据
		（3）数据不共享
		（4）数据不具有独立性



-->**文件系统阶段**（20世纪50年代后期~60年代中期）用磁盘等存储设备和专门的数据管理软件（文件系统）

	特点：
		（1）数据可长期保存
		（2）由文件系统管理数据
		（3）共享性差，数据冗（rong【3】）余大
		（4）数据独立性差

-->**数据库系统阶段**（20世纪60年代以来）统一管理数据 共享功能，满足多用户、多应用共享数据的需求

	特点：
		（1）可保存大容量数据
		（2）由数据库系统统一管理数据
		（3）提高数据共享程度
		（4）保证数据的独立性、安全性和完整性

**数据库系统的组成**

1. 数据库（数据）
2. 数据库管理系统（软件）
3. 数据库管理员（人员）
4. 硬件平台（硬件）
5. 软件平台（软件）



**数据库管理系统（DataBase Management System,DBMS）**

是位于用户与操作系统之间的一个数据管理软件，负责数据库的数据组织、数据操纵、数据维护和数据服务

**功能**：

（1）数据存取的物理构建

（2）数据操纵功能

（3）数据定义功能

（4）数据库的运行管理

（5）数据库的建立与维护功能

### 数据模型

数据模型的概念：描述数据与数据之间的联系、数据的语义、数据一致性的概念性工具的集合；

**数据模型（三要素）组成：**

（1）数据结构：对系统静态特征的描述，描述对象包括数据的类型、内容、性质和数据之间的相互关系

（2）数据操作：对系统动态特征的描述，对数据库中各种对象实例的操作

（3）完整性约束：是完整性规则的集合，定义了给定数据模型中数据及其联系所具有的制约和依存规则

**实体**：每一类数据对象的个体称为“实体”

**属性**：实体的特征（外在表现）

**码**：可以唯一确定一个元组的属性或属性集合

**域**：每个属性取值的变化范围

**实体型**：若干个属性型所组成的集合可以表征一个实体的类型

**实体集**：性质相同类的同类实体的集合

**联系**：实体型内部之间的连续和实体型之间的联系



**实体与关系**

（1）一对一关系：表A中的一条记录确实在表B中有且只有一条相匹配的记录

（2）一对多关系：表A中的行可以在表B中有许多匹配行，但表B中的行只能在表A中有一个匹配行

（3）多对多关系：关系中每个表的行在相关表1中具有多个匹配行；多对多关系的建立依靠第3个表（链接表）实现



**常见的数据模型**

**数据模型的作用**：描述数据之间的联系、语义和约束的集合

**关系模式**：由**联系属性、参与联系的各实体集的主码属性**构成关系模式



-->**层次模型**：用树型结构表示实体类型及实体间联系的数据模型

```
特点：
（1）每棵树有且仅有一个无双亲结点，称为根
（2）树中除根外的所有结点有且仅有一个双亲
```

![image-20220427105028797](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271050979.png)

-->**网状模型**：用有向图结构表示实体类型及实体间联系的数据模型

```
特点：
（1）编写的应用程序复杂，数据独立性差
```

![image-20220427105124231](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271051277.png)

-->**关系模型**：用二维表的形式表示实体和实体间联系的数据模型

```
特点：
（1）每个表有多个字段列和记录行，每个字段列有固定的属性
（2）数据结构简单、清晰、具有很高的数据独立性
```

基本术语：

​	（1）<u>关系</u>：一个二维表就是一个关系

​	（2）<u>元组</u>：二维表中的一行，即表中的记录

​	（3）<u>属性</u>：二维表中的一列，用类型和值表示

​	（4）<u>域</u>：每个属性取值的变化范围



E-R图（**E-R模型**）：实体集及实体集联系的图
	（1）实体集采用矩形框表示，框内为实体名
	（2）实体的属性采用椭圆框表示，框内为属性名，并用无向边与其相应实体集连接
	（3）实体间的联系采用菱形框表示，用无向边将参加联系的实体矩形框分别与菱形框相连，在连线上标明联系的类型，即1:1,1:n,m:n
	（4）若联系也有属性，应采用无向边与属性连接

### 数据库系统结构

**数据库的三级模式结构**

```
 数据库的三级模式是指模式、外模式、内模式
```

相互关系

![image-20220427105327226](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271053353.png)

-->**模式（逻辑模式/概念模式）**：是数据库中全体数据的逻辑结构和特征的描述，是所有用户的公共数据视图；

```
一个数据库只有一个模式
 
模式处于三级结构的中间层
 
注意：定义模式时不仅要定义数据的逻辑结构，而且要定义数据之间的联系，定义域数据有关的安全性、完整性要求
```

-->**外模式（用户模式）**：是数据库用户（包括应用程序员和最终用户）能够看见和使用的局部数据的逻辑结构和特征的描述，是数据库用户的数据视图

```
外模式是模式的子集
 
一个数据库可以有多个外模式
```

-->**内模式（存储模式）**：是数据物理结构和存储方式的描述，是数据在数据库内部的表示方式

```
一个数据库只有一个内模式
```



**三级模式之间的映射**

两层映射：

-->**外模式/模式映射**：<u>同一个模式可有任意多个外模式；对于每一个外模式，数据库系统都有一个外模式/模式映射</u>；当模式改变时，由数据库管理员对各个外模式/模式映射作相应改变，使*外模式*保持不变；保证数据与程序的*逻辑独立性*

-->**模式/内模式映射**：<u>数据库中只有一个模式和一个内模式</u>，所以模式/内模式映射是唯一的；定义了数据库的全局逻辑结构与存储结构之间的对应关系；当数据库的存储结构改变时，由数据库管理员对模式/内模式映射进行相应改变，使*模式*保持不变；保证数据与程序的*物理独立性*



## 第二章 关系数据库

### 关系数据结构及形式化定义

关系：实体与实体间的联系

主码：主码是一个能唯一标识一个元组的属性

主属性:包含在任一候选码中的属性

全码：当所有的属性共同构成一个候选码时，这时该候选码为全码

关系模式的定义：由一个关系名以及它所有的属性名构成



**关系数据库的规范化**

关系数据库中的每一个关系都要满足一定的要求，满足不同程度要求的为不同范式



-->**第一范式（1NF）** 第二和第三范式的基础

**在一个关系中，要消除重复字段，其各字段都应是最小的逻辑存储单位**

指导原则：
	• 数据组的每个属性只可以包含一个值
	• 关系中的每个数组必须包含相同数量的值
	• 关系中的每个数组一定不能相同



第一范式是关系模式的基本要求

如果数据表中的每一个列都是不可再分隔的基本数据项——即同——列中不能有多个值——即此数据表符合第一范式（不可再分解的原子特性）



数据表的每一行只包含一个实体的信息，并且每一行的每一列只能存放实体的一个属性



若数据表中的列信息符合第一范式，则数据表中的字段都是单一的，不可再分的

![image-20220427105735368](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271057446.png)



-->**第二范式（2NF）** 必先满足第一范式

要求数据库表中的每个实体（即各个记录行）必须可以被唯一地区分



为实现区分各行记录通常需要为表设置一个“区分列”，用以存储各个实体的唯一标识，这个唯一属性列被称为**主关键字或主键**



第二范式<u>要求实体的属性完全依赖于主关键字，既不能存在仅依赖主关键字一部分的属性</u>，若存在，属性和主关键字应分离形成新的实体，新实体与原实体之间是一对多的关系



-->**第三范式（3NF）** 必先满足第二范式



要求关系表不存在非关键字列对任意候选字列的传递函数依赖，第三范式要求<u>一个关系表中不包含已在其他表中包含的非主关键字信息</u>



传递函数依赖：如果存在关键字段A决定非关键字段B，而非关键字段B决定非关键字段C，则称非关键字段C传递函数依赖于关键字段A
	A->B->C  C<-A



**三种范式之间的关系**

1NF
|--消去**非主属性**对键的*部分函数*依赖
2NF
|--消去**非主属性**对键的*传递函数*依赖
3NF
|--消去**主属性**对键的*传递函数*依赖
BCNF



### 关系的完整性

关系中的数据约束

（1）实体完整性约束：约束关系的主键中的属性值不能为空值

（2）参照完整性约束：关系之间的基本约束

（3）用户定义的完整性约束：反映具体应用中数据的语义要求

![image-20220427110041834](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271100991.png)

## 第三章 创建和管理数据库

### 数据库的基本概念

数据库（DataBase）：**是按照数据结构来组织、存储和管理数据的仓库**，是长期存储在一起的相关数据的集合
	优点：

​		（1）减少了数据的冗余度，节省数据的存储空间

​		（2）具有较高的数据独立性和易扩充性

​		（3）实现数据资源的充分共享
​		
数据库管理系统（DataBase Management System,DBMS）：是位于用户与操作系统之间的一个数据管理软件，**负责数据库的数据组织、数据操纵、数据维护和数据服务**
​	功能：

​		（1）数据存取的物理构建

​		（2）数据操纵功能

​		（3）数据定义功能

​		（4）数据库的运行管理

​		（5）数据库的建立与维护功能
​		
关系数据库：支持关系模型；

**关系模型**的组成：关系数据结构、关系操纵集合、完整性约束

（1）关系数据结构：二维表，结构单一

（2）关系操作集合：关系代数、关系演算-->SQL语言

（3）完整性约束：实体完整性、参照完整性、用户自定义的完整性

### 数据库常用对象

**表**：包含数据库中所有数据的数据库对象，有行和列组成，用于组织和存储数据

**字段**：表中的每以列称为一个字段，字段具有之间的属性

SQL规范支持5种基本字段类型：字符型、文本型、数值型、逻辑型、日期时间型

**索引**：一个单独的、物理的数据库结构；依赖于表建立；无须对整个表进行扫描

**视图**：从一张或多张表的导出的表（也称虚拟表），是用户查看数据表中数据的一种方式；表中包含几个被定义的数据列与数据行

**存储过程**：一组用于完成特定功能的SQL语句集合，经编译后以名称的形式存储在SQL Server服务器端的数据库中，由用户通过指定存储过程的名字来执行

### 数据库的组成

SQL Server 2012数据库主要由文件和文件组组成；数据库中的所有数据和对象都被存储在文件中



文件：

​	（1）主要数据文件：存放数据和数据库的初始化信息；每个数据库有且只有一个主要数据文件，默认扩展名为.mdf

​	（2）次要数据文件：存放除主要数据文件外的所有数据文件，可有多个或没有，默认扩展名.ndf

​	（3）事务日志文件：存放用于恢复数据库的所有日志文件；至少有一个，默认扩展名.ldf



文件组：一种逻辑管理单位

（1）主文件组：包含主要数据文件和任何没有明确指派给其他文件组的文件；系统表的所有页都分配在主文件组中

（2）用户定义文件组：主要是CREATE DATABASE或ALTER DATABASE语句中，使用FILEGROUP关键字指定的文件组

*说明：每个数据库中都有一个文件组作为默认文件组运行，默认文件组包含在创建是没有指定文件组的所有表和索引的页。在没有指定的情况下，主文件组作为默认文件组*



文件分组时，遵循文件和文件组的设计原则：

（1）文件只能是一个文件组的成员

（2）文件或文件组不能由一个以上的数据库使用

（3）数据和事务日志信息不能属于同一个文件或文件组

（4）日志文件不能作为文件组的一部分

### 系统数据库

SQL server 2012的安装程序在安装时默认将建立4个系统数据库（Master,Model,Msdb,Tempdb）

-->**Master数据库**：记录SQL Server实例的所有系统级信息，包括实例范围的元数据、端点、链接服务器、系统配置设置
	*实例*：表示后台进程和数据库文件的集合
	
-->**Tempdb数据库**：保存临时对象或中间结果集

-->**Model数据库**：用作SQL Server实例上创建的所有数据库的模板

-->**Msdb数据库**：用于SQL Server代理计划警报和作业



### SQL Server的命名规则

**标识符**

服务器、数据库和数据库对象都有标识符

数据库对象的名称被看作对象的标识符

对象标识符是在定义对象时创建的，标识符随后用于引用该对象

**（1）标识符格式**

​	a. 标识符的**首字符**必须是：

​		统一码（Unicode）2.0标志中所定义的字符，包括拉丁字母a~z和A~Z，以及来自其他语言的字符

​		下划线"_" ， 符号"@" ,数字符号"#"

​		"@"开始的标识符表示局部变量或参数
​		"#"表示临时表或过程
​		"##"表示全局临时对象
​		某些SQL函数的名称以双at符号（@@）开始，避免使用@@开始的名称

b. 标识符的**后续字符**：
			i. 统一码（Unicode）2.0标志中所定义的字符
   		ii. 来自拉丁字母或其他国家/地区脚本的十进制数字
   		iii. “@”符号，美元符号“$”，数字符号“#”，下划线“_”

c. 标识符不允许是SQL的**保留字**

d. 不允许嵌入**空格**或其他特殊字符



**（2）标识符分类**

​	a. 常规标识符：符合标识符的格式规则

​	b. 分隔标识符：包含双引号（""）或者方括号（[]）内的标识符，不符合标识符命名规则

**常规标识符和分隔标识符**包含的字符数必须在<u>1~128</u>之间，对于*本地临时表*，标识符最多可以有<u>116</u>个字符



**对象命名规则**

SQL Server 2012的数据库对象名由1~128个字符组成，不区分大小写

数据库对象的完整名称应该有服务名、数据库名、拥有者名和对象名4部分组成

```sql
[[[server.][database].][owner_name].]object_name
```

服务、数据库和所有者的名称即所谓的对象名称限定符



对象名的有效格式：

```sql
server.database.owner_name.object_name
server.database..object_name
server..owner_name.object_name
server...object_name
database.owner_name.object_name
database..object_name
owner_name.object_name
object.name
```

指定了4个部分的对象名称被称为**完全合法名称**

不允许存在4部分名称完全相同的数据库对象



**实例命名规则**

-->默认实例：由运行它的计算机的网络名称标识

-->命名实例：可同时运行任意个SQL server命名实例；**<计算机名称>\<实例名称>**的格式进行标识，即compputer_name\instance_name，该实例名不能超过**16**个字符



### 数据库操作

**创建数据库**

数据库名称、所有者、空间大小、存储信息的文件和文件组

数据库名称可为中文名



**界面方式创建数据库**

```
（1）启动SQL Server Management Studio，连接到数据库
（2）右键单击“数据库”选项，弹出的快捷菜单选择“新建数据库”
（3）在列表框数据库名称中填写数据库名“db_database”，单击“确定”
```

**使用CREATE DATABASE语句创建**

```sql
create database yggl
on
(
    name='yggl_data',
    filename='d:\data\yggl.mdf',
    size=10mb,
    maxsize=50mb,
    filegrowth=5%
)
log on
(
    name='yggl_log',
    filename='d:\data\yggl.ldf',
    size=2mb,
    maxsize=5mb,
    filegrowth=1mb
)
go
```



**修改数据库**

**界面方式修改数据库**

```
（1）启动SQL Server Management Stdio,连接到数据库，在“对象资源管理器”中展开“数据库”节点
（2）右键单击需要更改的数据库，弹出的快捷菜单选择【属性】
（3）单击“数据库属性”对话框的“文件”选项卡，单击“所有者”后的浏览按钮，弹出“选择数据库所有者”对话框
（4）在“匹配的对象”列表框选择需要更改的所有者名称，单击【确定】按钮
```

**使用ALTER DATABASE语句修改数据库**

```sql
alter database yggl1
modify file
(
    name='yggl1_data',
    size=15mb
)
go
----------------------
alter database MingRi
add file
(
    name=mrkj,
    filename ='D:\mrkj.ndf',
    size=10mb,
    maxsize=100mb,
    filegrowth=2mb
)
```

**删除数据库**

删除数据库后应立即备份master数据库，因为删除数据库将更新master数据库中的信息

msdb、model、master、tempdb

**界面方式删除**

```
（1）启动SQL Server Management Stdio,连接到数据库，在“对象资源管理器”，展开“数据库”结点
（2）右键单击要删除的数据库“MingRi”选项，弹出的快捷菜单选择【删除】命令
（3）在弹出的“删除对象”对话框选择【确定】按钮
```

**使用DROP DATABASE语句删除数据库**

```sql
drop database MingRi
```

**指定要使用的数据库**

```sql
use {数据库}
```

**SHOW 语句显示数据库及其表中包含的信息**

```sql
show database
```

## 第四章 表与表数据操作

### 数据表操作

**数据表设计原则**
	

数据库中的表是由行和列组成的；相同类的信息组成列，**每一列称为一个字段**，每列的列标题称为字段名；**每一行数据称为一条记录**；
一个数据表是由一条或多条记录组成的，没有记录的表称为空表
	
创建表最有效的方法：将表中所需的信息一次定义完成

设计表注意的问题：

​	（1）表的各列及每一列的数据类型

​	（2）哪些值允许空值

​	（3）是否要使用以及何时使用约束、默认设置或规则

​	（4）所需索引的类型[索引？主键？外键？]
​	
创建表是必须满足的规定：

​	（1）每个表有一个名称，称为表名或关系名；表名必须以字母开头，最大长度30个字符

​	（2）一张表中可以包含若干个列，列名必须唯一，列名也称为属性名

​	（3）同一列中的数据必须要有相同的数据类型

​	（4）表中的一行称为一条记录



**数据表基础**

一张表一般具有多个列（即多个字段）；每个字段都具有特定的属性，包括字段名、数据类型、字段长度、约束、默认值

**基本数据类型**

| 整数数据类型                       |          存储整数或小数          | BIT                        | INT                       | SMALLINT | TINYINT     |                     |
| ---------------------------------- | :------------------------------: | -------------------------- | ------------------------- | -------- | ----------- | ------------------- |
| 货币数据类型                       |               "¥"                | MONEY                      | SMALLMONEY                |          |             |                     |
| 浮点数据类型                       |          存储十进制小数          | REAL                       | FLOAT                     | DECIMAL  | NUMERIC     |                     |
| 日期/时间数据类型                  |     存储日期和时间的组合数据     | DATETIME                   | SMALLDATETIME             | DATA     | DATETIME(2) | DATETIMESTAMPOFFSET |
| 字符数据类型                       | 存储各种字母、数字符号和特殊符号 | CHAR                       | NCHAR(n)                  | VARCHAR  | NVARCHAR(n) |                     |
| 二进制数据类型                     |          存储二进制数据          | BINARY                     | VARBINARY                 |          |             |                     |
| 图像                               |           文本数据类型           | 存储大量的字符及二进制数据 | TEXT    NTEXT(n)    IMAGE |          |             |                     |
| SQL Server 2012引用的3种新数据类型 |                                  |                            |                           |          |             |                     |

**SQL语言**

用来控制并与数据库管理系统进行交互作用，包含大约40条语句



数据操作类SQL语句

| `语句`   | `功能`                         |
| -------- | ------------------------------ |
| `SELECT` | `从数据库表中检索数据行和列`   |
| `INSERT` | `把新的数据记录添加到数据库中` |
| `DELETE` | `从数据库中删除数据记录`       |
| `UPDATE` | `修改现有的数据库中的数据`     |

数据定义类SQL语句

| `语句`              | `功能`                           |
| ------------------- | -------------------------------- |
| `CREATE  TABLE`     | `在一个数据库中创建一个数据库表` |
| `DROP TABLE`        | `从数据库删除一个表`             |
| `ALTER TABLE`       | `修改一个现存表的结构`           |
| `CREATE VIEW`       | `把一个新的视图添加到数据库中`   |
| `DROP VIEW`         | `从数据库中删除视图`             |
| `CREATE  INDEX`     | `为数据库表中的一个字段构建索引` |
| `DROP INDEX`        | `从数据库中的一个字段中删除索引` |
| `CREATE  PROCEDURE` | `在一个数据库中创建一个存储过程` |
| `DROP  PROCEDURE`   | `从数据库中删除存储过程`         |
| `CREATE  TRIGGER`   | `创建一个触发器`                 |
| `DROP  TRIGGER`     | `从数据库中删除触发器`           |
| `CREATE  SCHEMA`    | `向数据库中添加一个新模式`       |
| `DROP SCHEMA`       | `从数据库中删除一个模式`         |
| `CREATE  DOMAIN`    | `创建一个数据值域`               |
| `DROP DOMAIN`       | `从数据库中删除一个域`           |
| `ALTER  DOMAIN`     | `改变域定义`                     |

数据控制类SQL语句

| `语句`   | `功能`             |
| -------- | ------------------ |
| `GRANT`  | `授予用户访问权限` |
| `DENY`   | `拒绝用户访问`     |
| `REVOKE` | `删除用户访问权限` |

事务控制类SQL语句

| `语句`             | `功能`                     |
| ------------------ | -------------------------- |
| `COMMIT`           | `结束当前事务`             |
| `ROLLBACK`         | `中止当前事务`             |
| `SET  TRANSACTION` | `定义当前事务数据访问特征` |

程序化SQL语句

| `语句`     | `功能`                       |
| ---------- | ---------------------------- |
| `DECLARE`  | `定义查询游标`               |
| `EXPLAN`   | `描述查询描述数据访问计划`   |
| `OPEN`     | `检索查询结果，打开一个游标` |
| `FETCH`    | `检索一条查询结果记录`       |
| `CLOSE`    | `关闭游标`                   |
| `PREPARE`  | `为动态执行准备SQL语句`      |
| `EXECUTE`  | `动态地执行SQL语句`          |
| `DESCRIBE` | `描述准备好的查询`           |

**以界面方式创建、修改和删除数据表**

**创建数据表**

```
（1）启动SQL Server Management Studio，连接到数据库
（2）右键单击"表"选项，在弹出的快捷菜单中选择【新建表】命令
（3）进入“添加表”对话框，在列表框中填写字段名，单击【保存】 
```

**修改数据表**

```
（1）启动SQL Server Management Studio，连接到数据库，在“对象资源管理器”中展开“数据库下面的表”节点
（2）右键单击需要更改的表，弹出快捷菜单选择【设计】命令
（3）进入“表设计”对话框，修改后单击【保存】
```

**删除数据表**

```
（1）启动SQL Server Management Studio，连接到数据库，在“对象资源管理器”中展开“数据库下面的表”节点
（2）右键单击需要删除的表，弹出的快捷菜单选择【删除】命令
（3）进入“删除对象”对话框，删除后单击【确定】
```

**使用CREATE TABLE语句创建表**

创建班级表，数据表结构如图：

![image-20220427115009442](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202204271150504.png)

```sql
	use db_2012
	create table 班级表
	(
	    ClassID varchar(15) primary key,
	    ClassName varchar(50) not null,
	    ClassDesc varchar(100) null
	)
```

创建员工信息表（tb_basicMessage）：

| `字段名称（列名）` | `数据类型（字段长度）` | `空值` | `PK` |
| ------------------ | ---------------------- | ------ | ---- |
| `id`               | `int`                  | ` `    | `Y`  |
| `name`             | `Varchar(10)`          | ` `    | ` `  |
| `age`              | `int`                  | ` `    | ` `  |
| `dept`             | `int`                  | ` `    | ` `  |
| `headship`         | `int`                  | ` `    | ` `  |

```sql
	use db_2012
	create table basicMessage
	(
	    id int primary key,
	    name varchar(10),
	    age int,
	    dept int,
	    headship int
	)
```

**创建主键约束**

 ```sql
 create  table 表 字段 字段类型 constraint 主键名 primary key
 ```

**删除主键约束**

 ```sql
 alter table  表 drop constraint 主键名
 ```



**使用ALTER TABLE语句修改表**

（1）添加新列

```sql
语法：alter table 表名 add 列名 字段数据类型
语法：identity(初值,增量值) 默认值(1,1)
```

修改学生表，增加自动编号新列

```sql
use db_2012
alter table 班级表 add SID int identity(1,1)
```

（2）删除列

```
语法：alter table 表名 drop column 列名
```

删除学生表，删除自动编号列

```sql
use db_2012
alter table 班级表 drop column SID
```

外键约束语法：

```sql
alter table 表名
add constraint 约束名
foreign key(id)
references 关联表(id)
```



在学生表中，把学号约束为主键，姓名、性别和班级编号不允许为空值，性别默认设置为男，班级编号为外键

```sql
create table 学生表
(
	StudNO varchar(15) primary key,
	StuName varchar(20) not null,
	StuSex char(2) default'男' not null,
	StuBirthDay datetime null,
	ClassID varchar(15) constraint FK_ClassID foreign key references 班级表(ClassID) not null)
```



在成绩表中，约束学生成绩在0到100之间

| `字段名称（列名）` | `数据类型（字段长度）` | `PK` |
| ------------------ | ---------------------- | ---- |
| `StudNO`           | `Varchar(15)`          | `Y`  |
| `CourseID`         | `Varchar(15)`          | `Y`  |
| `StudScore`        | `Numeric(4,1)`         | ` `  |

```sql
	use db_2012
	create table 成绩表
	(
	    StudNO varchar(15),
	    CourseID varchar(15),
	    StudScore numeric(4,1) check(StudScore>=0 and StudScore <=100),
	    constraint PK_S_C primary key(StudNO,CourseID)
	)
```



向db_2012数据库中的tb_Student表中添加Sex字段

  `use  db_2012    alter table tb_Student    add Sex char(2)`  

 

删除DB_2012数据库中tb_Student中的Sex字段

  `use  DB_2012    alter table tb_Student    drop column Sex`  



**使用DROP TABLE语句删除表**

删除db_2012数据库中的数据表tb_Student

  `use  db_2012    drop table tb_Student`  

**SHOW TABLES 命令用于显示当前选定的 MySQL 数据库中的所有表**

```sql
SHOW TABLES
```

### 分区表

**分区表概述**

把数据库按照某种标准划分成区域存储在不同的文件组中，使用分区可快速有效的管理和访问数据子集

已分区表和已分区索引的数据划分为分布于一个数据库中多个文件组的单元

数据是按水平方式分区的，因此多组行映射到单个的分区

分区表的本质是把符合不同标准的数据子集存储在一个数据库的一个或多个文件组中，通过元数据来表述数据存储的逻辑地址



是否分区？

（1）取决于表当前大小或将来的大小

（2）如何使用表以及对表执行用户查询和维护操作的完善程度



**创建分区表**

**使用命令创建分区表**

**创建分区函数**

对int类型的列创建一个名为AgePF的分区函数，该函数把int类型的列中数据分为6个区，分别为小于或等于10的区、大于且小于等于30的区，大于30且小于等于50的区，大于50且小于等于70的区、大于70且小于或等于80的区、大于80的区

```sql
create partition function AgePF(int)
as range left for values(10,30,50,80)
go
```



**创建分区方案**

假如数据库“db_2012”中存在FGroup1、FGroup2、FGroup3、FGroup4、FGgroup5、FGgroup6这6个文件组，根据例中定义的分区函数创建一个分区方案，将分区函数的6个分区分别存放在这6个文件组中

```sql
create partition scheme AgePS
as partition AgePF
to(FGroup1、FGroup2、FGroup3、FGroup4、FGroup5、FGroup6)
go
```



**使用分区方案创建分区表**

在数据库“db_2012”中创建分区表，表中包含“ID”、“姓名”和“年龄”（年龄取值范围是1~100）

```sql
create table sample
(
ID int not null,
姓名 varchar(8) not null,
年龄 int not null
)
on AgePS(年龄)
go
```

*已分区的表的分区列在数据类型、长度、精度上，与分区方案索引用的分区函数使用使用的数据类型、长度、精度要一致！*



### 更新

最后一条记录下面有一条所有字段都为NULL的记录

**使用INSERT语句添加记录**

```sql
insert into 表名[列名1,列名2...]values(值1,值2...)
insert into 表名[列名1,列名2...]select语句
```

```sql
insert into tb_basicMessage values('小李'，26，'男',4,4)
```

使用insert语句为学生表添加新纪录

```sql
	use db_2012
	insert into 学生表
	    (StudNO,StudNmae,StudSex,StudBirthDay,ClassID)
	values
    ('1311302323','胡资质','男，1995-10-1,'131130')
```

**使用UPDATE语句修改记录**

```sql
update 表名 set 列名1=新值1[,列名2=值2...][where 列名称 = 某值]
```

```sql
使用updata语句将数据表tb_basicMessage中所有数据的sex字段值都改为“男”
update tb_basicMessage set sex='男'
	
数据表student中的所有人员的性别都设置为了“女”，现在将为“刘大伟”的人员姓别设置为“男”
update student set 性别='男' where 姓名='刘大伟'
```

**使用DELETE语句删除记录**

```sql
delete from 表名 [where 删除条件]
```

```sql
删除表tb_basicMessage中的name为“小李”的记录
delete tb_basicMessage where name='小李'
```

### **表与表之间的关联**

关系通过匹配键列中的数据来工作，而键列通常是两个表中具有相同名称的列，在数据表间创建关系可以显示某个表中的列如何连接到另一个表中的列

一对一关系：<u>两个相关列都是主键或具有唯一约束</u>

一对多关系：<u>在相关列中只有一列是主键或具有唯一约束</u>

多对多关系：<u>依靠</u>第3个表即<u>连接表实现，连接表包含相关的两个表的主键列，然后从两个相关的主键列分别创建于连接表中匹配列的关系</u>



## 第5章 视图操作

### 视图概述

```sql
视图是一种常用的数据库对象，它将查询的结果以虚拟表的形式存储在数据中
 
视图并不在数据库中以存储数据集的形式存在
 
视图的结构和内容是建立在对表的查询基础之上的和表一样包括行和列，这些行列数据都来源于其所引用的表，并且是在引用视图过程中动态生成的。
```

存储：视图存储是数据库设计的一部分，查询不是；视图可禁止所有用户访问数据库中的基表，而要求用户只能通过视图操作数据，保证数据表的安全性

排序：可对任何查询结果进行排序（当视图包括TOP子句时才能排序视图）

加密：可加密视图，不能加密查询



**使用界面方式操作视图**

**视图创建**

```
（1）启动SQL Server Management Stdio，连接到数据库
（2）在“对象资源管理器”中展开“数据库”节点，展开指定的数据库
（3）右键单击“视图”，弹出快捷菜单选择【新建视图】
（4）进入“添加表”对话框，在列表框选择表名，单击【添加】，单击【关闭】
（5）进入“视图设计器”界面，在“表选择区”中选择【所有列】，单击执行
（6）单击工具栏“保存”，在“输入输入视图名称”文本框输入名称，单击【确定】
 
```

**视图删除**

```
底层数据表不受影响，会造成与该视图关联的权限丢失
 
（1）启动SQL Server Management Stdio，连接到数据库
（2）在“对象资源管理器”中展开“数据库”节点，展开指定的数据库
（3）展开“视图”节点，右键单击要删除的视图，弹出快捷菜单选择【删除】
（4）弹出“删除对象”对话框，单击【确定】
```

**使用CREATE VIEW语句创建视图**

```sql
创建仓库入库表视图
create view view_1
as
select * from student
```

**使用ALTER VIEW语句修改视图**

修改仓库入库表视图

```sql
语法：
ALTER VIEW view_name[(column[,...n])]
[WITH ENCRYPTION]
AS
select_statement
[WITH CHECK OPTION]
```

```sql
alter view view_1(oid,warenmae)
as
select oid,warename
from student
where id=9
exec sp_helptext 'view_1'
```

**使用DROP VIEW语句删除视图**

```sql
use db_2012
go
drop view view_1
go
```

### 视图中的数据操作

**向视图中添加数据**

```
 
只能对行列子集视图进行操作
 
（行列子集视图）如果一个视图是从单个数据表中导出来的，并且只去掉了某些行和列，保留主键
 
 
```

**浏览、添加、修改、删除视图中的数据**

```
 
可展开“视图”节点
 
【属性】（查看视图属性）
【编辑前200行】（查看视图内容）
【设计】（重新设置视图）
```

## 第6章 Transact-SQL语法基础

### T-SQL概述

**T-SQL语言的组成**

数据**定义**语言（DDL）：SQL让用户定义存储数据的结构和组织，以及数据项之间的关系

数据**检索**语言：SQL允许用户或应用程序从数据库中检索存储的数据并使用

数据**操纵**语言（DML）：SQL允许用户或应用程序通过添加新数据、删除旧数据和修改以前存储的数据对数据库进行更新

数据**控制**语言（DCL）：可使用SQL来限制用户检索、添加和修改数据，保护存储的数据不被未授权用户访问

**数据共享**：可使用SQL来协调多个并发用户共享数据，确保他们不会相互干扰

**数据完整性**：SQL在数据库中定义完整性约束条件，使它不会由不一致的更新或系统失败而遭到破坏

**T-SQL语句结构**

每条T-SQL语句均由一个“谓词（Verb）”开始，该谓词描述这条语句要产生的动作

SELECT语法格式

```sql
Select 子句
[into 子句]
from 子句
[where 子句]
[group by 子句]
[having 子句]
[order by 子句]
```

```sql
在student数据库中查询“course”表的信息
Use student
select * from course where 课程类别='艺术类' order by 课程内容
```

### 常量

常量也叫常数

**字符串常量**

定义在单引号内，包含字母、数字字符、特殊字符

```sql
'hello world'
'good morning'
```

**二进制常量**
需要使用0x，并采用十六进制来表示，不再需要括号

```sql
0xB0A1
0xB0C4
```

**bit常量**

Bit常量使用数字0或1即可，并且不包括在引号中；如使用一个大于1的数字，该数字将转换为1

**日期和时间常量**

使用特定格式的字符日期值，并使用单引号

```sql
'2026年1月9日'
'15:39:15'
'01/09/2016'
'06:59 AM'
```

### 变量

数据在内存中存储的可变化的量
	-->局部变量
	-->全局变量



**局部变量**

作用范围仅限于程序内部

局部变量名必须以`@`开头

**局部变量声明格式**

```sql
Declare
{
@varaible_name dataname [,..n]
}
```

声明局部变量@songname

```sql
Declare @songname char(10)
```

**为局部变量赋值**

**（1）select语句**

```sql
select @varible_name = expression
[from table_name [,...n]
where clause]
```



```sql
在“student”数据库的“course”表中，把“课程内容”是“艺术类”的信息赋值给局部变量@songname，并把它的值用print关键字显示出来
use student
declare @songname char(10)
select @songname = 课程内容 from course where 课程类型='艺术类'
print @songname
			
声明一个局部变量名是@b并赋值
declare @b int
select @b=1
```

**（2）set语句**

```sql
{set @varible_name = ecpression}[,...n]
```

```sql
declare @songname char(20)
set @songname = 'i love hzz'

declare @b int,@c char(10),@a int
select @b=1,@c='love',@a=2
```

**全局变量**

名称以`@@`开头

```sql
在“pubs”数据库中修改“authors”数据表时，用@@ERROR检测限制查询冲突
use pubs
go
update authors set au_id='172 32 1176'
where au_id = '172-32-1176'
if @@ERRPR =547
print'a check constraint violation occurred'
	
在“pugs”数据库中的“jobs”数据表中，插入一行数据，并用@@identity显示新行的标识值
use pubs
insert into jobs(job_desc,min_lvl,max_lvl)
values ('Accountant',12,125)
select @@IDENTITY as 'Identity'
```

### 注释符、运算符与通配符

**注释符**

注释语句为不可执行语句，不参与程序的编译
	
-->ANSI标准的注释符：（`--`）用于单行注释

-->与c语言相同的注释符号：（`/*`、`*/`）用于多行注释
	所选行一次都注释【shift + ctrl + C】

​	取消多行注释【shift + ctrl + R】

**运算符**

【+】，【-】，【*】，【/】，【%】

```sql
declare @x int,@y int,@z int
select @x=2,@y=5
set @z=@x % @y
print @z
```

**赋值运算符**

【=】

**比较运算符**

【>】，【<】，【=】，【>=】，【<=】，【!=】，【!>】，【!<】

比较运算符的结果是布尔数据类型，有3种值：TRUE、FALSE、UNKNOWN

```sql
用查询语句搜索“pubs”数据库中的“titles”表，返回书的价格打了8折后仍大于12美元的书的代号、种类以及价格
use pubs
go
select title_id as 书号,type as 种类,price as 原价
from titles
where price-price*0.2 > 12

```

**逻辑运算符**

SQL支持的逻辑运算符

| `ALL`        | `如果一个比较集中的全部都是TRUE，则值为TRUE`           |
| ------------ | ------------------------------------------------------ |
| `AND`        | `如果两个布尔表达式均为TRUE，则值为TRUE`               |
| **`ANY`**    | `如果一个比较集中任何一个为TRUE，则值为TRUE`           |
| `BETWEEN`    | `如果操作数是在某个范围内，则值为TRUE`                 |
| **`EXISTS`** | `如果子查询包含任何行，则值为TRUE`                     |
| **`IN`**     | `如果操作数与一个表达式列表中的某个值相等，则值为TRUE` |
| `LIKE`       | `如果操作数匹配某个模式的话，则值为TRUE`               |
| `NOT`        | `对任何其他布尔运算符的值取反`                         |
| `OR`         | `如果任何一个布尔表达式是TRUE，则值为TRUE`             |
| `SOME`       | `如果一个比较集中的某些项为TRUE，则值为TRUE`           |

```sql
在“student”表中，查询女生中年龄大于21岁的学生信息
use student
select * from student
where 性别='女' and 年龄>21
```

当not，and，or出现在同一表达中，**优先级：not-->and-->or**

**位运算符**

操作数：整数数据类型或二进制串数据类型（image数据类型除外）

| `&`  | `按位and`    |
| ---- | ------------ |
| `|`  | `按位or`     |
| `^`  | `按位互斥or` |
| `~`  | `按位not`    |

**字符串连接运算符**

【+】

```sql
declare @name char(20)
set @name='hzz'
print '我喜爱的人是'+@name
```

**运算符优先级**

相同优先级，从左向右依次处理

| `+（正）`   | `-（负）`               | `~（位反）` | `1`  |
| ----------- | ----------------------- | ----------- | ---- |
| `*`         | `/`                     | `%`         | `2`  |
| `+（加）`   | `+（字符串串联运算符）` | `-（减）`   | `3`  |
| `= >   <`   | `>= <=   != !> !<`      | `<>`        | `4`  |
| `^`         | `&`                     | `|`         | `5`  |
| `not`       | ` `                     | ` `         | `6`  |
| `and`       | ` `                     | ` `         | `7`  |
| `all any`   | `between in   like`     | `or some`   | `8`  |
| `=（赋值）` | ` `                     | ` `         | `9`  |

```sql
declare @num int
set @num = 2 * (4 + (5-3))
```

**通配符**

通常用like关键字与通配符结合起来实现模式查询

| `%`           | `包含零个或更多字符的任意字符`                            | `“loning%”可表示：“loning”、“loningyou”，“loning?”`          |
| ------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| `_（下划线）` | `任何单个字符`                                            | `“loving_”可表示：“lovingc”；后面只能再接一个字符`           |
| `[]`          | `指定范围（[a-f]）或集合（[abcdef]）中的任何单个字符`     | `[0-9]123表示0~9之间的任意一个字符开头，以“123”结尾的字符`   |
| `[^]`         | `不属于指定范围（[a-f]）或集合（[abcdef]）的任何单个字符` | `[^0~5]123表示不以0~5之间任意一个字符开头，却以“123”结尾的字符` |

```sql
select * from books where 作者 like '李_'
```

## 第7章 数据的查询

### 创建查询和测试查询

**编写SQL语句**

​	（1）打开SQL Server Management Stdio，并连接数据库

​	（2）单击“标准”工具栏上的【新建查询】

​	（3）输入SQL语句进行查询
​	
**测试SQL语句**

​	单击工具栏中的分析（ctrl + F5）对当前SQL语句进行测试
​	
**执行SQL语句**

单击工具栏的执行（F5）



### 选择查询

**（1）简单的select查询**

select基本语法：

```sql
select select_list
[into new_table]
from table_name
[where search_condition]
[group by group_by_expression]
[having search_condition]
[order by order_expression[asc|desc]]
```

**选择所有字段**

```sql
在student数据库中，查询grade表的所有记录
use student
select * from grade
```

**选择部分字段**

```sql
在grade表中，显示学号、课程成绩字段的信息
use student
select 学号,成绩 from grade
各个列用逗号隔开
```

**（2）重新对列排序**

对较小的表，可不使用order by字句；

对比较大的表，必须使用order by字句

| `ASC`  | `递增排序` |
| ------ | ---------- |
| `DESC` | `递减排序` |

**单级排序**

排序关键字为order by，默认状态为升序（ASC）

```sql
在tb_basicMessage表中，按照“age”升序排列
use db_supermarket
select *
from tb_basicMessage
order by age
		
查询结果以降序排列，必须在列名后制定关键字的DESC
		
在tb_basicMessage表中，按照“age”降序排列
use student
select * from tb_basicMessage order by age desc
```



**多级排列**

```sql
在grade表中，按照学生的“学期”降序排列，再按照“课程成绩”升序排列
use student
select *
from grade
order by 学期 desc,课程成绩
		
在course表中先按照“课程类别”升序排列，再按照“课程内容”降序排列
use student
select * from course order by 课程类别 asc,课程内容 desc
```

**（3）使用运算符或函数进行列计算**

```sql
新的一年开始，学生的年龄都长了一岁
select 学号,姓名,年龄=年龄+1 from tb_stu
```

**（4）利用where参数过滤数据**

where子句用来选取需要检索的记录

（1）比较运算符（==，<>，<，>）

（2）范围说明（between，not between）

（3）可选值列表（in，not in）

（4）模式匹配（like，not like）

（5）上述条件的逻辑组合（and，or，not）



**比较查询条件**

```sql
在grade表中，查询“课程成绩”大于90分的信息
use student
select * from grade
where 课程成绩>90

在student表中查询“年龄”在20~22岁之间的所有学生
use student
select * from student
where 年龄>=20 and 年龄<=22

在student表中查询“年龄”不在20~22岁之间的所有学生
use student
select * from student
where 年龄<20 or 年龄>22

在student表中查询“年龄”不小于20岁的所有学生
use student
select * from student where 年龄!<20(年龄>=20)

在student表中查询“年龄”不等于20岁的所有学生
use student
select * from student where !=20
```

**将否定的where条件改为肯定的条件将会提高性能！**



**范围查询条件**

-->`between...and`【指定的第1个值必须小于第2个值】

-->`not between..and`【返回某个数据值要在两个指定范围之外，并且不包含两个指定的值】

```sql
在grade表中，显示年龄在20~21岁之间的学生信息
use student
select * from student
where 年龄 between 20 and 21
(where 年龄>=20 and 年龄<=21)
			
在student表中，显示年龄不在20~21之间的学生信息
use student
select * from student
where 年龄 not between 20 and 21
```



**列表查询条件**

当测试一个数据值是否匹配一组目标值中的一个时，通常用`in`关键字来指定列表搜索条件

```sql
在course表中，查询“课程编号”是k01，k03，k04的课程信息
use student
select * from course
where 课程编号 in ('k01','k03','k04')
```

in运算符可以与not配合使用来排除特定的行，测试一个数据值是否不匹配任何目标值

```sql
在course表中，查询课程代号不是k01、k03和k04的课程信息
use student
select * from course
where 课程代号 not in ('k01','k03','k04')
```

**模糊查询**

使用`like`进行模糊查询

**“%”通配符**

能匹配`0`个或更多个字符的任意长度的字符串

```sql
在student表中，查询姓“李”的学生信息
use student
seletc * from student
where 姓名 like '李%'
					
在student表中，查询姓“李”并且联系方式是以“2”打头的学生信息
use student
select * from student
where 姓名 like '李%' and 联系方式 like '2%'
```

**"_"通配符**

```sql
在student表中，查询姓“刘”并且名字只有两个字的学生信息
use student
select * from student
where 姓名 like '刘_'
					
在student表中，查询姓“李”并且末尾字是“丽”的学生信息
use student
select * from student where 姓名 like '李_丽'
```

**“[]”通配符**

```sql
在student表中，查询联系方式以“3451”结尾并且开头数字位于1~5之间的学生信息
use student
select * from student
where 联系方式 like '[1-5]3451'
					
在grade表中，查询学号是“B001”~“B003”之间的学生成绩
use student
select * from grade
where 学号 like 'B00[1-3]'
```

**“[^]”通配符**

```sql
在student表中，查询联系方式以“3451”结尾，但不以2开头的学生信息
use student
select * from student
where 联系方式 like '[^2]3451'
					
查询不姓“李”的学生信息
select * from student where 姓名 not like '李%'

查询除了名字是两个字并且不姓“李”的其他学生信息
select * from student where 姓名 not like '李_'

查询除了电话号码以“3451”结尾并且不开头数字位于1~5之间的其他学生信息
select * from student where 联系方式 not like '[1-5]3451'

查询电话号码不符合如下条件的学生信息：电话号码以“3451”结尾，但不以2开头的
select * from student 联系方式 not like '[^2]3451'
```



**复合条件查询**

（1）使用**and**返回满足条件的所有行

（2）使用**or**返回满足条件任一条件的行

（3）使用**not**返回不满足表达式的行

```sql
查询学号是“B001”或者是“B003”的学生信息
use student
select * from student
where 学号='B001' or 学号='B003'
			
根据姓名和密码查询用户
use db_supermarket
select * from tb_users
where userName='mr' and password='mrsoft'
```

**优先级：not --> and --> or**

```sql
在student表中，要查询年龄大于21岁的女生或者年龄大于等于19岁的男生信息
use student
select * from student
where 年龄 > 21 and 性别='女' or 年龄 >= 19 and 性别='男'
			
在student表中，查询年龄大于20岁的女生或者年龄大于22岁的男生，并且电话号码都是“23451”的学生信息
use student
select * from student
where (年龄>20 and 性别='女' or 年龄>22 and 姓名='男') and 联系方式='23451'
```

**使用别名**

```sql
三种：
（1）新列标题 = 原列名
（2）原列名 新列标题
（3）原列名 as 新列标题
```

```sql
查询课程表中的课程编号、课程名称和学分的信息，要求字段分别用“课程编号”、“课程名称”、“学分”来表达
select 课程编号=CourseID,CourseName 课程名称,CourseCredit as 学分 from 课程表
```

**消除重复记录**

`Distinct`关键字用来从select语句的结果集中去掉重复的记录

默认为ALL

```sql
在course表中，显示所有“课程类别”种类
use student
select distinct 课程类别 from course
	
在grade表中，显示“学号”和“课程代号”的不同值
use student
select distinct 学号,课程代号 from grade
```

**限制返回行数**

**Top关键字**

Top n[percent] 返回前n行或者返回总行数的百分之几

```sql
查询学生表中前5条记录
select top 5 * from 学生表
	
查询学生表中5%条记录
select top 5 percent * from 学生表
```



**使用into子句**

`Into new_table_name`子句将查询的结果集创建一个新数据表

```sql
将学生表中查询的学号和姓名字段结果存储到新表，新表名为“学生信息表”
select StudNo,StudName
into 学生信息表
from 学生表
```

**使用from子句**

可为表或视图指定别名
（1）表名 as 别名
（2）表名 别名

```sql
查询学号、姓名和成绩信息
select X.StudNO,StudName,StudScore
from 学生表 AS X,成绩表 C
where X.StudNo=C.StudNo
```

### 数据汇总

**使用聚合函数**

| 聚合函数               | 支持的数据类型       | 功能描述                                                     |
| ---------------------- | -------------------- | ------------------------------------------------------------ |
| sum()                  | 数字                 | 对指定列中的所有非空值求和                                   |
| avg()                  | 数字                 | 对指定列中的所有非空值求平均值                               |
| min()                  | 数字、字符、日期     | 返回指定列中的最小数字、最小的字符串、最早的日期时间         |
| max()                  | 任意基于行的数据类型 | 返回指定列中的最大数字、最大的字符串、最近的日期时间         |
| count([distinct]*)     | 数字、字符、日期     | 统计结果集中全部记录行的数量；最多可达2147483647行           |
| count_big([distinct]*) | 任意基于行的数据类型 | 类似于count()函数，但因其返回值使用了bigint数据类型，所以最多可统计行 |

```sql
在grade表中，求所有课程成绩的总和
select sum(课程成绩) from grade

在student表中，求所有女生的人数
select count(性别) from student

求student表中所有的记录数
select count(*) from student
```

**使用group by子句**

group by子句可将表的行划分为不同的组

（1）在select子句的字段列表中，除了聚集函数外，其他所**出现的字段一定要在group by中有定义**
（2）select子句的字段列表中不一定要有聚集函数，但至少要用到group by子句列表中的一个项目
（3）在SQL Server中，`text`、`ntext`和`image`数据类型的字段不能作为group by子句的分组依据
（4）group by子句不能使用字段别名

**按单列分组**

基于指定某一列的值将数据集合划分为多个分组，同一组内的所有记录在分组属性上具有相同值

```sql
把student表按照“性别”这个单列进行分组
use student
select 性别 from student
group by 性别
```

**按多列分组**

基于指定多列的值将数据集合划分为多个分组

```sql
在student表中，按照“性别”和“年龄”列进行分组
use student
select 性别,年龄 from student
group by 性别,年龄
```

**使用having子句**

分组之前的条件要用where关键字，而分组之后的条件要使用关键字having子句

```sql
在student表中，先按“性别”分组求出平均年龄，然后筛选出平均年龄大于20岁的学生信息
use student
select avg(年龄),性别 from student
group by 性别
having avg(年龄)>20
```

### 基于多表的连接查询

**连接谓词**

join是一种将两个表连接在一起的连接谓词；建议在from子句中指定连接条件

**以join关键字指定的连接**

**交叉连接**

是两个表的笛卡尔积的另一个名称；笛卡尔积就是两个表的交叉乘积，即两个表的记录进行交叉组合

```sql
语法：
select fieldist
from table1
cross join table2
```

**内连接**

也称连接，普通连接，自然连接

内连接是从结果中删除其他被连接表中没有匹配行的所有行，内连接可能会丢失数据

```sql
语法：
select fieldist
from table [inner] join table2
on table1.column = table2.column
```

一个表中的行和与另外一个表中的行匹配连接



**外连接**

保留内连接删除的原表中的一些行

-->左外连接

保留第1个表的所有行，但只包含第2个表与第1个表匹配的行；第2个表相应的空行被放入NULL值

```sql
语法：
use student
select fieldist
from table left join table2
on table1.column = table2.column
```

```sql
把student和grade表左外连接。第1个表student有不满足连接条件的行
use student
select * from student
left join grade
on student.学号=grade.学号
```

-->右外连接

保留第2个表的所有行，但只包含第1个表与第2个表匹配的行；第1个表相应的空行被放入NULL值

```sql
语法：
use student
select fieldist
from table1 right join table2
on table1.column=table2.column
```

```sql
把grade表和course表右外连接。第2个表course有不满足连接条件的行
use student
select * from grade
right join course
on course.课程代号=grade.课程代号
```

-->全外连接

把两个表的所有行都显示在结果表中

```sql
语法：
use student
select fieldist
from table full join table2
on table1.column=table2.column
```

```sql
把grade表和course表实现全外连接。两个表都有不满足连接条件的行
use student
select * from grade full join course
on course.课程代号=grade.课程代号
```

### 子查询

**使用in或not in的子查询**

**使用in的子查询**

```sql
语法：
where 查询表达式 in(子查询语句)
```

子查询**不能返回带几行和几列数据的表**；因为子查询的结果必须适合外层查询的语句

```sql
使用in查询员工信息
use db_supermarket
select * from tb_basicMessage
where id in(select hid from tb_contact)
```

where子句检查主查询记录中的值是否与子查询结果中的数值匹配，匹配则返回true值

```sql
查询年龄是“19、21、24”的学生信息
use student
select * from student
where 年龄 in(19,21,24)
```

**使用not in的子查询**

```sql
语法：
where 查询表达式 not in(子查询)
```

**子查询存在NULL值时，避免使用not in**；因为当子查询的结果包含了NULL值的列表时，把NULL值当成一个未知数据，不会存在查询值不在列表中的记录

```sql
在course和grade表中，查询没有学生参加考试的课程信息
use student
select * from course
where 课程代号 not in(select 课程代号 from grade where 课程代号 is not null)
```

查询过程是用主查询中的“课程代号”的值与子查询结果中的值比较，**不匹配返回真值**

**使用比较运算符的子查询**

把一个表达式的值和由子查询产生的值进行比较，这时**子查询只能返回一个值**，否则错误

```sql
在student表中，查询“课程成绩”大于98分的学生成绩
use student
select * from student
where 学号=(select 学号 from grade where 课程成绩>98)
```

**使用exists的子查询**

exists谓词**只注重子查询是否返回行**；如果子查询返回一个或多个行，谓词**评价为真，否则为假**

```sql
在tb_basicMessage和tb_contact表中，查询员工信息。用exist完成嵌套查询
use tb_supermarket
select * from tb_basicMessage
where exists(select contact from tb_contact where tb_basicMessage.id=tb_contact.hid)

use supermarket
select * from tb_basicMessage where exists(select * from tb_contact where tb_basicMessage.id=tb_contact.hid)
```

如果子查询没有返回行，则满足not exist中的where子句

```sql
在student表中查询没参加考试的学生信息
use student
select * from student
where not exists
(select * from grade where student.学号=grade.学号)
```

**使用union运算符组合多个结果**

（1）所有查询中的列数和列的顺序必须相同
（2）数据类型必须兼容
（3）作为所有select语句的合并操作结果进行排序的order by子句，必须放到最后一个select后面，但它所使用的排序列名必须是第1个select选择列表中的列名

```sql
把“select 课程代号,课程内容 from course”和“select 姓名,性别 from student”的查询结果合并
use student
select 学号,姓名,性别 from student where 年龄<22
union all
select 学号,姓名,性别 from student where 性别='男'
```

## 第8章 数据完整性

### 索引

**索引的概念**

数据库索引是对数据表中一个或多个列的值进行排列的结构

**索引的建立**

**使用SQL Server Management Studio创建索引**

```
(1)启动SQL Server Management Studio
(2)选择指定数据库,展开要创建索引的表,右键单击"索引",弹出快捷菜单选择[新建索引],选择[非聚集索引]
(3)在"新建索引"窗体中单击[添加],弹出"从表中选择列"窗体,选择要添加到索引键的表列
(4)单击[确定],在"新建索引"窗体中,单击[确定]
```

**使用transact-SQL语句中创建索引**

使用create index语句可为给定表或视图创建一个改变物理顺序的聚集索引，也可创建一个具有查询功能的非聚集索引

```sql
create [unique][clustered][nonclustered]
inedx 索引名
on {表 | 视图}{列[asc|desc]}
...
```

| [unique] [clustered\|nonclustered] | 指定创建索引的类型，参数依次为唯一索引、聚集索引、非聚集索引    当省略unique选项时，建立非聚集索引<br />省略[clustered\|nonclustered]选项时，建立聚集索引<br />省略nonclustered选项时，建立唯一聚集索引 |
| ---------------------------------- | ------------------------------------------------------------ |

```sql
为tb_basicMessage表创建非聚集索引
Use db_2012
create index IX_sup_id
on tb_basicMessage(id)
		
为student表的Sno列创建唯一聚集索引
Use db_2012
create unique clustered index IX_stu_Sno1
on student(Sno)
		
无法对表创建多个聚集索引！
		
为student表的Sno列创建组合索引
Use db_2012
create index IX_stu_Sno2
on student(Sno,Sname desc)
```

索引需要占用大量物理存储空间

建立索引的一般原则：

​	（1）只有表的所有者可在同一个表中创建索引

​	（2）每个表中只能创建一个聚集索引

​	（3）每个表最多可创建249个非聚集索引

​	（4）在经常查询的字段上建立索引

​	（5）定义text、image、bit数据类型的列上不要建立索引

​	（6）在外键列上可建立索引

​	（7）主键列上一定要建立索引

​	（8）在重复值较多、查询较少的列上不要建立索引



**索引的删除**

**使用图形界面删除索引**

右键单击要删除的索引，单击【删除】命令

删除视图或表时，将自动删除为视图或表创建的索引

**使用transact-SQL语句删除索引**

```sql
语法：drop index <table_name>.<index_name>
					表名         索引名称
```

```sql
删除tb_basicMessage表的索引 
Use db_supermarket
--判断表中是否有要删除的索引
if exists(select * from sysindexes where name='IX_sup_id')
drop index tb_basicMessage.IX_sup_id
```

**索引的分析与维护**

**索引的分析**

(1）使用`showplan`语句

显示查询语句的执行信息，包含查询过程中连接表时所采取的每个步骤以及哪个索引

```sql
语法：
Set showplan_all {on|off}
set showplan_text {on|off}
```

On->显示查询执行信息
Off->不显示查询执行信息

```sql
在“db_2012”数据库中的“student”表中查询所有性别为男且年龄大于23岁的学生信息
Use db_2012
go
set showplan_all on
go
select Sname,Sex,Sage from student where Sex='男' and Sage>23
go
set showplan_all off
go
```

（2）使用`statistics io`语句

显示执行数据检索语句所花费的磁盘活动信息量

```sql
语法：
Set statistics io {on|off}
```

on->显示信息

Off->不显示信息

```sql
在“db_2012”数据库中的“student”表中查询所有性别为男且年龄大于20岁的学生信息，并显示查询处理过程在磁盘活动的统计信息
Use db_2012
go
set statistics io on
go
select Sname,Sex,Sage from student where Sex='男' and Sage>20
go
set statistics io off
go
```

**索引的维护**

（1）使用`dbcc showcontig`语句

可显示指定表的数据和索引的碎片信息

```sql
语法:
Dbcc showcontig [{table_name | table_id | view_name | view_id},index_name | index_id]
```

```sql
显示“db_2012”数据库中“student”表的碎片信息
Use db_2012
go
dbcc showcontig (student) with fast
```

当扫描密度为100%时，说明表无碎片信息

（2）使用`dbcc dbreindex`语句

重建指定数据库中表的一个或多个索引

```sql
语法：
Decc dbreindex
(
['database.owner.table_name' [index_name [,fillfactor]]]
)
[with no_infomsgs]
```

```sql
使用填充因子100重建“db_2012”数据库中的“student”表上的“MR_Stu_Sno”聚集索引
Use db_2012
go
dbcc dbreindex('db_2012.dbo.student',MR_Stu_Sno,100)
go
```

（3）使用`dbcc indexdefrag`语句

可整理指定的表或视图的聚集索引和辅助索引碎片

```sql
语法：
Dbcc indexdefrag
(
{database_name | database_id | 0}
,{table_name | table_id | 'view_name' | view_id}
,{index_name | index_id}
)[with no_infomsgs]
```

```sql
清理数据库“db_2012”数据库中“student”表的“MR_Stu_Sno”索引上的碎片
Use db_2012
go
dbcc indexdefrag(db_2012,student,MR_Stu_Sno)
go
```

### 数据完整性

**数据完整性概述**

（1）数据类型准确无误

（2）数据取值符合规定的范围

（3）多个数据表之间的数据不存在冲突

**实体完整性**

任何一个实体都有区别于其他实体的特征，这种特征即是实体完整性

实体完整性是指所有的记录都应该有一个唯一的标识，以确保数据表中数据的唯一性

实体完整性的实现

（1）唯一索引（unique index）

（2）主键（primary key）

（3）唯一码（unique key）

（4）标识列（identity column）

​	

主键可以是一列也可以是多列组成的联合主键，主键不允许为空

标识列通常与primary key约束一起用作表的一行标识符

在每个表中，只能创建一个标识列，不能对标识符使用绑定默认值和default约束，必须同时指定种子和增量，或者两者都不指定；如果二者均未指定，那么默认值是（1，1）

种子：向表中插入第一行数据时标识列自动生成的初始值

增量：在新插入一行数据时，标识列将在上一次生成的值上面增加一个增量值作为新的标识列值

标识列是一直增长的，若增量为负数（负增长），与表中的实际数据量没有关系



**域完整性（列的完整性）**

域：数据表中的列（字段）
**要求数据表中指定列的数据具有正确的数据类型、格式和有效的数据范围**

实现机制：

​	（1）默认值【default】

​	（2）检查【check】

​	（3）是否为NULL

​	（4）数据类型【data type】

​	（5）唯一【unique】在标识列为（1，1）时，如插入10行数据，又删除了这10行数据，当再次插入数据时，标识列的值为11而不是1



**引用完整性（参照完整性）**

通过主键（primary key）约束和外键（foreign key）约束来实现被参照表和参照表之间的数据一致性
引用完整性可以确保键值在所有表中保持一致，如果键值更改了，在整个数据库中，对该键值的所有引用要进行一致的更改

禁止用户进行下列操作

​		（1）当主表中没有关联的记录时，将记录添加到相关表中

​		（2）更改主表中的值并导致相关表中的记录孤立

​		（3）从主表中删除记录，但仍存在与该记录匹配的相关记录



**用户定义完整性**

用户希望定义的完整性，反映某一具体应用所涉及的数据必须满足的语义要求

（1）规则（rule）

（2）触发器（trigger）

（3）存储过程（stored procedure）	

（4）创建数据表时的所有约束（constraint）



**实现数据完整性**

**规则**
	对录入数据列中的数据所实施的完整性约束条件，指定插入到数据列中的可能值
	特点：

​		（1）规则是数据库中独立于表、视图和索引的数据对象，删除表不会删除规则

​		（2）一个列上可使用多个规则

**默认值**
	可以是任何取值为常量的对象
	方法：

​		（1）在create table中使用default关键字创建默认定义，将常量表达式指派为列的默认值

​		（2）使用create default语句创建默认对象，再使用sp_bindefault系统存储过程将它绑定到列上（向前兼容）



**约束**
	定义自动强制数据库完整性的方式，使用约束优先于使用触发器、规则和默认值
	

6种约束：

（1）非空（not null）

（2）主键（primary key）

（3）唯一（unique）

（4）检查（check）

（5）默认（default）

（6）外键（froeign key）



**使用约束**

**非空约束**

NULL：没有输入，表示值未知或未定义

（1）创建非空约束

i. 启动SQL Server Management Stdio，连接到数据库

ii. 在“对象资源管理器”中展开“数据库”节点，展开指定的数据库

iii. 右键单击要创建约束的表，弹出快捷菜单选择【设计】

iv. 选择数据表的“允许NULL值”列（“列属性”中的“允许NULL值”设置为【是】）

```sql
语法：
[constraint <约束名>] not null
```

（2）修改非空约束

```sql
语法：
Alter table table_name
alter column column_name column_type null|not null
```

```sql
修改tb_student表的非空约束
Use db_2012
alter table tb_student
alter column ID int null
```

（3）删除非空约束

将“允许NULL值”复选框的选中状态取消

“列属性”中的“允许NULL值”设置为【否】

**主键约束**

（1）创建主键约束

右键单击要创建约束的表，弹出快捷菜单选择【设计】命令；选择要设置主键的列，右键单击【设置主键】

```sql
创建数据表Employee，并将字段ID设置为主键约束
Use db_2012
create table [dbo.][Employee]
(
			[id] [int] constraint PK_ID primary key,
[Name] [char](50),
			[Sex] [char](2),
			[Age] [int]
    
将tb_student表中的ID字段指定设置主键约束
Use db_2012
alter table tb_student
add constraint PRM_ID primary key(ID)	
```

（2）修改主键约束

（3）删除主键约束

```sql
删除tb_student表中的主键约束
Use db_2012
alter table tb_student
drop constraint PRM_ID
```

**唯一约束**

用于强制实施列集中值的唯一性，表中的任何两行都不能有相同的列值

（1）创建唯一约束

```sql
在db_2012数据库中创建数据表Employee，并将字段ID设置为唯一约束
Use db_2012
create table [dbo.][Employee]
(
			[ID] [int] constraint UQ_ID unique,
			[Name] [char](50),
			[Sex] [char](2),
			[Age] [int]
			)
		
将Employee表中的ID字段指定设置为唯一约束
Use db_2012
alter table Employee
add constraint unique_ID
unique(ID)
```

（2）修改唯一约束

（3）删除唯一约束

```sql
删除Employee表中的唯一约束
Use db_2012
alter table Employee
drop constraint unique_ID
```

**检查约束**

检查约束check可强制域的完整性

（1）创建检查约束

```sql
创建数据表Employee，并为字段Sex设置检查约束，在输入性别字段时，只能接受“男”或者“女”，而不能接受其他数据
Use db_2012
create table [dbo.][Employee]
(
ID int,
			Name char(50)
Sex char(2) constraint CK_Sex check(sex in('男','女')),
			Age int
)
			
为Employee表中的Sex字段设置检查约束，在输入性别的时候只能接受‘女’，不能接受其他字段
Use db_2012
alter table Employee
add constraint check_Sex check(sex='女')
```

（2）修改检查约束

（3）删除检查约束



**默认约束**

在创建或修改表时可通过定义默认约束default来创建默认值

(1）创建默认约束

```sql
创建数据表Employee，并为字段Sex设置默认约束“女”
Use db_2012
create table [dbo.][Employee]
(
ID int,
			Name char(50),
Sex char(2) constraint Def_Sex default '女',
			Age int
)
			
为Employee表中的Sex字段设置默认约束“男”
Alter table Employee
add constraint Default_Sex
default '男' for Sex
```

（2）修改默认约束

（3）删除默认约束

```sql
删除Employee表中的默认约束
Use db_2012
alter table Employee
drop constraint Default_Sex
```

**外键约束**

在外键引用中，当一个表的列被引用作为另一个表的主键值的列时，就在两表之间创建了链接

（1）创建外键约束

```sql
创建表Laborage，并为Laborage表创建外键约束，该约束把Laborage中的编号（ID）字段和表Employee中的编号（ID）字段关联起来，实现Laboratory中的编号（ID）字段的取值要参照表Employee中编号（ID）字段的数据值
			Use db_2012
create table Laborage
(
ID int,
			Wage money,
constraint fkey_ID
foreigh key(ID)
references Employee(ID)
)
			
将Employee表中的ID字段设置为Laborage表中的外键
Use db_2012
alter table Laborage
add constraint fkey_ID
foreign key(ID)
references Employee(ID)
```

（2）修改外键约束

先删除现有的外键约束，再新建

（3）删除外键约束

```sql
删除Employee表的默认约束
Use db_2012
alter table Laborage
drop constraint fkey_ID
```

## 第9章 流程控制、存储过程与触发器

### 流程控制

```sql
Begin...end
	将多个SQL语句组合为一个逻辑块，两个语句缺一不可
	
If
	判断结构
	
If...else
	
Case
	
While

While...continue...break

Return

Goto

Waitfor
	指定触发器、存储过程或事务执行的时间、时间间隔或事件；暂停程序
```

### 存储过程简介

存储过程（stored procedure）：是数据库服务端执行的T-SQL语句的集合，经编译后存放在数据库中

存储过程作为一个单元进行处理并由一个名称来标识

**存储过程的类别**

（1）系统存储过程：存储在master数据库中，并以_sp为前缀

（2）用户自定义存储过程：由用户创建并能完成某一特定功能

（3）扩展存储过程：可动态加载和运行DLL（动态链接库）

### 创建存储过程

**使用sql server management stdio创建存储过程**

（1）启动sql server management stdio，连接到数据库

（2）在“对象资源管理器”中选择指定的服务器和数据库，展开数据库的“可编程性”节点，右键单击“存储过程”，弹出快捷菜单【新建存储过程】

（3）弹出“连接到数据库引擎”，单击【确定】

**使用T-SQL语句创建储存过程**

```sql
为tb_users表创建存储过程
Use db_supermarket
create procedure loving as
select * from tb_users where userName='mr'
```

### 执行存储过程

**通过execute或exec语句执行**

```sql
执行tb_user表的存储过程
Exec loving
```

**通过设置使存储过程自动执行**

用户必须是固定服务器角色sysadmin的成员才可以设置指定的存储过程为自动执行的存储过程

将一个存储过程设置为自动执行需要使用sp_procoption

```sql
语法：
Sp_procoption [@proc_name] 'procedure'
,[@optionname=] 'option'
,[@optionvalue] 'value'
```

### 查看和修改存储过程

**使用sql server management stdio查看和修改存储过程**

**使用sql server management stdio查看存储过程**

```
（1）在“对象资源管理器”中，单击【数据库】->【student】->【可编程性】->【存储过程】，显示当前数据库的所有存储过程
（2）右键单击查看的存储过程（loving），弹出快捷菜单选择【属性】，打开“存储过程属性”对话框，查看存储过程的信息
```

**使用sql server management stdio修改存储过程**

```
（1）在“对象资源管理器”中，单击【数据库】->【student】->【可编程性】->【存储过程】，显示当前数据库的所有存储过程
（2）右键单击要修改的存储过程（loving），弹出快捷菜单选择【修改】，修改代码，执行【x】
```

**使用T-SQL语言查看存储过程信息**

**使用系统存储过程查看存储过程信息**

（1）sp_helptext查看存储过程的文本信息

```sql
语法：
Sp_helptext [@objname=] 'name'
```

对象必须在当前数据库中；name的数据类型为nvarname(776)，无默认值

创建存储过程时，如果使用了with encryption参数，系统存储过程sp_helptext将无法查看存储过程的相关信息

（2）sp_depends查看存储过程的相关性信息

```sql
语法：
Sp_depends [@objname=] 'object'
```

object的数据类型为nvarname(776)，无默认值

（3）sp_help查看存储过程的一般信息

```sql
语法：
Sp_help [[@objname=]name]
```

name的数据类型为nvarname(776)，默认值为NULL

```sql
查看tb_users表的存储过程
Use db_supermarket
exec sp_helptext loving
exec sp_depends loving
exec sp_help loving
```

**使用T-SQL修改存储过程**

使用alter procedure语句可修改存储过程，不会影响存储过程的权限设定，也不会更改存储过程的名称

```sql
修改loving20存储过程
—-创建存储过程
create db_student
create procedure loving20
@课程类别 varchar(20)='娱乐类',--对参数设置默认值
@学分 int=8
as
select * from course
where 课程类别=@课程类别 and 学分<@学分
			
修改
—-创建存储过程
create db_student
create procedure loving20
@课程类别 varchar(20)='歌曲类',--对参数设置默认值
@学分 int=6
as
select * from course
where 课程类别=@课程类别 and 学分>@学分
```

### 删除存储过程

**使用sql server management stdio删除存储过程**

（1）在“对象资源管理器”中，单击【数据库】->【student】->【可编程性】->【存储过程】，显示当前数据库的所有存储过程

（2）右键单击要修改的存储过程（loving），弹出快捷菜单选择【删除】，单击【确定】

**删除数据表后，并不会删除相关联的数据表，只是其存储过程无法执行**

**使用T-SQL语言删除存储过程**

```sql
删除loving存储过程
Drop procedure loving
	
删除多个存储过程loving10,loving20,loving30
Drop procedure loving10,loving20,loving30
```

**drop不能删除存储过程组中的单个存储过程**

### 触发器简介

**触发器的概念**

触发器是一种特殊类型的存储过程，在插入、删除或修改特定表中的数据时触发执行

可强制执行一定的业务规则，以保持数据完整性、检查数据有效性、实现数据库管理任务和一些附加的功能

一张表可以有多个触发器

**触发器的功能**

（1）级联修改数据表中相关表

（2）执行比检查约束更为复杂的约束操作

（3）拒绝或回滚违反反引用的完整性操作

（4）比较表修改前后数据之间的差别，并根据差别采取相应的操作



**触发器的类型和触发操作**

（1）**DML触发器**：是在执行数据**操作**语言事件时被调用的触发器，数据操作语言包括：**insert、update、delete**

每个语句都创建了两种特殊的表：**deleted表和inserted表**；两个逻辑表，由系统自动创建和维护，用户不能修改，存放在内存中，触发器执行完成后，与该触发器相关的这两个表会被删除

Deleted表：存放执行delete或者update语句，执行操作时，被修改的行移到到deleted表中检查是否满足要求，不满足向用户报告错误信息，并会回滚删除操作

inserted表：存放insert或者update语句，执行操作时，新的行同时添加到触发器作用的表和inserted表，inserted表中的内容是触发器所在表中新行的副本

5种类型：

（1）`update`触发器：更新操作时触发

（2）`insert`触发器：更新操作时触发

（3）`delete`触发器：更新操作时触发

（4）instead of触发器：不执行插入、更新或删除操作时触发

（5）after触发器：在一个触发动作发生后触发，只能在表上定义，使用sp_settriggerorder来完成执行触发器的先后顺序



（2）**DDL触发器**：由数据**定义**语言引起的事件，包括：**create、alter、drop**，用于执行数据库管理任务

不会响应针对表或视图的update、insert、delete语句，只响应数据定义语言而被激发

|             触发器              | 不同点                                                       | 相同点                                                       |
| :-----------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|     事后触发器（after触发器     | （1）激活时间：引发触发器执行的insert、update、delete语句,通过约束检查，成功执行后才激活并执行 <br />（2）**只能创建在数据表上**，**不能创建在视图上**，一个表可有**多个**事后触发器<br />（3）主要用于记录变更后的处理或检查 | （1）激活触发器后，系统都自动创建俩两个临时表inserted表和deleted表 |
| 替代触发器（instead  of触发器） | （1）激活时间：激活触发器的insert、update、delete语句仅起到激活触发器的作用，一旦激活后该语句即停止执行，立即转去执行触发器定义的操作<br />（2）可创建在表或视图上，一个表只能用**一个**替代触发器    （3）主要用于禁止数据库中数据的修改和视图的更新 | （2）两个表的结构与触发器的原数据表相同                      |

### 创建触发器

**使用sql server management stdio创建触发器**
	

**创建DML触发器 && 创建DDL触发器**

（1）在“对象资源管理器”中，展开【数据库】->【student】->【表】节点，在子节点中展开要创建触发器的表，单击【触发器】节点

（2）弹出快捷菜单选择【新建触发器】，单击工具栏上的【执行（x）】



**使用T-SQL语言创建触发器**
	
**使用T-SQL语法创建DML触发器**

```sql
		use db_2012
		GO
		create trigger 触发器_1
		on 学生表
		for INSERT
		AS
		BEGIN
		PRINT'新的记录被插入，请检查正确性'
		END
		
当对tb_basicMessage表添加或修改创建触发器
Use db_basicMessage
if object_ID('tb_BM','TR')is not null
 drop trigger tb_BM
go
create trigger tb_BM
on course
after insert,update
as raiserror('Notify tb_BM relations',16,10)
go
		
创建一个DML触发器loving10，当对course表删除数据时，输入一条信息
Use student
if object_id('loving10','TR')is not null
 drop trigger loving
go
create trigger loving10
on course
after delete
as
print'你插入了一行数据，操作成功'
go
```

**使用T-SQL语句创建DLL触发器**

```sql
创建一个DLL触发器loving30；在删除course表时，触发loving30并输出提示信息
Use student
--如果触发器存在，则删除
if exists(select * from sys.triggers | where name='loving30')
 drop trigger loving30
on database
go
--创建触发器
create trigger loving30
on database
for delete_table,alter_table
as
begin
print'在做删除或更改表操作前，请禁止触发器loving30'
rollback
end
		
测试loving30触发器，删除course表看是否触发loving30触发器
Use student
drop table course
		
创建一个作用范围为服务器的DLL触发器loving40
Create trigger loving40
on all server
for create_login
as
print'你没有权限创建登录'
rollback;
		
测试loving40触发器；创建一个登录，看loving40触发器是否起作用
Create login LYC
 with password='sqlserver2012'
go
```

**修改触发器**

**使用sql server management stdio修改触发器**

```
（1）在“对象资源管理器”中，展开【数据库】->【student】->【表】->【course】->【触发器】节点
（2）选择要修改的“触发器”，在弹出的快捷菜单右键单击【修改】，单击工具栏【执行（x）】
```

**使用T-SQL语言管理触发器**

```sql
修改触发器loving
Use db_student
alter trigger loving
on course
after insert
as raiserror('Notify course Relations',16,10)
go
```

**删除触发器**

**使用sql server management stdio删除触发器**

```
（1）在“对象资源管理器”中，单击【数据库】->【student】->【表】->【course】->【触发器】节点，选择要删除的触发器，右键单击弹出的快捷菜单中的【删除】
```

**使用T-SQL语言删除触发器**

```sql
删除指定数据库中的触发器loving
Use db_student
drop trigger loving
```

## 数据库设计

### 数据库设计概述

数据库设计可分为6个阶段：

（1）需求分析阶段

（2）概念结构设计阶段

（3）逻辑结构设计阶段

（4）物理结构设计阶段

（5）数据库实施阶段

（6）数据库运行和维护阶段



数据库设计是指对于一个给定的应用环境，构造最优的数据库模式，建立数据库及其应用系统，使之能够有效地存储数据，满足各种用户的应用需求，是规划和结构化数据库中的数据对象以及这些数据对象之间关系的过程

根据用户需求，在某一具体的数据库管理系统上，设计数据库的结构和建立数据库的过程

### 需求分析

需求分析的任务：调查清楚用户的实际需求,与用户达成共识,然后分析与表达这些需求

数据字典的定义和内容：
数据字典是对系统中数据的详细描述,是各类结构和属性的清单

需求分析阶段包含5部分:

(1)数据项:是不可再分的数据单位

(2)数据结构:反映数据之间的组合关系

(3)数据流:表示某一处理过程中数据在系统内传输的路径

(4)数据存储:数据结构在系统内传输的路径

(5)处理过程:处理逻辑通过判定法或判定树来描述



调查用户需求的具体步骤，以及调查方法：

(1)了解学生和课程之间的关系

(2)了解学生和班级之间的关系

(3)了解学生选修课程之后产生怎样的结果



自顶向下:从最上层的系统组织机构入手,采用逐层分解的方式分析系统;用数据流图和数据字典描述系统

自底向上:分析方向相反

### 概念结构设计

概念设计的特点：
(1)设计复杂度降低,便于组织管理

(2)不受特点DBMS的限制,独立于存储安排和效率方面的考虑

(3)不含具体的DBMS所附加的技术细节,能准确反映用户的信息需求

### 逻辑结构设计

E-R图向关系模型转换的基本原则：

​	(1)一个实体模型转换为一个关系模式

​	(2)一个1:1联系可转换为一个独立的关系模式,也可与任意一端对应的关系模式合并

​	(3)一个1:n联系可转换为一个独立的关系模式,也可与n端对应的关系模式合并

​	(4)一个m:n联系可转换为一个关系模式

​	(5)三个或三个以上的实体间的一个多元联系可转换为一个关系模式

​	(6)具有相同码的关系模式可以合并



## 用户自定义数据类型

可使用`sp_addtype`创建

```sql
语法：
Sp_addtype[@typename=]type,
[@phystype=]system_data_type
[,[@nulltype=]'null_type']
[,[@owner=]'owner_name']
```

```sql
创建用来存储邮政编码信息的“postcode”用户自定义类型
use db_supermarket
exec sp_addtype postcode,'char(8)','not null'
```

删除可使用`droptype`



## 用户自定义函数(标量函数/表值函数)

**创建自定义函数**

```sql
语法：
Create function(@parameter 变量类型,[,@parameter 变量类型])
returns 参数 as
begin
   命令行或程序块
end
```



函数可有0个或若干个输入参数，但必须有返回值

**调用自定义函数**

```sql
语法：
Print dbo.函数([实参])
Select dbo.函数([实参])
```



**修改自定义函数**

```sql
语法：
Alter function(@parameter 变量类型,[,@parameter 变量类型])
returns 参数 as
begin
   命令行或程序块
end
```



**删除自定义函数**

```sql
语法：
Drop function 函数名
```

## 交叉表查询

**使用pivot和unpivot实现**

```sql
【例10-2】在sp表中，按“商品名称”实现交叉表查询。结果表显示各商品在各月的销售情况
select * from sp pivot(sum(销售数量) for 商品名称 in([离校冲专辑],[周目人专辑],[国产601],[920盐城会])) as 统计

在sp表中，按“月份”交叉查询。逐月进行聚合运算
select 商品名称,a.[9] as [九月],a.[10] as [十月],a.[11] as [十一月],a.[12] as [十二月] from sp pivot(sum(销售数量) for 月份 in([9],[10],[11],[12])) as a

【例10-3】用unpivot实现把temp1表中的标识列（李小冲专辑、周目人专辑、国产01和920演唱会dvd）转换到商品名称行值中
select * from temp1 unpivot(销售数量 for 商品数量 in([离校冲船级],[周密人性化阻尼],[国产601],[7289盐城会dvd])) as a

用unpiovt实现把temp2中的列标识9月份、10月份、11月份、12月份列标识名称的行值中
select * from temp2 unpiovt(销售数量 for 月份 in([九月],[十月],[十一月],[十二月])) as a
```

**使用case实现**

```sql
语法：
Case input_expression
   when when_expression then resut_expression
   [...n]
       Else  else_result_expression
   end
```

## 事务处理

**事务简介**

**事务概念**

事务：在对数据进行操作的过程中保证数据的完整性，防止出现数据操作完成一半的未完成现象

4个属性：

（1）原子性

（2）一致性

（3）隔离性

（4）持久性

**事务类型**

（1）自动提交事务：每条单独的语句都是一个事务；其后都隐含一个commit

（2）显式事务：以begin transaction显式开始，以commit或rollback显式结束

（3）隐式事务：在一个事务完成前，新事务隐式启动，但每个事务仍以commit或rollback显式结束

**事务处理**

事务的起点：以`begin transaction`语句开始
事务的终点：以`commit transaction`作为隐式或显式事务成功的结束
数据回滚：使用`rollback transaction`语句可将显示事务或隐式事务回滚到事务的起点或事务内的某个保存点
事务保存点：使用`save transaction`语句在事务内设置保存点



事务的应用：

```sql
对数据表（table_1）进行插入记录的工作，遇到错误时回滚到插入数据前的状态
	begin
	    set nocount on
	    begin TRAN
	    save tran abc
	        insert into table_1(name) values('aaa')
	        if @@error<>0
	            BEGIN
	                print'遇到错误正准备回滚'
	                waitfor delay '0:00:30'
	                rollback tran abc
	            END
	        ELSE
	            BEGIN
	                print'操作完毕'
	            END
	    commit TRAN
	END
```

（2）隐式事务

开启隐式事务的语法：

```sql
set implicit_transactions{on|off}
```

若设置为on，将自动连接设置为隐式事务模式
若设置为off，将连接恢复为自动提交事务模式

```
启动隐式声明的语句
```

| `Alter table` | `Fetch`  | `revoke`          |
| ------------- | -------- | ----------------- |
| `create`      | `grant`  | `select`          |
| `delete`      | `insert` | `Truncate  table` |
| `drop`        | `open`   | `uodate`          |

## 锁

**锁的概念**

锁是保护事务和数据的方式

可锁定的资源：行级锁，页级锁，extent级锁，表级锁，数据库级锁

**锁的类型**

（1）共享锁：用于不更改或不更新数据的选取操作；其他事务都只能读取数据

（2）更新锁：用于可更新的数据中，防止当多个事务在读取、锁定以及随后可能进行的数据源更新时发生常见的死锁

```sql
	【例10-5】使用更新锁阻止其他用户对数据表进行修改，但可以查询
	begin TRAN
	save tran aaa
	select * from table_1 with(updlock)
	rollback tran aaa
	commit TRAN
```

（3）排它锁：用于数据修改操作，确保不会同时对同一数据进行不同的更新；其他事务都无法修改数据

```sql
	【例10-6】使用排它锁阻止其他用户对数据表table_1进行访问
	BEGIN TRAN
	save tran aaa
	select * from table_1 with(tablockx xlock)
	rollback tran aaa
	commit tran 
```

（4）意向锁：【意向共享|意向排它|意向排它共享】
	-->防止其他事务以较低级别的锁无效的方式修改较高级别的资源
	-->提高数据库引擎在较高的粒度级别下检测锁冲突的效率
	
（5）架构锁：【架构修改锁|架构稳定性锁】执行依赖于表架构的操作时使用

（6）大容量更新锁：在向表进行大容量数据复制且指定了tablock提示时使用

（7）键范围锁：使用可序化事务隔离级别时保护查询读取的行范围



锁的描述

| `Holdlock`       | `将共享锁保留到事务完成`                                     |
| ---------------- | ------------------------------------------------------------ |
| `nolock`         | `不要发出共享锁，不要提供排它锁；仅用于select`               |
| `paglock`        | `使用单个表锁的地方使用页锁`                                 |
| `readlock`       | `跳过锁定行；仅用于select，用于运行在提交读隔离级别的事务`   |
| `repeatableread` | `用于运行在可重复读隔离级别的事务相同的锁语义执行扫描`       |
| `serializable`   | `用于运行在可串行读隔离级别的事务相同的锁语义执行扫描`       |
| `Tablock `       | `使用表锁代替粒度更细的行级锁或页级锁`                       |
| `tablockx`       | `使用表的排它锁`                                             |
| `updlock`        | `读取表时使用更新锁，不使用共享锁，将锁一直保留到语句或事务的结束` |
| `xlock`          | `使用排它锁，一直保持到由语句处理的所有数据上的事务结束`     |

**死锁的产生机制**

（1）当两个事务分别锁定了两个单独的对象，这时每一个事务都要求在另一个事务锁定的对象上获得一个锁，每个事务都必须等待另外一个事务释放占有的锁

（2）有若干个长时间运行的事务执行并行操作，当分析查询器处理一种非常复杂的查询，不能控制处理的顺序

**脏读**
若一个用户正在更新一条记录，第2个用户来读取这条更新了的记录，但第1个用户在更新了记录后，反悔不修改了，则回滚了刚才的更新；导致第2个用户实际上读取到一条根本不存在的修改记录

**不可重复读**
第1个用户在一次事务中读取同一记录两次，第1次读取一条记录后，有第2个用户来访问这条记录，并修改了这条记录，第1个用户在第2次读取这条记录时，得到与第1次不同的数据

**幻读**
第1个用户在一次事务中两次读取同样满足条件的一批记录，第一次读取一批数据后，有第2个用户来访问这个表，并在这个表中插入或删除了一下记录；第1，2个用户两次读取的结果可能不同



## 身份验证

**验证模式**：

```
（1）windows验证模式
（2）混合模式
 
```

**管理登录帐号**

```sql
	创建登录名
	create login Mr with PASSWORD='MrSoft'
	
	修改登录名
	alter login sa with password=''
	
	删除登录名
	drop login login_name
```

**数据库用户**

默认情况，数据库创建时就包含一个guest用户。guest用户不能删除，但可以通过在除master和temp以外的任何数据库中执行revokeconnect from guest来禁用该用户 

**Sql server角色**

（1）固定服务器角色
（2）固定数据库角色

## 数据备份与恢复

**数据的备份（数据库备份、差异数据库备份、事务日志备份）**

1)备份设备与备份方式

使用系统存储过程`sp_addumpdevice`添加物理备份设备

```sql
	语法：
	Sp_addumpdevice[@devtype=]'device_type'
              ,[@logicalname=]'logical_name'
              ,[@physicalname=]'physical_name'
```

[@devtype=]'device_type'：备份设备的类型，其数据类型为varchar(20)，无默认值，可取disk或tape
[@logicalname=]'logical_name'：在backup和restore语句中使用的备份设备逻辑名称，其数据类型为sysname，无默认值，且不能为NULL
[@physicalname=]'physical_name'：备份设备物理名称，包含完整路径，数据类型为nvarchar(260)，无默认值，且不能为NULL

```sql
【9.1】在E盘创建一个逻辑名称为“studscore_db_bak”的磁盘备份设备
sp_addumpdevice @device_type='disk',
@logicalname='studscore_db_bak',
@physicalname='E:\studscore_db_back.bak'
```

可使用sp_dropdevice删除数据库设备或备份设备，并从master.dbo.sysdevices中删除相应的项

```sql
语法：
Sp_dropdevice[@logicalname=]'device'
            ,[@delfile=]'delfile'
```

[@logicalname=]'device'：在master.dbo.sysdevices.name中列出数据库设备或备份设备的逻辑名称，device的数据类型为sysname，无默认值
[@delfile=]'delfile'：指定物理备份设备文件是否应删除，数据类型为varchar(7)

```sql
【例9.2】删除备份设备“studscore_db_bak”，并不删除相关的物理文件
sp_dropdevice 'studscore_db_bak'

【例9.3】删除备份设备“studscore_db_bak”，并删除相关的物理文件
sp_dropdevice 'studscore_db_bak','delfile'
```

**2)使用t-sql语句备份数据库**

（1）完全备份：可备份整个数据库，包括所有数据库对象

```sql
	语法：
	Backup database database_name to<backup_device>[,..n]
	功能：备份整个数据库到磁盘文件或逻辑备份设备
```

```sql
	【例9.4】直接完全备份数据库到磁盘
	backup database xscjgl_db to disk='xscjgl_db_full,bak'
	
	【例9.5】完全备份数据库到逻辑设备
	--在执行逻辑备份之前，需要创建逻辑备份设备
	sp_addumpdevice 'disk','xscjgl_db_full_bak',
	                'E:\xscjgl_db_fullbak.bak'
	--备份到逻辑设备
	backup database xscjgl_db to xscjgl_db_full_bak
```

（2）事务日志备份：备份事物日志，记录了数据库的改变

```sql
	语法：
	Backup log database_name to<backup_device>[,..n]
	功能：备份整个数据库到磁盘文件或逻辑备份设备
```

```sql
	【例9.6】直接备份日志到磁盘
	backup log xscjgl_db to disk='E:\xscjgl_db_log.bak'
	
【例9.7】备份日志到逻辑设备
	sp_addumpdevice 'disk','xscjgl_db_log','E:\xscjgl_db_log_bak.bak'
	backup log xscjgl_db to xscjgl_db_log
```

（3）差异备份：备份自上次完全备份以来所改变的数据库

```sql
	语法：
	Backup database database_name to<backup_device>[,..n]with differential
功能：仅复制自上一次完整数据库备份之后修改过的数据库页
```

```sql
	【例9.8】差异备份数据库到磁盘
	backup database xscjgl_db to disk='E:\xscjgl_db_diff.bak' with differential
	
	【例9.9】差异备份数据库到逻辑备份设备
	sp_addumpdevice 'disk','xscjgl_db_diff_bak','E:\xscjgl_db_diff_bak.bak'
backup database xscjgl_db to xscjgl_db_diff_bak with differential
```

（4）文件和文件组备份：如数据库由硬盘上的许多文件构成，可使用文件备份

```sql
	语法：
	Backup database database_name file=logical_file_name to<backup_device>[,..n]

backup database database_name filegroup=logical_fg_name to<backup_device>[,..n]
```

```sql
	【例9.10】备份数据库数据文件到E盘
	backup database xscjgl_db file='xscjgl_db_data' to disk ='E:\xscjgl_db_data.bak'
	
	【例9.11】备份文件组到E盘
	backup database xscjgl_db filegroup='primary' to disk ='E:\xscjgl_db_prifilegroup.bak'
```

3）使用sql server management studio创建数据库备份

4）使用sql server management studio自动备份数据库



**数据的恢复（简单恢复、完全恢复、大容量日志记录恢复）**

1）使用sql server management studio恢复数据库

2）使用sql语句恢复数据库

```sql
	可使用restore database语句进行数据库恢复
	
	语法：
	Restore database database_name [from <backup_device>[,..n]]
```

```sql
	【例9.12】备份数据库
	backup database xscjgl_db to disk='E:\xscjgl_db.bak'
	
	【例9.13】还原数据库
	--返回由备份集内包含的数据库和日志文件列表组成的结果集
	restore filelistonly from disk='E:\xscjgl_db.bak'
	
	【例9.14】还原由backup备份的数据库
	restore database xscjgl_db from disk='E:\xscjgl_db.bak'
	
	【例9.15】指定还原后的数据库物理文件名称和路径
	restore database testdb from disk='E:\xscjgl_db.bak'
	WITH [replace]
	MOVE 'xscjgl_db' to 'C:\xscjgl_db_data.mdf',
	MOVE 'xscjgl_db_log' to 'C:\xscjgl_db_log.ldf'
	--若加上参数replace，则表示在现有基础上强制还原
```

## 管理SQL权限

**授予权限(grant)**

```sql
	【例8.9】把查询学生表的权限授予用户le
	use 学生成绩管理数据库
	GO
	GRANT select
	to le
	GO
	
	【例8.10】给学生成绩管理数据库上的用户le授予创建表的权限
	use 学生成绩管理数据库
	GO
	GRANT create table
	to le
	GO
	
	【例8.11】把学生表的全部操作权限授予用户le
	use 学生成绩管理数据库
	GO
	GRANT all privileges on 学生表
	to le
	GO

```

**禁止权限(deny)**

```sql
【例8.14】拒绝用户le对学生表的insert权限
	use 学生成绩管理数据库
	GO
	deny insert on 学生表 to le
	GO
```



**撤销权限(revoke)**

```sql
	【例8.12】把用户le修改学生表姓名的权限撤销
	use 学生成绩管理数据库
	GO
	REVOKE update(studname) on 学生表 from le
	GO
	
	【例8.13】把用户le对学生表的insert权限撤销
	use 学生成绩管理数据库
	GO
	REVOKE insert on 学生表 from le CASCADE
	GO
```





