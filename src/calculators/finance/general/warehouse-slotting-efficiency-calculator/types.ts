export interface warehouse_slotting_efficiency_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface warehouse_slotting_efficiency_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface warehouse_slotting_efficiency_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface warehouse_slotting_efficiency_calculatorOutputs {
  result: number;
  analysis: warehouse_slotting_efficiency_calculatorAnalysis;
}
