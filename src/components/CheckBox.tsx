type Props = React.ComponentProps<"input"> & {
  text: string
  value: string
}
export function Checkbox({text, value, ...rest}:Props){
  return(
    <label>
      <input type="checkbox" className="peer hidden" value={value} {...rest}/>
      <span className="border border-gray-400 rounded-full px-3 py-1.5 peer-checked:bg-blue-dark peer-checked:text-gray-600">{text}</span>
    </label>
  )
}