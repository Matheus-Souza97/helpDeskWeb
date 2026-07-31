type Props = React.ComponentProps<"input"> & {
  legend?: string
}

export function Input({legend, type = "text", ...rest}: Props){
  return(
    <fieldset className="group">
      <legend className="uppercase text-xs text-gray-300 group-focus-within:text-blue-base">{legend}</legend>
      <input className="w-full text-md border-b border-gray-500  text-gray-200 placeholder:text-gray-400 p-2 mb-4 outline-none focus:border-blue-base" {...rest}></input>
    </fieldset>
  )
}