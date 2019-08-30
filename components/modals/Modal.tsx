import React from 'react';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';
import CityModal from './CityModal';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import modalStyle from '../../styles/modal';

export default function Modal({ stores, actions }: PROPS) {
  const city: CITY = stores.modalData;
  let modalTitle;
  let modalBody;
  switch (stores.modalType) {
    case 'CITY':
      modalTitle = city.name;
      modalBody = <CityModal stores={stores} actions={actions} />;
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
      <View>
        {modalBody}
      </View>
    </View>
  );
}
