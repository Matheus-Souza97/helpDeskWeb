type Props = React.ComponentProps<"button">

export function ButtonNave({children, type = "button", ...rest}: Props){
  return(
    <button className="flex justify-center items-center w-42 h-11 gap-3 mb-1 rounded-[5px] text-sm font-semibold text-gray-400 focus:bg-blue-dark focus:text-gray-600 focus:stroke-gray-600 outline-none" {...rest}>{children}</button>
  )
}