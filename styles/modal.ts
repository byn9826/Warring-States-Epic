import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  modal: {
    position: 'absolute',
    left: 5,
    right: 5,
    top: 20,
    bottom: 0,
    zIndex: 3,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    display: 'flex',
    padding: 10,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerClose: {
    width: 25,
    height: 25,
  },
});

export default modalStyle;
