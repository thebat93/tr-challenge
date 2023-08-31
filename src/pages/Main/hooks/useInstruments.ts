import { useCallback, useState } from "react";

import { InstrumentData, InstrumentID } from "../../../models/instrument";

type InstrumentDataMap = Map<InstrumentID, InstrumentData | undefined>;

const useInstruments = () => {
  const [instrumentsList, setInstrumentsList] = useState<InstrumentID[]>([]);
  const [instrumentsData, setInstrumentsData] = useState<InstrumentDataMap>(
    new Map()
  );

  const addInstrument = useCallback(
    (newInstrument: InstrumentID) => {
      setInstrumentsList((list) => [...list, newInstrument]);
      setInstrumentsData((map) => new Map(map.set(newInstrument, undefined)));
    },
    [setInstrumentsList, setInstrumentsData]
  );

  const removeInstrument = useCallback(
    (removedInstrument: InstrumentID) => {
      setInstrumentsList((list) =>
        list.filter((instrument) => instrument !== removedInstrument)
      );
      setInstrumentsData((map) => {
        map.delete(removedInstrument);
        return new Map(map);
      });
    },
    [setInstrumentsList, setInstrumentsData]
  );

  return {
    list: instrumentsList,
    data: instrumentsData,
    setData: setInstrumentsData,
    addInstrument,
    removeInstrument,
  };
};

export type { InstrumentDataMap };
export { useInstruments };
