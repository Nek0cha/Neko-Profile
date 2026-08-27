import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'

let osInstance: OverlayScrollbars | null = null

function initScrollbar() {
  // View Transitions使用時、ページ遷移のたびに呼ばれるので前のインスタンスを破棄
  osInstance?.destroy()

  osInstance = OverlayScrollbars(document.body, {
    scrollbars: {
      theme: 'os-theme-neko',
      autoHide: 'leave',
      autoHideDelay: 800,
    },
  })
}

// 初回読み込み時
initScrollbar()

// Astro View Transitionsでページ遷移した時にも再初期化
document.addEventListener('astro:page-load', initScrollbar)
