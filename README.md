<p align='center'>
  <p align='center'><img width='150' src='https://raw.githubusercontent.com/coding-show/dort/master/client/static/images/favicon.png' /></p>
  <p align='center'>File sharing through web with wonderful alternation.</p>
</p>

### Introduction
Dort is a npm tool to share your editing, file structure through web during presentation or code review.

Everybody in the same network can browse through the files, check file history, copy the code, download the project, preview images, etc.

### Feature
- Easy for Client (all platform with browser)
- Live Update
- Low Network Traffic

### Demo
![](https://github.com/coding-show/dort/blob/master/media/screenshot.png?raw=true)

### Instruction
1. Prepare NodeJS and NPM environment

2. Install package
``` bash
# npm install -g dort
```

3. Launch dort inside your project folder
```
# cd /your-files
# dort
```

4. Open default browser with default port - [http://localhost:4574](http://localhost:4574)

5. Shre the url to any body in the same network

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
- [ ] chat and barrage
- [ ] File content interactive
