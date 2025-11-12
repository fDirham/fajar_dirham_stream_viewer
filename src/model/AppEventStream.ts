import type { AppMessageEventRaw } from "./AppMessageEvent";

type UnsubscribeFn = () => void;

export abstract class AppEventStream {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract subscribe(cb: (message: AppMessageEventRaw) => void): UnsubscribeFn;

  sendMessage(msg: string) {
    console.log("Sending message upstream", msg);
  }
}
