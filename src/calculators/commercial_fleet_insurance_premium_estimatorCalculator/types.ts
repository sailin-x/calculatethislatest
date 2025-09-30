export interface commercial_fleet_insurance_premium_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface commercial_fleet_insurance_premium_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface commercial_fleet_insurance_premium_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface commercial_fleet_insurance_premium_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
