# 聚合搜索平台

## 1.项目地址

编程导航：https://www.codefather.cn/course/1790979621621641217

项目地址：https://github.com/731016/xiaofei-search



## 2.项目介绍

用户：允许用户在同一个页面集中搜索出不同来源、不同类型的内容，提升用户的检索效率和搜索体验

企业：有多个项目的数据需要被搜索时，无需针对每个项目单独开发搜索功能，可直接将数据接入搜索中台，提升开发效率



## 3.主要技术栈

前端
vue3,ant design vue,页面状态同步

后端
springboot
elastic stack
数据抓取(httpclient,jsoup)
设计模式(门面,适配器,注册器)
数据同步(定时,双写,logstach,canal)
Jmeter压力测试

## 4.前端初始化

[快速上手 - Ant Design Vue](https://www.antdv.com/docs/vue/getting-started-cn)

```cmd
npm install -g @vue/cli

vue create search-backend
```

选择自定义：Manually select features

使用TS和路由

![image-20241118222754137](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118222754137.png)

![image-20241118222955723](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118222955723.png)

![image-20241118223019249](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223019249.png)

路由使用hash模式

![image-20241118223407526](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223407526.png)

代码规范

![image-20241118223419392](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223419392.png)

保存时校验代码是符合规范

![image-20241118223430047](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223430047.png)

![image-20241118223440319](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223440319.png)

![image-20241118223451704](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241118223451704.png)



### 使用组件

```cmd
$ npm i --save ant-design-vue@4.x
```

#### 注册

修改`main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

createApp(App).use(Antd).use(router).mount("#app");
```

如果报红，webstrom设置代码规范检查，`ctrl+alt+L`生效

![image-20241119214121550](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241119214121550.png)

#### 运行

![image-20241119214440817](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241119214440817.png)

正常运行

![image-20241119214458054](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241119214458054.png)



## 5.后端初始化

初始化项目代码：https://wwzp.lanzouv.com/iTUQW2fk0jvi

修改数据库连接

执行create_table.sql创建数据表

可直接启动MainApplication

访问http://localhost:8101/api/doc.html



分别执行一下5个接口，初始化一下数据

用户注册，用户登录，增加帖子，根据id获取帖子，收藏帖子

![image-20241119222043841](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241119222043841.png)



## 6.开发前端搜索页面

删除views初始页面AboutView



![image-20241120203443708](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120203443708.png)

删除router相关配置

![image-20241120204510494](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120204510494.png)

修改路由页面信息

![image-20241120203822596](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120203822596.png)

删除初始信息

![image-20241120204430283](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120204430283.png)

修改首页

![image-20241120204521394](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120204521394.png)

### 搜索框

![image-20241120210150926](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120210150926.png)

![image-20241120210135835](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120210135835.png)

### Tab切换

![image-20241120210358241](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120210358241.png)

![image-20241120210448899](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120210448899.png)



### 列表展示

```vue
<template>图片列表</template>

<script setup lang="ts"></script>

<style scoped></style>
```

```vue
<template>文章列表</template>

<script setup lang="ts"></script>

<style scoped></style>
```

```vue
<template>用户列表</template>

<script></script>

<style scoped></style>
```

分隔符组件

```vue
<template>
  <div class="my-divider"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.my-divider {
  margin-bottom: 16px;
}
</style>
```

主页使用组件

```vue
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchText"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="post" tab="帖子">
        <PostList />
      </a-tab-pane>
      <a-tab-pane key="image" tab="用户">
        <UserList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="图片">
        <ImageList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostList from "@/components/PostList.vue";
import UserList from "@/components/UserList.vue";
import ImageList from "@/components/ImageList.vue";
import MyDivider from "@/components/MyDivider.vue";

const searchText = ref("");
const activeKey = ref("post");

const onSearch = (value: string) => {
  alert(value);
};
</script>
```

样式修改

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  ...
  padding: 20px;
  max-width: 1920px;
  margin: 0 auto;
}

...
</style>
```

## 7.记录搜索状态

使用`url`记录用户搜索参数,刷新时还能还原之前的搜索状态

建议:通过url改变页面状态,单向改变

```java
使用route(query.text,params.category)和watchEffect/watch监听路由改变
改变url地址(点击搜索框,搜索内容填充到url上,切换tab或者其他分页...也要记录)
url改变时,改变页面状态
```

动态路由设置

```ts
...
const routes: Array<RouteRecordRaw> = [
  ...
  {
    path: "/:category",
    name: "index",
    component: IndexPage,
  },
];
...
```

随便输入地址还是保持页面不变

![image-20241120221522410](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120221522410.png)



点击搜索框,搜索内容填充到url上

```vue
const onSearch = (value: string) => {
  alert(value);
  router.push({
    query: {
      text: value,
    },
  });
};
```

切换tab或者其他分页

```vue
const onTabChange = (activeKey: string) => {
  router.push({
    path: `/${activeKey}`,
    query: {
      text: searchText,
    },
  });
};
```

```vue
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="帖子">
        <PostList />
      </a-tab-pane>
      <a-tab-pane key="image" tab="图片">
        <ImageList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const activeKey = ref("post");
const router = useRouter();

/**
 * url查询关键字
 */
const searchParams = ref({
  text: "",
});

/**
 * 查询
 * @param value
 */
const onSearch = (value: string) => {
  alert(value);
  router.push({
    query: searchParams.value,
  });
};

/**
 * tab切换
 * @param activeKey
 */
const onTabChange = (activeKey: string) => {
  router.push({
    path: `/${activeKey}`,
    query: searchParams.value,
  });
};
</script>
```

切换tab正常设置url

![image-20241120222648800](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120222648800.png)

![image-20241120222655497](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241120222655497.png)

如果刷新，分类会丢失，没有保存分类数据

```vue
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
/**
 * 当前激活tab
 */
