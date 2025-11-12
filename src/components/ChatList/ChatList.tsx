import { useEffect } from "react";
import type { ChatMessage } from "../../model/ChatMessage";
import ChatBlock from "../ChatBlock";
import styles from "./ChatList.module.css";

type ChatListProps = {
  chatMessageList: ChatMessage[];
};

function ChatList(props: ChatListProps) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [props.chatMessageList]);

  const renderBlocks = () => {
    return props.chatMessageList.map((msg) => (
      <ChatBlock message={msg} key={msg.id} />
    ));
  };

  return <div className={styles.container}>{renderBlocks()}</div>;
}

export default ChatList;
