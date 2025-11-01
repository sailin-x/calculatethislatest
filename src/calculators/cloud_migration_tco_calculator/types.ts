export interface cloud_migration_tco_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cloud_migration_tco_calculatorResults {
  result: number;
  analysis?: string;
}

export interface cloud_migration_tco_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cloud_migration_tco_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
