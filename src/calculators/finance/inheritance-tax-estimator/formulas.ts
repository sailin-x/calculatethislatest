import { InheritanceTaxInputs, InheritanceTaxResults, InheritanceTaxMetrics } from './types';

export function calculateInheritanceTax(inputs: InheritanceTaxInputs): InheritanceTaxResults {
  const {
    estateValue,
    maritalStatus,
    numberOfChildren,
    stateOfResidence,
    hasWill,
    hasTrust,
    charitableDonations,
    funeralExpenses,
    medicalExpenses,
    administrativeExpenses,
    debtsAndLiabilities,
    lifeInsuranceProceeds,
    retirementAccounts,
    realEstateValue,
    businessInterests,
    personalProperty,
    cashAndInvestments
  } = inputs;

  // Calculate gross estate value
  const grossEstateValue = estateValue;

  // Calculate total deductions
  const totalDeductions = charitableDonations + funeralExpenses + medicalExpenses + administrativeExpenses + debtsAndLiabilities;

  // Calculate taxable estate
  const taxableEstate = Math.max(0, grossEstateValue - totalDeductions);

  // Calculate federal estate tax (2024 rates)
  const federalEstateTax = calculateFederalEstateTax(taxableEstate);

  // Calculate state estate tax
  const stateEstateTax = calculateStateEstateTax(taxableEstate, stateOfResidence);

  // Calculate total estate tax
  const totalEstateTax = federalEstateTax + stateEstateTax;

  // Calculate net estate value
  const netEstateValue = grossEstateValue - totalEstateTax;

  // Calculate administrative costs
  const executorFees = grossEstateValue * 0.02; // 2% executor fee
  const attorneyFees = grossEstateValue * 0.015; // 1.5% attorney fee
  const totalAdministrativeCosts = executorFees + attorneyFees + administrativeExpenses;

  // Calculate final distribution
  const finalDistribution = netEstateValue - totalAdministrativeCosts;

  return {
    grossEstateValue,
    totalDeductions,
    taxableEstate,
    federalEstateTax,
    stateEstateTax,
    totalEstateTax,
    netEstateValue,
    executorFees,
    attorneyFees,
    totalAdministrativeCosts,
    finalDistribution
  };
}

function calculateFederalEstateTax(taxableEstate: number): number {
  // 2024 Federal Estate Tax rates
  if (taxableEstate <= 13800000) {
    return 0; // Below exemption
  }

  let tax = 0;
  const brackets = [
    { min: 0, max: 10000000, rate: 0.18 },
    { min: 10000000, max: 20000000, rate: 0.20 },
    { min: 20000000, max: 50000000, rate: 0.22 },
    { min: 50000000, max: 100000000, rate: 0.24 },
    { min: 100000000, max: Infinity, rate: 0.26 }
  ];

  let remainingEstate = taxableEstate;

  for (const bracket of brackets) {
    if (remainingEstate <= 0) break;

    const taxableInBracket = Math.min(remainingEstate, bracket.max - bracket.min);
    tax += taxableInBracket * bracket.rate;
    remainingEstate -= taxableInBracket;
  }

  return tax;
}

function calculateStateEstateTax(taxableEstate: number, state: string): number {
  // Simplified state tax calculation
  const stateRates: { [key: string]: number } = {
    'New York': 0.16,
    'Massachusetts': 0.16,
    'Maryland': 0.16,
    'Connecticut': 0.12,
    'Washington': 0.19,
    'Maine': 0.12,
    'Vermont': 0.16,
    'Rhode Island': 0.16,
    'New Jersey': 0.16,
    'District of Columbia': 0.16
  };

  const rate = stateRates[state] || 0;
  return taxableEstate * rate;
}

export function calculateInheritanceTaxMetrics(
  inputs: InheritanceTaxInputs,
  results: InheritanceTaxResults
): InheritanceTaxMetrics {
  const { estateValue, hasWill, hasTrust } = inputs;
  const { totalEstateTax, totalAdministrativeCosts } = results;

  // Calculate tax efficiency
  const taxEfficiency = estateValue > 0 ? ((estateValue - totalEstateTax) / estateValue) * 100 : 100;

  // Calculate estate planning score
  let estatePlanningScore = 50; // Base score
  if (hasWill) estatePlanningScore += 20;
  if (hasTrust) estatePlanningScore += 30;
  estatePlanningScore = Math.min(100, estatePlanningScore);

  // Risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'medium';
  if (!hasWill) riskAssessment = 'high';
  if (hasWill && hasTrust) riskAssessment = 'low';

  // Optimization potential
  const optimizationPotential = (totalEstateTax + totalAdministrativeCosts) / estateValue * 100;

  return {
    taxEfficiency,
    estatePlanningScore,
    riskAssessment,
    optimizationPotential
  };
}

export function validateInheritanceTaxInputs(inputs: InheritanceTaxInputs): string[] {
  const errors: string[] = [];

  if (inputs.estateValue <= 0) {
    errors.push('Estate value must be greater than $0');
  }

  if (inputs.numberOfChildren < 0) {
    errors.push('Number of children cannot be negative');
  }

  if (inputs.charitableDonations < 0) {
    errors.push('Charitable donations cannot be negative');
  }

  if (inputs.funeralExpenses < 0) {
    errors.push('Funeral expenses cannot be negative');
  }

  if (inputs.medicalExpenses < 0) {
    errors.push('Medical expenses cannot be negative');
  }

  if (inputs.administrativeExpenses < 0) {
    errors.push('Administrative expenses cannot be negative');
  }

  if (inputs.debtsAndLiabilities < 0) {
    errors.push('Debts and liabilities cannot be negative');
  }

  if (inputs.retirementAccounts < 0) {
    errors.push('Retirement accounts cannot be negative');
  }

  if (inputs.realEstateValue < 0) {
    errors.push('Real estate value cannot be negative');
  }

  if (inputs.businessInterests < 0) {
    errors.push('Business interests cannot be negative');
  }

  if (inputs.personalProperty < 0) {
    errors.push('Personal property cannot be negative');
  }

  if (inputs.cashAndInvestments < 0) {
    errors.push('Cash and investments cannot be negative');
  }

  return errors;
}