// クリップボードコピー機能（links.astro専用、メール・Discordユーザー名など期限のないテキスト向け）
function initCopyButtons() {
  document.querySelectorAll<HTMLButtonElement>('.copy-btn[data-copy-value]').forEach((btn) => {
    const handleEl = btn.querySelector<HTMLElement>('.copy-handle')
    const defaultIcon = btn.querySelector<HTMLElement>('.copy-icon-default')
    const copiedIcon = btn.querySelector<HTMLElement>('.copy-icon-copied')

    btn.addEventListener('click', async () => {
      const value = btn.dataset.copyValue
      if (!value || !handleEl) return

      try {
        await navigator.clipboard.writeText(value)
      } catch {
        // クリップボードAPIが使えない環境（非対応ブラウザ等）では何もしない
        return
      }

      const original = handleEl.dataset.handle ?? handleEl.textContent ?? ''
      handleEl.textContent = 'コピーしました！'
      handleEl.classList.add('text-accent')
      defaultIcon?.classList.add('hidden')
      copiedIcon?.classList.remove('hidden')

      // 連打された時に前のタイマーで表示が巻き戻らないようにクリア
      window.clearTimeout(Number(btn.dataset.copyTimeoutId))
      const timeoutId = window.setTimeout(() => {
        handleEl.textContent = original
        handleEl.classList.remove('text-accent')
        defaultIcon?.classList.remove('hidden')
        copiedIcon?.classList.add('hidden')
      }, 1600)
      btn.dataset.copyTimeoutId = String(timeoutId)
    })
  })
}

// 初回読み込み時
initCopyButtons()

// Astro View Transitionsでページ遷移した時にも再初期化（lenis-init.tsと同じ理由）
document.addEventListener('astro:page-load', initCopyButtons)