const activeKey = route.params.category;

/**
 * 页面初始化查询参数
 */
const initSearchParams = {
  text: "",
  pageNum: 1,
  pageSize: 10,
};

/**
 * url查询关键字
 */
const searchParams = ref(initSearchParams);

/**
 * 监听url改变
 * 更新查询框参数
 */
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});
</script>
```



## 8.axios请求接入

[Axios中文文档 | Axios中文网](https://www.axios-http.cn/)

全局请求配置`ReqAxios.ts`

```ts
import axios from "axios";

const reqAxios = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 10000,
  headers: {},
});

// 请求拦截
reqAxios.interceptors.request.use(
  (config) => {
    // let token = localStorage.getItem("token") || "";
    // config.headers["Authorization"] = token;
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// 添加响应拦截器
reqAxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data;
    if (data.code === 0) {
      return data.data;
    }
    return data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error && error.response) {
      error.message = "系统错误" + error.response.status;
    } else {
      error.message = "连接服务器失败!";
    }
    return Promise.reject(error);
  }
);
/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method: string, url: string, data: any) {
  method = method.toLowerCase();
  if (method == "post") {
    return reqAxios.post(url, data);
  } else if (method == "get") {
    return reqAxios.get(url, { params: data });
  } else {
    console.error("未知的method" + method);
    return false;
  }
}
```

请求方法`Search.ts`

```ts
import ReqAxios from "@/plugins/ReqAxios";

/**
 * 分页获取列表（封装类）
 * @param params
 */
export const listPostVOByPage = (params: any) =>
  ReqAxios("post", "/post/list/page/vo", params);
```

请求代码

```ts
/**
 * 查询结果
 */
const searchResultList = ref([]);

/**
 * 查询
 * @param value
 */
const onSearch = (value: string) => {
  router.push(searchParams.value);
  listPostVOByPage({})
    .then((data) => {
      console.log(data.records);
      searchResultList.value = data.records;
    })
    .catch((error) => {
      console.error(error);
    });
};
```

### 展示数据页面优化

去掉app.vue初始样式

```vue
<style>
#app {
  padding: 20px;
  max-width: 1920px;
  margin: 0 auto;
}
    ...
```



帖子页面

```vue
<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>

<style scoped></style>
```

> 1. `import { withDefaults, defineProps } from "vue";`：从 Vue 库中导入了 `withDefaults` 和 `defineProps` 函数。
> 2. `interface Props { postList: any[]; }`：定义了一个 TypeScript 接口 `Props`，它包含一个属性 `postList`，这是一个任意类型的数组。
> 3. `const props = withDefaults(defineProps<Props>(), { postList: () => [] });`：这里首先使用 `defineProps` 函数定义了组件的 props，然后使用 `withDefaults` 函数为这些 props 提供默认值。如果父组件没有传递 `postList` 属性，那么它将默认为一个空数组。

图片页面

```vue
<template>
  <a-list item-layout="horizontal" :data-source="props.imageList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-image :width="200" :src="item.userAvatar" />
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  imageList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  imageList: () => [],
});
</script>

<style scoped></style>
```

用户列表

```vue
<template>
  <a-list item-layout="horizontal" :data-source="props.userList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 240px" :data-source="props.userList">
          <template #cover>
            <img alt="example" :src="item.userAvatar" />
          </template>
          <a-card-meta :title="item.userName">
            <template #description>{{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>

<style scoped></style>
```

主页

```vue
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="帖子">
        <PostList :postList="searchResultPostList" />
      </a-tab-pane>
      <a-tab-pane key="image" tab="图片">
        <ImageList :imageList="searchResultImageList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="searchResultUserList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { listPostVOByPage, listUserVOByPage } from "@/request/Search";
import PostList from "@/components/PostList.vue";
import ImageList from "@/components/ImageList.vue";
import UserList from "@/components/UserList.vue";

const router = useRouter();
const route = useRoute();
/**
 * 当前激活tab
 */
let activeTabKey = route.params.category;

/**
 * 页面初始化查询参数
 */
const initSearchParams = {
  text: "",
  current: 1,
  pageSize: 10,
};

/**
 * url查询关键字
 */
const searchParams = ref(initSearchParams);

/**
 * 监听url改变
 * 更新查询框参数
 */
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
  } as any;
});

/**
 * 查询结果
 */
const searchResultPostList = ref([]);
const searchResultImageList = ref([]);
const searchResultUserList = ref([]);

/**
 * 查询
 * @param value
 */
