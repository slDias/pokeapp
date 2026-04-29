import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "../ui/textarea";

export default function PKMAddNote() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusCircle />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new note</DialogTitle>
        </DialogHeader>
        <Textarea />
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose className="flex" asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Add</Button> {/* TODO: implement */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
