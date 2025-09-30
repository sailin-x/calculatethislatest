export interface './finance/tenant-improvement-ti-allowance-calculator/tenant_improvement_ti_allowance_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/tenant-improvement-ti-allowance-calculator/tenant_improvement_ti_allowance_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/tenant-improvement-ti-allowance-calculator/tenant_improvement_ti_allowance_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/tenant-improvement-ti-allowance-calculator/tenant_improvement_ti_allowance_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
