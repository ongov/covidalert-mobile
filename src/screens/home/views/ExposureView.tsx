import React, {useCallback} from 'react';
import {Linking} from 'react-native';
import {useI18n} from '@shopify/react-i18n';
import {Text, Button, Box, LastCheckedDisplay} from 'components';

import {BaseHomeView} from '../components/BaseHomeView';

export const ExposureView = () => {
  const [i18n] = useI18n();
  const onFindAssessmentCentre = useCallback(() => {
    Linking.openURL(i18n.translate('Home.AssessmentCentreUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);
  const onTakeSelfAssessment = useCallback(() => {
    Linking.openURL(i18n.translate('Info.SelfAssessmentUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);
  return (
    <BaseHomeView iconName="ontario-icon-hand">
      <Text variant="bodyTitle" color="bodyText" marginBottom="l" accessibilityRole="header">
        {i18n.translate('Home.ExposureDetected')}
        {/* No exposure detected */}
      </Text>
      <Text variant="bodyText" color="bodyText">
        {i18n.translate('Home.ExposureDetectedDetailed')}
      </Text>
      <LastCheckedDisplay />
      <Box alignSelf="stretch" marginTop="l">
        <Button 
          text={i18n.translate('Home.FindAssessmentCentre')} 
          variant="bigFlatWhite" 
          color="secondaryBtnBorder" 
          onPress={onFindAssessmentCentre} 
        />  
        <Box marginTop="xs">
          <Button
            text={i18n.translate('Info.TakeSelfAssessment')} 
            variant="bigHollow" 
            color="hollowBtnColor" 
            onPress={onTakeSelfAssessment} 
          />
        </Box>      
      </Box>
    </BaseHomeView>
  );
};
