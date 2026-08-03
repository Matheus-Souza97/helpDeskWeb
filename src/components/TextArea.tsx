type Props = React.ComponentProps<"textarea"> & {
  legend?: string
  type: string
}
export function TextArea({legend, type = "textarea", ...rest}:Props){
  return(
    <fieldset className="group">
      <legend className="uppercase text-xs text-gray-300 group-focus-within:text-blue-base">{legend}</legend>
      <textarea className=" w-full h-40 p-4 border-b border-gray-500 focus:border-blue-base outline-none" {...rest}></textarea>
    </fieldset>
  )
}