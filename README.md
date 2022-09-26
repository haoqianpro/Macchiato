# Macchiato

## 项目环境

由 Vite 创建的 Vue 项目，使用了 eslint+prettier 进行代码校验。vscode 安装 ESlint+Prettier 插件并在配置文件中添加如下配置可实现保存自动调整代码

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

- Node v16.15.0
- Vue v3.2
- Vite v3.1
- yarn v1.x
