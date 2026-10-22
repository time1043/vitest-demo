type TogglePurpleProps = {
  isPurple: boolean
  setIsPurple: (isPurple: boolean) => void
}

export default function TogglePurple({ isPurple, setIsPurple }: TogglePurpleProps) {
  return (
    <label>
      Purple
      <input type="checkbox" checked={isPurple} onChange={() => setIsPurple(!isPurple)} />
    </label>
  )
}
