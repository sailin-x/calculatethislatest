import { ValidationResult } from '../../types';

export function validateTotalInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Total investment is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Total investment must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Total investment must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Total investment cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateSponsorEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Sponsor equity is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Sponsor equity must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Sponsor equity cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Sponsor equity cannot exceed $1 billion' };
  }

  // Check that sponsor equity doesn't exceed total investment
  if (allInputs?.totalInvestment && numValue > allInputs.totalInvestment) {
    return { isValid: false, error: 'Sponsor equity cannot exceed total investment' };
  }

  return { isValid: true };
}

export function validateInvestorEquity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Investor equity is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Investor equity must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Investor equity cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Investor equity cannot exceed $1 billion' };
  }

  // Check that total equity doesn't exceed total investment
  if (allInputs?.totalInvestment && allInputs?.sponsorEquity) {
    const totalEquity = numValue + allInputs.sponsorEquity;
    if (totalEquity > allInputs.totalInvestment) {
      return { isValid: false, error: 'Total equity cannot exceed total investment' };
    }
  }

  return { isValid: true };
}

export function validatePreferredReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Preferred return is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Preferred return must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Preferred return cannot be negative' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Preferred return cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validatePromotePercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Promote percentage is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Promote percentage must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Promote percentage cannot be negative' };
  }

  if (numValue > 50) {
    return { isValid: false, error: 'Promote percentage cannot exceed 50%' };
  }

  return { isValid: true };
}

export function validateWaterfallStructure(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Waterfall structure is required' };
  }

  const validStructures = ['simple', 'complex', 'custom'];
  if (!validStructures.includes(value)) {
    return { isValid: false, error: 'Waterfall structure must be simple, complex, or custom' };
  }

  return { isValid: true };
}

export function validateHoldPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Hold period is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Hold period must be a valid integer' };
  }

  if (numValue < 1) {
    return { isValid: false, error: 'Hold period must be at least 1 year' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Hold period cannot exceed 20 years' };
  }

  return { isValid: true };
}

export function validateExpectedIRR(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected IRR is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Expected IRR must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Expected IRR cannot be negative' };
  }

  if (numValue > 50) {
    return { isValid: false, error: 'Expected IRR cannot exceed 50%' };
  }

  return { isValid: true };
}

export function validateExpectedMultiple(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected multiple is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Expected multiple must be a valid number' };
  }

  if (numValue < 1) {
    return { isValid: false, error: 'Expected multiple must be at least 1x' };
  }

  if (numValue > 10) {
    return { isValid: false, error: 'Expected multiple cannot exceed 10x' };
  }

  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Management fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Management fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Management fees cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Management fees cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateAcquisitionFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Acquisition fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Acquisition fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Acquisition fees cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Acquisition fees cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateDispositionFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Disposition fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Disposition fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Disposition fees cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Disposition fees cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Operating expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Operating expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Operating expenses cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Operating expenses cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateDebtService(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Debt service is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Debt service must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Debt service cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Debt service cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Property value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Property value must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Property value cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateExitValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Exit value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Exit value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Exit value must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Exit value cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateDepreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Depreciation is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Depreciation must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Depreciation cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Depreciation cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateTaxBenefits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Tax benefits are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Tax benefits must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Tax benefits cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Tax benefits cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateInvestorCount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Investor count is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Investor count must be a valid integer' };
  }

  if (numValue < 1) {
    return { isValid: false, error: 'Investor count must be at least 1' };
  }

  if (numValue > 1000) {
    return { isValid: false, error: 'Investor count cannot exceed 1000' };
  }

  return { isValid: true };
}

export function validateMinimumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Minimum investment is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Minimum investment must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Minimum investment must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Minimum investment cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateMaximumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Maximum investment is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Maximum investment must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Maximum investment must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Maximum investment cannot exceed $10 million' };
  }

  // Check that maximum is greater than minimum
  if (allInputs?.minimumInvestment && numValue < allInputs.minimumInvestment) {
    return { isValid: false, error: 'Maximum investment must be greater than minimum investment' };
  }

  return { isValid: true };
}

export function validateInvestorType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Investor type is required' };
  }

  const validTypes = ['accredited', 'non-accredited', 'both'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Investor type must be accredited, non-accredited, or both' };
  }

  return { isValid: true };
}

export function validateStateRegulations(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  if (!Array.isArray(value)) {
    return { isValid: false, error: 'State regulations must be an array' };
  }

  if (value.length > 50) {
    return { isValid: false, error: 'State regulations cannot exceed 50 items' };
  }

  return { isValid: true };
}

export function validateSecCompliance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'SEC compliance is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'SEC compliance must be a boolean value' };
  }

  return { isValid: true };
}

export function validateOfferingDocument(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Offering document is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Offering document must be a boolean value' };
  }

  return { isValid: true };
}

export function validateDueDiligence(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Due diligence is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Due diligence must be a boolean value' };
  }

  return { isValid: true };
}