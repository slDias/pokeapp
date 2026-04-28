import type { Route } from "./+types/home";
import PKMList from "~/PKMList/PKMList";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokedex" }];
}

export default function Home() {
  return <PKMList />;
}
