export interface IScenario {
  hackerCard: {
    description: string;
    power: number;
  };
  playerCards: [
    {
      description: string;
      power: number;
    },
    {
      description: string;
      power: number;
    },
    {
      description: string;
      power: number;
    }
  ],
  explanation: string;
}
