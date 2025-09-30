export interface business_loan_qualification_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface business_loan_qualification_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface business_loan_qualification_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface business_loan_qualification_calculatorOutputs {
  result: number;
  analysis: business_loan_qualification_calculatorAnalysis;
}
