import lixeiraSvg from "../assets/lixeira.svg"
import editarSvg from "../assets/editar.svg"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import { ButtonEdit } from "../components/Buttons/ButtonEdit"
import { AdminCustomerUpdate } from "./AdminCustomerUpdate"

export function AdminCustomers(){

  const [customerSelected, setCustomerSelected] = useState<string | null>(null)

  type Customer = {
    id: string
    name: string
    email:string
  }

  const [customers, setCustomers] = useState<Customer[]>([])
  useEffect(() => {
    async function allCustomers(){
      const response = await api.get<Customer[]>("/admin/customers")
      setCustomers(response.data)
      console.log(response.data)
    }
    allCustomers()
  },[])

  async function deletCustomer(id:string){
    const confirmed = confirm("Deseja realmente excluir esse usuario?")

    if(!confirmed) return 

    if(confirmed){
      await api.delete(`/admin/customer/${id}`)

      setCustomers(prev => prev.filter(customer =>customer.id !== id))
      
    }
  }
  
  return(
    <div>
      <div className="flex justify-between mx-12 mt-14 mb-3.5">
        <h1 className="text-2xl font-semibold text-blue-dark">Clientes</h1>
      </div>

      <div className="mx-12 border border-gray-500 rounded-[10px]">
        <div className="flex items-center justify-between px-3 py-3.5 text-lg text-gray-400 font-semibold ">
          <h2>Nome</h2>
          <h2>Email</h2>
          <h2></h2>
        </div>

        {customers.map((customer) =>(
          <div key={customer.id} className="flex items-center px-3 border-t border-gray-500 py-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 p-1.5 rounded-full bg-blue-dark">
                <p className="font-semibold text-gray-600">MS</p>
              </div>
              <p className="w-183 font-semibold ">{customer.name}</p>
            </div>
            <p className="w-183">{customer.email}</p>
            <div className="flex gap-2">
              <button className="flex items-center justify-center w-7 h-7 bg-gray-500 rounded-[5px] cursor-pointer" onClick={() => deletCustomer(customer.id)}>
                <img src={lixeiraSvg} alt="lixo" className="w-4 h-4"/>
              </button>
              <ButtonEdit id={customer.id} image={editarSvg} onClick={() => setCustomerSelected(customer.id)}></ButtonEdit>
              {customerSelected && (<AdminCustomerUpdate id={customer.id} onClose={() => setCustomerSelected(null)}/>)}
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}