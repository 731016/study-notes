### 常用命令

```shell
#解压
tar -zxvf XXX.gz -C 指定目录
#查看指定端口
netstat -lnp | grep 8080
#查看指定进程信息
ps -aux | grep tomcat
ps -ef | grep tomcat
lsof -i:pid
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
#从光标开始删除,到行尾
$ ctrl+k
#剪切光标所处位置到当前行末尾
d$
#复制选中的
y
#复制当前行
yy
#全选复制
ggvG或者ggVG
#全选删除
dG
#替换 g全局 c确认 s替换
$ :%s/oldstring/newstring/g
#移动到行尾
$
#给shell脚本文件赋权
chmod 777 xxx
#重命名文件
$ rename oldfile newfile
$ mv oldfile newfile
#移动多个文件
mv a b c -t 新的目录
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

#启动
进入src目录
$ sh redis-server
#客户端
$ sh redis-cli
#后台启动
修改redis.conf文件内的daemonize yes
$ ./redis-server ./redis.conf
```

### 安装kafka

```shell
wget http://labfile.oss.aliyuncs.com/courses/859/kafka_2.10-0.10.2.1.tgz

tar -zxvf kafka_2.10-0.10.2.1.tgz 

cd kafka_2.11-2.0.0/config/

#server.properties
broker.id=0
port=9092 #端口号
host.name=172.30.0.9 #服务器IP地址，修改为自己的服务器IP
log.dirs=/usr/local/logs/kafka #日志存放路径，上面创建的目录
zookeeper.connect=localhost:2181 #zookeeper地址和端口，单机配置部署，localhost:2181

#zookeeper.properties
mkdir /usr/local/kafka/zookeeper #创建zookeeper目录
mkdir /usr/local/kafka/log/zookeeper #创建zookeeper日志目录
cd /usr/local/kafka/config #进入配置目录
vi zookeeper.properties #编辑修改相应的参数

dataDir=/usr/local/kafka/zookeeper #zookeeper数据目录
dataLogDir=/usr/local/kafka/log/zookeeper #zookeeper日志目录
clientPort=2181
maxClientCnxns=100
tickTime=2000
initLimit=10
syncLimit=5

#kafkastart.sh
#!/bin/bash
#启动zookeeper
/root/tuaofei/kafka_2.11-2.0.0/bin/zookeeper-server-start.sh /root/tuaofei/kafka_2.11-2.0.0/config/zookeeper.properties &
sleep 3
#启动kafka
/root/tuaofei/kafka_2.11-2.0.0/bin/kafka-server-start.sh /root/tuaofei/kafka_2.11-2.0.0/config/server.properties &

#kafkastop.sh
#!/bin/bash
#启动zookeeper
/root/tuaofei/kafka_2.11-2.0.0/bin/zookeeper-server-stop.sh /root/tuaofei/kafka_2.11-2.0.0/config/zookeeper.properties &
sleep 3
#启动kafka
/root/tuaofei/kafka_2.11-2.0.0/bin/kafka-server-stop.sh /root/tuaofei/kafka_2.11-2.0.0/config/server.properties &

#测试kafka脚本
#参考链接
https://segmentfault.com/a/1190000020723761
https://www.jianshu.com/p/67f9b612dc3b
###############################################################
#!/bin/bash 
kafka_input = "n" 
while [[ $kafka_input != "y" ]]; do 
        read -e -p "请选择:1)创建topic 2)查看topic 3)发送消息 4)消费消息 0)退出" user_input 
        if [[ $user_input == "0" ]]; then exit;fi 
        if [[ $user_input == "1" ]]; then 
                 
                #创建一个Topic,创建一个副本数为1，分区数为1的，名字为test的topic 
                read -e -p "输入端口号:" zook_post 
                read -e -p "输入要创建的副本数:" replication_factor 
                read -e -p "输入要创建的分区数:" partitions 
                read -e -p "输入要创建名称:" zook_name 
                if [ $? -eq 0 ]; then 
                        echo "创建topic完成!" 
                        sleep 3 
                else 
                        echo "topic创建失败!" 
                fi 
        fi 
        if [[ $user_input == "2" ]];then 
                #查看topic 
                /root/tuaofei/kafka_2.11-2.0.0/bin/kafka-topics.sh --list --zookeeper localhost:2181             
                if [ $? -eq 0 ]; then 
                        echo "查看topic" 
                        sleep 3 
                else 
                        echo "查看topic失败!" 
                fi 
        fi 
        if [[ $user_input == "3" ]]; then 
                #发生消息 
                /root/tuaofei/kafka_2.11-2.0.0/bin/kafka-console-producer.sh --broker-list hostname:9092 --topic test 
                if [ $? -eq 0 ]; then 
                        echo "已发送消息,准备消费消息" 
                        sleep 3 
                else 
                        echo "发送消息失败!" 
                fi 
        fi 
        if [[ $user_input == "4" ]]; then 
                #消费消息 
                /root/tuaofei/kafka_2.11-2.0.0/bin/kafka-console-consumer.sh --bootstrap-server hostname:9092 --topic test --from-beginning 
                if [ $? -eq 0 ]; then 
                        echo "已消费消息" 
                        sleep 3 
                else 
                        echo "消费消息失败!" 
                fi               
        fi 
done
###############################################################
```

### 安装并测试nginx负载均衡

```shell
wget http://learning.happymmall.com/nginx/linux-nginx-1.10.2.tar.gz
tar -zxvf linux-nginx-1.10.2.tar.gz

cd nginx-1.10.2/
./configure
#编译
make
---------------------------------------------------------------------
#报错
make: *** No rule to make target `build', needed by `default'.  Stop.
yum -y install make zlib-devel gcc-c++ libtool openssl openssl-devel
重新编译
---------------------------------------------------------------------
#安装
make install

#开启服务并测试
[root@localhost nginx-1.6.3]# cd /
[root@localhost /]# ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  newfile  newFile  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@localhost /]# cd usr/
[root@localhost usr]# ls
bin  etc  games  include  lib  lib64  libexec  local  sbin  share  src  tmp
[root@localhost usr]# cd local/
[root@localhost local]# ls
bin  etc  games  include  lib  lib64  libexec  man  nginx  sbin  share  src
[root@localhost local]# cd nginx/
[root@localhost nginx]# ls
conf  html  logs  sbin
[root@localhost nginx]# cd sbin/
[root@localhost sbin]# ls
nginx

$ ./nginx
#默认80端口,即可访问

firewall-cmd --zone=public --add-port=80/tcp --permanent  

# 命令含义：
--zone #作用域
--add-port=80/tcp  #添加端口，格式为：端口/通讯协议
--permanent   #永久生效，没有此参数重启后失效
 
# 重启防火墙
    systemctl stop firewalld.service  
    systemctl start firewalld.service  

# 查看端口是否开放
firewall-cmd --list-ports


#nginx.conf
--------------------------------------------------------------------
upstream testTomcat{
		#每个访问客户端固定一个后端服务器,防止session丢失
        #ip-hash;
        #web请求会被转发到连接数最少的服务器上
        least_conn;
        #设置分权,权重越高优先访问
        server 192.168.42.220:8888 weight=1;
        server 192.168.42.220:8887 weight=1;

        }

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
            #使用test分配规则,自定义添加的upstream节点
            proxy_pass http://testTomcat/;
        }
------------------------------------------------------------------------------
#重启nginx
$ /usr/local/nginx/sbin/nginx -s reload
```

