import { PropertyTaxProrationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof PropertyTaxProrationInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyAddress':
      return validatePropertyAddress(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value, allInputs);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyAge':
      return validatePropertyAge(value, allInputs);
    case 'propertyUse':
      return validatePropertyUse(value, allInputs);
    case 'propertyCondition':
      return validatePropertyCondition(value, allInputs);
    case 'state':
      return validateState(value, allInputs);
    case 'county':
      return validateCounty(value, allInputs);
    case 'city':
      return validateCity(value, allInputs);
    case 'zipCode':
      return validateZipCode(value, allInputs);
    case 'schoolDistrict':
      return validateSchoolDistrict(value, allInputs);
    case 'countyTaxRate':
      return validateCountyTaxRate(value, allInputs);
    case 'cityTaxRate':
      return validateCityTaxRate(value, allInputs);
    case 'schoolTaxRate':
      return validateSchoolTaxRate(value, allInputs);
    case 'specialDistrictTaxRate':
      return validateSpecialDistrictTaxRate(value, allInputs);
    case 'assessmentRatio':
      return validateAssessmentRatio(value, allInputs);
    case 'homesteadExemptionAmount':
      return validateHomesteadExemptionAmount(value, allInputs);
    case 'seniorExemptionAmount':
      return validateSeniorExemptionAmount(value, allInputs);
    case 'veteranExemptionAmount':
      return validateVeteranExemptionAmount(value, allInputs);
    case 'disabilityExemptionAmount':
      return validateDisabilityExemptionAmount(value, allInputs);
    case 'assessedValue':
      return validateAssessedValue(value, allInputs);
    case 'previousAssessedValue':
      return validatePreviousAssessedValue(value, allInputs);
    case 'assessmentDate':
      return validateAssessmentDate(value, allInputs);
    case 'lastReassessmentDate':
      return validateLastReassessmentDate(value, allInputs);
    case 'reassessmentCycle':
      return validateReassessmentCycle(value, allInputs);
    case 'closingDate':
      return validateClosingDate(value, allInputs);
    case 'taxYear':
      return validateTaxYear(value, allInputs);
    case 'prorationMethod':
      return validateProrationMethod(value, allInputs);
    case 'sellerOccupiedUntil':
      return validateSellerOccupiedUntil(value, allInputs);
    case 'buyerOccupiedFrom':
      return validateBuyerOccupiedFrom(value, allInputs);
    case 'taxPaymentSchedule':
      return validateTaxPaymentSchedule(value, allInputs);
    case 'lastTaxPaymentDate':
      return validateLastTaxPaymentDate(value, allInputs);
    case 'nextTaxPaymentDate':
      return validateNextTaxPaymentDate(value, allInputs);
    case 'lastTaxPaymentAmount':
      return validateLastTaxPaymentAmount(value, allInputs);
    case 'nextTaxPaymentAmount':
      return validateNextTaxPaymentAmount(value, allInputs);
    case 'escrowMonthlyPayment':
      return validateEscrowMonthlyPayment(value, allInputs);
    case 'escrowBalance':
      return validateEscrowBalance(value, allInputs);
    case 'escrowProrationMethod':
      return validateEscrowProrationMethod(value, allInputs);
    case 'customEscrowSplit':
      return validateCustomEscrowSplit(value, allInputs);
    case 'specialAssessments':
      return validateSpecialAssessments(value, allInputs);
    case 'improvementAssessments':
      return validateImprovementAssessments(value, allInputs);
    case 'bondAssessments':
      return validateBondAssessments(value, allInputs);
    case 'marketAppreciationRate':
      return validateMarketAppreciationRate(value, allInputs);
    case 'inflationRate':
      return validateInflationRate(value, allInputs);
    case 'localEconomicGrowth':
      return validateLocalEconomicGrowth(value, allInputs);
    case 'propertyTaxCap':
      return validatePropertyTaxCap(value, allInputs);
    case 'previousYearTax':
      return validatePreviousYearTax(value, allInputs);
    case 'fiveYearAverageTax':
      return validateFiveYearAverageTax(value, allInputs);
    case 'tenYearAverageTax':
      return validateTenYearAverageTax(value, allInputs);
    case 'taxHistory':
      return validateTaxHistory(value, allInputs);
    case 'prorationAccuracy':
      return validateProrationAccuracy(value, allInputs);
    case 'currency':
      return validateCurrency(value, allInputs);
    case 'displayFormat':
      return validateDisplayFormat(value, allInputs);
    default:
      return { isValid: true };
  }
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Property value cannot exceed $100,000,000' };
  }
  if (allInputs?.assessedValue && value < allInputs.assessedValue * 0.5) {
    return { isValid: false, error: 'Property value seems too low compared to assessed value' };
  }
  return { isValid: true };
}

