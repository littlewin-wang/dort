<p align='center'>
  <p align='center'><img width='150' src='https://raw.githubusercontent.com/coding-show/dort/master/client/static/images/favicon.png' /></p>
  <p align='center'>
    File sharing through web with wonderful alternation.</br>
    文件演示分享Web工具
  </p>
</p>

[![Build Status](https://travis-ci.org/coding-tool/dort.svg?branch=master)](https://travis-ci.org/coding-tool/dort)
[![npm version](https://img.shields.io/npm/v/dort.svg?style=flat-square)](https://badge.fury.io/js/dort)

### Introduction - ([https://coding-tool.github.io/dort/](https://coding-tool.github.io/dort/))
Dort is a npm tool to share your editing, file structure through web during presentation or code review.

Dort 是一个使用者在 **讲演** 或者 **代码审阅** 过程 分享 **项目文件**、**编辑过程** 的web工具。

Everybody in the same network can browse through the files, check file history, copy the code, download the project, preview images, etc.

同一内网中的用户可以 **浏览文件**，**查看文件编辑版本**，**复制文本**，**下载整个项目**，**查看图片**，甚至可以与所有打开web的用户进行交流。

### Feature
- Easy for Client (all platform with browser) 便于使用
- Live Update 实时刷新
- Low Network Traffic 低网络负担

### Demo
![](https://github.com/coding-show/dort/blob/master/media/screenshot1.png?raw=true)
![](https://github.com/coding-show/dort/blob/master/media/screenshot2.png?raw=true)
![](https://github.com/coding-show/dort/blob/master/media/screenshot3.png?raw=true)

### Instruction
1. Prepare NodeJS and NPM environment 准备nodejs和npm环境

2. Install package 安装包
``` bash
# npm install -g dort
```

3. Launch dort inside your project folder 启动server端
```
# cd /your-files
# dort
```

4. Open default browser with default port - [http://localhost:4574](http://localhost:4574) 端口可设置

5. Shre the url to any body in the same network 其他内网用户可以通过相应端口访问

### Configuration
params | Type | Default	| Description
-------- | ---- | ------- | -----------
debug | number	| 1	| develop levels
path	| string	| ''	| path of file you want open
name	| string	| ''	| name of project
port	| number	| 4574	| port for web
exclude	| array	| ['**/.DS_Store', '**/.log', ...]	| file to exclude
test	| bool	| false	| Enable test mode or not
max-file-size	| number	| 99999	| max file size

Then you can launch dort as
``` bash
# dort "My project" --debug 0 --path /file-path --port 1234 --exclude "node_modules/**" --test true --max-file-size 99999
# // or
# dort "My project" -d 0 -pa /file-path -po 1234 -e "node_modules/**" -t true -m 99999
```


### TODO
- [x] node procedure to watch files in local
- [x] state management
- [x] FE web
- [x] chat and barrage
- [ ] File content interactive
