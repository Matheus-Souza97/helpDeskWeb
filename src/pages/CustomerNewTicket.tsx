import { useState } from "react"
import { Input } from "../components/Input"
import { TextArea } from "../components/TextArea"
import { Select } from "../components/Select"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"

export function CustomerNewTicket(){
  const [category, setCategory] = useState("")
  return(
    <div className="flex relative">
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Novo chamado</h1></div>

      <div className="absolute w-200 mx-20 mt-27.5 px-8 border border-gray-500 rounded-[10px]">
        <h2 className=" text-lg font-semibold pt-8">Informações</h2>
        <p className="pt-1 mb-6 text-base text-gray-300 font-light">Configure os dias e horários em que você está disponível para atender <br/> chamados</p>

        <form action="">
          <Input legend="Título" type="text" placeholder="Digite um título para o chamado"/>

          <TextArea legend="descrição" type="textarea" placeholder="Descreva o que está acontecendo"/>

          <Select legend="categoria de serviço" value={category} onChange={(e) => {setCategory(e.target.value)}}>
           <option value="" disabled>Selecione a categoria de atendimento</option>
           <option value="Rede">Rede</option>
           <option value="Backup">BackUp</option>
           <option value="Hardware">Hardware</option>
          </Select>
        </form>
      </div>
      <div className="absolute right-111 mt-27.5 pb-6 px-8 border border-gray-500 rounded-[10px]">
          <div className=""> 
            <h2 className=" text-lg font-semibold pt-8">Resumo</h2>
            <p className="pt-1 mb-6 text-base text-gray-300">Valores e detalhes</p>
          </div>

          <div>
            <h3 className="text-gray-400">Categoria de serviço</h3>
            <p>{category}</p>
          </div>
            
          <div className="mt-4">
            <h3 className="text-gray-400">Custo inicial</h3>
            <p>R$200.00</p>
          </div>

          <div className="mt-4">
            <p className=" mb-6 text-gray-300 font-light">O chamado será automaticamente atribuído a <br/> um técnico disponível</p>
          </div>
          <ButtonBasic>Criar chamado</ButtonBasic>
        </div>

        
    </div>
  )
}