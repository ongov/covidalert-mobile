import React from 'react';
import {useTheme, SpacingProps} from '@shopify/restyle';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  AccessibilityRole,
} from 'react-native';
import {Theme, palette} from 'shared/theme';
import {useI18n} from '@shopify/react-i18n';

import {Box} from './Box';
import {Ripple} from './Ripple';
import {Icon} from './Icon';

export interface ButtonProps {
  text?: string;
  onPress: () => void;
  variant: keyof Theme['buttonVariants'];
  color?: keyof Theme['colors'];
  disabled?: boolean;
  loading?: boolean;
  externalLink?: boolean;
}

export const Button = ({
  text,
  onPress,
  variant,
  color: buttonColorName,
  disabled,
  loading,
  externalLink,
  paddingHorizontal="m",
  paddingVertical="none",
  paddingBottom="none",
  paddingTop="none",
  paddingLeft="none",
  paddingRight="none",
}: ButtonProps & SpacingProps<Theme>) => {
  const [i18n] = useI18n();
  const theme = useTheme<Theme>();
  const variantProps = theme.buttonVariants[variant];
  const disabledProps = disabled ? variantProps.disabled || {} : {};
  const themedStyles = {...variantProps, ...disabledProps};
  const {fontSize, fontWeight, fontFamily, color, borderWidth, height} = (themedStyles as unknown) as TextStyle &
    ViewStyle;
  const textColor = themedStyles.textColor;
  const buttonColor = buttonColorName && theme.colors[buttonColorName];

  const onPressHandler = loading ? () => {} : onPress;
  const externalLinkProps = externalLink
    ? {
        accessibilityLabel: text,
        accessibilityHint: i18n.translate('Home.ExternalLinkHint'),
        accessibilityRole: 'link' as AccessibilityRole,
      }
    : {};
  const externalArrowIcon = textColor === palette.systemWhite ? 'icon-external-arrow-light' : 'icon-external-arrow';

  const content = (
    <Box
      borderRadius={4}
      alignItems="center"
      justifyContent="center"
      style={{backgroundColor: color, minHeight: height, borderWidth, borderColor: buttonColor}}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      flexDirection="row"
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="large" />
      ) : (
        <>
          <Text style={{...styles.content, color: textColor || buttonColor, fontWeight, fontFamily, fontSize}}>
            {text}
          </Text>
          {externalLink && <Icon name={externalArrowIcon} />}
        </>
      )}
    </Box>
  );

  const accessibilityProps = {
    accessibilityRole: 'button' as 'button',
    accessibilityState: {disabled},
    ...externalLinkProps,
  };

  if (Platform.OS === 'android') {
    return (
      <Ripple rippleContainerBorderRadius={4} onPress={onPressHandler} {...accessibilityProps}>
        {content}
      </Ripple>
    );
  }
  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.stretch} disabled={disabled} {...accessibilityProps}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stretch: {
    alignSelf: 'stretch',
  },
  content: {
    textAlign: 'center',
  },
});
