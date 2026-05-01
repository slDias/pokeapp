import type { Route } from "./+types/pokemon";
import PKMIdLabel from "~/components/PKMIdLabel";
import PKMCaughtBadge from "~/components/PKMCaughtBadge";
import PKMNote from "~/components/PKMNote/PKMNote";
import PKMNoteDialog from "~/components/PKMNoteDialog/PKMNoteDialog";
import { formatWeight, formatHeight } from "~/lib/utils";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { PlusCircle, Share2 } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokémon" }];
  // TODO: dynamically change to pokemon name
}

export default function Pokemon({ params }: Route.ComponentProps) {
  // todo: fetch
  const pokemon: Pokemon = {
    id: parseInt(params.pokemonId),
    name: "Bulbasaur",
    sprite: [
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    ],
    caught: Math.random() < 0.5,
    health: 100,
    type: ["Plant", "Venom"],
    weightGrams: 7500,
    heightCm: 102,
    speed: 35,
    attack: 49,
    defense: 45,
    specialAttack: 65,
    specialDefense: 45,
    caughtDate: new Date("2026-04-29T15:33:18.243Z"),
    notes: [
      {
        content:
          "Explicabo qui labore nisi voluptatem iusto excepturi neque. Dolore aperiam nihil culpa ducimus mollitia soluta at. Et a laboriosam dolorem natus quaerat vel et. Non dolores non quis sit fugiat aspernatur sit. Iste minus quisquam nam. Deleniti magni sed rem quia.",
        createdDate: new Date(),
      },
      { content: "haushdlashda", createdDate: new Date() },
      { content: "haushdlashda", createdDate: new Date() },
    ],
  };

  /* todo */
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="w-full justify-center flex bg-secondary">
        <Carousel>
          <CarouselContent>
            {pokemon.sprite.map((s, i) => (
              <CarouselItem key={i} className="flex w-30 justify-center">
                <img
                  className={`flex self-center size-40 ${!pokemon.caught && "opacity-55 grayscale-75"}`}
                  src={s}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex border-t-2 items-center justify-between p-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{pokemon.name}</span>
          <PKMIdLabel className="text-sm" value={pokemon.id} />
        </div>
        <div className={`flex gap-2 border items-center px-2 rounded`}>
          {pokemon.caught ? "Caught!" : "Not Caught"}
          <PKMCaughtBadge value={pokemon.caught} />
        </div>
      </div>
      <div className="p-2 grid grid-cols-2 gap-2">
        <Button variant={"outline"}>
          <Share2 size={18} /> Share
          {/* TODO: will generate an encoded url with this pokemon's data */}
        </Button>
        <Button variant={pokemon.caught ? "destructive" : "default"}>
          <PKMCaughtBadge value={!pokemon.caught} />
          {pokemon.caught ? "Release" : "Catch!"}
        </Button>
      </div>
      <div className="p-2 grid grid-cols-2 items-center gap-1">
        <div>HP: {pokemon.health}</div>
        <div>Type: {pokemon.type.join(" / ")}</div>
        <div>Weight: {formatWeight(pokemon.weightGrams)}</div>
        <div>Height: {formatHeight(pokemon.heightCm)}</div>
        <div>Speed: {pokemon.speed}</div>
        <div>Attack: {pokemon.attack}</div>
        <div>Defense: {pokemon.defense}</div>
        <div>Special Attack: {pokemon.specialAttack}</div>
        <div>Special Defense: {pokemon.specialDefense}</div>
        <div>
          Caught date:{" "}
          {(pokemon.caught && pokemon.caughtDate!.toLocaleDateString()) ||
            "n/a"}
        </div>
      </div>
      <div className="p-2 flex flex-col border-t-2 bg-secondary">
        <div className="flex items-center justify-between">
          <div>Notes</div>
          <div>
            <Button onClick={(e) => setShowDialog(true)} variant={"outline"}>
              <PlusCircle />
              <span>Add</span>
            </Button>
            <PKMNoteDialog show={showDialog} /> {/* todo: trigger */}
          </div>
        </div>
        {pokemon.notes && (
          <div className="px-2 py-4 flex flex-col gap-2">
            {pokemon.notes.map((n) => (
              <PKMNote note={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
