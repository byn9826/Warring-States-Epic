import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import cityModalStyle from '../../styles/cityModal';
import StateName from '../StateName';

export default function CityModal({ stores, actions }: PROPS) {
  const city: CITY = stores.modalData;
  return (
    <View style={cityModalStyle.cityModal}>
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>势力范围</Text>
        {
          city.statesControl.map((stateControl, code) => {
            if (stateControl === 0) {
              return null;
            }
            return (
              <View key={stores.states[code].code} style={cityModalStyle.sectionControl}>
                <StateName state={stores.states[code]} />
                <Text style={cityModalStyle.controlPercent}>
                  {`${stateControl}%`}
                </Text>
                <View style={cityModalStyle.controlBar}>
                  <ProgressBar progress={stateControl / 100} height={10} width={null} />
                </View>
              </View>
            );
          })
        }
      </View>
    </View>
  );
}
