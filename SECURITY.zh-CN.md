# 安全策略 / Security Policy

## 支持的版本

- 当前接收安全更新的 WRF 协议版本为 **v3.1**。v3.0 及更早版本不再维护，也不再接收安全补丁。

## 报告漏洞

如果你发现 WRF 协议、WRF Deck 或相关工具中的安全漏洞，请：

- 发送邮件至 **contact@1g10k.dev**
- 请勿在公开 issue、PR、论坛或社交媒体中披露

我们会在 5 个工作日内确认收到，并在修复后按你的意愿公开致谢。

## 报告内容

为提高处理效率，请尽可能提供：

- 受影响版本
- 漏洞类型与影响
- 复现步骤与最小 PoC
- 相关 WRF 片段或代码路径
- 修复建议（可选）

## 披露政策

本项目遵循协调披露（Coordinated Vulnerability Disclosure）原则：

1. 收到报告后确认并分配处理人。
2. 验证影响范围，准备修复补丁；修复完成前不公开漏洞细节。
3. 修复发布后在 GitHub Security Advisories / Release Notes 中披露，并致谢报告者。
4. 关键修复会通过 contact@1g10k.dev 通知。

## 事件响应

如果怀疑 WRF 协议或 WRF Deck 被利用：

1. 立即停止执行相关命令。
2. 点击 **Lock Sentry Evidence** 锁定当前 WRF 文件状态。
3. 通过 **contact@1g10k.dev** 报告，提供 WRF 片段、复现步骤与运行环境。

## 安全更新

安全补丁和公告将通过以下渠道发布：

- GitHub Security Advisories
- 仓库 Release Notes
- 邮件通知（如有订阅）

## 安全团队

WRF 安全事务由 1G10K 核心维护者负责。所有安全报告将保密处理，直至协调披露完成。