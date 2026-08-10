import { useState, useEffect } from "react";
import { createContext, type ReactNode } from "react";
import { api } from "../services/api";

type AuthContext = {
  session: null | UserAPIResponse
  save: (data: UserAPIResponse) => void
  remove: () => void
}

const LOCAL_STORAGE_KEY = "@helpDesk"

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({children}:{children:ReactNode}){
  const [session, setSession] = useState<null | UserAPIResponse>(null)

  useEffect(() => {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)
  
    if(user && token) {
      const data = {
        user: JSON.parse(user),
        token
      }
  
      setSession(data)
  
      api.defaults.headers["Authorization"] = `Bearer ${data.token}`
    }
    
  }, [])


  function save(data:UserAPIResponse){

    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)
    api.defaults.headers["Authorization"] = `Bearer ${data.token}`

    setSession(data)
    
  }

  function remove() {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

    window.location.assign("/")
  }
  return(
    <AuthContext.Provider value={{session,save,remove}}>
      {children}
    </AuthContext.Provider>
  )
}