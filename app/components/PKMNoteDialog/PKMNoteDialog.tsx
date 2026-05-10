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
import type { usePKMNoteDialog } from "./usePKMNoteDialog.hook";

const PKMNoteDialog = ({
  open,
  setOpen,
  hook,
}: {
  open: boolean;
  setOpen: (s: boolean) => void;
  hook: ReturnType<typeof usePKMNoteDialog>;
}) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Note</DialogTitle>
      </DialogHeader>
      <Textarea
        value={hook.content}
        onChange={(e) => hook.setContent(e.target.value)}
      />
      <DialogFooter className="flex flex-row justify-between">
        <DialogClose className="flex">
          <Button variant={"outline"}>Cancel</Button>
          <Button onClick={(_) => hook.saveNote(hook.content)}>Save</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export { PKMNoteDialog };
