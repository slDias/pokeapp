import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import PKMNoteDialog from "../PKMNoteDialog/PKMNoteDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import PKMConfirmationDialog from "../PKMConfirmationDialog";

export default function PKMNote({ note }: { note: Note }) {
  // TODO: move
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <div className="border-2 rounded-lg bg-background">
      <div className="border-b-2 p-2 border-dashed">{note.content}</div>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="text-sm">{note.createdDate.toLocaleString()}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Ellipsis></Ellipsis>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={(_) => setShowEditDialog(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(_) => setShowDeleteDialog(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <PKMNoteDialog show={showEditDialog} note={note} />
      <PKMConfirmationDialog show={showDeleteDialog} />
    </div>
  );
}
