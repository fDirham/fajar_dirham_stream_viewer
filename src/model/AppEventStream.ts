import type { AppMessageEventRaw } from "./AppMessageEvent";

type UnsubscribeFn = () => void;

export abstract class AppEventStream {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract subscribe(cb: (message: AppMessageEventRaw) => void): UnsubscribeFn;

  sendMessage(msg: string) {
    console.log("Sending message upstream", msg);
  }
}
