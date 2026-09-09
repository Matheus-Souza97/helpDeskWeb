import fechardSvg from "../assets/fechar.svg"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { Input } from "../components/Input"

type Porps = {
  onClose?: () => void
}

export function NewService({onClose}: Porps){

  return(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-20"></div>
      <div className="absolute left-185 bottom-110 w-110 bg-gray-600 border border-gray-500 rounded-[5px] z-30">
        <div className="flex items-center justify-between py-5 px-7  border-b border-gray-500">
          <h1 className="font-semibold text-lg">Cadastro de serviço</h1>
          <img src={fechardSvg} alt="icone de fechar" className="w-3 h-3 cursor-pointer" onClick={() => onClose?.()}/>
        </div>

        <form action="" className="p-7">
          <Input legend="Título" placeholder="Nome do serviço"/>
          <Input legend="valor" placeholder="R$ 0,00"/>
          <ButtonBasic className="w-full bg-gray-200 text-gray-600">Salvar</ButtonBasic>
        </form>
      </div>
    </div>
  )
}