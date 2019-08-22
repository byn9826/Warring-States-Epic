import React from 'react';
import { ScrollView, Image, Text } from 'react-native';
import gameStyle from '../styles/game';
import cities from '../definitions/cities';
import states from '../definitions/states';

export default function Game() {
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
          <Text
            key={`loc${city.code}`}
            style={{
              ...gameStyle.city,
              ...gameStyle.cityLoc,
              left: city.location.left,
              top: city.location.top,
              backgroundColor: states[city.stateCode].color,
            }}
          >
            {states[city.stateCode].name}
          </Text>,
        ])
      }
    </ScrollView>
  );
}
