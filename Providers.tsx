import { FC, PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";

export const AppProvidersIncludedStorybook: FC<PropsWithChildren> = ({
  children,
}) => {
  return <PaperProvider>{children}</PaperProvider>;
};

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return children;
};
