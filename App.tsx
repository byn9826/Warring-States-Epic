import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenOrientation } from 'expo';
import Game from './views/Game';
import CITY from './types/city';
import Modal from './components/modals/Modal';

export default function App() {
  const setScreenOrientation = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  useEffect(setScreenOrientation, []);

  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

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

  const stores = {
    modalType, modalData,
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal stores={stores} actions={actions} />
      <Game stores={stores} actions={actions} />
    </View>
  );
}
