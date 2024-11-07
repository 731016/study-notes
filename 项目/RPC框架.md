## 1、RPC框架实现思路

RPC：远程过程调用，简化调用



编程导航：https://www.codefather.cn/course/1768543954720022530

代码地址：https://github.com/731016/xiaofei.site-rpc

### 基本设计



消费者需要调用提供者，需要提供者启动一个`web服务`，通过`请求客户端`发送http或其他协议的请求来调用



可以提供一个统一的服务调用接口，通过`请求处理器`，根据客户端的请求参数来进行不同的处理、调用不同的服务和方法



维护一个`本地服务注册器`，记录服务和对应实现类的映射

```java
调用orderService服务的order,方法，可设置参数为service=orderService,medthod=order
请求处理器找到服务注册器中对应的服务实现类，并通过java反射机制调用method指定方法
```

> java对象无法直接在网络中传输，需要通过`序列化`和`反序列化`



为简化消费者发起请求的代码，可通过代理模式，为消费者需要调用的接口生成一个代理对象，由代理对象完成请求和响应

![image-20241016222934422](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241016222934422.png)

### 扩展设计

#### 服务注册与发现

> 消费者需要知道服务提供者的调用地址？

需要`注册中心`保持服务提供者的地址，需要调用时，从注册中心获取



![image-20241016224559125](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241016224559125.png)

使用Redis、zookeeper、nacos



#### 负载均衡

> 如果存在多个服务提供者，消费者应该调用哪个服务提供者？

通过指定不同的算法来决定调用哪个服务提供者，比如轮询、随机、根据性能动态调用

![image-20241016225018742](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241016225018742.png)

#### 容错机制

> 如果服务服务调用失败，怎么处理？

保证分布式系统的高可用，通常会增加容错机制，如失败重试、降级调用其它接口...

![image-20241016230806725](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241016230806725.png)

#### 其它

+ 服务提供着下线了怎么办？需要一个失效节点剔除机制

+ 消费者每次都从注册中心拉取信息，性能是否会变差？使用缓存优化
+ 优化RPC框架的传输通信性能？选择合适的网络框架、自定义协议头、节约传输体积
+ 保持可扩展性？使用Java的SPI机制、配置化



## 开发部署（简易版）



![image-20241019000313646](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019000313646.png)

### 准备项目

#### 1.初始化

准备

```java
xiaofei.site-rpc maven项目 父级maven项目，存储公共依赖
rpc-common	公共模块，接口、model
rpc-consumer消费者，使用远程服务
rpc-provider服务提供者，接口具体实现
rpc-system rpc框架
```

#### 2.公共模块

公共模块需要被`消费者`和`服务提供者`引用



整体结构

![image-20241019001042414](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019001042414.png)

（1）编写实体类User

```java
package site.xiaofei.common.model;

import java.io.Serializable;

/**
 * @author tuaofei
 * @description 用户
 * @date 2024/10/17
 */
public class User implements Serializable {
    
    private static final long serialVersionUID = -5571881012294210153L;

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

> 注意：实现Serializable接口，为后续网络传输序列化提供支持

> serialVersionUID适用于java序列化机制。简单来说，JAVA序列化的机制是通过 判断类的serialVersionUID来验证的版本一致的。在进行反序列化时，JVM会把传来的字节流中的serialVersionUID于本地相应实体类的serialVersionUID进行比较。如果相同说明是一致的，可以进行反序列化，否则会出现反序列化版本一致的异常，即是InvalidCastException。

**具体序列化的过程是这样的：**序列化操作时会把系统当前类的serialVersionUID写入到序列化文件中，当反序列化时系统会自动检测文件中的serialVersionUID，判断它是否与当前类中的serialVersionUID一致。如果一致说明序列化文件的版本与当前类的版本是一样的，可以反序列化成功，否则就失败



(2)编写用户服务接口UserService,提供一个获取用户的方法

```java
package site.xiaofei.common.service;

import site.xiaofei.common.model.User;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/17
 */
public interface UserService {

    /**
     * 获取用户
     * @param user
     * @return
     */
    User getUser(User user);
}
```



#### 3.xiaofei.site-rpc父级maven项目

（1）pom.xml

准备公共依赖，统一依赖版本，子模块需要用到的地方不用再自己定义版本

```xml
<properties>
        <hutool-version>5.8.16</hutool-version>
        <lombok-version>1.18.30</lombok-version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool-version}</version>
            </dependency>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok-version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```





#### 4.服务提供者

真正实现接口的模块



（1）pom.xml

```xml
<dependencies>
        <dependency>
            <groupId>xiaofei.site</groupId>
            <artifactId>rpc-system</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>xiaofei.site</groupId>
            <artifactId>rpc-common</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
```

（2）编写服务实现类，实现公共模块中定义的用户服务接口

```java
package site.xiaofei.provider;

import site.xiaofei.common.model.User;
import site.xiaofei.common.service.UserService;

/**
 * @author tuaofei
 * @description 服务提供者
 * @date 2024/10/17
 */
public class UserServiceImpl implements UserService {
    @Override
    public User getUser(User user) {
        if (user == null){
            return null;
        }
        System.out.println(String.format("用户名：%s",user.getName()));
        return user;
    }
}
```

（3）编写服务提供者启动类RpcProviderExample，提供启动服务提供者的方法

```java
package site.xiaofei.provider;

import site.xiaofei.common.service.UserService;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/17
 */
public class RpcProviderExample {

    public static void main(String[] args) {
        //提供服务
    }
}
```

服务提供者模块目录

![image-20241019002554772](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019002554772.png)

#### 5.服务消费者

需要调用服务的模块

（1）pom.xml

```xml
<dependencies>
        <dependency>
            <groupId>xiaofei.site</groupId>
            <artifactId>rpc-system</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>xiaofei.site</groupId>
            <artifactId>rpc-common</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
```



(2)创建消费者启动类RpcConsumerExample，编写调用接口的代码

```java
package site.xiaofei.consumer;

import site.xiaofei.common.model.User;
import site.xiaofei.common.service.UserService;

/**
 * @author tuaofei
 * @description 消费者
 * @date 2024/10/17
 */
public class RpcConsumerExample {

    public static void main(String[] args) {
        //todo 需要获取UserService实现类的对象
        UserService userService = null;

        User user = new User();
        user.setName("土澳菲");
        User resultUser = userService.getUser(user);
        if (resultUser != null){
            System.out.println(resultUser.getName());
        }else{
            System.out.println("user is null!");
        }
    }
}
```

现在肯定无法获取，先预留null；后续通过rpc框架，获取一个支持远程调用服务提供者的代理对象，快速调用



服务消费者目录结构

![image-20241019003131124](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019003131124.png)



### web服务器

服务提供者需要提供远程服务，必须要一个web服务器，能够接收、处理、响应请求



选择有很多，比如tomcat、NIO框架Netty、Vert.x



这里选择Vert.x，官方文档：[Eclipse Vert.x (vertx.io)](https://vertx.io/)



（1）打开rpc-system模块，引入依赖

```xml
<dependencies>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>io.vertx</groupId>
            <artifactId>vertx-core</artifactId>
            <version>4.5.1</version>
        </dependency>
    </dependencies>
```

（1）编写一个web服务器的接口HttpServer，定义统一的启动服务器方法，便于后续扩展，可实现不同web服务器

```java
package site.xiaofei.server;

/**
 * @author tuaofei
 * @description Http服务器接口
 * @date 2024/10/17
 */
public interface HttpServer {

    /**
     * 启动服务器
     * @param port
     */
    void doStart(int port);
}
```

（3）编写基于vert.x实现的web服务器VertxServer，能够监听指定端口并处理请求

```java
package site.xiaofei.server;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;

import java.util.concurrent.TimeUnit;

/**
 * @author tuaofei
 * @description 基于vertx实现的web服务器
 * @date 2024/10/17
 */
public class VertxServer implements HttpServer {
    @Override
    public void doStart(int port) {
        //创建vertx实例
        Vertx vertx = Vertx.vertx(vertxOptions);

        //创建http服务器
        io.vertx.core.http.HttpServer vertxHttpServer = vertx.createHttpServer();

        //监听端口并处理请求
        vertxHttpServer.requestHandler(request -> {
            //处理http请求
            String.format("receive request ：%s %s", request.uri(), request.method());
            //发送http响应
            request.response()
                    .putHeader("content-type", "text/plain")
                    .end("hello from vert.x http server!");
        });

        //启动http服务器并监听指定端口
        vertxHttpServer.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println(String.format("server is now listening on port %s", port));
            } else {
                System.out.println(String.format("failed to start server %s", result.cause()));
            }
        });
    }
}
```



（4）验证web服务器能否启动成功并接收请求

修改服务提供者模块的RpcProviderExample，编写启动web服务的代码

```java
package site.xiaofei.provider;

import site.xiaofei.common.service.UserService;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/17
 */
public class RpcProviderExample {

    public static void main(String[] args) {
        //启动http服务
        HttpServer vertxServer = new VertxServer();
        vertxServer.doStart(8080);
    }
}
```

通过浏览器访问`localhost:8080`,查看能否正常访问，并输出文字hello from vert.x http server!



rpc模块目录结构

![image-20241019004517385](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019004517385.png)

### 本地服务注册

暂时不使用第三方注册中心，直接把服务提供者注册到本地

创建本地服务注册器LocalRegistry



使用线程安全的ConcurrentHashMap存储服务注册信息，key为服务名称（此对象表示的类或接口的名称XXX.class.getName()）、value为服务实现类(XXX.class)，之后根据要调用的服务名称获取到对应的实现类，通过反射执行



目录结构

![image-20241019004735188](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019004735188.png)

服务提供者启动时，需要把服务提供者注册到本地服务注册器，修改RpcProviderExample

```java
package site.xiaofei.provider;

import site.xiaofei.common.service.UserService;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/17
 */
public class RpcProviderExample {

    public static void main(String[] args) {

        //注册服务
        LocalRegistry.register(UserService.class.getName(),UserServiceImpl.class);

        //启动http服务
        HttpServer vertxServer = new VertxServer();
        vertxServer.doStart(8080);
    }
}
```

### 序列化器

本地服务注册后，就可根据请求信息取出实现类并调用方法了



在调用之前，需要使用到序列化器；

在请求和响应，传输参数时，需要进行对象的序列化和反序列化



>  什么是序列化和反序列化？
>
>  序列化：将java对象转换为可传输的字节数组
>
>  反序列化：将字节数组转换为java对象

序列化方式

Java原生序列化、JSON、Hessian、Kryo、protobuf



此处使用Java原生序列化



（1）在rpc-system模块中，编写序列化接口

```java
package site.xiaofei.serializer;

import java.io.IOException;

/**
 * @author xiaofei
 * @description 序列化接口
 * @date 2024/10/17
 */
public interface Serializer {

    /**
     * 序列化
     * @param object
     * @param <T>
     * @return
     * @throws IOException
     */
    <T> byte[] serializer(T object) throws IOException;

    /**
     * 反序列化
     * @param bytes
     * @param type
     * @param <T>
     * @return
     * @throws IOException
     */
    <T> T deserializer(byte[] bytes,Class<T> type) throws IOException;
}
```

(2)基于java自带的序列化器实现JdkSerializer

```java
package site.xiaofei.serializer;

import java.io.*;

/**
 * @author tuaofei
 * @description Jdk序列化器
 * @date 2024/10/17
 */
public class JdkSerializer implements Serializer {
    @Override
    public <T> byte[] serializer(T object) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(outputStream);
        objectOutputStream.writeObject(object);
        objectOutputStream.close();
        return outputStream.toByteArray();
    }

    @Override
    public <T> T deserializer(byte[] bytes, Class<T> type) throws IOException {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayInputStream);
        try {
            return (T) objectInputStream.readObject();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException();
        }finally {
            objectInputStream.close();
        }
    }
}
```

目录结构

![image-20241019010023080](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019010023080.png)

### 请求处理器

提供者处理调用



实现RPC的关键，作用：处理接收到的请求，并根据请求参数找到对应的服务和方法，通过反射调用，封装返回结果并响应请求



（1）请求和响应类

目录结构

![image-20241019010257867](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019010257867.png)

请求类RpcRequest的作用：封装调用需要的信息

```
反射机制必需的参数
服务名称
方法名称
调用参数的类型列表
参数列表
```

```java
package site.xiaofei.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author tuaofei
 * @description Rpc请求
 * @date 2024/10/17
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RpcRequest implements Serializable {

    /**
     * 服务名称
     */
    private String serviceName;

    /**
     * 方法名称
     */
    private String methodName;

    /**
     * 参数类型列表
     */
    private Class<?>[] paramTypes;

    /**
     * 参数列表
     */
    private Object[] args;

}
```

响应类RpcResponse作用：封装调用方法得到的返回值、已经调用的信息（比如异常）

```java
package site.xiaofei.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author tuaofei
 * @description Rpc响应
 * @date 2024/10/17
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RpcResponse implements Serializable {

    /**
     * 响应数据
     */
    private Object data;

    /**
     * 响应数据类型（预留）
     */
    private Class<?> dataType;

    /**
     * 响应信息
     */
    private String message;

    /**
     * 异常信息
     */
    private Exception exception;
}
```

(2)编写请求处理器HttpServerHandler

![image-20241019010730506](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019010730506.png)

业务流程：

```
1、反序列化请求为对象，并从请求对象获取参数
2、根据服务名称从本地注册器中获取对应的服务实例
3、通过反射调用方法得到结果
4、对结构进行封装和序列化，并写到响应中
```

```java
package site.xiaofei.server;

import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.http.HttpServerResponse;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.serializer.JdkSerializer;
import site.xiaofei.serializer.Serializer;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author tuaofei
 * @description Http请求处理器
 * 1、反序列化请求为对象，并从请求对象获取参数
 * 2、根据服务名称从本地注册器中获取对应的服务实例
 * 3、通过反射调用方法得到结果
 * 4、对结构进行封装和序列化，并写到响应中
 * @date 2024/10/17
 */
public class HttpServerHandler implements Handler<HttpServerRequest> {


    @Override
    public void handle(HttpServerRequest request) {
        //指定序列化器
        JdkSerializer serializer = new JdkSerializer();

        //记录日志
        System.out.println(String.format("receive request ：%s %s", request.method(), request.uri()));

        //异步处理请求
        request.bodyHandler(body -> {
            byte[] bytes = body.getBytes();
            RpcRequest rpcRequest = null;
            try {
                rpcRequest = serializer.deserializer(bytes, RpcRequest.class);
            } catch (IOException e) {
                e.printStackTrace();
            }

            //构造响应结果
            RpcResponse rpcResponse = new RpcResponse();
            if (rpcRequest == null) {
                rpcResponse.setMessage("rpcRequest is null");
                doResponse(request, rpcResponse, serializer);
                return;
            }
            //获取服务实例，反射调用
            Class<?> implClass = LocalRegistry.get(rpcRequest.getServiceName());
            try {
                Method method = implClass.getMethod(rpcRequest.getMethodName(), rpcRequest.getParamTypes());
                Object result = method.invoke(implClass.newInstance(), rpcRequest.getArgs());

                //封装返回结果
                rpcResponse.setData(result);
                rpcResponse.setDataType(method.getReturnType());
                rpcResponse.setMessage("success");
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | InstantiationException e) {
                e.printStackTrace();
                rpcResponse.setMessage(e.getMessage());
                rpcResponse.setException(e);
            }
            //响应
            doResponse(request, rpcResponse, serializer);
        });


    }

    /**
     * 响应
     *
     * @param request
     * @param rpcResponse
     * @param serializer
     */
    public void doResponse(HttpServerRequest request, RpcResponse rpcResponse, Serializer serializer) {
        HttpServerResponse httpServerResponse = request.response()
                .putHeader("content-type", "application/json");
        try {
            byte[] serialized = serializer.serializer(rpcResponse);
            httpServerResponse.end(Buffer.buffer(serialized));
        } catch (IOException e) {
            e.printStackTrace();
            httpServerResponse.end(Buffer.buffer());
        }
    }
}
```

> 不同web服务器的请求处理器实现方式不同
>
> Vert.x通过实现Handler<HttpServerRequest>接口来自定义请求处理器
>
> 通过request.bodyHandler异步处理请求



（3）给HttpServer绑定请求处理器

修改VertxServer，通过vertxHttpServer.requestHandler绑定

```java
package site.xiaofei.server;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;

import java.util.concurrent.TimeUnit;

/**
 * @author tuaofei
 * @description 基于vertx实现的web服务器
 * @date 2024/10/17
 */
public class VertxServer implements HttpServer {
    @Override
    public void doStart(int port) {
        //创建vertx实例
        Vertx vertx = Vertx.vertx(vertxOptions);

        //创建http服务器
        io.vertx.core.http.HttpServer vertxHttpServer = vertx.createHttpServer();

        //监听端口并处理请求
        vertxHttpServer.requestHandler(new HttpServerHandler());

        //启动http服务器并监听指定端口
        vertxHttpServer.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println(String.format("server is now listening on port %s", port));
            } else {
                System.out.println(String.format("failed to start server %s", result.cause()));
            }
        });
    }
}
```



至此，引入了RPC框架的服务提供者模块，已经能接收请求并完成服务调用



### 消费方发起调用 - 代理

前面预留的UserService实现方法



肯定不能直接把impl实现类copy过来



通过架构图，可以通过生成代理对象来简化调用

#### 静态代理

为每一个特定类型的接口或对象，编写一个代理类



在`rpc-consumer`模块中，创建静态代理`UserServiceProxy`，实现UserService接口和getUser方法



实现getUser需要构造http请求去调用服务提供者

```java
package site.xiaofei.consumer;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import site.xiaofei.common.model.User;
import site.xiaofei.common.service.UserService;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.serializer.JdkSerializer;

import java.io.IOException;

/**
 * @author tuaofei
 * @description 静态代理
 * @date 2024/10/18
 */
