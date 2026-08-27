type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean
}

export function ButtonBasic({children, className, isLoading, type = "button", ...rest}: Props){
  return(
    <button type={type} disabled={isLoading} {...rest} className={` h-10 rounded-[5px] cursor-pointer ${className ?? " "}`}>{children}</button>
  )
}