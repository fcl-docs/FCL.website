此仓库为旧版样式的FCL下载站源码。目前主域名（[https://foldcraftlauncher.cn](https://foldcraftlauncher.cn)）为NEXT重制版，源码在这：[XiaoluoFoxington/FCL.website.NEXT](https://github.com/XiaoluoFoxington/FCL.website.NEXT)。此仓库未来不会有任何内容更改。

# FCL.website

[项目网址](https://old.foldcraftlauncher.cn)

《Fold Craft Launcher》，此软件可以使你在Android设备上运行《我的世界：Java版》（《Minecraft : Java Edition》），并支持各类模组加载器。除此之外，还有自动安装、管理多个游戏版本和下载模组、整合包等多个强大功能。

此项目是由一群成天没事干吃饱了撑着的人搭建的FCL发行版下载站的网页源码。欢迎fork和star。

## 项目源码说明
**FCL.website** 是一个结构清晰（？）、模块化（？）的静态网站项目。项目使用原生 HTML、CSS 与 JavaScript 构建，无需依赖后端，适合部署在任意静态托管服务上（如 GitHub Pages、Vercel、Netlify 等）。

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
- **`/sitemap.xml`**：站点地图，所有新页面需在此登记。

## ~~贡献指南~~ 规则怪谈

为确保代码一致性和页面规范，请遵循以下开发与贡献要求：

### 页面开发规范

- 所有新建页面必须基于 `/page/base.html` 模板。
- 每次新增页面时，务必在 `/sitemap.xml` 中添加对应链接。

### 组件开发规范

- 所有新组件需在 `/page/debug/elements.html` 中提供示例效果，便于复用和测试。

### JavaScript 编码规范

- 所有函数必须使用 `function` 关键字定义（禁止使用箭头函数）。
- 所有函数和主要逻辑需附带 **JSDoc 注释**，以便文档生成和维护。
- 在 `/js/index.js` 中有一个名为 `printRandomError` 的常量，当设为 `true` 时，会在控制台中随机输出无意义的错误消息（用于调试模拟），如无需求可设为 `false` 以保持输出清洁。

### 样式与主题

- 项目使用模块化 CSS，尽量避免在 HTML 内写行内样式。

### 提交规范
采用结构化提交消息：

```bash
git commit -m "功能：下载页 ： 新增版本选择下拉菜单"
```

| 类型 | 解释 | 举例 |
| --- | --- | --- |
| 内容 | 文本内容修改 | 内容：主页：修改介绍文本 |
| 功能 | 新功能开发 | 功能：人机验证：添加换一个问题功能 |
| 优化 | 性能体验改进 | 优化：下载页面：折叠历史版本 |
| 修复 | BUG修复 | 修复：人机验证：编程题代码没有高亮 |
