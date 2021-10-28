# 1. 安装

[VisualSVN Server | Download](https://www.visualsvn.com/server/download/)

[Home · TortoiseSVN](https://tortoisesvn.net/)

# 2.  创建用户

## 添加用户

![image-20211028153243429](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281532803.png)

# 3. 创建仓库

![image-20211028153308329](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281533469.png)

## 权限设置

![image-20211028153323810](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281533816.png)

## 绑定用户

![image-20211028153342697](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281533082.png)

# 4. 下载

![image-20211028153411138](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281534330.png)

```Git
SVN Update 更新
```

![image-20211028153435736](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281534953.png)

# 5. 上传

![image-20211028153458389](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281534971.png)

### 清除身份验证数据

![image-20211028153518807](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281535038.png)

# IDEA使用SVN

[IDEA中使用SVN IDEA配置SVN步骤_BlogGao-CSDN博客_idea svn](https://blog.csdn.net/weixin_49343190/article/details/112519073?utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-1.no_search_link)

[TortoiseSVN](https://tortoisesvn.net/docs/release/TortoiseSVN_zh_CN/index.html)

# HOOK

[windows下svn强制写日志hook脚本增强版（空格过滤）_goldboar的专栏-CSDN博客](https://blog.csdn.net/goldboar/article/details/7086964)

![image-20211028153704646](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281537074.png)

```shell
@echo off  
setlocal

set REPOS=%1  
set TXN=%2           

rem 保证输入8个字符
svnlook log %REPOS% -t %TXN% | findstr "........" > nul
if %errorlevel% gtr 0 goto :err_action

rem 过滤空格字符
svnlook log %REPOS% -t %TXN% | findstr /ic:"        " > nul
if %errorlevel% gtr 0 goto :success

:err_action
echo 你本次版本提交未填写任何变更的日志说明信息.      >&2
echo 请补充日志说明信息后再提交代码,例如:功能说明等.  >&2
echo 输入的日志信息不少于8个字符说明(或4个汉字),谢谢! >&2
echo *******************禁止空格数据***************** >&2

goto :err_exit

:err_exit
exit 1

:success
exit 0
```

