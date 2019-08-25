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
  },
  cityPos: {
    color: 'darkslategrey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityLoc: {
    color: 'white',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default gameStyle;
