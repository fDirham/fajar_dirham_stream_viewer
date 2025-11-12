import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import type { ChatMessage } from "../../model/ChatMessage";
import { ChatMessageType } from "../../model/ChatMessage";
import Chat from "./ChatView";

const meta = {
  title: "Chat",
  component: Chat,
  args: {
    setChatInputValue: fn(),
    onChatInputSubmit: fn(),
    setEventStreamByName: fn(),
  },
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

const expansiveMockChatMessages: ChatMessage[] = [
  {
    id: "1",
    eventIds: ["1"],
    timestamp: new Date("2024-11-09T10:00:00"),
    type: ChatMessageType.USER,
    content:
      "Hello! Can you help me understand how to use the file search tool?",
  },
  {
    id: "2",
    eventIds: ["2"],
    timestamp: new Date("2024-11-09T10:00:05"),
    type: ChatMessageType.ASSISTANT,
    content:
      "Of course! I'd be happy to help you with the file search tool. Let me search for relevant documentation.",
  },
  {
    id: "3",
    eventIds: ["3", "4"],
    timestamp: new Date("2024-11-09T10:00:10"),
    type: ChatMessageType.TOOL_STATUS,
    status: "requested",
    tool_name: "file_search",
    args: { query: "*.md", pattern: "documentation" },
  },
  {
    id: "4",
    eventIds: ["5", "6"],
    timestamp: new Date("2024-11-09T10:00:12"),
    type: ChatMessageType.TOOL_STATUS,
    status: "started",
    tool_name: "file_search",
    args: { query: "*.md", pattern: "documentation" },
  },
  {
    id: "5",
    eventIds: ["7", "8", "9"],
    timestamp: new Date("2024-11-09T10:00:15"),
    type: ChatMessageType.TOOL_STATUS,
    status: "completed",
    tool_name: "file_search",
    args: { query: "*.md", pattern: "documentation" },
    result: { files_found: "5", total_matches: "23" },
  },
  {
    id: "6",
    eventIds: ["10"],
    timestamp: new Date("2024-11-09T10:00:20"),
    type: ChatMessageType.ASSISTANT,
    content:
      "I found 5 documentation files with 23 matches. The file search tool allows you to search for files using glob patterns. You can use wildcards like * and ** to match multiple files and directories.",
  },
  {
    id: "7",
    eventIds: ["11"],
    timestamp: new Date("2024-11-09T10:01:00"),
    type: ChatMessageType.USER,
    content:
      "That's helpful! Can you show me an example of searching for TypeScript files?",
  },
  {
    id: "8",
    eventIds: ["12", "13"],
    timestamp: new Date("2024-11-09T10:01:05"),
    type: ChatMessageType.TOOL_STATUS,
    status: "requested",
    tool_name: "file_search",
    args: { query: "**/*.ts", max_results: "10" },
  },
  {
    id: "9",
    eventIds: ["14"],
    timestamp: new Date("2024-11-09T10:01:07"),
    type: ChatMessageType.TOOL_STATUS,
    status: "started",
    tool_name: "file_search",
    args: { query: "**/*.ts", max_results: "10" },
  },
  {
    id: "10",
    eventIds: ["15", "16"],
    timestamp: new Date("2024-11-09T10:01:10"),
    type: ChatMessageType.TOOL_STATUS,
    status: "completed",
    tool_name: "file_search",
    args: { query: "**/*.ts", max_results: "10" },
    result: { files_found: "10", search_time: "0.05s" },
  },
  {
    id: "11",
    eventIds: ["17"],
    timestamp: new Date("2024-11-09T10:01:15"),
    type: ChatMessageType.ASSISTANT,
    content:
      "Here's an example: I searched for all TypeScript files using the pattern **/*.ts and found 10 files in about 0.05 seconds. The ** wildcard matches any directory at any depth, while *.ts matches any file ending in .ts.",
  },
  {
    id: "12",
    eventIds: ["18"],
    timestamp: new Date("2024-11-09T10:02:00"),
    type: ChatMessageType.USER,
    content:
      "Excellent! Now can you help me read the contents of a specific file?",
  },
  {
    id: "13",
    eventIds: ["19", "20"],
    timestamp: new Date("2024-11-09T10:02:05"),
    type: ChatMessageType.TOOL_STATUS,
    status: "requested",
    tool_name: "read_file",
    args: { file_path: "/src/components/Chat/ChatView.tsx" },
  },
  {
    id: "14",
    eventIds: ["21"],
    timestamp: new Date("2024-11-09T10:02:06"),
    type: ChatMessageType.TOOL_STATUS,
    status: "started",
    tool_name: "read_file",
    args: { file_path: "/src/components/Chat/ChatView.tsx" },
  },
  {
    id: "15",
    eventIds: ["22", "23", "24"],
    timestamp: new Date("2024-11-09T10:02:10"),
    type: ChatMessageType.TOOL_STATUS,
    status: "completed",
    tool_name: "read_file",
    args: { file_path: "/src/components/Chat/ChatView.tsx" },
    result: { lines_read: "156", size: "4.2KB" },
  },
  {
    id: "16",
    eventIds: ["25"],
    timestamp: new Date("2024-11-09T10:02:15"),
    type: ChatMessageType.ASSISTANT,
    content:
      "I've successfully read the ChatView.tsx file. It contains 156 lines of code and is about 4.2KB in size. This component appears to be the main chat view that displays messages and handles user input.",
  },
  {
    id: "17",
    eventIds: ["26"],
    timestamp: new Date("2024-11-09T10:03:00"),
    type: ChatMessageType.USER,
    content:
      "Can you search for a specific function in the codebase called 'deriveChatMessages'?",
  },
  {
    id: "18",
    eventIds: ["27"],
    timestamp: new Date("2024-11-09T10:03:05"),
    type: ChatMessageType.TOOL_STATUS,
    status: "requested",
    tool_name: "grep_search",
    args: { query: "deriveChatMessages", is_regexp: "false" },
  },
  {
    id: "19",
    eventIds: ["28"],
    timestamp: new Date("2024-11-09T10:03:07"),
    type: ChatMessageType.TOOL_STATUS,
    status: "started",
    tool_name: "grep_search",
    args: { query: "deriveChatMessages", is_regexp: "false" },
  },
  {
    id: "20",
    eventIds: ["29", "30"],
    timestamp: new Date("2024-11-09T10:03:12"),
    type: ChatMessageType.TOOL_STATUS,
    status: "completed",
    tool_name: "grep_search",
    args: { query: "deriveChatMessages", is_regexp: "false" },
    result: { matches: "8", files: "3" },
  },
  {
    id: "21",
    eventIds: ["31"],
    timestamp: new Date("2024-11-09T10:03:18"),
    type: ChatMessageType.ASSISTANT,
    content:
      "Found 8 matches for 'deriveChatMessages' across 3 files. This function appears to be used to transform event data into chat messages. It's defined in deriveChatMessages.ts and imported in several components.",
  },
  {
    id: "22",
    eventIds: ["32"],
    timestamp: new Date("2024-11-09T10:04:30"),
    type: ChatMessageType.USER,
    content:
      "Thanks! This has been really helpful. One last question - can you run the tests for me?",
  },
  {
    id: "23",
    eventIds: ["33"],
    timestamp: new Date("2024-11-09T10:04:35"),
    type: ChatMessageType.TOOL_STATUS,
    status: "requested",
    tool_name: "run_tests",
    args: { test_suite: "all", coverage: "true" },
  },
  {
    id: "24",
    eventIds: ["34", "35"],
    timestamp: new Date("2024-11-09T10:04:37"),
    type: ChatMessageType.TOOL_STATUS,
    status: "started",
    tool_name: "run_tests",
    args: { test_suite: "all", coverage: "true" },
  },
  {
    id: "25",
    eventIds: ["36", "37", "38", "39"],
    timestamp: new Date("2024-11-09T10:05:15"),
    type: ChatMessageType.TOOL_STATUS,
    status: "completed",
    tool_name: "run_tests",
    args: { test_suite: "all", coverage: "true" },
    result: { tests_passed: "24", tests_failed: "0", coverage: "87.3%" },
  },
  {
    id: "26",
    eventIds: ["40"],
    timestamp: new Date("2024-11-09T10:05:20"),
    type: ChatMessageType.ASSISTANT,
    content:
      "Great news! All 24 tests passed successfully with 87.3% code coverage. Your codebase is looking healthy! Is there anything else you'd like to know?",
  },
  {
    id: "27",
    eventIds: ["41"],
    timestamp: new Date("2024-11-09T10:06:00"),
    type: ChatMessageType.USER,
    content: "No, that's perfect. Thank you so much for your help!",
  },
  {
    id: "28",
    eventIds: ["42"],
    timestamp: new Date("2024-11-09T10:06:05"),
    type: ChatMessageType.ASSISTANT,
    content:
      "You're very welcome! Feel free to reach out if you have any more questions. Happy coding! 🚀",
  },
];

export const Default: Story = {
  args: {
    chatInputValue: "",
    chatMessageList: [],
    eventStreamName: "Mock event stream: A",
  },
};

export const WithExpansiveChat: Story = {
  args: {
    chatInputValue: "",
    chatMessageList: expansiveMockChatMessages,
    eventStreamName: "Mock event stream: A",
  },
};
