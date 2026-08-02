type Props = React.ComponentProps<"button"> & {
  selected?: boolean
}


export function ButtonNave({children, selected = false, type = "button", ...rest}: Props){


  return(
    <button className={`flex justify-center items-center w-42 h-11 gap-3 mb-1 rounded-[5px] text-sm font-semibold outline-none ${ selected ? "bg-blue-dark text-gray-600" : "text-gray-400 "}`} {...rest}>{children}</button>
  )
}