import { useEffect, useState } from "react"
import fecharSvg from "../assets/fechar.svg"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { Input } from "../components/Input"
import { api } from "../services/api"

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

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
  async function user(){
    const response = await api.get<Customer>(`/admin/customer/${id}`)
    setUser(response.data.customer)
    console.log("passou akiiiiii")
  }
  user()
},[id])

function supportInitials(name: string) {

  const parts = name.trim().split(" ")

  const firstLetter = parts[0]?.[0] ?? ""
  const secondLetter = parts[1]?.[0] ?? ""

  return `${firstLetter}${secondLetter}`.toUpperCase()
}
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 w-screen h-screen bg-gray-400 z-40 opacity-20" onClick={onClose}></div>

      <div className="relative w-110 h-101 right-40 bottom-30 bg-gray-600 z-50 rounded-[10px]">
        <div className="flex h-16 items-center justify-between border-b border-gray-500 px-7 py-5">
          <h1 className="text-2xl font-semibold">Cliente</h1>
          <img src={fecharSvg} alt="icone de fechar" onClick={onClose} className="cursor-pointer"/>
        </div>
        <form action="" >
          <div className="px-7 pt-7 pb-8">
            <div className="flex items-center justify-center w-12 h-12 font-semibold text-lg text-gray-600 bg-blue-dark rounded-full mb-5">{supportInitials(user ? user.name: "")}</div>
            <Input legend="nome" value={user?.name} onChange={(event) => {
              setUser(prev => {
                if(!prev) return null

                return{
                  ...prev, 
                  name: event.target.value
                }

              })
            }}/>
            <Input legend="e-mail" value={user?.email} onChange={(event) => {
              setUser(prev => {
                if(!prev) return null
                return {
                  ...prev,
                  email: event.target.value
                }
              })
            }}/>
          </div>
          <div className="mx-7">
            <ButtonBasic className=" bg-gray-200 w-full text-gray-600">Salvar</ButtonBasic>
          </div>
          
        </form>
      </div>
    </div>
  )
}