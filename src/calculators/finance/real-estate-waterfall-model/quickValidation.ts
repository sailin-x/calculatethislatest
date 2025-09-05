import { RealEstateWaterfallModelInputs } from './types';

export function validateTotalInvestment(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Total investment must be greater than 0';
  }
  if (value > 1000000000) {
    return 'Total investment cannot exceed $1,000,000,000';
  }
  return null;
}

export function validateSponsorEquity(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Sponsor equity cannot be negative';
  }
  if (value > allInputs.totalInvestment) {
    return 'Sponsor equity cannot exceed total investment';
  }
  return null;
}

export function validateInvestorEquity(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Investor equity cannot be negative';
  }
  if (value > allInputs.totalInvestment) {
    return 'Investor equity cannot exceed total investment';
  }
  return null;
}

export function validatePreferredReturn(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Preferred return cannot be negative';
  }
  if (value > 20) {
    return 'Preferred return cannot exceed 20%';
  }
  return null;
}

export function validateCatchUpPercentage(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Catch-up percentage cannot be negative';
  }
  if (value > 50) {
    return 'Catch-up percentage cannot exceed 50%';
  }
  return null;
}

export function validatePromotePercentage(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Promote percentage cannot be negative';
  }
  if (value > 50) {
    return 'Promote percentage cannot exceed 50%';
  }
  return null;
}

export function validateWaterfallStructure(value: string, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (!value || !['simple', 'complex', 'custom'].includes(value)) {
    return 'Waterfall structure must be simple, complex, or custom';
  }
  return null;
}

export function validateHoldPeriod(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Hold period must be greater than 0';
  }
  if (value > 30) {
    return 'Hold period cannot exceed 30 years';
  }
  return null;
}

export function validateAnnualCashFlow(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Annual cash flow cannot be negative';
  }
  if (value > 10000000) {
    return 'Annual cash flow cannot exceed $10,000,000';
  }
  return null;
}

export function validateExitValue(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Exit value must be greater than 0';
  }
  if (value > 1000000000) {
    return 'Exit value cannot exceed $1,000,000,000';
  }
  return null;
}

export function validateManagementFees(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Management fees cannot be negative';
  }
  if (value > 1000000) {
    return 'Management fees cannot exceed $1,000,000';
  }
  return null;
}

export function validateAcquisitionFees(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Acquisition fees cannot be negative';
  }
  if (value > 1000000) {
    return 'Acquisition fees cannot exceed $1,000,000';
  }
  return null;
}

export function validateDispositionFees(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Disposition fees cannot be negative';
  }
  if (value > 1000000) {
    return 'Disposition fees cannot exceed $1,000,000';
  }
  return null;
}

export function validateOperatingExpenses(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Operating expenses cannot be negative';
  }
  if (value > 5000000) {
    return 'Operating expenses cannot exceed $5,000,000';
  }
  return null;
}

export function validateDebtService(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Debt service cannot be negative';
  }
  if (value > 10000000) {
    return 'Debt service cannot exceed $10,000,000';
  }
  return null;
}

export function validatePropertyValue(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Property value must be greater than 0';
  }
  if (value > 1000000000) {
    return 'Property value cannot exceed $1,000,000,000';
  }
  return null;
}

export function validateLoanAmount(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Loan amount cannot be negative';
  }
  if (value > allInputs.propertyValue) {
    return 'Loan amount cannot exceed property value';
  }
  return null;
}

export function validateInterestRate(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Interest rate cannot be negative';
  }
  if (value > 20) {
    return 'Interest rate cannot exceed 20%';
  }
  return null;
}

export function validateLoanTerm(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Loan term must be greater than 0';
  }
  if (value > 30) {
    return 'Loan term cannot exceed 30 years';
  }
  return null;
}

export function validateInterestOnlyPeriod(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Interest-only period cannot be negative';
  }
  if (value > allInputs.loanTerm) {
    return 'Interest-only period cannot exceed loan term';
  }
  return null;
}

export function validateDepreciation(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Depreciation cannot be negative';
  }
  if (value > 1000000) {
    return 'Depreciation cannot exceed $1,000,000';
  }
  return null;
}

export function validateTaxBenefits(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value < 0) {
    return 'Tax benefits cannot be negative';
  }
  if (value > 1000000) {
    return 'Tax benefits cannot exceed $1,000,000';
  }
  return null;
}

export function validateInvestorCount(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Investor count must be greater than 0';
  }
  if (value > 1000) {
    return 'Investor count cannot exceed 1,000';
  }
  return null;
}

export function validateMinimumInvestment(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Minimum investment must be greater than 0';
  }
  if (value > 1000000) {
    return 'Minimum investment cannot exceed $1,000,000';
  }
  return null;
}

export function validateMaximumInvestment(value: number, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (value <= 0) {
    return 'Maximum investment must be greater than 0';
  }
  if (value > 10000000) {
    return 'Maximum investment cannot exceed $10,000,000';
  }
  return null;
}

export function validateInvestorType(value: string, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (!value || !['accredited', 'qualified', 'retail'].includes(value)) {
    return 'Investor type must be accredited, qualified, or retail';
  }
  return null;
}

export function validateStateRegulations(value: string[], allInputs: RealEstateWaterfallModelInputs): string | null {
  if (!Array.isArray(value)) {
    return 'State regulations must be an array';
  }
  if (value.length > 50) {
    return 'State regulations cannot exceed 50 items';
  }
  return null;
}

export function validateOfferingDocument(value: boolean, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (typeof value !== 'boolean') {
    return 'Offering document must be a boolean value';
  }
  return null;
}

export function validateDueDiligence(value: boolean, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (typeof value !== 'boolean') {
    return 'Due diligence must be a boolean value';
  }
  return null;
}

export function validateSecCompliance(value: boolean, allInputs: RealEstateWaterfallModelInputs): string | null {
  if (typeof value !== 'boolean') {
    return 'SEC compliance must be a boolean value';
  }
  return null;
}