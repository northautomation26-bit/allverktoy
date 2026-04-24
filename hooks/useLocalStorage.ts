'use client'
import { useState, useEffect, useCallback } from 'react'

/**
 * useState som synkroniseres med localStorage.
 * SSR-safe: returnerer initialverdi til etter hydrering.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        setValue(JSON.parse(item) as T)
      }
    } catch (e) {
      console.warn(`Kunne ikke lese ${key} fra localStorage`, e)
    }
    setIsHydrated(true)
  }, [key])

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof newValue === 'function' ? (newValue as (p: T) => T)(prev) : newValue
        if (isHydrated) {
          try {
            window.localStorage.setItem(key, JSON.stringify(next))
          } catch (e) {
            console.warn(`Kunne ikke lagre ${key} i localStorage`, e)
          }
        }
        return next
      })
    },
    [key, isHydrated]
  )

  return [value, setStoredValue]
}
