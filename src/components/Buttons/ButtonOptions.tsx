import { Options } from "../../pages/Options"
import { useState } from "react"

type Props = React.ComponentProps<"button"> & {
  type: string
  name: string
  email: string
  role: string
}



export function ButtonOptions({children, name, role, email, type = "submit", ...rest}: Props){

  const [isOpen, setIsOpen] = useState(false)

  function select(role:string){
    if(role === "customer"){
      return "Usuário Cliente"
    } else if(role === "support"){
      return "Usuário Técnico"
    } else {
      return "Usuário Administrador"
    }
  }

  function userName(name:string){
    const user = name

    if(!user){
      return ""
    }

    const parts = user?.split(" ")
    const firstLetter = parts?.[0]?.[0]
    const secondLetter = parts.length > 1 ? parts[1][0] : parts[0][1]

    return `${firstLetter}${secondLetter}`
  }

  function option(){
    setIsOpen(!isOpen)
  }

  return(

    <div className="flex absolute bottom-0 ml-4 w-49 h-20 gap-3">
      <button type={type} {...rest} className="flex gap-3" onClick={() => option()}>
        <div className="flex w-8 h-8 justify-center items-center rounded-full bg-blue-dark text-gray-600">{userName(name).toUpperCase()}</div>
        <div>
          <h1 className="text-gray-600 text-lg">{select(role)}</h1>
          <p className="text-gray-400">{email}</p> 
        </div>
      {children}
      </button>
      {isOpen && (<Options/>)}
      
    </div>
  )
}