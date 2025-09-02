export interface CapRateInputs {
  // Property Information
  propertyValue: number;
  annualRentalIncome: number;
  annualOperatingExpenses: number;
  vacancyRate: number;
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  propertyManagement: number;
  utilities: number;
  otherExpenses: number;
  
  // Market Information
  marketCapRate: number;
  comparableProperties: number;
  marketTrend: 'increasing' | 'decreasing' | 'stable';
  
  // Analysis Parameters
  analysisPeriod: number;
  growthRate: number;
  inflationRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'currency' | 'percentage' | 'decimal';
}

export interface CapRateMetrics {
  // Core Cap Rate Calculations
  capRate: number;
  effectiveCapRate: number;
  grossCapRate: number;
  netOperatingIncome: number;
  grossOperatingIncome: number;
  totalOperatingExpenses: number;
  
  // Income Analysis
  grossRentalIncome: number;
  vacancyLoss: number;
  otherIncome: number;
  
  // Expense Breakdown
  propertyTaxExpense: number;
  insuranceExpense: number;
  maintenanceExpense: number;
  propertyManagementExpense: number;
  utilitiesExpense: number;
  otherExpenseAmount: number;
  
  // Market Analysis
  marketComparison: number;
  capRateSpread: number;
  marketPosition: 'above' | 'below' | 'at' | 'market';
  
  // Investment Analysis
  cashOnCashReturn: number;
  totalReturn: number;
  breakEvenCapRate: number;
  
  // Risk Metrics
  expenseRatio: number;
  vacancyRisk: number;
  marketRisk: number;
  
  // Growth Projections
  projectedNOI: number;
  projectedCapRate: number;
  valueAppreciation: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
  isVariable: boolean;
  annualGrowth: number;
}

export interface MarketAnalysis {
  marketCapRate: number;
  comparableCount: number;
  marketTrend: string;
  marketPosition: string;
  capRateSpread: number;
  marketRisk: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export interface InvestmentAnalysis {
  cashOnCashReturn: number;
  totalReturn: number;
  breakEvenCapRate: number;
  riskLevel: 'low' | 'medium' | 'high';
  investmentGrade: 'A' | 'B' | 'C' | 'D';
  recommendations: string[];
  riskFactors: string[];
}

export interface CapRateOutputs {
  metrics: CapRateMetrics;
  expenseBreakdown: ExpenseBreakdown[];
  marketAnalysis: MarketAnalysis;
  investmentAnalysis: InvestmentAnalysis;
}