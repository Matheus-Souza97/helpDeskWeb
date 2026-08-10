import { AuthRoutes } from "./Auth-routes";
import { BrowserRouter } from "react-router";
import { CustomerRoutes } from "./Customer-routes";
//import { Loading } from "../components/Loading";
import { useAuth } from "../Hooks/useAuth";
import { SupportRoutes } from "./Support-routes";

export function Routes(){

  const {session} = useAuth()

  console.log("SESSION NO ROUTES:", session)

  function Route(){
    switch(session?.user?.role){
      case "customer":
        return <CustomerRoutes/>

      case "admin":
        return

      case "support":
        return <SupportRoutes/>

      default:
        return <AuthRoutes/>
    }

    // if(isLoading){
    //   return <Loading/>
    // }
  }
  return(
    <BrowserRouter>
      <Route/>
    </BrowserRouter>
    
  )
}