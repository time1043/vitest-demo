type SelectColorProps = {
  textColor: string
  setTextColor: (textColor: string) => void
}

export default function SelectColor({ textColor, setTextColor }: SelectColorProps) {
  return (
    <label>
      text color
      <select onChange={(event) => setTextColor(event.target.value)} value={textColor}>
        <option value="" selected>
          White
        </option>
        <option value="text-black">Black</option>
        <option value="text-orange">Orange</option>
      </select>
    </label>
  )
}
