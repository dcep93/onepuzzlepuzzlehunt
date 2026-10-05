import { useSyncExternalStore } from 'react'
import { resolveView, type HuntView } from './puzzle'

const navigationEvent = 'hunt:navigate'
const solvedStorageKey = 'onepuzzlepuzzlehunt:solved'
let solvedInMemory = false

function hasSolved(): boolean {
  if (solvedInMemory) return true
  try {
    return window.sessionStorage.getItem(solvedStorageKey) === 'yes'
  } catch {
    return false
  }
}

export function rememberSolved(): void {
  solvedInMemory = true
  try {
    window.sessionStorage.setItem(solvedStorageKey, 'yes')
  } catch {
    // The current page can still unlock when browser storage is unavailable.
  }
}

export function navigate(view: HuntView): void {
  window.history.pushState(null, '', view === 'home' ? '/' : `/${view}`)
  window.dispatchEvent(new Event(navigationEvent))
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange)
  window.addEventListener(navigationEvent, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(navigationEvent, onChange)
  }
}

function getSnapshot(): HuntView {
  return resolveView(window.location.pathname, hasSolved())
}

export function useHuntView(): HuntView {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'home')
}
