import React from 'react';
import { Text } from 'react-native';
import STATE from '../types/state';
import commonStyle from '../styles/common';

export default function StateName({ state }: { state: STATE }) {
  return (
    <Text
      style={{
        ...commonStyle.stateName,
        backgroundColor: state.color,
      }}
    >
      { state.name }
    </Text>
  );
}
