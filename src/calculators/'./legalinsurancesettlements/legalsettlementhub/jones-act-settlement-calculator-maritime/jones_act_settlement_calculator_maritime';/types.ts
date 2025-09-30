export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones_act_settlement_calculator_maritime';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones_act_settlement_calculator_maritime';Results {
  result: number;
  analysis?: string;
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones_act_settlement_calculator_maritime';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legalinsurancesettlements/legalsettlementhub/jones-act-settlement-calculator-maritime/jones_act_settlement_calculator_maritime';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
