export interface irrevocableLifeInsuranceTrustILITValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface irrevocableLifeInsuranceTrustILITValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface irrevocableLifeInsuranceTrustILITValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface irrevocableLifeInsuranceTrustILITValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
