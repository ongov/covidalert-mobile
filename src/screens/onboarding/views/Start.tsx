import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Text, Button, Icon } from 'components';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '@shopify/react-i18n';

export const Start = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Box paddingHorizontal="xl">
        <Box alignSelf="center">
          <Icon name="ontario-icon-location-onboarding" size={200} />
        </Box>
        <Box paddingHorizontal="l" marginTop="m">
          <Text
            variant="bodyTitle"
            color="overlayBodyText"
            marginHorizontal="l"
            marginBottom="l"
            textAlign="center"
            accessibilityRole="header"
          >
            {i18n.translate('OnboardingLocation.Title')}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" marginBottom="l">
          <Text variant="bodyText" color="overlayBodyText" marginLeft="m" marginRight="m">
            {i18n.translate('OnboardingLocation.Body1')}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" marginBottom="l">
          <Text variant="bulletText" marginRight="s">•</Text>
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingLocation.Body2')}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" marginBottom="l">
          <Text variant="bulletText" marginRight="s">•</Text>
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingLocation.Body3')}
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
