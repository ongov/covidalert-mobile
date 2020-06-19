import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Text, Button, Icon } from "components";
import { useNavigation } from '@react-navigation/native';
import { useStorage } from 'services/StorageService';
import { useI18n } from '@shopify/react-i18n';
import { StyleSheet, Image, ScrollView } from 'react-native';


export const SplashScreen = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const { isOnboarding } = useStorage();

  const next = useCallback(() => navigation.reset({
    index: 0,
    routes: [{ name: isOnboarding ? 'OnboardingNavigator' : 'Home' }],
  }), [navigation]);
  return (
    <Box
      flex={1}
      alignItems="center"
      backgroundColor="overlayBackground">
      <SafeAreaView style={styles.flex}>
        <Box alignItems="center" marginTop="xxl" marginHorizontal="l">
          <Text variant="bodyTitle">{i18n.translate('Home.AppName')}</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Box alignSelf="center">
              <Image source={require('../../assets/ontario-splash.png')} />
            </Box>
            {/* <Icon name="ontario-icon-splash-image" size={300} /> */}
            <Box marginBottom="l" marginTop="l">
              <Text variant="bodySubTitle">{i18n.translate('Onboarding.Body')}</Text>
            </Box>
            <Box>
              <Text variant="bodyText">{i18n.translate('Onboarding.Body2')}</Text>
            </Box>
            <Box alignSelf="center">
              <Icon name="ontario-icon-logo" size={150} />
            </Box>
          </ScrollView>
          <Box alignSelf="stretch" marginBottom="s">
            <Button
              variant="bigFlatWhite"
              color="secondaryBtnBorder"
              onPress={next}
              text={i18n.translate('Onboarding.ActionNext')}
            />
          </Box>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    alignItems: 'center'
  }
})
