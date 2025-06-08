import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDiaryNavigation } from '../../lib/useDiaryNavigation';

const ICON_SIZE = 24;

export type TProps = {
  isEditing: boolean;
  onEditPress: () => void;
};

export const DiaryNavigationPanel: FC<TProps> = ({ isEditing, onEditPress }) => {
  const {
    canGoNext,
    shouldShowJumpToPast,
    shouldShowJumpToFuture,
    goToPreviousDay,
    goToNextDay,
    jumpToPastEntry,
    jumpToFutureEntry,
  } = useDiaryNavigation();

  return (
    <View style={STYLES.container}>
      <IconButton icon="undo" size={ICON_SIZE} onPress={jumpToPastEntry} disabled={!shouldShowJumpToPast} />
      <IconButton icon="arrow-left" size={ICON_SIZE} onPress={goToPreviousDay} />
      <IconButton icon={isEditing ? 'check' : 'pencil'} size={ICON_SIZE} onPress={onEditPress} />
      <IconButton icon="arrow-right" size={ICON_SIZE} onPress={goToNextDay} disabled={!canGoNext} />
      <IconButton icon="redo" size={ICON_SIZE} onPress={jumpToFutureEntry} disabled={!shouldShowJumpToFuture} />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
