export interface './finance/pension-lump-sum-vs-annuity-calculator/pension_lump_sum_vs_annuity_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pension-lump-sum-vs-annuity-calculator/pension_lump_sum_vs_annuity_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pension-lump-sum-vs-annuity-calculator/pension_lump_sum_vs_annuity_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pension-lump-sum-vs-annuity-calculator/pension_lump_sum_vs_annuity_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
