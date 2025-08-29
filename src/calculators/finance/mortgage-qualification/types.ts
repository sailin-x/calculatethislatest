export interface MortgageQualificationInputs {
  // Borrower Information
  borrowerIncome: number;
  coBorrowerIncome: number;
  borrowerCreditScore: number;
  coBorrowerCreditScore: number;
  borrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner' | 'unemployed';
  coBorrowerEmploymentType: 'employed' | 'self_employed' | 'retired' | 'business_owner' | 'unemployed';
  borrowerEmploymentLength: number;
  coBorrowerEmploymentLength: number;
  
  // Income Details
  baseSalary: number;
  overtimeIncome: number;
  bonusIncome: number;
  commissionIncome: number;
  rentalIncome: number;
  investmentIncome: number;
  otherIncome: number;
  
  // Assets and Liabilities
  borrowerAssets: number;
  coBorrowerAssets: number;
  borrowerLiquidity: number;
  coBorrowerLiquidity: number;
  borrowerDebts: number;
  coBorrowerDebts: number;
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial';
  propertySize: number;
  propertyAge: number;
  
  // Loan Information
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'hard_money' | 'private';
  paymentType: 'principal_interest' | 'interest_only' | 'balloon' | 'arm';
  
  // Down Payment Information
  downPayment: number;
  downPaymentPercentage: number;
  downPaymentSource: 'savings' | 'investment_sale' | 'gift' | 'inheritance' | 'other';
  
  // Insurance and Taxes
  propertyInsurance: number;
  propertyTaxes: number;
  hoaFees: number;
  floodInsurance: number;
  mortgageInsurance: number;
  mortgageInsuranceRate: number;
  
  // Debt Information
  creditCardDebt: number;
  autoLoanDebt: number;
  studentLoanDebt: number;
  personalLoanDebt: number;
  otherDebt: number;
  
  // Loan Program Requirements
  maxDebtToIncomeRatio: number;
  maxHousingExpenseRatio: number;
  minCreditScore: number;
  minDownPayment: number;
  maxLoanAmount: number;
  
  // Market Information
  marketLocation: string;
  marketCondition: 'declining' | 'stable' | 'growing' | 'hot';
  marketGrowthRate: number;
  
  // Analysis Parameters
  analysisPeriod: number;
  inflationRate: number;
  propertyAppreciationRate: number;
  discountRate: number;
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
}

export interface MortgageQualificationMetrics {
  // Income Analysis
  totalIncome: number;
  qualifyingIncome: number;
  incomeStability: number;
  incomeGrowth: number;
  
  // Debt Analysis
  totalDebt: number;
  monthlyDebtPayments: number;
  debtToIncomeRatio: number;
  housingExpenseRatio: number;
  
  // Asset Analysis
  totalAssets: number;
  totalLiquidity: number;
  assetToDebtRatio: number;
  reserveRequirements: number;
  
  // Credit Analysis
  averageCreditScore: number;
  creditScoreRating: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
  creditRisk: number;
  creditUtilization: number;
  
  // Loan Analysis
  monthlyPayment: number;
  totalMonthlyPayment: number;
  paymentToIncomeRatio: number;
  loanToValueRatio: number;
  
  // Qualification Analysis
  qualificationScore: number;
  qualificationStatus: 'approved' | 'conditional' | 'denied' | 'requires_review';
  qualificationFactors: Array<{
    factor: string;
    status: 'pass' | 'fail' | 'warning';
    value: number;
    requirement: number;
    margin: number;
  }>;
  
  // Risk Analysis
  riskScore: number;
  probabilityOfApproval: number;
  probabilityOfDefault: number;
  riskFactors: string[];
  
  // Affordability Analysis
  maxAffordablePayment: number;
  maxAffordableLoan: number;
  maxAffordableProperty: number;
  affordabilityMargin: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;
  
  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    qualificationStatus: string;
    maxLoan: number;
  }>;
  
  // Comparison Analysis
  comparisonAnalysis: Array<{
    loanType: string;
    maxLoan: number;
    rate: number;
    payment: number;
    qualificationStatus: string;
  }>;
  
  // Timeline Analysis
  timelineAnalysis: Array<{
    month: number;
    income: number;
    debt: number;
    ratio: number;
    status: string;
  }>;
}

export interface MortgageQualificationAnalysis {
  // Executive Summary
  qualificationRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  approvalRating: 'Highly Likely' | 'Likely' | 'Possible' | 'Unlikely' | 'Very Unlikely';
  recommendation: 'Proceed' | 'Improve' | 'Reconsider' | 'Requires Review';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  qualificationFactors: string[];
  opportunities: string[];
  
  // Qualification Analysis
  qualificationSummary: string;
  incomeAnalysis: string;
  debtAnalysis: string;
  
  // Credit Analysis
  creditSummary: string;
  creditScoreAnalysis: string;
  creditRiskAnalysis: string;
  
  // Loan Analysis
  loanSummary: string;
  paymentAnalysis: string;
  affordabilityAnalysis: string;
  
  // Risk Assessment
  riskAssessment: string;
  approvalRisk: string;
  defaultRisk: string;
  marketRisk: string;
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  marketPosition: string;
  
  // Recommendations
  approvalRecommendations: string[];
  improvementSuggestions: string[];
  optimizationStrategies: string[];
  
  // Implementation
  implementationPlan: string;
  nextSteps: string[];
  timeline: string;
  
  // Monitoring
  monitoringPlan: string;
  keyMetrics: string[];
  reviewSchedule: string;
  
  // Risk Management
  riskManagement: string;
  mitigationStrategies: string[];
  contingencyPlans: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }>;
  
  // Decision Support
  decisionRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface MortgageQualificationOutputs {
  // Core Metrics
  qualificationScore: number;
  qualificationStatus: string;
  debtToIncomeRatio: number;
  housingExpenseRatio: number;
  averageCreditScore: number;
  maxAffordableLoan: number;
  monthlyPayment: number;
  probabilityOfApproval: number;
  
  // Analysis
  analysis: MortgageQualificationAnalysis;
  
  // Additional Metrics
  totalIncome: number;
  qualifyingIncome: number;
  incomeStability: number;
  incomeGrowth: number;
  totalDebt: number;
  monthlyDebtPayments: number;
  totalAssets: number;
  totalLiquidity: number;
  assetToDebtRatio: number;
  reserveRequirements: number;
  creditScoreRating: string;
  creditRisk: number;
  creditUtilization: number;
  totalMonthlyPayment: number;
  paymentToIncomeRatio: number;
  loanToValueRatio: number;
  qualificationFactors: any[];
  riskScore: number;
  probabilityOfDefault: number;
  riskFactors: string[];
  maxAffordablePayment: number;
  maxAffordableProperty: number;
  affordabilityMargin: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  comparisonAnalysis: any[];
  timelineAnalysis: any[];
}
