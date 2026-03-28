# Commerce SaaS Portfolio

Portfolio 项目：用「可售卖的 prompt」作素材，演示电商 SaaS 全链路（Next.js App Router、SSR 列表与详情、Stripe Hosted Checkout、Webhook 验签与订单落盘）。

## 本地运行

```bash
npm install
cp .env.example .env.local
```

在 `.env.local` 填入 Stripe 测试密钥与 `NEXT_PUBLIC_APP_URL=http://localhost:3000`。

```bash
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)（会重定向到 `/products`）。

## Stripe Webhook（本地）

使用 [Stripe CLI](https://stripe.com/docs/stripe-cli) 将事件转发到本机：

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

把 CLI 输出的 `whsec_...` 填进 `.env.local` 的 `STRIPE_WEBHOOK_SECRET`。

## 数据

- 商品：`data/products.json`
- 订单（仅本地非 Vercel 环境）：`data/orders.json`（Webhook 写入；Vercel 上无持久化文件系统，仅打日志）

## 部署

推荐 Vercel：设置相同环境变量，并在 Stripe Dashboard 配置生产环境的 Webhook 端点（`/api/webhook`）。
