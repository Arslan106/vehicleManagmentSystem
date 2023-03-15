import { COLORS } from '@src/constants';
import {Text} from '@src/core-ui';
import { scale, verticalScale } from '@src/helpers';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const Button = ({children, customStyle, customTextStyle, onPress}) => {
  // render
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnStyle, customStyle]}>
      <Text style={[styles.btnText, customTextStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: COLORS.PRIMARY,

    marginTop: verticalScale(18),
    height: verticalScale(40),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});
