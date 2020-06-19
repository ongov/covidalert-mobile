import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {Box, Text, Button, Icon} from 'components';
import {useI18n} from '@shopify/react-i18n';
import {useReportDiagnosis} from 'services/ExposureNotificationService';

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export const ConsentView = ({onSuccess, onError}: Props) => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {fetchAndSubmitKeys} = useReportDiagnosis();

  const toPrivacyPolicy = useCallback(() => navigation.navigate('Privacy'), [navigation]);

  const handleUpload = useCallback(async () => {
    setLoading(true);
    try {
      await fetchAndSubmitKeys();
      setLoading(false);
      onSuccess();
    } catch {
      setLoading(false);
      onError();
    }
  }, [fetchAndSubmitKeys, onError, onSuccess]);

  if (loading) {
    return (
      <Box margin="xxl" flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#0278A4" />
      </Box>
    );
  }
  return (
    <>
      <ScrollView style={styles.flex}>
        <Box paddingHorizontal="l" marginBottom="m" marginTop="s" flexDirection="row">
          <Text variant="bodyText" color="overlayBodyText" marginLeft="m" marginRight="l">
            {i18n.translate('DataUpload.ConsentBody')}
          </Text>
        </Box>
        <Box paddingHorizontal="l" marginBottom="xl" flexDirection="row">
          <Text variant="bodyText" color="overlayBodyText" marginLeft="m" marginRight="l">
            {i18n.translate('DataUpload.ConsentBody2')}
          </Text>
        </Box>
        <Box paddingHorizontal="l" marginBottom="l">
          <Button variant="text" text={i18n.translate('DataUpload.PrivacyPolicyLink')} onPress={toPrivacyPolicy} />
        </Box>
      </ScrollView>
      <Box paddingHorizontal="m" marginBottom="m">
        <Button variant="bigFlat" text={i18n.translate('DataUpload.ConsentAction')} onPress={handleUpload} />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
