import { StyleSheet } from 'react-native';

const cityModalStyle = StyleSheet.create({
  cityModalSection: {
    display: 'flex',
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContainer: {
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
  armyDetail: {
    marginLeft: 20,
    marginTop: 5,
  },
  officerDetail: {
    marginLeft: 20,
    marginTop: 5,
  },
  acceptanceDetail: {
    marginRight: 20,
    marginTop: 5,
  },
  businessmanDetail: {
    marginLeft: 20,
    marginTop: 5,
  },
});

export default cityModalStyle;
