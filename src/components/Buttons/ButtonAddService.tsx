import { AddService } from "../../pages/AddService"

import { useState } from "react"

type Porps = React.ComponentProps<"button"> & {
  type: string
  imagem?: string
  selected: boolean
}
export function ButtonAddService({children, imagem, selected = false, type = "button", ...rest}: Porps){
  const [openWindow, setOpenWindow] = useState<boolean>(false)

  function selectState(){
    setOpenWindow(true)
  }
  return(
    <>
      <button type={type}{...rest} onClick={selectState}>
      
        {children}

      </button>
      {openWindow && <AddService onClose={() => setOpenWindow(false)}/>}
    </>
  )
}