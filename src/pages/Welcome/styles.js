import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.basePadding * 2,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: colors.secundary,
  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },

  text: {
    color: colors.lighter,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  error: {
    color: colors.danger,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
  },

  input: {
    height: 44,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
  },

  button: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default styles;
