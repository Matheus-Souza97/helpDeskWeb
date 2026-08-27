import iconSunBrancoSvg from "../assets/icon_sum-branco.svg"
import editarSvg from "../assets/editar.svg"

import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Link } from "react-router"

type Support = {
  id: string
  name: string
  email: string
  supportHours: string[]
  remainingHours: number
}

export function AdminSupports(){
  const [support, setSupport] = useState<Support[]>([])

  useEffect(() => {
    async function listAllSupports(){
      const response = await api.get<Support[]>("/admin/supports")
      setSupport(response.data)
      console.log(response.data)
    }
    listAllSupports()
    
  },[])
  function initialLetters(name:string){
    const supportName = name
    const parts = supportName.split(" ")
    const firstLetter = parts[0][0]
    const seccondLetter = parts ? parts[1][0] : parts[0][1]
    return `${firstLetter}${seccondLetter}`

  }
  return(
    <div>
      <div className="flex justify-between mx-12 mt-14 mb-3.5">
        <h1 className="text-2xl font-semibold text-blue-dark">Técnicos</h1>
        <Link to={"/admin/supports/new"} className="flex items-center w-24 bg-gray-200 rounded-md">
          <div className="flex items-center w-30 h-10 gap-1.5 px-2.5">
            <img src={iconSunBrancoSvg} alt="icone de Novo" />
            <p className="text-gray-600 font-semibold">Novo</p>
          </div>
        </Link>
      </div>

      <div className="mx-12 border border-gray-500 rounded-[10px]">
        <div className="flex items-center justify-between px-3 py-3.5 text-lg text-gray-400 font-semibold ">
          <h2>Nome</h2>
          <h2>E-mail</h2>
          <h2>Disponibilidade</h2>
          <div className="w-14"></div>
        </div>

        {support.map((item) => (
          <div key={item.id} className="flex items-center px-3 py-3.5 border-t border-gray-500">
            <div className="flex items-center gap-3">
              <p className="flex items-center justify-center w-7 h-7 p-2 text-gray-600 rounded-full bg-blue-dark">{initialLetters(item.name)}</p>
              <p className="w-109 font-semibold">{item.name}</p>
            </div>
            <p className="w-118 ">{item.email}</p>

            <div className="flex gap-1">
              {item.supportHours.map((hour) => (
                <p className="border border-gray-500 p-1.5 rounded-full text-gray-400 font-semibold">{hour}</p>
              ))}
            </div>

            <p className="border mr-73 border-gray-500 p-1.5 rounded-full text-gray-400 font-semibold ml-3">{`+${item.remainingHours}`}</p>

            <div className="absolute right-20 flex items-center justify-center w-9 h-9 bg-gray-500 rounded-[10px]">
              <img src={editarSvg} alt="icone de editar" className="w-5 h-5"/>
            </div>

          </div>

        ))}


      </div>

    </div>
  )
}