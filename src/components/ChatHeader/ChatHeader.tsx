import {
  EventStreamOptions,
  type EventStreamOptionValue,
} from "../Chat/ChatContainer";
import styles from "./ChatHeader.module.css";

type ChatHeaderProps = {
  eventStreamName: EventStreamOptionValue;
  setEventStreamByName: (name: EventStreamOptionValue) => void;
};

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className={styles.container}>
      <h2>AI Chat</h2>
      <select
        value={props.eventStreamName}
        onChange={(e) => {
          props.setEventStreamByName(e.target.value as EventStreamOptionValue);
        }}
        className={styles.select}
      >
        {EventStreamOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChatHeader;
