import React, { useState } from 'react';
import {
  ScrollView, TouchableHighlight, Image, Text,
} from 'react-native';
import cities from '../definitions/cities';
import states from '../definitions/states';
import gameStyle from '../styles/game';

export default function Game({ stores, actions }) {
  return (
    <ScrollView horizontal>
      <Image
        source={require('../assets/map.jpg')}
        resizeMode="stretch"
        style={gameStyle.map}
      />
      {
        cities.map((city) => [
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
              backgroundColor: states[city.stateCode].color,
            }}
          >
            <Text style={gameStyle.cityLoc}>
              {states[city.stateCode].name}
            </Text>
          </TouchableHighlight>,
        ])
      }
    </ScrollView>
  );
}
