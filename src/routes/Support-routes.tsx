import { Routes, Route } from "react-router"
import { Layout } from "../components/Layout"
import { Support } from "../pages/Support"
import { SupportTicketUpdate } from "../components/SupportTicketUpdate"

export function SupportRoutes(){
  return(
    <Routes>
      <Route path="/support" element={<Layout/>}>
        <Route index element={<Support/>}/>
        <Route path="/support/:id" element={<SupportTicketUpdate/>}/>
      </Route>
    </Routes>   
  )
}