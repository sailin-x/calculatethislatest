// Net Operating Income (NOI) Calculator Types

export interface NetOperatingIncomeInputs {
  // Property Information
  propertyValue: number;
  propertyAddress?: string;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'retail' | 'office' | 'multifamily' | 'hotel' | 'warehouse' | 'land' | 'other';
  propertySize: number;
  propertyAge: number;
  propertyClass: 'class_a' | 'class_b' | 'class_c' | 'class_d';
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Income Information
  grossRentalIncome: number;
  otherIncome: number;
  vacancyRate: number;
  creditLossRate: number;
  lateFeeIncome: number;
  parkingIncome: number;
  storageIncome: number;
  laundryIncome: number;
  vendingIncome: number;
  advertisingIncome: number;
  utilityReimbursement: number;
  petFees: number;
  applicationFees: number;
  leaseTerminationFees: number;
  otherMiscellaneousIncome: number;
  
  // Operating Expenses
  propertyManagementFees: number;
  propertyTaxes: number;
  propertyInsurance: number;
  utilities: number;
  maintenanceAndRepairs: number;
  landscaping: number;
  janitorial: number;
  security: number;
  pestControl: number;
  trashRemoval: number;
  snowRemoval: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  professionalServices: number;
  licensesAndPermits: number;
  supplies: number;
  equipmentRental: number;
  contractServices: number;
  otherOperatingExpenses: number;
  
  // Capital Expenditures
  roofReplacement: number;
  hvacReplacement: number;
  plumbingReplacement: number;
  electricalReplacement: number;
  flooringReplacement: number;
  painting: number;
  applianceReplacement: number;
  structuralRepairs: number;
  otherCapitalExpenditures: number;
  
  // Market Information
  marketLocation: 'urban' | 'suburban' | 'rural';
  marketCondition: 'growing' | 'stable' | 'declining';
  marketGrowthRate: number;
  comparableNOI: number;
  comparableCapRate: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  expenseGrowthRate: number;
  incomeGrowthRate: number;
  vacancyTrend: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'currency' | 'percentage' | 'number';
  includeCharts: boolean;
}

export interface NetOperatingIncomeMetrics {
  // Income Metrics
  totalGrossIncome: number;
  effectiveGrossIncome: number;
  vacancyLoss: number;
  creditLoss: number;
  netRentalIncome: number;
  
  // Expense Metrics
  totalOperatingExpenses: number;
  totalCapitalExpenditures: number;
  totalExpenses: number;
  
  // NOI Metrics
  netOperatingIncome: number;
  noiMargin: number;
  noiPerSquareFoot: number;
  noiPerUnit: number;
  
  // Performance Metrics
  expenseRatio: number;
  incomeRatio: number;
  vacancyLossRatio: number;
  creditLossRatio: number;
  
  // Efficiency Metrics
  operatingEfficiency: number;
  expenseEfficiency: number;
  incomeEfficiency: number;
}

export interface NetOperatingIncomeAnalysis {
  recommendation: string;
  noiRating: 'excellent' | 'good' | 'fair' | 'poor';
  efficiencyRating: 'excellent' | 'good' | 'fair' | 'poor';
  marketRating: 'excellent' | 'good' | 'fair' | 'poor';
  confidenceRating: 'high' | 'medium' | 'low';
  
  keyStrengths: string[];
  keyWeaknesses: string[];
  improvementOpportunities: string[];
  riskFactors: string[];
  
  marketComparison: {
    noiVsMarket: number;
    efficiencyVsMarket: number;
    marketPosition: string;
  };
  
  trendAnalysis: {
    noiTrend: 'increasing' | 'stable' | 'decreasing';
    expenseTrend: 'increasing' | 'stable' | 'decreasing';
    incomeTrend: 'increasing' | 'stable' | 'decreasing';
    projectedNOI: number;
  };
  
  sensitivityAnalysis: {
    incomeSensitivity: number;
    expenseSensitivity: number;
    vacancySensitivity: number;
    breakEvenVacancy: number;
  };
}

export interface NetOperatingIncomeOutputs {
  // Core NOI
  netOperatingIncome: number;
  noiMargin: number;
  noiPerSquareFoot: number;
  noiPerUnit: number;
  
  // Income Breakdown
  totalGrossIncome: number;
  effectiveGrossIncome: number;
  vacancyLoss: number;
  creditLoss: number;
  netRentalIncome: number;
  
  // Expense Breakdown
  totalOperatingExpenses: number;
  totalCapitalExpenditures: number;
  totalExpenses: number;
  
  // Performance Ratios
  expenseRatio: number;
  incomeRatio: number;
  vacancyLossRatio: number;
  creditLossRatio: number;
  operatingEfficiency: number;
  
  // Market Analysis
  noiVsMarket: number;
  efficiencyVsMarket: number;
  marketPosition: string;
  
  // Trend Analysis
  noiTrend: string;
  projectedNOI: number;
  noiGrowthRate: number;
  
  // Sensitivity Analysis
  incomeSensitivity: number;
  expenseSensitivity: number;
  vacancySensitivity: number;
  breakEvenVacancy: number;
  
  // Detailed Analysis
  analysis: NetOperatingIncomeAnalysis;
  
  // Additional Metrics
  metrics: NetOperatingIncomeMetrics;
  
  // Breakdowns
  incomeBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  
  expenseBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  
  capitalExpenditureBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  
  // Projections
  projections: {
    year: number;
    grossIncome: number;
    operatingExpenses: number;
    noi: number;
    noiMargin: number;
  }[];
  
  // Sensitivity Matrix
  sensitivityMatrix: {
    scenario: string;
    noi: number;
    noiMargin: number;
    change: number;
  }[];
}
