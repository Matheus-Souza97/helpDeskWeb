import { useState, useEffect } from "react"
import openSvg from "../assets/open.svg"
import inProgresSvg from "../assets/in-progres.svg"
import closedSvg from "../assets/closed.svg"
import viewSvg from "../assets/view.svg"
import { AxiosError } from "axios"
import { api } from "../services/api"
import { Link } from "react-router"


interface Ticket {
  id: string
  name: string
  status: string
  category: string
  initialPrice: string
  finalPrice: string
  support?: string
  updatedAt: string
}

export function CustomerTickets(){

  const [tickets, setTickets] = useState<Ticket[]>([])

  async function  fetchTickets(){

    try {
      const response = await api.get<Ticket[]>("/customer")

      setTickets(response.data)
    } catch (error) {
      console.log(error)

      if(error instanceof AxiosError){
        return alert(error.response?.data.message)
      }

      alert("Não foi possivel carregar a pagina")
    }
  }

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

  function supportInitials(){
    const supportName = tickets.map((ticket) => ticket.support)
    const parts = supportName[0]?.split(" ")
    const firstLetter = parts?.[0]?.[0]
    const secondLetter = parts?.[1]?.[0]

    return `${firstLetter}${secondLetter}`
    
  }

  supportInitials()

  useEffect(() => {
    fetchTickets()
  }, [])

  return(

    <div className="relative">
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Meus chamados</h1></div>

      <div className=" w-350 mt-6 mx-20 border border-gray-500 rounded-[10px]">
        <div className="flex text-lg py-3.5 px-3 gap-6 font-semibold text-gray-400">
          <div className="w-34"><h2>Atualizado em</h2></div>
          <div className="w-16 pl-3"><h2>id</h2></div>
          <div className="w-56 pl-3"><h2>Título</h2></div>
          <div className="w-52 pl-3"><h2>Serviço</h2></div>
          <div className="w-32 pl-3"><h2>Valor total</h2></div>
          <div className="w-40 pl-3"><h2>Técnico</h2></div>
          <div className="w-40 pl-15"><h2>Status</h2></div>
          <div className="w-14 pl-3"></div>
        </div>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id} className="flex border-t border-gray-500 text-gray-200 text-base py-6 px-3 gap-6">
              <p className="w-34">{ticket.updatedAt}</p>
              <p className="w-16 pl-2 font-semibold min-w-0 truncate ">{ticket.id}</p>
              <p className="w-56 pl-2 font-semibold">{ticket.name}</p>
              <p className="w-52 pl-2">{ticket.category}</p>
              <p className="w-32 pl-7">{`R$${ticket.finalPrice},00`}</p>

              <div className="relative flex w-50 text-base"><div className="absolute flex gap-2 items-center"><div className="flex justify-center items-center w-7 h-7 bg-blue-dark text-gray-600 rounded-full">{supportInitials()}</div><div>{ticket.support}</div></div></div>
              
              <div className="w-50 pl-2">{selectStatus(ticket.status)}</div>

              <Link to={`/customer/details/${ticket.id}`} className=" flex w-7 h-7 items-center justify-center bg-gray-500 border-none rounded-[5px]"><img src={viewSvg} alt="view" /></Link>
              
            </li>
          ))}
        </ul>  
      </div>

    </div>
    
  )
}