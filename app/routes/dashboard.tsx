import { Progress } from "~/components/ui/progress";
import type { Route } from "./+types/dashboard";
import { Field, FieldLabel } from "~/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import PKMTypeChart from "~/components/PKMTypeChart/PKMTypeChart";
import { useDashboard } from "~/hooks/useDashboard.hook";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashboard() {
  const { completionProgress, last5table } = useDashboard();
  return (
    <div className="p-2 flex flex-col gap-4">
      <Field className="gap-0">
        <FieldLabel>
          <span>Pokédex completion</span>
          <span>{completionProgress.toFixed(1)}%</span>
        </FieldLabel>
        <Progress value={completionProgress} className="h-3" />
      </Field>
      <div>
        <div>Recent catches</div>
        <Table className="border rounded">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {last5table.map((entry, i) => (
              <TableRow key={i}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell className="truncate">
                  {entry.type.join(" / ")}
                </TableCell>
                <TableCell>{new Date(entry.date!).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="gap-2 flex flex-col">
        <div>Type distribution</div>
        <PKMTypeChart></PKMTypeChart>
      </div>
    </div>
  );
}
