export interface asset_based_lending_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface asset_based_lending_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface asset_based_lending_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface asset_based_lending_calculatorOutputs {
  result: number;
  analysis: asset_based_lending_calculatorAnalysis;
}
