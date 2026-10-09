---
title: Git
createTime: 2026/04/04 23:28:20
permalink: /notes/版本控制/git/
---
## git常见问题

#### [初次使用git配置以及git如何使用ssh密钥（将ssh密钥添加到github）](https://www.cnblogs.com/superGG1990/p/6844952.html)

#### [简单解决 gitee 上传限制问题 - jaychou、 - 博客园 (cnblogs.com)](https://www.cnblogs.com/jaychou-/p/14983818.html#:~:text=我们使用代码来上,10m以内的文件)

#### [vscode链接github&gitee](https://blog.csdn.net/qq_38981614/article/details/115013188)

#### [git同时设置gitee和github push代码](https://cloud.tencent.com/developer/article/1774890)

#### [解决 fatal: Not a git repository (or any of the parent directories): .git 问题](https://blog.csdn.net/wenb1bai/article/details/89363588)

关联远程或push 又出现了错误，如下

```bash
 fatal: Not a git repository (or any of the parent directories): .git 
```

在命令行 输入 git init  然后回车就好了

#### [git push No configured push destination](https://blog.csdn.net/COCOLI_BK/article/details/97921497)

git下载自己项目到本地:
假如外出工作，需要在另一台电脑上面pull自己的某个git远程项目到本地

```bash
 git init
 
 git pull <远程仓库url>
```

下载的这个项目更改后需要push的会出现：

```bash
$ git push
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using
 
    git remote add <name> <url>
 
and then push using the remote name
 
    git push <name>
```

此时：[git remote用法](https://blog.csdn.net/lamp_yang_3533/article/details/80379246)

```bash
这个时候第一次push需要网址：
 
$ git add --all  或者使用 git add .(所得的文件) | git add file.js(对用指定文件)
$ git commit -m "提交信息"
$ git remote add origin '远程仓库url'
$ git push -u origin origin(对应远程分支名)
 
 
 
然后下一次就不用那么麻烦了，直接：
 
$ git add --all  | git add .(所得的文件) | git add file.js(对用指定文件)
$ git commit -m "信息"
$ git push
```


#### [修改git远程地址](https://blog.csdn.net/ShelleyLittlehero/article/details/95980669)

```bash
1.查看远程地址
git remote -v
2.修改远程地址
git remote set-url origin <url>
```

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