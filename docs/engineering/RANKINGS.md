# 模型排名数据维护

## 当前口径

固定读取 Artificial Analysis 公开模型榜单，目前只接入 Intelligence Index v4.3 与 Terminal-Bench v4.0。模型配置分别排名，不擅自合并不同推理强度。

综合榜排除来源标记的估算分；两榜均排除停用或缺少对应数值的配置。使用原始精度排序，真正相同分数并列。柱高从零开始，显示两位小数不代表数值完全相同。

模型名称作为横轴、分数作为纵轴，名称竖排。前 10／20 名保留边界并列；全部显示保留图表内横向滚动。公司标识保留原色。

## 文件和接口

| 文件／接口 | 作用 |
| --- | --- |
| `server/ranking-source.js` | 限制来源、下载大小、时间及评测版本，解析公开 JSON 载荷 |
| `src/lib/rankings.js` | 快照结构、指标、日期与数值校验 |
| `server/ranking-store.js` | 历史快照、临时文件、原子替换、失败恢复 |
| `public/data/rankings/current.json` | 随源码交付的最近有效快照 |
| `public/data/rankings/status.json` | 最近更新尝试状态，不代表评测更新时间 |
| `public/data/rankings/history/` | 已通过校验的历史快照 |
| `src/data/ranking-brands.json` | 品牌源地址、文件和哈希 |
| `GET /data/rankings/current.json` | 本地读取当前快照 |
| `GET /data/rankings/status.json` | 本地读取最近尝试状态 |
| `POST /api/model-rankings/refresh` | 本地同源刷新，多次并发点击共享一次请求 |

本地 API 由 Vite 插件提供；静态托管没有这个刷新接口。未设置定时调度。

## 更新一次榜单

```sh
pnpm refresh:rankings
pnpm check
```

成功后查看 `current.json` 的来源、指标、实际获取时间、条目变化和原始哈希。失败时看 `status.json`，当前有效快照和日期应保留。按本次数据更新范围提交快照与状态，不混入其他改动。

浏览器中 `pnpm dev` 的更新写 `public/`，`pnpm preview` 的更新写 `dist/`。要保留到源码和下次构建，使用独立刷新脚本。

## 时间含义

`retrievedAt` 是获取这份快照的时间。`sourceUpdatedAt` 是来源披露的统一评测更新时间，目前未披露，所以保留 `null`。不能拿模型发布日期、构建日期或最后编辑日期填入。

超过 7 天的快照会提示复核。这只是提醒，不宣称自动更新。

## 异常与扩展

| 情况 | 应采取的行为 |
| --- | --- |
| 来源超时、403或异常页 | 保留有效快照，记录本次失败 |
| 页面结构、指标版本改变 | 停止替换，核对新口径并补回归数据 |
| 有效模型过少或重复 | 拒绝替换，不显示为新的完整榜单 |
| Windows 文件短暂占用 | 有限重试原子替换，不能先删除旧快照 |
| 新公司缺少标识 | 获取可追溯的品牌资产，保留原色和来源记录 |
| 希望加入 Arena／中文／图像／视频 | 建立独立来源、指标和方法说明，不能套用综合分 |

源码不会执行源站脚本；下载限制为 25 秒、12 MB，保持 TLS 校验。测试使用小型固定 fixture，不依赖外部榜单在线。

扩展时至少覆盖成功解析、结构改变、空值、同分、异常页与失败保留；需要同步更新来源说明和[项目状态](../STATUS.md)。
