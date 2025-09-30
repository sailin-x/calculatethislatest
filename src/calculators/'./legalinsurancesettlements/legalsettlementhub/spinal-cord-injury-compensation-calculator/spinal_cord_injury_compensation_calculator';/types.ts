export interface './legalinsurancesettlements/legalsettlementhub/spinal-cord-injury-compensation-calculator/spinal_cord_injury_compensation_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/spinal-cord-injury-compensation-calculator/spinal_cord_injury_compensation_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/spinal-cord-injury-compensation-calculator/spinal_cord_injury_compensation_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/spinal-cord-injury-compensation-calculator/spinal_cord_injury_compensation_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
