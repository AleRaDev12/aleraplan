import { FC } from 'react';
import { TextArea } from '../../../../shared/ui/TextArea/TextArea';

export type TProps = {
  text: string;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  placeholder?: string;
};

export const EditableDiaryText: FC<TProps> = ({ text, isEditing, onTextChange, placeholder = 'Start writing...' }) => {
  return <TextArea text={text} onChange={onTextChange} placeholder={placeholder} isEditing={isEditing} />;
};
