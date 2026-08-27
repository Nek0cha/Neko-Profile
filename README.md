# ねこ プロフィールサイト

Astro (v7, static output) で構築した個人プロフィール / リンクインバイオサイト。Tailwind CSS v4 でスタイリングしている。

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

## コンテンツの編集

`src/data/data.json` がサイト全体のコンテンツの単一ソース。基本的にページ（`.astro`ファイル）を直接編集する必要はなく、このJSONを書き換えるだけで内容が反映される。

- `name` / `bio` / `statusText` / `detailedBio`：プロフィール情報。`detailedBio` は自己紹介セクションの各段落（配列の1要素＝1段落）
- `links`：SNS・連絡先リンクの一覧
  - `title` / `description` / `url` / `handle` / `themeColor`：表示内容とホバー時の配色
  - `icon`：[Iconify](https://icon-sets.iconify.design/) の `コレクション名:アイコン名` 形式（例：`simple-icons:twitter`）
  - `copy: true` を付けると、リンクとして開く代わりにクリック時に `url` の値をクリップボードにコピーするボタンになる。メールアドレスや、期限切れの可能性がある個人へのフレンド申請リンクの代わりにユーザー名だけ渡したい場合などに使う
- `works`：作品一覧（`title` / `description` / `url`）。カード下部にドメインが自動表示される
- `pages.<page>.title` / `pages.<page>.ogp`：ページごとの `<title>` と OGP（`title` / `description` / `image`）
- `pages.nekochan`：隠しページ（イースターエッグ）用のコンテンツ。footerのコピーライト表記の名前部分からリンクしている
- `pages.notFound`：404ページのコンテンツ

## OGP画像

`public/images/ogp/` に 1200×630px の PNG を配置し、`data.json` の `pages.<page>.ogp.image` から参照する（パスはドメインルートからの絶対パス）。

新しく作る／差し替える場合は、サイトと同じ配色・フォントのHTMLテンプレートをブラウザ（Playwright等）で1200×630（高品質にしたい場合は2倍サイズで撮って縮小）でスクリーンショットする方法で作成した。

## デプロイ

Cloudflare Pages を想定。`output: "static"` のため専用アダプターは不要で、`pnpm build` の出力である `./dist/` をそのままデプロイできる。

`astro.config.mjs` の `site`（`https://ny4n.net`）は OGP画像の絶対URL化と `sitemap.xml` の生成に使われるため、実際に公開するドメインと一致させること。

## 隠しページについて

`/nekochan` は `sitemap.xml` から除外し、`<meta name="robots" content="noindex, nofollow">` を付与している（`robots.txt` には記載していない。記載すると逆に存在を公表してしまうため）。
