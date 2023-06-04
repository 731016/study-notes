## 项目学习地址
笔记
https://bcdh.yuque.com/staff-wpxfif/resource/sf3p8kuwhfi90pqq



直播
https://www.aliyundrive.com/drive/folder/647899ed6f74bf84662e48e5bce8a53bdbe2862f



代码库

[1-鱼皮 · GitLab (code-nav.cn)](http://gitlab.code-nav.cn/root)



## 使用技术文档

[开始使用 - Ant Design Pro](https://pro.ant.design/zh-CN/docs/getting-started/)



## 开发SDK（spring boot starter）

依赖，配置properties、yml配置提示

Spring Configuration Processor

![image-20230604185533510](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041855114.png)



pom.xml移除build配置内容



加载配置文件



![image-20230604185027330](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041850926.png)



创建resources/META-INF/spring.factories文件加载的配置类

![image-20230604185055581](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041850095.png)

mvn install 打包可以在项目中导入使用

![image-20230604185127840](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note202306041851070.png)



## API签名认证

步骤：签发签名，使用签名



一般通过request header传递参数



accessKey：标识

secretKey：密钥 ，不能用来传递

用户请求参数

sign：签名，使用accessKey + 用户请求参数拼接 加密之后 后台也通过相同方式加密验证

随机数：只能使用一次，防止重放攻击

timestamp：时间戳，校验是否在事件的之内



这些可通过开发SDK，提取出来，免得每次都要写





