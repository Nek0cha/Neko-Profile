import Lenis from 'lenis'

let lenis: Lenis | null = null

function initLenis() {
  // View Transitions使用時、ページ遷移のたびに呼ばれるので前のインスタンスを破棄
  if (lenis) {
    lenis.destroy()
  }

  lenis = new Lenis({
    duration: 1.8,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 0.8,
  })

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

// 初回読み込み時
initLenis()

// Astro View Transitionsでページ遷移した時にも再初期化
document.addEventListener('astro:page-load', initLenis)