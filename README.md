# Macchiato

## 项目环境

由 Vite 创建的 Vue 项目，使用了 ESlint+Prettier 进行代码校验。VSCode 安装 ESlint+Prettier 插件并在配置文件中添加配置可实现保存自动调整代码

### 软件版本

| 软件 | 版本     |
| ---- | -------- |
| Node | v16.15.0 |
| Vue  | v3.2     |
| Vite | v3.1     |
| Yarn | v1.x     |

### VSCode 配置

```
"editor.formatOnSave": true, // 保存格式化
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true // 按照eslint规则格式化
},
"eslint.format.enable": true, // 启用ESLint作为已验证文件的格式化程序

"editor.defaultFormatter": "esbenp.prettier-vscode",

"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}

```

### 代码修复

运行项目是自动进行代码检查，如果没有使用 VSCode 保存修复功能，可以执行命令`yarn lint`修复代码
