import React, {useCallback} from 'react';
import {TouchableOpacity, TouchableOpacityProps, Linking} from 'react-native';
import {Box, Text, Icon, IconProps} from 'components';
import {useNavigation} from '@react-navigation/native';
import {useI18n} from '@shopify/react-i18n';

interface InfoShareItemProps extends TouchableOpacityProps {
  onPress: () => void;
  text: string;
  icon: IconProps['name'];
}
const InfoShareItem = ({onPress, text, icon, ...touchableProps}: InfoShareItemProps) => (
  <Box 
    backgroundColor="infoBlockNeutralBackground" 
    paddingHorizontal="m" 
    marginTop="xs"
    borderRadius={4}>
    <TouchableOpacity onPress={onPress} {...touchableProps}>
      <Box paddingVertical="s" flexDirection="row" alignContent="center" justifyContent="space-between">
        <Text variant="bodyText" marginVertical="s" color="overlayBodyText">
          {text}
        </Text>
        <Box alignSelf="center">
          <Icon size={32} name={icon} />
        </Box>
      </Box>
    </TouchableOpacity>
    <Box height={1} marginHorizontal="-m" backgroundColor="overlayBackground" />
  </Box>
);

export const InfoShareView = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const onSelfAssessment = useCallback(() => {
    Linking.openURL(i18n.translate('Info.SelfAssessmentUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);
  const onShare = useCallback(() => navigation.navigate('Sharing'), [navigation]);
  const onPrivacy = useCallback(() => navigation.navigate('Privacy'), [navigation]);
  const onLearnMore = useCallback(() => navigation.navigate('OnboardingNavigator'), [navigation]);
  const onLanguage = useCallback(() => navigation.navigate('LanguageSelect'), [navigation]);

  return (
    <>
      <Box>
        <InfoShareItem
          onPress={onSelfAssessment}
          text={i18n.translate('Info.TakeSelfAssessment')}
          icon="icon-external-arrow"
          accessibilityLabel={i18n.translate('Info.TakeSelfAssessment')}
          accessibilityRole="link"
          accessibilityHint={i18n.translate('Home.ExternalLinkHint')}
        />
        <InfoShareItem onPress={onShare} text={i18n.translate('Info.Shareapp')} icon="icon-share" />
        <InfoShareItem onPress={onLearnMore} text={i18n.translate('Info.LearnMore')} icon="icon-chevron" />
      </Box>
      <Box marginTop="s">
        <InfoShareItem onPress={onLanguage} text={i18n.translate('Info.ChangeLanguage')} icon="icon-chevron" />
        <InfoShareItem onPress={onPrivacy} text={i18n.translate('Info.Privacy')} icon="icon-chevron" />
      </Box>
    </>
  );
};
