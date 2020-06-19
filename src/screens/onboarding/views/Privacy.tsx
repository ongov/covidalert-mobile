import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Text, Icon } from 'components';
import { useI18n } from '@shopify/react-i18n';

export const Privacy = () => {
  const [i18n] = useI18n();
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Box paddingHorizontal="xl">
        <Box alignSelf="center">
          <Icon name="ontario-icon-lock" size={200} />
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
            {i18n.translate('OnboardingPrivacy.Title')}
          </Text>
        </Box>
        <Box marginBottom="l">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body1')}
          </Text>
        </Box>
        <Box marginBottom="l" flexDirection="row" alignItems="center">
          <Text variant="bulletText" marginRight="s">•</Text>
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body2')}
          </Text>
        </Box>
        <Box marginBottom="l" flexDirection="row" alignItems="center">
          <Text variant="bulletText" marginRight="s">•</Text>
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body3')}
          </Text>
        </Box>
        <Box marginBottom="l" flexDirection="row" alignItems="center">
          <Text variant="bulletText" marginRight="s">•</Text>
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body4')}
          </Text>
        </Box>
        <Box marginBottom="l" flexDirection="row" alignItems="center">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body5')}
          </Text>
        </Box>
        <Box marginBottom="l" flexDirection="row" alignItems="center">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingPrivacy.Body6')}
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
