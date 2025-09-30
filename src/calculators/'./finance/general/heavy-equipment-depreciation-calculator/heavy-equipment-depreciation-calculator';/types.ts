export interface './finance/general/heavy-equipment-depreciation-calculator/heavy-equipment-depreciation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/heavy-equipment-depreciation-calculator/heavy-equipment-depreciation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/heavy-equipment-depreciation-calculator/heavy-equipment-depreciation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/heavy-equipment-depreciation-calculator/heavy-equipment-depreciation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