function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property address is required' };
  }
  if (value.length > 200) {
    return { isValid: false, error: 'Property address cannot exceed 200 characters' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'agricultural'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Property type is required and must be valid' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Property size cannot exceed 1,000,000 sq ft' };
  }
  if (allInputs?.propertyType === 'single_family' && value > 10000) {
    return { isValid: false, error: 'Property size seems too large for a single family home' };
  }
  if (allInputs?.propertyType !== 'land' && value < 100) {
    return { isValid: false, error: 'Property size seems too small for the selected property type' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validatePropertyUse(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validUses = ['primary_residence', 'secondary_residence', 'investment', 'commercial', 'vacant'];
  if (!value || !validUses.includes(value)) {
    return { isValid: false, error: 'Property use is required and must be valid' };
  }
  return { isValid: true };
}

function validatePropertyCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_repair'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Property condition is required and must be valid' };
  }
  return { isValid: true };
}

function validateState(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'State is required' };
  }
  if (value.length > 50) {
    return { isValid: false, error: 'State name cannot exceed 50 characters' };
  }
  return { isValid: true };
}

function validateCounty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'County is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'County name cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validateCity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'City is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'City name cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validateZipCode(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'ZIP code is required' };
  }
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return { isValid: false, error: 'ZIP code must be in valid format (e.g., 12345 or 12345-6789)' };
  }
  return { isValid: true };
}

function validateSchoolDistrict(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'School district is required' };
  }
  if (value.length > 100) {
    return { isValid: false, error: 'School district name cannot exceed 100 characters' };
  }
  return { isValid: true };
}

function validateCountyTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'County tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'County tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateCityTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'City tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'City tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateSchoolTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'School tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'School tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateSpecialDistrictTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Special district tax rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Special district tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateAssessmentRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Assessment ratio must be greater than 0' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Assessment ratio cannot exceed 200%' };
  }
  return { isValid: true };
}

function validateHomesteadExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.homesteadExemption) {
    if (value < 0) {
      return { isValid: false, error: 'Homestead exemption amount cannot be negative' };
    }
    if (allInputs?.assessedValue && value > allInputs.assessedValue) {
      return { isValid: false, error: 'Homestead exemption cannot exceed assessed value' };
    }
  }
  return { isValid: true };
}

function validateSeniorExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.seniorExemption) {
    if (value < 0) {
      return { isValid: false, error: 'Senior exemption amount cannot be negative' };
    }
    if (allInputs?.assessedValue && value > allInputs.assessedValue) {
      return { isValid: false, error: 'Senior exemption cannot exceed assessed value' };
    }
  }
  return { isValid: true };
}

function validateVeteranExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.veteranExemption) {
    if (value < 0) {
      return { isValid: false, error: 'Veteran exemption amount cannot be negative' };
    }
    if (allInputs?.assessedValue && value > allInputs.assessedValue) {
      return { isValid: false, error: 'Veteran exemption cannot exceed assessed value' };
    }
  }
  return { isValid: true };
}

function validateDisabilityExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (allInputs?.disabilityExemption) {
    if (value < 0) {
      return { isValid: false, error: 'Disability exemption amount cannot be negative' };
    }
    if (allInputs?.assessedValue && value > allInputs.assessedValue) {
      return { isValid: false, error: 'Disability exemption cannot exceed assessed value' };
    }
  }
  return { isValid: true };
}

function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Assessed value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Assessed value cannot exceed $100,000,000' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue * 2) {
    return { isValid: false, error: 'Assessed value cannot exceed 200% of property value' };
  }
  return { isValid: true };
}

function validatePreviousAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Previous assessed value cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, error: 'Previous assessed value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

function validateAssessmentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Assessment date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Assessment date must be a valid date' };
  }
  return { isValid: true };
}

function validateLastReassessmentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Last reassessment date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Last reassessment date must be a valid date' };
  }
  return { isValid: true };
}

function validateReassessmentCycle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Reassessment cycle cannot be negative' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Reassessment cycle cannot exceed 20 years' };
  }
  return { isValid: true };
}

function validateClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Closing date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Closing date must be a valid date' };
  }
  if (allInputs?.sellerOccupiedUntil && allInputs?.buyerOccupiedFrom) {
    const closingDate = new Date(value);
    const sellerOccupiedUntil = new Date(allInputs.sellerOccupiedUntil);
    const buyerOccupiedFrom = new Date(allInputs.buyerOccupiedFrom);
    
    if (closingDate < sellerOccupiedUntil) {
      return { isValid: false, error: 'Closing date must be after or equal to seller occupied until date' };
    }
    if (closingDate > buyerOccupiedFrom) {
      return { isValid: false, error: 'Closing date must be before or equal to buyer occupied from date' };
    }
  }
  return { isValid: true };
}

function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1900) {
    return { isValid: false, error: 'Tax year must be 1900 or later' };
  }
  if (value > 2100) {
    return { isValid: false, error: 'Tax year cannot exceed 2100' };
  }
  return { isValid: true };
}

function validateProrationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validMethods = ['365_day', '360_day', 'actual_days', 'banker_30_360'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, error: 'Proration method is required and must be valid' };
  }
  return { isValid: true };
}

function validateSellerOccupiedUntil(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Seller occupied until date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Seller occupied until date must be a valid date' };
  }
  if (allInputs?.buyerOccupiedFrom) {
    const sellerOccupiedUntil = new Date(value);
    const buyerOccupiedFrom = new Date(allInputs.buyerOccupiedFrom);
    
    if (sellerOccupiedUntil > buyerOccupiedFrom) {
      return { isValid: false, error: 'Seller occupied until date must be before or equal to buyer occupied from date' };
    }
  }
  return { isValid: true };
}

function validateBuyerOccupiedFrom(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Buyer occupied from date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Buyer occupied from date must be a valid date' };
  }
  return { isValid: true };
}

function validateTaxPaymentSchedule(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validSchedules = ['annual', 'semi_annual', 'quarterly', 'monthly'];
  if (!value || !validSchedules.includes(value)) {
    return { isValid: false, error: 'Tax payment schedule is required and must be valid' };
  }
  return { isValid: true };
}

function validateLastTaxPaymentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Last tax payment date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Last tax payment date must be a valid date' };
  }
  if (allInputs?.nextTaxPaymentDate) {
    const lastPayment = new Date(value);
    const nextPayment = new Date(allInputs.nextTaxPaymentDate);
    
    if (lastPayment >= nextPayment) {
      return { isValid: false, error: 'Last tax payment date must be before next tax payment date' };
    }
  }
  return { isValid: true };
}

function validateNextTaxPaymentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Next tax payment date is required' };
  }
  if (!isValidDate(value)) {
    return { isValid: false, error: 'Next tax payment date must be a valid date' };
  }
  return { isValid: true };
}

function validateLastTaxPaymentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Last tax payment amount cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Last tax payment amount cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateNextTaxPaymentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Next tax payment amount cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Next tax payment amount cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateEscrowMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Escrow monthly payment cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Escrow monthly payment cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateEscrowBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Escrow balance cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Escrow balance cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateEscrowProrationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validMethods = ['seller_pays_all', 'buyer_pays_all', 'split_50_50', 'custom_split'];
  if (!value || !validMethods.includes(value)) {
    return { isValid: false, error: 'Escrow proration method is required and must be valid' };
  }
  return { isValid: true };
}

