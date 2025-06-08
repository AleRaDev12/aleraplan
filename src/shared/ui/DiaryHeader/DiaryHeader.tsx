import { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { dateUtils } from '../../lib/date';

const ICON_SIZE = 24;

export type TProps = {
  date: Date;
};

export const DiaryHeader: FC<TProps> = ({ date }) => {
  const formattedDate = dateUtils.formatDisplayDate(date);

  return (
    <View style={STYLES.header}>
      <View style={STYLES.headerLeft}>
        <Icon size={ICON_SIZE} source="calendar" />
        <Text variant="headlineSmall">{formattedDate}</Text>
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
});
