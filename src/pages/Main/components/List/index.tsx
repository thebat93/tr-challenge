import { useCallback } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { InstrumentID } from "../../../../models/instrument";
import { InstrumentDataMap } from "../../hooks/useInstruments";

import s from "./list.module.scss";
import { CardBodyElement } from "./components/CardBodyElement.tsx";

interface Props {
  list: InstrumentID[];
  data: InstrumentDataMap;
  onUnsubscribe: (removedInstrument: InstrumentID) => void;
}

const List = ({ list, data, onUnsubscribe }: Props) => {
  const unsubscribeHandler = useCallback(
    (isin: InstrumentID) => () => onUnsubscribe(isin),
    []
  );

  return (
    <ul className={s.list}>
      {list.map((isin) => (
        <li key={isin} className={s.listItem}>
          <Card>
            <div className={s.cardContent}>
              <p className={s.cardHeading}>{isin}</p>
              <div className={s.cardBody}>
                <CardBodyElement label="Price" value={data.get(isin)?.price} />
                <CardBodyElement
                  label="Bid"
                  value={data.get(isin)?.bid}
                  intent="success"
                />
                <CardBodyElement
                  label="Ask"
                  value={data.get(isin)?.ask}
                  intent="danger"
                />
              </div>
              <Button
                className={s.button}
                intent="danger"
                onClick={unsubscribeHandler(isin)}
              >
                Unsubscribe
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export type { InstrumentDataMap };
export { List };
