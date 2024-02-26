import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/components/auth/*.stories.tsx",
    "../src/stories/components/bank-account/*.stories.tsx",
    "../src/stories/components/comment/*.stories.tsx",
    "../src/stories/components/common/*.stories.tsx",
    "../src/stories/components/nav/*.stories.tsx",
    "../src/stories/components/notification/*.stories.tsx",
    "../src/stories/components/svg/*.stories.tsx",
    "../src/stories/components/transaction/create/*.stories.tsx",
    "../src/stories/components/transaction/detail/*.stories.tsx",
    "../src/stories/components/transaction/list/*.stories.tsx",
    "../src/stories/components/user/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
