#        MyBatis

[入门_MyBatis中文网](https://mybatis.net.cn/getting-started.html)

[mybatis基础 · 语雀 (yuque.com)](https://www.yuque.com/docs/share/c93efd30-fc24-41a3-aa5d-cbb472d0687b#4CZlQ)



## 依赖

```XML
<dependencies>
        <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <!-- 插件-->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

## 配置XML

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf8
jdbc.username=root
jdbc.password=123456

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--    引入配置文件-->
    <properties resource="properties/db.properties"></properties>
    <!--    别名-->
    <typeAliases>
        <package name="com.pojo"/>
    </typeAliases>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
<!--    配置映射文件-->
    <mappers>
        <mapper resource="mappers/HouseingTypeMapper.xml"></mapper>
    </mappers>
</configuration>
```

## pojo实体类

```Java
package com.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseingType {
    private Integer typeId;
    private String typename;
}
```

## 映射XML

```XML
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="HouseingTypeMapper">
    <select id="selectHouseingType" resultType="HouseingType">
        select * from housingtype
    </select>
</mapper>
```

## 工具类

```properties
#properties/config.properties
mybatisConfig=mybatisConfig.xml
package com.Utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class MybatisUtils {
    public static SqlSession getSqlSession() throws IOException {
        // 读取配置文件
        Properties pro = new Properties();
        pro.load(MybatisUtils.class.getClassLoader().getResourceAsStream("properties/config.properties"));
        String configFileName = String.valueOf(pro.get("mybatisConfig"));
        InputStream inputStream = Resources.getResourceAsStream(configFileName);
        // 创建sessionFactory
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        // 返回sqlSession对象
        return sessionFactory.openSession(true); // 设置true自动提交事务
    }
}
```

## Junit

```XML
#插件 JUnitGenerator V2.0
<dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
</dependency>
```

![image-20211124233231786](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233231786.png)

## 增删改查

```XML
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="HouseingTypeMapper">
<!--    无条件查询-->
    <select id="selectHouseingType" resultType="HouseingType">
        select * from housingtype;
    </select>
<!--单条件查询-->
    <select id="conditionHouseingType" parameterType="java.lang.Integer" resultType="HouseingType">
        select * from housingtype where typeId = #{typeId};
    </select>
 <!--    多条件查询-->
    <select id="multipleConditionsHouseingType" resultType="HouseingType">
        select * from housingtype where typeId in
        <foreach collection="array" item="num" open="(" separator="," close=")">
            #{num}
        </foreach>
    </select>
<!--模糊查询-->
    <select id="fuzzyselectHouseingType" parameterType="java.lang.String" resultType="HouseingType">
        select * from housingtype where typename like "%${value}%";
    </select>
<!--插入数据-->
    <insert id="insertHouseingType" parameterType="HouseingType">
        insert into housingType values (#{typeId},#{typename});
    </insert>
<!--删除数据-->
    <delete id="delHouseingType" parameterType="java.lang.Integer">
        delete from housingType where typeId = #{typeId};
    </delete>
    <!--    批量删除-->
    <delete id="multipleConditionsDelHouseingType" parameterType="CheckRecordVo">
        delete from checkhouserecord where cId in
        <foreach collection="array" item="n" open="(" separator="," close=")">
            #{n}
        </foreach>
    </delete>
<!--修改数据-->
    <update id="editHouseingType" parameterType="HouseingType">
        update housingType set typename=#{typename} where typeId=#{typeId};
    </update>
</mapper>
```

![image-20211124233245087](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233245087.png)

## `<foreach>`

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.mybatis_demo.mapper.UserMapper">
<!-- 遍历list集合，collection="list"，如果你传参的时候是直接传递list集合，那么这里只能填list,不能填参数名 -->
<select id="selectByList" resultType="User">
  select * from t_user where uid in
  <foreach collection="list" item="item" open="(" separator="," close=")">
    #{item}
  </foreach>
</select>
<!-- 遍历数组 ，collection="array"，如果你传参的时候是直接传递数组，那么这里只能填array,不能填参数名-->
<select id="selectByArray" resultType="User">
  select * from t_user where uid in
  <foreach collection="array" item="item" open="(" separator="," close=")">
    #{item}
  </foreach>
</select>
<!-- 遍历包装类中的数组，collection="ids"，这里不再是array,而是包装类中对应的变量名，因为你传递的参数是一个包装类，mybatis是通过get方法获取包装类中的数组 -->
<select id="selectUserVoByArray" parameterType="UserVo" resultType="User">
  select * from t_user where uid in
  <foreach collection="ids" item="item" open="(" separator="," close=")">
    #{item}
  </foreach>
</select>
<!-- 遍历包装类中的list集合，collection="idList"，这里不再是list,而是包装类中对应的变量名，因为你传递的参数是一个包装类，mybatis是通过get方法获取包装类中的list集合 -->
<select id="selectUserVoByList" parameterType="UserVo" resultType="User">
  select * from t_user where uid in
  <foreach collection="idList" item="item" open="(" separator="," close=")">
    #{item}
  </foreach>
</select>
</mapper>
```

1.如果你传参的时候直接传一个**数组**，那么使用foreach遍历时collection=“array”,这里是固定写法，即这里的array与你的实参名无关

2.如果你传参的时候直接传一list集合，那么使用foreach遍历时collection=“list”,这里是固定写法，即这里的list与你的实参名无关

3.如果你传参的时候直接传一个**含有数组成员变量的类**，那么使用foreach遍历时collection=“你的变量名”,这里不再是固定写法，即这里的命名取决于成员变量的变量名，例如：成员变量名是test,那么就是collection=“test”

4.如果你传参的时候直接传一个**含有list集合成员变量的类**，跟3的情况一样

## 动态代理 xml方式

取消dao层的实现类

### 注意

mapper包的`java文件`和`映射xml`文件名相同 xml文件的`namespace`要映射到java文件 mybatis配置xml要设置映射文件到`映射xml`

**sercice层**

```Java
private SqlSession sqlSession = null;
    private HouseingTypeMapper mapper = null;

    public HouseingTypeSerciceImpl() throws IOException {
        sqlSession = MybatisUtils.getSqlSession();
        mapper = sqlSession.getMapper(HouseingTypeMapper.class);
    }
/**
     * 模糊查询
     *
     * @param value
     * @return
     */
    @Override
    public List<HouseingType> fuzzyselectHouseingType(String value) {
        return mapper.fuzzyselectHouseingType(value);
    }

    /**
     * 插入数据
     *
     * @param houseingType
     */
    @Override
    public void insertHouseingType(HouseingType houseingType) {
        mapper.insertHouseingType(houseingType);
        sqlSession.commit();
    }
```

![image-20211124233309505](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233309505.png)

### lib问题

<img src="D:\xunleidownload\imgSave-master\imgSave-master\note\image-20211124233325091.png" alt="image-20211124233325091" style="zoom:80%;" />

**解决**

![image-20211124233347604](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233347604.png)

### 映射xml和java文件放在一起

```XML
<!-- pom.xml -->
<!--   xml映射文件放到java文件一起-->
<resources>
    <resource>
           <directory>src/main/java</directory>
           <includes>
                <include>**/*.xml</include>
           </includes>
           <filtering>false</filtering>
    </resource>
</resources>
```

查看**配置映射文件**

```XML
<!-- mybatisConfig   配置文件-->
<mappers>
       <!-- <mapper resource="data/HouseingTypeMapper.xml"></mapper> -->
  <!-- 配置java文件和xml文件放在一起，识别-->
  <mapper class="com.mapper.HouseingTypeMapper"></mapper>
</mappers>
```

## 动态代理 注解方式

删除xml映射文件 对应的sql语句配置 设置对应接口的@注解

```Java
/**
     * 无条件查询-查询所有
     * @return
     */
    @Select("select * from housingtype")
    List<HouseingType> selectHouseingType();

    /**
     * 单条件查询-精确查询
     * @return
     */
    @Select("select * from housingtype where typeId = #{typeId}")
    HouseingType conditionHouseingType(Integer typeId);
```

## `<where>`

![image-20211124233359969](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233359969.png)

```XML
<select id="checkRecordVoAsCondition" parameterType="CheckRecordVo" resultType="CheckhouseRecord">
        select * from checkhouserecord
        <where>
            <if test="checkhouseRecord.account != null">
                account=#{checkhouseRecord.account}
            </if>
            <if test="minTime != null || maxTime != null">
                and checkDate between #{minTime} and #{maxTime}
            </if>
        </where>
    </select>
```

## EL表达式实体类问题

[EL表达式实体类问题_Nubea的博客-CSDN博客](https://blog.csdn.net/Nubea/article/details/79359474)

## ResultMap

```XML
<resultMap id="selectAllResultMap" type="HouseingType">
        <id column="typeId" property="typeId" /> <!-- 映射主键 colimn:映射数据库字段 property:pojo实体类-->
        <result column="typename" property="typename"/>
    </resultMap>

<!--    无条件查询-->
    <select id="selectHouseingType" resultMap="selectAllResultMap">
        select * from housingtype
    </select>
```

### 一对一

```XML
<resultMap id="landlordhousingResultMap" type="Housing">
        <id column="hid" property="hId"/>
        <result column="title" property="title"/>
        <result column="rent" property="rent"/>
        <result column="houseType" property="houseType"/>
        <result column="area" property="area"/>
        <result column="towardId" property="towardId"/>
        <result column="imgList" property="imgList"/>
        <result column="facilities" property="facilities"/>
        <result column="state" property="state"/>
        <result column="aid" property="aid"/>
        <result column="address" property="address"/>
        <result column="describe" property="describe"/>

        <association property="landlord" javaType="com.pojo.Landlord">
            <id column="lId" property="lId"></id>
            <result column="lName" property="lName"/>
            <result column="phone" property="phone"/>
            <result column="address" property="address"/>
            <result column="idCard" property="idCard"/>
            <result column="account" property="account"/>
        </association>
    </resultMap>

    <select id="selectLandlordHousing" resultMap="landlordhousingResultMap">
        select *
        from landlord l
        inner join housing h on l.lId=h.lid
    </select>
```

### 一对多

```XML
<resultMap id="landlordResultMap" type="Landlord">
        <id property="lId" column="lId" />
        <result property="lName" column="lName"/>
        <result property="phone" column="phone"/>
        <result property="address" column="address"/>
        <result property="account" column="account"/>
        <collection property="housings" ofType="Housing">
            <id column="hid" property="hId"/>
            <result column="title" property="title"/>
            <result column="rent" property="rent"/>
            <result column="houseType" property="houseType"/>
            <result column="area" property="area"/>
            <result column="towardId" property="towardId"/>
            <result column="imgList" property="imgList"/>
            <result column="facilities" property="facilities"/>
            <result column="state" property="state"/>
            <result column="aid" property="aid"/>
            <result column="address" property="address"/>
            <result column="describe" property="describe"/>
        </collection>
    </resultMap>
    <select id="selectHouseLand" resultMap="landlordResultMap">
        select *
        from landlord l
        left join housing h on l.lid=h.lId
    </select>
```



# Mybatis-plus

**命名**问题：https://blog.csdn.net/Zack_tzh/article/details/107487209

pojo实体类名称为**驼峰命名包含大写**，mybatis-plus默认会转换为`蛇形命名`

## pom.xml

```xml
# 要删除mybatis依赖
<dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus</artifactId>
            <version>3.4.2</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.4</version>
        </dependency>
```

## mybatis.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

</configuration>
```

## applicationContext.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mvc="http://www.springframework.org/schema/mvc"

       xsi:schemaLocation="http://www.springframework.org/schema/beans
			    http://www.springframework.org/schema/beans/spring-beans.xsd
			    http://www.springframework.org/schema/context
			    http://www.springframework.org/schema/context/spring-context.xsd
			    http://www.springframework.org/schema/aop
			    http://www.springframework.org/schema/aop/spring-aop.xsd
			    http://www.springframework.org/schema/tx
			    http://www.springframework.org/schema/tx/spring-tx.xsd
			    http://www.springframework.org/schema/mvc
			    http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:property-placeholder location="classpath:db.properties" />
    <!--组件扫描：用于注解-->
    <context:component-scan base-package="com.mybatisplus"/>

    <!--数据库连接池（德鲁伊连接池）-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}" />
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.user}" />
        <property name="password" value="${jdbc.password}" />
    </bean>


        <bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
            <property name="dataSource" ref="dataSource"/>
    <!--        加载mybatis配置文件-->
            <property name="configLocation" value="classpath:mybatis.xml"/>
    <!--        别名处理-->
            <property name="typeAliasesPackage" value="com.mybatisplus.pojo"/>
        </bean>

        <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
            <property name="basePackage" value="com.mybatisplus.mapper"/>
            <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        </bean>
