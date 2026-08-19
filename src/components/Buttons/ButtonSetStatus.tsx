type Props = React.ComponentProps<"button"> & {
  type: string
  status?:string
  image?: string
  disabled?: boolean
}

export function ButtonSetStatus({children, disabled, type = "button",className, image, status, ...rest}:Props){
  return(
    <button disabled={disabled} type={type} className={`flex items-center px-4 gap-2 h-10 rounded-[5px] text-gray-200 ${className}
    ${disabled ? "bg-gray-500 " : "bg-gray-200 text-gray-500 cursor-pointer"}`}{...rest}>

      <div className={`flex items-center px-4 gap-2 rounded-[5px]`}>
        <img src={image} alt="" className="w-4.5 h-4.5"/>
        {children}
      </div>

    </button>
  )
}