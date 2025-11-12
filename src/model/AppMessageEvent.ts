export type AppMessageEventRaw =
  | UserMessageEvent
  | AssistantMessageEvent
  | ToolRequestMessageEvent
  | ToolStartedMessageEvent
  | ToolCompleteMessageEvent;

export type AppMessageEventLog = AppMessageEventRaw & { timestamp: Date };

type BaseMessageEvent = { id: number };

export const AppMessageEventType = {
  USER_MESSAGE: "user_message",
  ASSISTANT_MESSAGE: "assistant_message",
  TOOL_CALL_REQUEST: "tool_call_request",
  TOOL_CALL_EXECUTION_START: "tool_call_execution_start",
  TOOL_CALL_EXECUTION_COMPLETE: "tool_call_execution_complete",
} as const;

export type UserMessageEvent = BaseMessageEvent & {
  type: typeof AppMessageEventType.USER_MESSAGE;
  content: string;
};

export type AssistantMessageEvent = BaseMessageEvent & {
  type: typeof AppMessageEventType.ASSISTANT_MESSAGE;
  content: string;
  tool_call_ids?: number[];
};

export type ToolRequestMessageEvent = BaseMessageEvent & {
  type: typeof AppMessageEventType.TOOL_CALL_REQUEST;
  tool_name: string;
  args: { [key: string]: string };
};

export type ToolStartedMessageEvent = BaseMessageEvent & {
  type: typeof AppMessageEventType.TOOL_CALL_EXECUTION_START;
  tool_name: string;
};

export type ToolCompleteMessageEvent = BaseMessageEvent & {
  type: typeof AppMessageEventType.TOOL_CALL_EXECUTION_COMPLETE;
  tool_name: string;
  result: { [key: string]: string };
};
