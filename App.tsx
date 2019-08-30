import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenOrientation } from 'expo';
import Game from './views/Game';
import CITY from './types/city';
import STORES from './types/stores';
import Modal from './components/modals/Modal';
import rawCities from './definitions/cities';
import rawStates from './definitions/states';

export default function App() {
  const setScreenOrientation = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  useEffect(setScreenOrientation, []);

  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(null);

  const [cities, setCities] = useState(rawCities);
  const [states, setStates] = useState(rawStates);

  function openModal(type: string, city: CITY) {
    setModalData(city);
    setModalType(type);
  }

  function closeModal() {
    setModalData(null);
    setModalType(null);
  }

  const actions = {
    openModal, closeModal,
  };

  const stores: STORES = {
    modalType,
    modalData,
    cities,
    states,
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal stores={stores} actions={actions} />
      <Game stores={stores} actions={actions} />
    </View>
  );
}
