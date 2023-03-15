import {COLORS} from '@src/constants';
import { scale } from '@src/helpers';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    flexDirection:'row',
    justifyContent:'center',
  },
  footerText: {
    fontSize: scale(14),
    color: COLORS.BLACK,
  },
  footerLink: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
});
