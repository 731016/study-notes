1.找到占用CPU最高的进程

```bash
top//查询进程
```

![image-20240912140554976](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202409121406929.png)



2.找到进程对应线程

```bash
top -Hp  67791 //pid(进程)
```

![image-20240912140806249](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202409121408219.png)

3.打印堆栈信息

```bash
printf '%x\n' 67832 //获取线程的16进制

jstack 67791(进程号,不是线程id) | grep  108f8  //堆栈线程是16进制，直接过滤需要的线程
```