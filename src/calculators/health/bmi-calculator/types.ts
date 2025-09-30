export interface BmiCalculatorInputs {
  weight: number; // weight in kg
  height: number; // height in cm
}

export interface BmiCalculatorOutputs {
  bmi: number;
  category: string;
  healthyRange: string;
  explanation: string;
}
