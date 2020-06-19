import React from 'react';
import { Theme } from 'shared/theme';

import { Box } from './Box';
import { Button } from './Button';
import { Icon, IconProps } from './Icon';
import { Text } from './Text';

export interface InfoBlockProps {
  icon?: IconProps['name'];
  text: string[];
  title?: string;
  titleBolded?: string;
  linkPreText?: string;
  linkText?: string;
  linkAction?: () => void;
  color: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
  borderColor: keyof Theme['colors'];
  button?: {
    text?: string;
    action?: () => void;
  };
  isError?: boolean;
}

export const InfoBlock = ({
  icon,
  text,
  linkPreText,
  linkText,
  linkAction,
  button,
  color,
  backgroundColor,
  title,
  titleBolded,
  borderColor,
  isError
}: InfoBlockProps) => {
  const btnVariant = isError ? "bigFlatWhite" : "bigFlat";
  const btnColor = isError ? "secondaryBtnBorder" : color;

  return (
    <Box
      borderLeftColor={borderColor}
      borderLeftWidth={4}
      backgroundColor={backgroundColor}
      padding="m"
      alignItems="flex-start">
      {(title || titleBolded) && (
        <Box marginBottom="m" justifyContent="center" flexDirection="row" flexWrap="wrap">
          {icon && (
            <Icon name={icon} size={24} />
          )}
          {title && (
            <Text variant="alertTitle" accessibilityRole="header" color={color} marginLeft={icon ? "s" : "none"}>
              {title}
            </Text>
          )}
          {titleBolded && (
            <Box alignSelf="center">
              <Text variant="alertTitle" accessibilityRole="header" color={color} fontFamily="Raleway-Bold">
                {titleBolded}
              </Text>
            </Box>
          )}
        </Box>
      )}
      {linkAction && (
        <Box flexDirection="row" marginBottom="m">
          <Text variant="bodyText" fontSize={16} color={color}>{linkPreText}</Text>
          <Button
            variant="smallText"
            onPress={() => linkAction && linkAction()}
            text={linkText}
            paddingHorizontal="none"
          />
        </Box>
      )}
      {text.map((t, index) => (
        <Text key={index} variant="bodyText" fontSize={16} color={color} marginBottom="m">
          {t}
        </Text>
      ))}
      {button && (
        <Box marginHorizontal="none" alignSelf="stretch">
          <Button text={button?.text} onPress={() => button?.action && button.action()} variant={btnVariant} color={btnColor} />
        </Box>
      )}
    </Box>
  );
};
