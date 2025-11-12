import type { Meta, StoryObj } from "@storybook/react-vite";

import ChatList from "./index";

const meta = {
  title: "ChatList",
  component: ChatList,
} satisfies Meta<typeof ChatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chatMessageList: [
      {
        type: "user",
        content: "Hello",
        timestamp: new Date(),
        id: "cm_0",
        eventIds: ["cm_0"],
      },
    ],
  },
};
