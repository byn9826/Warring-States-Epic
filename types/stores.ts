import CITY from './city';
import STATE from './state';
import PLAYER from './player';

declare class STORES {
  modalType: string;

  modalData: any;

  cities: CITY[];

  states: STATE[];

  player: PLAYER;
}

export default STORES;
