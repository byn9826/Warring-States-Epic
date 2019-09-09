import { StyleSheet } from 'react-native';

const infoModalStyle = StyleSheet.create({
  infoModalSection: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  sectionTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default infoModalStyle;
