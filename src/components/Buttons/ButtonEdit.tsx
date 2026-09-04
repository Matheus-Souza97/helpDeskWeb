type Props = React.ComponentProps<"button"> & {
  image: string
  id: string
 
}

export function ButtonEdit({id,image, type="button", ...rest}: Props){

 

  return(
      <button 
        type={type} 
        className="flex items-center justify-center w-7 h-7 bg-gray-500 rounded-[5px] cursor-pointer"
        {...rest}
        >
        <img src={image} alt="" />
      </button>
  )
}