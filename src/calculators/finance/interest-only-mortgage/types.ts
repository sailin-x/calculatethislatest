export interface InterestOnlyMortgageInputs {
  // Loan Information
  loanAmount: number;
  interestRate: number;
  interestOnlyPeriod: number; // years
  totalLoanTerm: number; // years
  loanType: 'fixed' | 'adjustable' | 'hybrid';
  
  // Property Information
  propertyValue: number;
  propertyAddress: string;
  propertyType: 'primary_residence' | 'investment' | 'second_home' | 'commercial';
  
  // Borrower Information
  creditScore: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  debtToIncomeRatio: number;
  downPayment: number;
  loanToValueRatio: number;
  
  // Payment Information
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalMonthlyPayment: number;
  
  // Additional Costs
  propertyTaxes: number; // annual
  homeownersInsurance: number; // annual
  privateMortgageInsurance: number; // annual
  hoaFees: number; // annual
  otherMonthlyExpenses: number; // annual
  
  // Refinancing Options
  refinanceAfterInterestOnly: boolean;
  refinanceRate: number;
  refinanceTerm: number;
  
  // Investment Analysis
  expectedPropertyAppreciation: number; // annual percentage
  rentalIncome: number; // monthly (if investment property)
  taxDeductionBenefit: number; // annual
  opportunityCost: number; // annual return on alternative investment
}

export interface InterestOnlyMortgageOutputs {
  // Payment Analysis
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalMonthlyPayment: number;
  totalAnnualPayment: number;
  
  // Interest-Only Period Analysis
  interestOnlyPeriodPayments: number;
  totalInterestPaidDuringIO: number;
  remainingBalanceAfterIO: number;
  
  // Full Loan Analysis
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalPayments: number;
  loanPayoffDate: string;
  
  // Payment Schedule
  paymentSchedule: PaymentScheduleEntry[];
  
  // Comparison Analysis
  traditionalMortgageComparison: {
    traditionalPayment: number;
    interestOnlyPayment: number;
    paymentDifference: number;
    totalInterestDifference: number;
    breakEvenPoint: number; // months
  };
  
  // Investment Analysis
  investmentAnalysis: {
    monthlySavings: number;
    annualSavings: number;
    totalSavingsOverIO: number;
    potentialInvestmentReturn: number;
    netBenefit: number;
  };
  
  // Risk Analysis
  riskFactors: string[];
  riskMitigationStrategies: string[];
  
  // Refinancing Analysis
  refinancingAnalysis: {
    shouldRefinance: boolean;
    refinancePayment: number;
    paymentReduction: number;
    breakEvenMonths: number;
    totalSavings: number;
  };
  
  // Tax Implications
  taxImplications: {
    annualInterestDeduction: number;
    estimatedTaxSavings: number;
    netAfterTaxCost: number;
  };
  
  // Recommendations
  recommendations: {
    suitability: 'not_suitable' | 'marginal' | 'suitable' | 'highly_suitable';
    keyRecommendations: string[];
    riskWarnings: string[];
    optimizationTips: string[];
  };
  
  // Summary
  summary: {
    totalLoanCost: number;
    monthlyPayment: number;
    keyBenefits: string[];
    keyRisks: string[];
    nextSteps: string[];
  };
}

export interface PaymentScheduleEntry {
  paymentNumber: number;
  paymentDate: string;
  interestPayment: number;
  principalPayment: number;
  totalPayment: number;
  remainingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}