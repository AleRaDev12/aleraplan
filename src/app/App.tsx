import { registerRootComponent } from 'expo';
import { AppProviders, AppProvidersIncludedStorybook } from './Providers';
import { DiaryPage } from '../pages/DiaryPage';

function App() {
  return (
    <AppProviders>
      <AppProvidersIncludedStorybook>
        <DiaryPage />
      </AppProvidersIncludedStorybook>
    </AppProviders>
  );
}

const AppEntryPoint =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('../../.storybook/react-native').default
    : App;

export default AppEntryPoint;

registerRootComponent(AppEntryPoint);
