export interface PaycheckCalculatorInputs {
  grossPay: number;
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household';
  dependents: number;
  additionalWithholdings: Record<string, number>;
  preTaxDeductions: Record<string, number>;
  state: string;
  localTaxRate: number;
  futaRate: number;
  medicareRate: number;
  socialSecurityRate: number;
}

export interface PaycheckCalculatorMetrics {
  federalIncomeTax: number;
  stateIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalDeductions: number;
  netPay: number;
  takeHomePercentage: number;
  effectiveTaxRate: number;
}

export interface PaycheckCalculatorAnalysis {
  taxEfficiency: string;
  withholdingAccuracy: string;
  deductionOptimization: string;
  recommendations: string[];
}

export interface PaycheckCalculatorOutputs {
  federalIncomeTax: number;
  stateIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  netPay: number;
  analysis: PaycheckCalculatorAnalysis;
}