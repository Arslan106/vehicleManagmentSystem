import {COLORS} from '@src/constants';
import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

export const Text = ({children, customStyle, theme}) => {
  // render
  return (
    <RNText style={[styles({theme}).textTheme, customStyle]}>{children}</RNText>
  );
};

const styles = ({theme}) =>
  StyleSheet.create({
    textTheme: {
      color: theme ? COLORS.BLACK : COLORS.WHITE,
    },
  });
