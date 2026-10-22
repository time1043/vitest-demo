import { type ReactNode } from 'react'

type CirclePropertyProps = {
  property: number
  setProperty: (size: number) => void
  children: ReactNode
}

export default function CircleProperty({ property, setProperty, children }: CirclePropertyProps) {
  return (
    <label>
      {children}
      <input
        type="number"
        value={property}
        onChange={(event) => setProperty(Number(event.target.value))}
      />
    </label>
  )
}
