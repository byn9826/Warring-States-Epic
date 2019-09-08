import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import cityModalStyle from '../../styles/cityModal';
import armyTypes from '../../definitions/armyTypes';
import StateName from '../StateName';
import officerTypes from '../../definitions/officerTypes';

export default function CityModal({ stores, actions }: PROPS) {
  const city: CITY = stores.modalData;
  return (
    <>
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>势力</Text>
        {
          city.statesControl.map((stateControl, code) => {
            if (stateControl === 0) {
              return null;
            }
            return (
              <View key={stores.states[code].code} style={cityModalStyle.sectionContainer}>
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
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>军营</Text>
        {
          city.statesArmyGroup.map((stateArmyGroup, code) => {
            if (stateArmyGroup.length === 0) {
              return null;
            }
            return (
              <View key={stores.states[code].code} style={cityModalStyle.sectionContainer}>
                <StateName state={stores.states[code]} />
                {
                  stateArmyGroup.map((army) => (
                    <Text key={army.code} style={cityModalStyle.armyDetail}>
                      {`${armyTypes[army.code].name}*${army.total}`}
                    </Text>
                  ))
                }
              </View>
            );
          })
        }
      </View>
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>民心</Text>
        <View style={cityModalStyle.sectionContainer}>
          {
            city.statesAcceptance.map((stateAcceptance, code) => {
              if (stateAcceptance === 0) {
                return null;
              }
              return (
                <Text key={officerTypes[code].code} style={cityModalStyle.acceptanceDetail}>
                  {`${officerTypes[code].name}:${stateAcceptance}%`}
                </Text>
              );
            })
          }
        </View>
      </View>
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>百家</Text>
        {
          city.statesOfficer.map((stateOfficer, code) => {
            if (stateOfficer === 0) {
              return null;
            }
            return (
              <View key={stores.states[code].code} style={cityModalStyle.sectionContainer}>
                <StateName state={stores.states[code]} />
                <Text style={cityModalStyle.officerDetail}>
                  {`${officerTypes[stores.states[code].officerCode].name}*${stateOfficer}`}
                </Text>
              </View>
            );
          })
        }
      </View>
      <View style={cityModalStyle.cityModalSection}>
        <Text style={cityModalStyle.sectionTitle}>工商</Text>
        {
          city.statesBusinessman.map((stateBusinessman, code) => {
            if (stateBusinessman === 0) {
              return null;
            }
            return (
              <View key={stores.states[code].code} style={cityModalStyle.sectionContainer}>
                <StateName state={stores.states[code]} />
                <Text style={cityModalStyle.businessmanDetail}>
                  {`商人*${stateBusinessman}`}
                </Text>
              </View>
            );
          })
        }
      </View>
    </>
  );
}
