import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Box, Text, Icon} from 'components';
import {useI18n} from '@shopify/react-i18n';

export const HowItWorks = () => {
  const [i18n] = useI18n();
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Box paddingHorizontal="xl">
        <Box alignSelf="center">
          <Icon name="ontario-icon-bluetooth-onboarding" size={300}/>
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
            {i18n.translate('OnboardingHowItWorks.Title')}
          </Text>
        </Box>
        <Box marginBottom="l">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingHowItWorks.Body')}
          </Text>
        </Box>
        <Box marginBottom="l">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingHowItWorks.Body2')}
          </Text>
        </Box>
        <Box marginBottom="l">
          <Text variant="bodyText" color="overlayBodyText">
            {i18n.translate('OnboardingHowItWorks.Body3')}
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
