export interface RealEstateTaxDeductionsInputs {
  propertyType: 'residential' | 'commercial' | 'rental' | 'vacation';
  annualIncome: number;
  mortgageInterest: number;
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  repairs: number;
  utilities: number;
  hoaFees: number;
  depreciation: number;
  managementFees: number;
  vacancyAllowance: number;
  taxRate: number;
  filingStatus: 'single' | 'married-joint' | 'married-separate' | 'head-household';
  state: string;
  rentalIncome: number;
  personalUsePercentage: number;
}

export interface RealEstateTaxDeductionsResults {
  totalDeductions: number;
  taxableIncome: number;
  taxSavings: number;
  effectiveTaxRate: number;
  cashFlow: number;
  capRate: number;
  roi: number;
  deductionBreakdown: {
    mortgageInterest: number;
    propertyTaxes: number;
    insurance: number;
    maintenance: number;
    repairs: number;
    utilities: number;
    hoaFees: number;
    depreciation: number;
    managementFees: number;
    vacancyAllowance: number;
  };
  taxCredits: number;
  netIncome: number;
}