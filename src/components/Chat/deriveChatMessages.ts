import {
  AppMessageEventType,
  type AppMessageEventLog,
} from "../../model/AppMessageEvent";
import {
  ChatMessageType,
  type ChatMessage,
  type ToolStatusChatMessage,
} from "../../model/ChatMessage";

const findNearestToolStatusChatMessageWithName = (
  messageList: ChatMessage[],
  toolName: string,
  excludingStatus: string[]
): ToolStatusChatMessage | null => {
  for (let i = 0; i < messageList.length; i++) {
    const msg = messageList[i];
    if (
      msg.type == ChatMessageType.TOOL_STATUS &&
      msg.tool_name == toolName &&
      !excludingStatus.includes(msg.status)
    ) {
      return msg;
    }
  }

  return null;
};

export default function deriveChatMessages(
  eventLogs: AppMessageEventLog[]
): ChatMessage[] {
  const firstPassArr: ChatMessage[] = [];

  for (let i = 0; i < eventLogs.length; i++) {
    const currLog = eventLogs[i];

    switch (currLog.type) {
      case AppMessageEventType.USER_MESSAGE:
        firstPassArr.push({
          id: "cm_" + currLog.id,
          eventIds: ["cm_" + currLog.id],
          type: ChatMessageType.USER,
          content: currLog.content,
          timestamp: currLog.timestamp,
        });
        break;
      case AppMessageEventType.ASSISTANT_MESSAGE:
        firstPassArr.push({
          id: "cm_" + currLog.id,
          eventIds: ["cm_" + currLog.id],
          type: ChatMessageType.ASSISTANT,
          content: currLog.content,
          timestamp: currLog.timestamp,
        });
        break;
      case AppMessageEventType.TOOL_CALL_REQUEST:
        firstPassArr.push({
          id: "cm_" + currLog.id,
          eventIds: ["cm_" + currLog.id],
          type: ChatMessageType.TOOL_STATUS,
          status: "requested",
          tool_name: currLog.tool_name,
          timestamp: currLog.timestamp,
          args: currLog.args,
        });
        break;
      case AppMessageEventType.TOOL_CALL_EXECUTION_START: {
        const toolToStart = findNearestToolStatusChatMessageWithName(
          firstPassArr,
          currLog.tool_name,
          ["started", "completed"]
        );
        if (toolToStart) {
          toolToStart.status = "started";
          toolToStart.eventIds.push("cm_" + currLog.id);
        }
        break;
      }
      case AppMessageEventType.TOOL_CALL_EXECUTION_COMPLETE: {
        const toolToComplete = findNearestToolStatusChatMessageWithName(
          firstPassArr,
          currLog.tool_name,
          ["completed"]
        );
        if (toolToComplete) {
          toolToComplete.status = "completed";
          toolToComplete.eventIds.push("cm_" + currLog.id);
          toolToComplete.result = currLog.result;
        }
        break;
      }
      default:
        console.warn("Unhandled event log", currLog);
    }
  }

  // Process collapsibles
  const toReturn: ChatMessage[] = [];

  for (let i = 0; i < firstPassArr.length; i++) {
    const currMessage = firstPassArr[i];

    if (currMessage.type == "tool_status") {
      const toolGroup = [currMessage];
      let j = i + 1;
      for (; j < firstPassArr.length; j++) {
        const nextMessage = firstPassArr[j];
        if (nextMessage.type == "tool_status") {
          toolGroup.push(nextMessage);
        } else break;
      }

      if (toolGroup.length == 1) {
        toReturn.push(currMessage);
      } else {
        const eventIds: string[] = [];
        for (const m of toolGroup) {
          for (const eid of m.eventIds) {
            eventIds.push(eid);
          }
        }

        toReturn.push({
          type: "collapsible_tools",
          id: "collapsible_" + currMessage.id,
          eventIds,
          timestamp: currMessage.timestamp,
          tool_statuses: toolGroup,
        });

        i = j - 1;
      }
    } else {
      toReturn.push(currMessage);
    }
  }

  return toReturn;
}
