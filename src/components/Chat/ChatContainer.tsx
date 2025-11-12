import { useEffect, useMemo, useState } from "react";
import type { AppEventStream } from "../../model/AppEventStream";

import type { AppMessageEventLog } from "../../model/AppMessageEvent";
import {
  MockEventStream,
  MockEventStreamNames,
} from "../../model/MockEventStream";
import ChatView from "./ChatView";
import deriveChatMessages from "./deriveChatMessages";

export const EventStreamOptions = [
  MockEventStreamNames.A,
  MockEventStreamNames.B,
  MockEventStreamNames.C,
  "None",
] as const;

export type EventStreamOptionValue = (typeof EventStreamOptions)[number];

export default function ChatContainer() {
  // MARK: State
  const [appMessageEventList, setAppMessageEventList] = useState<
    AppMessageEventLog[]
  >([]);
  const [eventStream, setEventStream] = useState<AppEventStream | null>(
    new MockEventStream("A")
  );
  const [chatInputValue, setChatInputValue] = useState<string>("");

  const chatMessageList = useMemo(() => {
    return deriveChatMessages(appMessageEventList);
  }, [appMessageEventList]);

  // MARK: Effects
  useEffect(() => {
    setAppMessageEventList([]);
    if (eventStream === null) {
      return;
    }

    const unsubscribe = eventStream.subscribe((ame) => {
      setAppMessageEventList((oldList) => [
        ...oldList,
        { ...ame, timestamp: new Date() },
      ]);
    });

    return () => {
      unsubscribe();
    };
  }, [eventStream]);

  // MARK: Streams switching
  const getEventStreamName = (): EventStreamOptionValue => {
    if (eventStream === null) {
      return "None";
    }
    if (
      EventStreamOptions.includes(eventStream.name as EventStreamOptionValue)
    ) {
      return eventStream.name as EventStreamOptionValue;
    }

    console.warn("Unrecognized event stream name:", eventStream.name);

    return "None";
  };

  const setEventStreamByName = (name: EventStreamOptionValue) => {
    console.log("Current event stream name:", getEventStreamName());
    console.log("Setting event stream to:", name);

    switch (name) {
      case MockEventStreamNames.A:
        setEventStream(new MockEventStream("A"));
        break;
      case MockEventStreamNames.B:
        setEventStream(new MockEventStream("B"));
        break;
      case MockEventStreamNames.C:
        setEventStream(new MockEventStream("C"));
        break;
      default:
        setEventStream(null);
        break;
    }
  };

  // MARK: Chat input handling
  const onChatInputSubmit = () => {
    if (eventStream === null) {
      console.warn(
        "Cannot submit chat message when no event stream is selected."
      );
      return;
    }
    setChatInputValue("");
    eventStream.sendMessage(chatInputValue);
  };

  return (
    <ChatView
      chatMessageList={chatMessageList}
      eventStreamName={getEventStreamName()}
      setEventStreamByName={setEventStreamByName}
      chatInputValue={chatInputValue}
      setChatInputValue={setChatInputValue}
      onChatInputSubmit={onChatInputSubmit}
    />
  );
}
