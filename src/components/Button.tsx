import { ReactNode } from "react"

export default function Button({children, additionalClasses, ...attrs} : 
  {children: ReactNode, additionalClasses?: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) 
{
  const classes = `
    flex justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm 
    hover:bg-sky-500 active:bg-sky-700
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600
    box-border
  `

  return (
    <button className={classes + additionalClasses} {...attrs}>
      {children}
    </button>
  )
}