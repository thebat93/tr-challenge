import { useEffect } from "react";
import throttle from "lodash.throttle";
import difference from "lodash.difference";

import { Form } from "./components/Form";
import { List } from "./components/List";
import { usePrevious } from "./hooks/usePrevious";
import { useInstruments } from "./hooks/useInstruments";
import { useWSService } from "./hooks/useWSService";

import { WS_URL } from "../../const";

import s from "./main.module.scss";

const Main = () => {
  const {
    list: instrumentsList,
    data: instrumentsData,
    setData: setInstrumentsData,
    addInstrument,
    removeInstrument,
  } = useInstruments();

  const previousInstrumentsList = usePrevious(instrumentsList) || [];

  // Throttle setting the state to avoid constant updates
  const setInstrumentsDataThrottled = throttle(setInstrumentsData, 1000);

  const { wsService, isConnected: isWSServiceConnected } = useWSService(WS_URL);

  useEffect(() => {
    // Case when instrument was added
    if (instrumentsList.length > previousInstrumentsList.length) {
      const addedInstruments = difference(
        instrumentsList,
        previousInstrumentsList
      );

      addedInstruments.forEach((instrument) => {
        wsService?.subscribe(instrument, (data) => {
          setInstrumentsDataThrottled(
            (map) =>
              new Map(
                map.set(instrument, {
                  price: data.price,
                  bid: data.bid,
                  ask: data.ask,
                })
              )
          );
        });
      });
    }

    // Case when instrument was removed
    if (instrumentsList.length < previousInstrumentsList.length) {
      const removedInstruments = difference(
        previousInstrumentsList,
        instrumentsList
      );

      removedInstruments.forEach((instrument) => {
        wsService?.unsubscribe(instrument);
      });
    }
  }, [instrumentsList, previousInstrumentsList, setInstrumentsDataThrottled]);

  return (
    <div className={s.wrapper}>
      <h1 className={s.heading}>Your Instruments</h1>
      <Form onSubmit={addInstrument} instruments={instrumentsList} />
      <h2 className={s.subheading}>Watch List</h2>
      {!isWSServiceConnected ? (
        <div className={s.errorMessage}>
          There is a problem with Websocket connection. The prices in the watch
          list are inaccurate. Please reload the page
        </div>
      ) : null}
      {instrumentsList.length > 0 ? (
        <List
          list={instrumentsList}
          data={instrumentsData}
          onUnsubscribe={removeInstrument}
        />
      ) : (
        <div>You don't have any subscriptions</div>
      )}
    </div>
  );
};

export { Main };
