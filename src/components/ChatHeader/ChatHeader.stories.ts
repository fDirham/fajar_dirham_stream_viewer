import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import ChatHeader from "./index";

const meta = {
  title: "ChatHeader",
  component: ChatHeader,
} satisfies Meta<typeof ChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eventStreamName: "Mock event stream: A",
    setEventStreamByName: fn(),
  },
};
