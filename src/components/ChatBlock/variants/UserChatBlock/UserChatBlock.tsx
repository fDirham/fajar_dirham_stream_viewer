import type { UserChatMessage } from "../../../../model/ChatMessage";
import styles from "./UserChatBlock.module.css";

type UserChatBlockProps = {
  message: UserChatMessage;
};

function UserChatBlock(props: UserChatBlockProps) {
  return <div className={styles.container}>{props.message.content}</div>;
}

export default UserChatBlock;
