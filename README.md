# Random Avatar API

[English](./README_EN.md)

这是一个简单的 REST API 服务，用于生成随机风格的矢量头像。

## 鸣谢

本项目核心素材与设计灵感来源于 [vue-color-avatar](https://github.com/Codennnn/vue-color-avatar)。感谢原作者的开源贡献。

## 快速开始

### 本地运行

你需要安装 [Node.js](https://nodejs.org/) (推荐 v18+)。

1.  安装依赖：
    ```bash
    npm install
    ```

2.  启动服务：
    ```bash
    npm start
    ```

服务默认在 `3000` 端口运行。

### Docker 运行

1.  构建镜像：
    ```bash
    docker build -t avatar-api .
    ```

2.  运行容器：
    ```bash
    docker run -d --name random-avatar-api -p 3000:3000 avatar-api
    ```

## API 接口

### 1. 获取随机头像

获取一个随机生成的 SVG 头像。

-   **接口**: `GET /image`
-   **参数**:
    -   `size` (可选): 头像大小（像素），默认值见代码配置（通常为适当的显示大小）。示例: `?size=200`

**示例请求**:
```bash
curl http://localhost:3000/image?size=200 > avatar.svg
```

### 2. 健康检查

用于服务存活检测。

-   **接口**: `GET /healthz`
-   **返回**: `{"status": "ok"}`

## 环境变量

-   `PORT`: 指定服务监听端口（默认 3000）。