function validateCustomEscrowSplit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Custom escrow split cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Custom escrow split cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateSpecialAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Special assessments must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const assessment = value[i];
    if (!assessment.description || assessment.description.trim().length === 0) {
      return { isValid: false, error: `Special assessment ${i + 1} description is required` };
    }
    if (assessment.amount < 0) {
      return { isValid: false, error: `Special assessment ${i + 1} amount cannot be negative` };
    }
    if (assessment.duration < 0) {
      return { isValid: false, error: `Special assessment ${i + 1} duration cannot be negative` };
    }
    if (assessment.annualAmount < 0) {
      return { isValid: false, error: `Special assessment ${i + 1} annual amount cannot be negative` };
    }
  }
  return { isValid: true };
}

function validateImprovementAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Improvement assessments must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const assessment = value[i];
    if (!assessment.description || assessment.description.trim().length === 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} description is required` };
    }
    if (assessment.amount < 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} amount cannot be negative` };
    }
    if (assessment.duration < 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} duration cannot be negative` };
    }
    if (assessment.annualAmount < 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} annual amount cannot be negative` };
    }
  }
  return { isValid: true };
}

function validateBondAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Bond assessments must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const assessment = value[i];
    if (!assessment.description || assessment.description.trim().length === 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} description is required` };
    }
    if (assessment.amount < 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} amount cannot be negative` };
    }
    if (assessment.duration < 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} duration cannot be negative` };
    }
    if (assessment.annualAmount < 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} annual amount cannot be negative` };
    }
  }
  return { isValid: true };
}

function validateMarketAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -50) {
    return { isValid: false, error: 'Market appreciation rate cannot be less than -50%' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market appreciation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -50) {
    return { isValid: false, error: 'Inflation rate cannot be less than -50%' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateLocalEconomicGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -50) {
    return { isValid: false, error: 'Local economic growth cannot be less than -50%' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Local economic growth cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePropertyTaxCap(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property tax cap cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Property tax cap cannot exceed 50%' };
  }
  return { isValid: true };
}

function validatePreviousYearTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Previous year tax cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Previous year tax cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateFiveYearAverageTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Five year average tax cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Five year average tax cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateTenYearAverageTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Ten year average tax cannot be negative' };
  }
  if (value > 1000000) {
    return { isValid: false, error: 'Ten year average tax cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

function validateTaxHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Tax history must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const entry = value[i];
    if (entry.year < 1900 || entry.year > 2100) {
      return { isValid: false, error: `Tax history entry ${i + 1} year must be between 1900 and 2100` };
    }
    if (entry.assessedValue < 0) {
      return { isValid: false, error: `Tax history entry ${i + 1} assessed value cannot be negative` };
    }
    if (entry.taxAmount < 0) {
      return { isValid: false, error: `Tax history entry ${i + 1} tax amount cannot be negative` };
    }
    if (entry.taxRate < 0) {
      return { isValid: false, error: `Tax history entry ${i + 1} tax rate cannot be negative` };
    }
    if (!entry.paymentDate || !isValidDate(entry.paymentDate)) {
      return { isValid: false, error: `Tax history entry ${i + 1} payment date must be a valid date` };
    }
  }
  return { isValid: true };
}

function validateProrationAccuracy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validAccuracies = ['exact', 'estimated', 'approximate'];
  if (!value || !validAccuracies.includes(value)) {
    return { isValid: false, error: 'Proration accuracy is required and must be valid' };
  }
  return { isValid: true };
}

function validateCurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Currency is required and must be valid' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!value || !validFormats.includes(value)) {
    return { isValid: false, error: 'Display format is required and must be valid' };
  }
  return { isValid: true };
}

// Helper function to validate date strings
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}