const onSearch = (value: string) => {
  router.push({
    query: searchParams.value,
  });
  listPostVOByPage({})
    .then((data: { records: never[] }) => {
      console.log(data.records);
      searchResultPostList.value = data.records;
    })
    .catch((error: any) => {
      console.error(error);
    });
  listUserVOByPage({})
    .then((data) => {
      console.log(data.records);
      searchResultUserList.value = data.records;
    })
    .catch((error) => {
      console.error(error);
    });
  listUserVOByPage({})
    .then((data) => {
      console.log(data.records);
      searchResultImageList.value = data.records;
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(activeTabKey);
  // if ("post" === activeTabKey) {
  // }
  // if ("user" === activeTabKey) {
  // }
  // if ("image" === activeTabKey) {
  // }
};

/**
 * tab切换
 * @param activeKey
 */
const onTabChange = (activeKey: string) => {
  router.push({
    path: `/${activeKey}`,
    query: searchParams.value,
  });
  activeTabKey = activeKey;
};

onMounted(() => {
  // onTabChange("post");
});
</script>
```



## 9.数据抓取

### 1.文章

从请求地址请求数据,解析对应的属性

```java
public void textPostImport() {
        String url = "http://xiaofei.site/";
        try {
            Document document = Jsoup.connect(url).get();
            Elements postElement = document.select("ul[id=post-cols]");
            Elements postLi = postElement.select("li[class=article-container]");

            for (int i = 0; i < postLi.size(); i++) {

                PostAddRequest postAddRequest = new PostAddRequest();

                Element li = postLi.get(i);

                Elements postImg = li.select("div[class=article-thumbnail]");
                for (Element img : postImg) {
                    String imgStr = img.select("img").attr("src");
                    String imgUrl = url + imgStr;
                }

                Elements postTags = li.select("div[class=article-content] > span");
                List<String> tags = new ArrayList<>();
                for (Element tag : postTags) {
                    String tagStr = tag.select("em").text();
                    String[] tagArr = tagStr.split("#");
                    for (int j = 0; j < tagArr.length; j++) {
                        String tagTrim = tagArr[j].trim();
                        if (StringUtils.isNotBlank(tagTrim)) {
                            tags.add(tagTrim);
                        }
                    }
                }
                postAddRequest.setTags(tags);

                Elements postTitle = li.select("h1[data-dia=article-link]");
                String title = postTitle.text();
                postAddRequest.setTitle(title);

                Elements postContent = li.select("p[style=overflow: hidden;max-height: 6rem;]");
                String content = postContent.text();
                postAddRequest.setContent(content);

                Post post = new Post();
                BeanUtils.copyProperties(postAddRequest, post);
                List<String> tagList = postAddRequest.getTags();
                if (tagList != null) {
                    post.setTags(JSONUtil.toJsonStr(tagList));
                }
                postService.validPost(post, true);
                post.setUserId(1858872909540597761L);
                post.setFavourNum(0);
                post.setThumbNum(0);
                boolean result = postService.save(post);
                System.out.println(result);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```



### 2.图片

jsoup 解析网页,获取html解析图片地址

```java
public void imageImport(){
        String url = "https://cn.bing.com/images/search?q=%E5%9B%BE%E7%89%87&form=IQFRML&first=100";
        try {
            List<Image> images = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Elements imageList = document.select("div[class=iuscp isv]");
            for (int i = 0; i < imageList.size(); i++) {
                Element imageElement = imageList.get(i);
                String imageUrl = imageElement.select("img[class=mimg vimgld]").attr("data-src");

                String imageTitle = imageElement.select("a[class=inflnk]").attr("aria-label");

                Image image = new Image();
                image.setUrl(imageUrl);
                image.setTitle(imageTitle);
                System.out.println(image);
                images.add(image);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

图片没有现成的接口，需要新增



在`entity`包下，新增图片实体

```java
package com.xiaofei.site.search.model.entity;

import lombok.Data;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/26
 */
@Data
public class Image {

    private String title;

    private String url;
}
```

在`dto`包下新增`image`目录，添加图片查询请求信息

```java
package com.xiaofei.site.search.model.dto.image;

import com.xiaofei.site.search.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 查询请求
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ImageQueryRequest extends PageRequest implements Serializable {

    /**
     * 搜索词
     */
    private String searchText;


    private static final long serialVersionUID = 1L;
}
```

提供查询图片接口及实现类

```java
package com.xiaofei.site.search.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaofei.site.search.model.dto.image.ImageQueryRequest;
import com.xiaofei.site.search.model.entity.Image;

/**
 * 图片服务
 *
 */
public interface ImageService {


    /**
     * 分页获取图片
     *
     * @return
     */
    Page<Image> getImageByPage(ImageQueryRequest imageQueryRequest);
}
package com.xiaofei.site.search.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaofei.site.search.common.ErrorCode;
import com.xiaofei.site.search.exception.BusinessException;
import com.xiaofei.site.search.model.dto.image.ImageQueryRequest;
import com.xiaofei.site.search.model.entity.Image;
import com.xiaofei.site.search.service.ImageService;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/26
 */
@Service
public class ImageServiceImpl implements ImageService {
    @Override
    public Page<Image> getImageByPage(ImageQueryRequest imageQueryRequest) {
        Page<Image> imagePage = new Page<>();
        if (imageQueryRequest == null) {
            return imagePage;
        }
        int current = imageQueryRequest.getCurrent();
        int pageSize = imageQueryRequest.getPageSize();
        String searchText = imageQueryRequest.getSearchText();
        int cursor = (current - 1) * pageSize;
        String url = "https://cn.bing.com/images/search?q=%s&form=IQFRML&first=%s";
        url = String.format(url, searchText, cursor);
        try {
            List<Image> images = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Elements imageList = document.select("div[class=iuscp isv]");
            for (int i = 0; i < imageList.size(); i++) {
                Element imageElement = imageList.get(i);
                String imageUrl = imageElement.select("img[class=mimg vimgld]").attr("data-src");

                String imageTitle = imageElement.select("a[class=inflnk]").attr("aria-label");

                Image image = new Image();
                image.setUrl(imageUrl);
                image.setTitle(imageTitle);
                if (StringUtils.isNotBlank(imageUrl) && StringUtils.isNotBlank(imageTitle)){
                    images.add(image);
                }
                //根据页码大小限制
                if (images.size() >= pageSize) {
                    break;
                }
            }
            System.out.println(url);
            System.out.println(images);
            imagePage.setRecords(images);
            imagePage.setCurrent(current);
            imagePage.setSize(pageSize);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "查询图片失败");
        }
        return imagePage;
    }
}
```

在`controller`包下新增控制层ImageController

```java
package com.xiaofei.site.search.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaofei.site.search.common.BaseResponse;
import com.xiaofei.site.search.common.ErrorCode;
import com.xiaofei.site.search.common.ResultUtils;
import com.xiaofei.site.search.exception.ThrowUtils;
import com.xiaofei.site.search.model.dto.image.ImageQueryRequest;
import com.xiaofei.site.search.model.entity.Image;
import com.xiaofei.site.search.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 图片接口
 *
 */
@RestController
@RequestMapping("/image")
@Slf4j
public class ImageController {

    @Resource
    private ImageService imageService;

    /**
     * 分页获取列表（封装类）
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<Image>> listPostByPage(@RequestBody ImageQueryRequest imageQueryRequest,
                                                    HttpServletRequest request) {
        long current = imageQueryRequest.getCurrent();
        long size = imageQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Image> imagePage = imageService.getImageByPage(imageQueryRequest);
        return ResultUtils.success(imagePage);
    }

}
```

前端图片页面完善

`Search.ts`，增加查询图片信息接口

```ts
import ReqAxios from "@/plugins/ReqAxios";

/**
 * 分页获取列表（封装类）
 * @param params
 */
export const listPostVOByPage = (params: any) =>
  ReqAxios("post", "/post/list/page/vo", params);

/**
 * 分页获取用户封装列表
 * @param params
 */
export const listUserVOByPage = (params: any) =>
  ReqAxios("post", "/user/list/page/vo", params);

/**
 * 分页获取图片
 * @param params
 */
export const listImageByPage = (params: any) =>
  ReqAxios("post", "/image/list/page/vo", params);

```



`IndexPage.vue`，完善查询图片信息

```vue
<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.searchText"
      placeholder="input search searchText"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="帖子">
        <PostList :postList="searchResultPostList" />
      </a-tab-pane>
      <a-tab-pane key="image" tab="图片">
        <ImageList :imageList="searchResultImageList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="searchResultUserList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  listImageByPage,
  listPostVOByPage,
  listUserVOByPage,
} from "@/request/Search";
import PostList from "@/components/PostList.vue";
import ImageList from "@/components/ImageList.vue";
import UserList from "@/components/UserList.vue";

const router = useRouter();
const route = useRoute();
/**
 * 当前激活tab
 */
let activeTabKey = route.params.category;

/**
 * 页面初始化查询参数
 */
const initSearchParams = {
  searchText: "",
  current: 1,
  pageSize: 10,
};

/**
 * url查询关键字
 */
const searchParams = ref(initSearchParams);

/**
 * 监听url改变
 * 更新查询框参数
 */
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    searchText: route.query.searchText,
  } as any;
});

/**
 * 查询结果
 */
const searchResultPostList = ref([]);
const searchResultImageList = ref([]);
const searchResultUserList = ref([]);

/**
 * 查询
 * @param value
 */
const onSearch = (value: string) => {
  router.push({
    query: searchParams.value,
  });
  searchAll(activeTabKey);
  // if ("post" === activeTabKey) {
  // }
  // if ("user" === activeTabKey) {
  // }
  // if ("image" === activeTabKey) {
  // }
};

const searchAll = (activeTabKey: string) => {
  listPostVOByPage(searchParams.value)
    .then((data: { records: never[] }) => {
      console.log(data.records);
      searchResultPostList.value = data.records;
    })
    .catch((error: any) => {
      console.error(error);
    });
  listUserVOByPage(searchParams.value)
    .then((data) => {
      console.log(data.records);
      searchResultUserList.value = data.records;
    })
    .catch((error) => {
      console.error(error);
    });
  listImageByPage(searchParams.value)
    .then((data) => {
      console.log(data.records);
      searchResultImageList.value = data.records;
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * tab切换
 * @param activeKey
 */
const onTabChange = (activeKey: string) => {
  router.push({
    path: `/${activeKey}`,
    query: searchParams.value,
  });
  activeTabKey = activeKey;
};

onMounted(() => {
  // onTabChange("post");
});
</script>
```



`ImageList.vue`，图片展示在一列

```vue
<template>
  <a-list
    item-layout="horizontal"
    :grid="{ gutter: 16, column: 5 }"
    :data-source="props.imageList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <a-image :src="item.url" :alt="item.title" />
          </template>
          <a-card :title="item.title"></a-card>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  imageList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  imageList: () => [],
});
</script>

<style scoped></style>
```

![image-20241126224602371](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241126224602371.png)



## 10.搜索请求聚合

（1）切换不同的tab再发起单独分类的请求

（2）一次请求所有分类数据

（3）请求当前默认分类的数据和其它分类的数据总量

根据业务具体使用对应的方式



当前项目使用第2种方法



问题：

+ 请求过多
+ 请求参数不一致
+ 前端调用请求重复



### 后端修改

在modle.vo包下，新建通用返回结果`SearchVo`

```java
package com.xiaofei.site.search.model.vo;

import com.xiaofei.site.search.model.entity.Image;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author tuaofei
 * @description TODO
 * @date 2024/11/27
 */
@Data
public class SearchVo implements Serializable {

    private List<PostVO> postList;
    private List<Image> imageList;
    private List<UserVO> userList;
}
```

在modle.dto包下新建search目录，新增通用查询请求实体`SearchQueryRequest`

```java
package com.xiaofei.site.search.model.dto.search;

import com.xiaofei.site.search.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 聚合查询请求
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SearchQueryRequest extends PageRequest implements Serializable {

    /**
     * 搜索词
     */
    private String searchText;


    private static final long serialVersionUID = 1L;
}
```

在controller包下，新增通用查询控制层`SearchController`

```java
package com.xiaofei.site.search.controller;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaofei.site.search.annotation.AuthCheck;
import com.xiaofei.site.search.common.BaseResponse;
import com.xiaofei.site.search.common.DeleteRequest;
import com.xiaofei.site.search.common.ErrorCode;
import com.xiaofei.site.search.common.ResultUtils;
import com.xiaofei.site.search.constant.UserConstant;
import com.xiaofei.site.search.exception.BusinessException;
import com.xiaofei.site.search.exception.ThrowUtils;
import com.xiaofei.site.search.model.dto.image.ImageQueryRequest;
import com.xiaofei.site.search.model.dto.post.PostAddRequest;
import com.xiaofei.site.search.model.dto.post.PostEditRequest;
import com.xiaofei.site.search.model.dto.post.PostQueryRequest;
import com.xiaofei.site.search.model.dto.post.PostUpdateRequest;
import com.xiaofei.site.search.model.dto.search.SearchQueryRequest;
import com.xiaofei.site.search.model.dto.user.UserQueryRequest;
import com.xiaofei.site.search.model.entity.Image;
import com.xiaofei.site.search.model.entity.Post;
import com.xiaofei.site.search.model.entity.User;
import com.xiaofei.site.search.model.vo.PostVO;
import com.xiaofei.site.search.model.vo.SearchVo;
import com.xiaofei.site.search.model.vo.UserVO;
import com.xiaofei.site.search.service.ImageService;
import com.xiaofei.site.search.service.PostService;
import com.xiaofei.site.search.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 聚合查询接口
 */
@RestController
@RequestMapping("/search")
@Slf4j
public class SearchController {

    @Resource
    private PostService postService;

    @Resource
    private UserService userService;

    @Resource
    private ImageService imageService;

    @PostMapping("/all")
    public BaseResponse<SearchVo> searchAll(@RequestBody SearchQueryRequest searchQueryRequest, HttpServletRequest httpServletRequest) {
        SearchVo searchVo = new SearchVo();
        if (searchQueryRequest == null){
            return ResultUtils.success(searchVo);
        }
        String searchText = searchQueryRequest.getSearchText();

        

        return ResultUtils.success(searchVo);
    }

}
```

封装帖子接口查询方法

在PostService，新增listPostVoPage

```java
 /**
     * 分页查询帖子
     * @param postQueryRequest
     * @param httpServletRequest
     * @return
     */
    Page<PostVO> listPostVoPage(PostQueryRequest postQueryRequest,HttpServletRequest httpServletRequest);

@Override
    public Page<PostVO> listPostVoPage(PostQueryRequest postQueryRequest, HttpServletRequest httpServletRequest) {
        int current = postQueryRequest.getCurrent();
        int pageSize = postQueryRequest.getPageSize();
        Page<Post> postPage = this.page(new Page<>(current, pageSize),
                this.getQueryWrapper(postQueryRequest));
        Page<PostVO> postVOPage = this.getPostVOPage(postPage, httpServletRequest);
        return postVOPage;
    }
```



封装用户接口查询方法

在UserService，新增listUserVoPage

```java
/**
     * 分页查询用户
     * @param userQueryRequest
     * @return
     */
    Page<UserVO> listUserVoPage(UserQueryRequest userQueryRequest);

@Override
    public Page<UserVO> listUserVoPage(UserQueryRequest userQueryRequest) {
        int current = userQueryRequest.getCurrent();
        int pageSize = userQueryRequest.getPageSize();
        Page<User> userPage = this.page(new Page<>(current, pageSize),
                this.getQueryWrapper(userQueryRequest));
        List<UserVO> userVOList = this.getUserVO(userPage.getRecords());
        Page<UserVO> userVoPage = new Page<>(current, pageSize);
        userVoPage.setRecords(userVOList);
        return userVoPage;
    }
```

整合后的controller接口

```java
package com.xiaofei.site.search.controller;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xiaofei.site.search.annotation.AuthCheck;
import com.xiaofei.site.search.common.BaseResponse;
import com.xiaofei.site.search.common.DeleteRequest;
import com.xiaofei.site.search.common.ErrorCode;
import com.xiaofei.site.search.common.ResultUtils;
import com.xiaofei.site.search.constant.UserConstant;
import com.xiaofei.site.search.exception.BusinessException;
import com.xiaofei.site.search.exception.ThrowUtils;
import com.xiaofei.site.search.model.dto.image.ImageQueryRequest;
import com.xiaofei.site.search.model.dto.post.PostAddRequest;
import com.xiaofei.site.search.model.dto.post.PostEditRequest;
import com.xiaofei.site.search.model.dto.post.PostQueryRequest;
import com.xiaofei.site.search.model.dto.post.PostUpdateRequest;
import com.xiaofei.site.search.model.dto.search.SearchQueryRequest;
import com.xiaofei.site.search.model.dto.user.UserQueryRequest;
import com.xiaofei.site.search.model.entity.Image;
import com.xiaofei.site.search.model.entity.Post;
import com.xiaofei.site.search.model.entity.User;
import com.xiaofei.site.search.model.vo.PostVO;
import com.xiaofei.site.search.model.vo.SearchVo;
import com.xiaofei.site.search.model.vo.UserVO;
import com.xiaofei.site.search.service.ImageService;
import com.xiaofei.site.search.service.PostService;
import com.xiaofei.site.search.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 聚合查询接口
 */
@RestController
@RequestMapping("/search")
@Slf4j
public class SearchController {

    @Resource
    private PostService postService;

    @Resource
    private UserService userService;

    @Resource
    private ImageService imageService;

    @PostMapping("/all")
    public BaseResponse<SearchVo> searchAll(@RequestBody SearchQueryRequest searchQueryRequest, HttpServletRequest httpServletRequest) {
        SearchVo searchVo = new SearchVo();
        if (searchQueryRequest == null){
            return ResultUtils.success(searchVo);
        }
        String searchText = searchQueryRequest.getSearchText();

        PostQueryRequest postQueryRequest = new PostQueryRequest();
        postQueryRequest.setSearchText(searchText);
        Page<PostVO> postVOPage = postService.listPostVoPage(postQueryRequest, httpServletRequest);
        searchVo.setPostList(postVOPage.getRecords());

        UserQueryRequest userQueryRequest = new UserQueryRequest();
        userQueryRequest.setUserName(searchText);
        Page<UserVO> userVOPage = userService.listUserVoPage(userQueryRequest);
        searchVo.setUserList(userVOPage.getRecords());

        ImageQueryRequest imageQueryRequest = new ImageQueryRequest();
        imageQueryRequest.setSearchText(searchText);
        Page<Image> imagePage = imageService.getImageByPage(imageQueryRequest);
        searchVo.setImageList(imagePage.getRecords());

        return ResultUtils.success(searchVo);
    }

}
```

### 修改前端

在seach.ts中添加接口

```ts
/**
 * 聚合查询
 * @param params
 */
export const searchAll = (params: any) =>
  ReqAxios("post", "/search/all", params);
```

修改indexpage.vue

```vue
/**
 * 查询
 * @param value
 */
const onSearch = (value: string) => {
  router.push({
    query: searchParams.value,
  });
  loadAll();
};

const loadAll = () => {
  searchAll(searchParams.value)
    .then((data) => {
      console.log(data);
      searchResultPostList.value = data.postList;
      searchResultImageList.value = data.imageList;
      searchResultUserList.value = data.userList;
    })
    .catch((error) => {
      console.error(error);
    });
};
```



## 设计模式

### 门面模式

不用关心后面的查询具体操作

```java
@Resource
    private SearchFacade searchFacade;

    @PostMapping("/all")
    public BaseResponse<SearchVO> searchAll(@RequestBody SearchRequest searchRequest, HttpServletRequest request) {
        return ResultUtils.success(searchFacade.searchAll(searchRequest, request));
    }
```



### 注册器模式

提前把需要用到的bean实例化

```java
/**
 * 数据源注册器
 */
@Component
public class DataSourceRegistry {

    @Resource
    private PostDataSource postDataSource;

    @Resource
    private UserDataSource userDataSource;

    @Resource
    private PictureDataSource pictureDataSource;

    private Map<String, DataSource<T>> typeDataSourceMap;

    @PostConstruct
    public void doInit() {
        System.out.println(1);
        typeDataSourceMap = new HashMap() {{
            put(SearchTypeEnum.POST.getValue(), postDataSource);
            put(SearchTypeEnum.USER.getValue(), userDataSource);
            put(SearchTypeEnum.PICTURE.getValue(), pictureDataSource);
        }};
    }

    public DataSource getDataSourceByType(String type) {
        if (typeDataSourceMap == null) {
            return null;
        }
        return typeDataSourceMap.get(type);
    }
}
```

### 适配器模式

接入的数据源或者接口必须遵循这个接口规范

```java
public interface DataSource<T> {
    Page<T> doSearch(String searchText, long pageNum, long pageSize);
}

@Service
public class PictureDataSource implements DataSource<Picture> {
    @Override
    public Page<Picture> doSearch(String searchText, long pageNum, long pageSize) {
        ...
        return picturePage;
    }
}

 Page<Picture> picturePage = pictureDataSource.doSearch(searchText, 1, 10);
```

## 搜索优化 ES

https://www.elastic.co/cn/downloads/elasticsearch

分布式搜索和分析引擎，用于实时地存储、搜索和分析海量数据



### 索引

正向索引:类似目录

倒排索引:根据内容找文章

先把要存储的内容切词,构建索引;通过需要搜索的内容,切词根据索引去查询对应的文章

```
文章1:我是鲨鱼
文章2:我是小猫

切词
我是 鲨鱼
我是 小猫
```



| 词   | 内容id      |
| ---- | ----------- |
| 我是 | 文章1,文章2 |
| 鲨鱼 | 文章1       |
| 小猫 | 文章2       |

搜索"我是小猫"

根据[倒排索引表]找到对应的文章1,2



### 调用方式

#### resuful api

get请求 http://localhost:9200

#### kibana devtools

开发工具查询

##### 客户端调用

java客户端

https://www.elastic.co/guide/en/elasticsearch/client/java-api/7.17/_javadoc.html

##### JAVA操作ES

javaApi

https://www.elastic.co/guide/en/elasticsearch/client/java-api/7.17/transport-client.html



Spring Data Elasticsearch

https://docs.spring.io/spring-data/elasticsearch/current/reference/html/#preface.requirements



### ES语法

#### DSL

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl.html

增加

```json
 PUT user/_doc/1
 {
  "name":"土澳菲",
  "age":18
 }
```

删除

```json
DELETE user
```

修改

```json
PUT user/_doc/1
 {
  "name":"土澳菲1",
  "age":19
 }
```

查询

```json
GET user/_doc/1

GET user/_search
{
  "query": {
    "match_all": { }
  },
  "fields": [
    "name"
  ],
  "sort": [
    {
      "age": "desc"
    }
  ]
}
```

#### ESL

EQL queries require an event category and a matching condition

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/eql.html



```json
POST logs-my_app-default/_doc
{
  "@timestamp": "2099-05-06T16:21:15.000Z",
  "event": {
    "original": "192.0.2.42 - - [06/May/2099:16:21:15 +0000] \"GET /images/bg.jpg HTTP/1.0\" 200 24736"
  }
}

GET logs-my_app-default/_eql/search
{
  "query": """
  any where 1==1
  """
}
```



#### SQL

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/xpack-sql.html

```json
PUT /library/book/_bulk?refresh&pretty
{"index":{"_id": "Leviathan Wakes"}}
{"name": "Leviathan Wakes", "author": "James S.A. Corey", "release_date": "2011-06-02", "page_count": 561}
{"index":{"_id": "Hyperion"}}
{"name": "Hyperion", "author": "Dan Simmons", "release_date": "1989-05-26", "page_count": 482}
{"index":{"_id": "Dune"}}
{"name": "Dune", "author": "Frank Herbert", "release_date": "1965-06-01", "page_count": 604}

POST /_sql?format=txt&pretty
{

  "query": "SELECT * FROM library WHERE release_date < \u00272000-01-01\u0027"

}
```

![image-20230810222027260](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230810222027260.png)

#### Scripting

*Painless* is a performant, secure scripting language designed specifically for Elasticsearch

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-scripting.html



### mappering

理解为数据库表结构

支持动态mapping,表结构可以改变

```json
PUT /my-index-000001
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },  
      "email":  { "type": "keyword"  }, 
      "name":   { "type": "text"  }     
    }
  }
}
```

### 分词器

#### 内置分词器

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-tokenizers.html

#### **标准分词器**

```json
POST /_analyze?pretty
{
  "tokenizer": "standard",
  "text": "I love wht"
}
结果
{
  "tokens" : [
    {
      "token" : "I",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "<ALPHANUM>",
      "position" : 0
    },
    {
      "token" : "love",
      "start_offset" : 2,
      "end_offset" : 6,
      "type" : "<ALPHANUM>",
      "position" : 1
    },
    {
      "token" : "wht",
      "start_offset" : 7,
      "end_offset" : 10,
      "type" : "<ALPHANUM>",
      "position" : 2
    }
  ]
}
```

**空格分词器**

```json
POST _analyze
{
  "tokenizer": "whitespace",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}

[ The, 2, QUICK, Brown-Foxes, jumped, over, the, lazy, dog's, bone. ]
```

**关键词分词器**

相当于不分词

```json
POST _analyze
{
  "tokenizer": "keyword",
  "text": "New York"
}
```

#### IK分词器

对中文友好

https://github.com/medcl/elasticsearch-analysis-ik

issue:下载相近的版本，解压后修改plugin-descriptor.properties文件里面的elasticsearch.version就可以



**ik_smart**

尽可能取合适的词

```json
POST /_analyze?pretty
{
  "tokenizer": "ik_smart",
  "text": "我是小猪猪"
}
```

**ik_max_word**

最细粒度的分词

```json
POST /_analyze?pretty
{
  "tokenizer": "ik_max_word",
  "text": "我不是小猪猪,我是大猪猪."
}
```



### 打分机制

https://www.elastic.co/guide/en/elasticsearch/guide/master/controlling-relevance.html



#### 使用ES实现搜索接口



##### ES mapping

es中尽量存放需要搜索的字段

```json
aliases：别名（为了后续方便数据迁移）
字段类型是 text，这个字段是可被分词的、可模糊查询的；而如果是 keyword，只能完全匹配、精确查询。
analyzer（存储时生效的分词器）：用 ik_max_word，拆的更碎、索引更多，更有可能被搜出来
search_analyzer（查询时生效的分词器）：用 ik_smart，更偏向于用户想搜的分词
如果想要让 text 类型的分词字段也支持精确查询，可以创建 keyword 类型的子字段：
```

![image-20230814222848757](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814222848757.png)





##### CRUD

(1)继承ElasticsearchRepository，提供简单的crud

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
    <S extends T> S save(S entity);

    <S extends T> Iterable<S> saveAll(Iterable<S> entities);

    Optional<T> findById(ID id);

    boolean existsById(ID id);

    Iterable<T> findAll();

    Iterable<T> findAllById(Iterable<ID> ids);

    long count();

    void deleteById(ID id);

    void delete(T entity);

    void deleteAllById(Iterable<? extends ID> ids);

    void deleteAll(Iterable<? extends T> entities);

    void deleteAll();
}
```

ES 中，_开头的字段表示系统默认字段，比如 _id，如果系统不指定，会自动生成。但是不会在 _source 字段中补充 id 的值，所以建议手动指定。



支持根据方法名自动生成方法

```java
List<PostEsDTO> findByUserId(Long userId);

List<PostEsDTO> findByTitle(String title);
```



(2)ElasticsearchRestTemplate,Spring 默认给我们提供的操作 es 的客户端对象，也提供了增删改查，它的增删改查更灵活，适用于更复杂的操作，返回结果更完整，但需要自己解析。



取参数->把参数组合为 ES 支持的搜索条件->从返回值中取结果

```java
BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        // 过滤
        boolQueryBuilder.filter(QueryBuilders.termQuery("isDelete", 0));
        if (id != null) {
            boolQueryBuilder.filter(QueryBuilders.termQuery("id", id));
        }
        if (notId != null) {
            boolQueryBuilder.mustNot(QueryBuilders.termQuery("id", notId));
        }
        if (userId != null) {
            boolQueryBuilder.filter(QueryBuilders.termQuery("userId", userId));
        }
        // 必须包含所有标签
        if (CollectionUtils.isNotEmpty(tagList)) {
            for (String tag : tagList) {
                boolQueryBuilder.filter(QueryBuilders.termQuery("tags", tag));
            }
        }
        // 包含任何一个标签即可
        if (CollectionUtils.isNotEmpty(orTagList)) {
            BoolQueryBuilder orTagBoolQueryBuilder = QueryBuilders.boolQuery();
            for (String tag : orTagList) {
                orTagBoolQueryBuilder.should(QueryBuilders.termQuery("tags", tag));
            }
            orTagBoolQueryBuilder.minimumShouldMatch(1);
            boolQueryBuilder.filter(orTagBoolQueryBuilder);
        }
        // 按关键词检索
        if (StringUtils.isNotBlank(searchText)) {
            boolQueryBuilder.should(QueryBuilders.matchQuery("title", searchText));
            boolQueryBuilder.should(QueryBuilders.matchQuery("content", searchText));
            boolQueryBuilder.minimumShouldMatch(1);
        }
        // 按标题检索
        if (StringUtils.isNotBlank(title)) {
            boolQueryBuilder.should(QueryBuilders.matchQuery("title", title));
            boolQueryBuilder.minimumShouldMatch(1);
        }
        // 按内容检索
        if (StringUtils.isNotBlank(content)) {
            boolQueryBuilder.should(QueryBuilders.matchQuery("content", content));
            boolQueryBuilder.minimumShouldMatch(1);
        }
        // 排序
        SortBuilder<?> sortBuilder = SortBuilders.scoreSort();
        if (StringUtils.isNotBlank(sortField)) {
            sortBuilder = SortBuilders.fieldSort(sortField);
            sortBuilder.order(CommonConstant.SORT_ORDER_ASC.equals(sortOrder) ? SortOrder.ASC : SortOrder.DESC);
        }
        // 分页
        PageRequest pageRequest = PageRequest.of((int) current, (int) pageSize);
        // 构造查询
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder().withQuery(boolQueryBuilder)
                .withPageable(pageRequest).withSorts(sortBuilder).build();
        SearchHits<PostEsDTO> searchHits = elasticsearchRestTemplate.search(searchQuery, PostEsDTO.class);
```

(3)查询DSL

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-filter-context.html

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-bool-query.html

![image-20230814224241744](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814224241744.png)

wildcard 模糊查询

regexp 正则匹配查询

查询结果中，score 代表匹配分数

![image-20230814224446191](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814224446191.png)

动静分离设计：先模糊筛选静态数据，查出数据后，再根据查到的内容 id 去数据库查找到 



高亮

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/highlighting.html

```json
GET /_search
{
  "query": {
    "match": { "content": "kimchy" }
  },
  "highlight": {
    "fields": {
      "content": {}
    }
  }
}
```

搜索建议

https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-suggesters.html

```json
POST my-index-000001/_search
{
  "query" : {
    "match": {
      "message": "tring out Elasticsearch"
    }
  },
  "suggest" : {
    "my-suggestion" : {
      "text" : "tring out Elasticsearch",
      "term" : {
        "field" : "message" //提示字段
      }
    }
  }
}
```



## 数据同步

定时任务，比如 1 分钟 1 次，找到 MySQL 中过去几分钟内（至少是定时周期的 2 倍）发生改变的数据，然后更新到 ES。

双写：写数据的时候，必须也去写 ES；更新删除数据库同理。（事务：建议先保证 MySQL 写成功，如果 ES 写失败了，可以通过定时任务 + 日志 + 告警进行检测和修复（补偿））

用 Logstash 数据同步管道（一般要配合 kafka 消息队列 + beats 采集器）：

Canal 监听 MySQL Binlog，实时同步



#### logstash

传输和处理数据的管道

![image-20230814224919588](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814224919588.png)

https://www.elastic.co/guide/en/logstash/7.17/getting-started-with-logstash.html

https://artifacts.elastic.co/downloads/logstash/logstash-7.17.9-windows-x86_64.zip

快速开始：https://bcdh.yuque.com/r/goto?url=https%3A%2F%2Fwww.elastic.co%2Fguide%2Fen%2Flogstash%2F7.17%2Frunning-logstash-windows.html



demo

```powershell
cd logstash-7.17.12
.\bin\logstash.bat -e "input { stdin { } } output { stdout {} }"
```

![image-20230814225546595](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814225546595.png)

![image-20230814230036357](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814230036357.png)



要把 MySQL 同步给 Elasticsearch

增量同步，过滤修改数据

![image-20230814230238673](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814230238673.png)

可能找不到驱动包，修改路径



#### 订阅数据库流水的同步方式 Canal

[alibaba/canal: 阿里巴巴 MySQL binlog 增量订阅&消费组件 (github.com)](https://github.com/alibaba/canal)

原理：数据库每次修改时，会修改 binlog 文件，只要监听该文件的修改，就能第一时间得到消息并处理

canal：帮你监听 binlog，并解析 binlog 为你可以理解的内容。

它伪装成了 MySQL 的从节点，获取主节点给的 binlog，如图：

![image-20230814230526383](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814230526383.png)

快速开始：[QuickStart · alibaba/canal Wiki (github.com)](https://github.com/alibaba/canal/wiki/QuickStart)

如果 java 找不到，修改 startup.bat 脚本为你自己的 java home：

```powershell
set JAVA_HOME = 可能是jvm的server里面的jvm.dll
set PATH=%JAVA_HOME%\bin;%PATH%
```

mysql8可能无法连接

[example.log报错日志 · Issue #3902 · alibaba/canal (github.com)](https://github.com/alibaba/canal/issues/3902)

```sql
ALTER USER 'canal_user'@'%' IDENTIFIED WITH mysql_native_password BY 'canal_user'; 
ALTER USER 'canal_user'@'%' IDENTIFIED BY 'canal_user' PASSWORD EXPIRE NEVER; 
FLUSH PRIVILEGES;
```



配置kibana看板

![image-20230814231134823](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20230814231134823.png)