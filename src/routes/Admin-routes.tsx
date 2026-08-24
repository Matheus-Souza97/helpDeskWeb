import { Routes, Route } from "react-router"
import { AdminLayout } from "../components/AdminLayout"
import { AdminTickets } from "../pages/AdminTickets"
export function AdminRoutes(){
  return(
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminTickets/>}/>

      </Route>

    </Routes>
  )
}