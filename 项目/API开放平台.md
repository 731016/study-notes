## 项目学习地址
笔记

编程导航：https://www.code-nav.cn/course/1790979723916521474

项目地址：https://github.com/731016/api-call

完整示例项目地址：https://api.suki.vin/

nacos下载地址：https://nacos.io/

### 主要技术栈

springboot starter sdk开发

api签名认证

dubbo分布式（rpc nacos）

spring cloud gateway微服务网关

## 免费api接口平台
https://api.btstu.cn/

## 使用技术文档

[开始使用 - Ant Design Pro](https://pro.ant.design/zh-CN/getting-started/)



## 开发SDK（spring boot starter）


必须依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```


依赖，配置properties、yml配置提示

Spring Configuration Processor

![image-20230604185533510](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041855114.png)

pom.xml移除build配置内容



加载配置文件
![image-20230604185027330](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041850926.png)
```java
@Configuration
//读取application配置；设置所有配置前缀
@ConfigurationProperties("yuapi.client")
@Data
//自动注册bean
@ComponentScan
public class YuApiClientConfig {

    private String accessKey;

    private String secretKey;

    @Bean
    public YuApiClient yuApiClient() {
        return new YuApiClient(accessKey, secretKey);
    }

}
```



创建resources/META-INF/spring.factories文件加载的配置类

copy配置类的路径，指定指定配置类

![image-20230604185055581](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041850095.png)

通过spring.factories配置，springboot在启动时会自动加载并实例化配置类

mvn install 打包可以在项目中导入使用

![image-20230604185127840](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041851070.png)


在其他服务中bom中引入配置，在配置文件中即可使用



## API签名认证

步骤：签发签名，使用签名



一般通过request header传递参数

accessKey：标识

secretKey：密钥 ，不能用来传递！！！

用户请求参数：body

防重放

sign：签名，使用accessKey + 用户请求参数拼接 加密之后 后台也通过相同方式加密验证

随机数nonce：只能使用一次，防止重放攻击

timestamp：时间戳，校验是否在事件的之内


这些可通过开发SDK，提取出来，免得每次都要写

详细流程：
新用户注册，分配 accessKey, secretKey，保存

服务之间调用：通过用户信息查询accessKey, secretKey

（1）请求sdk：组装参数：{accessKey，nonce：随机数，body，timestamp：时间戳，sign：通过body+secretKey生成}

（2）请求接口服务：
    1.accessKey：查询是否分配用户
    2.timestamp：校验时间戳是否过期
    3.body + secretKey（数据库查询，不允许在服务器之间传递）生成 sign，校验传递的sign是否正确

外部系统调用：直接携带参数请求接口服务
    1.通过用户信息查询accessKey, secretKey
    2.根据获取的信息组装参数访问接口服务


## API网关

使用前缀匹配断言：https://docs.spring.io/spring-cloud-gateway/current/reference/html/#the-path-route-predicate-factory

```yaml
spring:
  cloud:
    gateway:
      default-filters:
        - AddResponseHeader=source, yupi
      routes:
        - id: api_route
          uri: http://localhost:8123
          predicates:
            - Path=/api/**
```

所有路径为/api/**的请求进行转发，转发到http://localhost:8123



### 使用全局过滤器GlobalFilter

参考：https://blog.csdn.net/qq_19636353/article/details/126759522

```java
@Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1. 请求日志
        ServerHttpRequest request = exchange.getRequest();
        String path = INTERFACE_HOST + request.getPath().value();
        String method = request.getMethod().toString();
        log.info("请求唯一标识：" + request.getId());
        log.info("请求路径：" + path);
        log.info("请求方法：" + method);
        log.info("请求参数：" + request.getQueryParams());
        String sourceAddress = request.getLocalAddress().getHostString();
        log.info("请求来源地址：" + sourceAddress);
        log.info("请求来源地址：" + request.getRemoteAddress());
        ServerHttpResponse response = exchange.getResponse();
        // 2. 访问控制 - 黑白名单
        if (!IP_WHITE_LIST.contains(sourceAddress)) {
            response.setStatusCode(HttpStatus.FORBIDDEN);
            return response.setComplete();
        }
        // 3. 用户鉴权（判断 ak、sk 是否合法）
        HttpHeaders headers = request.getHeaders();
        String accessKey = headers.getFirst("accessKey");
        String nonce = headers.getFirst("nonce");
        String timestamp = headers.getFirst("timestamp");
        String sign = headers.getFirst("sign");
        String body = headers.getFirst("body");
        // todo 实际情况应该是去数据库中查是否已分配给用户
        User invokeUser = null;
        try {
            invokeUser = innerUserService.getInvokeUser(accessKey);
        } catch (Exception e) {
            log.error("getInvokeUser error", e);
        }
        if (invokeUser == null) {
            return handleNoAuth(response);
        }
//        if (!"yupi".equals(accessKey)) {
//            return handleNoAuth(response);
//        }
        if (Long.parseLong(nonce) > 10000L) {
            return handleNoAuth(response);
        }
        // 时间和当前时间不能超过 5 分钟
        Long currentTime = System.currentTimeMillis() / 1000;
        final Long FIVE_MINUTES = 60 * 5L;
        if ((currentTime - Long.parseLong(timestamp)) >= FIVE_MINUTES) {
            return handleNoAuth(response);
        }
        // 实际情况中是从数据库中查出 secretKey
        String secretKey = invokeUser.getSecretKey();
        String serverSign = SignUtils.genSign(body, secretKey);
        if (sign == null || !sign.equals(serverSign)) {
            return handleNoAuth(response);
        }
        // 4. 请求的模拟接口是否存在，以及请求方法是否匹配
        InterfaceInfo interfaceInfo = null;
        try {
            interfaceInfo = innerInterfaceInfoService.getInterfaceInfo(path, method);
        } catch (Exception e) {
            log.error("getInterfaceInfo error", e);
        }
        if (interfaceInfo == null) {
            return handleNoAuth(response);
        }
        // todo 是否还有调用次数
        // 5. 请求转发，调用模拟接口 + 响应日志
        //        Mono<Void> filter = chain.filter(exchange);
        //        return filter;
        return handleResponse(exchange, chain, interfaceInfo.getId(), invokeUser.getId());

    }

    /**
     * 处理响应
     *
     * @param exchange
     * @param chain
     * @return
     */
    public Mono<Void> handleResponse(ServerWebExchange exchange, GatewayFilterChain chain, long interfaceInfoId, long userId) {
        try {
            ServerHttpResponse originalResponse = exchange.getResponse();
            // 缓存数据的工厂
            DataBufferFactory bufferFactory = originalResponse.bufferFactory();
            // 拿到响应码
            HttpStatus statusCode = originalResponse.getStatusCode();
            if (statusCode == HttpStatus.OK) {
                // 装饰，增强能力
                ServerHttpResponseDecorator decoratedResponse = new ServerHttpResponseDecorator(originalResponse) {
                    // 等调用完转发的接口后才会执行
                    @Override
                    public Mono<Void> writeWith(Publisher<? extends DataBuffer> body) {
                        log.info("body instanceof Flux: {}", (body instanceof Flux));
                        if (body instanceof Flux) {
                            Flux<? extends DataBuffer> fluxBody = Flux.from(body);
                            // 往返回值里写数据
                            // 拼接字符串
                            return super.writeWith(
                                    fluxBody.map(dataBuffer -> {
                                        // 7. 调用成功，接口调用次数 + 1 invokeCount
                                        try {
                                            innerUserInterfaceInfoService.invokeCount(interfaceInfoId, userId);
                                        } catch (Exception e) {
                                            log.error("invokeCount error", e);
                                        }
                                        byte[] content = new byte[dataBuffer.readableByteCount()];
                                        dataBuffer.read(content);
                                        DataBufferUtils.release(dataBuffer);//释放掉内存
                                        // 构建日志
                                        StringBuilder sb2 = new StringBuilder(200);
                                        List<Object> rspArgs = new ArrayList<>();
                                        rspArgs.add(originalResponse.getStatusCode());
                                        String data = new String(content, StandardCharsets.UTF_8); //data
                                        sb2.append(data);
                                        // 打印日志
                                        log.info("响应结果：" + data);
                                        return bufferFactory.wrap(content);
                                    }));
                        } else {
                            // 8. 调用失败，返回一个规范的错误码
                            log.error("<--- {} 响应code异常", getStatusCode());
                        }
                        return super.writeWith(body);
                    }
                };
                // 设置 response 对象为装饰过的
                return chain.filter(exchange.mutate().response(decoratedResponse).build());
            }
            return chain.filter(exchange); // 降级处理返回数据
        } catch (Exception e) {
            log.error("网关处理响应异常" + e);
            return chain.filter(exchange);
        }
    }
	
    /**
     * 调用顺序
     * @return
     */
    @Override
    public int getOrder() {
        return -1;
    }
```



## Dubbo框架(RPC)

两种使用方式:

1.spring boot代码:java接口,服务提供者和消费者去引用接口

2.IDL(接口调用语言):创建一个公共的接口定义文件,服务提供者和消费者去读取文件.优点:跨语言



注册中心:nacos,ZooKeeper(版本冲突)



启动nacos(单节点)

```powershell
startup.cmd -m standalone
```



远程方法调用

https://cn.dubbo.apache.org/zh-cn/

```java
提供者
@DubboService
    
消费者
@DubboReference

网关
    启动类
    @EnableDubbo
```

```yaml
dubbo:
  application:
    name: dubbo-springboot-demo-provider
  protocol:
    name: dubbo
    port: -1
  registry:
    id: nacos-registry
    address: nacos://localhost:8848
```

```xml
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo</artifactId>
    <version>3.0.9</version>
</dependency>
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>2.1.0</version>
</dependency>
```





注意:

1.服务接口类必须在同一个包下,建议抽象成公共项目(放接口,实体类)

2.设置注解(启动类的EnableDubbo,接口实现类和bean引用的注解)

3.添加配置

4.服务调用项目和提供者项目尽量引入相同的依赖和配置
