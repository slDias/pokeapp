import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/pokedex.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("pokemon/:pokemonId", "routes/pokemon.tsx"),
] satisfies RouteConfig;
