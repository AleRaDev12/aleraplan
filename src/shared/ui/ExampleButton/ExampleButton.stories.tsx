import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ExampleButton } from "./ExampleButton";

const meta = {
  title: "MyButtonPaper",
  component: ExampleButton,
} satisfies Meta<typeof ExampleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onPress: action("onPress"),
  },
};
