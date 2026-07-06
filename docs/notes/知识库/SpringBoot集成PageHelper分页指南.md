# Spring Boot 集成 PageHelper 分页配置指南

> 基于 PageHelper 5.x/6.x，涵盖基本配置、多数据源方言适配、常见问题排查。

---

## 一、简介

PageHelper 是 MyBatis 生态中最常用的物理分页插件，通过拦截器在 SQL 执行前自动注入 `LIMIT`/`OFFSET` 并执行 count 查询。

**核心特点：**

- 零侵入：业务 SQL 无需手动添加分页语句
- 多数据库：内置 20+ 数据库方言，支持自定义扩展
- 多数据源：运行时按数据源动态切换方言
- ThreadLocal 隔离：分页参数线程安全

---

## 二、Maven 依赖

### 2.1 Spring Boot Starter（推荐）

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.7</version>
</dependency>
```

### 2.2 版本兼容关系

| pagehelper-spring-boot-starter | 内含 PageHelper | Spring Boot   |
| ------------------------------ | --------------- | ------------- |
| 1.4.7                          | 5.3.3           | 2.7.x         |
| 1.4.6                          | 5.3.2           | 2.x / 3.x     |
| 2.1.1                          | 6.1.1           | 3.5.x         |
| 4.0.0                          | 6.x             | 3.x (JDK 21+) |

---

## 三、application.yml 配置

### 3.1 单数据源（最简单）

```yaml
pagehelper:
  helperDialect: mysql
  supportMethodsArguments: true
  params: count=countSql
```

### 3.2 多数据源（推荐）

```yaml
pagehelper:
  helperDialect: mysql                  # 默认方言
  autoRuntimeDialect: true              # 运行时按数据源 URL 动态检测方言
  supportMethodsArguments: true
  params: count=countSql
```

### 3.3 配置项详解

| 参数                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `helperDialect`           | 默认方言，可选：`mysql`、`oracle`、`postgresql`、`sqlserver` 等（见内置列表） |
| `autoRuntimeDialect`      | **多数据源关键配置**。`true` 时每次查询根据 JDBC URL 自动检测方言 |
| `supportMethodsArguments` | 支持通过 Mapper 参数传 `pageNum`/`pageSize`                  |
| `params`                  | count 查询映射，默认 `count=countSql`                        |
| `reasonable`              | 分页合理化，页码超出范围自动修正                             |
| `dialectAlias`            | 自定义方言映射（见第五章）                                   |

---

## 四、使用方法

### 4.1 方式一：Controller 显式传参（推荐，最简单）

```java
@GetMapping("/list")
public PageInfo<User> list(
        @RequestParam(defaultValue = "1") Integer pageNum,
        @RequestParam(defaultValue = "10") Integer pageSize) {

    PageHelper.startPage(pageNum, pageSize);        // ① 设置分页
    List<User> list = userService.selectAll();       // ② 查询（SQL 被自动改写）
    return new PageInfo<>(list);                     // ③ 包装结果
}
```

**执行效果：**

```sql
-- 自动执行两条 SQL

-- 1. count 查询
SELECT count(*) FROM t_user

-- 2. 分页查询
SELECT * FROM t_user LIMIT 0, 10
```

### 4.2 方式二：封装 BaseController（项目统一规范）

```java
public class BaseController {

    protected void startPage() {
        ServletRequestAttributes attributes =
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        int pageNum = Integer.parseInt(request.getParameter("pageNum"));
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));
        String orderBy = request.getParameter("orderBy");
        PageHelper.startPage(pageNum, pageSize, orderBy);
    }

    protected <T> PageResult<T> buildPage(List<T> list) {
        PageInfo<T> pageInfo = new PageInfo<>(list);
        PageResult<T> result = new PageResult<>();
        result.setRows(pageInfo.getList());
        result.setTotal(pageInfo.getTotal());
        return result;
    }
}
```

业务 Controller：

```java
@RestController
@RequestMapping("/api/user")
public class UserController extends BaseController {

