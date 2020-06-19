import React, { useEffect } from 'react';
import { BackHandler, Platform, StyleSheet } from 'react-native';

import { Box } from './Box';
import { Button } from './Button';
import { IconProps } from './Icon';
import { Text } from './Text';
import { TouchableIcon } from './TouchableIcon';

export interface ToolbarProps {
  title: string;
  onBackClicked(): void;
  navText?: string;
  navLabel?: string;
}

export const Toolbar = ({ title, navText, navLabel, onBackClicked }: ToolbarProps) => {
  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBackClicked();
      return true;
    });
    return () => subscription.remove();
  }, [onBackClicked]);

  if (Platform.OS === 'android') {
    return (
      <Box
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        padding="s"
        maxHeight={title !== '' ? 150 : 60}>
        {navText && <Button paddingLeft="m" variant="text" text={navText} onPress={onBackClicked} />}
        {title !== '' && (
          <Box padding="m">
            <Text variant="bodyTitle" color="overlayBodyText" accessibilityRole="header">
              {title}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      padding="m"
      minHeight={title !== '' ? 150 : 60}>
      <Box>
        <Button text={navText} variant="text" onPress={onBackClicked} />
      </Box>
      {title !== '' && (
        <Box paddingTop="m">
          <Text variant="bodyTitle" color="overlayBodyText" accessibilityRole="header">
            {title}
          </Text>
        </Box>
      )}
      <Box style={styles.invisible}>
        <Button disabled text={navText} variant="text" onPress={() => { }} />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  invisible: {
    opacity: 0,
  },
});
