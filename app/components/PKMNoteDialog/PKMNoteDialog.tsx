import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "../ui/textarea";

export default function PKMNoteDialog({
  show,
  note,
}: {
  show: boolean;
  note?: Note;
}) {
  return (
    <Dialog open={show}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
        </DialogHeader>
        <Textarea /> {/* TODO: note.content.value here */}
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose className="flex" asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Save</Button> {/* TODO: implement */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
