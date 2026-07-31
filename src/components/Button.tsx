type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean
}

export function Button({children, className, isLoading, type = "button", ...rest}: Props){
  return(
    <button type={type} disabled={isLoading} {...rest} className="w-full h-10 bg-gray-200 text-gray-600 rounded-[5px]">{children}</button>
  )
}