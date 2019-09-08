import { StyleSheet } from 'react-native';

const gameStyle = StyleSheet.create({
  info: {
    zIndex: 3,
    position: 'absolute',
    left: 5,
    top: 5,
  },
  map: {
    width: 852,
    height: '100%',
    zIndex: 1,
  },
  city: {
    zIndex: 2,
    position: 'absolute',
  },
  cityPos: {
    color: 'darkslategrey',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default gameStyle;
