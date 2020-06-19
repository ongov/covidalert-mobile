import React, {useMemo, useState, useEffect} from 'react';
import {AppState, AppStateStatus, DevSettings} from 'react-native';
import {BottomSheet, Box} from 'components';
import {
  useExposureStatus,
  useSystemStatus,
  SystemStatus,
  useStartExposureNotificationService,
} from 'services/ExposureNotificationService';
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useMaxContentWidth} from 'shared/useMaxContentWidth';

import {ExposureNotificationsDisabledView} from './views/ExposureNotificationsDisabledView';
import {BluetoothDisabledView} from './views/BluetoothDisabledView';
import {NetworkDisabledView} from './views/NetworkDisabledView';
import {DiagnosedView} from './views/DiagnosedView';
import {DiagnosedShareView} from './views/DiagnosedShareView';
import {ExposureView} from './views/ExposureView';
import {NoExposureView} from './views/NoExposureView';
import {OverlayView} from './views/OverlayView';
import {CollapsedOverlayView} from './views/CollapsedOverlayView';
import { useI18n } from '@shopify/react-i18n';
import { useStorage } from 'services/StorageService';

import { Text, Button } from '../../components';
import { palette } from 'shared/theme';

type NotificationPermission = 'denied' | 'granted' | 'unavailable' | 'blocked';

const useNotificationPermissionStatus = (): [string, () => void] => {
  const [status, setStatus] = useState<NotificationPermission>('granted');

  checkNotifications()
    .then(({ status }) => {
      setStatus(status);
    })
    .catch(error => {
      console.log(error);
      setStatus('unavailable');
    });

  const request = () => {
    requestNotifications(['alert'])
      .then(({ status }) => {
        setStatus(status);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return [status === 'granted' ? status : 'denied', request];
};

interface ThankYouProps {
  setThankYouClosed: (value: boolean) => void;
}

const ThankYou = ({ setThankYouClosed }: ThankYouProps) => {
  const [i18n] = useI18n();
  const { setOnboarded } = useStorage();
  return (
    <Box
      backgroundColor="overlayBackground"
      padding="l"
      borderRadius={4}
      alignSelf="stretch"
    >
      <Box marginBottom="l">
        <Text variant="bodyTitle">{i18n.translate('ThankYou.Title')}</Text>
      </Box>
      <Box marginBottom="l">
        <Text variant="bodyText">{i18n.translate('ThankYou.Body')}</Text>
      </Box>
      <Button
        variant="bigFlat"
        text={i18n.translate('ThankYou.Dismiss')}
        onPress={() => {
          setOnboarded(true);
          setThankYouClosed(true);
        }}
      />
    </Box>
  );
}

interface ContentProps {
  setBackgroundColor: (color: string) => void;
}

const Content = ({ setBackgroundColor }: ContentProps) => {
  const [exposureStatus, updateExposureStatus] = useExposureStatus();
  const [systemStatus, updateSystemStatus] = useSystemStatus();
  const startExposureNotificationService = useStartExposureNotificationService();

  useEffect(() => {
    startExposureNotificationService();
  }, [startExposureNotificationService]);

  const network = useNetInfo();

  useEffect(() => {
    const updateStatus = (newState: AppStateStatus) => {
      if (newState === 'active') {
        updateExposureStatus();
        updateSystemStatus();
      }
    };

    AppState.addEventListener('change', updateStatus);

    return () => {
      AppState.removeEventListener('change', updateStatus);
    };
  }, [updateExposureStatus, updateSystemStatus]);
  switch (exposureStatus.type) {
    case 'exposed':
      setBackgroundColor(palette.teal);
      return <ExposureView />;
    case 'diagnosed':
      if (exposureStatus.needsSubmission) {
        setBackgroundColor(palette.teal);
      }
      else {
        setBackgroundColor(palette.lime);
      }
      return exposureStatus.needsSubmission ? <DiagnosedShareView /> : <DiagnosedView />;
    case 'monitoring':
    default:
      if (!network.isConnected) {
        setBackgroundColor(palette.warning);
        return <NetworkDisabledView />;
      }
      switch (systemStatus) {
        case SystemStatus.Disabled:
        case SystemStatus.Restricted:
          setBackgroundColor(palette.warning);
          return <ExposureNotificationsDisabledView />;
        case SystemStatus.BluetoothOff:
          setBackgroundColor(palette.warning);
          return <BluetoothDisabledView />;
        case SystemStatus.Active:
        case SystemStatus.Unknown:
          setBackgroundColor(palette.lime);
          return <NoExposureView />;
      }
  }
};

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOnboarding } = useStorage();

  React.useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Show Test Menu', () => {
        navigation.dispatch(DrawerActions.openDrawer());
      });
    }
  }, [navigation]);

  const [systemStatus] = useSystemStatus();
  const [notificationStatus, turnNotificationsOn] = useNotificationPermissionStatus();
  const showNotificationWarning = notificationStatus === 'denied';
  const [thankYouClosed, setThankYouClosed] = useState(systemStatus === SystemStatus.Disabled);
  const collapsedContent = useMemo(
    () => (
      <CollapsedOverlayView
        status={systemStatus}
        notificationWarning={showNotificationWarning}
        turnNotificationsOn={turnNotificationsOn}
      />
    ),
    [showNotificationWarning, systemStatus, turnNotificationsOn],
  );

  const maxWidth = useMaxContentWidth();
  const [backgroundColor, setBackgroundColor] = useState<string>(palette.lime);
  return (
    <Box flex={1} alignItems="center" style={{
      backgroundColor
    }}>
      <Box flex={1} maxWidth={maxWidth} paddingTop="m">
        <Content setBackgroundColor={setBackgroundColor} />
      </Box>
      {!thankYouClosed && (
        <ThankYou setThankYouClosed={setThankYouClosed} />
      )}
      {thankYouClosed && (
        <BottomSheet
          // need to change the key here so bottom sheet is rerendered. This is because the snap points change.
          key={showNotificationWarning ? 'notifications-disabled' : 'notifications-enabled'}
          collapsedContent={collapsedContent}
          extraContent={showNotificationWarning}
        >
          <OverlayView
            status={systemStatus}
            notificationWarning={showNotificationWarning}
            turnNotificationsOn={turnNotificationsOn}
            maxWidth={maxWidth}
          />
        </BottomSheet>
      )}

    </Box>
  );
};
