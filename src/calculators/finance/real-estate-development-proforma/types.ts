export interface RealEstateDevelopmentProformaInputs {
  projectName: string;
  projectType: 'residential' | 'commercial' | 'mixed-use' | 'industrial' | 'retail';
  totalUnits: number;
  averageUnitSize: number;
  constructionCost: number;
  landCost: number;
  softCosts: number;
  financingCosts: number;
  contingency: number;
  developmentPeriod: number;
  stabilizationPeriod: number;
  averageRent: number;
  occupancyRate: number;
  operatingExpenses: number;
  managementFees: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  marketing: number;
  otherExpenses: number;
  exitCapRate: number;
  appreciationRate: number;
  financingRate: number;
  loanToCostRatio: number;
  interestOnlyPeriod: number;
}

export interface RealEstateDevelopmentProformaOutputs {
  totalProjectCost: number;
  totalFinancing: number;
  equityRequired: number;
  constructionCosts: {
    hardCosts: number;
    softCosts: number;
    financingCosts: number;
    contingency: number;
    total: number;
  };
  revenueProjection: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
  operatingExpenses: {
    management: number;
    propertyTaxes: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    marketing: number;
    other: number;
    total: number;
  };
  netOperatingIncome: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
  cashFlow: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  };
  exitValue: number;
  totalReturn: number;
  irr: number;
  multiple: number;
  debtServiceCoverage: number;
  breakEvenOccupancy: number;
  sensitivityAnalysis: {
    optimistic: number;
    base: number;
    pessimistic: number;
  };
}

export interface RealEstateDevelopmentProformaValidation {
  projectName: boolean;
  projectType: boolean;
  totalUnits: boolean;
  averageUnitSize: boolean;
  constructionCost: boolean;
  landCost: boolean;
  softCosts: boolean;
  financingCosts: boolean;
  contingency: boolean;
  developmentPeriod: boolean;
  stabilizationPeriod: boolean;
  averageRent: boolean;
  occupancyRate: boolean;
  operatingExpenses: boolean;
  managementFees: boolean;
  propertyTaxes: boolean;
  insurance: boolean;
  utilities: boolean;
  maintenance: boolean;
  marketing: boolean;
  otherExpenses: boolean;
  exitCapRate: boolean;
  appreciationRate: boolean;
  financingRate: boolean;
  loanToCostRatio: boolean;
  interestOnlyPeriod: boolean;
}