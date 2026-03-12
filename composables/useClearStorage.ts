// composables/useClearStorage.ts
import { useCookie } from '#app'

export function useClearStorage() {
  /**
   * Clear all cookies set on the client.
   */
  function clearCookies() {
    if (process.client) {
      const cookies = document.cookie.split(';')
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    }
  }

  /**
   * Clear localStorage completely.
   */
  function clearLocalStorage() {
    if (process.client && window.localStorage) {
      window.localStorage.clear()
    }
  }

  /**
   * Clear both cookies and localStorage.
   */
  function clearAll() {
    clearCookies()
    clearLocalStorage()
  }

  return {
    clearCookies,
    clearLocalStorage,
    clearAll
  }
}
