# linux安装

```Java
iso镜像:erevything-1503  kali
站点：
http://mirrors.aliyun.com
http://mirrors.163.com
http://mirrors.sohu.com
硬盘大小:120G,便于磁盘分区
网卡：桥接

查看系统监听于tcp协议的22号端口
    ss -tnl
    
确保防火墙处于关闭状态
    Centos7
      iptable -L -n
      iptable -F
      
      systemctl disable(永久)/stop(暂时) firewalld.service
      
    Centos6
      service iptables stop
      chkconfig iptables off
远程登录：xshell
    ssh ip地址
    
ps -e | grep ssh

终端设备文件:
    物理终端：/dev/centosle
    虚拟终端：/dev/tty# [1,6]
    串行终端：/dev/ttyS#
    伪终端：/dev/pts/#
    
查看终端设备：
    tty
查看接口程序：
    echo $SHELL
    
启动GUI:
    startx &
```