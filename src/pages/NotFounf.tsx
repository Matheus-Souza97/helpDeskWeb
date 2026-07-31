export function NotFound(){
  return(
    <div className="flex flex-col  w-screen h-screen justify-center items-center border-2 border-amber-400">
      <h1 className=" text-9xl">404</h1>
      <h2 className="text-2xl">Essa página não existe.</h2>
      <a href="/" className="mt-10 text-blue-500 underline">Voltar para o inicio.</a>
    </div>
  )
}