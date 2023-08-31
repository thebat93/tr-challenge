interface Instrument {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

type InstrumentID = Instrument['isin'];
type InstrumentData = Omit<Instrument, "isin">;

export type { Instrument, InstrumentData, InstrumentID };
