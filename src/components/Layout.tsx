import { Outlet, useNavigate, useLocation } from "react-router"
import logo2 from "../assets/Logo2.png"
import { ButtonNave } from "../components/Buttons/ButtonNave"
import clipboard from "../assets/clipboard.svg"
import { useAuth } from "../Hooks/useAuth"
import { ButtonOptions } from "../components/Buttons/ButtonOptions"

export function Layout(){

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
            <p className="uppercase text-xs text-blue-light font-semibold">cliente</p>
          </div>
        </div>
      <div>
        <div className=" w-screen h-screen bg-gray-100">
          <div>
            <div className="py-5 px-4">
              <div>

                <ButtonNave selected={location.pathname === "/support"} onClick={() => {navigate("/customer")}}><img src={clipboard} alt="icone de lista"/>
                <h2>Meus chamados</h2></ButtonNave>

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