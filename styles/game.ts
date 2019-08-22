import { StyleSheet } from 'react-native';

const gameStyle = StyleSheet.create({
  map: {
    width: 852,
    height: '100%',
    zIndex: 1,
  },
  city: {
    zIndex: 2,
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityPos: {
    color: 'darkslategrey',
  },
  cityLoc: {
    color: 'white',
    padding: 5,
  },
});

export default gameStyle;
