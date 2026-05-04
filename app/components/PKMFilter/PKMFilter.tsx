import PKMSortMenu from "./PKMSortMenu";
import PKMFilterDialog from "./PKMFilterDialog";
import PKMSearch from "./PKMSearch";
import usePKMFilter from "./usePKMFilter.hook";

type PKMFilterProps = {
  setFilterIdList: (s: Set<number>) => void;
};

const PKMFilter = ({ setFilterIdList }: PKMFilterProps) => {
  const { setSearchIdFilter, setFilterIdFilter } =
    usePKMFilter(setFilterIdList);
  return (
    <div className="border-b px-2 py-4 flex gap-2">
      <PKMSearch setFilterIdList={setSearchIdFilter} className="gap-1 grow" />
      <div className="flex flex-col shrink gap-1">
        <PKMSortMenu />
        <PKMFilterDialog setFilter={setFilterIdFilter} />
      </div>
    </div>
  );
};

export default PKMFilter;
