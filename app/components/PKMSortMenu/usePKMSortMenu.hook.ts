import { useEffect, useState } from "react";

const ASC = "ascending";
const DESC = "descending";

type cmpFuncType = (a: Pokemon, b: Pokemon) => number;
type setStateFuncType = () => cmpFuncType;
export type setSortFuncType = (fn: setStateFuncType) => void;

const usePKMSortMenu = (setSortFunc: setSortFuncType) => {
  const [sortField, setSortField] = useState<keyof Pokemon>("id");
  const [order, setOrder] = useState(ASC);

  const sortableFields: Map<keyof Pokemon, string> = new Map([
    ["id", "Id"],
    ["name", "Name"],
    ["heightCm", "Height"],
    ["type", "Type"],
    ["caught", "Caught"],
    ["caughtDate", "Caught Date"],
  ]);

  useEffect(() => {
    setSortFunc(() => (a: Pokemon, b: Pokemon) => {
      let res;

      if (a[sortField] && !b[sortField]) res = -1;
      else if (b[sortField] && !a[sortField]) res = 1;
      else if (!b[sortField] && !a[sortField]) res = 0;
      else if (a[sortField]! < b[sortField]!) res = -1;
      else if (a[sortField]! > b[sortField]!) res = 1;
      else res = 0;

      if (order === DESC) res *= -1;

      return res;
    });
  }, [sortField, order]);

  return {
    sortField,
    setSortField,
    order,
    setOrder,
    sortableFields,
    ASC,
    DESC,
  };
};

export { usePKMSortMenu };
