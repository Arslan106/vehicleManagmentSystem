import {COLORS} from '@src/constants';
import React from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';

export const TextInput = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  customStyle,
}) => {
  // render
  return (
    <RNTextInput
      style={[styles.input, customStyle]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginTop: 10,
    color: COLORS.BLACK,
  },
});
