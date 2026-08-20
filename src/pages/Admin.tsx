import { Link } from "react-router"
import viewSvg from "../assets/view.svg"
export function Admin(){
  return(

    <div className="relative">
      <div className=" mx-20 mt-14"><h1 className="text-2xl font-semibold text-blue-dark">Meus chamados</h1></div>

      <div className=" w-390 mt-6 ml-20 border border-gray-500 rounded-[10px]">
        <div className="flex text-lg py-3.5 px-3 gap-6 font-semibold text-gray-400">
          <div className="w-34"><h2>Atualizado em</h2></div>
          <div className="w-25 pl-3"><h2>id</h2></div>
          <div className="w-56 pl-3"><h2>Título e Serviço</h2></div>
          <div className="w-45 pl-3"><h2>Valor total</h2></div>
          <div className="w-65 pl-3"><h2>Cliente</h2></div>
          <div className="w-65 pl-3"><h2>Técnico</h2></div>
          <div className="w-35"><h2>Status</h2></div>
          <div className="w-1 pl-3"></div>
        </div>
        <ul>
          
          <li className="flex border-t border-gray-500 text-gray-200 text-base py-6 px-3 gap-6">
            <p className="w-34">13/04/25 20:56</p>
            <p className="w-27 pl-2 font-semibold min-w-0 truncate ">00003</p>
            <div className="w-56 pl-2"><p className="font-semibold">Rede lenta</p><p className="font-light">Instalacao de rede</p></div>
            <p className="w-45 pl-3">R$100.00</p>
            <p className="w-65 pl-3">Matheus souza</p>
            <div className="relative flex w-62 text-base"><div className="absolute flex gap-2 items-center"><div className="flex justify-center items-center w-7 h-7 bg-blue-dark text-gray-600 rounded-full"></div><div>suport</div></div></div>
            
            <div className="w-37 pl-2">Aberto</div>
            <Link to={`/customer/details/32131531`} className=" flex w-7 h-7 items-center justify-center bg-gray-500 border-none rounded-[5px]"><img src={viewSvg} alt="view" /></Link>
            
          </li>

        </ul>  
      </div>

    </div>
    
  )
}