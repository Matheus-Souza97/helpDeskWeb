import { Routes, Route } from "react-router"
import { Layout } from "../components/Layout"
import { Support } from "../pages/Support"

export function SupportRoutes(){
  return(
    <Routes>
      <Route path="/support" element={<Layout/>}>
        <Route index element={<Support/>}/>
      </Route>
    </Routes>   
  )
}