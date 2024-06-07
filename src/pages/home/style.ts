import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonContainer: {
    flex: 1,
    minHeight: 60,
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  confirmText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;
