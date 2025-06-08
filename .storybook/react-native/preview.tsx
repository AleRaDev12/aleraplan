import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react";
import { AppProvidersIncludedStorybook } from '../../src/app/Providers';

const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story) => (
      <AppProvidersIncludedStorybook>
        <Story />
      </AppProvidersIncludedStorybook>
    ),
  ],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
