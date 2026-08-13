import returnSvg from "../assets/return.svg"
import inprogressSvg from "../assets/in-progres.svg"
import closedSvg from "../assets/closed.svg"
import openSvg from "../assets/open.svg"
import iconSum from "../assets/icon_sum.svg"
import lixeiraSvg from "../assets/lixeira.svg"

import { Link, useParams } from "react-router"
import { useState, useEffect } from "react"
import { api } from "../services/api"
import { useAuth } from "../Hooks/useAuth"
import { ButtonAddService } from "./Buttons/ButtonAddService"


type Ticket = {
  id: string
  status: string
  name: string
  description: string
  category: string
  initialPrice: string
  finalPrice: string
  createdAt: string
  updatedAt: string
  totalAdditionals: string
  services: {
    id: string
    name: string
    amount: string
  }[]
  user: {
    name: string
  }
  ticketAssignment: {
    total: string
    additionalServices: {
      name: string
      price: string
    }[]
  }
}

export function SupportTicketUpdate(){
  const session = useAuth()
  const { id } = useParams()
  const [ticket, setTicket] = useState<Ticket>()
  

  useEffect(() => {

    if(!id) return
    console.log(id)

    async function ticket(){
      try {
        const response = await api.get(`/support/${id}`)
        setTicket(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    ticket()
  },[id])

  function selectStatus(status:string){

    if(status === "in_progress"){
      return(
        <div className="flex bg-back-feedback-progress rounded-full gap-1.5 py-1.5 px-2">
          <img src={inprogressSvg} alt="iconde de status em aberto" />
          <p className="text-feedback-progress">Em atendimento</p>
        </div>
      )
    }

    if(status === "open"){
      return(
        <div className="flex bg-back-feedback-open rounded-full gap-1.5 py-1.5 px-2">
          <img src={openSvg} alt="iconde de status em aberto" />
          <p className="text-feedback-open">Aberto</p>
        </div>
      )
    }

    if(status === "closed"){
      return(
        <div className="flex bg-back-feedback-done rounded-full gap-1.5 py-1.5 px-2">
          <img src={closedSvg} alt="iconde de status em aberto" />
          <p className="text-feedback-done">Encerrado</p>
        </div>
      )
    }
  }

  function userInitialsName(name:string){
    const userName = ticket?.user.name ?? ""
    const parts = userName.split(" ")
    const firstLetterName = parts[0][0]
    const secondLetterName = parts.length > 1 ? parts[1][0] : parts[0][1]
    const userInitials = `${firstLetterName}${secondLetterName}`.toUpperCase()
    return userInitials
  }

  function supportInitialsName(){
    const supportName = session.session?.user.name ?? ""
    const parts = supportName.split(" ")
    const firstLetterName = parts[0][0]
    const secondLetterName = parts.length > 1 ? parts[1][0] : parts[0][1]
    const supportInitials = `${firstLetterName}${secondLetterName}`.toUpperCase()
    return supportInitials
  }

  return(
    <div className="relative">
       <Link to={"/support"}>
        <div className="flex mx-20 mt-14">
          <img src={returnSvg} alt="iconde de voltar" className="mr-2"/>
          <p>Voltar</p>
        </div>
      </Link>

      <div className=" mx-20 mt-1"><h1 className="text-2xl font-semibold text-blue-dark">Chamado detalhado</h1></div>
      <div>

        <div className="w-140 ml-20 mt-6 border border-gray-500 rounded-[10px]">
          <div className="flex justify-between m-6">
              <p className="w-30 truncate">{ticket?.id}</p>
              <div>{selectStatus(ticket?.status ?? "")}</div>
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
                <p>{ticket && new Date(ticket?.createdAt).toLocaleString().replace(",", "")}</p>
              </div>

              <div className="mr-10">
                <h2 className="text-gray-400">Atualizado em</h2>
                <p>{ticket && new Date(ticket?.updatedAt).toLocaleString().replace(",", "")}</p>
              </div>
            </div>

            <div className=" text-gray-400 m-6">
              <h2>Cliente</h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-dark text-gray-600">{ticket && userInitialsName(ticket?.user.name)}</p>
                <p className="text-gray-100 font-normal">{ticket?.user.name}</p>
              </div>
            </div>

        </div>
        <div className="w-140 ml-20 mt-6 border border-gray-500 rounded-[10px]">
          <div className="flex justify-between text-gray-400 m-6">
            <h2>Serviços adicionais</h2>
            <div className="flex items-center justify-center w-7 h-7 rounded-[5px] bg-gray-200">
              <ButtonAddService selected={false} type="button" className="flex justify-center"><img src={iconSum} alt="" /></ButtonAddService>
            </div>
          </div>
          <div>
            {ticket?.services.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-1.5 mx-6 mb-4">
                <p>{item.name}</p>
                <div className="flex items-center gap-6">
                  <p>R${item.amount},00</p>
                  <div className="flex justify-center items-center w-7 h-7 rounded-[5px] bg-gray-500">
                    <img src={lixeiraSvg} alt="icone deletar" className="w-3.5 h-3.5"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute w-110 left-170 top-20.5 border border-gray-500 rounded-[10px]">
        <div>
          <h2 className="text-gray-400 ml-6 mt-6 mb-2">Técnico responsável</h2>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-dark ml-6 text-gray-600"><h1>{supportInitialsName()}</h1></div>
          <div>
            <h1>{session.session?.user.name}</h1>
            <p>{session.session?.user.email}</p>
          </div>
        </div>

        <div className="mt-8 mx-6">
          <h2 className="text-gray-400 mb-2">Valores</h2>
          <div className="flex justify-between">
            <p>Preço base</p>
            <p>R${ticket?.initialPrice},00</p>
          </div>
        </div>

        <div className="flex justify-between mt-4 mx-6">
          <h2 className="text-gray-200 mb-2">Adicionais</h2>
          <p>R${ticket?.totalAdditionals},00</p>
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