# Website Maintenance Guide

本目录是项目的静态展示站，当前采用“页面结构手写 + 文档内容自动生成”的方式维护。

## 当前结构

```text
website/
  index.html            # 官网结构
  css/style.css         # 页面样式
  js/main.js            # 交互与文档渲染
  assets/site-icon.png  # 网站图标
  assets/docs-data.js   # 从 Markdown 自动生成
```

## 文档同步机制

网站文档中心不再手写维护，而是由以下源文件生成：

- `README.md`
- `docs/API.md`
- `docs/PR_WORKFLOW.md`

生成脚本：

```bash
python scripts/build_website_docs.py
```

生成产物：

```text
website/assets/docs-data.js
```

前端通过 `window.__WEBSITE_DOCS__` 读取该文件并渲染文档中心。

## 推荐更新流程

当你修改以下内容时：

- 安装命令
- 环境变量
- CLI 命令
- PR 工作流
- 文档说明

应该执行：

```bash
python scripts/build_website_docs.py
```

然后再检查网站展示是否符合预期。

## 发布流程

当前 `scripts/release.sh` 已经自动包含网站文档数据生成步骤：

```bash
python scripts/build_website_docs.py
python -m build
twine check dist/*
```

这意味着在正式打包前，网站文档会先被刷新，避免页面内容和仓库文档脱节。

## 注意事项

- 如果文档标题发生变更，可能需要同步调整 `scripts/build_website_docs.py` 中的提取逻辑。
- 网站文档中心展示的是“精选内容”，不是把整份 Markdown 原样塞进页面。
- 如果需要新增一个文档 tab，优先修改生成脚本，而不是手动往 `index.html` 写死内容。
