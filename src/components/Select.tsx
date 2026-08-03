import arrowSvg from "../assets/arrow.svg"

type Props = React.ComponentProps<"select"> & {
  legend?: string
}

export function Select({ children, value, legend,...rest}: Props){
  return(

    <div className="relative">
      <fieldset className="group">
        <legend className="uppercase text-xs text-gray-300 group-focus-within:text-blue-base">{legend}</legend>
        <select
          value={value}
          className={`appearance-none w-full p-4 mb-8 border-b border-gray-500 text-base focus:border-blue-base outline-none ${value === "" ? "text-gray-400" : "text-gray-200"}`}{...rest}>
          {children}
        </select>
        <img src={arrowSvg} alt="" className={`absolute right-4 top-1/2 -translate-y-1/2  pointer-events-none `} />
      </fieldset>
    </div>
  )
}