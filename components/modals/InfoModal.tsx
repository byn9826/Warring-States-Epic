import React from 'react';
import { View, Text } from 'react-native';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import STATE_INFO from '../../types/stateInfo';
import infoModalStyle from '../../styles/infoModal';
import StateName from '../StateName';

export default function CityModal({ stores, actions }: PROPS) {
  const statesInfo: STATE_INFO[] = new Array(stores.states.length).fill(null).map(() => {
    return {
      cityTotal: 0,
      armyTotal: 0,
      officerTotal: 0,
      businessmanTotal: 0,
      moneyTotal: 10,
      foodTotal: 10,
    };
  });
  stores.cities.forEach((city: CITY) => {
    statesInfo[city.stateCode].cityTotal += 1;
    city.statesArmyGroup.forEach((stateArmyGroup, code) => {
      statesInfo[code].armyTotal += stateArmyGroup.length;
    });
    city.statesOfficer.forEach((stateOfficer, code) => {
      statesInfo[code].officerTotal += stateOfficer;
    });
    city.statesBusinessman.forEach((stateBusinessman, code) => {
      statesInfo[code].businessmanTotal += stateBusinessman;
    });
  });
  return (
    <>
      <View style={infoModalStyle.infoModalSection}>
        <View style={infoModalStyle.sectionTitle} />
        <Text style={infoModalStyle.sectionTitle}>城池</Text>
        <Text style={infoModalStyle.sectionTitle}>兵团</Text>
        <Text style={infoModalStyle.sectionTitle}>诸子</Text>
        <Text style={infoModalStyle.sectionTitle}>商贾</Text>
        <Text style={infoModalStyle.sectionTitle}>钱</Text>
        <Text style={infoModalStyle.sectionTitle}>粮</Text>
      </View>
      {
        statesInfo.map((stateInfo: STATE_INFO, code: number) => {
          if (code === 0) {
            return null;
          }
          return (
            <View key={stores.states[code].code} style={infoModalStyle.infoModalSection}>
              <View style={infoModalStyle.sectionItem}>
                <StateName state={stores.states[code]} />
              </View>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.cityTotal}
              </Text>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.armyTotal}
              </Text>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.officerTotal}
              </Text>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.businessmanTotal}
              </Text>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.moneyTotal}
              </Text>
              <Text style={infoModalStyle.sectionItem}>
                {stateInfo.foodTotal}
              </Text>
            </View>
          );
        })
      }
    </>
  );
}
