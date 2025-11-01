export interface MortgageInsuranceInputs {
  loanAmount: number;
  propertyValue: number;
  downPayment: number;
  loanType: 'conventional' | 'fha' | 'va' | 'usda';
  creditScore: number;
  loanTerm: number;
  insuranceType: 'pmi' | 'mi' | 'both';
  propertyState: string;
  propertyCounty: string;
  propertyZipCode: string;
  borrowerAge: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  employmentType: 'employed' | 'self_employed' | 'retired' | 'unemployed';
  monthlyIncome: number;
  monthlyDebts: number;
  bankruptcyHistory: boolean;
  foreclosureHistory: boolean;
  latePayments: number;
  insuranceCoverage: {
    dwelling: number;
    personalProperty: number;
    liability: number;
    medicalPayments: number;
  };
  deductible: number;
  floodZone: 'A' | 'B' | 'C' | 'D' | 'V' | 'X';
  windstormCoverage: boolean;
  earthquakeCoverage: boolean;
  moldCoverage: boolean;
  identityTheftCoverage: boolean;
}

export interface MortgageInsuranceOutputs {
  pmiRequired: boolean;
  pmiRate: number;
  pmiMonthly: number;
  pmiTotal: number;
  pmiCancellationLtv: number;
  miRequired: boolean;
  miRate: number;
  miMonthly: number;
  miTotal: number;
  totalInsuranceMonthly: number;
  totalInsuranceAnnual: number;
  insuranceBreakdown: {
    category: string;
    monthlyCost: number;
    annualCost: number;
    description: string;
  }[];
  riskAssessment: {
    overallRisk: 'Low' | 'Medium' | 'High';
    pmiRisk: 'Low' | 'Medium' | 'High';
    miRisk: 'Low' | 'Medium' | 'High';
    recommendations: string[];
  };
  costComparison: {
    scenario: string;
    monthlyPayment: number;
    totalCost: number;
    savings: number;
  }[];
  coverageAnalysis: {
    adequateCoverage: boolean;
    recommendedCoverage: number;
    coverageGap: number;
    suggestions: string[];
  };
}