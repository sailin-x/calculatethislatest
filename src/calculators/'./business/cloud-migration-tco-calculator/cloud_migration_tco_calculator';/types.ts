export interface './business/cloud-migration-tco-calculator/cloud_migration_tco_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/cloud-migration-tco-calculator/cloud_migration_tco_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/cloud-migration-tco-calculator/cloud_migration_tco_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/cloud-migration-tco-calculator/cloud_migration_tco_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
