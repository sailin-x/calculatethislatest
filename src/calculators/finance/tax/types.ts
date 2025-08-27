export interface TaxInputs {
  income: number;
  filingStatus: 'single' | 'married-filing-jointly' | 'married-filing-separately' | 'head-of-household' | 'qualifying-widow';
  state: string;
  deductions: number;
  exemptions: number;
  credits: number;
  taxYear: number;
  incomeSources: {
    wages: number;
    selfEmployment: number;
    interest: number;
    dividends: number;
    capitalGains: number;
    rental: number;
    business: number;
    other: number;
  };
  deductions: {
    standard: number;
    itemized: number;
    ira: number;
    hsa: number;
    studentLoan: number;
    other: number;
  };
  credits: {
    childTax: number;
    earnedIncome: number;
    education: number;
    energy: number;
    other: number;
  };
}

export interface TaxMetrics {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  localTax: number;
  totalTax: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  refund: number;
  amountOwed: number;
}

export interface TaxAnalysis {
  taxGrade: string;
  recommendations: string;
  savingsOpportunities: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface TaxOutputs extends TaxMetrics {
  analysis: TaxAnalysis;
}
