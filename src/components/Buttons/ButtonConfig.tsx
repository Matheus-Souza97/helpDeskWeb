import { useState } from "react"
import { Profile } from "../../pages/Profile"
import { useAuth } from "../../Hooks/useAuth"

type Props = React.ComponentProps<"button"> & {
  type: string
  image?: string
  name?: string
  setFunction?:string
}

export function ButtonConfig({children, name, setFunction, image, type = "submit", ...rest}: Props){

  const [perfil, setPerfil] = useState(false)

  const {remove} = useAuth()

  function selectFunction(name:string){
    if(name === "perfil"){
      setPerfil(true)
    }

    if(name === "sair"){
      const confirmar = window.confirm("Deseja realemte sair?")
      if(confirmar){
        remove()
      }
    }
  }

  return(
    <>
      <button onClick={() => selectFunction(setFunction ?? "")} {...rest}>

        <div className="flex mt-7 gap-3 items-center">
          <img src={image} alt="icone de perfil" className="w-7 h-7 cursor-pointer" />
          <p className="text-2xl cursor-pointer">{name}</p>
        </div>
      </button>
      
      {perfil && <Profile onClose={() => setPerfil(false)}/>}

    </>
  )
}