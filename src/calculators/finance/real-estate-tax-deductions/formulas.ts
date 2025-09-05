import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs } from './types';

export function calculateRealEstateTaxDeductions(inputs: RealEstateTaxDeductionsInputs): RealEstateTaxDeductionsOutputs {
  const {
    propertyType,
    propertyValue,
    landValue,
    placedInServiceDate,
    businessUsePercentage,
    annualRent,
    operatingExpenses,
    mortgageInterest,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    managementFees,
    advertising,
    legalFees,
    accountingFees,
    travelExpenses,
    homeOfficeExpenses,
    depreciation,
    bonusDepreciation,
    section179Deduction,
    costSegregation,
    passiveActivityLoss,
    atRiskAmount,
    materialParticipation,
    realEstateProfessional,
    taxYear,
    filingStatus,
    adjustedGrossIncome,
    otherPassiveIncome,
    otherPassiveLosses
  } = inputs;

  // Calculate deductible expenses
  const deductibleExpenses = calculateDeductibleExpenses(
    operatingExpenses,
    mortgageInterest,
    propertyTaxes,
    insurance,
    utilities,
    maintenance,
    managementFees,
    advertising,
    legalFees,
    accountingFees,
    travelExpenses,
    homeOfficeExpenses,
    businessUsePercentage
  );

  // Calculate depreciation deductions
  const depreciationDeductions = calculateDepreciationDeductions(
    depreciation,
    bonusDepreciation,
    section179Deduction,
    costSegregation,
    propertyValue,
    landValue,
    placedInServiceDate,
    propertyType
  );

  // Calculate passive activity analysis
  const passiveActivityAnalysis = calculatePassiveActivityAnalysis(
    passiveActivityLoss,
    atRiskAmount,
    materialParticipation,
    realEstateProfessional,
    adjustedGrossIncome,
    otherPassiveIncome,
    otherPassiveLosses,
    filingStatus
  );

  // Calculate tax savings
  const taxSavings = calculateTaxSavings(
    deductibleExpenses.totalOperating,
    depreciationDeductions.totalDepreciation,
    passiveActivityAnalysis.deductibleLoss,
    filingStatus,
    adjustedGrossIncome
  );

  // Calculate net rental income
  const netRentalIncome = calculateNetRentalIncome(
    annualRent,
    deductibleExpenses.totalOperating,
    depreciationDeductions.totalDepreciation,
    passiveActivityAnalysis.deductibleLoss
  );

  // Calculate carryover analysis
  const carryoverAnalysis = calculateCarryoverAnalysis(
    passiveActivityAnalysis.suspendedLoss,
    taxSavings.effectiveTaxRate
  );

  // Calculate summary
  const summary = calculateSummary(
    deductibleExpenses.totalOperating,
    depreciationDeductions.totalDepreciation,
    passiveActivityAnalysis.deductibleLoss,
    taxSavings.totalTaxSavings,
    netRentalIncome.netRentalIncome
  );

  return {
    deductibleExpenses,
    depreciationDeductions,
    passiveActivityAnalysis,
    taxSavings,
    netRentalIncome,
    carryoverAnalysis,
    summary
  };
}

