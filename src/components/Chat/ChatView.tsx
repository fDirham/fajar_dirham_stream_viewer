import type { ChatMessage } from "../../model/ChatMessage";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import ChatList from "../ChatList";
import styles from "./Chat.module.css";
import type { EventStreamOptionValue } from "./ChatContainer";

type ChatViewProps = {
  chatMessageList: ChatMessage[];
  eventStreamName: EventStreamOptionValue;
  setEventStreamByName: (name: EventStreamOptionValue) => void;
  chatInputValue: string;
  setChatInputValue: (newValue: string) => void;
  onChatInputSubmit: () => void;
};

function ChatView(props: ChatViewProps) {
  return (
    <div className={styles.container}>
      <ChatHeader
        eventStreamName={props.eventStreamName}
        setEventStreamByName={props.setEventStreamByName}
      />
      <ChatList chatMessageList={props.chatMessageList} />
      <ChatInput
        value={props.chatInputValue}
        onChange={props.setChatInputValue}
        onSubmit={props.onChatInputSubmit}
      />
    </div>
  );
}

export default ChatView;
