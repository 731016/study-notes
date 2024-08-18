## 注册表修改

```powershell
计算机\HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe
```



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112071615577.png" alt="image-20211207161515216" style="zoom: 80%;" />

### jdk 环境变量设置

> 默认是GBK编码，无法识别中文

```powershell
在系统环境变量中增加一个变量，变量名为: JAVA_TOOL_OPTIONS， 变量值为：-Dfile.encoding=UTF-8
```

