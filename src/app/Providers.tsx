import { FC, PropsWithChildren } from 'react';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../shared/config';

const queryClient = createQueryClient();

export const AppProvidersIncludedStorybook: FC<PropsWithChildren> = ({ children }) => {
  return <PaperProvider theme={MD3DarkTheme}>{children}</PaperProvider>;
};

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
