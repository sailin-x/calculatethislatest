export interface cloud_migration_tco_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cloud_migration_tco_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cloud_migration_tco_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cloud_migration_tco_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
