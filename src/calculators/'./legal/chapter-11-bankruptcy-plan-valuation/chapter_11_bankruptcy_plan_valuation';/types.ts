export interface './legal/chapter-11-bankruptcy-plan-valuation/chapter_11_bankruptcy_plan_valuation';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/chapter-11-bankruptcy-plan-valuation/chapter_11_bankruptcy_plan_valuation';Results {
  result: number;
  analysis?: string;
}

export interface './legal/chapter-11-bankruptcy-plan-valuation/chapter_11_bankruptcy_plan_valuation';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/chapter-11-bankruptcy-plan-valuation/chapter_11_bankruptcy_plan_valuation';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