    @GetMapping("/list")
    public PageResult<User> list() {
        startPage();                                          // 从请求自动提取 pageNum/pageSize
        List<User> list = userService.selectAll();
        return buildPage(list);                               // 包装 total + rows
    }
}
```

### 4.3 Mapper XML —— 无需手动分页

```xml
<select id="selectAll" resultType="User">
    SELECT id, name, age FROM t_user
    <where>
        <if test="name != null and name != ''">
            AND name LIKE CONCAT('%', #{name}, '%')
        </if>
    </where>
    ORDER BY id DESC
    <!-- 不要手动写 LIMIT，PageHelper 自动注入 -->
</select>
```

### 4.4 常见的 PageInfo 用法

```java
PageInfo<User> pageInfo = new PageInfo<>(list);

pageInfo.getTotal();       // 总记录数
pageInfo.getPages();       // 总页数
pageInfo.getPageNum();     // 当前页
pageInfo.getPageSize();    // 每页大小
pageInfo.getList();        // 当前页数据
pageInfo.isHasNextPage();  // 是否有下一页
```

---

## 五、多数据源 + 自定义方言

### 5.1 适用场景

如果你在 Spring Boot 中使用多数据源（如 MySQL + TDengine、MySQL + ClickHouse 等动态路由），需要让 PageHelper 能自动识别每个数据源的方言。

### 5.2 核心原理

PageHelper 通过 JDBC URL 自动识别方言：

```java
// PageHelper 内部逻辑（简化）
String jdbcUrl = "jdbc:mysql://localhost:3306/db";
// → 匹配 ":mysql:" → 使用 MySqlDialect

String jdbcUrl = "jdbc:taos-rs://localhost:6041/db";
// → TDengine 未内置 → 需要通过 dialectAlias 注册
```

### 5.3 dialectAlias 配置

```yaml
pagehelper:
  autoRuntimeDialect: true
  dialectAlias: <数据库URL标识>=<方言实现类全名>

# 示例：TDengine 映射到 MySQL 方言
# dialectAlias: taos-rs=com.github.pagehelper.dialect.helper.MySqlDialect
```

### 5.4 dialectAlias 语法版本差异

| PageHelper 版本 | 写法           | 示例                                                        |
| --------------- | -------------- | ----------------------------------------------------------- |
| **5.x**         | 必须写完整类名 | `oracle=com.github.pagehelper.dialect.helper.OracleDialect` |
| **6.0+**        | 支持简写别名   | `oracle=oracle9i` 或 `dm=oracle`                            |

### 5.5 多个别名配置

```yaml
pagehelper:
  autoRuntimeDialect: true
  # 分号分隔多个映射
  dialectAlias: taos-rs=com.github.pagehelper.dialect.helper.MySqlDialect;taos=com.github.pagehelper.dialect.helper.MySqlDialect
```

---

## 六、方言自动识别流程

```
SQL 查询执行
    │
    ▼
autoRuntimeDialect = true ?
    │
    ├─ 否 → 使用 helperDialect 指定的固定方言
    │
    └─ 是 → 动态检测
            │
            ▼
        从当前数据源获取 JDBC URL
        （Druid/Hikari/等连接池 → getJdbcUrl()）
            │
            ▼
        遍历内置 dialectAliasMap
        检查 URL 是否包含 ":方言名:"
            │
            ├─ "jdbc:mysql://..."  → 匹配 ":mysql:"  → MySqlDialect
            ├─ "jdbc:oracle:..."   → 匹配 ":oracle:" → OracleDialect
            ├─ "jdbc:postgresql:"  → 匹配 ":postgresql:" → PostgreSqlDialect
            └─ 未匹配
                │
                ▼
            注册了 dialectAlias？
                ├─ 是 → 使用映射的方言
                └─ 否 → 抛出异常："无法自动获取数据库类型"
```

---

## 七、内置方言列表

| 别名                     | 数据库             |
| ------------------------ | ------------------ |
| `mysql`                  | MySQL              |
| `mariadb`                | MariaDB            |
| `oracle`                 | Oracle             |
| `oracle9i`               | Oracle 9i          |
| `db2`                    | DB2                |
| `postgresql`             | PostgreSQL         |
| `sqlserver`              | SQL Server（旧版） |
| `sqlserver2012`          | SQL Server 2012+   |
| `sqlite`                 | SQLite             |
| `h2`                     | H2                 |
| `derby`                  | Derby              |
| `hsqldb`                 | HSQLDB             |
| `informix`               | Informix           |
| `firebirdsql`            | Firebird           |
| `dm`                     | 达梦               |
| `clickhouse`             | ClickHouse         |
| `kingbase` / `kingbase8` | 人大金仓           |
| `opengauss`              | openGauss          |
| `oscar`                  | 神通               |
| `xugu`                   | 虚谷               |
| `highgo`                 | 瀚高               |

> 完整列表见 [PageHelper 官方说明](https://github.com/pagehelper-org/Mybatis-PageHelper)

---

## 八、前端对接示例

### 8.1 请求格式

```
GET /api/user/list?pageNum=1&pageSize=10&name=张三
```

### 8.2 响应格式

```json
{
  "code": 200,
  "msg": "查询成功",
  "rows": [
    { "id": 1, "name": "张三", "age": 25 },
    { "id": 2, "name": "李四", "age": 30 }
  ],
  "total": 100
}
```

### 8.3 Vue + Element UI 分页组件

```vue
<template>
  <el-pagination
    @size-change="onSizeChange"
    @current-change="onPageChange"
    :current-page="params.pageNum"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="params.pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      params: { pageNum: 1, pageSize: 10 }
    }
  },
  methods: {
    fetchData() {
      axios.get('/api/user/list', { params: this.params })
        .then(res => {
          this.tableData = res.data.rows
          this.total = res.data.total
        })
    },
    onSizeChange(val) {
      this.params.pageSize = val
      this.fetchData()
    },
    onPageChange(val) {
      this.params.pageNum = val
      this.fetchData()
    }
  }
}
</script>
```

---

## 九、常见问题

### 9.1 分页不生效，返回全部数据

**原因**：`PageHelper.startPage()` 和实际查询不在同一个线程，或调用顺序错误。

**排查清单：**

1. `startPage()` 必须在 Service 查询 **之前** 调用
2. `startPage()` 和查询必须在 **同一个线程**（ThreadLocal 机制）
3. `startPage()` 后只能跟 **一次** 查询，第二次查询不受影响

```java
// ❌ 错误：startPage 在查询之后
List<User> list = mapper.selectAll();
PageHelper.startPage(1, 10);   // 无效

