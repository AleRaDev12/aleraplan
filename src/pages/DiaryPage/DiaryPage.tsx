import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { DiaryEditor } from '../../widgets/diary-editor';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DiaryPage: FC = () => {
  const theme = useTheme();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();

  return (
    <View
      style={[
        STYLES.container,
        { backgroundColor: theme.colors.background },
        { paddingBottom: bottomInset, paddingTop: topInset },
      ]}
    >
      <DiaryEditor />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
});
