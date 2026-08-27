# Neko-Profile

Astro (v7, static output) で構築したねこのプロフィールサイト
Tailwind CSS v4 でスタイリング

## 技術スタック

- [Astro](https://astro.build) v7（`output: "static"`）
- [Tailwind CSS v4](https://tailwindcss.com)（`@tailwindcss/vite` 経由、CSS-first config）
- [astro-icon](https://github.com/natemoo-re/astro-icon)（[Iconify](https://icon-sets.iconify.design/) 経由でアイコンをビルド時にSVG埋め込み）
- [Lenis](https://github.com/darkroomengineering/lenis)（スムーススクロール）
- [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/)（クロスブラウザで統一されたカスタムスクロールバー）
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)（sitemap自動生成）

## セットアップ

```sh
pnpm install
```

## コマンド一覧

| コマンド | 内容 |
| :--- | :--- |
| `pnpm dev` | 開発サーバーを起動（`http://localhost:4321`） |
| `astro dev --background` | 開発サーバーをバックグラウンドで起動。`astro dev stop` / `status` / `logs` で管理 |
| `pnpm build` | 本番ビルドを `./dist/` に出力 |
| `pnpm preview` | ビルド結果をローカルでプレビュー |
| `pnpm astro check` | 型チェック |