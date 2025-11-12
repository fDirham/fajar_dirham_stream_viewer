import { useState } from "react";
import type { CollapsibleToolsChatMessage } from "../../../../model/ChatMessage";
import LoadingSpinner from "../../../LoadingSpinner";
import ToolStatusChatBlock from "../ToolStatusChatBlock";
import styles from "./CollapsibleToolsChatBlock.module.css";

type CollapsibleToolsChatBlockProps = {
  message: CollapsibleToolsChatMessage;
};

function CollapsibleToolsChatBlock(props: CollapsibleToolsChatBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderStatus = () => {
    const statuses = props.message.tool_statuses.map((ts) => ts.status);
    if (statuses.every((s) => s === "completed")) {
      return (
        <div>
          <b>Status:</b> completed
        </div>
      );
    }
    return (
      <div>
        <b>Status:</b>
        <br />
        <LoadingSpinner />
      </div>
    );
  };

  const renderCollapsibles = () => {
    if (!isOpen) return null;
    return props.message.tool_statuses.map((ts) => (
      <ToolStatusChatBlock key={ts.id} message={ts} />
    ));
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={() => setIsOpen((curr) => !curr)}
      >
        <div>
          Running <b>{props.message.tool_statuses.length}</b> tools
        </div>
        <i>Click to {isOpen ? "hide" : "show"} details</i>
        <br />
        <br />
        {renderStatus()}
      </div>
      {renderCollapsibles()}
    </>
  );
}

export default CollapsibleToolsChatBlock;
