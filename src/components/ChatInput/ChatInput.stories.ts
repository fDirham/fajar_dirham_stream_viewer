import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import ChatInput from "./index";

const meta = {
  title: "ChatInput",
  component: ChatInput,
  args: {
    onChange: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Test",
  },
};
