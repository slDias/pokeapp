import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Pie, PieChart } from "recharts";

export default function PKMTypeChart() {
  const chartData = [
    { type: "plant", pokemons: 5, fill: "var(--chart-1)" },
    { type: "fire", pokemons: 3, fill: "var(--chart-2)" },
  ]; // TODO: calculate from captured pokemons and set proper colors
  const chartConfig = {
    pokemons: {
      label: "Pokemons",
    },
    plant: {
      label: "Plant",
    },
    fire: {
      label: "Fire",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-10">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="pokemons"
          nameKey="type"
          label
          innerRadius={55}
        />
      </PieChart>
    </ChartContainer>
  );
}
