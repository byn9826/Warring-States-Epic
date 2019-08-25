import React from 'react';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';
import modalStyle from '../../styles/modal';

export default function Modal({ stores, actions }) {
  let modalTitle;
  switch (stores.modalType) {
    case 'CITY':
      modalTitle = stores.modalData.name;
      break;
    default:
      return null;
  }
  return (
    <View style={modalStyle.modal}>
      <View style={modalStyle.modalHeader}>
        <Text style={modalStyle.headerTitle}>
          {modalTitle}
        </Text>
        <TouchableHighlight onPress={actions.closeModal}>
          <Image
            source={require('../../assets/icons/close.png')}
            style={modalStyle.headerClose}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}
