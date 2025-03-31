## maven引入

```xml
<dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
</dependency>
```

## 配置一个数据采集-推送-消费的流程

[kafaka示例代码](https://github.com/731016/springboot-backend-example/tree/main/src/main/java/com/xiaofei/springbootinit/example/kafka)

### 目录结构

![image-20250331084250189](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331084250189.png)

## 配置kafka集群

https://blog.csdn.net/weixin_53269650/article/details/142088476

**配置kafka集群节点**

复制默认配置config/server.properties文件，分别设置3个server1~3的配置文件

```
3个主要配置
# The id of the broker. This must be set to a unique integer for each broker.
修改节点id
broker.id=1

修改通信端口号
# The address the socket server listens on. If not configured, the host name will be equal to the value of
# java.net.InetAddress.getCanonicalHostName(), with PLAINTEXT listener name, and port 9092.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
listeners=PLAINTEXT://:9092

设置日志文件路径
# A comma separated list of directories under which to store log files
log.dirs=D:/tools/kafka_2.13-3.7.2/kafka-logs/kafka1/logs复制❌！已复制！
```

启动脚本

```cmd
@echo off
title Kafka Cluster Starter
setlocal enabledelayedexpansion

:: 设置 KAFKA_HOME（请修改为你的 Kafka 安装路径）
set KAFKA_HOME=D:\tools\kafka_2.13-3.7.2

:: 启动 Kafka 集群
echo Starting Kafka Cluster...

:: 启动第一个 Kafka 节点
start "kafka1" %KAFKA_HOME%\bin\windows\kafka-server-start.bat %KAFKA_HOME%\config\server1.properties
echo Started Kafka Broker 1
timeout /t 10

:: 启动第二个 Kafka 节点
start "kafka2" %KAFKA_HOME%\bin\windows\kafka-server-start.bat %KAFKA_HOME%\config\server2.properties
echo Started Kafka Broker 2
timeout /t 10

:: 启动第三个 Kafka 节点
start "kafka3" %KAFKA_HOME%\bin\windows\kafka-server-start.bat %KAFKA_HOME%\config\server3.properties
echo Started Kafka Broker 3

echo.
echo Kafka cluster is starting...
echo Please wait for all brokers to initialize...
timeout /t 10

:: 验证集群状态
echo Checking cluster status...
call %KAFKA_HOME%\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --list

echo.
echo Kafka cluster startup completed.
endlocal复制❌！已复制！
```

[Kafka 中 Zookeeper 的作用？ - 消息队列面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801255316257841153/question/1803079507444752385#heading-0)

**配置zookeeper集群节点**

复制默认配置config/zookeeper.properties文件，分别设置3个zookeeper1~3的配置文件

```properties
# the directory where the snapshot is stored.
指定 ZooKeeper 数据存储的目录。
dataDir=D:/tools/kafka_2.13-3.7.2/zookeeper-logs/zk1
# the port at which the clients will connect
指定 ZooKeeper 客户端连接的端口
clientPort=2181

# 集群配置
初始化连接的超时时间（以 tickTime 为单位）
initLimit=5
Follower 与 Leader 同步的超时时间（以 tickTime 为单位）。
syncLimit=2
tickTime=2000
定义 ZooKeeper 集群中的节点信息,【集群内部通信的端口（Follower 与 Leader 之间的通信）：选举 Leader 的端口（用于 ZooKeeper 的 Leader 选举机制）】
server.1=localhost:2888:3888
server.2=localhost:2889:3889
server.3=localhost:2890:3890复制❌！已复制！
```

启动脚本

```cmd
@echo off
title ZooKeeper Cluster Starter

:: 设置 KAFKA_HOME
set KAFKA_HOME=D:\tools\kafka_2.13-3.7.2

:: 启动 ZooKeeper 集群
start "zookeeper1" %KAFKA_HOME%\bin\windows\zookeeper-server-start.bat %KAFKA_HOME%\config\zookeeper1.properties
timeout /t 5
start "zookeeper2" %KAFKA_HOME%\bin\windows\zookeeper-server-start.bat %KAFKA_HOME%\config\zookeeper2.properties
timeout /t 5
start "zookeeper3" %KAFKA_HOME%\bin\windows\zookeeper-server-start.bat %KAFKA_HOME%\config\zookeeper3.properties

echo ZooKeeper cluster is starting...
echo Please wait...
timeout /t 10
echo ZooKeeper cluster has been started.
```