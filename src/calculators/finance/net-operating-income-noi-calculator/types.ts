export interface NetOperatingIncomeNoiInputs {
  // Property revenue
  grossRentalIncome: number;
  otherIncome: number; // Laundry, parking, etc.

  // Operating expenses
  propertyManagement: number; // percentage of gross income
  maintenance: number; // percentage of gross income
  utilities: number;
  insurance: number;
  propertyTaxes: number;
  legalFees: number;
  accountingFees: number;
  advertising: number;
  supplies: number;
  otherExpenses: number;

  // Property details
  propertyValue: number;
  squareFootage: number;
  numberOfUnits: number;

  // Analysis parameters
  vacancyRate: number; // percentage
  marketRentPerSqFt: number;
  expenseGrowthRate: number; // annual percentage
  incomeGrowthRate: number; // annual percentage

  // Cap rate analysis
  marketCapRate: number; // percentage
  targetCapRate: number; // percentage

  // Cash flow analysis
  loanAmount: number;
  interestRate: number; // percentage
  loanTerm: number; // years
  downPayment: number; // percentage

  // Tax considerations
  depreciationYears: number;
  marginalTaxRate: number; // percentage
}

export interface NetOperatingIncomeNoiOutputs {
  // NOI calculations
  grossIncome: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;

  // Ratios and metrics
  noiMargin: number; // percentage
  noiPerUnit: number;
  noiPerSqFt: number;
  noiYield: number; // percentage

  // Cap rate analysis
  impliedPropertyValue: number;
  capRate: number; // percentage
  targetPropertyValue: number;

  // Cash flow analysis
  annualDebtService: number;
  cashFlowBeforeTax: number;
  cashFlowAfterTax: number;
  cashOnCashReturn: number; // percentage

  // Investment metrics
  debtServiceCoverageRatio: number;
  breakEvenRatio: number; // percentage
  grossRentMultiplier: number;

  // Projections
  noiProjection5Year: number[];
  cashFlowProjection5Year: number[];

  // Sensitivity analysis
  noiSensitivityToRent: number; // percentage change in NOI per 1% rent change
  noiSensitivityToExpenses: number; // percentage change in NOI per 1% expense change

  // Property performance
  occupancyRate: number; // percentage
  rentCollectionRate: number; // percentage

  // Value-add opportunities
  potentialNoiImprovement: number;
  valueAddAnalysis: {
    category: string;
    currentAmount: number;
    potentialSavings: number;
    roi: number; // percentage
  }[];

  // Market comparison
  marketNoiPerSqFt: number;
  marketComparison: 'Above Market' | 'At Market' | 'Below Market';

  // Recommendations
  investmentRecommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  riskAssessment: 'Low' | 'Medium' | 'High';
  keyStrengths: string[];
  keyConcerns: string[];
  actionItems: string[];
}