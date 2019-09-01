import React from 'react';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';
import CityModal from './CityModal';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import cityTypes from '../../definitions/cityTypes';
import modalStyle from '../../styles/modal';

export default function Modal({ stores, actions }: PROPS) {
  let modalTitle;
  let modalBody;
  switch (stores.modalType) {
    case 'CITY': {
      const city: CITY = stores.modalData;
      modalTitle = (
        <View style={modalStyle.headerTitle}>
          <Text style={modalStyle.titleMain}>
            {city.name}
          </Text>
          <Text style={modalStyle.titleSub}>
            {cityTypes[city.type].name}
          </Text>
        </View>
      );
      modalBody = <CityModal stores={stores} actions={actions} />;
      break;
    }
    default:
      return null;
  }
  return (
    <View style={modalStyle.modal}>
      <View style={modalStyle.modalHeader}>
        {modalTitle}
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
