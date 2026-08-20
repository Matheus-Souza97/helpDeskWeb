import { Routes, Route } from "react-router"
import { AdminLayout } from "../components/AdminLayout"
import { Admin } from "../pages/Admin"
export function AdminRoutes(){
  return(
    <Routes>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Admin/>}/>

      </Route>

    </Routes>
  )
}