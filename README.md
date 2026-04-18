<div align="center">
  
# 🛡️ LifyLearn - 内网学习平台 (个人开源版)

**基于极客审美构建的全栈生产力引擎 | 博客 · 教程 · 工具箱**

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge&logo=appveyor)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?style=for-the-badge&logo=node.js)

</div>

---

## 📑 项目简介

**LifyLearn (个人开源版)** 是一款专为开发者与极客设计的个人工作效率提升与知识管理平台。系统采用「深海科技蓝」与「暗黑玻璃拟态 (Glassmorphism)」的视觉语言设计，提供极具沉浸感的「指挥官」级交互体验。

本项目为个人开源版本，核心功能包含知识碎片整理、技术教程管理以及个人常用工具库导航。平台支持高度自动化，包含智能解析 Markdown 与 Word `.docx` 文档、自动提取图片等后台静默操作，实现极致的录入体验。

*(注：项目截图与演示资源可存放在 `docs/assets/` 目录下。)*

---

## ✨ 核心功能矩阵 (开源版)

- 📝 **极客博客系统**：支持 Markdown 全血编辑与渲染，无缝沉淀技术经验。
- 📚 **教程知识库**：分级分类的技术教程管理，构建个人知识图谱。
- 🧰 **效率工具箱**：整合各类在线工具与服务链接，支持快速导航与检索。
- 🧠 **智能文档解析**：
  - **秒级上传**：支持直接拖拽 `.md` 与 `.docx` 文件。
  - **图文自动剥离**：后台静默解析 Word 中的图片，自动存入服务器并替换为标准 Markdown 链接，全程无需人工干预。
- 🎨 **指挥终端 UI**：以「国密级」暗黑科技风为基调，全响应式布局，配合交互式粒子动效。

---

## 🚀 商业企业版 (Enterprise Edition)

本项目另有提供面向政企与团队的 **LifyLearn 企业版**，提供更深度的团队协作与内网学习生态，主要扩展功能包括：

- 🏢 **内网授课平台**：支持内部在线课程发布、视频流媒体播放与课件分发。
- 📅 **学习计划系统**：定制化团队/个人学习路线，进度追踪与考核体系。
- 👥 **员工与组织管理**：多层级权限控制，员工画像，学习数据大屏可视化分析。
- 🔐 **增强安全审计**：符合高安全标准的日志记录与访问控制，专为隔离内网环境打造。

> *如需企业版解决方案，请联系作者获取商业授权与部署支持。*

---

## 🛠️ 技术栈架构

**Frontend (前端)**
- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS + 深色模式配置
- Framer Motion (提供丝滑动效)
- React Router DOM

**Backend (后端)**
- Node.js + Express.js 框架
- SQLite (轻量级本地存储，无需繁琐数据库配置)
- Mammoth & Turndown (Word 文档解析引擎)
- Multer (大文件与附件管理)

---

## ⚙️ 本地部署与运行指令

请确保您的运行环境已安装 **Node.js (v18+)**。

### 1. 启动后端服务
```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动开发服务器 (默认端口: 3000)
npm run dev
```

### 2. 启动前端终端
```bash
# 开启新的终端，进入前端目录
cd frontend

# 安装依赖
npm install

# 启动 Vite 服务 (默认端口: 8080/8081)
npm run dev
```
> 访问 `http://localhost:8080` 即可进入 LifyLearn 平台。

---

## 📁 项目文件结构梳理

针对 GitHub 仓库优化的目录结构：

```text
LifyLearn/
├── backend/               # 后端微服务与 API (Node.js/Express)
│   ├── public/uploads/    # 自动生成的静态图片/附件存放区
│   ├── src/               # 控制器、路由、服务与数据模型
│   └── package.json       
├── frontend/              # 客户端应用 (React/Vite)
│   ├── src/               # 页面组件、路由、状态与样式
│   └── package.json       
├── docs/                  # 项目文档库
│   ├── assets/            # 💡 [GitHub 说明图、截图、Logo 存放位置]
│   ├── project_new/       # 新功能演进与 PRD 文档
│   └── standards/         # 架构设计、安全与代码规范
├── .gitignore             # Git 忽略配置
└── README.md              # 本文档
```

---

## 📜 许可证

本个人版遵循开源协议，详情请参阅相关文件（如需商用请遵循相关授权规定）。
