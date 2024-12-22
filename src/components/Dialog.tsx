import { forwardRef, ReactNode } from "react";
import Button from "./Button";

const Dialog = forwardRef<HTMLDialogElement, {headerChildren: ReactNode, children: ReactNode, handleDialog: () => void}>(
  ({headerChildren, children, handleDialog}, ref) => {
    return (
      <dialog ref={ref} className="rounded-md">
        <header className="bg-plate-300 border-b-2 flex justify-between items-center mb-4 p-4">
          {headerChildren}
          <Button onClick={handleDialog} additionalClasses="aspect-square">x</Button>
        </header>
        <div className="p-4">
          {children}
        </div>
      </dialog>
    )
  }
) 
export default Dialog
