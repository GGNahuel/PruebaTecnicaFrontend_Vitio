import { ReactNode } from "react"

export default function Button({children, additionalClasses, variant = "normal", rounded = false, ...attrs} : 
  {children: ReactNode, additionalClasses?: string, variant?: "normal" | "outlined" | "error" | "success", rounded?: boolean} 
  & React.ButtonHTMLAttributes<HTMLButtonElement>) 
{
  const variantClasses = 
    variant == "normal" ?
      "bg-sky-600 text-white hover:bg-sky-500 active:bg-sky-700 border-sky-700"
    : variant == "error" ?
      "bg-red-700 text-white hover:bg-red-600 active:bg-red-800 border-red-800"
    : variant == "success" ?
      "bg-green-600 text-black hover:bg-green-500 active:bg-green-700 border-green-700" 
    :"text-black bg-white hover:bg-slate-100 active:bg-slate-300 border-slate-300"
  const classes = `
    flex justify-center items-center ${rounded ? "rounded-full" : "rounded-md"} px-3 py-1.5 text-sm/6 font-semibold shadow-sm 
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600
    box-border border-2
    ${variantClasses}
  `

  return (
    <button className={classes + additionalClasses} {...attrs}>
      {children}
    </button>
  )
}