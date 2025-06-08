import { useCallback, useEffect, useState } from 'react';
import { useDiaryEntry, useSaveDiaryEntry, useDeleteDiaryEntry } from '../../../entities/diary';

type TUseDiaryEditProps = {
  date: string;
};

export const useDiaryEdit = ({ date }: TUseDiaryEditProps) => {
  const { data: entry, isLoading } = useDiaryEntry(date);
  const { mutate: saveEntry, isPending: isSavingEntry } = useSaveDiaryEntry();
  const { mutate: deleteEntry, isPending: isDeletingEntry } = useDeleteDiaryEntry();

  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (entry?.text !== undefined) {
      setCurrentText(entry.text);
    } else if (!entry) {
      setCurrentText('');
    }
  }, [entry?.text]);

  useEffect(() => {
    setIsEditing(false);
    setSaveError(null);
  }, [date]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleStopEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleTextChange = useCallback((text: string) => {
    setCurrentText(text);
  }, []);

  const handleSave = useCallback(() => {
    if (isSaving || isSavingEntry || isDeletingEntry) return;

    setIsSaving(true);
    setSaveError(null);

    if (currentText.trim().length === 0) {
      deleteEntry(date, {
        onSuccess: () => {
          setIsSaving(false);
          setIsEditing(false);
          setCurrentText('');
        },
        onError: error => {
          setIsSaving(false);
          setSaveError(error instanceof Error ? error.message : 'Delete error');
        },
      });
    } else {
      saveEntry(
        { date, text: currentText },
        {
          onSuccess: () => {
            setIsSaving(false);
            setIsEditing(false);
          },
          onError: error => {
            setIsSaving(false);
            setSaveError(error instanceof Error ? error.message : 'Save error');
          },
        },
      );
    }
  }, [date, currentText, isSaving, isSavingEntry, isDeletingEntry, saveEntry, deleteEntry]);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      handleSave();
    } else {
      handleStartEdit();
    }
  }, [isEditing, handleSave, handleStartEdit]);

  return {
    isEditing,
    currentText,
    isSaving: isSaving || isSavingEntry || isDeletingEntry,
    saveError,
    isLoading,
    handleStartEdit,
    handleStopEdit,
    handleTextChange,
    handleSave,
    toggleEdit,
  };
};
