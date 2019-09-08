import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import PROPS from '../../types/props';
import CITY from '../../types/city';
import STATE_INFO from '../../types/stateInfo';

export default function CityModal({ stores, actions }: PROPS) {
  const statesInfo: STATE_INFO[] = new Array(stores.states.length).fill(null).map(() => {
    return {
      cityTotal: 0,
      armyTotal: 0,
      officerTotal: 0,
      businessmanTotal: 0,
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
    </>
  );
}
