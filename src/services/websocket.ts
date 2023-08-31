import { Instrument, InstrumentID } from "../models/instrument";

type Callback = (data: Instrument) => void;

const noop = () => {};

class WSService {
  private ws: WebSocket;
  private callbacks: Map<InstrumentID, Callback> = new Map();

  constructor(
    url: string,
    {
      onOpen,
      onClose,
      onError,
    }: {
      onOpen?: (event: Event) => void;
      onClose?: (event: CloseEvent) => void;
      onError?: (event: Event) => void;
    } = {}
  ) {
    this.ws = new WebSocket(url);

    this.ws.addEventListener("open", onOpen || noop);
    this.ws.addEventListener("close", onClose || noop);
    this.ws.addEventListener("error", onError || noop);

    this.addOnReceiveMessageHandler();
  }

  private sendMessage(data: any) {
    this.ws.send(JSON.stringify(data));
  }

  private addOnReceiveMessageHandler() {
    this.ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data) as Instrument;

      const callback = this.callbacks.get(data.isin);

      if (!callback) {
        return;
      }

      callback(data);
    });
  }

  subscribe(isin: InstrumentID, callback: Callback) {
    if (this.ws.readyState !== this.ws.OPEN) {
      return noop;
    }

    this.callbacks.set(isin, callback);

    this.sendMessage({
      subscribe: isin,
    });
  }

  unsubscribe(isin: InstrumentID) {
    if (this.ws.readyState !== this.ws.OPEN) {
      return noop;
    }

    this.callbacks.delete(isin);

    this.sendMessage({
      unsubscribe: isin,
    });
  }

  close() {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.close();
    }
  }
}

export { WSService };
