#### JSON格式处理

[Maven Repository: com.alibaba » fastjson (mvnrepository.com)](https://mvnrepository.com/artifact/com.alibaba/fastjson)

```Java
String jsonString = JSON.toJSONString(records);
List<CheckhouseRecord> checkhouseRecordList = (List<CheckhouseRecord>) JSON.parseObject(jsonString);
```

#### commons工具类

[Apache commons（Java常用工具包）简介 - 俄而123 - 博客园 (cnblogs.com)](https://www.cnblogs.com/eer123/p/9120120.html)

#### commons-lang3工具类

[Maven Repository: org.apache.commons » commons-lang3 (mvnrepository.com)](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3)

[Overview (Apache Commons Lang 3.11 API)](http://commons.apache.org/proper/commons-lang/javadocs/api-release/index.html)

[commons常用工具包的使用&guava工具类使用 - QiaoZhi - 博客园 (cnblogs.com)](https://www.cnblogs.com/qlqwjy/p/9467178.html)

![image-20211124221558400](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124221558400.png)

```Java
// 判断是否包含 空格 ""(空字符串) null 不能判断"null"字符串
if (StringUtils.isBlank(acc) || "null".equals(acc)) {
    acc = null;
}

isBlank()  可以验证空格、null、""，如果是好几个空格也返回true
isEmpty验证不了空格，只有值为null和""返回true 
两者都验证不了"null"字符串，所以如果验证"null"还需要自己用equals进行验证。


isEmpty     ""(空字符串) null 不能判断"null"字符串
isNotEmpty  !isEmpty
isAnyEmpty  任何一个匹配，可判断对象
isNoneEmpty 都不匹配

isBlank 空格 ""(空字符串) null 不能判断"null"字符串
isNotBlank  !isBlank 
isAnyBlank  任何一个匹配，可判断对象
isNoneBlank 都不匹配
```

#### commons-Beanutils.ConvertUtils

[Maven Repository: commons-beanutils » commons-beanutils » 1.9.3 (mvnrepository.com)](https://mvnrepository.com/artifact/commons-beanutils/commons-beanutils/1.9.3)

```Java
String[] delChecks = request.getParameterValues("delCheck");
// 字符串数组转换为其他包装类数组
Integer[] delChecksInteger = (Integer[]) ConvertUtils.convert(delChecks, Integer.class);
```

#### JavaSript API | 腾讯位置服务
[https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)