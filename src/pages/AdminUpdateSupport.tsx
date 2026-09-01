import returnSvg from "../assets/return.svg"
import { Link, useParams } from "react-router"
import { Input } from "../components/Input"
import { Checkbox } from "../components/CheckBox"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router"

export function AdminUpdateSupport(){

  const navigate = useNavigate()

  type Show = {
    support: Support
  }
  type Support = {
    id: string,
    name: string,
    email: string,
    supportHours: string[]
  }
  const { id } = useParams()

  const [support, setSupport] = useState<Show | null >(null)

  useEffect(() => {
    async function showSupport(){
      const response = await api.get<Show>(`/admin/support/${id}`)
      setSupport(response.data)

    }
    showSupport()
  },[id])

  async function reload(){
      const response = await api.get<Show>(`/admin/support/${id}`)
      setSupport(response.data)

    }

  async function updateSupport(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(!event) return

    const data = {
      name: support?.support.name,
      email: support?.support.email,
      supportHours: support?.support.supportHours
    }

    const confirmed = confirm("Deseja salvar as alterações?")

    if(!confirmed) return
    
    if(confirmed){
      await api.put(`/admin/support/${id}`, data)
      navigate("/admin/confirm")
    }
  }

  function handleSupportHours(hour:string){
    setSupport(prev => {
      if (!prev) return null

      const hours = prev.support.supportHours

      const hasHour = hours.includes(hour)

      return {
        ...prev,
        support: {
          ...prev.support,
          supportHours: hasHour ? hours.filter(item => item !== hour) : [...hours, hour]
        }
      }
    })
  }
  return(
    <div className="flex flex-col">
      <div className="ml-40.75 mt-13">
        <Link to={"/admin/supports"} className="flex gap-2">
          <img src={returnSvg} alt="icone de voltar" />
          <p className="text-gray-300">Voltar</p>
        </Link>
      </div>

      <form onSubmit={updateSupport}>
        <div className="flex justify-between">
          <h1 className="ml-40.75 text-2xl font-semibold text-blue-dark mt-1">Perfil de técnico</h1>
          <div className="flex mr-153 gap-2">
            <ButtonBasic className="w-30 bg-gray-500 text-gray-200 font-semibold" onClick={reload}>Cancelar</ButtonBasic>
            <ButtonBasic type="submit" className="w-30 bg-gray-200 text-gray-600 font-semibold">Salvar</ButtonBasic>
          </div>
        </div>

        <div className="flex">
          <div className="w-90 ml-40.75 border border-gray-500 mt-6 p-6 rounded-[10px]">
            <div>
              <h1 className="text-lg font-medium">Dados pessoais</h1>
              <p className="text-base font-light">Defina as informações do perfil de técnico</p>
            </div>

            <div className="mt-6">
              <Input name="name" required legend="Nome" type="text" placeholder="Nome completo" value={support?.support.name ?? ""} onChange={(event) => {
                setSupport(prev => {
                  if (!prev) return null

                  return{
                    ...prev,
                    support: {
                      ...prev.support,
                      name: event.target.value
                    }
                  }
                })
              }}/>
              <Input name="email" required legend="E-mail" type="email" placeholder="exemplo@email.com" value={support?.support.email ?? ""} onChange={(event) => {
                setSupport(prev => {
                  if(!prev) return null

                  return{
                    ...prev,
                    support: {
                      ...prev.support,
                      email: event.target.value
                    }
                  }
                })
              }}/>
              
            </div>
          </div>

          <div className="w-130 ml-6 border border-gray-500 mt-6 p-6 rounded-[10px]">
            <div className="mb-6">
              <h1 className="text-lg font-medium">Horários de atendimento</h1>
              <p className="text-base font-light">Selecione os horários de disponibilidade do técnico para atendimento</p>
            </div>

            <div className="mb-5">
              <h2 className="uppercase mb-2">manhã</h2>
              <div className="flex gap-2">
                <Checkbox name="supportHours" text="07:00" value="07:00" checked={support?.support.supportHours.includes("07:00") ?? false} onChange={() => handleSupportHours("07:00")}/>
                <Checkbox name="supportHours" text="08:00" value="08:00" checked={support?.support.supportHours.includes("08:00") ?? false} onChange={() => handleSupportHours("08:00")}/>
                <Checkbox name="supportHours" text="09:00" value="09:00" checked={support?.support.supportHours.includes("09:00") ?? false} onChange={() => handleSupportHours("09:00")}/>
                <Checkbox name="supportHours" text="10:00" value="10:00" checked={support?.support.supportHours.includes("10:00") ?? false} onChange={() => handleSupportHours("10:00")}/>
                <Checkbox name="supportHours" text="11:00" value="11:00" checked={support?.support.supportHours.includes("11:00") ?? false} onChange={() => handleSupportHours("11:00")}/>
                <Checkbox name="supportHours" text="12:00" value="12:00" checked={support?.support.supportHours.includes("12:00") ?? false} onChange={() => handleSupportHours("12:00")}/>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="uppercase mb-2">tarde</h2>
              <div className="flex gap-2">
                <Checkbox name="supportHours" text="13:00" value="13:00" checked={support?.support.supportHours.includes("13:00") ?? false} onChange={() => handleSupportHours("13:00")}/>
                <Checkbox name="supportHours" text="14:00" value="14:00" checked={support?.support.supportHours.includes("14:00") ?? false} onChange={() => handleSupportHours("14:00")}/>
                <Checkbox name="supportHours" text="15:00" value="15:00" checked={support?.support.supportHours.includes("15:00") ?? false} onChange={() => handleSupportHours("15:00")}/>
                <Checkbox name="supportHours" text="16:00" value="16:00" checked={support?.support.supportHours.includes("16:00") ?? false} onChange={() => handleSupportHours("16:00")}/>
                <Checkbox name="supportHours" text="17:00" value="17:00" checked={support?.support.supportHours.includes("17:00") ?? false} onChange={() => handleSupportHours("17:00")}/>
                <Checkbox name="supportHours" text="18:00" value="18:00" checked={support?.support.supportHours.includes("18:00") ?? false} onChange={() => handleSupportHours("18:00")}/>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="uppercase mb-2">noite</h2>
              <div className="flex gap-2">
                <Checkbox name="supportHours" text="19:00" value="19:00" checked={support?.support.supportHours.includes("19:00") ?? false} onChange={() => handleSupportHours("19:00")}/>
                <Checkbox name="supportHours" text="20:00" value="20:00" checked={support?.support.supportHours.includes("20:00") ?? false} onChange={() => handleSupportHours("20:00")}/>
                <Checkbox name="supportHours" text="21:00" value="21:00" checked={support?.support.supportHours.includes("21:00") ?? false} onChange={() => handleSupportHours("21:00")}/>
                <Checkbox name="supportHours" text="22:00" value="22:00" checked={support?.support.supportHours.includes("22:00") ?? false} onChange={() => handleSupportHours("22:00")}/>
                <Checkbox name="supportHours" text="23:00" value="23:00" checked={support?.support.supportHours.includes("23:00") ?? false} onChange={() => handleSupportHours("23:00")}/>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}