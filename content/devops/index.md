---
title: DevOps
tags:
    - devops
    - jenkins
    - virtualbox
---

## Jenkins

### Remote Jenkins starter

```bash
[2017-08-25 11:25.25]  # Obtain the crumb with API key ~
export JENKINS_URL=http://myhost.intra.net:8080/
export JENKINS_BTOKEN=THIS_I_S_DB_TO_STG # defined for the build in config time
export API_TOKEN=711b884f2c591ad36b65bbdc55c9fa # from the user's personal page
export API_USER=admin
export API_CRUMB=$(curl -s -u ${API_USER}:${API_TOKEN} ${JENKINS_URL}/crumbIssuer/api/json| cut -d: -f3 | cut -d, -f1| sed s@\"@@g)
[2017-08-25 11:28.41]  # Start the build with API key and the obtained crumb ~
curl -s -u ${API_USER}:${API_TOKEN} -H "Jenkins-Crumb:${API_CRUMB}" ${JENKINS_URL}//me/my-views/view/MonitoringAndBackup/job/Backup/job/Import_saved_DB_to_staging/build?token=${JENKINS_BTOKEN}
```

## VBox

### create disk

```bash
VBoxManage.exe createmedium disk --filename <FILENAME> --size <SIZE_IN_MEGABYTES>
```

### add disk

```bash
./vboxmanage.exe storageattach "<VMNAME> --storagectl SATA --port 1 --type hdd --medium /VirtualDisks/DiskName.vhd
```

## Windows

### Remote restart

```bash
shutdown /m \\REMOTE_IP /r
```

# More info

- [[docker]]
- [[webservers]]