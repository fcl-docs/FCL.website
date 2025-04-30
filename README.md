# FCL.website 项目简介
《Fold Craft Launcher》（下文简称FCL），此软件可以使你在Android设备上运行《我的世界：Java版》（《Minecraft : Java Edition》），并支持各类模组加载器。除此之外，还有自动安装、管理多个游戏版本和下载模组、整合包等多个强大功能。
本项目是FCL玩家自己搭建的FCL发行版下载站的网页源码。
欢迎fork和star。

## 项目源码说明
**FCL.website** 是一个结构清晰、模块化的静态网站项目。项目使用原生 HTML、CSS 与 JavaScript 构建，无需依赖后端，适合部署在任意静态托管服务上（如 GitHub Pages、Vercel、Netlify 等）。

## 项目结构简要

- **`/index.html`**：网站主页。
- **`/page/`**：页面模板与内容页存放目录。
  - **`base.html`**：通用基础模板，新建页面需基于此模板。
  - **`content/`**：各类内容页面。
  - **`debug/elements.html`**：组件展示页，所有自定义组件需在此展示示例与说明。
- **`/css/`**：样式文件，包含主样式表与第三方库样式。
- **`/js/`**：主脚本目录。
  - **`index.js`**：核心脚本逻辑。
  - **`libs/`**：第三方依赖库（如 `marked.js`, `highlight.js`, `eruda.js` 等）。
- **`/file/`**：静态资源，包括图片与验证相关文件。
- **`/data/`**：结构化数据文件，例如验证问答 JSON。
- **`sitemap.xml`**：站点地图，所有新页面需在此登记。
- **`README.md`、`support.html`、`about.html` 等**：辅助说明与支持页面。

## 贡献指南

为确保代码一致性和页面规范，请遵循以下开发与贡献要求：

### 页面开发规范

- 所有新建页面必须基于 `/page/base.html` 模板。
- 每次新增页面时，务必在 `/sitemap.xml` 中添加对应链接。
- 页面应保持语义化结构和良好的可访问性。

### 组件开发规范

- 所有新组件（按钮、卡片、弹窗等）需在 `/page/debug/elements.html` 中提供示例效果，便于复用和测试。

### JavaScript 编码规范

- 所有函数必须使用 `function` 关键字定义（禁止使用箭头函数）。
- 所有函数和主要逻辑需附带 **JSDoc 注释**，以便文档生成和维护。
- 在 `/js/index.js` 中有一个名为 `printRandomError` 的常量，当设为 `true` 时，会在控制台中随机输出无意义的错误消息（用于调试模拟），如无需求可设为 `false` 以保持输出清洁。

### 样式与主题

- 项目使用模块化 CSS，尽量避免在 HTML 内写行内样式。
- 支持深色模式（由 `github-dark.min.css` 提供），页面需考虑暗色适配性。

## 技术亮点

- 使用 `marked.js` 实现 Markdown 渲染能力。
- 使用 `highlight.js` 自动高亮代码块。
- 内置 `eruda.js`，便于移动端调试。
- 支持校验和页面、问题验证机制和设备类型检测功能。
