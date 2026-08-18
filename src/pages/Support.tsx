import inprogresSvg from "../assets/in-progres.svg"
import openSvg from "../assets/open.svg"
import closedSvg from "../assets/closed.svg"
import encerrarSvg from "../assets/encerrar.svg"
import iniciarSvg from "../assets/iniciar.svg"
import editarSvg from "../assets/editar.svg"


import { useEffect, useState } from "react"
import { Link } from "react-router"
import { api } from "../services/api"
import { useAuth } from "../Hooks/useAuth"

type Ticket = {
  id: string
  name: string
  description: string
  category: string
  status: string
  initialPrice: string
  finalPrice: string
  createdAt: string
  customer: string
  additionalServices: {
    name: string
    price: number | undefined
  }[]
}

export function Support(){

  const session = useAuth()

  const [ticket, setTicket] = useState<Ticket[]>([])
  
  useEffect(() => {
    async function loadTickets(){
      const response = await api.get<{result: Ticket[]}>("/support")
      setTicket(response.data.result)
    }
    loadTickets()
  },[])

  const inProgressTicket = ticket.filter((item) => item.status === "in_progress")

  const openTicket = ticket.filter((item) => item.status === "open")

  const closedTickets = ticket.filter((item) => item.status === "closed")

  function selectImage(status:string){
    if(status === "open"){
      return iniciarSvg
    }
    if(status === "in_progress"){
      return encerrarSvg
    }
  }

  function formatData(date:string){
    return new Date(date).toLocaleString("pt-BR").replace(",", "")
  }

  function InitialsSupportName(){
    const support = session.session?.user.name ?? ""
    const parts = support.split(" ")
    const firstLetter = parts[0][0]
    const secondLetter = parts.length > 1 ? parts[1][0] : parts[0][1]
    const initials = `${firstLetter}${secondLetter}`.toUpperCase()

    return initials
  }
  
  return(
    <div>

      <div className="mx-12 mt-14">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-blue-dark">Meus chamados</h1>
        </div>
        
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-progress border-none rounded-full mb-4">
          <img src={inprogresSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-progress">Em atendimento</p>
        </div>

        <div className="flex w-full mb-6">
          {inProgressTicket.map((ticket) => (
            <div className="w-86.5 p-5 border border-gray-500 rounded-[10px]" key={ticket.id}>
              <div className="flex justify-between mb-1">
                <div className=" w-30 truncate text-gray-400 font-semibold">
                  <p>{ticket.id}</p>
                </div>
                <div onClick={() => selectImage(ticket.status)} className="flex gap-1">
                  <Link to={`/support/${ticket.id}`} className="flex justify-center items-center w-7 h-7 rounded-[5px] bg-gray-500">
                    <img src={editarSvg} alt="icone de editar" className="w-3.5 h-3.5"/>
                  </Link>
                  <div className="flex items-center h-7 p-2 gap-2 rounded-[5px] bg-gray-200">
                    <img src={selectImage(ticket.status)} alt="icone de status" className="w-3.5 h-3.5"/>
                    <p className="text-gray-500">Encerrar</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-200 mb-4">
                <h2 className="font-semibold text-lg">{ticket.name}</h2>
                <p>{ticket.category}</p>
              </div>

              <div className="flex justify-between mb-4">
                <p>{formatData(ticket.createdAt)}</p>
                <p>R${ticket.finalPrice},00</p>
              </div>

              <div className="border-b border-gray-500 mb-4"></div>

              <div className="flex justify-between">

                <div className="flex items-center gap-1.5">
                  <div className="flex w-8 h-8 px-1 justify-center items-center rounded-full bg-blue-dark text-gray-600">{InitialsSupportName()}</div>
                  <h1 className="text-gray-200 text-lg font-semibold">{session.session?.user.name}</h1>
                </div>

                <div className="flex justify-center items-center w-7 h-7 rounded-full bg-back-feedback-progress">
                  <img src={inprogresSvg} alt="icone de ticket em aberto" className="w-4 h-4"/>
                </div>

              </div>
            
            </div>
          ))}
        </div>

        <div className="inline-flex items-center px-1.5 border bg-back-feedback-open border-none rounded-full mb-4">
          <img src={openSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-open">Aberto</p>
        </div>

        <div className="flex w-full mb-6 gap-4">
          {openTicket.map((ticket) => (
            <div className="w-86.5 p-5 border border-gray-500 rounded-[10px]" key={ticket.id}>

              <div className="flex justify-between mb-1">
                <div className=" w-30 truncate text-gray-400 font-semibold">
                  <p>{ticket.id}</p>
                </div>
                <div onClick={() => selectImage(ticket.status)} className="flex gap-1">
                  <Link to={`/support/${ticket.id}`} className="flex justify-center items-center w-7 h-7 rounded-[5px] bg-gray-500">
                    <img src={editarSvg} alt="icone de editar" className="w-3.5 h-3.5"/>
                  </Link>
                  <div className="flex items-center h-7 p-2 gap-2 rounded-[5px] bg-gray-200">
                    <img src={selectImage(ticket.status)} alt="icone de status" className="w-3.5 h-3.5"/>
                    <p className="text-gray-500">Iniciar</p>
                  </div>
                </div>
              </div>

              <div className="text-gray-200 mb-4">
                <h2 className="font-semibold text-lg">{ticket.name}</h2>
                <p>{ticket.category}</p>
              </div>

              <div className="flex justify-between mb-4">
                <p>{formatData(ticket.createdAt)}</p>
                <p>R${ticket.finalPrice},00</p>
              </div>

              <div className="border-b border-gray-500 mb-4"></div>

              <div className="flex justify-between">

                <div className="flex items-center gap-1.5">
                  <div className="flex w-8 h-8 px-1 justify-center items-center rounded-full bg-blue-dark text-gray-600">{InitialsSupportName()}</div>
                  <h1 className="text-gray-200 text-lg font-semibold">{session.session?.user.name}</h1>
                </div>

                <div className="flex justify-center items-center w-7 h-7 rounded-full bg-back-feedback-open">
                  <img src={openSvg} alt="icone de ticket em aberto" className="w-4 h-4"/>
                </div>

              </div>

            </div>
          ))}
          
        </div>

        <div className="inline-flex items-center px-1.5 border bg-back-feedback-done border-none rounded-full mb-4">
          <img src={closedSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-done">Encerrado</p>
        </div>

        <div className="w-full mb-6">
          {closedTickets.map((ticket) => (
            <div key={ticket.id} className="w-86.5 p-5 border border-gray-500 rounded-[10px]">
              <div className="flex justify-between mb-1">
                <div className=" w-30 truncate text-gray-400 font-semibold">
                  <p>{ticket.id}</p>
                </div>
                <div onClick={() => selectImage(ticket.status)} className="flex gap-1">
                  <Link to={`/support/${ticket.id}`} className="flex justify-center items-center w-7 h-7 rounded-[5px] bg-gray-500">
                    <img src={editarSvg} alt="icone de editar" className="w-3.5 h-3.5"/>
                  </Link>
                </div>
              </div>

              <div className="text-gray-200 mb-4">
                <h2 className="font-semibold text-lg">{ticket.name}</h2>
                <p>{ticket.category}</p>
              </div>

              <div className="flex justify-between mb-4">
                <p>{formatData(ticket.createdAt)}</p>
                <p>R${ticket.finalPrice},00</p>
              </div>

              <div className="border-b border-gray-500 mb-4"></div>

              <div className="flex justify-between">

                <div className="flex items-center gap-1.5">
                  <div className="flex w-8 h-8 px-1 justify-center items-center rounded-full bg-blue-dark text-gray-600">{InitialsSupportName()}</div>
                  <h1 className="text-gray-200 text-lg font-semibold">{session.session?.user.name}</h1>
                </div>

                <div className="flex justify-center items-center w-7 h-7 rounded-full bg-back-feedback-done">
                  <img src={closedSvg} alt="icone de ticket em aberto" className="w-4 h-4"/>
                </div>

              </div>
              
            </div>
          ))}
          
        </div>

      </div>

    </div>
  )
}