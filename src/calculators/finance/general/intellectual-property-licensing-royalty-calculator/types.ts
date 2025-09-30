export interface intellectual_property_licensing_royalty_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface intellectual_property_licensing_royalty_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface intellectual_property_licensing_royalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface intellectual_property_licensing_royalty_calculatorOutputs {
  result: number;
  analysis: intellectual_property_licensing_royalty_calculatorAnalysis;
}
