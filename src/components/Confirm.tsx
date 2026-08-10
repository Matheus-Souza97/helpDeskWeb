import okSvg from "../assets/closed.svg"

export function Confirm(){

  return(
    <div className="flex flex-col w-150 h-150 mx-auto mt-50  justify-center items-center">
      <img src={okSvg} alt="confirmado" className="w-50 h-50"/>
      <h1 className="text-5xl text-green-700 pt-12">Ticket criado com sucesso</h1>
    </div>
  )
}