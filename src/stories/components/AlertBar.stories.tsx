// stories/components/AlertBar.stories.tsx
import AlertBar from "@/components/AlertBar";
import { snackbarMachine } from "@/machines/snackbarMachine";
import type { AlertColor } from "@mui/material/Alert";
import type { Meta, StoryObj } from "@storybook/react";

interface StoryArgs {
  open?: boolean;
  message?: string;
  severity?: AlertColor;
}

function StoryComponent({ open, message, severity }: StoryArgs) {
  const snackbarState = snackbarMachine
    .provide({
      delays: {
        "auto hide": 1000 * 60 * 60 * 365 * 2024,
      },
    })
    .resolveState({
      context: { message, severity },
      value: open ? "visible" : "invisible",
    });
  return <AlertBar snackbarState={snackbarState} />;
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/AlertBar",
  component: StoryComponent,
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

const defaultArgs: StoryArgs = {
  open: true,
  message: "Alert message!",
  severity: "error",
};

export const Default: Story = {
  args: { ...defaultArgs },
};
