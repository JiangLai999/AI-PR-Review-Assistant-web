# Website Maintenance Guide

本目录是项目的静态展示站，采用“页面结构手写 + 文档内容自动生成”的方式维护。

## 当前结构

```text
website/
  index.html              # 官网结构
  css/style.css           # 页面样式
  js/main.js              # 交互、文档渲染与 data-docs-jump 跳转
  assets/site-icon.png    # 网站图标
  assets/og-preview.png   # 社交预览图
  assets/docs-data.js     # 从 Markdown 自动生成
  assets/p2/              # 可选：官网使用的 P2 配图
```

## 文档同步机制

文档中心由以下源文件生成：

- `README.md`：快速开始、配置文件、Provider 配置、使用示例、Chat 工作区、Web 工作台、项目结构
- `docs/API.md`：命令概览、主命令、配置命令、工作台与辅助命令、历史命令
- `docs/PR_WORKFLOW.md`：PR 工作流
- `docs/COMPLIANCE_AND_ORIGINALITY.md`：合规、原创性与第三方许可

生成脚本：

```bash
python scripts/build_website_docs.py
```

生成产物：

```text
website/assets/docs-data.js
```

前端通过 `window.__WEBSITE_DOCS__` 读取该文件并渲染文档中心。**不要手改 `docs-data.js`。**

## 当前文档 tab

生成器当前输出以下 tab（以 `scripts/build_website_docs.py` 为准）：

1. `quickstart` 快速开始
2. `cli-command-reference` CLI 命令速查
3. `config-priority` 配置文件
4. `env` 环境要求
5. `provider-config` Provider 配置
6. `usage` 使用示例
7. `chat-workspace` Chat 工作区
8. `web-workbench` Web 工作台
9. `cli-api` CLI 详解
10. `project-structure` 项目结构
11. `workflow-guide` PR 工作流
12. `compliance` 合规与许可

参考文档卡片还包括：

- `docs/RELEASE.md`
- `docs/PROJECT_DESIGN.md`
- `docs/INNOVATION.md`
- `docs/chat-features.md`
- `docs/session-and-compaction-guide.md`
- `docs/DEV_RECORD.md`
- `THIRD_PARTY_NOTICES.md`
- `docs/COMPLIANCE_AND_ORIGINALITY.md`
- `CONTRIBUTING.md`

## 首页跳转到指定 tab

首页任意元素可加：

```html
<button data-docs-jump="cli-command-reference">查看全部 CLI 命令</button>
```

`website/js/main.js` 会滚动到 `#docs` 并选中对应 tab。不要为该跳转再写第二套渲染逻辑。

## 推荐更新流程

当你修改安装命令、环境变量、CLI 命令、PR 工作流、合规声明或文档说明时：

```bash
python scripts/build_website_docs.py
python -m pytest tests/test_website_docs.py tests/test_cli_docs.py tests/test_web_api_docs.py tests/test_doc_links.py -q --no-cov -p no:cacheprovider
```

然后检查官网展示是否符合预期。

## 发布流程

`scripts/release.sh` 已自动包含网站文档数据生成步骤：

```bash
python scripts/build_website_docs.py
python -m build
twine check dist/*
```

正式打包前会先刷新网站文档，避免页面内容和仓库文档脱节。

## 注意事项

- 文档标题变更时，需要同步调整 `scripts/build_website_docs.py` 的提取逻辑。
- 文档中心展示的是“精选内容”，不是把整份 Markdown 原样塞进页面。
- 新增 tab 优先改生成脚本，不要手写进 `index.html`。
- 官网主仓 `website/` 与独立官网仓库需要保持逐字节一致；更新后同步到独立仓库再发布 Pages。
