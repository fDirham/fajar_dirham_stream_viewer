import type { AssistantChatMessage } from "../../../../model/ChatMessage";
import styles from "./AssistantChatBlock.module.css";

type AssistantChatBlockProps = {
  message: AssistantChatMessage;
};
function AssistantChatBlock(props: AssistantChatBlockProps) {
  return <div className={styles.container}>{props.message.content}</div>;
}

export default AssistantChatBlock;
