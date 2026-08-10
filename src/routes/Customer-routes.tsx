import { NotFound } from "../pages/NotFounf"
import { Routes, Route } from "react-router";
import { CustomerTickets } from "../pages/CustomerTickets"
import { CustomerLayout } from "../components/CustomerLayout"
import { CustomerNewTicket } from "../pages/CustomerNewTicket"
import { Confirm } from "../components/Confirm";
import { TicketDetails } from "../pages/TicketDetails";


export function CustomerRoutes(){
  return(
    <Routes>
      <Route path="/customer" element={<CustomerLayout/>}>
          <Route index element={<CustomerTickets/>}/>
          <Route path="new" element={<CustomerNewTicket/>}/>
          <Route path="confirm" element={<Confirm/>}/>
          <Route path="details/:id" element={<TicketDetails/>}/>
        </Route>
  
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}