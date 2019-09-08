import React, { useState } from 'react';
import {
  ScrollView, TouchableHighlight, Image, Text,
} from 'react-native';
import PROPS from '../types/props';
import gameStyle from '../styles/game';
import StateName from '../components/StateName';

export default function Game({ stores, actions }: PROPS) {
  return (
    <ScrollView horizontal>
      <TouchableHighlight
        onPress={() => actions.openModal('INFO')}
        style={gameStyle.info}
      >
        <Image source={require('../assets/icons/statistics.png')} />
      </TouchableHighlight>
      <Image
        source={require('../assets/map.jpg')}
        resizeMode="stretch"
        style={gameStyle.map}
      />
      {
        stores.cities.map((city) => [
          <Text
            key={`pos${city.code}`}
            style={{
              ...gameStyle.city,
              ...gameStyle.cityPos,
              left: city.position.left,
              top: city.position.top,
            }}
          >
            {city.name}
          </Text>,
          <TouchableHighlight
            key={`loc${city.code}`}
            onPress={() => actions.openModal('CITY', city)}
            style={{
              ...gameStyle.city,
              left: city.location.left,
              top: city.location.top,
            }}
          >
            <StateName state={stores.states[city.stateCode]} />
          </TouchableHighlight>,
        ])
      }
    </ScrollView>
  );
}
