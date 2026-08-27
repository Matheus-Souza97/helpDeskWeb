import { Outlet, useNavigate, useLocation } from "react-router"
import logo2 from "../assets/Logo2.png"
import { ButtonNave } from "../components/Buttons/ButtonNave"
import clipboard from "../assets/clipboard.svg"
import { useAuth } from "../Hooks/useAuth"
import { ButtonOptions } from "../components/Buttons/ButtonOptions"

import tecnicosSvg from "../assets/tecnicos.svg"
import clientesSvg from "../assets/clientes.svg"
import servicosSvcg from "../assets/servicos.svg"

export function AdminLayout(){

  const location = useLocation()

  const {session} = useAuth()

  const navigate = useNavigate()

  return(

    <div className="flex w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col w-60 h-full">
        <div className="flex items-center w-50 gap-3 py-6 px-5">
          <img src={logo2} alt="Logo" />
          <div>
            <h1 className="text-[20px] font-semibold text-gray-600">HelpDesk</h1>
            <p className="uppercase text-xs text-blue-light font-semibold">admin</p>
          </div>
        </div>
      <div>
        <div className=" w-screen h-screen bg-gray-100">
          <div>
            <div className="py-5 px-4">
              <div>

                <ButtonNave selected={location.pathname === "/admin"} onClick={() => {navigate("/admin")}}><img src={clipboard} alt="icone de lista"/>
                <h2>Chamados</h2></ButtonNave>
                <ButtonNave selected={location.pathname === "/admin/supports"} onClick={() => {navigate("/admin/supports")}}><img src={tecnicosSvg} alt="icone de lista"/>
                <h2>Técnicos</h2></ButtonNave>
                <ButtonNave selected={location.pathname === "/"} onClick={() => {navigate("/")}}><img src={clientesSvg} alt="icone de lista"/>
                <h2>Clientes</h2></ButtonNave>
                <ButtonNave selected={location.pathname === "/"} onClick={() => {navigate("/")}}><img src={servicosSvcg} alt="icone de lista"/>
                <h2>Serviços</h2></ButtonNave>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" w-full mt-3 rounded-l-2xl bg-gray-600">
      <Outlet/>
    </div>

    <ButtonOptions name={session?.user.name ?? ""} role={session?.user.role ?? ""} email={session?.user.email ?? ""} type={"submit"}></ButtonOptions>
    
  </div>
  )
}