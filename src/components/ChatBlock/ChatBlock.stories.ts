import type { Meta, StoryObj } from "@storybook/react-vite";

import ChatBlock from "./index";

const meta = {
  title: "ChatBlock",
  component: ChatBlock,
} satisfies Meta<typeof ChatBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User: Story = {
  args: {
    message: {
      type: "user",
      content: "I'm the user",
      timestamp: new Date(),
      id: "cm_0",
      eventIds: ["cm_0"],
    },
  },
};

export const Assistant: Story = {
  args: {
    message: {
      type: "assistant",
      content: "Hello i'm your assistant",
      timestamp: new Date(),
      id: "cm_0",
      eventIds: ["cm_0"],
    },
  },
};

export const ToolStatusChatBlock_Requested: Story = {
  args: {
    message: {
      type: "tool_status",
      status: "requested",
      tool_name: "get_weather",
      args: { location: "San Francisco" },
      timestamp: new Date(),
      id: "cm_0",
      eventIds: ["cm_0"],
    },
  },
};

export const ToolStatusChatBlock_Started: Story = {
  args: {
    message: {
      type: "tool_status",
      status: "started",
      tool_name: "get_weather",
      args: { location: "San Francisco" },
      timestamp: new Date(),
      id: "cm_0",
      eventIds: ["cm_0", "cm_1"],
    },
  },
};
export const ToolStatusChatBlock_Completed: Story = {
  args: {
    message: {
      type: "collapsible_tools",
      id: "collapsible_cm_3",
      eventIds: ["cm_3", "cm_5", "cm_4", "cm_6"],
      timestamp: new Date("2025-07-11T00:01:00.000Z"),
      tool_statuses: [
        {
          args: {
            city: "Tokyo",
          },
          eventIds: ["cm_3", "cm_5"],
          id: "cm_3",
          result: {
            city: "Tokyo",
            population: "37M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:00.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
        {
          args: {
            city: "Delhi",
          },
          eventIds: ["cm_4", "cm_6"],
          id: "cm_4",
          result: {
            city: "Delhi",
            population: "32M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:30.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
      ],
    },
  },
};

export const CollapsibleToolsChatBlock_Pending: Story = {
  args: {
    message: {
      type: "collapsible_tools",
      id: "collapsible_cm_3",
      eventIds: ["cm_3", "cm_5", "cm_4"],
      timestamp: new Date("2025-07-11T00:01:00.000Z"),
      tool_statuses: [
        {
          args: {
            city: "Tokyo",
          },
          eventIds: ["cm_3", "cm_5"],
          id: "cm_3",
          result: {
            city: "Tokyo",
            population: "37M",
          },
          status: "completed",
          timestamp: new Date("2025-07-11T00:01:00.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
        {
          args: {
            city: "Delhi",
          },
          eventIds: ["cm_4"],
          id: "cm_4",
          status: "requested",
          timestamp: new Date("2025-07-11T00:01:30.000Z"),
          tool_name: "get_population",
          type: "tool_status",
        },
      ],
    },
  },
};
