export interface './legalinsurancesettlements/legalsettlementhub/chapter-11-bankruptcy-plan-valuation/chapter-11-bankruptcy-plan-valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/chapter-11-bankruptcy-plan-valuation/chapter-11-bankruptcy-plan-valuation';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/chapter-11-bankruptcy-plan-valuation/chapter-11-bankruptcy-plan-valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/chapter-11-bankruptcy-plan-valuation/chapter-11-bankruptcy-plan-valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
