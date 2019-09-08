import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenOrientation } from 'expo';
import Game from './views/Game';
import CITY from './types/city';
import STORES from './types/stores';
import Modal from './components/modals/Modal';
import originCities from './definitions/cities';
import originStates from './definitions/states';
import originPlayer from './definitions/player';

export default function App() {
  const setScreenOrientation = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  useEffect(setScreenOrientation, []);

  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(null);

  const [cities, setCities] = useState(originCities);
  const [states, setStates] = useState(originStates);
  const [player, setPlayer] = useState(originPlayer);

  function openModal(type: string, city: CITY) {
    switch (type) {
      case 'CITY':
        setModalData(city);
        break;
      case 'info':
      default:
        break;
    }
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
    player,
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal stores={stores} actions={actions} />
      <Game stores={stores} actions={actions} />
    </View>
  );
}
