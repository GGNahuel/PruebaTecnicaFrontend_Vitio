export default function handleDialog(dialogRef : React.RefObject<HTMLDialogElement>) {
  if (!dialogRef.current) return
  if (dialogRef.current.open) dialogRef.current.close()
  else dialogRef.current.showModal()
}