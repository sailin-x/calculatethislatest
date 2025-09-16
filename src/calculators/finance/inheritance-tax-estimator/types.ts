export interface InheritanceTaxInputs {
  estateValue: number;
  maritalStatus: 'single' | 'married' | 'widowed' | 'divorced';
  numberOfChildren: number;
  stateOfResidence: string;
  hasWill: boolean;
  hasTrust: boolean;
  charitableDonations: number;
  funeralExpenses: number;
  medicalExpenses: number;
  administrativeExpenses: number;
  debtsAndLiabilities: number;
  lifeInsuranceProceeds: boolean;
  retirementAccounts: number;
  realEstateValue: number;
  businessInterests: number;
  personalProperty: number;
  cashAndInvestments: number;
}

export interface InheritanceTaxResults {
  grossEstateValue: number;
  totalDeductions: number;
  taxableEstate: number;
  federalEstateTax: number;
  stateEstateTax: number;
  totalEstateTax: number;
  netEstateValue: number;
  executorFees: number;
  attorneyFees: number;
  totalAdministrativeCosts: number;
  finalDistribution: number;
}

export interface InheritanceTaxMetrics {
  taxEfficiency: number;
  estatePlanningScore: number;
  riskAssessment: 'low' | 'medium' | 'high';
  optimizationPotential: number;
}