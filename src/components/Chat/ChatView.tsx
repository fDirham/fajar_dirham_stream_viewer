import type { ChatMessage } from "../../model/ChatMessage";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import ChatList from "../ChatList";
import styles from "./Chat.module.css";

type ChatViewProps = {
  chatMessageList: ChatMessage[];
  eventStreamId: string;
  setEventStreamId: (id: string) => void;
  chatInputValue: string;
  setChatInputValue: (newValue: string) => void;
  onChatInputSubmit: () => void;
};

function ChatView(props: ChatViewProps) {
  return (
    <div className={styles.container}>
      <ChatHeader
        eventStreamId={props.eventStreamId}
        setEventStreamId={props.setEventStreamId}
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
