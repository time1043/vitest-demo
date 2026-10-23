import { HorseIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function App() {
  const [count, setCount] = useState(0)
  const doubleCount = count * 2

  useEffect(() => {
    if (count > 0) {
      toast.success(`updated: ${count} x 2 = ${doubleCount}`)
    }
  }, [count, doubleCount])

  return (
    <div>
      <p className="text-red-400">
        {count} x 2 = {doubleCount}
      </p>
      <button
        className="btn"
        onClick={() => {
          setCount((count) => count + 1)
          // toast.success(`previous: ${count} x 2 = ${doubleCount}`)
        }}
      >
        <HorseIcon />
        Increment
      </button>
      <Toaster />
    </div>
  )
}
