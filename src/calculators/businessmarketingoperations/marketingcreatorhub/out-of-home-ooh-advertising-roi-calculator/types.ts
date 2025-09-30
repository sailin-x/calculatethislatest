export interface out_of_home_ooh_advertising_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface out_of_home_ooh_advertising_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface out_of_home_ooh_advertising_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface out_of_home_ooh_advertising_roi_calculatorOutputs {
  result: number;
  analysis: out_of_home_ooh_advertising_roi_calculatorAnalysis;
}
