import { motion } from "motion/react";
import type { ChatMessage } from "../../model/ChatMessage";
import styles from "./ChatBlock.module.css";
import AssistantChatBlock from "./variants/AssistantChatBlock/AssistantChatBlock";
import CollapsibleToolsChatBlock from "./variants/CollapsibleToolsChatBlock";
import ToolStatusChatBlock from "./variants/ToolStatusChatBlock/ToolStatusChatBlock";
import UserChatBlock from "./variants/UserChatBlock/UserChatBlock";

type ChatBlockProps = {
  message: ChatMessage;
};

function ChatBlock(props: ChatBlockProps) {
  const renderBlock = () => {
    switch (props.message.type) {
      case "user":
        return <UserChatBlock message={props.message} />;
      case "assistant":
        return <AssistantChatBlock message={props.message} />;
      case "tool_status":
        return <ToolStatusChatBlock message={props.message} />;
      case "collapsible_tools":
        return <CollapsibleToolsChatBlock message={props.message} />;
      default:
        return <div>Unsupported message type</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      {renderBlock()}
    </motion.div>
  );
}

export default ChatBlock;
