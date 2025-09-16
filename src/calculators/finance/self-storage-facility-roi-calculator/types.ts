export interface SelfStorageFacilityROIInputs {
  // Facility Information
  totalUnits: number;
  averageUnitSize: number;
  totalSquareFootage: number;
  occupancyRate: number;

  // Financial Information
  acquisitionCost: number;
  landCost: number;
  constructionCost: number;
  softCosts: number;
  financingAmount: number;
  interestRate: number;
  loanTerm: number;

  // Revenue Information
  averageMonthlyRent: number;
  annualRentIncrease: number;
  otherIncome: number;

  // Operating Expenses
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  managementFees: number;
  marketing: number;
  supplies: number;
  security: number;

  // Analysis Parameters
  analysisPeriod: number;
  exitCapRate: number;
  discountRate: number;
  terminalValue: number;
}

export interface SelfStorageFacilityROIResults {
  // Financial Metrics
  totalInvestment: number;
  annualRevenue: number;
  annualExpenses: number;
  netOperatingIncome: number;
  cashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  irr: number;
  npv: number;

  // Unit Economics
  revenuePerSquareFoot: number;
  expenseRatio: number;
  breakEvenOccupancy: number;
  averageRentPerUnit: number;

  // Investment Analysis
  paybackPeriod: number;
  totalReturn: number;
  roiPercentage: number;
  profitMargin: number;

  // Risk Metrics
  dscr: number;
  riskAssessment: string;
  recommendation: string;
}