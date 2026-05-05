import { useState } from "react";

export default function usePKMFilter(setIdFilter: (f: Set<number>) => void) {
  const [searchIdFilter, _setSearchIdFilter] = useState<Set<number>>(new Set());
  const [filterIdFilter, _setFilterIdFilter] = useState<Set<number>>(new Set());

  const setSearchIdFilter = (nf: Set<number>) => {
    _setSearchIdFilter(nf);
    if (filterIdFilter.size) {
      const combinedFilter = filterIdFilter.intersection(nf);
      if (!combinedFilter.size) combinedFilter.add(-1); // todo workaround
      setIdFilter(combinedFilter);
    } else setIdFilter(nf);
  };

  const setFilterIdFilter = (nf: Set<number>) => {
    console.log("setting filter on applied dialog", nf);
    _setFilterIdFilter(nf);
    if (searchIdFilter.size) {
      const combinedFilter = searchIdFilter.intersection(nf);
      if (!combinedFilter.size) combinedFilter.add(-1); // todo workaround
      setIdFilter(combinedFilter);
    } else setIdFilter(nf);
  };

  return { setSearchIdFilter, setFilterIdFilter };
}
