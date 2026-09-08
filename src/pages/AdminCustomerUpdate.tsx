import { useEffect, useState } from "react"
import fecharSvg from "../assets/fechar.svg"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { Input } from "../components/Input"
import { api } from "../services/api"
import { useNavigate } from "react-router"
import axios from "axios"


type Props = {
  id?: string
  onClose?: () => void
}
type Customer = {
  customer: User
}
type User = {
  id: string
  name: string
  email: string
}


export function AdminCustomerUpdate({onClose, id}:Props){

  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
  async function user(){
    const response = await api.get<Customer>(`/admin/customer/${id}`)
    setUser(response.data.customer)
  }
  user()
},[id])

function customerInitials(name: string) {

  const parts = name.trim().split(" ")

  const firstLetter = parts[0]?.[0] ?? ""
  const secondLetter = parts[1]?.[0] ?? ""

  return `${firstLetter}${secondLetter}`.toUpperCase()
}

async function updateCustomer(event: React.FormEvent<HTMLFormElement>){
  event.preventDefault()

  if (!user || !id) return

  try {
    const data = {
    name: user.name,
    email: user.email
  }

  await api.put(`/admin/customer/${id}`, data)
  onClose?.()
  navigate("/admin/confirm")
  
    
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message ?? "Erro ao atualizar cliente")
    }
  }
}

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 w-screen h-screen bg-gray-400 z-40 opacity-20" onClick={onClose}></div>

      <div className="relative w-110 pb-10 right-40 bottom-30 bg-gray-600 z-50 rounded-[10px]">
        <div className="flex h-16 items-center justify-between border-b border-gray-500 px-7 py-5">
          <h1 className="text-2xl font-semibold">Cliente</h1>
          <img src={fecharSvg} alt="icone de fechar" onClick={onClose} className="cursor-pointer"/>
        </div>
        <form action="" onSubmit={updateCustomer}>
          <div className="px-7 pt-7 pb-8">
            <div className="flex items-center justify-center w-12 h-12 font-semibold text-lg text-gray-600 bg-blue-dark rounded-full mb-5">{customerInitials(user ? user.name : "")}</div>
            <Input name="name" legend="nome" value={user?.name ?? ""} onChange={(event) => {
              setUser(prev => {
                if(!prev) return null

                return{
                  ...prev, 
                  name: event.target.value
                }

              })
            }}/>
            <Input name="email" legend="e-mail" value={user?.email ?? ""} onChange={(event) => {
              setUser(prev => {
                if(!prev) return null
                return {
                  ...prev,
                  email: event.target.value
                }
              })
            }}/>
            <div className="flex justify-center items-center">
              {error && ( <p className="mt-2 text-red-500">{error}</p>)}
            </div>
          </div>


          <div className="mx-7">
            <ButtonBasic type="submit" className=" bg-gray-200 w-full text-gray-600">Salvar</ButtonBasic>
          </div>
          
        </form>
      </div>
    </div>
  )
}