import React, { useEffect } from 'react';
import { ScreenOrientation } from 'expo';
import Game from './views/Game';

export default function App() {
  const setScreenOrientation = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  useEffect(setScreenOrientation, []);

  return (
    <Game />
  );
}
