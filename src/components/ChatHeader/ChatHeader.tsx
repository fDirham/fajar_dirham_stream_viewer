import { EventStreamMap } from "../../model/EventStreamMap";
import styles from "./ChatHeader.module.css";

type ChatHeaderProps = {
  eventStreamId: string;
  setEventStreamId: (id: string) => void;
};

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className={styles.container}>
      <h2>AI Chat</h2>
      <select
        value={props.eventStreamId}
        onChange={(e) => {
          props.setEventStreamId(e.target.value);
        }}
        className={styles.select}
      >
        {Object.entries(EventStreamMap).map(([key, val]) => (
          <option key={key} value={key}>
            {val.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ChatHeader;
