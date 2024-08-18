# samba服务账户清除

```PowerShell
#################
##samba服务账号清除#
#################
net use
use * /delete
##################
```

# samba服务器

```PowerShell
#!/bin/bash
        (rpm -qa | grep -P "^net-tools-[0-9]+") || yum install -y net-tools
        a=$(netstat -tunlp | grep -oP "(137|138|139|445)" | sort | uniq | wc -l)
        (rpm -qa | grep -P "^samba-[0-9]+") || (yum install -y samba; systemctl enable nmb smb && systemctl start nmb smb)
        if [[ $a != "4" ]]; then yum reinstall -y samba; systemctl enable nmb smb && systemctl restart nmb smb; fi
        firewall-cmd --permanent --zone=public --add-service=samba
        firewall-cmd --reload
        if [[ $(getenforce) != "Disabled" ]]; then
           setsebool -P samba_enable_home_dirs on
           setsebool -P samba_share_fusefs on
           setsebool -P samba_share_nfs on
           setsebool -P samba_export_all_rw on
           setsebool -P samba_export_all_ro on
        fi
        echo "Samba 服务已安装并启动 ..."
        share_ack="n"
        while [[ $share_ack != "y" ]]; do
              read -e -p "请选择<共享类型>：1)匿名共享 2)本地验证共享 0)不创建共享 ，(1/2/0)：" share_mode
              if [[ $share_mode == "0" ]]; then exit; fi
              read -e -p "请输入<目录路径>：" share_dir
              read -e -p "请输入<共享名>：" share_name
              read -e -i "rw" -p "请设置<共享权限>，(ro只读/rw读写)：" share_perm
              read -e -p "请再次确认(y/n)？" share_ack
              [ -f $share_dir ] && (echo "你的<目录路径>是一个<文件名>，请重新输入！"; share_ack="n")
        done
        if [[ $share_perm == "rw" ]]; then readonly="No"; else readonly="Yes"; fi
        mkdir -p $share_dir
        chmod o=--- $share_dir
        if [[ $share_mode == "1" ]]; then
           setfacl -m u:nobody:r-x $share_dir
           cat >/etc/samba/smb.conf<<EOF
               [global]
                   workgroup = SAMBA
                   security = user
                   passdb backend = tdbsam
                   map to guest = Bad User
               [homes]
                   comment = Home Directories
                   valid users = %S, %D%w%S
                   browseable = No
                   read only = No
                   inherit acls = Yes
               [$share_name]
                   comment = Public Share
                   browseable = Yes
                   read only = $readonly
                   inherit acls = Yes
                   path = $share_dir
                   guest ok = Yes
                   guest account = nobody
                   write list = root
                   admin users = root
           EOF
           systemctl restart nmb smb
        elif [[ $share_mode == "2" ]]; then
           chmod o=rwx $share_dir
           cat >/etc/samba/smb.conf<<EOF
               [global]
                   workgroup = SAMBA
                   security = user
                   passdb backend = tdbsam
               [homes]
                   comment = Home Directories
                   valid users = %S, %D%w%S
                   browseable = No
                   read only = No
                   inherit acls = Yes
               [$share_name]
                   comment = Public Share
                   browseable = Yes
                   read only = $readonly
                   inherit acls = Yes
                   path = $share_dir
                   guest ok = No
                   admin users = root
           EOF
           systemctl restart nmb smb
        fi
        smbpasswd -x root
        echo -e '123456\n123456' | smbpasswd -a root
```