import type { ToolStatusChatMessage } from "../../../../model/ChatMessage";
import LoadingSpinner from "../../../LoadingSpinner";
import styles from "./ToolStatusChatBlock.module.css";

type ToolStatusChatBlockProps = {
  message: ToolStatusChatMessage;
};

function ToolStatusChatBlock(props: ToolStatusChatBlockProps) {
  const renderArgs = () => {
    if (!props.message.args || !Object.keys(props.message.args).length)
      return null;
    return (
      <>
        <br />
        <div>
          <b>Arguments:</b>
          <pre>{JSON.stringify(props.message.args, null, 2)}</pre>
        </div>
      </>
    );
  };

  const renderResult = () => {
    if (props.message.status == "started")
      return (
        <>
          <br />
          <div>
            <b>Results:</b>
            <br />
            <LoadingSpinner />
          </div>
        </>
      );
    if (!props.message.result) return null;
    return (
      <>
        <br />
        <div>
          <b>Results:</b>
          <pre>{JSON.stringify(props.message.result, null, 2)}</pre>
        </div>
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div>
        <b>Tool Call</b>
      </div>
      <br />
      <div>
        <b>Name:</b> {props.message.tool_name}
      </div>
      <br />
      <div>
        <b>Status:</b> {props.message.status}
      </div>
      {renderArgs()}
      {renderResult()}
    </div>
  );
}

export default ToolStatusChatBlock;
