export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones-act-settlement-calculator-maritime';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones-act-settlement-calculator-maritime';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones-act-settlement-calculator-maritime';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones-act-settlement-calculator-maritime';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
