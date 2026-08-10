import { useNavigate } from "react-router"
import { useActionState } from "react"
import { Input } from "../components/Input"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useAuth } from "../Hooks/useAuth"
import { api } from "../services/api"

const signInSchema = z.object({
  email: z.string().email("E-mail ou senha inválido"),
  password: z.string().min(6, "E-mail ou senha inválido")
})

export function SignIn(){

  const [state, formAction, isLoading] = useActionState(signIn, null)

  const auth = useAuth()
  const navigate = useNavigate()

  async function signIn(prevState: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password")
      })
      const response = await api.post("session", data)

      auth.save(response.data)

      if (response.data.user.role === "support") {
        navigate("/support")
      }

      if (response.data.user.role === "customer") {
        navigate("/customer")
      }

      if (response.data.user.role === "admin") {
        navigate("/admin")
      } 


    } catch (error) {
      console.log(error)

      if(error instanceof ZodError){
        return {message: error.issues[0].message}
      }
      if(error instanceof AxiosError){
        return {message: error.response?.data.message}
      }
      return{message:"Não foi possivel fazer o login"}

      
    }
  }

  return(
  <div>
    <div className=" w-100 h-87 mt-10 p-7 border rounded-[10px] border-gray-500">
      <h2 className="text-xl font-semibold text-gray-200">Acesse o portal</h2>
      <p className="text-xs text-gray-300">Entre usando seu e-mail e senha cadastrados</p>

      <form action={formAction} className="mt-10">
        <Input name="email" required legend="E-mail" type="email" placeholder="exemplo@email.com"/>
        <Input name="password" required legend="Senha" type="password" placeholder="Digite sua senha"/>

        <p className="text-sm text-red-600 text-center font-medium">
          {state?.message}
        </p>

        <div className="mt-3">
          <ButtonBasic type="submit" isLoading={isLoading}>Entrar</ButtonBasic>
        </div>
      </form>

    </div>

    <div className=" w-100 h-40.25 mt-3 p-7 border rounded-[10px] border-gray-500">
      <h3 className="text-md font-semibold text-gray-200">Ainda não tem uma conta?</h3>
      <p className="text-xs text-gray-300 mb-6">Cadastre agora mesmo</p>

      <a href="/signup" className=" flex w-86 h-10 items-center justify-center bg-gray-500 text-sm font-semibold text-gray-200 rounded-[5px]">Criar conta</a>
      
    </div>

  </div>
  )
}