// ✅ 正确
PageHelper.startPage(1, 10);
List<User> list = mapper.selectAll();
```

### 9.2 "无法自动获取数据库类型，请通过 helperDialect 参数指定"

**原因**：当前数据源不在内置方言列表中（常见于 TDengine、自定义数据库等）。

**解决方案**：配置 `dialectAlias` 将 JDBC URL 标识映射到已知方言：

```yaml
pagehelper:
  autoRuntimeDialect: true
  dialectAlias: taos-rs=com.github.pagehelper.dialect.helper.MySqlDialect
```

### 9.3 `dialectAlias` 报 `ClassNotFoundException`

**原因**：PageHelper 5.x 不支持简写（如 `taos-rs=mysql`），必须写完整类名。

| 版本 | 正确写法                                                    | 错误写法            |
| ---- | ----------------------------------------------------------- | ------------------- |
| 5.x  | `oracle=com.github.pagehelper.dialect.helper.OracleDialect` | `oracle=oracle9i` ❌ |
| 6.0+ | `dm=oracle` ✅                                               | —                   |

### 9.4 count 查询太慢

对于几十万行的大表，`SELECT count(*) FROM (原始复杂SQL)` 可能很慢。

**解决方案：**

```java
// 方案1：禁用自动 count
PageHelper.startPage(1, 10, false);
List<User> list = mapper.selectAll();

// 方案2：在 Mapper 中手写优化后的 count SQL
PageHelper.startPage(1, 10).countSql("SELECT count(*) FROM t_user WHERE ...");
List<User> list = mapper.selectAll();
```

### 9.5 多数据源切换后分页方言不正确

**原因**：未启用 `autoRuntimeDialect: true`，所有数据源共用同一个方言。

```yaml
# ❌ 这样配置，TDengine 数据源也会用 MySQL 方言（实际上应兼容，但语义不对）
pagehelper:
  helperDialect: mysql

# ✅ 正确：运行时动态检测
pagehelper:
  helperDialect: mysql
  autoRuntimeDialect: true
```

### 9.6 手动加入了 LIMIT 导致分页异常

```xml
<!-- ❌ 错误：手动 LIMIT 与 PageHelper 冲突 -->
<select id="selectAll" resultType="User">
    SELECT * FROM t_user LIMIT 10
</select>

<!-- ✅ 正确：去掉手动 LIMIT -->
<select id="selectAll" resultType="User">
    SELECT * FROM t_user
</select>
```

### 9.7 嵌套查询安全分页

当 `startPage()` 后的查询包含关联查询时，需使用 `countSuffix` 确保 count 正确：

```java
PageHelper.startPage(1, 10).countSuffix("tmp_count");
List<UserVO> list = mapper.selectUserOrders();  // 包含 LEFT JOIN
```

---

## 十、application.properties 等效配置

```properties
# PageHelper配置
pagehelper.helperDialect=mysql
pagehelper.autoRuntimeDialect=true
pagehelper.supportMethodsArguments=true
pagehelper.params=count=countSql
pagehelper.reasonable=true
pagehelper.dialectAlias=taos-rs=com.github.pagehelper.dialect.helper.MySqlDialect
```

---

## 十一、要点总结

| 要点                       | 说明                                            |
| -------------------------- | ----------------------------------------------- |
| **分页零侵入**             | Mapper XML 无需任何分页代码                     |
| **startPage 位置**         | 必须在查询之前，紧邻查询语句                    |
| **ThreadLocal 机制**       | 分页参数线程隔离，用完自动清理                  |
| **多数据源**               | 启用 `autoRuntimeDialect: true`                 |
| **自定义数据库**           | 配置 `dialectAlias` 注册方言映射                |
| **count 自动执行**         | 默认执行，可通过 `startPage(1, 10, false)` 关闭 |
| **只影响紧跟的第一次查询** | `startPage()` 后连续多次查询，只有第一次分页    |

---

*文档更新时间：2026-06-18*
*PageHelper 版本参考范围：5.x ~ 6.x*