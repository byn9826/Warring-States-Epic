import ARMY_GROUP from './armyGroup';

declare class CITY {
  code: number;

  name: string;

  position: { left: number, top: string };

  location: { left: number, top: string };

  type: number;

  nearby: Array<number>;

  stateCode: number;

  statesControl: Array<number>;

  statesArmyGroup: Array<Array<ARMY_GROUP>>;

  statesAcceptance: Array<number>;

  statesOfficer: Array<number>;

  statesBusinessman: Array<number>;
}

export default CITY;
