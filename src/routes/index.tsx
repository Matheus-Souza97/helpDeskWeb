import { AuthRoutes } from "./Auth-routes";
import { BrowserRouter } from "react-router";
import { CustomerRoutes } from "./Customer-routes";
//import { Loading } from "../components/Loading";
import { useAuth } from "../Hooks/useAuth";
import { SupportRoutes } from "./Support-routes";
import { AdminRoutes } from "./Admin-routes";

export function Routes(){

  const {session} = useAuth()

  function Route(){
    switch(session?.user?.role){
      case "customer":
        return <CustomerRoutes/>

      case "admin":
        return <AdminRoutes/>

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