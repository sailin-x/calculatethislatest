export interface LoanToCostRatioInputs {
  projectInformation: {
    projectName: string;
    projectType: 'residential' | 'commercial' | 'industrial' | 'mixed-use' | 'hospitality' | 'healthcare' | 'educational' | 'retail' | 'office' | 'warehouse';
    projectLocation: string;
    totalProjectCost: number;
    landCost: number;
    constructionCost: number;
    softCosts: number;
    contingency: number;
    developerProfit: number;
  };
  financingDetails: {
    requestedLoanAmount: number;
    loanType: 'construction' | 'permanent' | 'bridge' | 'mezzanine';
    interestRate: number;
    loanTerm: number;
    interestOnlyPeriod: number;
    originationFee: number;
    otherFees: number;
  };
  projectTimeline: {
    constructionStartDate: string;
    estimatedCompletionDate: string;
    constructionDuration: number;
    stabilizationPeriod: number;
  };
  marketAssumptions: {
    projectedRentalIncome: number;
    projectedOperatingExpenses: number;
    projectedPropertyValue: number;
    marketGrowthRate: number;
    capRate: number;
  };
  riskFactors: {
    marketRisk: 'low' | 'medium' | 'high';
    constructionRisk: 'low' | 'medium' | 'high';
    leasingRisk: 'low' | 'medium' | 'high';
    interestRateRisk: 'low' | 'medium' | 'high';
  };
}

export interface LoanToCostRatioResults {
  ltcRatio: number;
  loanAmount: number;
  totalProjectCost: number;
  equityRequirement: number;
  monthlyPayment: number;
  totalInterest: number;
  totalFees: number;
  breakEvenAnalysis: {
    breakEvenRent: number;
    breakEvenOccupancy: number;
    breakEvenTimeline: number;
  };
  riskAssessment: {
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    riskFactors: string[];
    recommendations: string[];
  };
  cashFlowProjection: {
    monthlyCashFlow: Array<{
      month: number;
      income: number;
      expenses: number;
      netCashFlow: number;
      cumulativeCashFlow: number;
    }>;
    annualCashFlow: Array<{
      year: number;
      income: number;
      expenses: number;
      netCashFlow: number;
      cumulativeCashFlow: number;
    }>;
    cumulativeCashFlow: number[];
  };
  sensitivityAnalysis: {
    scenarios: Array<{
      scenario: string;
      ltcRatio: number;
      loanAmount: number;
      equityRequirement: number;
      monthlyPayment: number;
      riskScore: number;
    }>;
    keyAssumptions: Array<{
      assumption: string;
      currentValue: number;
      impact: string;
    }>;
    riskMitigation: string[];
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
