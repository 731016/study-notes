# Ubuntu问题解答

```PowerShell
##vmware下ubuntu虚拟机如何安装vmware tools
    1.选择vmwaretools光盘，双击打开  
    2.右键提取到桌面
    3.终端，cd进入vmwar-tools-distrib
    4.执行sudo ./vmware-install.pl
    5.第一项输入yes，其余全部回车
    6.安装完成，打开自动适应客户机和自动适应窗口
  
##xshell连接Ubuntu
    安装完毕后先在要连接的Ubuntu主机下开启SSH服务，如果没有开启需要安装openssh-server:
    sudo apt-get install openssh-server
    使用ps -e | grep ssh，如果只有ssh-agent表示还没启动，需要/etc/init.d/ssh start；有sshd说明已启动
    如果你确认输入的用户名和密码都没有问题，但登录还是显示如下情况，拒绝你的输入的密码的话：
      需要编辑一下/etc/ssh/sshd_config文件：
      将 PermitRootLogin改为 yes
      查看一下ubuntu的防火墙是否关闭，关闭ubuntu的防火墙
        ufw disable
      重启ssh-server
      
      
##解决VMware运行Ubuntu无法跨系统复制粘贴的问题
    sudo apt-get autoremove open-vm-tools
    sudo apt-get install open-vm-tools
    sudo apt-get install open-vm-tools-desktop
   
##
```