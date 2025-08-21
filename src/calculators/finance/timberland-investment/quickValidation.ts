import { CalculatorInputs } from '../../../types/calculator';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validatePropertySize(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property size must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Property size must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Property size is very large. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePurchasePrice(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Purchase price must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Purchase price must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: true, message: 'Purchase price is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateDownPayment(value: any, purchasePrice?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Down payment must be greater than 0' };
  }
  if (purchasePrice && value >= purchasePrice) {
    return { isValid: false, message: 'Down payment must be less than purchase price' };
  }
  if (purchasePrice && value < purchasePrice * 0.1) {
    return { isValid: true, message: 'Down payment is less than 10% of purchase price. This may affect loan approval' };
  }
  return { isValid: true, message: '' };
}

export function validateInterestRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: true, message: 'Interest rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateLoanTerm(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Loan term must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Loan term must be greater than 0' };
  }
  if (value > 30) {
    return { isValid: true, message: 'Loan term is longer than typical timberland loans' };
  }
  return { isValid: true, message: '' };
}

export function validateTimberType(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Timber type must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validateCurrentStandAge(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current stand age must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current stand age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: true, message: 'Current stand age is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateRotationAge(value: any, currentStandAge?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Rotation age must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Rotation age must be greater than 0' };
  }
  if (currentStandAge && value < currentStandAge) {
    return { isValid: false, message: 'Rotation age must be greater than or equal to current stand age' };
  }
  if (value > 100) {
    return { isValid: true, message: 'Rotation age is very long. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateCurrentVolume(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Current volume must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Current volume cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: true, message: 'Current volume is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateMatureVolume(value: any, currentVolume?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Mature volume must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Mature volume must be greater than 0' };
  }
  if (currentVolume && value < currentVolume) {
    return { isValid: false, message: 'Mature volume must be greater than or equal to current volume' };
  }
  if (value > 100000) {
    return { isValid: true, message: 'Mature volume is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateTimberPrice(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Timber price must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Timber price must be greater than 0' };
  }
  if (value > 5) {
    return { isValid: true, message: 'Timber price is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePriceGrowthRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Price growth rate must be a valid number' };
  }
  if (value < -20) {
    return { isValid: false, message: 'Price growth rate cannot be less than -20%' };
  }
  if (value > 20) {
    return { isValid: true, message: 'Price growth rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateVolumeGrowthRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Volume growth rate must be a valid number' };
  }
  if (value < -10) {
    return { isValid: false, message: 'Volume growth rate cannot be less than -10%' };
  }
  if (value > 10) {
    return { isValid: true, message: 'Volume growth rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateHarvestCosts(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Harvest costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Harvest costs cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: true, message: 'Harvest costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateReplantingCosts(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Replanting costs must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Replanting costs cannot be negative' };
  }
  if (value > 2000) {
    return { isValid: true, message: 'Replanting costs are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAnnualExpenses(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Annual expenses must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Annual expenses cannot be negative' };
  }
  if (value > 500) {
    return { isValid: true, message: 'Annual expenses are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validatePropertyTaxes(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Property taxes must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Property taxes cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: true, message: 'Property taxes are very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateInsurance(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Insurance must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Insurance cannot be negative' };
  }
  if (value > 5000) {
    return { isValid: true, message: 'Insurance is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateManagementFee(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Management fee must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Management fee cannot be negative' };
  }
  if (value > 20) {
    return { isValid: true, message: 'Management fee is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAppreciationRate(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Appreciation rate must be a valid number' };
  }
  if (value < -10) {
    return { isValid: false, message: 'Appreciation rate cannot be less than -10%' };
  }
  if (value > 15) {
    return { isValid: true, message: 'Appreciation rate is very high. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAnalysisPeriod(value: any): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Analysis period must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: true, message: 'Analysis period is very long. Consider a shorter period' };
  }
  return { isValid: true, message: '' };
}

export function validateHarvestSchedule(value: any): ValidationResult {
  if (typeof value !== 'string' || !value) {
    return { isValid: false, message: 'Harvest schedule must be selected' };
  }
  return { isValid: true, message: '' };
}

export function validateThinningVolume(value: any, matureVolume?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Thinning volume must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Thinning volume cannot be negative' };
  }
  if (matureVolume && value > matureVolume) {
    return { isValid: false, message: 'Thinning volume cannot exceed mature volume' };
  }
  return { isValid: true, message: '' };
}

export function validateThinningAge(value: any, rotationAge?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Thinning age must be a valid number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Thinning age cannot be negative' };
  }
  if (rotationAge && value >= rotationAge) {
    return { isValid: false, message: 'Thinning age must be less than rotation age' };
  }
  return { isValid: true, message: '' };
}

export function validateThinningPrice(value: any, timberPrice?: number): ValidationResult {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Thinning price must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Thinning price must be greater than 0' };
  }
  if (timberPrice && value > timberPrice) {
    return { isValid: true, message: 'Thinning price is higher than mature timber price. Verify the value is correct' };
  }
  return { isValid: true, message: '' };
}

export function validateAllTimberlandInvestmentInputs(inputs: CalculatorInputs): ValidationResult {
  const validations = [
    validatePropertySize(inputs.propertySize),
    validatePurchasePrice(inputs.purchasePrice),
    validateDownPayment(inputs.downPayment, inputs.purchasePrice),
    validateInterestRate(inputs.interestRate),
    validateLoanTerm(inputs.loanTerm),
    validateTimberType(inputs.timberType),
    validateCurrentStandAge(inputs.currentStandAge),
    validateRotationAge(inputs.rotationAge, inputs.currentStandAge),
    validateCurrentVolume(inputs.currentVolume),
    validateMatureVolume(inputs.matureVolume, inputs.currentVolume),
    validateTimberPrice(inputs.timberPrice),
    validatePriceGrowthRate(inputs.priceGrowthRate),
    validateVolumeGrowthRate(inputs.volumeGrowthRate),
    validateHarvestCosts(inputs.harvestCosts),
    validateReplantingCosts(inputs.replantingCosts),
    validateAnnualExpenses(inputs.annualExpenses),
    validatePropertyTaxes(inputs.propertyTaxes),
    validateInsurance(inputs.insurance),
    validateManagementFee(inputs.managementFee),
    validateAppreciationRate(inputs.appreciationRate),
    validateAnalysisPeriod(inputs.analysisPeriod),
    validateHarvestSchedule(inputs.harvestSchedule),
    validateThinningVolume(inputs.thinningVolume, inputs.matureVolume),
    validateThinningAge(inputs.thinningAge, inputs.rotationAge),
    validateThinningPrice(inputs.thinningPrice, inputs.timberPrice)
  ];

  const errors = validations.filter(v => !v.isValid);
  const warnings = validations.filter(v => v.isValid && v.message);

  if (errors.length > 0) {
    return { isValid: false, message: errors[0].message };
  }

  if (warnings.length > 0) {
    return { isValid: true, message: warnings[0].message };
  }

  return { isValid: true, message: '' };
}
