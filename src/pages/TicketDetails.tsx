import { useEffect, useState } from "react"
import returnSvg from"../assets/return.svg"
import { Link, useParams } from "react-router"
import { api } from "../services/api"
import openSvg from "../assets/open.svg"
import inProgresSvg from "../assets/in-progres.svg"
import closedSvg from "../assets/closed.svg"

export function TicketDetails(){

  interface TicketResponse {
    ticketUserVerify: Ticket,
    services: []
  }

  interface Service {
    name: string
    amount: string
  }

  interface Ticket{
    id: string
    status: string
    name: string
    description: string
    category: string
    initialPrice: string
    createdAt: string
    updatedAt: string
    ticketAssignment: {
      additionalServices:[]
      support: {
        name: string
        email:string
      }
      total:string
    }
  }


  const { id } = useParams()


  const [ticket, setTicket] = useState<Ticket>()
  const [service, setService] = useState<Service[]>([])

  function supportName(){
    const suport = ticket?.ticketAssignment.support.name

    if(!suport) return ""

    const parts = suport?.split(" ")

    const firstLetter = parts?.[0][0]

    const secondLetter = parts.length > 1 ? parts[1][0] : ""

    return `${firstLetter}${secondLetter}`.toUpperCase()
  }
  
  useEffect(() => {

    if(!id) return

    async function fetchTicket(){
      try {
        const response = await api.get<TicketResponse>(`/customer/details/${id}`)

        setTicket(response.data.ticketUserVerify)
        setService(response.data.services)
        
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTicket()
  },[id])

  function selectStatus(status:string){
    if(status === "open"){
      return (
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-open border-none rounded-full">
          <img src={openSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-open">Aberto</p>
        </div>
      )
    } if(status === "in_progress"){
      return(
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-progress border-none rounded-full">
          <img src={inProgresSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-progress">Em atendimento</p>
        </div>
      )
    } else{
      return(
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-done border-none rounded-full">
          <img src={closedSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-done">Encerrado</p>
        </div>
      )
    }
  }

  return(
    <div className="relative">
      <Link to={"/customer"}>
        <div className="flex mx-20 mt-14">
          <img src={returnSvg} alt="iconde de voltar" className="mr-2"/>
          <p>Voltar</p>
        </div>
      </Link>
      
      <div className=" mx-20 mt-1"><h1 className="text-2xl font-semibold text-blue-dark">Chamado detalhado</h1></div>
      

      <div className="w-140 ml-20 mt-6 border border-gray-500 rounded-[10px]">

        <div className="flex justify-between m-6">
          <p>{ticket?.id}</p>
          <div>{ticket && selectStatus(ticket?.status)}</div>
        </div>

        <div className="text-gray-200 text-lg m-6">
          <h1>{ticket?.name}</h1>
        </div>

        <div className=" m-6">
          <h2 className="text-gray-400">Descrição</h2>
          <p className="text-gray-100 font-normal">{ticket?.description}</p>
        </div>

        <div className=" text-gray-400 m-6">
          <h2>Categoria</h2>
          <p className="text-gray-100 font-normal">{ticket?.category}</p>
        </div>

        <div className="flex justify-between m-6">
          <div>
            <h2 className="text-gray-400">Criado em</h2>
            <p>{ticket && new Date(ticket.createdAt).toLocaleString().replace(",","")}</p>
          </div>

          <div className="mr-10">
            <h2 className="text-gray-400">Atualizado em</h2>
            <p>{ticket && new Date(ticket.updatedAt).toLocaleString().replace(",","")}</p>
          </div>
        </div>
      </div>

      <div className="absolute w-110 left-170 top-20.5 border border-gray-500 rounded-[10px]">
        <div>
          <h2 className="text-gray-400 ml-6 mt-6 mb-2">Técnico responsável</h2>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-dark ml-6 text-gray-600"><h1>{supportName()}</h1></div>
          <div>
            <h1>{ticket?.ticketAssignment.support.name}</h1>
            <p>{ticket?.ticketAssignment.support.email}</p>
          </div>
        </div>

        <div className="mt-8 mx-6">
          <h2 className="text-gray-400 mb-2">Valores</h2>
          <div className="flex justify-between">
            <p>Preço base</p>
            <p>R${ticket?.initialPrice},00</p>
          </div>
        </div>

        <div className="mt-4 mx-6">
          <h2 className="text-gray-400 mb-2">Adicionais</h2>

          {service.map((addService) => (
            <div key={addService.name} className="flex justify-between">
              <p className="mb-1">{addService.name}</p>
              <p>R${addService.amount},00</p>
            </div>

          ))}
        </div>

        <div className="w-full mt-4 border-b border-gray-500"></div>

        <div className="flex justify-between text-gray-200 mx-6 mt-4 mb-6 font-semibold text-lg">
          <h1>Total</h1>
          <h1>R${ticket?.ticketAssignment.total},00</h1>
        </div>

      </div>
    </div>
  )
}