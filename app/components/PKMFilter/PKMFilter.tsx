import PKMSortMenu from "./PKMSortMenu";
import PKMFilterDialog from "./PKMFilterDialog";
import PKMSearch from "./PKMSearch";

export default function PKMFilter() {
  return (
    <div className="border-b px-2 py-4 flex gap-2 mb-4">
      <PKMSearch className="gap-1 grow" />
      <div className="flex flex-col shrink gap-1">
        <PKMSortMenu />
        <PKMFilterDialog />
      </div>
    </div>
  );
}