function calculateDeductibleExpenses(
  operatingExpenses: number,
  mortgageInterest: number,
  propertyTaxes: number,
  insurance: number,
  utilities: number,
  maintenance: number,
  managementFees: number,
  advertising: number,
  legalFees: number,
  accountingFees: number,
  travelExpenses: number,
  homeOfficeExpenses: number,
  businessUsePercentage: number
): {
  operatingExpenses: number;
  mortgageInterest: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  managementFees: number;
  advertising: number;
  legalFees: number;
  accountingFees: number;
  travelExpenses: number;
  homeOfficeExpenses: number;
  totalOperating: number;
} {
  // Apply business use percentage to applicable expenses
  const adjustedOperatingExpenses = operatingExpenses * (businessUsePercentage / 100);
  const adjustedMortgageInterest = mortgageInterest * (businessUsePercentage / 100);
  const adjustedPropertyTaxes = propertyTaxes * (businessUsePercentage / 100);
  const adjustedInsurance = insurance * (businessUsePercentage / 100);
  const adjustedUtilities = utilities * (businessUsePercentage / 100);
  const adjustedMaintenance = maintenance * (businessUsePercentage / 100);
  const adjustedManagementFees = managementFees * (businessUsePercentage / 100);
  const adjustedAdvertising = advertising * (businessUsePercentage / 100);
  const adjustedLegalFees = legalFees * (businessUsePercentage / 100);
  const adjustedAccountingFees = accountingFees * (businessUsePercentage / 100);
  const adjustedTravelExpenses = travelExpenses * (businessUsePercentage / 100);
  const adjustedHomeOfficeExpenses = homeOfficeExpenses * (businessUsePercentage / 100);

  const totalOperating = adjustedOperatingExpenses + adjustedMortgageInterest + 
                        adjustedPropertyTaxes + adjustedInsurance + adjustedUtilities + 
                        adjustedMaintenance + adjustedManagementFees + adjustedAdvertising + 
                        adjustedLegalFees + adjustedAccountingFees + adjustedTravelExpenses + 
                        adjustedHomeOfficeExpenses;

  return {
    operatingExpenses: adjustedOperatingExpenses,
    mortgageInterest: adjustedMortgageInterest,
    propertyTaxes: adjustedPropertyTaxes,
    insurance: adjustedInsurance,
    utilities: adjustedUtilities,
    maintenance: adjustedMaintenance,
    managementFees: adjustedManagementFees,
    advertising: adjustedAdvertising,
    legalFees: adjustedLegalFees,
    accountingFees: adjustedAccountingFees,
    travelExpenses: adjustedTravelExpenses,
    homeOfficeExpenses: adjustedHomeOfficeExpenses,
    totalOperating
  };
}

function calculateDepreciationDeductions(
  depreciation: number,
  bonusDepreciation: number,
  section179Deduction: number,
  costSegregation: number,
  propertyValue: number,
  landValue: number,
  placedInServiceDate: string,
  propertyType: string
): {
  regularDepreciation: number;
  bonusDepreciation: number;
  section179Deduction: number;
  costSegregation: number;
  totalDepreciation: number;
} {
  // Calculate regular depreciation if not provided
  let regularDepreciation = depreciation;
  if (regularDepreciation === 0) {
    const depreciableBasis = propertyValue - landValue;
    const placedInService = new Date(placedInServiceDate);
    const currentYear = new Date().getFullYear();
    
    if (propertyType === 'residential') {
      regularDepreciation = depreciableBasis / 27.5;
    } else {
      regularDepreciation = depreciableBasis / 39;
    }
  }

  const totalDepreciation = regularDepreciation + bonusDepreciation + 
                           section179Deduction + costSegregation;

  return {
    regularDepreciation,
    bonusDepreciation,
    section179Deduction,
    costSegregation,
    totalDepreciation
  };
}

