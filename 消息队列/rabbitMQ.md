## OTP下载

[Downloads - Erlang/OTP](https://www.erlang.org/downloads)

## rabbit下载

[Installing on Windows — RabbitMQ](https://www.rabbitmq.com/install-windows.html)

[RabbitMQ Erlang Version Requirements — RabbitMQ](https://www.rabbitmq.com/which-erlang.html)

## 版本对照

[RabbitMQ Erlang Version Requirements — RabbitMQ](https://www.rabbitmq.com/which-erlang.html)



## 安装步骤

[(13条消息) RabbitMQ消息队列下载安装（Windows版本）_IT生涯——知其然知其所以然-CSDN博客_rabbitmq windows下载](https://blog.csdn.net/ring300/article/details/82802017)

[(13条消息) 安装RabbitMQ电脑用户中文命名导致启动不了服务解决方案（可以解决）_leoma2012的博客-CSDN博客_rabbitmq服务名无效](https://blog.csdn.net/leoma2012/article/details/97636859)<img src="https://gitee.com/LovelyHzz/imgSave/raw/master/note/202112071126723.png" alt="image-20211207112636904" style="zoom: 80%;" />



## rabbit简单模式

### maven

```xml
<dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
        </dependency>
```

#### 工具类

```java
public class RabbitConnection {
    public static Connection getCon() throws IOException, TimeoutException {
        //创建连接工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        //主机地址;默认为 localhost
        connectionFactory.setHost("localhost");
        //连接端口;默认为 5672
        connectionFactory.setPort(5672);
        //虚拟主机名称;默认为 /
        connectionFactory.setVirtualHost("/");
        //连接用户名；默认为guest
        connectionFactory.setUsername("guest");
        //连接密码；默认为guest
        connectionFactory.setPassword("guest");

        return connectionFactory.newConnection();
    }
}
```

### 生产者

#### 发送消息

```java
@SpringBootTest
public class Publish1 {
    @Test
    public void Test1() throws IOException, TimeoutException {
        Connection conn = RabbitConnection.getCon();

        Channel channel = conn.createChannel();

        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        channel.queueDeclare("SIMP_QUEUE", true, false, false, null);

        /**
         * 参数1：交换机名称，如果没有指定则使用默认Default Exchage
         * 参数2：路由key,简单模式可以传递队列名称
         * 参数3：消息其它属性
         * 参数4：消息内容
         */

        String msg = new String("你好，小白兔！");
        channel.basicPublish("", "SIMP_QUEUE", null, msg.getBytes());
        System.out.println("已发送消息：" + msg);

        channel.close();
        conn.close();
    }
}
```

### 消费者

> 使用main函数！使用@test会吞掉system.out.println的打印结果

```java
class AcceptTest {
    public static final String QUEUE_NAME = "SIMP_QUEUE";
    public static Connection connection =null;
    public static Channel channel = null;
    @BeforeEach
    void setUp() {
        try {
            connection = RabbitConnection.getCon();
            channel = connection.createChannel();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void acceptTest() {
        try {
            // 声明（创建）队列
            /**
             * 参数1：队列名称
             * 参数2：是否定义持久化队列
             * 参数3：是否独占本次连接
             * 参数4：是否在不使用的时候自动删除队列
             * 参数5：队列其它参数
             */
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);

            //创建消费者；并设置消息处理
            DefaultConsumer consumer = new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    //路由key
                    System.out.println("路由key为：" + envelope.getRoutingKey());
                    //交换机
                    System.out.println("交换机为：" + envelope.getExchange());
                    //消息id
                    System.out.println("消息id为：" + envelope.getDeliveryTag());
                    //收到的消息
                    System.out.println("接收到的消息为：" + new String(body, "utf-8"));
                }
            };
            //监听消息
            /**
             * 参数1：队列名称
             * 参数2：是否自动确认，设置为true为表示消息接收到自动向mq回复接收到了，mq接收到回复会删除消息，设置为false则需要手动确认
             * 参数3：消息接收到后回调
             */
            channel.basicConsume(QUEUE_NAME,true,consumer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 工作队列模式

### 生产者

```java
String msg = new String("你好，小白兔！");
        for (int i = 0; i < 20; i++) {
            channel.basicPublish("", QUEUE_NAME, null, (msg + i).getBytes("UTF-8"));
            System.out.println("已发送消息："+ i + msg);
        }
```

### 消费者

```java
channel.basicQos(1);
```

## 订阅模式

### 生产者

```java
class Publish1Test {

    public static void main(String[] args) throws IOException, TimeoutException {
        Connection conn = RabbitConnection.getCon();
        Channel channel = conn.createChannel();
        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        // 广播模式
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.FANOUT,false);

        channel.queueDeclare(QUEUE_NAME1, true, false, false, null);
        channel.queueDeclare(QUEUE_NAME2, true, false, false, null);
        // 交换机绑定队列
        channel.queueBind(QUEUE_NAME1,EXCHANGE_NAME,"");
        channel.queueBind(QUEUE_NAME2,EXCHANGE_NAME,"");

        /**
         * 参数1：交换机名称，如果没有指定则使用默认Default Exchage
         * 参数2：路由key,简单模式可以传递队列名称
         * 参数3：消息其它属性
         * 参数4：消息内容
         */

        String msg = new String("你好，小白兔！");
        for (int i = 0; i < 20; i++) {
            channel.basicPublish(EXCHANGE_NAME, "", null, (msg + i).getBytes("UTF-8"));
            System.out.println("已发送消息："+ i + msg);
        }
        channel.close();
        conn.close();
    }

    public static final String EXCHANGE_NAME = "EX1";
    public static final String QUEUE_NAME1 = "Q1";
    public static final String QUEUE_NAME2 = "Q2";
    public static Connection conn = null;
    public static Channel channel = null;


    @BeforeEach
    void setUp() throws IOException, TimeoutException {
        conn = RabbitConnection.getCon();
        channel = conn.createChannel();
    }

    @AfterEach
    void tearDown() throws IOException, TimeoutException {
        channel.close();
        conn.close();
    }

    @Test
    void test1() throws IOException {
        // 声明（创建）队列
        /**
         * 参数1：队列名称
         * 参数2：是否定义持久化队列
         * 参数3：是否独占本次连接
         * 参数4：是否在不使用的时候自动删除队列
         * 参数5：队列其它参数
         */
        // 广播模式
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.FANOUT,false);

        channel.queueDeclare(QUEUE_NAME1, true, false, false, null);
        channel.queueDeclare(QUEUE_NAME2, true, false, false, null);
        // 交换机绑定队列
        channel.exchangeBind(EXCHANGE_NAME,QUEUE_NAME1,"");
        channel.exchangeBind(EXCHANGE_NAME,QUEUE_NAME2,"");

        /**
         * 参数1：交换机名称，如果没有指定则使用默认Default Exchage
         * 参数2：路由key,简单模式可以传递队列名称
         * 参数3：消息其它属性
         * 参数4：消息内容
         */

        String msg = new String("你好，小白兔！");
        for (int i = 0; i < 20; i++) {
            channel.basicPublish(EXCHANGE_NAME, "", null, (msg + i).getBytes("UTF-8"));
            System.out.println("已发送消息："+ i + msg);
        }
    }
}
```

### 消费者

```java
public class Accept {
    private static final String QUEUE_NAME = "Q2";
    private static final String EXCHANGE_NAME = "EX1";

    public static void main(String[] args) {
        try {
            Connection connection = RabbitConnection.getCon();

            Channel channel = connection.createChannel();

            // 声明（创建）队列
            /**
             * 参数1：队列名称
             * 参数2：是否定义持久化队列
             * 参数3：是否独占本次连接
             * 参数4：是否在不使用的时候自动删除队列
             * 参数5：队列其它参数
             */
            channel.exchangeDeclare(EXCHANGE_NAME,BuiltinExchangeType.FANOUT,false);
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"");

            //创建消费者；并设置消息处理
            DefaultConsumer consumer = new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    //路由key
                    System.out.println("路由key为：" + envelope.getRoutingKey());
                    //交换机
                    System.out.println("交换机为：" + envelope.getExchange());
                    //消息id
                    System.out.println("消息id为：" + envelope.getDeliveryTag());
                    //收到的消息
                    System.out.println("接收到的消息为：" + new String(body, "utf-8"));
                }
            };
            //监听消息
            /**
             * 参数1：队列名称
             * 参数2：是否自动确认，设置为true为表示消息接收到自动向mq回复接收到了，mq接收到回复会删除消息，设置为false则需要手动确认
             * 参数3：消息接收到后回调
             */
            channel.basicConsume(QUEUE_NAME,true,consumer);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }
}
```

## 路由模式

