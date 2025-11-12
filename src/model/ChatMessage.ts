export type ChatMessage =
  | UserChatMessage
  | AssistantChatMessage
  | ToolStatusChatMessage
  | CollapsibleToolsChatMessage;

type BaseChatMessage = { id: string; eventIds: string[]; timestamp: Date };

export const ChatMessageType = {
  USER: "user",
  ASSISTANT: "assistant",
  TOOL_STATUS: "tool_status",
  COLLAPSIBLE_TOOLS: "collapsible_tools",
} as const;

export type UserChatMessage = BaseChatMessage & {
  type: typeof ChatMessageType.USER;
  content: string;
};

export type AssistantChatMessage = BaseChatMessage & {
  type: typeof ChatMessageType.ASSISTANT;
  content: string;
};

export type ToolStatusChatMessage = BaseChatMessage & {
  type: typeof ChatMessageType.TOOL_STATUS;
  status: "completed" | "started" | "requested";
  tool_name: string;
  args: { [key: string]: string };
  result?: { [key: string]: string };
};

export type CollapsibleToolsChatMessage = BaseChatMessage & {
  type: typeof ChatMessageType.COLLAPSIBLE_TOOLS;
  tool_statuses: ToolStatusChatMessage[];
};
