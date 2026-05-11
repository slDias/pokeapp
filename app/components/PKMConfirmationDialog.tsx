import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function PKMConfirmationDialog({
  show,
  setShow,
  onConfirmation,
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  onConfirmation: () => any;
}) {
  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-between">
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmation} variant={"destructive"}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
