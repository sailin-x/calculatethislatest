export interface assetprotectioncalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface assetprotectioncalculatorResults {
  result: number;
  analysis?: string;
}

export interface assetprotectioncalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface assetprotectioncalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
