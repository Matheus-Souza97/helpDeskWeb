import { Routes, Route } from "react-router"
import { AuthLayout } from "../components/AuthLayout"
import { SignIn } from "../pages/SignIn"

export function AuthRoutes(){
  return(
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
        <Route path="/" index element={<SignIn/>}/>
      </Route>

    </Routes>
  )
}