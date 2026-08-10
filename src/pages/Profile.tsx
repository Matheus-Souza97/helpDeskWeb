import uploadSvg from "../assets/upload.svg"
import fecharSvg from "../assets/fechar.svg"
import lixeiraSvg from "../assets/lixeira.svg"

import { api } from "../services/api"
import { z } from "zod"
import { AxiosError } from "axios"

import { useAuth } from "../Hooks/useAuth"
import { Input } from "../components/Input"
import { ButtonBasic } from "../components/Buttons/ButtonBasic"
import { useState } from "react"

type Props = {
  onClose: () => void
}



export function Profile({onClose}:Props){
  const { session, save } = useAuth()

  const [name, setName] = useState(session?.user.name ?? "")
  const [email, setEmail] = useState(session?.user.email ?? "")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [sucess, setSucess] = useState("")

  const [file, setFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState("")

  const updateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().transform(value => value.trim() === "" ? undefined : value).optional()
    .refine(value => value === undefined || value.length >= 6, {message: "A senha deve ter no minimo 6 caracteres"})
  })

  

  async function update(){
    const result = updateSchema.safeParse({
      name,
      email,
      password
    })

    if(!result.success){
      setErrorMessage(result.error.issues[0].message)
      return
    }

    try {
      const response = await api.put("/users", result.data)
      setSucess("Dados salvos com sucesso")
      
      save({
        token: session!.token,
        user: response.data
      })
    } catch (error) {
      if(error instanceof AxiosError){
        setErrorMessage(error.response?.data)
      }
      console.log(error)
    }
  }

  

  async function upload(){

  if(!file){
    setErrorMessage("Selecione uma imagem")
    return
  }

  try {

    const formData = new FormData()

    formData.append("file", file)

    const response = await api.post("/uploads", formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    })

    console.log(response.data)

    setSucess("Imagem enviada com sucesso")
    setAvatar(`${api.defaults.baseURL}/uploads/${response.data.filename}`)

  } catch(error){

    if(error instanceof AxiosError){
      setErrorMessage(error.response?.data)
    }

    console.log(error)
  }
}
 

  return(
    <div className="absolute">
      <div className="fixed inset-0 z-40 bg-gray-400 opacity-20"></div>
      <div className="fixed bottom-70 left-170 bg-gray-600 w-110  z-50 rounded-[10px]">
        <div className="flex justify-between mx-7 my-5" onClick={(e) => e.stopPropagation()}>
          <h1 className="text-gray-200 text-lg">Perfil</h1>
          <button onClick={onClose}>
            <img src={fecharSvg} alt="Fechar" />
          </button>
        </div>

        <div className="border-b border-gray-500"></div>

        <form action="" className="mx-7 mb-7">
          <div className="flex w-[384px] items-center my-7">
            <div className="w-12 h-12 rounded-full bg-blue-dark mr-3 overflow-hidden">
              {avatar && <img src={avatar} alt="" />}
              
            </div>
            <label className="flex items-center p-1.5 gap-2 w-35 h-7 bg-gray-500 rounded-[5px]">
              <img src={uploadSvg} alt="icone de importar arquivo" className="w-3.5 h-3.5 items-center" />
              <span className="cursor-pointer text-sm font-semibold text-gray-200">
                Noma imagem
              </span>

              <input
                id="image"
                type="file"
                accept="image/*"
                className="z-50 hidden"
                onChange={(e) => {const file = e.target.files?.[0]
                  if(file){setFile(file)}
                  upload()
                }}
              />
            </label>
            <div className="flex justify-center ml-1 items-center w-7 h-7 bg-gray-500 rounded-[5px]">
              <img src={lixeiraSvg} alt="icone para remover imagem" />
            </div>
          </div>

          <div className=" text-gray-200">
            <label htmlFor="name" className="flex justify-normal uppercase text-gray-300 text-xs mb-2">nome</label>
            <Input name="name" id="name" type="text" value={name} className="flex w-full justify-normal text-xl border-b border-gray-500 mb-6" onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="email" className="flex justify-normal uppercase text-gray-300 text-xs mb-2">email</label>
            <Input name="email" id="email" type="email" value={email} className="flex w-full justify-normal text-xl border-b border-gray-500 mb-6" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password" className="flex justify-normal uppercase text-gray-300 text-xs mb-2">senha</label>
            <div className="flex justify-between border-b border-gray-500 mb-6">
              <Input name="password" id="password" value={password} type="password" placeholder="••••••••" className="flex w-full justify-normal text-xl" onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>

          {errorMessage && (
            <div className="flex justify-center">
              <p className="text-sm text-red-600 font-medium mb-3 ">
                {errorMessage}
              </p>
            </div>
          )}

          {sucess && (
            <div className="flex justify-center">
              <p className="text-sm text-green-500 font-medium mb-3 ">
                {sucess}
              </p>
            </div>
          )}

          <div className="border-b border-gray-500"></div>
            <ButtonBasic className="mb-7" onClick={update}>Salvar</ButtonBasic>
        </form>

        


      </div>
    </div>
  )
}