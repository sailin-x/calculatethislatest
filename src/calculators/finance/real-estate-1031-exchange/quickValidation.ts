import { RealEstate1031ExchangeInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: keyof RealEstate1031ExchangeInputs,
  value: any,
  allInputs: RealEstate1031ExchangeInputs
): QuickValidationResult {
  switch (fieldName) {
    case 'relinquishedPropertyValue':
      return validateRelinquishedPropertyValue(value);
    case 'relinquishedPropertyBasis':
      return validateRelinquishedPropertyBasis(value);
    case 'relinquishedPropertyDebt':
      return validateRelinquishedPropertyDebt(value, allInputs);
    case 'relinquishedPropertyAcquisitionDate':
      return validateRelinquishedPropertyAcquisitionDate(value);
    case 'relinquishedPropertySaleDate':
      return validateRelinquishedPropertySaleDate(value, allInputs);
    case 'relinquishedPropertySalePrice':
      return validateRelinquishedPropertySalePrice(value, allInputs);
    case 'relinquishedPropertySellingCosts':
      return validateRelinquishedPropertySellingCosts(value, allInputs);
    case 'replacementPropertyValue':
      return validateReplacementPropertyValue(value);
    case 'replacementPropertyBasis':
      return validateReplacementPropertyBasis(value);
    case 'replacementPropertyDebt':
      return validateReplacementPropertyDebt(value, allInputs);
    case 'replacementPropertyAcquisitionDate':
      return validateReplacementPropertyAcquisitionDate(value, allInputs);
    case 'replacementPropertyAcquisitionCosts':
      return validateReplacementPropertyAcquisitionCosts(value);
    case 'exchangeType':
      return validateExchangeType(value);
    case 'identificationPeriod':
      return validateIdentificationPeriod(value);
    case 'exchangePeriod':
      return validateExchangePeriod(value);
    case 'exchangeFees':
      return validateExchangeFees(value);
    case 'cashBoot':
      return validateCashBoot(value);
    case 'mortgageBoot':
      return validateMortgageBoot(value);
    case 'personalPropertyBoot':
      return validatePersonalPropertyBoot(value);
    case 'otherBoot':
      return validateOtherBoot(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'stateTaxRate':
      return validateStateTaxRate(value);
    case 'depreciationRecaptureRate':
      return validateDepreciationRecaptureRate(value);
    case 'holdingPeriod':
      return validateHoldingPeriod(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateRelinquishedPropertyValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Relinquished property value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: true, warning: 'Property value seems unusually high' };
  }
  return { isValid: true };
}

function validateRelinquishedPropertyBasis(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Relinquished property basis must be greater than 0' };
  }
  return { isValid: true };
}

function validateRelinquishedPropertyDebt(value: number, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Relinquished property debt cannot be negative' };
  }
  if (value > inputs.relinquishedPropertyValue) {
    return { isValid: false, error: 'Debt cannot exceed property value' };
  }
  return { isValid: true };
}

function validateRelinquishedPropertyAcquisitionDate(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Relinquished property acquisition date is required' };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  return { isValid: true };
}

function validateRelinquishedPropertySaleDate(value: string, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Relinquished property sale date is required' };
  }
  const saleDate = new Date(value);
  if (isNaN(saleDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  if (inputs.relinquishedPropertyAcquisitionDate) {
    const acquisitionDate = new Date(inputs.relinquishedPropertyAcquisitionDate);
    if (saleDate <= acquisitionDate) {
      return { isValid: false, error: 'Sale date must be after acquisition date' };
    }
  }
  return { isValid: true };
}

function validateRelinquishedPropertySalePrice(value: number, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Relinquished property sale price must be greater than 0' };
  }
  if (inputs.relinquishedPropertySellingCosts && value < inputs.relinquishedPropertySellingCosts) {
    return { isValid: false, error: 'Sale price must be greater than selling costs' };
  }
  const netProceeds = value - (inputs.relinquishedPropertySellingCosts || 0);
  if (inputs.relinquishedPropertyDebt && netProceeds < inputs.relinquishedPropertyDebt) {
    return { isValid: false, error: 'Net sale proceeds must be sufficient to pay off debt' };
  }
  return { isValid: true };
}

function validateRelinquishedPropertySellingCosts(value: number, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Relinquished property selling costs cannot be negative' };
  }
  if (inputs.relinquishedPropertySalePrice && value >= inputs.relinquishedPropertySalePrice) {
    return { isValid: false, error: 'Selling costs cannot exceed sale price' };
  }
  return { isValid: true };
}

function validateReplacementPropertyValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Replacement property value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: true, warning: 'Property value seems unusually high' };
  }
  return { isValid: true };
}

function validateReplacementPropertyBasis(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Replacement property basis must be greater than 0' };
  }
  return { isValid: true };
}

function validateReplacementPropertyDebt(value: number, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Replacement property debt cannot be negative' };
  }
  if (value > inputs.replacementPropertyBasis) {
    return { isValid: false, error: 'Replacement property debt cannot exceed basis' };
  }
  return { isValid: true };
}

function validateReplacementPropertyAcquisitionDate(value: string, inputs: RealEstate1031ExchangeInputs): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Replacement property acquisition date is required' };
  }
  const replacementDate = new Date(value);
  if (isNaN(replacementDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  if (inputs.relinquishedPropertySaleDate) {
    const saleDate = new Date(inputs.relinquishedPropertySaleDate);
    if (replacementDate < saleDate) {
      return { isValid: false, error: 'Replacement property acquisition date cannot be before sale date' };
    }
  }
  return { isValid: true };
}

function validateReplacementPropertyAcquisitionCosts(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Replacement property acquisition costs cannot be negative' };
  }
  return { isValid: true };
}

function validateExchangeType(value: string): QuickValidationResult {
  const validTypes = ['simultaneous', 'delayed', 'reverse', 'build-to-suit'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid exchange type' };
  }
  return { isValid: true };
}

function validateIdentificationPeriod(value: number): QuickValidationResult {
  if (value < 0 || value > 45) {
    return { isValid: false, error: 'Identification period must be between 0 and 45 days' };
  }
  return { isValid: true };
}

function validateExchangePeriod(value: number): QuickValidationResult {
  if (value < 0 || value > 180) {
    return { isValid: false, error: 'Exchange period must be between 0 and 180 days' };
  }
  return { isValid: true };
}

function validateExchangeFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Exchange fees cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: true, warning: 'Exchange fees seem unusually high' };
  }
  return { isValid: true };
}

function validateCashBoot(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Cash boot cannot be negative' };
  }
  return { isValid: true };
}

function validateMortgageBoot(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Mortgage boot cannot be negative' };
  }
  return { isValid: true };
}

function validatePersonalPropertyBoot(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Personal property boot cannot be negative' };
  }
  return { isValid: true };
}

function validateOtherBoot(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Other boot cannot be negative' };
  }
  return { isValid: true };
}

function validateTaxRate(value: number): QuickValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateStateTaxRate(value: number): QuickValidationResult {
  if (value < 0 || value > 15) {
    return { isValid: false, error: 'State tax rate must be between 0% and 15%' };
  }
  return { isValid: true };
}

function validateDepreciationRecaptureRate(value: number): QuickValidationResult {
  if (value < 0 || value > 50) {
    return { isValid: false, error: 'Depreciation recapture rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateHoldingPeriod(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Holding period cannot be negative' };
  }
  return { isValid: true };
}

function validateCurrency(value: string): QuickValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: string): QuickValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}