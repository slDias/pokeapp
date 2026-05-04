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
import { useState } from "react";

export default function PKMNoteDialog({
  show,
  setShow,
  fromNote,
  idx,
  saveNote,
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  fromNote?: Note;
  idx?: number;
  saveNote: (note: Note, idx?: number) => void;
}) {
  const [note, setNote] = useState<Note>({} as Note);

  if (fromNote) setNote(fromNote);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
        </DialogHeader>
        <Textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose className="flex" asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={(_) => {
              saveNote(note, idx);
              setShow(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
