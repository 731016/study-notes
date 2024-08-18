## git常见问题
[简单解决 gitee 上传限制问题 - jaychou、 - 博客园 (cnblogs.com)](https://www.cnblogs.com/jaychou-/p/14983818.html#:~:text=我们使用代码来上,10m以内的文件)

[vscode链接github&gitee](https://blog.csdn.net/qq_38981614/article/details/115013188)

[git同时设置gitee和github push代码](https://cloud.tencent.com/developer/article/1774890)

[ssh测试连接超时 10053](https://www.xuebuyuan.com/2159862.html)

[not a git repository](https://blog.csdn.net/wenb1bai/article/details/89363588)

[git push No configured push destination](https://blog.csdn.net/COCOLI_BK/article/details/97921497)

[修改git远程地址](https://blog.csdn.net/ShelleyLittlehero/article/details/95980669)

#### 443,10054

```bash
#OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054 Failed to connect to github
#Failed to connect to github.com port 443: Timed out
#OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
#网络太拉了
# 先设置这两个参数
git config --global http.sslBackend "openssl" 
git config --global http.sslVerify "false"
# 以后运行这两个就可以了
git config --global --unset http.proxy
git config --global --unset https.proxy

如果配置了代理访问github
配置一个http/https代理,端口是代理软件的端口
git config --global http.proxy 127.0.0.1:4780
git config --global https.proxy 127.0.0.1:4780
或者配置socks代理
git config --global http.proxy socks5 127.0.0.1:4781
git config --global https.proxy socks5 127.0.0.1:4781
```

#### fatal: Out of memory, malloc failed (tried to allocate 3625993192 bytes)

```bash
git config --global http.postBuffer number
这里的number，你要根据报错中提示的字节数来设定，不然是不行的，必须跟他报错推荐设置字节一致
```

#### 重置账户和密码

  ```Git
  git config --system --unset credential.helper
  // 如果需要更大的范围
  git config --global --unset credential.helper)
  ```

```bash
#查看git配置
	#查看仓库级的 config，命令：
git config –local -l
#查看全局级的 config，命令：
git config –global -l
#查看系统级的 config，命令：
git config –system -l
#查看当前生效的配置，  命令：
git config -l

#查看远程仓库地址
git remote -v

## 克隆仓库
git clone 仓库地址

## cd进入克隆的仓库
cd 进入文件目录
把添加的东西放入 仓库内

## 添加到缓存区
git add .

## 提交到本地仓库
git commit -m "注释"

## 上传到远程仓库
git push origin master
```