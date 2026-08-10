import { useEffect, useState } from "react"
import { Input } from "../components/Input"
import { TextArea } from "../components/TextArea"
import { Select } from "../components/Select"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { api } from "../services/api"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import { z } from "zod"

export function CustomerNewTicket(){

const ticketSchema = z.object({
  name: z
    .string()
    .min(5, "Preencha todos os campos"),

  description: z
    .string()
    .min(15, "Preencha todos os campos"),

  serviceId: z
    .string()
    .min(1, "Selecione uma categoria de serviço")
})

  interface Service {
    id: string
    name: string
    amount: string
  }
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [services, setService] = useState<Service[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()


  useEffect(() => {
    async function fetchServices(){
      try {
        const response = await api.get<Service[]>("/services")
        setService(response.data)
        
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data)
        }
      }
    }
    fetchServices()
    
  }, [])

  const selectedService = services.find(
  (service) => service.id === selectedServiceId)

async function createTicket(){

  const result = ticketSchema.safeParse({
    name,
    description,
    serviceId: selectedServiceId
  })

  if (!result.success) {
    setErrorMessage(result.error.issues[0].message)
    return
  }

  try {
    await api.post("/customer", {
      name,
      description,
      category: selectedService?.name
    })
    navigate("/customer/confirm")

  } catch (error) {
    if(error instanceof AxiosError){
      setErrorMessage(error.response?.data.message ?? "Erro ao criar chamado")
      return
    }
  }
}



  return(
    <div className="flex relative">
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Novo chamado</h1></div>

      <div className="absolute w-200 mx-20 mt-27.5 px-8 border border-gray-500 rounded-[10px]">
        <h2 className=" text-lg font-semibold pt-8">Informações</h2>
        <p className="pt-1 mb-6 text-base text-gray-300 font-light">Configure os dias e horários em que você está disponível para atender <br/> chamados</p>

        <form action="">
          <Input legend="Título" type="text" value={name} placeholder="Digite um título para o chamado" onChange={(e) => setName(e.target.value)}/>
    

          <TextArea legend="descrição" type="textarea" value={description} placeholder="Descreva o que está acontecendo" onChange={(e) => setDescription(e.target.value)}/>
      

          <Select legend="categoria de serviço" value={selectedServiceId} onChange={(e) => {setSelectedServiceId(e.target.value)}}>
           <option value="" disabled>Selecione a categoria de atendimento</option>
           {services.map((service) => (
            <option key={service.id} value={service.id}>{service.name}</option>
           ))}
          </Select>

        </form>
      </div>
      <div className="absolute w-lg right-65 mt-27.5 pb-6 px-8 border border-gray-500 rounded-[10px]">
          <div className=""> 
            <h2 className=" text-lg font-semibold pt-8">Resumo</h2>
            <p className="pt-1 mb-6 text-base text-gray-300">Valores e detalhes</p>
          </div>

          <div>
            <h3 className="text-gray-400">Categoria de serviço</h3>
            <p>{selectedService?.name}</p>
          </div>
            
          <div className="mt-4">
            <h3 className="text-gray-400">Custo inicial</h3>
            <p>R${selectedService?.amount ?? 0},00</p>
          </div>

          <div className="mt-4">
            <p className=" mb-6 text-gray-300 font-light">O chamado será automaticamente atribuído a <br/> um técnico disponível.</p>
          </div>

          {errorMessage && (
            <div className="flex justify-center">
              <p className="text-sm text-red-600 font-medium mb-3 ">
                {errorMessage}
              </p>
            </div>
          )}


          <ButtonBasic onClick={createTicket}>Criar chamado</ButtonBasic>
        </div>

        
    </div>
  )
}