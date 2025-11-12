import { useEffect, useMemo, useState } from "react";

import type { AppMessageEventLog } from "../../model/AppMessageEvent";
import ChatView from "./ChatView";
import deriveChatMessages from "./deriveChatMessages";
import { EventStreamMap } from "../../model/EventStreamMap";

export default function ChatContainer() {
  // MARK: State
  const [appMessageEventList, setAppMessageEventList] = useState<
    AppMessageEventLog[]
  >([]);
  const [eventStreamId, setEventStreamId] = useState<string>("A");
  const eventStream = EventStreamMap[eventStreamId]
    ? EventStreamMap[eventStreamId].eventStream
    : null;
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
      eventStreamId={eventStreamId}
      setEventStreamId={setEventStreamId}
      chatInputValue={chatInputValue}
      setChatInputValue={setChatInputValue}
      onChatInputSubmit={onChatInputSubmit}
    />
  );
}
