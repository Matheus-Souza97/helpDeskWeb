import returnSvg from "../assets/return.svg"
import { Input } from "../components/Input"
import { Checkbox } from "../components/CheckBox"
import { Link } from "react-router"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { api } from "../services/api"
import { useNavigate } from "react-router"


export function NewSupport(){
  const navigate = useNavigate()

  function cancelForm(event: React.MouseEvent<HTMLButtonElement>){
    const form = event.currentTarget.form

    form?.reset()
  }

  async function newSupport(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        supportHours: formData.getAll("supportHours")
      }
      await api.post("/admin", data)
      navigate("/admin/confirm")

      console.log("enviado")
    } catch (error) {
      console.log(error)
      
    }
  }
  return(
    <div className="flex flex-col">
      <div className="ml-40.75 mt-13">
        <Link to={"/admin/supports"} className="flex gap-2">
          <img src={returnSvg} alt="icone de voltar" />
          <p className="text-gray-300">Voltar</p>
        </Link>
      </div>

      <form onSubmit={newSupport}>
        <div className="flex justify-between">
          <h1 className="ml-40.75 text-2xl font-semibold text-blue-dark mt-1">Perfil de técnico</h1>
          <div className="flex mr-153 gap-2">
            <ButtonBasic onClick={cancelForm} className="w-30 bg-gray-500 text-gray-200 font-semibold">Cancelar</ButtonBasic>
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
              <Input name="name" required legend="Nome" type="text" placeholder="Nome completo"/>
              <Input name="email" required legend="E-mail" type="email" placeholder="exemplo@email.com"/>
              <Input name="password" required legend="Senha" type="password" placeholder="Defina a senha de acesso"/>
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
                <Checkbox name="supportHours" text="07:00" value="07:00"/>
                <Checkbox name="supportHours" text="08:00" value="08:00"/>
                <Checkbox name="supportHours" text="09:00" value="09:00"/>
                <Checkbox name="supportHours" text="10:00" value="10:00"/>
                <Checkbox name="supportHours" text="11:00" value="11:00"/>
                <Checkbox name="supportHours" text="12:00" value="12:00"/>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="uppercase mb-2">tarde</h2>
              <div className="flex gap-2">
                <Checkbox name="supportHours" text="13:00" value="13:00"/>
                <Checkbox name="supportHours" text="14:00" value="14:00"/>
                <Checkbox name="supportHours" text="15:00" value="15:00"/>
                <Checkbox name="supportHours" text="16:00" value="16:00"/>
                <Checkbox name="supportHours" text="17:00" value="17:00"/>
                <Checkbox name="supportHours" text="18:00" value="18:00"/>
              </div>
            </div>

            <div className="mb-5">
              <h2 className="uppercase mb-2">noite</h2>
              <div className="flex gap-2">
                <Checkbox name="supportHours" text="19:00" value="19:00"/>
                <Checkbox name="supportHours" text="20:00" value="20:00"/>
                <Checkbox name="supportHours" text="21:00" value="21:00"/>
                <Checkbox name="supportHours" text="22:00" value="22:00"/>
                <Checkbox name="supportHours" text="23:00" value="23:00"/>
              </div>
            </div>
          </div>
        </div>
      </form>


    </div>
  )
}