### 常用命令

```shell
#解压
tar -zxvf XXX.gz -C 指定目录
#查看指定端口
netstat -lnp | grep 8080
#查看指定进程信息
ps -aux | grep tomcat
ps -ef | grep tomcat
#kill 进程
kill -9 进程号
##执行sh文件 若权限,需要授权
./
sh
#命令行上传文件
rz
#查看当前文件夹下的文件大小
du -sh *
#查看操作系统版本
uname -a
#创建层级文件夹
mkdir -p xxx/xxx
#撤销上一步的操作
u
#恢复上一步被撤销的操作
ctrl+r
#粘贴到游标后
p
#粘贴到游标前
P
#删除当前行
dd
#删除当下向下几行
ndd
#剪切光标所处位置到当前行末尾
d$
```

### 打包

```text
war 
	build->build artifacts->build,默认war包,路径在out
	(1)web application:exploded 本地用,可修改
	(2)web application:archive √ 发布用,不可修改
jar maven->clean->packagr 默认是jar ,路径在out里面
	只能有主类的项目于可以运行,如spring需要有main方法
```

### 运行tomcat

```shell
-rw-r--r--. 1 root root 9455895 Jan 26 17:58 apache-tomcat-8.0.53.tar.gz
-rw-r--r--. 1 root root  805253 Jan 26 18:00 nginx-1.6.3.tar.gz
drwxr-xr-x. 2 root root       6 Jan 26 18:07 tomcat
[root@localhost tuaofei]# tar -zxvf apache-tomcat-8.0.53.tar.gz -C ./tomcat/

[root@localhost tuaofei]# cd tomcat/
[root@localhost tomcat]# ll
total 0
drwxr-xr-x. 9 root root 160 Jan 26 18:08 apache-tomcat-8.0.53
[root@localhost tomcat]# cd apache-tomcat-8.0.53/bin/
[root@localhost bin]# ll
total 836
-rw-r--r--. 1 root root  34873 Jun 29  2018 bootstrap.jar
-rw-r--r--. 1 root root  15912 Jun 29  2018 catalina.bat
-rwxr-xr-x. 1 root root  23353 Jun 29  2018 catalina.sh
-rw-r--r--. 1 root root   1647 Jun 29  2018 catalina-tasks.xml
-rw-r--r--. 1 root root  25145 Jun 29  2018 commons-daemon.jar
-rw-r--r--. 1 root root 207125 Jun 29  2018 commons-daemon-native.tar.gz
-rw-r--r--. 1 root root   2040 Jun 29  2018 configtest.bat
-rwxr-xr-x. 1 root root   1922 Jun 29  2018 configtest.sh
-rwxr-xr-x. 1 root root   8509 Jun 29  2018 daemon.sh
-rw-r--r--. 1 root root   2091 Jun 29  2018 digest.bat
-rwxr-xr-x. 1 root root   1965 Jun 29  2018 digest.sh
-rw-r--r--. 1 root root   3460 Jun 29  2018 setclasspath.bat
-rwxr-xr-x. 1 root root   3680 Jun 29  2018 setclasspath.sh
-rw-r--r--. 1 root root   2020 Jun 29  2018 shutdown.bat
-rwxr-xr-x. 1 root root   1902 Jun 29  2018 shutdown.sh
-rw-r--r--. 1 root root   2022 Jun 29  2018 startup.bat
-rwxr-xr-x. 1 root root   1904 Jun 29  2018 startup.sh
-rw-r--r--. 1 root root  49038 Jun 29  2018 tomcat-juli.jar
-rw-r--r--. 1 root root 408967 Jun 29  2018 tomcat-native.tar.gz
-rw-r--r--. 1 root root   4586 Jun 29  2018 tool-wrapper.bat
-rwxr-xr-x. 1 root root   5495 Jun 29  2018 tool-wrapper.sh
-rw-r--r--. 1 root root   2026 Jun 29  2018 version.bat
-rwxr-xr-x. 1 root root   1908 Jun 29  2018 version.sh

[root@localhost bin]# sh startup.sh
Using CATALINA_BASE:   /root/tuaofei/tomcat/apache-tomcat-8.0.53
Using CATALINA_HOME:   /root/tuaofei/tomcat/apache-tomcat-8.0.53
Using CATALINA_TMPDIR: /root/tuaofei/tomcat/apache-tomcat-8.0.53/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /root/tuaofei/tomcat/apache-tomcat-8.0.53/bin/bootstrap.jar:/root/tuaofei/tomcat/apache-tomcat-8.0.53/bin/tomcat-juli.jar
Tomcat started.

访问http://xxx.xxx.xx.xxx:8080

[root@localhost bin]# sh shutdown.sh
Using CATALINA_BASE:   /root/tuaofei/tomcat/apache-tomcat-8.0.53
Using CATALINA_HOME:   /root/tuaofei/tomcat/apache-tomcat-8.0.53
Using CATALINA_TMPDIR: /root/tuaofei/tomcat/apache-tomcat-8.0.53/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /root/tuaofei/tomcat/apache-tomcat-8.0.53/bin/bootstrap.jar:/root/tuaofei/tomcat/apache-tomcat-8.0.53/bin/tomcat-juli.jar

#参考该文档修改servce.xml
https://blog.csdn.net/Tritoy/article/details/81705759

#日志滚动运行
[root@localhost webapps]# sh ../bin/catalina.sh run
#正常运行,不显示日志
[root@localhost webapps]# sh ../bin/startup.sh
#日志位于logs里面的catalina.out
```

### 安装redis

```shell

```



```shell
$ wget http://download.redis.io/releases/redis-6.0.6.tar.gz
$ mkdir redis
$ tar -vxzf redis-6.0.6.tar.gz -C redis
$ cd redis-6.0.6
$ make

#报错
server.c:5191:24: error: ‘struct redisServer’ has no member named ‘masterhost’
             if (!server.masterhost) {
             
#果当前的gcc版本不是5.3以上，执行下面命令更新gcc版本
#升级到 5.3及以上版本
yum -y install centos-release-scl
yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils

scl enable devtoolset-9 bash

#再进入到redis的解压目录下的src目录，执行
make #即可编译成功

#报错
You need tcl 8.5 or newer in order to run the Redis test
#1.直接安装新的tcl,命令如下:
yum install -y tcl-devel
#2.清空之前的make的缓存命令:
make distclean
#3.重新make编译命令:
make
#4.结束后重新测试命令:
make test

#报错
Executing test client: wrong # args: should be "close channelId"

#安装tcl8.6
```

