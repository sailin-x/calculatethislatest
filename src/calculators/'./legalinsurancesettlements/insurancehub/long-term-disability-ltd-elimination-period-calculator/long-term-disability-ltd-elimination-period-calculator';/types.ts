export interface './legalinsurancesettlements/insurancehub/long-term-disability-ltd-elimination-period-calculator/long-term-disability-ltd-elimination-period-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/insurancehub/long-term-disability-ltd-elimination-period-calculator/long-term-disability-ltd-elimination-period-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/insurancehub/long-term-disability-ltd-elimination-period-calculator/long-term-disability-ltd-elimination-period-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/insurancehub/long-term-disability-ltd-elimination-period-calculator/long-term-disability-ltd-elimination-period-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
