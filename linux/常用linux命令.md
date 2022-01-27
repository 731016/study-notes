```shell
#解压
tar -zxvf XXX.gz -C 指定目录
#查看指定端口
netstat -lnp | grep 8080
#查看指定进程
ps -ef | grep tomcat
#kill 进程
kill -9 进程号
##执行sh文件 若权限,需要授权
./
sh
#命令行上传文件
rz
```

### 打包

```text
war 
	build->build artifacts->build,默认war包,路径在out
	(1)web application:exploded 本地用,可修改
	(2)web application:archive √ 发布用,不可修改
jar maven->clean->packagr 默认是jar ,路径在out里面
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

