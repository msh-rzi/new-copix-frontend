import { useState } from 'react'

// Define the type for the return value of the hook
type UseLocalStorageReturnType<T> = {
  storedValue: T
  setValue: (value: T | ((val: T) => T)) => void
  removeByKey: (itemKey?: string) => void
  removeAll: () => void
}

// Custom hook for interacting with localStorage
const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageReturnType<T> => {
  // Get initial value from localStorage or use initialValue if not found
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)

      return initialValue
    }
  })

  // Define a setter function to update both state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function to mimic useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Update state
      setStoredValue(valueToStore)

      // Store value in localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error storing data in localStorage:', error)
    }
  }

  // Function to remove item by key from localStorage
  const removeByKey = (itemKey?: string) => {
    try {
      if (itemKey && itemKey !== key) {
        window.localStorage.removeItem(itemKey)
      } else {
        window.localStorage.removeItem(key)
        setStoredValue(initialValue) // Reset stored value to initial value
      }
    } catch (error) {
      console.error('Error removing data from localStorage:', error)
    }
  }

  // Function to remove all items from localStorage
  const removeAll = () => {
    try {
      window.localStorage.clear()
      setStoredValue(initialValue) // Reset stored value to initial value
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  // Return both the stored value and the setter function
  return { storedValue, setValue, removeByKey, removeAll }
}

export default useLocalStorage
