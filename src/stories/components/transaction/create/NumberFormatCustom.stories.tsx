// stories/components/transaction/create/NumberFormatCustom.stories.tsx
import NumberFormatCustom from "@/components/transaction/create/NumberFormatCustom";
import type { Meta, StoryObj } from "@storybook/react";
import type { NumberFormatCustomProps } from "@/components/transaction/create/NumberFormatCustom";

const meta: Meta<typeof NumberFormatCustom> = {
  title: "components/transaction/create/NumberFormatCustom",
  component: NumberFormatCustom,
};

export default meta;

type Story = StoryObj<typeof NumberFormatCustom>;

const defaultArgs: NumberFormatCustomProps = {
  onChange: event => {
    alert(`On change: ${event.target.value}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
