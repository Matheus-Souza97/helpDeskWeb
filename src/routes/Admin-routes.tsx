import { Routes, Route } from "react-router"
import { AdminLayout } from "../components/AdminLayout"
import { AdminTickets } from "../pages/AdminTickets"
import { AdminTicketDetails } from "../pages/AdminTicketDetails"
import { AdminSupports } from "../pages/AdminSupports"
import { NewSupport } from "../pages/NewSupport"
import { Confirm } from "../components/Confirm"
export function AdminRoutes(){
  return(
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminTickets/>}/>
        <Route path="/admin/ticket/:id" element={<AdminTicketDetails/>}/>
        <Route path="/admin/supports" element={<AdminSupports/>}/>
        <Route path="/admin/supports/new" element={<NewSupport/>}/>
        <Route path="/admin/confirm" element={<Confirm/>}/>

      </Route>

    </Routes>
  )
}