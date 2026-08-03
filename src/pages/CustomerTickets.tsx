import openSvg from "../assets/open.svg"
import inProgresSvg from "../assets/in-progres.svg"
import closedSvg from "../assets/closed.svg"
import viewSvg from "../assets/view.svg"

export function CustomerTickets(){

  function selectStatus(status:string){
    if(status === "open"){
      return (
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-open border-none rounded-full">
          <img src={openSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-open">Aberto</p>
        </div>
      )
    } else if(status === "in_progres"){
      return(
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-progress border-none rounded-full">
          <img src={inProgresSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-progress">Em atendimento</p>
        </div>
      )
    } else{
      return(
        <div className="inline-flex items-center px-1.5 border bg-back-feedback-done border-none rounded-full">
          <img src={closedSvg} alt="icone de status aberto"/>
          <p className="px-1.5 text-feedback-done">Encerrado</p>
        </div>
      )
    }
  }

  return(

    <div>
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Meus chamados</h1></div>

      <div className=" w-350 mt-6 mx-20 border border-gray-500 rounded-[10px]">
        <div className="flex text-lg py-3.5 px-3 gap-6 font-semibold text-gray-400">
          <div className="w-34"><h2>Atualizado em</h2></div>
          <div className="w-16 pl-3"><h2>id</h2></div>
          <div className="w-56 pl-3"><h2>Título</h2></div>
          <div className="w-52 pl-3"><h2>Serviço</h2></div>
          <div className="w-32 pl-3"><h2>Valor total</h2></div>
          <div className="w-40 pl-3"><h2>Técnico</h2></div>
          <div className="w-40 pl-3"><h2>Status</h2></div>
          <div className="w-14 pl-3"></div>
        </div>
        <ul>
          <li className="flex border-t border-gray-500 text-gray-200 text-base py-6 px-3 gap-6">
            <p className="w-34">13/04/25 20:56</p>
            <p className="w-16 pl-2 font-semibold">00003</p>
            <p className="w-56 pl-2 font-semibold">Rede lenta</p>
            <p className="w-52 pl-2">Instalação de Rede</p>
            <p className="w-32 pl-2">R$ 180,00</p>
            <p className="w-40 pl-2 text-lg">Carlos Silva</p>
            <div className="w-50 pl-2">{selectStatus("closed")}</div>
            <div className=" flex w-7 h-7 items-center justify-center bg-gray-500 border-none rounded-[5px]"><a href="/"><img src={viewSvg} alt="view" /></a></div>
          </li>
        </ul>
        
      </div>
    </div>
    
  )
}