function calculatePassiveActivityAnalysis(
  passiveActivityLoss: number,
  atRiskAmount: number,
  materialParticipation: boolean,
  realEstateProfessional: boolean,
  adjustedGrossIncome: number,
  otherPassiveIncome: number,
  otherPassiveLosses: number,
  filingStatus: string
): {
  passiveActivityLoss: number;
  atRiskAmount: number;
  materialParticipation: boolean;
  realEstateProfessional: boolean;
  deductibleLoss: number;
  suspendedLoss: number;
} {
  let deductibleLoss = 0;
  let suspendedLoss = 0;

  // Calculate passive activity loss limits
  const passiveLossLimit = calculatePassiveLossLimit(adjustedGrossIncome, filingStatus);
  
  if (realEstateProfessional || materialParticipation) {
    // Active participation - can deduct up to $25,000 if AGI is under $100,000
    if (adjustedGrossIncome < 100000) {
      deductibleLoss = Math.min(passiveActivityLoss, 25000);
      suspendedLoss = Math.max(0, passiveActivityLoss - 25000);
    } else if (adjustedGrossIncome < 150000) {
      // Phase-out between $100,000 and $150,000
      const phaseOutAmount = (adjustedGrossIncome - 100000) * 0.5;
      deductibleLoss = Math.min(passiveActivityLoss, Math.max(0, 25000 - phaseOutAmount));
      suspendedLoss = Math.max(0, passiveActivityLoss - deductibleLoss);
    } else {
      // No deduction if AGI is over $150,000
      suspendedLoss = passiveActivityLoss;
    }
  } else {
    // Passive activity - can only deduct against passive income
    const netPassiveIncome = otherPassiveIncome - otherPassiveLosses;
    deductibleLoss = Math.min(passiveActivityLoss, Math.max(0, netPassiveIncome));
    suspendedLoss = Math.max(0, passiveActivityLoss - deductibleLoss);
  }

  // Apply at-risk rules
  deductibleLoss = Math.min(deductibleLoss, atRiskAmount);
  suspendedLoss = Math.max(0, passiveActivityLoss - deductibleLoss);

  return {
    passiveActivityLoss,
    atRiskAmount,
    materialParticipation,
    realEstateProfessional,
    deductibleLoss,
    suspendedLoss
  };
}

function calculatePassiveLossLimit(adjustedGrossIncome: number, filingStatus: string): number {
  // Simplified calculation - actual rules are more complex
  if (filingStatus === 'married-joint') {
    return Math.max(0, 25000 - Math.max(0, (adjustedGrossIncome - 100000) * 0.5));
  } else {
    return Math.max(0, 25000 - Math.max(0, (adjustedGrossIncome - 100000) * 0.5));
  }
}

function calculateTaxSavings(
  operatingExpenses: number,
  depreciation: number,
  deductibleLoss: number,
  filingStatus: string,
  adjustedGrossIncome: number
): {
  operatingExpenseSavings: number;
  depreciationSavings: number;
  totalTaxSavings: number;
  effectiveTaxRate: number;
} {
  // Calculate effective tax rate based on filing status and income
  const effectiveTaxRate = calculateEffectiveTaxRate(adjustedGrossIncome, filingStatus);
  
  const operatingExpenseSavings = operatingExpenses * effectiveTaxRate;
  const depreciationSavings = depreciation * effectiveTaxRate;
  const totalTaxSavings = operatingExpenseSavings + depreciationSavings + (deductibleLoss * effectiveTaxRate);

  return {
    operatingExpenseSavings,
    depreciationSavings,
    totalTaxSavings,
    effectiveTaxRate
  };
}

function calculateEffectiveTaxRate(adjustedGrossIncome: number, filingStatus: string): number {
  // Simplified tax rate calculation - actual rates vary by year and income
  if (adjustedGrossIncome < 10000) return 0.10;
  if (adjustedGrossIncome < 40000) return 0.12;
  if (adjustedGrossIncome < 85000) return 0.22;
  if (adjustedGrossIncome < 160000) return 0.24;
  if (adjustedGrossIncome < 200000) return 0.32;
  if (adjustedGrossIncome < 500000) return 0.35;
  return 0.37;
}

function calculateNetRentalIncome(
  annualRent: number,
  operatingExpenses: number,
  depreciation: number,
  deductibleLoss: number
): {
  grossRentalIncome: number;
  totalDeductions: number;
  netRentalIncome: number;
  taxableIncome: number;
} {
  const grossRentalIncome = annualRent;
  const totalDeductions = operatingExpenses + depreciation + deductibleLoss;
  const netRentalIncome = grossRentalIncome - totalDeductions;
  const taxableIncome = Math.max(0, netRentalIncome);

  return {
    grossRentalIncome,
    totalDeductions,
    netRentalIncome,
    taxableIncome
  };
}

