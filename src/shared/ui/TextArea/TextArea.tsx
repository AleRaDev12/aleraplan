import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { COLORS } from '../../lib/constants';

export type TProps = {
  text: string;
  onChange: (text: string) => void;
  placeholder?: string;
  isEditing?: boolean;
};

export const TextArea = ({ text, onChange, placeholder, isEditing }: TProps) => {
  const theme = useTheme();

  const textStyle = [
    STYLES.text,
    {
      color: theme.colors.onSurface,
      ...theme.fonts.bodyLarge,
    },
  ];

  return (
    <View
      style={[
        STYLES.container,
        { backgroundColor: theme.colors.backdrop },
        isEditing ? { borderColor: theme.colors.primary } : undefined,
      ]}
    >
      {isEditing ? (
        <TextInput
          multiline
          value={text}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          style={textStyle}
        />
      ) : (
        <ScrollView
          style={STYLES.scrollView}
          contentContainerStyle={STYLES.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Text selectable={true} style={textStyle}>
            {text || placeholder}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.transparent,
  },
  text: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
