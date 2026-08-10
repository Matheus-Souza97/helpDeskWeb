import sairSvg from "../assets/sair.svg"
import perfilSvg from "../assets/perfil.svg"
import { ButtonConfig } from "../components/Buttons/ButtonConfig"
import { useState } from "react"

export function Options(){
  const [perfil, setPerfil] = useState(false)
  return(
    <div className=" relative flex flex-col w-100 h-50 bottom-50 ml-20 p-5 bg-gray-200 rounded-2xl">
      <h1 className="w-60  text-gray-400 font-semibold text-lg">Opções</h1>
      <ButtonConfig setFunction="perfil" className="text-gray-600" name="Perfil" image={perfilSvg} type="submit"/>
      <ButtonConfig setFunction="sair" className="text-feedback-danger" name="Sair" image={sairSvg} type="submit"/>
    </div>
  )
}