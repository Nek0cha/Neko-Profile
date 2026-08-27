import Lenis from 'lenis'

let lenis: Lenis | null = null

function initLenis() {
  // View Transitions使用時、ページ遷移のたびに呼ばれるので前のインスタンスを破棄
  if (lenis) {
    lenis.destroy()
  }

  lenis = new Lenis({
    duration: 1.0,           // 1.8 → 1.0（数値を下げると慣性が短くなり、キビキビ動く）
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1.2,    // 0.8 → 1.2（1より上げるとホイール操作への反応が敏感になる）
  })

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // スクロール進行度に応じてCSS変数を更新
  const topSection = document.querySelector('[data-scroll-top]')
  
  lenis.on('scroll', ({ scroll }: { scroll: number }) => {
    if (!topSection) return
    
    const topHeight = topSection.getBoundingClientRect().height
    // topSectionの高さ分スクロールしたら進行度100%になるよう計算
    const progress = Math.min(Math.max(scroll / topHeight, 0), 1)
    
    document.documentElement.style.setProperty('--scroll-progress', progress.toString())
  })
}

// 初回読み込み時
initLenis()

// Astro View Transitionsでページ遷移した時にも再初期化
document.addEventListener('astro:page-load', initLenis)