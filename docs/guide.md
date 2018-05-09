### 启动
- 准备 **nodejs** 和 **npm** 环境
``` json
"engines": {
  "node": ">= 4.0.0",
  "npm": ">= 3.0.0"
}
```

- 安装 **dort** 工具
``` bash
# npm install -g dort
```

3. 进入目标文件夹并启动 **dort** 工具
``` bash
# cd ${your-files-path}
# dort
```

##### 启动配置项
params | Type | Default	| Description
-------- | ---- | ------- | -----------
debug | number	| 1	| develop levels (调试用，打印log)
path	| string	| ''	| path of file you want open
name	| string	| ''	| name of project
port	| number	| 4574	| port for web
exclude	| array	| ['**/.DS_Store', '**/.log', ...]	| file to exclude
test	| bool	| false	| Enable test mode or not
max-file-size	| number	| 99999	| max file size

通过启动配置参数
``` bash
# dort "My project" --debug 0 --path /file-path --port 1234 --exclude "node_modules/**" --test true --max-file-size 99999
# // or below for short
# dort "My project" -d 0 -pa /file-path -po 1234 -e "node_modules/**" -t true -m 99999
```

4. 打开本地端口 - [http://localhost:4574](http://localhost:4574)
![](https://github.com/coding-show/dort/blob/master/media/screenshot1.png?raw=true)

5. 分享url给其他内网用户

### 使用
内网用户点击链接进入Web界面后可以看到分享的项目结构、文件内容、每个文件更新的版本记录等
以及会分配到一个聊天系统的昵称

##### 显示
- 文件内容显示，目前支持文本文件和图片
- 显示/关闭 文件更新的版本列表
- 显示/关闭 文件更新的diff信息

##### 内容
- 复制当前文件内容
- 下载当前文件
- 下载整个项目压缩包

##### 聊天
- 更改用户昵称
- 发送聊天内容
- 开启/关闭弹幕显示
