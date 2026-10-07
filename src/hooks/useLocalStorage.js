import { useState, useEffect } from 'react'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => read(key, initial))
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage full or blocked */ }
  }, [key, value])
  return [value, setValue]
}
