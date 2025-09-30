export interface cloud_migration_tco_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface cloud_migration_tco_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface cloud_migration_tco_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface cloud_migration_tco_calculatorOutputs {
  result: number;
  analysis: cloud_migration_tco_calculatorAnalysis;
}
