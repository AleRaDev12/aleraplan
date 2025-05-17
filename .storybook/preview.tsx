import type { Preview } from "@storybook/react";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { AppProvidersIncludedStorybook } from "../Providers";

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
