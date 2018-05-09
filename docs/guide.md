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
