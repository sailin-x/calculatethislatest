export interface registerEnterpriseValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerEnterpriseValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerEnterpriseValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerEnterpriseValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
