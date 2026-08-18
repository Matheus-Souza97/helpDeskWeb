import { AddService } from "../../pages/AddService"

import { useState } from "react"

type Porps = React.ComponentProps<"button"> & {
  type: string
  imagem?: string
  selected: boolean
  status: string
}
export function ButtonAddService({children, imagem, selected = false, status, type = "button", ...rest}: Porps){
  const [openWindow, setOpenWindow] = useState<boolean>(false)

  function selectState(){
    setOpenWindow(true)
  }
  function selectDisabled(status:string){
    if(status === "closed"){
      return true
    } else{
      return false
    }

  }
  return(
    <>
      <button disabled={selectDisabled(status)} type={type}{...rest} onClick={selectState}>
      
        {children}

      </button>
      {openWindow && <AddService onClose={() => setOpenWindow(false)}/>}
    </>
  )
}