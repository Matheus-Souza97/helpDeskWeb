import { Link } from "react-router"
import editarSvg from "../assets/editar.svg"
import closedSvg from "../assets/closed.svg"
import openSvg from "../assets/open.svg"
import inprogressSvg from "../assets/in-progres.svg"
import { useEffect, useState } from "react"
import { api } from "../services/api"
export function AdminTickets(){

  const [ticket, setTicket] = useState<Ticket[]>([])

  type Result = {
    results: Ticket[]
  }

  type Ticket = {
    category: string
    createdAt: string
    description: string
    id: string
    name: string
    status: string
    finalPrice: string
    ticketAssignment: {
      support: {
        name: string
      }
    }
    user: {
      name: string
    }

  }

  useEffect(() => {
    if(!ticket) return
    async function allTickets(){
      const response = await api.get<Result>("admin/tickets")
      setTicket(response.data.results)
      console.log(response.data)
    }
    allTickets()
  },[])

  function status(status:string){
    if(status === "open"){
      return(
        <div className="flex items-center gap-2 py-1.5 px-3 bg-back-feedback-open text-feedback-open rounded-full font-semibold">
          <img src={openSvg} alt="" className="w-5 h-5"/>
          <p>Aberto</p>
        </div>
      )
    } else if(status === "in_progress"){
      return(
        <div className="flex items-center gap-2 py-1.5 px-3 bg-back-feedback-progress text-feedback-progress rounded-full font-semibold">
          <img src={inprogressSvg} alt="" className="w-5 h-5"/>
          <p>Em atendimento</p>
        </div>
      )
    } else{
      return(
        <div className="flex items-center gap-2 py-1.5 px-3 bg-back-feedback-done text-feedback-done rounded-full font-semibold">
          <img src={closedSvg} alt="" className="w-5 h-5"/>
          <p>Encerrado</p>
        </div>
      )
    }
  }

  function initials(name:string){
    const fullName = name
    const parts = fullName.split(" ")
    const firstLetter = parts[0][0]
    const secondLetter = parts.length > 1 ? parts[1][0] : parts[0][1]
    return `${firstLetter}${secondLetter}`
  }

  return(

    <div className="relative">
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Chamados</h1></div>

      <div className=" w-390 mt-6 ml-20 border border-gray-500 rounded-[10px]">
        <div className="flex text-lg py-3.5 px-3 gap-6 font-semibold text-gray-400">
          <div className="w-34"><h2>Atualizado em</h2></div>
          <div className="w-25 pl-3"><h2>id</h2></div>
          <div className="w-56 pl-3"><h2>Título e Serviço</h2></div>
          <div className="w-35 pl-3"><h2>Valor total</h2></div>
          <div className="w-60 pl-3"><h2>Cliente</h2></div>
          <div className="w-65 pl-3"><h2>Técnico</h2></div>
          <div className="w-35"><h2>Status</h2></div>
          <div className="w-1 pl-3"></div>
        </div>
        <ul>
          {ticket.map((item) => (
            <li key={item.id} className="flex border-t border-gray-500 text-gray-200 text-base py-6 px-3 gap-6">
              <p className="flex w-34">{new Date(item.createdAt).toLocaleString().replace(",","")}</p>
              <p className="w-27 pl-2 font-semibold min-w-0 truncate ">{item.id}</p>
              <div className="w-56 pl-2"><p className="font-semibold truncate">{item.name}</p><p className="font-light">{item.category}</p></div>
              <p className="w-30 pl-3">R${item.finalPrice},00</p>
              <div></div>
              <div className="relative flex w-60 text-base"><div className="absolute flex gap-2 items-center"><div className="flex justify-center items-center w-7 h-7 bg-blue-dark text-gray-600 rounded-full">{initials(item.user.name).toUpperCase()}</div><div>{item.user.name}</div></div></div>
              <div className="relative flex w-60 text-base"><div className="absolute flex gap-2 items-center"><div className="flex justify-center items-center w-7 h-7 bg-blue-dark text-gray-600 rounded-full">{initials(item.ticketAssignment.support.name).toUpperCase()}</div><div>{item.ticketAssignment.support.name}</div></div></div>
              
              <div className="pl-2">{status(item.status)}</div>
              <Link to={`/admin/ticket/${item.id}`} className="absolute right-15 flex w-9 h-9 items-center justify-center bg-gray-500 border-none rounded-[5px]"><img src={editarSvg} alt="view" className="w-5 h-5"/></Link>
            </li>
          ))

          }

        </ul>  
      </div>

    </div>
    
  )
}