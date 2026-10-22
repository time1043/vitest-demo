import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const doubleCount = count * 2

  return (
    <div>
      <p className="text-red-400">
        {count} x 2 = {doubleCount}
      </p>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
