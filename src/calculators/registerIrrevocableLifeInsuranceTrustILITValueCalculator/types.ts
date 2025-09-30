export interface registerIrrevocableLifeInsuranceTrustILITValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerIrrevocableLifeInsuranceTrustILITValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerIrrevocableLifeInsuranceTrustILITValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerIrrevocableLifeInsuranceTrustILITValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
