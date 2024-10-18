## RPC框架实现思路

RPC：远程过程调用，简化调用



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
> 序列化：将java对象转换为可传输的字节数组
>
> 反序列化：将字节数组转换为java对象

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