export interface './business/event-sponsorship-tier-valuation-calculator/event_sponsorship_tier_valuation_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/event-sponsorship-tier-valuation-calculator/event_sponsorship_tier_valuation_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/event-sponsorship-tier-valuation-calculator/event_sponsorship_tier_valuation_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/event-sponsorship-tier-valuation-calculator/event_sponsorship_tier_valuation_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
