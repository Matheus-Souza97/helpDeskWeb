import { useEffect, useState } from "react"
import iconSumBrancoSvg from "../assets/icon_sum-branco.svg"
import { Link } from "react-router"
import { api } from "../services/api"
import desativarSvg from "../assets/desativar.svg"
import reativarSvg from "../assets/reativar.svg"
import editarSvg from "../assets/editar.svg"



export function AdminServices(){
  
  type Service = {
    amount: number
    createdAt: string
    id: string
    name: string
    status: string
    updatedAt: string
  }
  const [service, setService] = useState<Service[]>([])
  useEffect(() => {
    async function services(){
      const response = await api.get<Service[]>("/services")
      setService(response.data)
      console.log(response.data)
    }
    services()
  },[])

  async function disabledService(id:string, status:string){
    const data = {
      status: status
    }
    try {
      const confirmation = confirm("Deseja realmente desativar esse serviço?")

      if(!confirmation) return

      if(confirmation){
        await api.put(`/services/disableServices/${id}`, data)
        setService(prev => prev.map(item => item.id === id ? {...item, status: "inativo"} : item))
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function enableService(id:string, status:string){
    const data = {
      status: status
    }
    try {
      const confirmation = confirm("Deseja realmente reativar esse serviço?")

      if(!confirmation) return

      if(confirmation){
        await api.put(`/services/disableServices/${id}`, data)
        setService(prev =>(prev.map(item => item.id === id ? {...item, status:"ativo"} : {...item})))
      }
    } catch (error) {
      console.log(error)
    }
  }

  function selectStatus(id:string, status:string){
    if(status === "ativo"){
      return(
        <div className="w-80 pl-6 flex items-center justify-center gap-8">
          <div className="py-1.5 px-3 bg-back-feedback-done text-feedback-done font-semibold rounded-full">
            <p>Ativo</p>
          </div>

          <div className="flex ml-16 justify-center items-center gap-4 cursor-pointer" onClick={() => disabledService(id,"inativo")}>
            <div className="flex items-center gap-2">
              <img src={desativarSvg} alt="icone de desativar" className="w-4.5 h-4.5"/>
              <p className="font-semibold text-gray-300">Desativar</p>
            </div>
            <div className="flex items-center justify-center w-7 h-7 bg-gray-500 rounded-[5px]">
              <img src={editarSvg} alt="icone de desativar" className="w-4.5 h-4.5"/>
            </div>
          </div>

        </div>
      )
    } 
    else {
      return(
        <div className="w-80 pl-5 flex items-center justify-center gap-8">
          <div className="py-1.5 px-3 bg-back-feedback-open text-feedback-open font-semibold rounded-full">
            <p>Inativo</p>
          </div>

          <div className="flex ml-16 justify-center items-center gap-4 cursor-pointer" onClick={() => enableService(id,"ativo")}>
            <div className="flex items-center gap-2">
              <img src={reativarSvg} alt="icone de desativar" className="w-4.5 h-4.5"/>
              <p className="font-semibold text-gray-300">Reativar</p>
            </div>
            <div className="flex items-center justify-center w-7 h-7 bg-gray-500 rounded-[5px]">
              <img src={editarSvg} alt="icone de desativar" className="w-4.5 h-4.5"/>
            </div>
          </div>

        </div>
      )
    }
  }
  return(
    <div>
      <div className="flex justify-between mx-12 mt-14 mb-3.5">
        <h1 className="text-2xl font-semibold text-blue-dark">Serviços</h1>
        <Link to={"/admin/supports/new"} className="flex items-center w-24 bg-gray-200 rounded-md">
          <div className="flex items-center w-30 h-10 gap-1.5 px-2.5">
            <img src={iconSumBrancoSvg} alt="icone de Novo" />
            <p className="text-gray-600 font-semibold">Novo</p>
          </div>
        </Link>
      </div>

      <div className="mx-12 border border-gray-500 rounded-[10px]">
        <div className="flex items-center justify-between px-3 py-3.5 text-lg text-gray-400 font-semibold ">
          <h2>Título</h2>
          <h2>Valor</h2>
          <h2 className="mr-60">Status</h2>
        </div>

        {service?.map((item) => (
          <div key={item.id} className="flex items-center px-3 py-3.5 border-t border-gray-500">
            <div>
              <p className="w-160 font-semibold">{item.name}</p>
            </div>
            <div>
              <p className="w-155">{`R$${item.amount},00`}</p>
            </div>
            <div>
              <div>{selectStatus(item.id ,item.status)}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}