</beans>
```

## CRUD

```java
package com.Demo;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mybatisplus.mapper.DepartmentMapper;
import com.mybatisplus.mapper.EmployeeMapper;
import com.mybatisplus.pojo.Department;
import com.mybatisplus.pojo.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class Test1 {

    @Resource
    private DepartmentMapper departmentMapper;
    @Resource
    private EmployeeMapper employeeMapper;

    @Test
    //查询
    public void test1() {
        QueryWrapper<Employee> queryWrap = new QueryWrapper<>();
        queryWrap.like("sex", "男");

        List<Employee> employees = employeeMapper.selectList(queryWrap);
        for (Employee employee : employees) {
            System.out.println(employee);
        }
    }

    @Test
    //添加
    public void test2() {
        Department department = new Department();
        // 遇到主键auto_incremnet时，不用设置
        department.setPid(303);
        department.setPname("绝密");
        int insert = departmentMapper.insert(department);
        if (insert > 0) {
            System.out.println("插入成功！");
        }
    }

    @Test
    //添加
    public void test2_1() {
        Employee employee = new Employee(null, "FIB", "男", 303, 15000.0, "云南省", "海军陆战队", "***");
        int insert = employeeMapper.insert(employee);
        if (insert > 0) {
            System.out.println("插入成功！");
        }
    }

    @Test
    // 删除
    public void test3() {
        QueryWrapper<Department> queryWrap = new QueryWrapper<>();
        queryWrap.like("pname", "密");
        int delete = departmentMapper.delete(queryWrap);
        if (delete > 0) {
            System.out.println("删除成功！");
        }
    }

    @Test
    public void test4() {
        QueryWrapper<Department> wrapper = new QueryWrapper<>();
        wrapper.eq("pid", 303);

        Department department = departmentMapper.selectOne(wrapper);
        department.setPid(404);

        int update = departmentMapper.update(department,wrapper);
        if (update > 0) {
            System.out.println("修改成功！");
        }
    }
}
```

## 主键自增策略

```java
@TableId(value = "id",type = IdType.AUTO)
```

