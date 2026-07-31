import { Outlet } from "react-router";
import logoIcon from "../assets/Logo_Icon.png"
import backgroundImage from "../assets/background.png"

export function AuthLayout(){
  return(
    <div style={{backgroundImage: `url(${backgroundImage})`}} className="bg-cover bg-no-repeat w-screen h-screen overflow-hidden">
     <main className="flex justify-end">
        <div className="flex flex-col items-center w-full h-screen bg-gray-600 rounded-tl-2xl mt-3 md:w-240">
          <div className="flex w-full h-10 mt-12 gap-3 items-center justify-center">
            <img src={logoIcon} alt="Logo Help Desk" />
            <h1 className="text-2xl font-semibold text-blue-dark">Help Desk</h1>
          </div>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}