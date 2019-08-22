declare class CITY {
  code: number;

  name: string;

  position: { left: number, top: string };

  location: { left: number, top: string };

  type: number;

  nearby: Array<number>;

  stateCode: number;
}

export default CITY;
