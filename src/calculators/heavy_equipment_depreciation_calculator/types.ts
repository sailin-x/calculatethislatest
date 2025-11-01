export interface heavy_equipment_depreciation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface heavy_equipment_depreciation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface heavy_equipment_depreciation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface heavy_equipment_depreciation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
