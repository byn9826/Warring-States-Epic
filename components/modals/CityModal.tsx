import React from 'react';
import {
  View, Text,
} from 'react-native';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import cityTypes from '../../definitions/cityTypes';

export default function CityModal({ stores, actions }: PROPS) {
  const city: CITY = stores.modalData;
  return (
    <View>
      <Text>
        {cityTypes[city.type].name}
      </Text>
    </View>
  );
}
