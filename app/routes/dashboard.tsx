import { Progress } from "~/components/ui/progress";
import type { Route } from "./+types/dashboard";
import { Field, FieldLabel } from "~/components/ui/field";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import PKMTypeChart from "~/components/PKMTypeChart/PKMTypeChart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function Dashboard() {
  // TODO: come up with metrics
  //  - list of last 5 newly caught pokemon
  //  - pokemon type chart
  //  - chart of caughts by day last 7 days

  // todo: this is temporary mock to test the design.
  // Unfortunately, won't have time to implement it.
  let pArray = new Array(10).fill(null);
  const [last10, setLast10] = useState(
    pArray.map((v, i) => ({
      id: i + 1,
      name: `poke${i}`,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
      caught: Math.random() < 0.5,
      health: Math.random(),
      type: ["plant", "venom"],
      weightGrams: Math.random(),
      heightCm: Math.random(),
      speed: Math.random(),
      attack: Math.random(),
      defense: Math.random(),
      specialAttack: Math.random(),
      specialDefense: Math.random(),
      caughtDate: new Date(),
    })),
  );

  const [last5table, setLast5table] = useState(
    last10.splice(5).map((p) => {
      return {
        id: p.id,
        date: p.caughtDate,
        name: p.name,
        type: p.type,
      };
    }),
  );

  return (
    <div className="p-2 flex flex-col gap-4">
      <Field className="gap-0">
        <FieldLabel>
          <span>Pokédex completion</span>
          <span>20%</span>
        </FieldLabel>
        <Progress value={20} className="h-3" />
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
                <TableCell>{entry.date.toLocaleString()}</TableCell>
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
