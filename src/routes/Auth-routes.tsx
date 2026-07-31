import { Routes, Route } from "react-router"
import { AuthLayout } from "../components/AuthLayout"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"
import { NotFound } from "../pages/NotFounf"
import { CustomerLayout } from "../components/CustomerLayout"
import { CustomerTickets } from "../pages/CustomerTickets"

export function AuthRoutes(){
  return(
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
        <Route index element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Route>

      <Route path="/customer" element={<CustomerLayout/>}>
        <Route index element={<CustomerTickets/>}></Route>
      </Route>

      <Route path="*" element={<NotFound/>}/>

    </Routes>
  )
}