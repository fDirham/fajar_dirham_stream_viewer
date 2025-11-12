import type { AppEventStream } from "./AppEventStream";
import { MockEventStream } from "./MockEventStream";

export const EventStreamMap: {
  [id: string]: { eventStream: AppEventStream; label: string };
} = {
  A: { eventStream: new MockEventStream("A"), label: "Mock Event Stream A" },
  B: { eventStream: new MockEventStream("B"), label: "Mock Event Stream B" },
  C: { eventStream: new MockEventStream("C"), label: "Mock Event Stream C" },
};
