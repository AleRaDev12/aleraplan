import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export const FutureMessage = () => {
  const theme = useTheme();

  return (
    <View style={STYLES.container}>
      <Text variant="headlineSmall" style={[STYLES.title, { color: theme.colors.onSurface }]}>
        📝 Diary
      </Text>
      <Text variant="bodyLarge" style={[STYLES.message, { color: theme.colors.onSurfaceVariant }]}>
        Entries can only be created for past days.
      </Text>
      <Text variant="bodyMedium" style={[STYLES.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        Diary is intended for recording events that have already happened.
      </Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
