import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, InfoBlock, BoxProps } from 'components';
import { useI18n, I18n } from '@shopify/react-i18n';
import { SystemStatus } from 'services/ExposureNotificationService';
import { useExposureStatus } from 'services/ExposureNotificationService';

import { InfoShareView } from './InfoShareView';
import { StatusHeaderView } from './StatusHeaderView';

const SystemStatusOff = ({ i18n }: { i18n: I18n }) => {
  const toSettings = useCallback(() => {
    Linking.openSettings();
  }, []);
  return (
    <InfoBlock
      title={i18n.translate('OverlayOpen.ExposureNotificationCardStatus')}
      titleBolded={i18n.translate('OverlayOpen.ExposureNotificationCardStatusOff')}
      text={[i18n.translate('OverlayOpen.ExposureNotificationCardBody')]}
      button={{ text: i18n.translate('OverlayOpen.ExposureNotificationCardAction'), action: toSettings }}
      backgroundColor="errorBackground"
      color="errorText"
      borderColor="errorBorder"
      isError
    />
  );
};

const BluetoothStatusOff = ({ i18n }: { i18n: I18n }) => {
  const toSettings = useCallback(() => {
    Linking.openSettings();
  }, []);
  return (
    <InfoBlock
      title={i18n.translate('OverlayOpen.BluetoothCardStatus')}
      titleBolded={i18n.translate('OverlayOpen.BluetoothCardStatusOff')}
      text={[i18n.translate('OverlayOpen.BluetoothCardBody')]}
      button={{ text: i18n.translate('OverlayOpen.BluetoothCardAction'), action: toSettings }}
      backgroundColor="errorBackground"
      color="errorText"
      borderColor="errorBorder"
      isError={true}
    />
  );
};

const NotificationStatusOff = ({ action, i18n }: { action: () => void; i18n: I18n }) => {
  return (
    <InfoBlock
      title={i18n.translate('OverlayOpen.NotificationCardStatus')}
      titleBolded={i18n.translate('OverlayOpen.NotificationCardStatusOff')}
      text={[i18n.translate('OverlayOpen.NotificationCardBody')]}
      button={{ text: i18n.translate('OverlayOpen.NotificationCardAction'), action }}
      backgroundColor="errorBackground"
      color="overlayBodyText"
      borderColor="errorBorder"
      isError={true}
    />
  );
};

interface Props extends Pick<BoxProps, 'maxWidth'> {
  status: SystemStatus;
  notificationWarning: boolean;
  turnNotificationsOn: () => void;
}

export const OverlayView = ({ status, notificationWarning, turnNotificationsOn, maxWidth }: Props) => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const [exposureStatus] = useExposureStatus();
  const submittedCode = exposureStatus.type === 'diagnosed' && !exposureStatus.needsSubmission;
  const onTestResultsViewer = useCallback(() => {
    Linking.openURL(i18n.translate('OverlayOpen.TestResultsViewerUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);

  return (
    <Box maxWidth={maxWidth}>
      <Box marginBottom="l">
        <StatusHeaderView enabled={status === SystemStatus.Active} />
      </Box>
      {submittedCode &&
        <Box marginBottom="m" marginHorizontal="m">
          <InfoBlock
            icon="ontario-icon-success"
            title={i18n.translate('DataUpload.ShareToast')}
            text={[
              i18n.translate('Home.SignalDataShared')
            ]}
            backgroundColor="successBackground"
            color="infoBlockBrightText"
            borderColor="successBorder"
          />
        </Box>
      }
      {status !== SystemStatus.Active && (
        <Box marginBottom="m" marginHorizontal="m">
          <SystemStatusOff i18n={i18n} />
        </Box>
      )}
      {status !== SystemStatus.Active && (
        <Box marginBottom="m" marginHorizontal="m">
          <BluetoothStatusOff i18n={i18n} />
        </Box>
      )}
      {notificationWarning && (
        <Box marginBottom="m" marginHorizontal="m">
          <NotificationStatusOff action={turnNotificationsOn} i18n={i18n} />
        </Box>
      )}
      <Box marginBottom="m" marginHorizontal="m">
        <InfoBlock
          title={i18n.translate('OverlayOpen.EnterCodeCardTitle')}
          linkPreText={i18n.translate('OverlayOpen.EnterCodeCardBody')}
          linkText={i18n.translate('OverlayOpen.TestResultsViewer')}
          linkAction={onTestResultsViewer}
          text={[
            i18n.translate('OverlayOpen.EnterCodeCardBody1'),
            i18n.translate('OverlayOpen.EnterCodeCardBody2'),
          ]}
          button={{
            text: i18n.translate('OverlayOpen.EnterCodeCardAction'),
            action: () => navigation.navigate('DataSharing'),
          }}
          backgroundColor="infoBlockBrightBackground"
          color="infoBlockBrightText"
          borderColor="infoBlockBorder"
        />
      </Box>
      <Box marginBottom="m" marginHorizontal="m">
        <InfoShareView />
      </Box>
    </Box>
  );
};
