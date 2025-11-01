export interface NetOperatingIncomeInputs {
  // Revenue streams
  rentalIncome: number;
  otherIncome: number; // Laundry, parking, etc.

  // Operating Expenses
  propertyManagement: number;
  maintenance: number;
  repairs: number;
  utilities: number;
  insurance: number;
  propertyTaxes: number;
  legalFees: number;
  advertising: number;
  supplies: number;
  otherExpenses: number;

  // Analysis parameters
  analysisPeriod: 'monthly' | 'annual';
  includeVacancyAllowance: boolean;
  vacancyRate: number; // percentage
  includeReplacementReserve: boolean;
  replacementReserveRate: number; // percentage of gross income
}

export interface NetOperatingIncomeMetrics {
  // Income calculations
  grossOperatingIncome: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;

  // Ratios and margins
  operatingExpenseRatio: number;
  netIncomeRatio: number;
  breakEvenRatio: number;

  // Cash flow analysis
  cashOnCashReturn: number; // if financing info provided
  capRate: number; // if property value provided

  // Expense breakdown
  expenseBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface NetOperatingIncomeAnalysis {
  profitability: 'excellent' | 'good' | 'fair' | 'poor';
  efficiency: 'high' | 'moderate' | 'low';
  recommendations: string[];
  riskFactors: string[];
  marketComparison: {
    noiVsMarket: string;
    expenseRatioVsMarket: string;
    recommendations: string[];
  };
}

export interface NetOperatingIncomeOutputs {
  grossOperatingIncome: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  operatingExpenseRatio: number;
  netIncomeRatio: number;
  breakEvenRatio: number;
  analysis: NetOperatingIncomeAnalysis;
}
