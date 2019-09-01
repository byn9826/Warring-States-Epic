import { StyleSheet } from 'react-native';

const cityModalStyle = StyleSheet.create({
  cityModal: {
    display: 'flex',
  },
  cityModalSection: {
    display: 'flex',
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionControl: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  controlPercent: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  controlBar: {
    display: 'flex',
    justifyContent: 'center',
    width: 300,
  },
});

export default cityModalStyle;
