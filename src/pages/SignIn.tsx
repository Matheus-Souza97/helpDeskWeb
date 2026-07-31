import { Input } from "../components/Input"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"

export function SignIn(){
  return(
  <div>
    <div className=" w-100 h-87 mt-10 p-7 border rounded-[10px] border-gray-500">
      <h2 className="text-xl font-semibold text-gray-200">Acesse o portal</h2>
      <p className="text-xs text-gray-300">Entre usando seu e-mail e senha cadastrados</p>
      <form action="" className="mt-10">
        <Input name="email" required legend="E-mail" type="email" placeholder="exemplo@email.com"/>
        <Input name="password" required legend="Senha" type="password" placeholder="Digite sua senha"/>
        <div className="mt-6">
          <ButtonBasic type="submit">Entrar</ButtonBasic>
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