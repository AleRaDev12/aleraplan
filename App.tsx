import { StyleSheet, Text, View } from "react-native";

import "global.css";
import {GluestackUIProvider} from "./src/shared/ui/gluestack-ui-provider";


function App() {
  return (
    <GluestackUIProvider mode="light"><View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View></GluestackUIProvider>
  );
}

const AppEntryPoint = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true" ? require("./.storybook").default : App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppEntryPoint;
