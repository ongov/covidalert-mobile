import React from 'react';
import {Box, Text} from 'components';
import {useI18n} from '@shopify/react-i18n';
import {SystemStatus} from 'services/ExposureNotificationService';

import {StatusHeaderView} from './StatusHeaderView';

interface Props {
  status: SystemStatus;
  notificationWarning: boolean;
  turnNotificationsOn: () => void;
}

export const CollapsedOverlayView = ({status, notificationWarning}: Props) => {
  const [i18n] = useI18n();
  return (
    <Box>
      <Box marginBottom="m">
        <StatusHeaderView enabled={status === SystemStatus.Active} />
      </Box>
      {notificationWarning && (
        <Box
          backgroundColor="errorBackground"
          borderLeftWidth={2}
          borderColor="errorBorder"
          padding="m"
          flex={1}
          marginHorizontal="s"
          marginBottom="xs"
          justifyContent="center"
          flexDirection="row"
        >
          <Text variant="overlayTitle" color="overlayBodyText" accessibilityRole="header">
            {i18n.translate('OverlayClosed.NotificationStatus')}
          </Text>
          <Text variant="overlayTitle" color="overlayBodyText" fontFamily="Raleway-Bold" accessibilityRole="header">
            {i18n.translate('OverlayClosed.NotificationStatusOff')}
          </Text>
        </Box>
      )}
      <Text variant="smallText" color="bodyTextSubdued" textAlign="center">
        {i18n.translate('OverlayClosed.TapPrompt')}
      </Text>
    </Box>
  );
};
