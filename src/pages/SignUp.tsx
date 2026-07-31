import { Input } from "../components/Input"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"

export function SignUp(){
  return(
    <div>
        <div className=" w-100 h-110 mt-10 p-7 border rounded-[10px] border-gray-500">
          <h2 className="text-xl font-semibold text-gray-200">Crie sua conta</h2>
          <p className="text-xs text-gray-300">Informe seu nome, e-mail e senha</p>
          <form action="" className="mt-10">
            <Input name="name" required legend="Nome" type="text" placeholder="Digite seu nome completo"/>
            <Input name="email" required legend="E-mail" type="email" placeholder="exemplo@email.com"/>
            <Input name="password" required legend="Senha" type="password" placeholder="Digite sua senha"/>
            <div className="mt-6">
              <ButtonBasic type="submit">Cadastrar</ButtonBasic>
            </div>
          </form>
        </div>
    
        <div className=" w-100 h-40.25 mt-3 p-7 border rounded-[10px] border-gray-500">
          <h3 className="text-md font-semibold text-gray-200">Já tem uma conta?</h3>
          <p className="text-xs text-gray-300 mb-6">Entre agora mesmo</p>
    
          <a href="/" className=" flex w-86 h-10 items-center justify-center bg-gray-500 text-sm font-semibold text-gray-200 rounded-[5px]">Acessar conta</a>
          
        </div>
    
      </div>
  )
}