import { forwardRef, ReactNode } from "react";
import Button from "./Button";

const Dialog = forwardRef<HTMLDialogElement, {headerChildren: ReactNode, children: ReactNode, handleDialog: () => void}>(
  ({headerChildren, children, handleDialog}, ref) => {
    return (
      <dialog ref={ref}>
        <header className="bg-plate-300 border-b-2">
          {headerChildren}
          <Button onClick={handleDialog}>x</Button>
        </header>
        {children}
      </dialog>
    )
  }
) 
export default Dialog
