import { useEffect, useState } from "react"
import fecharSvg from "../assets/fechar.svg"

import { Select } from "../components/Select"
import { api } from "../services/api"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { useParams } from "react-router"


type Services = {
  id: string
  name: string
  amount: string
}

type Props = {
  onClose: () => void
}

export function AddService({onClose}: Props){
  const {id} = useParams()

  const [services, setServices] = useState<Services[]>([])
  const [addService, setAddService] = useState("")
  useEffect(() => {
    async function selectOptions(){
      try {
        const response = await api.get("/services")
        setServices(response.data)
      } catch (error) {
        console.log(error)
      }  
    }
    selectOptions()
  },[])
  
  function selectValue(name:string){
    const value = services.find((item) => item.name === name)
    return value
  }

  async function updateAddService(){

    const data = {service: [addService]}

    data && await api.post(`/support/${id}`, data)
    console.log("dados enviados: ",data)
    return
  }

  return(
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-gray-400 z-40 opacity-20"></div>


      <form onSubmit={() => {updateAddService()}}>
        <div className="relative top-50 left-110 w-120 border border-gray-500 bg-gray-600 rounded-[10px] z-50">
          <div className=" flex justify-between mx-7 my-5 ">
            <h1 className="text-gray-200 text-lg font-semibold">Serviço adicional</h1>
            <img src={fecharSvg} alt="" onClick={onClose} className="cursor-pointer"/>
          </div> 
          <div className="border-b border-gray-500"></div>

          <div className="mx-7 my-5 ">
            <Select legend="Descrição" value={addService} onChange={(e) => setAddService(e.target.value)}>
              <option value="" disabled>Selecione um serviço</option>
              {services.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </Select>
          </div>

          <div className="mx-7 my-5 pb-4 ">
            <legend className="uppercase text-xs text-gray-300 mb-4">Valor</legend>
            <p className="text-gray-200 pb-4 border-b border-gray-500">{`R$${addService ? selectValue(addService)?.amount : "0"},00`}</p>
          </div>

          <div className="border-b border-gray-500 mt-4"></div>

          <div className="mx-7 my-8">
            <ButtonBasic type="submit" className="w-full bg-gray-200 text-gray-600">Salvar</ButtonBasic>
          </div>
        </div>
      </form>
    </div>
  )
}