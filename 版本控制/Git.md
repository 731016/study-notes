[简单解决 gitee 上传限制问题 - jaychou、 - 博客园 (cnblogs.com)](https://www.cnblogs.com/jaychou-/p/14983818.html#:~:text=我们使用代码来上,10m以内的文件)

  [vscode链接github&gitee](https://blog.csdn.net/qq_38981614/article/details/115013188)

  [git同时设置gitee和github push代码](https://cloud.tencent.com/developer/article/1774890)

  [ssh测试连接超时 10053](https://www.xuebuyuan.com/2159862.html)

  [git push 443问题（我自己的端口4780）](https://blog.csdn.net/m0_46979525/article/details/120825786)

  [not a git repository](https://blog.csdn.net/wenb1bai/article/details/89363588)

  [git push No configured push destination](https://blog.csdn.net/COCOLI_BK/article/details/97921497)

  ```Git
  重置账户和密码
  git config --system --unset credential.helper
  // 如果需要更大的范围
  git config --global --unset credential.helper)
  ```

```Git
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