export interface './finance/general/capital-call-schedule-planner/capital-call-schedule-planner';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/capital-call-schedule-planner/capital-call-schedule-planner';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/capital-call-schedule-planner/capital-call-schedule-planner';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/capital-call-schedule-planner/capital-call-schedule-planner';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
