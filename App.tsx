import { Text } from "react-native";
import { AppProviders, AppProvidersIncludedStorybook } from "./Providers";

function App() {
  return (
    <AppProviders>
      <AppProvidersIncludedStorybook>
        <Text>This application started successfully</Text>
      </AppProvidersIncludedStorybook>
    </AppProviders>
  );
}

const AppEntryPoint =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true"
    ? require("./.storybook/react-native").default
    : App;

export default AppEntryPoint;
