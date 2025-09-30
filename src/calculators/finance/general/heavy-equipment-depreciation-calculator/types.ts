export interface heavy_equipment_depreciation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface heavy_equipment_depreciation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface heavy_equipment_depreciation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface heavy_equipment_depreciation_calculatorOutputs {
  result: number;
  analysis: heavy_equipment_depreciation_calculatorAnalysis;
}