public class UserServiceProxy implements UserService {
    @Override
    public User getUser(User user) {
        //指定序列化器
        JdkSerializer serializer = new JdkSerializer();

        //给rpc框架发送请求
        RpcRequest rpcRequest = RpcRequest.builder()
                .serviceName(UserService.class.getName())
                .methodName("getUser")
                .paramTypes(new Class[]{User.class})
                .args(new Object[]{user})
                .build();

        try {
            byte[] bodyBytes = serializer.serializer(rpcRequest);
            byte[] resultBytes;
            HttpResponse httpResponse = HttpRequest.post("http://localhost:8080")
                    .body(bodyBytes)
                    .execute();
            resultBytes = httpResponse.bodyBytes();
            RpcResponse rpcResponse = serializer.deserializer(resultBytes, RpcResponse.class);
            return (User) rpcResponse.getData();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

然后修改RpcConsumerExample，new一个代理对象赋值给UserService

```java
public class RpcConsumerExample {

    public static void main(String[] args) {
        //静态代理
        UserService userService = new UserServiceProxy();
		...
    }
}
```

> 缺点：需要给每个服务接口都写一个实现类，太麻烦，不灵活

#### 动态代理

根据生成的对象的类型，自动生成一个代理对象



常用的代理实现方式JDK动态代理【只能对接口进行代理】、基于字节码生成的动态代理（CGLIB）【可对任何类进行代理，性能略低于JDK动态代理】



（1）在rpc-system模块中，编写动态代理类,需要实现InvocationHandler接口的invoke方法

```java
package site.xiaofei.proxy;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.serializer.JdkSerializer;

import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author tuaofei
 * @description 服务代理（jdk动态代理）
 * @date 2024/10/18
 */
public class ServiceProxy implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //指定序列化器
        JdkSerializer serializer = new JdkSerializer();

        //给rpc框架发送请求
        RpcRequest rpcRequest = RpcRequest.builder()
                .serviceName(method.getDeclaringClass().getName())
                .methodName(method.getName())
                .paramTypes(method.getParameterTypes())
                .args(args)
                .build();

        try {
            byte[] bodyBytes = serializer.serializer(rpcRequest);
            byte[] resultBytes;
            //todo 地址需要使用注册中心和服务发现机制解决
            HttpResponse httpResponse = HttpRequest.post("http://localhost:8080")
                    .body(bodyBytes)
                    .execute();
            resultBytes = httpResponse.bodyBytes();
            RpcResponse rpcResponse = serializer.deserializer(resultBytes, RpcResponse.class);
            return rpcResponse.getData();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

当用户调用某个接口方法时，会改为第调用invoke方法。在invoke中可以获取到调用的方法信息、传入的参数列表



（2）创建动态代理工厂ServiceProxyFactory，使用工厂模式，作用：根据指定类创建动态代理对象

目录结构

![image-20241019012807097](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019012807097.png)

```java
package site.xiaofei.proxy;

import java.lang.reflect.Proxy;

/**
 * @author tuaofei
 * @description 服务代理工厂（用于创建代理对象）
 * @date 2024/10/18
 */
public class ServiceProxyFactory {

    public static <T> T getProxy(Class<T> serviceClass) {
        return (T) Proxy.newProxyInstance(
                serviceClass.getClassLoader(),
                new Class[]{serviceClass},
                new ServiceProxy()
        );
    }
}
```

（3）在RpcConsumerExample中，通过调用工厂来为UserService获取动态代理对象

```java
UserService userService = ServiceProxyFactory.getProxy(UserService.class);
```



### 测试

（1）debug启动服务提供者rpc-provider

![image-20241019013157960](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019013157960.png)

（2）debug启动消费者

在ServiceProxy代理类中断点，可以看到调用UserService，实际调用的是invoke方法，并且获取到参数信息

![image-20241019014335381](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019014335381.png)

（3）可以看到序列化后的请求对象，结构是字节数组

![image-20241019014345615](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019014345615.png)

（4）在服务提供者模块的请求处理器中断电，可以看到反序列化后的请求，和发送内容保持一致；请求完成通过反射调用方法，并得到了user对象

![image-20241019014524017](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019014524017.png)

（5）成功打印结果

![image-20241019015103397](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241019015103397.png)

但是出现了一个警告 has been blocked for 99196 ms, time limit is 60000 ms

貌似处理时长过长

可以把时间调长一点，这个不影响程序的处理；

在`VertxServer`创建Vertx实例时，传入配置参数

```java
VertxOptions vertxOptions = new VertxOptions();
        //设置最大事件循环执行时间的值；最大事件循环执行时间的默认值 = 2000000000 ns（2 秒）
        //Vert.x Api 是非阻塞，并且不会堵塞事件循环。
        //如果程序阻塞，或者执行了一段长时间的代码或者debug没放掉，检测到一段时间后事件循环还没有恢复，Vert.x会自动记录警告。如果你在日志中看到这样的警告
        //has been blocked for 2862 ms, time limit is 2000 ms
        //不建议执行的阻塞代码
        //1.Thread.sleep()
        //2.等待锁
        //3.等待互斥体或监视器 (例如同步段)
        //4.做一个长时间的数据库操作和等待返回
        //5.做复杂的计算，需要很长的时间。
        //6.死循环。
        vertxOptions.setMaxEventLoopExecuteTime(60).setMaxEventLoopExecuteTimeUnit(TimeUnit.SECONDS);

        //创建vertx实例
        Vertx vertx = Vertx.vertx(vertxOptions);
```

参考：

+ [黄金法则 — 不要阻塞事件循环 - 《Java API 版本的Vert.x Core 手册》 - 书栈网 · BookStack](https://www.bookstack.cn/read/vert-x-core-manual-for-java/黄金法则_不要阻塞事件循环.md)

+ [VertxOptions (Vert.x Stack - Docs 4.5.10 API)](https://vertx.io/docs/apidocs/io/vertx/core/VertxOptions.html)

+ [Vert.x(六): Vert.x配置项VertxOptions的使用-CSDN博客](https://blog.csdn.net/mawei7510/article/details/83059684)



## 2、全局配置加载

在RPC框架运行过程中，有一些配置信息，比如注册中心的地址、序列化方式、网络服务器端口...，之前的项目中都是写死的，不利于维护。



通过配置文件来进行**自定义配置**



### 设计方案

#### 配置项

先提供一个简单的配置，后续再扩展

```
服务名称 name
版本 version
服务器主机名 serverHost
服务器端口号 serverPort
```



了解常见的RPC框架配置

1. 注册中心地址
2. 服务接口
3. 序列化方式
4. 网络通信协议
5. 超时设置
6. 负载均衡策略
7. 服务端线程模型



参考：[API 配置 | Apache Dubbo](https://cn.dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/config/api/api/)





#### 读取配置文件

可以使用java的properties，这里使用第三方工具hutool的setting模块

参考：[设置文件-Setting | Hutool](https://doc.hutool.cn/pages/setting/example/#代码)



一般情况，读取配置文件名称application。properties，还可以指定文件名称后缀来区分多环境，比如：application-prod.properties表示生产环境、application-test.properties表示测试环境



### 开发实现

#### 项目初始化

（1）新增`rpc-core`模块，复用`rpc-system`代码

（2）引入xml依赖，日志和单元测试

`xiaofei.site-rpc`父级xml

```xml
<properties>
        <logback-version>1.3.12</logback-version>
        <junit-version>RELEASE</junit-version>
    </properties>

    <dependencyManagement>
            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-classic</artifactId>
                <version>${logback-version}</version>
            </dependency>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit-version}</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

`rpc-core`模块xml

```xml
<dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
```

（3）将`rpc-consumer`和`rpc-provider`项目引入的rpc依赖`rpc-system`都替换为`rpc-core`

```xml
<dependency>
            <groupId>xiaofei.site</groupId>
            <artifactId>rpc-core</artifactId>
            <version>1.0.0</version>
        </dependency>
```

#### 配置加载

（1）在config包下新建配置类`RpcConfig`

```java
package site.xiaofei.config;

import lombok.Data;

/**
 * @author tuaofei
 * @description rpc框架配置
 * @date 2024/10/20
 */
@Data
public class RpcConfig {

    /**
     * 服务名称
     */
    private String name = "xaiofei.site-rpc";

    /**
     * 版本
     */
    private String version = "1.0.0";

    /**
     * 服务器主机名
     */
    private String serverHost = "localhost";

    /**
     * 服务器端口号
     */
    private Integer serverPort = 8080;
}
```

(2)在utils包下新建工具类`ConfigUtils`，作用是读取配置文件并返回配置对象



工具类尽量通用不和业务强绑定。比如支持要读取配置内容前缀，文件名后缀，传入环境...

```java
package site.xiaofei.utils;

import cn.hutool.core.util.StrUtil;
import cn.hutool.setting.dialect.Props;

/**
 * @author tuaofei
 * @description 配置工具类
 * @date 2024/10/20
 */
public class ConfigUtils {

    /**
     * 加载配置对象
     *
     * @param tClass
     * @param prefix
     * @param <T>
     * @return
     */
    public static <T> T loadConfig(Class<T> tClass, String prefix) {
        return loadConfig(tClass, prefix,"", "");
    }

    /**
     * 加载配置对象，支持区分环境
     *
     * @param tClass
     * @param prefix
     * @param environment
     * @param <T>
     * @return
     */
    public static <T> T loadConfig(Class<T> tClass, String prefix, String fileSuffix, String environment) {
        StringBuilder configFileBuilder = new StringBuilder("application");
        if (StrUtil.isNotBlank(environment)) {
            configFileBuilder.append("-").append(environment);
        }
        if (StrUtil.isNotBlank(fileSuffix)){
            configFileBuilder.append(fileSuffix);
        }else {
            configFileBuilder.append(".properties");
        }
        Props props = new Props(configFileBuilder.toString());
        return props.toBean(tClass, prefix);
    }
}
```

（3）在constant包中新建`RpcConstant`接口，用于存储rpc框架相关常量

```java
package site.xiaofei.constant;

/**
 * @author tuaofei
 * @description Rpc相关常量
 * @date 2024/10/20
 */
public interface RpcConstant {

    /**
     * 默认配置文件加载前缀
     */
    String DEFAULT_CONFIG_PREFIX = "rpc";
}
```

可以读取到类似下面的配置

```
rpc.name=rpc-consumer
rpc.version=1.0
rpc.serverPort=8081
```

#### 维护全局配置对象

在项目启动时，从配置文件读取配置并创建实例对象，之后就可以集中从这个配置对象获取信息，不用每次重新读取、并创建对象，减少性能开销



使用单例模式



一般会使用holder来维护全局配置对象实例，这里使用`RpcApplication`

```java
package site.xiaofei;

import lombok.extern.slf4j.Slf4j;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.constant.RpcConstant;
import site.xiaofei.utils.ConfigUtils;

/**
 * @author tuaofei
 * @description Rpc框架应用
 * 相当于holder，存放全局变量。双检锁单例模式
 * @date 2024/10/20
 */
@Slf4j
public class RpcApplication {

    private static volatile RpcConfig rpcConfig;

    /**
     * 框架初始化，支持传入自定义配置
     *
     * @param newRpcConfig
     */
    public static void init(RpcConfig newRpcConfig) {
        rpcConfig = newRpcConfig;
        log.info("rpc init,config = {}", newRpcConfig.toString());
    }

    /**
     * 初始化
     */
    public static void init() {
        RpcConfig newRpcConfig;
        try {
            newRpcConfig = ConfigUtils.loadConfig(RpcConfig.class, RpcConstant.DEFAULT_CONFIG_PREFIX);
        } catch (Exception e) {
            //配置记载失败，使用默认值
            newRpcConfig = new RpcConfig();
        }
        init(newRpcConfig);
    }

    /**
     * 获取配置
     * 双重检查锁单例模式：单例模式最佳实践
     * @return
     */
    public static RpcConfig getRpcConfig() {
        if (rpcConfig == null) {
            synchronized (RpcApplication.class) {
                if (rpcConfig == null) {
                    init();
                }
            }
        }
        return rpcConfig;
    }

}
```

上述代理就是双重检查锁单例模式的实现，支持在获取配置时才调用init方法实现懒加载。支持自己传入配置对象；如果没有，使用默认的加载配置

```java
RpcConfig rpcConfig = ConfigUtils.loadConfig(RpcConfig.class, "rpc");
```

### 测试

#### 测试配置文件读取

在`rpc-consumer`的resources目录创建配置文件`application.properties`

```properties
rpc.name=rpc-consumer
rpc.version=1.0
rpc.serverPort=8081
```

![image-20241020212214688](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241020212214688.png)

创建`RpcConsumerEasyExample`，测试文件读取

```java
package site.xiaofei.consumer;

import site.xiaofei.config.RpcConfig;
import site.xiaofei.utils.ConfigUtils;

/**
 * @author tuaofei
 * @description 简易服务消费者示例
 * @date 2024/10/20
 */
public class RpcConsumerEasyExample {

    public static void main(String[] args) {
        RpcConfig rpcConfig = ConfigUtils.loadConfig(RpcConfig.class, "rpc");
        System.out.println(rpcConfig);
        
    }
}
```

#### 测试全局配置对象加载

在`rpc-provider`创建`RpcProviderEasyExample`，能够根据配置动态在不同端口启动web服务

```java'
package site.xiaofei.provider;

import site.xiaofei.RpcApplication;
import site.xiaofei.common.service.UserService;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxHttpServer;

/**
 * @author tuaofei
 * @description 简易服务提供者示例
 * @date 2024/10/20
 */
public class RpcProviderEasyExample {
    public static void main(String[] args) {

        //rpc框架初始化
        RpcApplication.init();

        //注册服务
        LocalRegistry.register(UserService.class.getName(),UserServiceImpl.class);

        //启动http服务
        HttpServer vertxServer = new VertxHttpServer();
        vertxServer.doStart(RpcApplication.getRpcConfig().getServerPort());
    }

}
```

### 扩展

（1）支持读取application.yml、application.yml等不同格式的配置文件



改造ConfigUtils的loadConfig方法，增加参数fileSuffix文件后缀

```java
public static <T> T loadConfig(Class<T> tClass, String fileSuffix, String prefix) {
        return loadConfig(tClass, prefix, fileSuffix, "");
    }

public static <T> T loadConfig(Class<T> tClass, String prefix, String fileSuffix, String environment) {
        StringBuilder configFileBuilder = new StringBuilder("application");
        if (StrUtil.isNotBlank(environment)) {
            configFileBuilder.append("-").append(environment);
        }
        if (StrUtil.isNotBlank(fileSuffix)) {
            configFileBuilder.append(fileSuffix);
        } else {
            configFileBuilder.append(RpcConstant.DEFAULT_CONFIG_FILESUFFIX);
        }
        Props props = new Props(configFileBuilder.toString());
        return props.toBean(tClass, prefix);
    }
```

RpcConstant常量增加

```java
String DEFAULT_CONFIG_FILESUFFIX = ".properties";
String CONFIG_YML_FILESUFFIX = ".yml";
String CONFIG_YAML_FILESUFFIX = ".yaml";
```

（2）支持监听配置文件的变更，并自动更新配置对象（可使用props.autoLoad()）

（3）配置文件支持中文（注意编码问题）

（4）配置分组，后续配置增多，可以考虑对配置进行分组



## 3、接口mock

模拟接口对象，用于测试开发使用



通过动态代理创建一个调用方法时返回固定值的对象



### 开发实现

（1）支持通过修改配置文件的方式开启mock，修改全局配置类`RpcConfig`

```java
@Data
public class RpcConfig {

   ...

    /**
     * 模拟调用
     */
    private boolean mock = false;
}
```

(2)在proxy包下新增`MockServiceProxy`类，用于生成mock代理服务

```java
package site.xiaofei.proxy;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author tuaofei
 * @description Mock服务代理（jdk动态代理）
 * @date 2024/10/21
 */
@Slf4j
public class MockServiceProxy implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Class<?> methodReturnType = method.getReturnType();
        log.info("mock invoke {}", method.getName());
        return getDefaultObject(methodReturnType);
    }

    private Object getDefaultObject(Class<?> returnType) {
        //基本类型
        if (returnType == boolean.class) {
            return false;
        } else if (returnType == short.class) {
            return (short) 0;
        } else if (returnType == int.class) {
            return 0;
        } else if (returnType == long.class) {
            return 0L;
        }
        return null;
    }
}
```

通过getDefaultObject方法，根据代理接口的class返回不同的默认值



（3）给`ServiceProxyFactory`服务代理工厂新增获取mock代理对象的方法`getMockProxy`。通过读取已定义的全局配置mock开区分创建哪种代理对象

```java
package site.xiaofei.proxy;

import site.xiaofei.RpcApplication;

import java.lang.reflect.Proxy;

/**
 * @author tuaofei
 * @description 服务代理工厂（用于创建代理对象）
 * @date 2024/10/18
 */
public class ServiceProxyFactory {

    public static <T> T getProxy(Class<T> serviceClass) {
        if (RpcApplication.getRpcConfig().isMock()){
            return getMockProxy(serviceClass);
        }
        
        return (T) Proxy.newProxyInstance(
                serviceClass.getClassLoader(),
                new Class[]{serviceClass},
                new ServiceProxy()
        );
    }

    /**
     * 根据服务获取mock代理对象
     * @param serviceClass
     * @param <T>
     * @return
     */
    public static <T> T getMockProxy(Class<T> serviceClass){
        return (T) Proxy.newProxyInstance(
                serviceClass.getClassLoader(),
                new Class[]{serviceClass},
                new MockServiceProxy()
        );
    }
}
```

### 测试

（1）在`rpc-common`公共模块的UserService中新增一个默认实现的方法

```java
package site.xiaofei.common.service;

import site.xiaofei.common.model.User;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/17
 */
public interface UserService {

    /**
     * 获取用户
     * @param user
     * @return
     */
    User getUser(User user);

    /**
     * 获取数字
     * @return
     */
    default short getNumber(){
        return 1;
    }
}
```

（2）修改服务消费者的配置文件`application.properties`，将mock设置为true

```java
rpc.name=rpc-consumer
rpc.version=1.0
rpc.serverPort=8082
rpc.mock=true
```

(3)修改`RpcConsumerExample`类，编写调用`userService.getNumber`测试

```java
public class RpcConsumerExample {

    public static void main(String[] args) {
        //静态代理
//        UserService userService = new UserServiceProxy();
        //jdk动态代理
        UserService userService = ServiceProxyFactory.getProxy(UserService.class);

        User user = new User();
        user.setName("土澳菲");
        User resultUser = userService.getUser(user);
        if (resultUser != null){
            System.out.println(resultUser.getName());
        }else{
            System.out.println("user is null!");
        }
        short number = userService.getNumber();
        System.out.println(number);
    }
}
```

应该能看到输出结果为0，不是1，说明调用了MockServiceProxy模拟服务代理



> 注意rpc-core的ServiceProxy服务代理的HttpRequest.post地址需要修改为获取配置文件的地址

```java
//地址需要使用注册中心和服务发现机制解决
            RpcConfig rpcConfig = RpcApplication.getRpcConfig();
            if (rpcConfig == null){
                throw new RuntimeException("get rpcConfig error");
            }
            String remoteUrl = String.format("http://%s:%s", rpcConfig.getServerHost(), rpcConfig.getServerPort());
            HttpResponse httpResponse = HttpRequest.post(remoteUrl)
                    .body(bodyBytes)
                    .execute();
```



### 扩展

完善mock的逻辑，支持更多返回类型的默认值生成（faker伪造数据生成库，生成默认值）



## 4、序列化器和SPI机制

通过前面使用的Jdk序列化器，对于一个完善的RPC框架，还需要考虑
1.是否有更好的序列化器实现方式？

2.怎么让使用框架的开发者指定使用的序列化器？

3.怎么让使用框架的开发者定制自己的序列化器？



### 设计方案



主流序列化方式对比

| 序列化方式            | 介绍                                     | 优点                                                         | 缺点                                                         |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| JSON（此教程实现）    |                                          | 可读性强，便于理解和调试<br />跨语言支持广泛，几乎所有编程语言都用JSON的解析和生成库 | 序列化后的数据量相对较大，因为JSON使用文本格式存储数据，需要额外的字符表示键值和数据结构<br />不能很好地处理复杂的数结构和循环引用，可能导致性能下降或者序列化失败 |
| Hessian（此教程实现） | https://hessian.caucho.com/              | 二进制序列化，序列后的数据量较小，网络传输效率高<br />支持跨语言，适用于分布式系统中的服务调用 | 性能较`JSON`略低，因为需要将对象转换为二进制格式<br />对象必须实现`Serializable`接口，限制了可序列化的对象范围 |
| Kryo（此教程实现）    | https://github.com/EsotericSoftware/kryo | 高性能，序列化和反序列化速度快<br />支持循环引用和自定义序列化器，适用于复杂的对象结构<br />无需实现`Serializable`接口，可序列化任意对象 | 不夸语言，只适用于`java`<br />对象的序列化格式不够友好，不易懂，不便于调试 |
| Protobuf              |                                          | 高效的二进制序列化，序列化后的数据量极小<br />支持跨语言，并且提供多语言的实现库<br />支持版本化和向前/向后兼容性 | 配置相对复杂，需要先定义数据结构的消息格式<br />对象的序列化格式不易懂，不便于调试 |

### 动态使用序列化器

之前使用的硬编码

```java
//指定序列化器
JdkSerializer serializer = new JdkSerializer();
```

可以通过配置文件来指定使用的序列化器。在使用序列化器时，根据配置来获取不同的序列化器实例



参考Dubbo替换序列化协议：https://cn.dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/serialization/hessian/



可以定义一个MAP<序列化器名称,序列化器实现类对象>，根据配置文件获取名称来查询对于的实例

### 自定义序列化器

如果不想使用框架的序列化器，想自己定义，怎么办？



RPC框架读取用户自定义的类路径，加载这个类，作为Serializer序列化器接口的实现



引入java中的重要特性：**SPI机制**



**什么是SPI？**

service provider interface 服务提供接口，用于实现模块化开发和插件化扩展



SPI机制允许服务提供者通过特定的配置文件将自己的实现注册到系统中，通过反射机制动态加载这些实现，不需要修改原始框架代码，实现系统的解耦，提高了可扩展性

例如：JDBC连接数据库，不同的数据库驱动开发者可以使用JDBS库，定制自己的数据库驱动

主流的开发框架，几乎都使用了，servlet容器、日志框架、ORM框架、Spring框架



**如何实现SPI？**



#### 系统实现

java内部提供了SPI机制相关的API接口，可以直接使用

（1）在`resources`资源目录下创建`META-INF/services`目录，并创建一个名称为要实现的接口的空文件

![image-20241022215151394](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241022215151394.png)

（2）在文件中填写定制接口实现类的**完整类路径**

![image-20241022215306513](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241022215306513.png)

（3）使用系统内置的`ServiceLoader`动态加载指定接口的实现类

```java
//指定序列化器
        Serializer serializer = null;
        ServiceLoader<Serializer> serviceLoader = ServiceLoader.load(Serializer.class);
        for (Serializer service : serviceLoader) {
            serializer = service;
        }
```



#### 自定义SPI实现

如果想定制多个不同的接口实现类，就不能指定使用哪一个了



需要定义SPI机制的实现，只要能够根据配置加载到类



读取配置文件，得到`序列化器名称 -> 序列化器实现类对象` 映射,根据配置的序列化器名称加载指定实现类对象

```
jdk=site.xiaofei.serializer.JdkSerializer
hessian=site.xiaofei.serializer.HessianSerializer
kryo=site.xiaofei.serializer.KryoSerializer
json=site.xiaofei.serializer.JsonSerializer
```

### 开发实现

#### 多种序列化器实现

(1)给`rpc-core`模块，pom.xml引入依赖

```xml
<!--        序列化-->
        <dependency>
            <groupId>com.caucho</groupId>
            <artifactId>hessian</artifactId>
            <version>4.0.66</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.esotericsoftware/kryo -->
        <dependency>
            <groupId>com.esotericsoftware</groupId>
            <artifactId>kryo</artifactId>
            <version>5.6.0</version>
        </dependency>
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.18.0</version>
        </dependency>
```

(2)在 `serializer`下实现各自的序列化器



##### JSON序列化器

JSON序列化器实现相对复杂，需要考虑对象转换兼容问题，比如object数组在序列化后会丢失类型

```java
package site.xiaofei.serializer;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;

import java.io.IOException;

/**
 * @author tuaofei
 * @description json序列化器
 * @date 2024/10/22
 */
public class JsonSerializer implements Serializer {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public <T> byte[] serializer(T object) throws IOException {
        return OBJECT_MAPPER.writeValueAsBytes(object);
    }

    @Override
    public <T> T deserializer(byte[] bytes, Class<T> classType) throws IOException {
        T obj = OBJECT_MAPPER.readValue(bytes, classType);
        if (obj instanceof RpcRequest) {
            return handleRequest((RpcRequest) obj, classType);
        }
        if (obj instanceof RpcResponse) {
            return handleResponse((RpcResponse) obj, classType);
        }
        return OBJECT_MAPPER.readValue(bytes, classType);
    }

    /**
     * 由于Object的原始对象会被擦除，导致反序列化时会被作为linkedhashmap无法转换为原始对象，所以在这做特殊处理
     *
     * @param rpcRequest
     * @param type
     * @param <T>
     * @return
     * @throws IOException
     */
    private <T> T handleRequest(RpcRequest rpcRequest, Class<T> type) throws IOException {
        Class<?>[] paramTypes = rpcRequest.getParamTypes();
        Object[] args = rpcRequest.getArgs();

        //循环处理每个参数的类型
        for (int i = 0; i < paramTypes.length; i++) {
            Class<?> clazz = paramTypes[i];
            //如果类型不同，重新处理一下
            if (!clazz.isAssignableFrom(args[i].getClass())) {
                byte[] argBytes = OBJECT_MAPPER.writeValueAsBytes(args[i]);
                args[i] = OBJECT_MAPPER.readValue(argBytes, clazz);
            }
        }
        return type.cast(rpcRequest);
    }

    /**
     * 由于Object的原始对象会被擦除，导致反序列化时会被作为linkedhashmap无法转换为原始对象，所以在这做特殊处理
     *
     * @param rpcResponse
     * @param type
     * @param <T>
     * @return
     * @throws IOException
     */
    private <T> T handleResponse(RpcResponse rpcResponse, Class<T> type) throws IOException {
        //处理响应数据
        byte[] bytes = OBJECT_MAPPER.writeValueAsBytes(rpcResponse.getData());
        rpcResponse.setData(OBJECT_MAPPER.readValue(bytes, rpcResponse.getDataType()));
        return type.cast(rpcResponse);
    }
}
```

##### kryo序列化器

kryo本身是线程不安全的，所以使用ThreadLocal保证每个线程有一个单独的Kryo对象实例

```java
package site.xiaofei.serializer;

import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * @author tuaofei
 * @description Kryo序列化器
 * @date 2024/10/23
 */
public class KryoSerializer implements Serializer {

    private static final ThreadLocal<Kryo> KRYO_THREAD_LOCAL = ThreadLocal.withInitial(() -> {
        Kryo kryo = new Kryo();
        //设置动态序列化和反序列化类，不提前注册所有类（可能存在安全问题）
        kryo.setRegistrationRequired(false);
        return kryo;
    });

    @Override
    public <T> byte[] serializer(T object) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Output output = new Output(byteArrayOutputStream);
        KRYO_THREAD_LOCAL.get().writeObject(output, object);
        output.close();
        return byteArrayOutputStream.toByteArray();
    }

    @Override
    public <T> T deserializer(byte[] bytes, Class<T> type) throws IOException {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        Input input = new Input(byteArrayInputStream);
        T result = KRYO_THREAD_LOCAL.get().readObject(input, type);
        input.close();
        return result;
    }
}
```



##### Hessian序列化器

实现比较简单

```java
package site.xiaofei.serializer;

import com.caucho.hessian.io.HessianInput;
import com.caucho.hessian.io.HessianOutput;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * @author tuaofei
 * @description Hessian序列化器
 * @date 2024/10/23
 */
public class HessianSerializer implements Serializer {
    @Override
    public <T> byte[] serializer(T object) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        HessianOutput hessianOutput = new HessianOutput(outputStream);
        hessianOutput.writeObject(object);
        return outputStream.toByteArray();
    }

    @Override
    public <T> T deserializer(byte[] bytes, Class<T> type) throws IOException {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        HessianInput hessianInput = new HessianInput(byteArrayInputStream);
        return (T) hessianInput.readObject(type);
    }
}
```



#### 动态使用序列化器

序列化器所有代码均在`Serializer`包下



（1）定义序列化器名称的常量，使用接口实现

```java
package site.xiaofei.serializer;

/**
 * @author tuaofei
 * @description 序列化器 key
 * @date 2024/10/23
 */
public interface SerializerKeys {

    String JDK = "jdk";
    String JSON = "json";
    String KRYO = "Kryo";
    String HESSIAN = "Hessian";
}
```

(2)序列化器工厂

序列化器对象可复用，没必要每次都创建；使用工厂+单例模式来创建和获取序列化对象

```java
package site.xiaofei.serializer;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tuaofei
 * @description 序列化器工厂（用于获取序列化对象）
 * @date 2024/10/23
 */
public class SerializerFactory {

    /**
     * 序列化映射（用于单例实现）
     */
    private static final Map<String,Serializer> KEY_SERIALIZER_MAP = new HashMap<String,Serializer>(){
        {
            put(SerializerKeys.JDK,new JdkSerializer());
            put(SerializerKeys.JSON,new JsonSerializer());
            put(SerializerKeys.KRYO,new KryoSerializer());
            put(SerializerKeys.HESSIAN,new HessianSerializer());
        }
    };

    /**
     * 默认序列化器
     */
    private static final Serializer DEFAULT_SERIALIZER = KEY_SERIALIZER_MAP.get(SerializerKeys.JDK);

    /**
     * 获取实例
     * @param key
     * @return
     */
    public static Serializer getInstance(String key){
        return KEY_SERIALIZER_MAP.getOrDefault(key,DEFAULT_SERIALIZER);
    }

}
```

（3）在全局配置类RpcConfig中补充序列化器的配置

```java
@Data
public class RpcConfig {

  ...

    /**
     * 序列化器
     */
    private String serializer = SerializerKeys.JDK;
}
```

(4)动态获取序列化器

修改以下类获取序列化器的方式

```
ServiceProxy
HttpServerHandler
```

```java
//指定序列化器
final Serializer serializer = SerializerFactory.getInstance(RpcApplication.getRpcConfig().getSerializer());
```

#### 自定义序列化器

支持用户自定义序列化器并指定key



（1）指定SPI配置目录

系统内置的SPI会加载`resources`资源目录下的`META-INF/services`目录，那我们自定义可改为`META-INF/rpc`目录



还可将系统内置SPI和用户自定义SPI

+ 用户自定义SPI：META-INF/rpc/custom；用户可在该目录下新增配置，加载自定义的实现类
+ 系统内置SPI：META-INF/rpc/system；RPC框架自带的实现类

这样所有的接口实现类都通过SPI动态加载，就不用在代码中写死了



创建`site.xiaofei.serializer.Serializer`

```
jdk=site.xiaofei.serializer.JdkSerializer
json=site.xiaofei.serializer.JsonSerializer
kryo=site.xiaofei.serializer.KryoSerializer
hessian=site.xiaofei.serializer.HessianSerializer
```

(2)编写SpiLoader加载器

读取配置并加载实现类



关键实现：

> 1.使用Map存储已加载的配置信息 `key -> 实现类`
>
> 2.扫描指定路径，读取每个配置文件，获取到`key -> 实现类`信息存储在map中
>
> 3.定义获取实例方法，根据用户传入的接口和key，从map中找到对应的是实现类，通过反射获取实现类对象
>
> 可以维护一个对象实例缓存，创建过的对象从缓存读取

```java
package site.xiaofei.utils;

import cn.hutool.core.io.resource.ResourceUtil;
import lombok.extern.slf4j.Slf4j;
import site.xiaofei.serializer.Serializer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author tuaofei
 * @description SPI加载器（支持键值对映射）
 * @date 2024/10/23
 */
@Slf4j
public class SpiLoader {

    /**
     * 存储已加载的类：接口名-><key,实现类>
     */
    private static Map<String, Map<String, Class<?>>> loaderMap = new ConcurrentHashMap<>();

    /**
     * 对象实例缓存（避免重复new），类路径->对象实例，单例模式
     */
    private static Map<String, Object> instanceCache = new ConcurrentHashMap<>();

    /**
     * 系统SPI目录
     */
    private static final String RPC_SYSTEM_SPI_DIR = "META-INF/rpc/system/";

    /**
     * 用户自定义SPI目录
     */
    private static final String RPC_CUSTOM_SPI_DIR = "META-INF/rpc/custom/";

    /**
     * 扫描路径
     */
    private static final String[] SCAN_DIRS = new String[]{RPC_SYSTEM_SPI_DIR, RPC_CUSTOM_SPI_DIR};

    /**
     * 动态加载的类列表
     */
    private static final List<Class<?>> LOAD_CLASS_LIST = Arrays.asList(Serializer.class);

    /**
     * 加载所有类型
     */
    public static void loadAll() {
        log.info("load all SPI");
        for (Class<?> aClass : LOAD_CLASS_LIST) {
            load(aClass);
        }
    }

    /**
     * 加载某个类型
     *
     * @param loadClass
     * @return
     */
    public static Map<String, Class<?>> load(Class<?> loadClass) {
        log.info("load type is {} SPI", loadClass.getName());
        //扫描路径，用户自定义的SPI优先级高于系统SPI
        Map<String, Class<?>> keyClassMap = new HashMap<>();
        for (String scanDir : SCAN_DIRS) {
            List<URL> resources = ResourceUtil.getResources(scanDir + loadClass.getName());
            //读取每个资源文件
            for (URL resource : resources) {
                try {
                    InputStreamReader inputStreamReader = new InputStreamReader(resource.openStream());
                    BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        String[] strArr = line.split("=");
                        if (strArr.length > 1) {
                            String key = strArr[0];
                            String className = strArr[1];
                            keyClassMap.put(key, Class.forName(className));
                        }

                    }
                } catch (Exception e) {
                    log.error("spi resource load error", e);
                }
            }
        }
        loaderMap.put(loadClass.getName(), keyClassMap);
        return keyClassMap;
    }

    public static <T> T getInstance(Class<?> tClass, String key) {
        String tClassName = tClass.getName();
        Map<String, Class<?>> ketClassMap = loaderMap.get(tClassName);
        if (ketClassMap == null) {
            throw new RuntimeException(String.format("SpiLoader not %s type", tClassName));
        }
        if (!ketClassMap.containsKey(key)) {
            throw new RuntimeException(String.format("SpiLoader %s is exist key= %s type", tClassName, key));
        }
        //获取要加载的实现类型
        Class<?> implClass = ketClassMap.get(key);
        //从实例缓存中加载指定类型的实例
        String implClassName = implClass.getName();
        if (!instanceCache.containsKey(implClassName)) {
            try {
                instanceCache.put(implClassName, implClass.newInstance());
            } catch (InstantiationException | IllegalAccessException e) {
                String errorMsg = String.format("%s class instance fail", implClassName);
                throw new RuntimeException(errorMsg, e);
            }
        }
        return (T) instanceCache.get(implClassName);
    }
}
```

上述代码，虽然提供了loadAll方法，扫描所有路径下的文件进行加载，但其实没必要使用。更推荐load方法，按需加载指定的类

> 注意：上述代码中获取配置文件使用了`ResourceUtil.getResources`，而不是通过文件路径获取，如果框架作为依赖被引入，是无法得到正确的文件路径的

（3）重构序列化器工厂

```java
package site.xiaofei.serializer;

import site.xiaofei.utils.SpiLoader;

import java.util.HashMap;
import java.util.Map;

/**
 * @author tuaofei
 * @description 序列化器工厂（用于获取序列化对象）
 * @date 2024/10/23
 */
public class SerializerFactory {

    /**
     * 序列化映射（用于单例实现）
     */
    /*private static final Map<String,Serializer> KEY_SERIALIZER_MAP = new HashMap<String,Serializer>(){
        {
            put(SerializerKeys.JDK,new JdkSerializer());
            put(SerializerKeys.JSON,new JsonSerializer());
            put(SerializerKeys.KRYO,new KryoSerializer());
            put(SerializerKeys.HESSIAN,new HessianSerializer());
        }
    };*/

    static {
        SpiLoader.load(Serializer.class);
    }

    /**
     * 默认序列化器
     */
    private static final Serializer DEFAULT_SERIALIZER = new JdkSerializer();

    /**
     * 获取实例
     *
     * @param key
     * @return
     */
    public static Serializer getInstance(String key) {
        return SpiLoader.getInstance(Serializer.class, key);
    }

}
```

使用静态代码块，在工厂首次加载时，调用SpiLoader.load加载序列化接口的实现类，就可以通过getInstance获取指定的实现类对象

### 测试

#### SPI加载测试

测试custom和system下的SPI配置文件是否成功加载

![image-20241024204041687](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241024204041687.png)

测试正常key和异常的情况，比如不存在key

测试key相同时，自定义配置能否覆盖系统配置



#### 完整测试

（1）修改消费者和生产者配置文件，指定不同的序列化器

```properties
rpc.name=xiaofei.site-rpc
rpc.version=1.0
rpc.serverPort=8082
rpc.mock=false
rpc.serializer=hessian
```

(2)启动生产者和消费者，验证能否正常完成请求



#### 自定义序列化器

1.写一个类实现Serializer接口

2.在custom目录下编写spi配置文件，加载该类



### 扩展

（1）实现更多不同协议的序列化器

（2）序列化器工厂可使用懒加载创建序列化器实例

（3）SPI loader支持懒加载，获取实例时才加载对应的类



## 5、注册中心基本实现

### 需求分析

![image-20241024214606160](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241024214606160.png)

帮助消费者获取到服务提供者的调用地址，不使用硬编码



### 设计方案

注册中心核心能力

+ 数据分布式存储：集中的注册信息数据存储、读取、共享
+ 服务注册：服务提供者上报服务信息到注册中心
+ 服务发现：服务消费者从注册中心拉取服务信息
+ 心跳检测：定期检查服务提供者的存活状态
+ 服务注销：手动剔除节点、或者自动剔除失效节点
+ 其它优化点：注册中心容错、服务消费者缓存...



#### 技术选型

主流的Zookeeper、Redis



本框架使用更适合存储元信息（注册信息）的云原生中间件Etcd，来实现



#### Etcd入门

##### Etcd介绍

github:https://github.com/etcd-io/etcd

一个Go语言实现的、开源的**分布式**键值存储系统，主要用于分布式系统中的服务发现、配置管理和分布式锁等场景



通常作为云原生应用的基础设施，存储一些元信息。k8s就使用了etcd来存储集群配置信息、状态信息、节点信息等



![etcd reliability is important](https://github.com/etcd-io/etcd/raw/main/logos/etcd-xkcd-2347.png)

除性能外，Etcd采用Raft一致性算法来保证数据的一致性和可靠性，具有高可用、强一致性、分布式特性

简单易用，提供简单的api、数据过期机制、数据监听和通知机制



##### Etcd数据结构和特性

使用层次化的键值来存储数据，支持类似于文件系统路径的层次结构，能够灵活的单key查询，前缀查询，范围查询

![image-20241024220541340](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241024220541340.png)





Etcd核心数据结构包括

1.key（键）：Etcd中的基本数据单元，类似于文件系统中的文件名。每一个键都唯一标识一个值，并且可包含子键，形成类似于路径的层次结构

2.Value（值）：与键关联的数据，可以是任意类型的数据，通常是字符串形式



核心特性，应用较多的

1.Leave(租约)：用于键值对进行TTL超时设置，过期时，相关的键值被自动删除

2.Watch（监听）：可监听特定键的变化，当键的值发生变化时，会触发相应的通知



##### Etcd如何保证数据一致性？

从表层看，Etcd支持事务操作，能够保证数据一致性

从底层看，Etcd使用Raft一致性算法来保证数据的一致性



Raft是一种分布式一致性算法，它确保了分布式系统中的所有节点在任何时间点都能达成一致的数据视图



Raft算法通过选举出一个领导者节点，领导者负责接收客户端的写请求，并将写操作复制在其它节点上。当客户端发送写请求时，领导者先将写操作写入自己的日志，并将写操作的日志条目分发给其他节点，其它节点收到日志后也将其写入自己的日志中。一旦**超过半数以上的节点**都将该日志条目成功写入到自己的日志中，改日志即被视为已提交，领导者会向客户端发生成功响应。在领导者发送成功响应后，该写操作就被视为已提交，从而保证数据一致性



如果领导者节点宕机或失去联系，Raft算法会在其他节点中**选举出新的领导者**,从而保证系统的可用性和一致性，新的领导者会继续接收客户端的写请求，并负责将写操作复制到其它节点上，从而保持数据的一致性



playground地址：http://play.etcd.io/play



尝试停止主节点，其余节点为从节点

![image-20241025224149446](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025224149446.png)

发现主节点挂掉后，并没有新的从节点成为主节点，因为还剩2个节点，一人一票，说都不服谁！这种现象也称为“脑裂”

![image-20241025224405406](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025224405406.png)

然后我们启动node4，会发现node3成为了主节点

![image-20241025224441162](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025224441162.png)



##### Etcd安装

下载：https://github.com/etcd-io/etcd/releases



安装完成，会得到3个版本

etcd：etcd服务本身

etcdctl：客户端，用于操作etcd服务

etcducl：备份恢复工具



执行etcd脚本后，可以启动etcd服务，服务默认占用2379和2380端口

2379：提供http api服务，和etcdctl交互

2380：集群中节点间通讯



![image-20241025225225094](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025225225094.png)

##### etcd可视化工具

etcdkeeper（推荐）：https://github.com/evildecay/etcdkeeper/

kstone：https://github.com/kstone-io/kstone/tree/master/charts



![image-20241025225347183](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025225347183.png)

默认启动端口8080，可修改

```cmd
./etcdkeeper -p 8081
```

![image-20241025225550871](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241025225550871.png)



##### etcd java客户端

jetcd：https://github.com/etcd-io/jetcd



> 注意：java版面必须大于11！



（1）引入jetcd依赖

```xml
<!-- https://mvnrepository.com/artifact/io.etcd/jetcd-core -->
        <dependency>
            <groupId>io.etcd</groupId>
            <artifactId>jetcd-core</artifactId>
            <version>0.7.7</version>
        </dependency>
```

(2)示例demo

```java
package site.xiaofei.registry;

import io.etcd.jetcd.*;
import io.etcd.jetcd.kv.GetResponse;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/25
 */
public class EtcdRegistry {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        /// create client using endpoints
        Client client = Client.builder().endpoints("http://localhost:2379").build();

        KV kvClient = client.getKVClient();
        ByteSequence key = ByteSequence.from("test_key".getBytes());
        ByteSequence value = ByteSequence.from("test_value".getBytes());

// put the key-value
        kvClient.put(key, value).get();

// get the CompletableFuture
        CompletableFuture<GetResponse> getFuture = kvClient.get(key);

// get the value from CompletableFuture
        GetResponse response = getFuture.get();
        List<KeyValue> kvs = response.getKvs();
        System.out.println(kvs);

// delete the key
//        kvClient.delete(key).get();

        Lease leaseClient = client.getLeaseClient();
//        leaseClient.keepAlive()


        Watch watchClient = client.getWatchClient();
        watchClient.watch(ByteSequence.from("test_key".getBytes()),(item)->{
            System.out.println("key:test_key,发生变化");
            System.out.println(item);
        });

        kvClient.delete(key).get();

    }
}
```

常用客户端和作用

1.**kvclient**：用于对etcd中的键值对进行操作。通过kvclient可以进行设置值、获取值、删除值、列出目录等操作

2.**leaseclient**：用于管理etcd的租约机制。租约是etcd中的一种时间片，用于为键值对分配生存时间，并在租约到期时自动删除相关的键值对。通过leaseclient可以创建、获取、续约和撤销租约

3.**watchclient**：用于监视etcd中键的变化，并在键的值变化时接收通知

4.clusterclient：用于etcd集群进行交互，包括添加、移除、列出成员、设置选举、获取集群的健康状态、获取成员列表信息等操作

5.authclient：用于管理etcd的身份验证和授权。通过authclient可以添加、删除、列出用户、角色等身份信息，以及授予或撤销用户或角色的权限

6.maintenanceclient:用于执行etcd的维护操作，如健康检查、数据库备份、成员维护、数据库快照、数据库压缩等

7.lockclient：用于实现分布式锁功能，通过lockclient可以在etcd上创建、获取、释放锁，能够轻松实现并发控制

8.electionclient：用于实现分布式选举功能，可以在etcd上创建选举、提交选票、监视选举结果等



一般使用前3个就足够了



etcd的数据结构

```
key: "test_key"
create_revision: 21
mod_revision: 21
version: 1
value: "test_value"
```



删除时，触发操作

```
key:test_key,发生变化
header {
  cluster_id: 14841639068965178418
  member_id: 10276657743932975437
  revision: 22
  raft_term: 2
}
events {
  type: DELETE
  kv {
    key: "test_key"
    mod_revision: 22
  }
}
```



#### 存储结构设计

1.key如何设计？

2.value如何设计？
3.key什么时候过期？



由于一个服务可能有多个服务提供者，可以设计两种结构

（1）层级结构

key规则：`/业务前缀/服务名/服务节点地址`

![image-20241028212957188](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241028212957188.png)

（2）列表结构。所有服务节点以列表形式整体作为value

![image-20241028213100575](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241028213100575.png)

选择哪种存储结构？

对于zookeeper和etcd支持层级查询中间件，使用第一种结构更清晰

对于redis，本身支持列表结构，可以选择第二种

要给key设置过期时间，如果服务提供者宕机了，也能超时自动移除



### 开发实现

#### 注册中心开发

##### (1)注册信息定义

在model下新建`ServiceMetaInfo`类，封装服务的注册信息，包含服务名称、服务版本号、服务地址、服务分组

新建一些工具方法，就可以查询对应版本和分组的服务

```java
package site.xiaofei.model;

import site.xiaofei.constant.RpcConstant;

/**
 * @author tuaofei
 * @description 服务元信息（注册信息）
 * @date 2024/10/28
 */
public class ServiceMetaInfo {

    /**
     * 服务名称
     */
    private String serviceName;

    /**
     * 服务版本号
     */
    private String serviceVersion = RpcConstant.DEFAULT_SERVICE_VERSION;

    /**
     * 服务域名
     */
    private String serviceHost;

    /**
     * 服务端口号
     */
    private Integer servicePost;

    /**
     * 服务分组（暂未实现）
     */
    private String serviceGroup = "default";

    /**
     * 获取服务键名
     *
     * @return
     */
    public String getServiceKey() {
        //后续可扩展服务分组
//        return String.format("%s:%s",serviceName,serviceVersion,serviceGroup);
        return String.format("%s:%s", serviceName, serviceVersion);
    }

    /**
     * 获取服务注册节点键名
     *
     * @return
     */
    public String getServiceNodeKey() {
        return String.format("%s/%s:%s", getServiceKey(), serviceHost, servicePost);
    }
}
```

注册信息包含服务版本号，把他定义为常量，默认值“1.0”

```java
public interface RpcConstant {

    /**
     * 默认配置文件加载前缀
     */
    String DEFAULT_CONFIG_PREFIX = "rpc";

    /**
     * 默认服务版本
     */
    String DEFAULT_SERVICE_VERSION = "1.0";
    
    ...
}
```

在`RpcRequest`请求类中使用

```java
package site.xiaofei.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.xiaofei.constant.RpcConstant;

import java.io.Serializable;

/**
 * @author tuaofei
 * @description Rpc请求
 * @date 2024/10/17
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RpcRequest implements Serializable {

    /**
     * 服务名称
     */
    private String serviceName;

    /**
     * 方法名称
     */
    private String methodName;

    /**
     * 服务版本
     */
    private String serviceVersion = RpcConstant.DEFAULT_SERVICE_VERSION;

    /**
     * 参数类型列表
     */
    private Class<?>[] paramTypes;

    /**
     * 参数列表
     */
    private Object[] args;

}
```

##### (2)注册中心配置

在config下创建注册中心配置类`RegistryConfig`，让用户配置连接注册中心需要的信息，包含注册中心类别、注册中心地址、用户名、密码、超时时间

````java
package site.xiaofei.config;

import lombok.Data;

/**
 * @author tuaofei
 * @description Rpc框架注册中心配置
 * @date 2024/10/28
 */
@Data
public class RegistryConfig {

    /**
     * 注册中心类别
     */
    private String registry = "etcd";

    /**
     * 注册中心地址
     */
    private String address = "http://localhost:2380";

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 超时时间，毫秒
     */
    private Long timeout = 10000L;
}
````

`RpcConfig`全局配置补充注册中心配置

```java
package site.xiaofei.config;

import lombok.Data;
import site.xiaofei.serializer.SerializerKeys;

/**
 * @author tuaofei
 * @description rpc框架配置
 * @date 2024/10/20
 */
@Data
public class RpcConfig {

    ...

    /**
     * 注册中心配置
     */
    private RegistryConfig registryConfig = new RegistryConfig();
}
```

##### (3)注册中心接口

可扩展配置，实现多种注册中心，使用SPI机制动态加载



提供初始化、注册服务、注销服务、服务发现（获取服务列表）、服务销毁



```java
package site.xiaofei.registry;

import site.xiaofei.config.RegistryConfig;
import site.xiaofei.model.ServiceMetaInfo;

import java.util.List;

/**
 * @author tuaofei
 * @description 注册中心
 * @date 2024/10/28
 */
public interface Registry {

    /**
     * 初始化
     * @param registryConfig
     */
    void init(RegistryConfig registryConfig);

    /**
     * 注册服务（服务端）
     * @param serviceMetaInfo
     */
    void register(ServiceMetaInfo serviceMetaInfo);

    /**
     * 注销服务（服务端）
     * @param serviceMetaInfo
     */
    void unRegister(ServiceMetaInfo serviceMetaInfo);

    /**
     * 服务发现（获取某服务的所有节点，消费端）
     * @param serviceKey
     * @return
     */
    List<ServiceMetaInfo> serviceDiscovery(String serviceKey);

    /**
     * 服务销毁
     */
    void destroy();
}
```



##### (4)Etcd注册中心实现

在registry目录下新建`EtcdRegistry`类，实现注册中心接口，先完成初始化方法，读取注册中心配置并初始化客户端对象

```java
package site.xiaofei.registry;

import cn.hutool.json.JSONUtil;
import io.etcd.jetcd.*;
import io.etcd.jetcd.kv.GetResponse;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.model.ServiceMetaInfo;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/10/25
 */
public class EtcdRegistry implements Registry{

    private Client client;

    private KV kvClient;

    /**
     * 根节点
     */
    private static final String ETCD_ROOT_PATH = "/rpc/";

    @Override
    public void init(RegistryConfig registryConfig) {
        client = Client.builder()
                .endpoints(registryConfig.getAddress())
                .connectTimeout(Duration.ofMillis(registryConfig.getTimeout()))
                .build();
        kvClient = client.getKVClient();
    }
}
```



上述代码，定义的etcd键存储的根路径为/rpc/，为了区分不同项目



服务注册，创建key并设置过期时间，value为服务注册信息的JSON序列化

```java
@Override
    public void register(ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        //创建 lease和kv客户端
        Lease leaseClient = client.getLeaseClient();

        //创建一个30s的租约
        long leaseId = leaseClient.grant(30).get().getID();

        //设置要存储的键值对
        String registryKey = ETCD_ROOT_PATH + serviceMetaInfo.getServiceNodeKey();
        ByteSequence key = ByteSequence.from(registryKey, StandardCharsets.UTF_8);
        ByteSequence value = ByteSequence.from(JSONUtil.toJsonStr(serviceMetaInfo), StandardCharsets.UTF_8);

        //将键值对与租约关联起来，并设置过期时间
        PutOption putOption = PutOption.builder().withLeaseId(leaseId).build();
        kvClient.put(key, value, putOption).get();
    }
```

服务注销，删除key

```java
@Override
    public void unRegister(ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        kvClient.delete(ByteSequence.from(ETCD_ROOT_PATH + serviceMetaInfo.getServiceNodeKey(), StandardCharsets.UTF_8)).get();
    }
```

服务发现，根据服务名称作为前缀，从etcd获取服务下的节点列表

```java
@Override
    public List<ServiceMetaInfo> serviceDiscovery(String serviceKey) {
        //前缀搜索，结尾一定要加‘/’
        String searchPrefix = ETCD_ROOT_PATH + "/";

        try {
            //前缀搜索
            GetOption getOption = GetOption.builder().isPrefix(true).build();
            List<KeyValue> keyValues = kvClient.get(ByteSequence.from(searchPrefix, StandardCharsets.UTF_8), getOption).get().getKvs();
            //解析服务信息
            return keyValues.stream()
                    .map(keyValue -> {
                        String value = keyValue.getValue().toString(StandardCharsets.UTF_8);
                        return JSONUtil.toBean(value, ServiceMetaInfo.class);
                    }).collect(Collectors.toList());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            throw new RuntimeException("获取服务列表失败", e);
        }
        return null;
    }
```

注册中心销毁，关闭项目后释放资源

```java
@Override
    public void destroy() {
        log.warn("当前节点下线");
        //释放资源
        if (kvClient != null){
            kvClient.close();
        }
        if (client != null){
            client.close();
        }
    }
```



### 支持配置和扩展注册中心



支持开发者指定和自定义注册中心，使用工厂创建对象、spi动态加载自定义的注册中心



(1)注册中心常量

在registry包下创建常量`RegistryKeys`

```java
package site.xiaofei.registry;

/**
 * @author tuaofei
 * @description 注册中心key常量
 * @date 2024/10/30
 */
public interface RegistryKeys {

    String ETCD = "etcd";

    String ZOOKEEPER = "zookeeper";
}
```

(2)使用工厂模式，支持根据key从SPI获取配置中心对象实例

在registry包下新建`RegistryFactory`类

```java
package site.xiaofei.registry;

import site.xiaofei.utils.SpiLoader;

/**
 * @author tuaofei
 * @description 注册中心工厂（用于获取注册中心对象）
 * @date 2024/10/30
 */
public class RegistryFactory {

    static {
        SpiLoader.load(Registry.class);
    }

    /**
     * 默认注册中心
     */
    private static final Registry DEFAULT_REGISTRY = new EtcdRegistry();

    /**
     * 获取实例
     *
     * @param key
     * @return
     */
    public static Registry getInstance(String key) {
        return SpiLoader.getInstance(Registry.class, key);
    }
}
```

（3）在`META-INF`的`rpc/system`目录下编写注册中心接口的SPI配置文件，文件名称为`site.xiaofei.registry.Registry`

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241030205213160.png" alt="image-20241030205213160" style="zoom: 80%;" />

```
etcd=site.xiaofei.registry.EtcdRegistry
```



（4）初始化启动流程，服务提供者和消费者都需要和注册中心建立连接，初始化流程放在`RpcApplication`类

修改init方法

```java
/**
     * 框架初始化，支持传入自定义配置
     *
     * @param newRpcConfig
     */
    public static void init(RpcConfig newRpcConfig) {
        rpcConfig = newRpcConfig;
        log.info("rpc init,config = {}", newRpcConfig.toString());

        //注册中心初始化
        RegistryConfig registryConfig = rpcConfig.getRegistryConfig();
        Registry registryInstance = RegistryFactory.getInstance(registryConfig.getRegistry());
        registryInstance.init(registryConfig);
        log.info("registry init,config = {}", registryConfig);
    }
```

### 完成调用流程

改造消费者调用服务代码



给`ServiceMetaInfo`类增加方法，便于获取可调用地址

```java
/**
     * 获取完整服务地址
     *
     * @return
     */
    public String getServiceAddress() {
        if (!StrUtil.contains(serviceHost, "http")) {
            return String.format("http://%s:%s", serviceHost, servicePost);
        }
        return String.format("%s:%s", serviceHost, servicePost);
    }
```

(2)修改服务代理`ServiceProxy`类，更改调用逻辑

```java
package site.xiaofei.proxy;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import site.xiaofei.RpcApplication;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.constant.RpcConstant;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.registry.Registry;
import site.xiaofei.registry.RegistryFactory;
import site.xiaofei.serializer.JdkSerializer;
import site.xiaofei.serializer.Serializer;
import site.xiaofei.serializer.SerializerFactory;

import javax.xml.ws.Service;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ServiceLoader;

/**
 * @author tuaofei
 * @description 服务代理（jdk动态代理）
 * @date 2024/10/18
 */
public class ServiceProxy implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //指定序列化器
        final Serializer serializer = SerializerFactory.getInstance(RpcApplication.getRpcConfig().getSerializer());

        //给rpc框架发送请求
        String serviceName = method.getDeclaringClass().getName();
        RpcRequest rpcRequest = RpcRequest.builder()
                .serviceName(serviceName)
                .methodName(method.getName())
                .paramTypes(method.getParameterTypes())
                .args(args)
                .build();

        try {
            byte[] bodyBytes = serializer.serializer(rpcRequest);
            byte[] resultBytes;
            RpcConfig rpcConfig = RpcApplication.getRpcConfig();
            if (rpcConfig == null) {
                throw new RuntimeException("get rpcConfig error");
            }
            //从注册中心获取服务地址
            Registry registry = RegistryFactory.getInstance(rpcConfig.getRegistryConfig().getRegistry());
            ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
            serviceMetaInfo.setServiceName(serviceName);
            serviceMetaInfo.setServiceVersion(RpcConstant.DEFAULT_SERVICE_VERSION);
            List<ServiceMetaInfo> serviceMetaInfoList = registry.serviceDiscovery(serviceMetaInfo.getServiceKey());
            if (CollUtil.isEmpty(serviceMetaInfoList)) {
                throw new RuntimeException("not find service address");
            }
            //暂时先取第一个
            ServiceMetaInfo selectedServiceMetaInfo = serviceMetaInfoList.get(0);

            String remoteUrl = selectedServiceMetaInfo.getServiceAddress();
            HttpResponse httpResponse = HttpRequest.post(remoteUrl)
                    .body(bodyBytes)
                    .execute();
            resultBytes = httpResponse.bodyBytes();
            RpcResponse rpcResponse = serializer.deserializer(resultBytes, RpcResponse.class);
            return rpcResponse.getData();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

获取到的注册中心地址可能是多个，暂时先取第一个，后续会优化



### 测试

#### 注册中心测试

验证注册中心能否正常完成服务注册、注销、服务发现



测试类`RegistryTest`

```java
package site.xiaofei.registry;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.model.ServiceMetaInfo;

import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description 注册中心测试
 * @date 2024/10/30
 */
public class RegistryTest {

    final Registry registry = new EtcdRegistry();

    @Before
    public void init(){
        RegistryConfig registryConfig = new RegistryConfig();
        registryConfig.setAddress("http://localhost:2379");
        registry.init(registryConfig);
    }

    @Test
    public void register() throws ExecutionException, InterruptedException {
        ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName("myService");
        serviceMetaInfo.setServiceVersion("1.0");
        serviceMetaInfo.setServiceHost("localhost");
        serviceMetaInfo.setServicePost(1234);
        registry.register(serviceMetaInfo);

        serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName("myService");
        serviceMetaInfo.setServiceVersion("1.0");
        serviceMetaInfo.setServiceHost("localhost");
        serviceMetaInfo.setServicePost(1235);
        registry.register(serviceMetaInfo);

        serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName("myService");
        serviceMetaInfo.setServiceVersion("2.0");
        serviceMetaInfo.setServiceHost("localhost");
        serviceMetaInfo.setServicePost(1234);
        registry.register(serviceMetaInfo);
    }

    @Test
    public void unRegister(){
        ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName("myService");
        serviceMetaInfo.setServiceVersion("1.0");
        serviceMetaInfo.setServiceHost("localhost");
        serviceMetaInfo.setServicePost(1234);
        registry.unRegister(serviceMetaInfo);
    }

    @Test
    public void serviceDiscovery(){
        ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName("myService");
        serviceMetaInfo.setServiceVersion("1.0");
        String serviceKey = serviceMetaInfo.getServiceKey();
        List<ServiceMetaInfo> serviceMetaInfoList = registry.serviceDiscovery(serviceKey);
        Assert.assertNotNull(serviceMetaInfoList);
    }
}
```

![image-20241030212647288](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241030212647288.png)



**遇到的问题**

##### 1.注销服务无法删除

修改EtcdRegistry的unRegister方法kvClient.delete()改为kvClient.delete().get()

```java
kvClient.delete(ByteSequence.from(ETCD_ROOT_PATH + serviceMetaInfo.getServiceNodeKey(), StandardCharsets.UTF_8)).get();
```

##### 2.获取所有服务获取不到

测试去掉/,实测都可以获取到

```java
//前缀搜索，结尾一定要加‘/’
String searchPrefix = ETCD_ROOT_PATH + serviceKey + "/";
```



#### 完成流程测试

在`rpc-provider`新增服务提供者示例，需要初始化rpc框架并且将服务手动注册到注册中心

```java
package site.xiaofei.provider;

import site.xiaofei.RpcApplication;
import site.xiaofei.common.service.UserService;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.registry.Registry;
import site.xiaofei.registry.RegistryFactory;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxHttpServer;

import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description 服务提供者示例，注册中心
 * @date 2024/10/30
 */
public class ProviderExample {

    public static void main(String[] args) {
        //rpc框架初始化
        RpcApplication.init();

        //注册服务
        String serviceName = UserService.class.getName();
        LocalRegistry.register(serviceName, UserServiceImpl.class);

        //注册服务到注册中心
        RpcConfig rpcConfig = RpcApplication.getRpcConfig();
        RegistryConfig registryConfig = rpcConfig.getRegistryConfig();
        Registry registry = RegistryFactory.getInstance(registryConfig.getRegistry());
        ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName(serviceName);
        serviceMetaInfo.setServiceHost(rpcConfig.getServerHost());
        serviceMetaInfo.setServicePost(rpcConfig.getServerPort());
        try {
            registry.register(serviceMetaInfo);
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        //启动web服务
        HttpServer httpServer = new VertxHttpServer();
        httpServer.doStart(RpcApplication.getRpcConfig().getServerPort());
    }
}
```

不改动消费者，测试RpcConsumerExample类是否正常运行

![image-20241030215557450](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241030215557450.png)

![image-20241030215230301](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241030215230301.png)



ttl可以加长一点，短了很快就过期了

```java
//创建一个5分钟s的租约
long leaseId = leaseClient.grant(300).get().getID();
```



## 6、注册中心优化

可优化点：

1.数据一致性：服务提供者如果下线了，注册中心需要即时更新，剔除下线节点。否则消费者可能会调用到以及下线的节点

2.性能优化：服务消费者每次都需要从注册中心获取服务，可以使用缓存进行优化

3.高可用性：保证注册中心本身不会宕机

4.可扩展性：实现更多的其它种类的注册中心



实践优化：

1.心跳检测、续期机制

2.服务节点下线机制

3.消费端服务缓存

4.基于Zookeeper的注册中心实现



### 心跳检测和续期机制

#### 心跳检测介绍

一种用于检测系统是否正常工作的机制。定期向目标系统发送心跳信号（请求）来检测是否正常响应，如果接收方在一定时间内没有收到或响应请求，就认为系统故障或不可用，触发相应的处理或告警机制

![image-20241031203436975](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241031203436975.png)

#### 方案设计

（1）实现心跳检测需要2个关键点：定时、网络请求

etcd自带key过期机制：给节点注册信息一个“倒计时”，让节点定期续期，重置自己的“倒计时”，如果节点已宕机，一直不续期，etcd就会对key进行过期删除



> 实现流程：
>
> 1.服务提供者向etcd注册自己的服务信息，并在注册时设施TTL
>
> 2.etcd在接收到服务提供者的注册信息后，会自动维护服务信息的TTL，并在TTL过期时删除该服务信息
>
> 3.服务提供者定期请求etcd续签自己的注册信息，重置TTL

> 注意：续期时间一定到小于过期时间，允许服务提供者有容错机会

(2)每个服务提供者需要找到自己注册的节点、续期自己的节点，怎么找到当前服务提供者自己的节点？

在服务提供者本地维护一个**已注册节点集合** ，注册时添加节点key到集合，只需要续期集合内的key



#### 开发实现

（1）给注册中心`Registry`接口增加心跳检测

```java
public interface Registry {

   ...
    /**
     * 心跳检测（服务端）
     */
    void heartBeat();
}
```



(2)维护一个本机注册的节点key集合，用于维护续期

```java
@Slf4j
public class EtcdRegistry implements Registry {

    /**
     * 本机注册的节点key（用于维护续期）
     */
    private final Set<String> localRegisterNodeKeySet = new HashSet<>();
```

在服务注册时，需要将节点添加到集合

```java
@Override
    public void register(ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        //创建 lease和kv客户端
        Lease leaseClient = client.getLeaseClient();

        //创建一个5分钟s的租约
        long leaseId = leaseClient.grant(300).get().getID();

        //设置要存储的键值对
        String registryKey = ETCD_ROOT_PATH + serviceMetaInfo.getServiceNodeKey();
        ByteSequence key = ByteSequence.from(registryKey, StandardCharsets.UTF_8);
        ByteSequence value = ByteSequence.from(JSONUtil.toJsonStr(serviceMetaInfo), StandardCharsets.UTF_8);

        //将键值对与租约关联起来，并设置过期时间
        PutOption putOption = PutOption.builder().withLeaseId(leaseId).build();
        kvClient.put(key, value, putOption).get();

        //添加节点信息到本地缓存
        localRegisterNodeKeySet.add(registryKey);
    }
```

在服务注册时，从集合移除对应节点

```java
 @Override
    public void unRegister(ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        String registryKey = ETCD_ROOT_PATH + serviceMetaInfo.getServiceNodeKey();
        kvClient.delete(ByteSequence.from(registryKey, StandardCharsets.UTF_8)).get();
        //从本地缓存删除节点
        localRegisterNodeKeySet.remove(registryKey);
    }
```

(3)在``实现heartBeat方法

```java
@Override
    public void heartBeat() {
        //1分钟执行一次
        CronUtil.schedule("0 0/1 * * * ? ", new Task() {
            @Override
            public void execute() {

                //遍历本届点所有key
                for (String key : localRegisterNodeKeySet) {
                    try {
                        List<KeyValue> keyValues = kvClient.get(ByteSequence.from(key, StandardCharsets.UTF_8))
                                .get()
                                .getKvs();
                        //该节点已过期
                        if (CollUtil.isEmpty(keyValues)) {
                            continue;
                        }
                        //节点未过期（需要重启节点才能重新注册）
                        KeyValue keyValue = keyValues.get(0);
                        String value = keyValue.getValue().toString(StandardCharsets.UTF_8);
                        ServiceMetaInfo serviceMetaInfo = JSONUtil.toBean(value, ServiceMetaInfo.class);
                        register(serviceMetaInfo);
                        log.info(String.format("服务：%s已续签", key));
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException(key + "续签失败", e);
                    }
                }
            }
        });

        //支持秒级别定时任务
        CronUtil.setMatchSecond(true);
        CronUtil.start();
    }
```

（4）开启heartBaeat

在初始化init方法，调用heartBeat

```java
@Override
    public void init(RegistryConfig registryConfig) {
        client = Client.builder()
                .endpoints(registryConfig.getAddress())
                .connectTimeout(Duration.ofMillis(registryConfig.getTimeout()))
                .build();
        kvClient = client.getKVClient();
        heartBeat();
    }
```

#### 测试

完善之前的`RegistryTest`

```java
package site.xiaofei.registry;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.model.ServiceMetaInfo;

import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description 注册中心测试
 * @date 2024/10/30
 */
public class RegistryTest {

    final Registry registry = new EtcdRegistry();

    @Before
    public void init(){
        RegistryConfig registryConfig = new RegistryConfig();
        registryConfig.setAddress("http://localhost:2379");
        registry.init(registryConfig);
    }

    ...

    @Test
    public void heartBeat() throws ExecutionException, InterruptedException {
        //init中已经执行心跳检测
        register();
        //阻塞1分钟
        Thread.sleep(60 * 1000L);
    }
}
```

观察可视化工具节点底部的过期时间

![image-20241031213205432](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241031213205432.png)



### 服务节点下线机制

当服务提供者宕机时，注册中心需要移除已注册的节点，否则会影响消费端调用

#### 方案设计

服务节点下线分为：

+ 主动下线：服务提供者项目正常退出时，主动从注册中心移除注册信息
+ 被动下线：服务提供者项目异常退出时，利用etcd的key过期机制自动移除

java项目退出时，怎么执行某个操作？

使用JVM的ShutdownHook。java虚拟机提供的一种机制，允许开发者在JVM即将关闭之前执行清理工作或其他必要的操作，例如关闭数据库连接、释放资源、保存临时数据等



spring boot也提供类型优雅停机能力

#### 开发实现

（1）完善etcd注册中心的`destory`，补充下线节点逻辑

```java
@Override
    public void destroy() {
        log.warn("当前节点下线");
        for (String key : localRegisterNodeKeySet) {
            try {
                kvClient.delete(ByteSequence.from(key, StandardCharsets.UTF_8)).get();
                log.info(String.format("服务：%s已下线", key));
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException(key + "节点下线失败");
            }
        }
        //释放资源
        if (kvClient != null) {
            kvClient.close();
        }
        if (client != null) {
            client.close();
        }
    }
```

（2）在`RpcApplication`的init中，注册Shutdown Hook，当程序正常退出时会执行注册中心的destory

```java
/**
     * 框架初始化，支持传入自定义配置
     *
     * @param newRpcConfig
     */
    public static void init(RpcConfig newRpcConfig) {
        rpcConfig = newRpcConfig;
        log.info("rpc init,config = {}", newRpcConfig.toString());

        //注册中心初始化
        RegistryConfig registryConfig = rpcConfig.getRegistryConfig();
        Registry registryInstance = RegistryFactory.getInstance(registryConfig.getRegistry());
        registryInstance.init(registryConfig);
        log.info("registry init,config = {}", registryConfig);

        //创建并注册shutdownhook，jvm退出时执行操作
        Runtime.getRuntime().addShutdownHook(new Thread(registryInstance::destroy));
    }
```



#### 测试

1.启动服务提供者，然后观察服务是否成功被注册

2.正常停止服务提供者，然后观察服务信息是否被删除

![image-20241031215350801](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241031215350801.png)



### 消费端服务缓存



正常情况下，服务节点信息列表的更新频率是不高的，所有在消费者获取到节点列表后，完成可以缓存在本地



#### 1.增加本地缓存

用一个列表来存储服务信息，提供写缓存、读缓存、请客缓存



暂时只考虑单服务缓存，如果要实现多服务缓存，可以改为使用Map接口

参考:[update 注册中心服务的本地缓存支持多个服务 · liyupi/yu-rpc@c420222](https://github.com/liyupi/yu-rpc/commit/c420222f4673114ee760b7875d68635902625ce9)



在`registry`包下新增缓存类`RegistryServiceCache`

```java
package site.xiaofei.registry;

import site.xiaofei.model.ServiceMetaInfo;

import java.util.List;

/**
 * @author tuaofei
 * @description 注册中心服务本地缓存
 * @date 2024/10/31
 */
public class RegistryServiceCache {

    /**
     * 服务缓存
     */
    List<ServiceMetaInfo> serviceCache;

    /**
     * 写缓存
     * @param newServiceCache
     */
    void writeCache(List<ServiceMetaInfo> newServiceCache){
        this.serviceCache = newServiceCache;
    }

    /**
     * 读缓存
     * @return
     */
    List<ServiceMetaInfo> readCahce(){
        return this.serviceCache;
    }

    /**
     * 清空缓存
     */
    void clearCache(){
        this.serviceCache = null;
    }
}
```

#### 2.使用本地缓存

（1）修改`EtcdRegistry`，使用本地缓存对象

```java
/**
     * 注册中心服务缓存
     */
    private final RegistryServiceCache registryServiceCache = new RegistryServiceCache();
```

(2)修改服务发现逻辑，优先从缓存获取服务；如果没有缓存，再从注册中心获取，并且设置到缓存

```java
@Override
    public List<ServiceMetaInfo> serviceDiscovery(String serviceKey) {
        //优先从缓存获取服务
        List<ServiceMetaInfo> cachedServiceMetaInfoList = registryServiceCache.readCahce();
        if (CollUtil.isNotEmpty(cachedServiceMetaInfoList)){
            return  cachedServiceMetaInfoList;
        }

        //前缀搜索，结尾一定要加‘/’
        String searchPrefix = ETCD_ROOT_PATH + serviceKey + "/";

        try {
            //前缀搜索
            GetOption getOption = GetOption.builder().isPrefix(true).build();
            List<KeyValue> keyValues = kvClient.get(ByteSequence.from(searchPrefix, StandardCharsets.UTF_8), getOption).get().getKvs();
            //解析服务信息
            List<ServiceMetaInfo> serviceMetaInfoList = keyValues.stream()
                    .map(keyValue -> {
                        String value = keyValue.getValue().toString(StandardCharsets.UTF_8);
                        return JSONUtil.toBean(value, ServiceMetaInfo.class);
                    }).collect(Collectors.toList());
            //写入服务缓存
            registryServiceCache.writeCache(serviceMetaInfoList);
            return serviceMetaInfoList;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            throw new RuntimeException("获取服务列表失败", e);
        }
        return null;
    }
```

#### 3.服务缓存更新-监听机制

当服务注册新秀发生变更时，需要即时更新消费端缓存



使用etcd的watch监听机制，当监听的某个key发生修改或删除时，会触发事件通知监听者

![image-20241031221330515](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241031221330515.png)

什么时候去创建watch监听器？



由于我们的目标说更新缓存，缓存是在服务端维护和使用的，所以应该是服务消费端去监听



服务发现方法（serviceDiscovery）。可以对本次获取到的所有服务节点key进行监听

还需要防止重复监听同一个key，可以通过定义一个已监听key的集合来实现



（1）registry注册中心接口新增监听key的方法

```java
public interface Registry {

    。。。

    /**
     * 监听（消费端）
     * @param serviceNodeKey
     */
    void watch(String serviceNodeKey);
}
```

（2）在EtcdRegistry类中，新增监听的key集合

可以使用`ConcurrentHashSet`防止并发冲突

```java
 /**
     * 正在监听的key集合
     */
    private final Set<String> watchingKeySet = new ConcurrentHashSet<>();
```

(3)在EtcdRegistry类中，实现监听的方法

通过etcd的`watchclient`实现监听，如果出现`delete` key删除事件，则清理服务注册缓存



> 注意：即时key在注册中心被删除后再重新设置，之前的监听依旧生效。所以只需要监听首次加入到监听集合的key，防止重复

```java
@Override
    public void watch(String serviceNodeKey) {
        Watch watchClient = client.getWatchClient();
        //之前为被监听，开启监听
        boolean newWatch = watchingKeySet.add(serviceNodeKey);
        if (newWatch) {
            watchClient.watch(ByteSequence.from(serviceNodeKey, StandardCharsets.UTF_8), response -> {
                for (WatchEvent event : response.getEvents()) {
                    switch (event.getEventType()) {
                        //key删除时触发
                        case DELETE:
                            //清理注册服务缓存
                            registryServiceCache.clearCache();
                            break;
                        case PUT:
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
```

（4）在消费端获取服务时调用watch方法，对获取到的服务节点key进行监听

修改服务发现方法

```java
@Override
    public void watch(String serviceNodeKey) {
        Watch watchClient = client.getWatchClient();
        //之前为被监听，开启监听
        boolean newWatch = watchingKeySet.add(serviceNodeKey);
        if (newWatch) {
            watchClient.watch(ByteSequence.from(serviceNodeKey, StandardCharsets.UTF_8), response -> {
                for (WatchEvent event : response.getEvents()) {
                    switch (event.getEventType()) {
                        //key删除时触发
                        case DELETE:
                            //清理注册服务缓存
                            registryServiceCache.clearCache();
                            log.warn("服务缓存：%s 清除");
                            break;
                        case PUT:
                            log.warn("服务缓存：%s 新增");
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    }
```

(5)测试

1.先启动服务提供者

2.修改服务消费者项目，连续调用服务3次，通过debug发现，第一次查注册中心、第二次查询缓存

3.第三次要调用服务，下线服务提供者，可以在注册中心看到节点的注册key已被删除

4.继续向下执行，发现第三次调用服务时，又重新从注册中心查询，说明缓存已经被更新



### ZookKeeper注册中心实现



步骤：

1.安装zookeeper

2.引入客户端依赖

3.实现接口

4.SPI补充Zookeeper注册中心



#### 安装zookeeper

（1）本地下载并启动Zookeeper，此处使用版本`3.8.4`

下载链接：https://dlcdn.apache.org/zookeeper/zookeeper-3.8.4/

![image-20241101225129290](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101225129290.png)

下载完成后进入bin目录

winodw需要修改配置文件名zoo_sample.cfg改名为zoo.cfg



分别启动zkServer.cmd和zkCli.cmd，默认会占用8080管理端和2181客户端

![image-20241101225305690](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101225305690.png)



主要修改项为dataDir和dataLogDir，dataDir是zookeeper存放数据的地方，dataLogDir是存放zookeeper日志的地方。

如果只配置dataDir，则数据和日志都会创建在dataDir目录下。

默认情况下zookeeper会占有8080端口，如果你不想8080端口被占用，增加一行admin.serverPort=8082，指定你自己的端口。

参考：[zookeeper快速入门一：zookeeper安装与启动-CSDN博客](https://blog.csdn.net/lamfang/article/details/108866448)

![image-20241101230236697](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101230236697.png)

##### 可能遇到的问题

###### 启动可能出现报错“Error：JAVA_HOME is not set 文件名、目录名或卷标语法不正确”

![image-20241101230531808](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101230531808.png)

需要修改启动文件把`%JAVA%`修改为`Java`

参考：[zookeeper启动：文件名、目录名或卷标语法不正确_启动zk 文件名、目录名或卷标语法不正确。-CSDN博客](https://blog.csdn.net/GoSaint/article/details/117781776)

![image-20241101230720520](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101230720520.png)



#### 开发实现



（2）引入客户端依赖

一般使用Apache Curator操作zookeeper

参考文档：https://curator.apache.org/docs/getting-started/

```pom
<dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-x-discovery</artifactId>
            <version>5.6.0</version>
        </dependency>
```

（3）zookeeper注册中心实现

参考：https://github.com/apache/curator/tree/master/curator-examples/src/main/java

```java
package site.xiaofei.registry;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ConcurrentHashSet;
import lombok.extern.slf4j.Slf4j;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.cache.CuratorCache;
import org.apache.curator.framework.recipes.cache.CuratorCacheListener;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.curator.x.discovery.ServiceDiscovery;
import org.apache.curator.x.discovery.ServiceDiscoveryBuilder;
import org.apache.curator.x.discovery.ServiceInstance;
import org.apache.curator.x.discovery.details.JsonInstanceSerializer;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.model.ServiceMetaInfo;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

/**
 * @author tuaofei
 * @description Zookeeper注册中心
 * @date 2024/11/1
 */
@Slf4j
public class ZookeeperRegistry implements Registry {

    private CuratorFramework client;

    private ServiceDiscovery<ServiceMetaInfo> serviceDiscovery;

    /**
     * 本机注册的节点key（用于维护续期）
     */
    private final Set<String> localRegisterNodeKeySet = new HashSet<>();

    /**
     * 注册中心服务缓存（支持多个服务键）
     */
    private final RegistryServiceMultiCache registryServiceMultiCache = new RegistryServiceMultiCache();

    /**
     * 正在监听的key集合
     */
    private final Set<String> watchingKeySet = new ConcurrentHashSet<>();

    /**
     * 根节点
     */
    private static final String ZK_ROOT_PATH = "/rpc/zk";

    @Override
    public void init(RegistryConfig registryConfig) {
        //构建client实例
        client = CuratorFrameworkFactory
                .builder()
                .connectString(registryConfig.getAddress())
                .retryPolicy(new ExponentialBackoffRetry(Math.toIntExact(registryConfig.getTimeout()), 3))
                .build();

        //构建ServiceDiscovery实例
        serviceDiscovery = ServiceDiscoveryBuilder.builder(ServiceMetaInfo.class)
                .client(client)
                .basePath(ZK_ROOT_PATH)
                .serializer(new JsonInstanceSerializer<>(ServiceMetaInfo.class))
                .build();

        //启动client和ServiceDiscovery
        try {
            client.start();
            serviceDiscovery.start();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void register(ServiceMetaInfo serviceMetaInfo) throws Exception {
        //注册到zk
        ServiceInstance<ServiceMetaInfo> serviceInstance = buildServiceInstance(serviceMetaInfo);
        serviceDiscovery.registerService(serviceInstance);

        //添加节点信息到本地缓存
        String registerKey = ZK_ROOT_PATH + "/" + serviceMetaInfo.getServiceNodeKey();
        localRegisterNodeKeySet.add(registerKey);
    }

    @Override
    public void unRegister(ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        try {
            ServiceInstance<ServiceMetaInfo> serviceInstance = buildServiceInstance(serviceMetaInfo);
            serviceDiscovery.unregisterService(serviceInstance);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ServiceMetaInfo> serviceDiscovery(String serviceKey) {
        //优先从缓存获取服务
        List<ServiceMetaInfo> cacheServiceMetaInfoList = registryServiceMultiCache.readCache(serviceKey);
        if (CollUtil.isNotEmpty(cacheServiceMetaInfoList)) {
            return cacheServiceMetaInfoList;
        }

        //查询服务信息
        try {
            Collection<ServiceInstance<ServiceMetaInfo>> serviceInstanceList = serviceDiscovery.queryForInstances(serviceKey);

            //解析服务信息
            List<ServiceMetaInfo> serviceMetaInfoList = serviceInstanceList.stream()
                    .map(ServiceInstance::getPayload)
                    .collect(Collectors.toList());

            //写入服务信息
            registryServiceMultiCache.writeCache(serviceKey, serviceMetaInfoList);
            return serviceMetaInfoList;
        } catch (Exception e) {
            throw new RuntimeException("获取服务列表失败", e);
        }
    }

    @Override
    public void destroy() {
        log.info("当前节点下线");
        for (String key : localRegisterNodeKeySet) {
            try {
                client.delete().guaranteed().forPath(key);
                log.info(String.format("服务：%s已下线", key));
            } catch (Exception e) {
                throw new RuntimeException(key + "节点下线失败");
            }
        }
        if (client != null) {
            client.close();
        }
    }

    @Override
    public void heartBeat() {
        //不需要心跳机制，建立了临时节点，如果服务器故障，临时节点直接丢失
    }

    @Override
    public void watch(String serviceNodeKey) {
        String watchKey = ZK_ROOT_PATH + "/" + serviceNodeKey;
        boolean newWatch = watchingKeySet.add(watchKey);
        if (newWatch) {
            CuratorCache curatorCache = CuratorCache.build(client, watchKey);
            curatorCache.start();
            curatorCache.listenable().addListener(
                    CuratorCacheListener
                            .builder()
                            .forDeletes(childData -> registryServiceMultiCache.clearCache(watchKey))
                            .forChanges((oldNote, node) -> registryServiceMultiCache.clearCache(watchKey))
                            .build()
            );
        }
    }

    private ServiceInstance<ServiceMetaInfo> buildServiceInstance(ServiceMetaInfo serviceMetaInfo) {
        String serviceAddress = serviceMetaInfo.getServiceHost() + ":" + serviceMetaInfo.getServicePost();
        try {
            return ServiceInstance.<ServiceMetaInfo>builder()
                    .id(serviceAddress)
                    .name(serviceMetaInfo.getServiceKey())
                    .address(serviceAddress)
                    .payload(serviceMetaInfo)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

（4）SPI增加对zookeeper支持

```
etcd=site.xiaofei.registry.EtcdRegistry
zookeeper=site.xiaofei.registry.ZookeeperRegistry
```

(5)更改服务提供者和消费者的注册中心配置来测试

```properties
rpc.name=xiaofei.site-rpc
rpc.version=1.0
rpc.serverPort=8082
rpc.mock=false
rpc.serializer=hessian
rpc.registryConfig.registry=zookeeper
rpc.registryConfig.address=localhost:2181
```

##### 可能遇到的问题

###### com.fasterxml.jackson.core.util.BufferRecycler.releaseToPool()V

![image-20241101231558371](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101231558371.png)

应该是这里的序列化错误，可能是zookeeper里面的fackson版本不对

![image-20241101231639891](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101231639891.png)

idea下载maven Dependency helper插件，查看冲突的依赖

![image-20241101231843185](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101231843185.png)

这里查看`rpc-core`的pom发现是curator-x-discovery里面的jackson-core和jackson-databind版本不一致

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101232024732.png" alt="image-20241101232024732" style="zoom:80%;" />

![image-20241101232337177](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101232337177.png)

修改pom,排除这两个依赖后重新导入新的相同版本，再重新测试就正常了

```pom
<dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-x-discovery</artifactId>
            <version>5.6.0</version>
            <exclusions>
                <exclusion>
                    <groupId>com.fasterxml.jackson.core</groupId>
                    <artifactId>jackson-databind</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>com.fasterxml.jackson.core</groupId>
                    <artifactId>jackson-core</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.18.0</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.18.0</version>
        </dependency>
```

参考：

[jackson解决java.lang.NoSuchMethodError_java.lang.nosuchmethoderror: 'void com.fasterxml.j-CSDN博客](https://blog.csdn.net/weixin_43933728/article/details/136920238)

[使用Maven Helper插件的Dependency Analyzer来分析工程的多级依赖关系，解决依赖冲突问题。-CSDN博客](https://blog.csdn.net/qq_25809317/article/details/109506462)



推荐一个可监控zookeeper的软件

[Redis Assistant - Redis可视化管理与监控工具](http://www.redisant.cn/)

![image-20241101233513458](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241101233513458.png)



#### 扩展

（1）完善服务注册信息

增加节点注册时间

（2）实现更多注册中心

使用redis实现注册中心

（3）保证注册中心高可用

了解etcd的集群机制

（4）服务注册信息实现的兜底策略

如果消费端调用节点发现节点失效，也可以考虑从注册中心更新服务注册信息、或强制更新本地缓存

（5）注册中心key监听时，采用观察者模式处理

定义一个listener接口，根据watch key的变更类型去调用listener的不同方法



## 7、自定义协议

### 需求分析



目前的RPC框架使用的是Http作为网络传输协议



一般情况下，RPC框架会注重性能，而HTTP协议的头部、请求响应格式较“重”，会影响网络传输性能



### 设计方案

+ 自定义网络传输
+ 自定义消息结构

#### 1.网络传输设计

目标：选择一个高性能通信的网络协议和传输方式



HTTP属于无状态协议，每个HTTP请求都是独立的，每次请求、响应都要重新建立和关闭连接



HTTP/1.1S使用了持久连接（keep-alive），允许在单个tcp连接上发送多个http请求和响应



#### 2.消息结构设计

目标：用最少的空间传递更多的信息



使用更轻量的类型，比如byte字节类型，只占用1个字节、8个bit位



**消息结构**

+ 魔数：安全校验，防止服务器处理了非框架的其它消息（类似HTTPS的安全证书）
+ 版本号：保证请求和响应的一致性（类似http协议的1.0、2.0版本）
+ 序列化方式：告诉服务器和客户端如何解析数据（类似http的content-type内容类型）
+ 类型：标识是请求/响应/心跳检测等（类似http请求头和响应头）
+ 状态：响应结果（200...）
+ 请求id：标识唯一，用来追溯每个请求
+ 内容body：请求体

http协议，有专门的key/value结果，容易得到完整的body数据

tcp协议，存在半包和粘包，每个传输可能不完整，需要在消息头增加`请求体数据长度`，保证完整获取body信息

![image-20241104201809716](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241104201809716.png)

请求头信息17字节，消息结构本质是一个字节数组

需要有消息解码器和消息编码器，编码器new一个空的Buffer缓冲区，按照顺序写入数据；解码器读取时按照顺序读取，就能还原数据



按照这种约定，就可以不用记录头信息，如magic魔数，不用存储"magic"字符串，读取第一个字节（前8bit）就能获取

*参考Dubbo协议设计*



### 开发实现

#### 1.消息结构

新建`protocol`包，自定义协议相关代码都放在这里

（1）新增协议消息类`ProtocolMessage`

消息头单独封装为内部类，消息体可使用泛型

```java
package site.xiaofei.protocol;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author tuaofei
 * @description 协议消息结构
 * @date 2024/11/4
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProtocolMessage<T> {

    /**
     * 消息头
     */
    private Header header;

    /**
     * 消息体（请求、响应对象）
     */
    private T body;

    /**
     * 协议消息头
     */
    @Data
    public static class Header{
        /**
         * 魔数
         */
        private byte magic;

        /**
         * 版本
         */
        private byte version;

        /**
         * 序列化器
         */
        private byte serializer;

        /**
         * 消息类型（请求、响应）
         */
        private byte type;

        /**
         * 状态
         */
        private byte status;

        /**
         * 请求id
         */
        private long requestId;

        /**
         * 消息体长度
         */
        private int bodyLength;
    }
}
```

(2)新建协议常量`ProtocolConstant`

记录和自定义协议的关键信息

```java
package site.xiaofei.protocol;

/**
 * @author tuaofei
 * @description 协议常量
 * @date 2024/11/4
 */
public interface ProtocolConstant {
    /**
     * 消息头长度
     */
    int MESSAGE_HEADER_LENGTH = 17;

    /**
     * 魔数
     */
    byte protocolMagic = 0x1;

    /**
     * 协议版本
     */
    byte protocol_version = 0x1;
}
```

（3）新建消息字段的枚举类`ProtocolMessageStatusEnum`

```java
package site.xiaofei.protocol;

import lombok.Getter;

/**
 * @author tuaofei
 * @description 协议消息的状态枚举
 * @date 2024/11/4
 */
@Getter
public enum ProtocolMessageStatusEnum {


    OK("ok", 20),
    BAD_REQUEST("badRequest", 40),
    BAD_RESPONSE("badResponse", 50);

    private final String text;
    private final int value;

    ProtocolMessageStatusEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 根据value获取枚举
     * @param value
     * @return
     */
    public static ProtocolMessageStatusEnum getEnumByValue(int value) {
        for (ProtocolMessageStatusEnum statusEnum : ProtocolMessageStatusEnum.values()) {
            if (value == statusEnum.getValue()) {
                return statusEnum;
            }
        }
        return null;
    }
}
```

协议消息类型枚举`ProtocolMessageTypeEnum`，包括请求、响应、心跳、其它

```java
package site.xiaofei.protocol;

/**
 * @author tuaofei
 * @description 协议消息的类型枚举
 * @date 2024/11/4
 */
public enum ProtocolMessageTypeEnum {

    REQUEST(0),
    RESPONSE(1),
    HEART_BEAT(2),
    OTHER(3);

    private final int key;

    ProtocolMessageTypeEnum(int key) {
        this.key = key;
    }

    /**
     * 根据key获取吗枚举
     *
     * @param key
     * @return
     */
    public static ProtocolMessageTypeEnum getEnumByKey(int key) {
        for (ProtocolMessageTypeEnum anEnum : ProtocolMessageTypeEnum.values()) {
            if (anEnum.key == key) {
                return anEnum;
            }
        }
        return null;
    }
}
```

协议序列化器枚举`ProtocolMessageSerializerEnum`

```java
package site.xiaofei.protocol;

/**
 * @author tuaofei
 * @description 协议消息的序列化枚举
 * @date 2024/11/4
 */
public enum ProtocolMessageSerializerEnum {

    JDK(0, "jdk"),
    JSON(1, "json"),
    KRYO(2, "kryo"),
    HESSIAN(3, "hessian");

    private final int key;

    private final String value;

    ProtocolMessageSerializerEnum(int key, String value) {
        this.key = key;
        this.value = value;
    }

    /**
     * 根据key获取枚举
     *
     * @param key
     * @return
     */
    public static ProtocolMessageSerializerEnum getEnumByKey(int key) {
        for (ProtocolMessageSerializerEnum anEnum : ProtocolMessageSerializerEnum.values()) {
            if (anEnum.key == key) {
                return anEnum;
            }
        }
        return null;
    }

    /**
     * 根据value获取枚举
     *
     * @param value
     * @return
     */
    public static ProtocolMessageSerializerEnum getEnumByValue(String value) {
        for (ProtocolMessageSerializerEnum anEnum : ProtocolMessageSerializerEnum.values()) {
            if (anEnum.value == value) {
                return anEnum;
            }
        }
        return null;
    }

}
```

#### 2.网络传输

新建`server.tcp`包，所有tcp服务相关代码都放在下面

（1）tcp服务器实现

新建`VertxTcpServer`类，先创建Vert.x服务器实例，定义处理请求方法，启动服务器



```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetServer;
import site.xiaofei.server.HttpServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class VertxTcpServer implements HttpServer {

    private byte[] handleRequest(byte[] requestData) {
        return "Hello , client".getBytes();
    }

    @Override
    public void doStart(int port) {
        //创建实例
        Vertx vertx = Vertx.vertx();

        //创建tcp服务器
        NetServer server = vertx.createNetServer();

        //处理请求
        server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                //处理接收到的字节数组
                byte[] requestData = buffer.getBytes();
                byte[] responseData = handleRequest(requestData);
                //发送响应
                socket.write(Buffer.buffer(responseData));
            });
        });

        //启动tcp服务并监听
        server.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println("tcp server started on port" + port);
            } else {
                System.out.println("failed to start tcp server" + result.cause());
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpServer().doStart(8888);
    }
}
```

socket.write，在向连接到服务器的客户端发送数据。发送的数据格式为buffer，这是vert.x提供的字节数组缓冲区实现



（2）客户端实现

新建`VertxTcpClient`，先创建Vert.x客户端实例，定义处理请求方法，与服务器建立连接

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.net.NetSocket;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class VertxTcpClient {

    public void start() {
        Vertx vertx = Vertx.vertx();

        vertx.createNetClient().connect(8888, "localhost", result -> {
            if (result.succeeded()) {
                System.out.println("connect to tcp server");
                NetSocket socket = result.result();
                //发送数据
                socket.write("hello server");
                //接收响应
                socket.handler(buffer -> {
                    System.out.println("received response from server :" + buffer.toString());
                });
            } else {
                System.out.println("failed to connect tcp server");
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpClient().start();
    }
}
```

（3）测试，是否正常通信



#### 3.编码/解码器

vert.x tcp服务器收发的消息是buffer类型，不能直接写入一个对象



需要编码器和解码器，将消息对象和buffer进行相互转换

![image-20241104212024664](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241104212024664.png)

http，请求body处理器获取到body字节数组->序列化/反序列化->rpcrequest/rpcresponse对象

tpc，buffer获取字节数组->编解码->rpcrequest/rpcresponse对象



(1)消息编码器

在protocol下新建`ProtocolMessageEncoder`

依次向buffer缓冲区写入消息对象里的字段

```java
package site.xiaofei.protocol;

import io.vertx.core.buffer.Buffer;
import site.xiaofei.serializer.Serializer;
import site.xiaofei.serializer.SerializerFactory;

import java.io.IOException;

/**
 * @author tuaofei
 * @description 编码器
 * @date 2024/11/4
 */
public class ProtocolMessageEncoder {

    public static Buffer encode(ProtocolMessage<?> protocolMessage) throws IOException {
        if (protocolMessage == null || protocolMessage.getHeader() == null) {
            return Buffer.buffer();
        }
        ProtocolMessage.Header header = protocolMessage.getHeader();
        //依次向缓冲区写入字节
        Buffer buffer = Buffer.buffer();
        buffer.appendByte(header.getMagic());
        buffer.appendByte(header.getVersion());
        buffer.appendByte(header.getSerializer());
        buffer.appendByte(header.getType());
        buffer.appendByte(header.getStatus());
        buffer.appendLong(header.getRequestId());
        //获取序列化器
        ProtocolMessageSerializerEnum serializerEnum = ProtocolMessageSerializerEnum.getEnumByKey(header.getSerializer());
        if (serializerEnum == null) {
            throw new RuntimeException("序列化协议不存在");
        }
        Serializer serializer = SerializerFactory.getInstance(serializerEnum.getValue());
        byte[] bodyBytes = serializer.serializer(protocolMessage.getBody());
        //写入body长度和数据
        buffer.appendInt(bodyBytes.length);
        buffer.appendBytes(bodyBytes);
        return buffer;
    }
}
```



（2）消息解码器

在protocol包下新建`ProtocolMessageDecoder`

依次从buffer缓冲区的指定位置读取字段，构造出完整的消息对象

```java
package site.xiaofei.protocol;

import io.vertx.core.buffer.Buffer;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.serializer.Serializer;
import site.xiaofei.serializer.SerializerFactory;

import java.io.IOException;

/**
 * @author tuaofei
 * @description 协议消息解码器
 * @date 2024/11/4
 */
public class ProtocolMessageDecoder {

    public static ProtocolMessage<?> decode(Buffer buffer) throws IOException {
        //分别从指定位置读取buffer
        ProtocolMessage.Header header = new ProtocolMessage.Header();
        byte magic = buffer.getByte(0);
        //校验魔数
        if (magic != ProtocolConstant.PROTOCOLMAGIC) {
            throw new RuntimeException("消息magic 非法");
        }
        header.setMagic(magic);
        header.setVersion(buffer.getByte(1));
        header.setSerializer(buffer.getByte(2));
        header.setType(buffer.getByte(3));
        header.setStatus(buffer.getByte(4));
        header.setRequestId(buffer.getLong(5));
        header.setBodyLength(buffer.getInt(13));
        //解决粘包问题，只读指定长度的数据
        byte[] bodyBytes = buffer.getBytes(ProtocolConstant.MESSAGE_HEADER_LENGTH, ProtocolConstant.MESSAGE_HEADER_LENGTH + header.getBodyLength());
        //解析消息体
        ProtocolMessageSerializerEnum serializerEnum = ProtocolMessageSerializerEnum.getEnumByKey(header.getSerializer());
        if (serializerEnum == null) {
            throw new RuntimeException("序列化消息的协议不存在");
        }
        Serializer serializer = SerializerFactory.getInstance(serializerEnum.getValue());
        ProtocolMessageTypeEnum messageTypeEnum = ProtocolMessageTypeEnum.getEnumByKey(header.getType());
        if (messageTypeEnum == null) {
            throw new RuntimeException("序列化消息的类型不存在");
        }
        switch (messageTypeEnum) {
            case REQUEST:
                RpcRequest request = serializer.deserializer(bodyBytes, RpcRequest.class);
                return new ProtocolMessage<>(header, request);
            case RESPONSE:
                RpcResponse response = serializer.deserializer(bodyBytes, RpcResponse.class);
                return new ProtocolMessage<>(header, response);
            case HEART_BEAT:
            case OTHERS:
            default:
                throw new RuntimeException("暂不支持该消息类型");
        }
    }

}
```

（3）测试，编码和解码器

```java
package site.xiaofei.protocol;

import cn.hutool.core.util.IdUtil;
import io.vertx.core.buffer.Buffer;
import org.junit.Assert;
import org.junit.Test;
import site.xiaofei.constant.RpcConstant;
import site.xiaofei.model.RpcRequest;

import java.io.IOException;

/**
 * @author tuaofei
 * @description 测试编码，解码
 * @date 2024/11/4
 */
public class ProtocolMessageTest {

    @Test
    public void testEncodeAndDecode() throws IOException {
        //构造消息
        ProtocolMessage<Object> protocolMessage = new ProtocolMessage<>();
        ProtocolMessage.Header header = new ProtocolMessage.Header();
        header.setMagic(ProtocolConstant.PROTOCOLMAGIC);
        header.setVersion(ProtocolConstant.PROTOCOL_VERSION);
        header.setSerializer((byte) ProtocolMessageSerializerEnum.JDK.getKey());
        header.setType((byte) ProtocolMessageTypeEnum.REQUEST.getKey());
        header.setStatus((byte) ProtocolMessageStatusEnum.OK.getValue());
        header.setRequestId(IdUtil.getSnowflakeNextId());
        header.setBodyLength(0);

        RpcRequest rpcRequest = new RpcRequest();
        rpcRequest.setServiceName("myService");
        rpcRequest.setMethodName("myMethod");
        rpcRequest.setServiceVersion(RpcConstant.DEFAULT_SERVICE_VERSION);
        rpcRequest.setArgs(new Object[]{"aaa","bbb"});
        protocolMessage.setHeader(header);
        protocolMessage.setBody(rpcRequest);

        Buffer encodeBuffer = ProtocolMessageEncoder.encode(protocolMessage);

        ProtocolMessage<?> message = ProtocolMessageDecoder.decode(encodeBuffer);

        Assert.assertNotNull(message);
    }

}
```

#### 4.请求处理器（服务提供者）

使用netty的pipeline组合多个handler（编码->解码->请求/响应处理）



请求处理器的作用是接收请求，通过反射调用服务实现类



新开发一个TcpServerHandler和之前的HttpServerHandler的区别只是在获取请求、写入响应的方式上，需要调用解码/编码器



实现Vert.x的`Handler<NetSocket>`接口，可以定义TCP请求处理器

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetSocket;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.protocol.ProtocolMessage;
import site.xiaofei.protocol.ProtocolMessageDecoder;
import site.xiaofei.protocol.ProtocolMessageEncoder;
import site.xiaofei.protocol.ProtocolMessageTypeEnum;
import site.xiaofei.registry.LocalRegistry;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class TcpServerHandler implements Handler<NetSocket> {
    @Override
    public void handle(NetSocket netSocket) {
        //处理连接
        netSocket.handler(buffer -> {
            //接收请求，解码
            ProtocolMessage<RpcRequest> protocolMessage;
            try {
                protocolMessage = (ProtocolMessage<RpcRequest>) ProtocolMessageDecoder.decode(buffer);
            } catch (IOException e) {
                throw new RuntimeException("协议消息解码错误");
            }
            RpcRequest rpcRequest = protocolMessage.getBody();

            //处理请求
            //构造响应结果
            RpcResponse rpcResponse = new RpcResponse();
            //获取服务实例，反射调用
            Class<?> implClass = LocalRegistry.get(rpcRequest.getServiceName());
            try {
                Method method = implClass.getMethod(rpcRequest.getMethodName(), rpcRequest.getParamTypes());
                Object result = method.invoke(implClass.newInstance(), rpcRequest.getArgs());

                //封装返回结果
                rpcResponse.setData(result);
                rpcResponse.setDataType(method.getReturnType());
                rpcResponse.setMessage("ok");
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | InstantiationException e) {
                e.printStackTrace();
                rpcResponse.setMessage(e.getMessage());
                rpcResponse.setException(e);
            }

            //发送响应，编码
            ProtocolMessage.Header header = protocolMessage.getHeader();
            header.setType((byte) ProtocolMessageTypeEnum.RESPONSE.getKey());
            ProtocolMessage<RpcResponse> responseProtocolMessage = new ProtocolMessage<>(header, rpcResponse);
            try {
                Buffer encode = ProtocolMessageEncoder.encode(responseProtocolMessage);
                netSocket.write(encode);
            } catch (IOException e) {
                throw new RuntimeException("协议消息编码错误");
            }
        });
    }
}
```

#### 5.请求发送（服务消费者）

```java
package site.xiaofei.proxy;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetClient;
import io.vertx.core.net.NetSocket;
import site.xiaofei.RpcApplication;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.constant.RpcConstant;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.protocol.*;
import site.xiaofei.registry.Registry;
import site.xiaofei.registry.RegistryFactory;
import site.xiaofei.serializer.JdkSerializer;
import site.xiaofei.serializer.Serializer;
import site.xiaofei.serializer.SerializerFactory;

import javax.xml.ws.Service;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ServiceLoader;
import java.util.concurrent.CompletableFuture;

/**
 * @author tuaofei
 * @description 服务代理（jdk动态代理）
 * @date 2024/10/18
 */
public class ServiceProxy implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //指定序列化器
        final Serializer serializer = SerializerFactory.getInstance(RpcApplication.getRpcConfig().getSerializer());

        //给rpc框架发送请求
        String serviceName = method.getDeclaringClass().getName();
        RpcRequest rpcRequest = RpcRequest.builder()
                .serviceName(serviceName)
                .methodName(method.getName())
                .paramTypes(method.getParameterTypes())
                .args(args)
                .build();

        try {
            byte[] bodyBytes = serializer.serializer(rpcRequest);
            byte[] resultBytes;
            RpcConfig rpcConfig = RpcApplication.getRpcConfig();
            if (rpcConfig == null) {
                throw new RuntimeException("get rpcConfig error");
            }
            //从注册中心获取服务地址
            Registry registry = RegistryFactory.getInstance(rpcConfig.getRegistryConfig().getRegistry());
            ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
            serviceMetaInfo.setServiceName(serviceName);
            serviceMetaInfo.setServiceVersion(RpcConstant.DEFAULT_SERVICE_VERSION);
            List<ServiceMetaInfo> serviceMetaInfoList = registry.serviceDiscovery(serviceMetaInfo.getServiceKey());
            if (CollUtil.isEmpty(serviceMetaInfoList)) {
                throw new RuntimeException("not find service address");
            }
            //暂时先取第一个
            ServiceMetaInfo selectedServiceMetaInfo = serviceMetaInfoList.get(0);

            /*String remoteUrl = selectedServiceMetaInfo.getServiceAddress();
            HttpResponse httpResponse = HttpRequest.post(remoteUrl)
                    .body(bodyBytes)
                    .execute();
            resultBytes = httpResponse.bodyBytes();
            RpcResponse rpcResponse = serializer.deserializer(resultBytes, RpcResponse.class);
            return rpcResponse.getData();*/

            //发送tcp请求
            Vertx vertx = Vertx.vertx();
            NetClient netClient = vertx.createNetClient();
            CompletableFuture<RpcResponse> responseFuture = new CompletableFuture<>();
            netClient.connect(selectedServiceMetaInfo.getServicePost(), selectedServiceMetaInfo.getServiceHost(), result -> {
                if (result.succeeded()) {
                    System.out.println("connected to tcp server");
                    NetSocket socket = result.result();
                    //发送数据，构造消息
                    ProtocolMessage<RpcRequest> protocolMessage = new ProtocolMessage<>();
                    ProtocolMessage.Header header = new ProtocolMessage.Header();
                    header.setMagic(ProtocolConstant.PROTOCOLMAGIC);
                    header.setVersion(ProtocolConstant.PROTOCOL_VERSION);
                    header.setSerializer((byte) ProtocolMessageSerializerEnum.getEnumByValue(RpcApplication.getRpcConfig().getSerializer()).getKey());
                    header.setType((byte) ProtocolMessageTypeEnum.REQUEST.getKey());
                    header.setRequestId(IdUtil.getSnowflakeNextId());
                    protocolMessage.setHeader(header);
                    protocolMessage.setBody(rpcRequest);
                    //编码请求
                    try {
                        Buffer encodeBuffer = ProtocolMessageEncoder.encode(protocolMessage);
                        socket.write(encodeBuffer);
                    } catch (IOException e) {
                        throw new RuntimeException("协议消息编码错误");
                    }

                    //接收响应
                    socket.handler(buffer -> {
                        try {
                            ProtocolMessage<RpcResponse> rpcResponseProtocolMessage = (ProtocolMessage<RpcResponse>) ProtocolMessageDecoder.decode(buffer);
                            responseFuture.complete(rpcResponseProtocolMessage.getBody());
                        } catch (IOException e) {
                            throw new RuntimeException("协议消息解码错误");
                        }
                    });
                } else {
                    System.out.println("failed to connect tcp server");
                }
            });

            RpcResponse response = responseFuture.get();
            netClient.close();
            return response.getData();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

由于Vert.x提供的请求处理器是异步、反应式的，为了方便获取结果，采用`CompletableFuture`转异步为同步

```java
CompletableFuture<RpcResponse> responseFuture = new CompletableFuture<>();
netClient.connect(xxx, result -> {
                ...
                //完成了响应
                responseFuture.complete(rpcResponseProtocolMessage.getBody());
});
//阻塞，知道响应完成，才会继续执行
 RpcResponse response = responseFuture.get();
```



### 测试

修改服务提供者`ProviderExample`，改为启动tcp服务器

```java
package site.xiaofei.provider;

import site.xiaofei.RpcApplication;
import site.xiaofei.common.service.UserService;
import site.xiaofei.config.RegistryConfig;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.registry.LocalRegistry;
import site.xiaofei.registry.Registry;
import site.xiaofei.registry.RegistryFactory;
import site.xiaofei.server.HttpServer;
import site.xiaofei.server.VertxHttpServer;
import site.xiaofei.server.tcp.VertxTcpServer;

import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description 服务提供者示例，注册中心
 * @date 2024/10/30
 */
public class ProviderExample {

    public static void main(String[] args) {
        //rpc框架初始化
        RpcApplication.init();

        //注册服务
        String serviceName = UserService.class.getName();
        LocalRegistry.register(serviceName, UserServiceImpl.class);

        //注册服务到注册中心
        RpcConfig rpcConfig = RpcApplication.getRpcConfig();
        RegistryConfig registryConfig = rpcConfig.getRegistryConfig();
        Registry registry = RegistryFactory.getInstance(registryConfig.getRegistry());
        ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
        serviceMetaInfo.setServiceName(serviceName);
        serviceMetaInfo.setServiceHost(rpcConfig.getServerHost());
        serviceMetaInfo.setServicePost(rpcConfig.getServerPort());
        try {
            registry.register(serviceMetaInfo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        //启动web服务
//        HttpServer httpServer = new VertxHttpServer();
//        httpServer.doStart(RpcApplication.getRpcConfig().getServerPort());

        //启动tcp服务
        VertxTcpServer tcpServer = new VertxTcpServer();
        tcpServer.doStart(RpcApplication.getRpcConfig().getServerPort());
    }
}
```

注意：修改`VertxTcpServer`处理器connectHandler为TcpServerHandler；启动端口从配置文件获取

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetServer;
import site.xiaofei.RpcApplication;
import site.xiaofei.server.HttpServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class VertxTcpServer implements HttpServer {

    @Override
    public void doStart(int port) {
       。。。

        //处理请求
        /*server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                //处理接收到的字节数组
                byte[] requestData = buffer.getBytes();
                byte[] responseData = handleRequest(requestData);
                //发送响应
                socket.write(Buffer.buffer(responseData));
            });
        });*/
        server.connectHandler(new TcpServerHandler());

        。。。
    }

    public static void main(String[] args) {
        new VertxTcpServer().doStart(RpcApplication.getRpcConfig().getServerPort());
    }
}
```

### 粘包和半包问题解决

#### 什么是粘包和半包？
使用TCP协议通信时可能会出现

理想情况下，客户端**连续两次**要发送消息
```java
//第一次
Hello,server!Hello,server!Hello,server!Hello,server!
//第二次
Hello,server!Hello,server!Hello,server!Hello,server!
```
但服务端可能收到的消息情况
（1）每次收到的数据更少，称为半包
```java
//第一次
Hello,server!Hello,server!
//第二次
Hello,server!Hello,server!Hello,server!
```

（2）每次收到的数据更多，称为粘包
```java
//第三次
Hello,server!Hello,server!Hello,server!Hello,server!Hello,server!
```

#### 半包粘包问题演示
（1）修改TCP客户端,连续发送1000次消息
```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.net.NetSocket;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class VertxTcpClient {

    public void start() {
        Vertx vertx = Vertx.vertx();

        vertx.createNetClient().connect(8888, "localhost", result -> {
            if (result.succeeded()) {
                System.out.println("connect to tcp server");
                NetSocket socket = result.result();
                for (int i = 0; i < 1000; i++) {
                    //发送数据
                    socket.write("hello,server!hello,server!hello,server!hello,server!");
                }
                //接收响应
                socket.handler(buffer -> {
                    System.out.println("received response from server :" + buffer.toString());
                });
            } else {
                System.out.println("failed to connect tcp server");
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpClient().start();
    }
}

```
（2）修改TCP客户端，打印每次收到的消息
```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetServer;
import lombok.extern.slf4j.Slf4j;
import site.xiaofei.RpcApplication;
import site.xiaofei.server.HttpServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
@Slf4j
public class VertxTcpServer implements HttpServer {

    private byte[] handleRequest(byte[] requestData) {
        return "Hello , client".getBytes();
    }

    @Override
    public void doStart(int port) {
        //创建实例
        Vertx vertx = Vertx.vertx();

        //创建tcp服务器
        NetServer server = vertx.createNetServer();

        //处理请求
        /*server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                //处理接收到的字节数组
                byte[] requestData = buffer.getBytes();
                byte[] responseData = handleRequest(requestData);
                //发送响应
                socket.write(Buffer.buffer(responseData));
            });
        });*/
//        server.connectHandler(new TcpServerHandler());
        server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                String testMessage = "hello,server!hello,server!hello,server!hello,server!";
                int messageLength = testMessage.getBytes().length;
                if (buffer.getBytes().length < messageLength) {
                    log.warn("半包，length = " + buffer.getBytes().length);
                    return;
                }
                if (buffer.getBytes().length > messageLength) {
                    log.warn("粘包，length = " + buffer.getBytes().length);
                    return;
                }
                String str = new String(buffer.getBytes(0, messageLength));
                log.info(str);
                if (testMessage.equals(str)) {
                    log.info("good");
                }
                //处理接收到的字节数组
                byte[] requestData = buffer.getBytes();
                byte[] responseData = handleRequest(requestData);
                //发送响应
                socket.write(Buffer.buffer(responseData));
            });
        });

        //启动tcp服务并监听
        server.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println("tcp server started on port" + port);
            } else {
                System.out.println("failed to start tcp server" + result.cause());
            }
        });
    }

    public static void main(String[] args) {
//        new VertxTcpServer().doStart(RpcApplication.getRpcConfig().getServerPort());
        new VertxTcpServer().doStart(8888);
    }
}
```

（3）测试运行
![粘包半包.png](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note粘包半包.png.png)

####  如何解决半包？

核心思路：在消息体中设置请求体的长度，服务端接收时，判断每次消息的长度是否符合预期，不完整就不读，留到下一次接收消息时再读取

```java
if (buffer == null || buffer.length() == 0) {
    throw new RuntimeException("消息 buffer 为空");
}
if (buffer.getBytes().length < ProtocolConstant.MESSAGE_HEADER_LENGTH) {
    throw new RuntimeException("出现了半包问题");
}
```

####  如何解决粘包？

核心思路：每次只读取指定长度的数据，超过长度的留着下一次接收消息时在读取

```java
// 解决粘包问题，只读指定长度的数据
byte[] bodyBytes = buffer.getBytes(17, 17 + header.getBodyLength());
```

#### vert.x解决半包和粘包

使用`RecordParser`来解决，保证下次读取到特定长度的字符



##### **基础代码**

（1）使用RecordParser读取固定长度的消息

```java
@Override
    public void doStart(int port) {
        //创建实例
        Vertx vertx = Vertx.vertx();

        //创建tcp服务器
        NetServer server = vertx.createNetServer();

        //处理请求
//        server.connectHandler(new TcpServerHandler());
        server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                String testMessage = "hello,server!hello,server!hello,server!hello,server!";
                int messageLength = testMessage.getBytes().length;
                RecordParser recordParser = RecordParser.newFixed(messageLength);
                recordParser.setOutput(new Handler<Buffer>() {
                    @Override
                    public void handle(Buffer event) {
                        String str = new String(buffer.getBytes(0, messageLength));
                        log.info(str);
                        if (testMessage.equals(str)) {
                            log.info("good");
                        }
                    }
                });
                socket.handler(recordParser);
            });
        });

        //启动tcp服务并监听
        server.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println("tcp server started on port" + port);
            } else {
                System.out.println("failed to start tcp server" + result.cause());
            }
        });
    }
public static void main(String[] args) {
        new VertxTcpServer().doStart(8888);
    }
```

核心为：RecordParser.newFixed(messageLength);

![image-20241106213823288](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241106213823288.png)



（2）实际，消息体长度是不固定的，要通过调整RecordParser的固定长度（变长）来解决

1. 先完整读取请求体长度，由于请求头信息长度固定，可以使用RecordParser保证每次都完整读取
2. 再根据请求头长度信息更改RecordParser的固定长度，保证完整获取到请求体



修改测试Tcpserver

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetServer;
import io.vertx.core.parsetools.RecordParser;
import lombok.extern.slf4j.Slf4j;
import site.xiaofei.RpcApplication;
import site.xiaofei.server.HttpServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
@Slf4j
public class VertxTcpServer implements HttpServer {

    @Override
    public void doStart(int port) {
        //创建实例
        Vertx vertx = Vertx.vertx();

        //创建tcp服务器
        NetServer server = vertx.createNetServer();

        //处理请求
//        server.connectHandler(new TcpServerHandler());
        server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                RecordParser recordParser = RecordParser.newFixed(8);
                recordParser.setOutput(new Handler<Buffer>() {

                    //初始化
                    int size = -1;
                    //一次完整的读取（header + body）
                    Buffer resultBuffer = Buffer.buffer();

                    @Override
                    public void handle(Buffer buffer) {
                        if (-1 == size){
                            //读取消息体长度
                            size = buffer.getInt(4);
                            recordParser.fixedSizeMode(size);
                            //写入头信息
                            resultBuffer.appendBuffer(buffer);
                        }else{
                            //写入消息体信息
                            resultBuffer.appendBuffer(buffer);
                            log.info(resultBuffer.toString());
                            //重置一轮
                            recordParser.fixedSizeMode(8);
                            size = -1;
                            resultBuffer = Buffer.buffer();
                        }
                    }
                });
                socket.handler(recordParser);
            });
        });

        //启动tcp服务并监听
        server.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println("tcp server started on port" + port);
            } else {
                System.out.println("failed to start tcp server" + result.cause());
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpServer().doStart(8888);
    }
}
```

修改测试tcp client，构造一个变长、长度信息不在buffer最开头（有一点偏移量）的消息

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetSocket;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
public class VertxTcpClient {

    public void start() {
        Vertx vertx = Vertx.vertx();

        vertx.createNetClient().connect(8888, "localhost", result -> {
            if (result.succeeded()) {
                System.out.println("connect to tcp server");
                NetSocket socket = result.result();
                for (int i = 0; i < 1000; i++) {
                    //发送数据
                    Buffer buffer = Buffer.buffer();
                    String str = "hello,server!hello,server!hello,server!hello,server!";
                    buffer.appendInt(0);
                    buffer.appendInt(str.getBytes().length);
                    buffer.appendBytes(str.getBytes());
                    socket.write(buffer);
                }
                //接收响应
                socket.handler(buffer -> {
                    System.out.println("received response from server :" + buffer.toString());
                });
            } else {
                System.out.println("failed to connect tcp server");
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpClient().start();
    }
}
```

测试结果应该正常

![image-20241106215637316](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241106215637316.png)

##### 封装半包粘包处理器

使用装饰者模式，对recordParser原有的buffer处理器能力增强

在server.tcp包下新增``，实现并增强``接口

```java
package site.xiaofei.server.tcp;


import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.parsetools.RecordParser;
import site.xiaofei.protocol.ProtocolConstant;

/**
 * @author tuaofei
 * @description 装饰着模式（使用recordParser对原有的buffer处理能力进行增强）
 * @date 2024/11/6
 */
public class TcpBufferHandlerWrapper implements Handler<Buffer> {

    private final RecordParser recordParser;

    public TcpBufferHandlerWrapper(Handler<Buffer> bufferHandler) {
        this.recordParser = initRecordParser(bufferHandler);
    }

    @Override
    public void handle(Buffer buffer) {
        recordParser.handle(buffer);
    }

    private RecordParser initRecordParser(Handler<Buffer> bufferHandler) {
        //构造RecordParser
        RecordParser recordParser = RecordParser.newFixed(ProtocolConstant.MESSAGE_HEADER_LENGTH);

        recordParser.setOutput(new Handler<Buffer>() {
            //初始化
            int size = -1;
            //一次完整的读取（header + body）
            Buffer resultBuffer = Buffer.buffer();

            @Override
            public void handle(Buffer buffer) {
                if (-1 == size) {
                    //读取消息体长度
                    size = buffer.getInt(13);
                    recordParser.fixedSizeMode(size);
                    //写入头信息
                    resultBuffer.appendBuffer(buffer);
                } else {
                    //写入消息体信息
                    resultBuffer.appendBuffer(buffer);
                    //已拼接完整buffer，执行处理
                    bufferHandler.handle(resultBuffer);
                    //重置一轮
                    recordParser.fixedSizeMode(ProtocolConstant.MESSAGE_HEADER_LENGTH);
                    size = -1;
                    resultBuffer = Buffer.buffer();
                }
            }
        });
        return recordParser;
    }
}
```

当调用处理器的handle方法时，改为调用recordParser.handle(buffer)

#### 优化客户端调用代码

(1)修改tcp请求处理器`TcpServerHandler`

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetSocket;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.protocol.ProtocolMessage;
import site.xiaofei.protocol.ProtocolMessageDecoder;
import site.xiaofei.protocol.ProtocolMessageEncoder;
import site.xiaofei.protocol.ProtocolMessageTypeEnum;
import site.xiaofei.registry.LocalRegistry;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author tuaofei
 * @description Tcp请求处理器
 * @date 2024/11/4
 */
public class TcpServerHandler implements Handler<NetSocket> {
    @Override
    public void handle(NetSocket netSocket) {
        TcpBufferHandlerWrapper bufferHandlerWrapper = new TcpBufferHandlerWrapper(buffer -> {
            //接收请求，解码
            ProtocolMessage<RpcRequest> protocolMessage;
            try {
                protocolMessage = (ProtocolMessage<RpcRequest>) ProtocolMessageDecoder.decode(buffer);
            } catch (IOException e) {
                throw new RuntimeException("协议消息解码错误");
            }
            RpcRequest rpcRequest = protocolMessage.getBody();

            //处理请求
            //构造响应结果
            RpcResponse rpcResponse = new RpcResponse();
            //获取服务实例，反射调用
            Class<?> implClass = LocalRegistry.get(rpcRequest.getServiceName());
            try {
                Method method = implClass.getMethod(rpcRequest.getMethodName(), rpcRequest.getParamTypes());
                Object result = method.invoke(implClass.newInstance(), rpcRequest.getArgs());

                //封装返回结果
                rpcResponse.setData(result);
                rpcResponse.setDataType(method.getReturnType());
                rpcResponse.setMessage("ok");
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | InstantiationException e) {
                e.printStackTrace();
                rpcResponse.setMessage(e.getMessage());
                rpcResponse.setException(e);
            }

            //发送响应，编码
            ProtocolMessage.Header header = protocolMessage.getHeader();
            header.setType((byte) ProtocolMessageTypeEnum.RESPONSE.getKey());
            ProtocolMessage<RpcResponse> responseProtocolMessage = new ProtocolMessage<>(header, rpcResponse);
            try {
                Buffer encode = ProtocolMessageEncoder.encode(responseProtocolMessage);
                netSocket.write(encode);
            } catch (IOException e) {
                throw new RuntimeException("协议消息编码错误");
            }
        });
        netSocket.handler(bufferHandlerWrapper);
    }
}
```

（2）修改客户端处理响应的代码

发送请求、处理响应封装到VertxTcpClient.doRequest

```
package site.xiaofei.server.tcp;

import cn.hutool.core.util.IdUtil;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetClient;
import io.vertx.core.net.NetSocket;
import lombok.extern.slf4j.Slf4j;
import site.xiaofei.RpcApplication;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.protocol.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * @author tuaofei
 * @description Vertx请求客户端
 * @date 2024/11/4
 */
@Slf4j
public class VertxTcpClient {

    public void start() {
        Vertx vertx = Vertx.vertx();

        vertx.createNetClient().connect(8888, "localhost", result -> {
            if (result.succeeded()) {
                System.out.println("connect to tcp server");
                NetSocket socket = result.result();
                for (int i = 0; i < 1000; i++) {
                    //发送数据
                    Buffer buffer = Buffer.buffer();
                    String str = "hello,server!hello,server!hello,server!hello,server!";
                    buffer.appendInt(0);
                    buffer.appendInt(str.getBytes(StandardCharsets.UTF_8).length);
                    buffer.appendBytes(str.getBytes());
                    socket.write(buffer);
                }
                //接收响应
                socket.handler(buffer -> {
                    System.out.println("received response from server :" + buffer.toString());
                });
            } else {
                System.out.println("failed to connect tcp server");
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpClient().start();
    }

    public static RpcResponse doRequest(RpcRequest rpcRequest, ServiceMetaInfo serviceMetaInfo) throws ExecutionException, InterruptedException {
        //发送tcp请求
        Vertx vertx = Vertx.vertx();
        NetClient netClient = vertx.createNetClient();
        CompletableFuture<RpcResponse> responseFuture = new CompletableFuture<>();
        netClient.connect(serviceMetaInfo.getServicePost(), serviceMetaInfo.getServiceHost(),
                result -> {
                    if (!result.succeeded()) {
                        log.error("failed to connect to tcp server");
                        return;
                    }
                    NetSocket socket = result.result();
                    ProtocolMessage<RpcRequest> protocolMessage = new ProtocolMessage<>();
                    ProtocolMessage.Header header = new ProtocolMessage.Header();
                    header.setMagic(ProtocolConstant.PROTOCOLMAGIC);
                    header.setVersion(ProtocolConstant.PROTOCOL_VERSION);
                    header.setSerializer((byte) ProtocolMessageSerializerEnum.getEnumByValue(RpcApplication.getRpcConfig().getSerializer()).getKey());
                    header.setType((byte) ProtocolMessageTypeEnum.REQUEST.getKey());
                    //全局请求id
                    header.setRequestId(IdUtil.getSnowflakeNextId());
                    protocolMessage.setHeader(header);
                    protocolMessage.setBody(rpcRequest);

                    //编码请求
                    try {
                        Buffer encodeBuffer = ProtocolMessageEncoder.encode(protocolMessage);
                        socket.write(encodeBuffer);
                    } catch (IOException e) {
                        throw new RuntimeException("协议消息编码错误");
                    }

                    //接收响应
                    TcpBufferHandlerWrapper bufferHandlerWrapper = new TcpBufferHandlerWrapper(buffer -> {
                        try {
                            ProtocolMessage<RpcResponse> rpcResponseProtocolMessage = (ProtocolMessage<RpcResponse>) ProtocolMessageDecoder.decode(buffer);
                            responseFuture.complete(rpcResponseProtocolMessage.getBody());
                        } catch (IOException e) {
                            throw new RuntimeException("协议消息解码错误");
                        }
                    });
                    socket.handler(bufferHandlerWrapper);
                });
        RpcResponse rpcResponse = responseFuture.get();
        netClient.close();
        return rpcResponse;
    }
}
```

（3）修改serviceProxy，调用VertxTcpClient

```java
package site.xiaofei.proxy;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetClient;
import io.vertx.core.net.NetSocket;
import site.xiaofei.RpcApplication;
import site.xiaofei.config.RpcConfig;
import site.xiaofei.constant.RpcConstant;
import site.xiaofei.model.RpcRequest;
import site.xiaofei.model.RpcResponse;
import site.xiaofei.model.ServiceMetaInfo;
import site.xiaofei.protocol.*;
import site.xiaofei.registry.Registry;
import site.xiaofei.registry.RegistryFactory;
import site.xiaofei.serializer.JdkSerializer;
import site.xiaofei.serializer.Serializer;
import site.xiaofei.serializer.SerializerFactory;
import site.xiaofei.server.tcp.VertxTcpClient;

import javax.xml.ws.Service;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ServiceLoader;
import java.util.concurrent.CompletableFuture;

/**
 * @author tuaofei
 * @description 服务代理（jdk动态代理）
 * @date 2024/10/18
 */
public class ServiceProxy implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //指定序列化器
        final Serializer serializer = SerializerFactory.getInstance(RpcApplication.getRpcConfig().getSerializer());

        //给rpc框架发送请求
        String serviceName = method.getDeclaringClass().getName();
        RpcRequest rpcRequest = RpcRequest.builder()
                .serviceName(serviceName)
                .methodName(method.getName())
                .paramTypes(method.getParameterTypes())
                .args(args)
                .build();

        try {
            RpcConfig rpcConfig = RpcApplication.getRpcConfig();
            if (rpcConfig == null) {
                throw new RuntimeException("get rpcConfig error");
            }
            //从注册中心获取服务地址
            Registry registry = RegistryFactory.getInstance(rpcConfig.getRegistryConfig().getRegistry());
            ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
            serviceMetaInfo.setServiceName(serviceName);
            serviceMetaInfo.setServiceVersion(RpcConstant.DEFAULT_SERVICE_VERSION);
            List<ServiceMetaInfo> serviceMetaInfoList = registry.serviceDiscovery(serviceMetaInfo.getServiceKey());
            if (CollUtil.isEmpty(serviceMetaInfoList)) {
                throw new RuntimeException("not find service address");
            }
            //暂时先取第一个
            ServiceMetaInfo selectedServiceMetaInfo = serviceMetaInfoList.get(0);

            /*String remoteUrl = selectedServiceMetaInfo.getServiceAddress();
            HttpResponse httpResponse = HttpRequest.post(remoteUrl)
                    .body(bodyBytes)
                    .execute();
            resultBytes = httpResponse.bodyBytes();
            RpcResponse rpcResponse = serializer.deserializer(resultBytes, RpcResponse.class);
            return rpcResponse.getData();*/

            //发送tcp请求
            RpcResponse rpcResponse = VertxTcpClient.doRequest(rpcRequest, selectedServiceMetaInfo);
            return rpcResponse.getData();
        } catch (Exception e) {
            throw new RuntimeException("调用失败");
        }
    }
}
```

修改`VertxTcpServer`的处理器，不然无法处理会一直卡着

```java
package site.xiaofei.server.tcp;

import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.net.NetServer;
import io.vertx.core.parsetools.RecordParser;
import lombok.extern.slf4j.Slf4j;
import site.xiaofei.RpcApplication;
import site.xiaofei.server.HttpServer;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/4
 */
@Slf4j
public class VertxTcpServer implements HttpServer {

    @Override
    public void doStart(int port) {
        //创建实例
        Vertx vertx = Vertx.vertx();

        //创建tcp服务器
        NetServer server = vertx.createNetServer();

        //处理请求
        server.connectHandler(new TcpServerHandler());
        /*server.connectHandler(socket -> {
            //处理连接
            socket.handler(buffer -> {
                RecordParser recordParser = RecordParser.newFixed(8);
                recordParser.setOutput(new Handler<Buffer>() {

                    //初始化
                    int size = -1;
                    //一次完整的读取（header + body）
                    Buffer resultBuffer = Buffer.buffer();

                    @Override
                    public void handle(Buffer buffer) {
                        if (-1 == size){
                            //读取消息体长度
                            size = buffer.getInt(4);
                            recordParser.fixedSizeMode(size);
                            //写入头信息
                            resultBuffer.appendBuffer(buffer);
                        }else{
                            //写入消息体信息
                            resultBuffer.appendBuffer(buffer);
                            log.info(resultBuffer.toString());
                            //重置一轮
                            recordParser.fixedSizeMode(8);
                            size = -1;
                            resultBuffer = Buffer.buffer();
                        }
                    }
                });
                socket.handler(recordParser);
            });
        });*/

        //启动tcp服务并监听
        server.listen(port, result -> {
            if (result.succeeded()) {
                System.out.println("tcp server started on port" + port);
            } else {
                System.out.println("failed to start tcp server" + result.cause());
            }
        });
    }

    public static void main(String[] args) {
        new VertxTcpServer().doStart(RpcApplication.getRpcConfig().getServerPort());
//        new VertxTcpServer().doStart(8888);
    }
}
```

### 扩展

（1）定义一个占用空间更少的RPC协议的消息结构

能否只占用4bit？





## 8、负载均衡

### 需求分析

我们之前的代码如果同一个服务有多个服务提供者，目前消费者始终读取了第一个节点，会增大单个节点的压力，没有利用其它资源

```java
//从注册中心获取服务地址
            Registry registry = RegistryFactory.getInstance(rpcConfig.getRegistryConfig().getRegistry());
            ServiceMetaInfo serviceMetaInfo = new ServiceMetaInfo();
            serviceMetaInfo.setServiceName(serviceName);
            serviceMetaInfo.setServiceVersion(RpcConstant.DEFAULT_SERVICE_VERSION);
            List<ServiceMetaInfo> serviceMetaInfoList = registry.serviceDiscovery(serviceMetaInfo.getServiceKey());
            if (CollUtil.isEmpty(serviceMetaInfoList)) {
                throw new RuntimeException("not find service address");
            }
            //暂时先取第一个
            ServiceMetaInfo selectedServiceMetaInfo = serviceMetaInfoList.get(0);
```

完全可以从服务提供者节点中，选择一个服务提供者发起请求，不是每次都请求同一个服务提供者，这个操作称为负载均衡



### 负载均衡

负载？要处理的工作和压力，比如网络请求、事务、数据处理任务

均衡？把工作和压力平均分配给多个工作者，从而分摊压力



常用负载均衡技术

Nginx（七层负载均衡）

LVS（四层负载均衡）



#### 常见负载均衡算法

（1）轮询：按照循环的顺序请求分配给每个服务器，适用于各服务器性能相近

（2）随机：随机选择一个服务器来处理请求，适用于服务器性能相近，负载均匀

（3）加权轮询：根据服务器性能或权重分配请求，性能更好的服务器会获得更多请求，适用于服务器性能不均

（4）加权随机：根据服务器的权重随机选择一个服务器处理请求，适用于服务器性能不均

（5）最小连接数：选择当前连接数量最少的服务器来处理请求，适用于长连接场景

（6）IP hash：根据客户端IP地址的哈希值选择服务器处理请求，确保同一个客户端的请求始终被分配到同一个服务器上，适用于需要保持会话一致性的场景



#### 一致性Hash