function calculateCarryoverAnalysis(
  suspendedLoss: number,
  effectiveTaxRate: number
): {
  suspendedLosses: number;
  carryoverYears: number;
  futureTaxSavings: number;
} {
  const suspendedLosses = suspendedLoss;
  const carryoverYears = Math.ceil(suspendedLoss / 25000); // Simplified calculation
  const futureTaxSavings = suspendedLoss * effectiveTaxRate;

  return {
    suspendedLosses,
    carryoverYears,
    futureTaxSavings
  };
}

function calculateSummary(
  operatingExpenses: number,
  depreciation: number,
  deductibleLoss: number,
  totalTaxSavings: number,
  netRentalIncome: number
): {
  totalDeductions: number;
  netTaxableIncome: number;
  totalTaxSavings: number;
  afterTaxCashFlow: number;
  taxEfficiency: number;
} {
  const totalDeductions = operatingExpenses + depreciation + deductibleLoss;
  const netTaxableIncome = Math.max(0, netRentalIncome);
  const afterTaxCashFlow = netRentalIncome + totalTaxSavings;
  const taxEfficiency = totalTaxSavings / Math.max(1, totalDeductions) * 100;

  return {
    totalDeductions,
    netTaxableIncome,
    totalTaxSavings,
    afterTaxCashFlow,
    taxEfficiency
  };
}

export function calculateTaxDeductionComparison(
  deduction1: RealEstateTaxDeductionsOutputs,
  deduction2: RealEstateTaxDeductionsOutputs
): {
  taxSavingsDifference: number;
  deductionDifference: number;
  efficiencyDifference: number;
  recommendation: string;
} {
  const taxSavingsDifference = deduction1.taxSavings.totalTaxSavings - deduction2.taxSavings.totalTaxSavings;
  const deductionDifference = deduction1.summary.totalDeductions - deduction2.summary.totalDeductions;
  const efficiencyDifference = deduction1.summary.taxEfficiency - deduction2.summary.taxEfficiency;
  
  let recommendation = 'Both scenarios are comparable';
  if (taxSavingsDifference > 1000) {
    recommendation = 'Scenario 1 offers significantly higher tax savings';
  } else if (taxSavingsDifference < -1000) {
    recommendation = 'Scenario 2 offers significantly higher tax savings';
  } else if (efficiencyDifference > 5) {
    recommendation = 'Scenario 1 is more tax efficient';
  } else if (efficiencyDifference < -5) {
    recommendation = 'Scenario 2 is more tax efficient';
  }
  
  return {
    taxSavingsDifference,
    deductionDifference,
    efficiencyDifference,
    recommendation
  };
}

export function calculateOptimizedDeductions(
  inputs: RealEstateTaxDeductionsInputs
): {
  recommendedDepreciation: number;
  recommendedBonusDepreciation: number;
  recommendedSection179: number;
  totalOptimizedSavings: number;
  optimizationNotes: string[];
} {
  const notes: string[] = [];
  let recommendedDepreciation = inputs.depreciation;
  let recommendedBonusDepreciation = inputs.bonusDepreciation;
  let recommendedSection179 = inputs.section179Deduction;
  
  // Optimization logic
  if (inputs.propertyType === 'commercial' && inputs.bonusDepreciation === 0) {
    recommendedBonusDepreciation = Math.min(100000, (inputs.propertyValue - inputs.landValue) * 0.1);
    notes.push('Consider bonus depreciation for commercial property');
  }
  
  if (inputs.section179Deduction === 0 && inputs.propertyValue < 1000000) {
    recommendedSection179 = Math.min(1080000, inputs.propertyValue - inputs.landValue);
    notes.push('Consider Section 179 deduction for smaller properties');
  }
  
  const totalOptimizedSavings = (recommendedDepreciation + recommendedBonusDepreciation + recommendedSection179) * 0.25;
  
  return {
    recommendedDepreciation,
    recommendedBonusDepreciation,
    recommendedSection179,
    totalOptimizedSavings,
    optimizationNotes: notes
  };
}