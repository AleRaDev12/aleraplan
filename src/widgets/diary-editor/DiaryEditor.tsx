import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { DiaryHeader } from '../../shared/ui/DiaryHeader';
import { EditableDiaryText, useDiaryEdit, FutureMessage } from '../../features/diary-editing';
import { DiaryNavigationPanel, useDiaryNavigation } from '../../features/diary-navigation';
import { dateUtils } from '../../shared/lib/date';
import { LAYOUT } from '../../shared/lib/constants';

export type TProps = Record<string, never>;

export const DiaryEditor: FC<TProps> = () => {
  const { currentDate, isFutureDate } = useDiaryNavigation();
  const currentDateKey = dateUtils.formatDateKey(currentDate);

  const { isEditing, currentText, handleTextChange, toggleEdit } = useDiaryEdit({ date: currentDateKey });

  return (
    <View style={STYLES.container}>
      <View style={STYLES.header}>
        <DiaryHeader date={currentDate} />
      </View>

      <View style={STYLES.content}>
        {isFutureDate ? (
          <FutureMessage />
        ) : (
          <EditableDiaryText
            text={currentText}
            isEditing={isEditing}
            onTextChange={handleTextChange}
            placeholder="What happened today?"
          />
        )}
      </View>

      <View style={STYLES.navigation}>
        <DiaryNavigationPanel isEditing={isEditing} onEditPress={toggleEdit} />
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.screen.horizontalIndents,
  },
  header: {
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
  navigation: {},
});
