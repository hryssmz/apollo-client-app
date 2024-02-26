// stories/components/nav/NavSecondaryList.stories.tsx
import NavSecondaryList from "@/components/nav/NavSecondaryList";
import type { Meta, StoryObj } from "@storybook/react";
import type { NavSecondaryListProps } from "@/components/nav/NavSecondaryList";

const meta: Meta<typeof NavSecondaryList> = {
  title: "components/nav/NavSecondaryList",
  component: NavSecondaryList,
};

export default meta;

type Story = StoryObj<typeof NavSecondaryList>;

const defaultArgs: NavSecondaryListProps = {
  signOut: () => {
    alert("Sign out!");
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
