import { PropertyTaxInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(
  field: keyof PropertyTaxInputs,
  value: any,
  allInputs?: Record<string, any>
): ValidationResult {
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
    case 'homesteadExemption':
      return validateHomesteadExemption(value, allInputs);
    case 'homesteadExemptionAmount':
      return validateHomesteadExemptionAmount(value, allInputs);
    case 'seniorExemption':
      return validateSeniorExemption(value, allInputs);
    case 'seniorExemptionAmount':
      return validateSeniorExemptionAmount(value, allInputs);
    case 'veteranExemption':
      return validateVeteranExemption(value, allInputs);
    case 'veteranExemptionAmount':
      return validateVeteranExemptionAmount(value, allInputs);
    case 'disabilityExemption':
      return validateDisabilityExemption(value, allInputs);
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
    case 'taxYear':
      return validateTaxYear(value, allInputs);
    case 'paymentSchedule':
      return validatePaymentSchedule(value, allInputs);
    case 'escrowAccount':
      return validateEscrowAccount(value, allInputs);
    case 'escrowMonthlyPayment':
      return validateEscrowMonthlyPayment(value, allInputs);
    case 'escrowBalance':
      return validateEscrowBalance(value, allInputs);
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
    case 'analysisPeriod':
      return validateAnalysisPeriod(value, allInputs);
    case 'includeInflation':
      return validateIncludeInflation(value, allInputs);
    case 'includeAppreciation':
      return validateIncludeAppreciation(value, allInputs);
    case 'includeExemptions':
      return validateIncludeExemptions(value, allInputs);
    case 'includeSpecialAssessments':
      return validateIncludeSpecialAssessments(value, allInputs);
    case 'currency':
      return validateCurrency(value, allInputs);
    case 'displayFormat':
      return validateDisplayFormat(value, allInputs);
    case 'includeCharts':
      return validateIncludeCharts(value, allInputs);
    case 'includeComparisons':
      return validateIncludeComparisons(value, allInputs);
    default:
      return { isValid: true };
  }
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Property value cannot exceed $10 million' };
  }
  
  // Cross-field validation with assessed value
  if (allInputs?.assessedValue) {
    const ratio = (allInputs.assessedValue / value) * 100;
    if (ratio > 150) {
      return { isValid: false, error: 'Property value seems low relative to assessed value' };
    }
    if (ratio < 50) {
      return { isValid: false, error: 'Property value seems high relative to assessed value' };
    }
  }
  
  return { isValid: true };
}

function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Property address is required' };
  }
  if (value.trim().length < 10) {
    return { isValid: false, error: 'Property address seems too short' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'agricultural'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, error: 'Valid property type is required' };
  }
  
  // Cross-field validation with property size
  if (allInputs?.propertySize) {
    if (value === 'single_family' && allInputs.propertySize > 10000) {
      return { isValid: false, error: 'Property size seems unusually large for single family home' };
    }
    if (value === 'condo' && allInputs.propertySize > 5000) {
      return { isValid: false, error: 'Property size seems unusually large for condominium' };
    }
    if (value === 'land' && allInputs.propertySize < 1000) {
      return { isValid: false, error: 'Property size seems unusually small for land' };
    }
  }
  
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property size must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  
  // Cross-field validation with property type
  if (allInputs?.propertyType) {
    if (allInputs.propertyType === 'single_family' && value > 10000) {
      return { isValid: false, error: 'Property size seems unusually large for single family home' };
    }
    if (allInputs.propertyType === 'condo' && value > 5000) {
      return { isValid: false, error: 'Property size seems unusually large for condominium' };
    }
    if (allInputs.propertyType === 'land' && value < 1000) {
      return { isValid: false, error: 'Property size seems unusually small for land' };
    }
  }
  
  return { isValid: true };
}

function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Property age must be 0 or greater' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  
  // Cross-field validation with property type
  if (allInputs?.propertyType === 'new_construction' && value > 5) {
    return { isValid: false, error: 'Property age seems inconsistent with new construction' };
  }
  
  return { isValid: true };
}

function validatePropertyUse(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validUses = ['primary_residence', 'secondary_residence', 'investment', 'commercial', 'vacant'];
  if (!value || !validUses.includes(value)) {
    return { isValid: false, error: 'Valid property use is required' };
  }
  return { isValid: true };
}

function validatePropertyCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['excellent', 'good', 'fair', 'poor', 'needs_repair'];
  if (!value || !validConditions.includes(value)) {
    return { isValid: false, error: 'Valid property condition is required' };
  }
  return { isValid: true };
}

function validateState(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'State is required' };
  }
  if (value.trim().length !== 2) {
    return { isValid: false, error: 'State should be a 2-letter abbreviation' };
  }
  return { isValid: true };
}

function validateCounty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'County is required' };
  }
  return { isValid: true };
}

function validateCity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'City is required' };
  }
  return { isValid: true };
}

function validateZipCode(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'ZIP code is required' };
  }
  if (!/^\d{5}(-\d{4})?$/.test(value.trim())) {
    return { isValid: false, error: 'ZIP code must be in valid format (e.g., 12345 or 12345-6789)' };
  }
  return { isValid: true };
}

function validateSchoolDistrict(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'School district is required' };
  }
  return { isValid: true };
}

function validateCountyTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'County tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, error: 'County tax rate cannot exceed 50 per $1000' };
  }
  
  // Cross-field validation with total tax rate
  if (allInputs) {
    const totalRate = value + (allInputs.cityTaxRate || 0) + (allInputs.schoolTaxRate || 0) + (allInputs.specialDistrictTaxRate || 0);
    if (totalRate > 20) {
      return { isValid: false, error: 'Total tax rate seems unusually high' };
    }
  }
  
  return { isValid: true };
}

function validateCityTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'City tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, error: 'City tax rate cannot exceed 50 per $1000' };
  }
  
  // Cross-field validation with total tax rate
  if (allInputs) {
    const totalRate = (allInputs.countyTaxRate || 0) + value + (allInputs.schoolTaxRate || 0) + (allInputs.specialDistrictTaxRate || 0);
    if (totalRate > 20) {
      return { isValid: false, error: 'Total tax rate seems unusually high' };
    }
  }
  
  return { isValid: true };
}

function validateSchoolTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'School tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, error: 'School tax rate cannot exceed 50 per $1000' };
  }
  
  // Cross-field validation with total tax rate
  if (allInputs) {
    const totalRate = (allInputs.countyTaxRate || 0) + (allInputs.cityTaxRate || 0) + value + (allInputs.specialDistrictTaxRate || 0);
    if (totalRate > 20) {
      return { isValid: false, error: 'Total tax rate seems unusually high' };
    }
  }
  
  return { isValid: true };
}

function validateSpecialDistrictTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Special district tax rate must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Special district tax rate cannot exceed 50 per $1000' };
  }
  
  // Cross-field validation with total tax rate
  if (allInputs) {
    const totalRate = (allInputs.countyTaxRate || 0) + (allInputs.cityTaxRate || 0) + (allInputs.schoolTaxRate || 0) + value;
    if (totalRate > 20) {
      return { isValid: false, error: 'Total tax rate seems unusually high' };
    }
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
  
  // Cross-field validation with assessed value and property value
  if (allInputs?.assessedValue && allInputs?.propertyValue) {
    const calculatedRatio = (allInputs.assessedValue / allInputs.propertyValue) * 100;
    if (Math.abs(value - calculatedRatio) > 5) {
      return { isValid: false, error: 'Assessment ratio should match assessed value to property value ratio' };
    }
  }
  
  return { isValid: true };
}

function validateHomesteadExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Homestead exemption must be true or false' };
  }
  return { isValid: true };
}

function validateHomesteadExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Homestead exemption amount must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Homestead exemption amount cannot exceed $100,000' };
  }
  
  // Cross-field validation with assessed value
  if (allInputs?.assessedValue && value > allInputs.assessedValue) {
    return { isValid: false, error: 'Homestead exemption cannot exceed assessed value' };
  }
  
  // Cross-field validation with total exemptions
  if (allInputs?.assessedValue) {
    const totalExemptions = value + 
                           (allInputs.seniorExemption ? (allInputs.seniorExemptionAmount || 0) : 0) +
                           (allInputs.veteranExemption ? (allInputs.veteranExemptionAmount || 0) : 0) +
                           (allInputs.disabilityExemption ? (allInputs.disabilityExemptionAmount || 0) : 0);
    
    if (totalExemptions > allInputs.assessedValue) {
      return { isValid: false, error: 'Total exemptions cannot exceed assessed value' };
    }
  }
  
  return { isValid: true };
}

function validateSeniorExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Senior exemption must be true or false' };
  }
  return { isValid: true };
}

function validateSeniorExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Senior exemption amount must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Senior exemption amount cannot exceed $100,000' };
  }
  
  // Cross-field validation with assessed value
  if (allInputs?.assessedValue && value > allInputs.assessedValue) {
    return { isValid: false, error: 'Senior exemption cannot exceed assessed value' };
  }
  
  // Cross-field validation with total exemptions
  if (allInputs?.assessedValue) {
    const totalExemptions = (allInputs.homesteadExemption ? (allInputs.homesteadExemptionAmount || 0) : 0) +
                           value +
                           (allInputs.veteranExemption ? (allInputs.veteranExemptionAmount || 0) : 0) +
                           (allInputs.disabilityExemption ? (allInputs.disabilityExemptionAmount || 0) : 0);
    
    if (totalExemptions > allInputs.assessedValue) {
      return { isValid: false, error: 'Total exemptions cannot exceed assessed value' };
    }
  }
  
  return { isValid: true };
}

function validateVeteranExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Veteran exemption must be true or false' };
  }
  return { isValid: true };
}

function validateVeteranExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Veteran exemption amount must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Veteran exemption amount cannot exceed $100,000' };
  }
  
  // Cross-field validation with assessed value
  if (allInputs?.assessedValue && value > allInputs.assessedValue) {
    return { isValid: false, error: 'Veteran exemption cannot exceed assessed value' };
  }
  
  // Cross-field validation with total exemptions
  if (allInputs?.assessedValue) {
    const totalExemptions = (allInputs.homesteadExemption ? (allInputs.homesteadExemptionAmount || 0) : 0) +
                           (allInputs.seniorExemption ? (allInputs.seniorExemptionAmount || 0) : 0) +
                           value +
                           (allInputs.disabilityExemption ? (allInputs.disabilityExemptionAmount || 0) : 0);
    
    if (totalExemptions > allInputs.assessedValue) {
      return { isValid: false, error: 'Total exemptions cannot exceed assessed value' };
    }
  }
  
  return { isValid: true };
}

function validateDisabilityExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Disability exemption must be true or false' };
  }
  return { isValid: true };
}

function validateDisabilityExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Disability exemption amount must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Disability exemption amount cannot exceed $100,000' };
  }
  
  // Cross-field validation with assessed value
  if (allInputs?.assessedValue && value > allInputs.assessedValue) {
    return { isValid: false, error: 'Disability exemption cannot exceed assessed value' };
  }
  
  // Cross-field validation with total exemptions
  if (allInputs?.assessedValue) {
    const totalExemptions = (allInputs.homesteadExemption ? (allInputs.homesteadExemptionAmount || 0) : 0) +
                           (allInputs.seniorExemption ? (allInputs.seniorExemptionAmount || 0) : 0) +
                           (allInputs.veteranExemption ? (allInputs.veteranExemptionAmount || 0) : 0) +
                           value;
    
    if (totalExemptions > allInputs.assessedValue) {
      return { isValid: false, error: 'Total exemptions cannot exceed assessed value' };
    }
  }
  
  return { isValid: true };
}

function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Assessed value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Assessed value cannot exceed $10 million' };
  }
  
  // Cross-field validation with property value
  if (allInputs?.propertyValue) {
    const ratio = (value / allInputs.propertyValue) * 100;
    if (ratio > 150) {
      return { isValid: false, error: 'Assessed value seems unusually high relative to property value' };
    }
    if (ratio < 50) {
      return { isValid: false, error: 'Assessed value seems unusually low relative to property value' };
    }
  }
  
  return { isValid: true };
}

function validatePreviousAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Previous assessed value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Previous assessed value cannot exceed $10 million' };
  }
  
  // Cross-field validation with current assessed value
  if (allInputs?.assessedValue) {
    const change = ((allInputs.assessedValue - value) / value) * 100;
    if (change > 50) {
      return { isValid: false, error: 'Assessment change seems unusually large' };
    }
  }
  
  return { isValid: true };
}

function validateAssessmentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Assessment date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Assessment date must be a valid date' };
  }
  
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() < 2000 || date.getFullYear() > currentYear) {
    return { isValid: false, error: 'Assessment date must be between 2000 and current year' };
  }
  
  return { isValid: true };
}

function validateLastReassessmentDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Last reassessment date is required' };
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Last reassessment date must be a valid date' };
  }
  
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() < 2000 || date.getFullYear() > currentYear) {
    return { isValid: false, error: 'Last reassessment date must be between 2000 and current year' };
  }
  
  return { isValid: true };
}

function validateReassessmentCycle(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Reassessment cycle must be greater than 0' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Reassessment cycle cannot exceed 20 years' };
  }
  return { isValid: true };
}

function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 2000) {
    return { isValid: false, error: 'Tax year must be 2000 or greater' };
  }
  if (value > 2050) {
    return { isValid: false, error: 'Tax year cannot exceed 2050' };
  }
  
  const currentYear = new Date().getFullYear();
  if (value > currentYear + 5) {
    return { isValid: false, error: 'Tax year cannot be more than 5 years in the future' };
  }
  
  return { isValid: true };
}

function validatePaymentSchedule(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validSchedules = ['annual', 'semi_annual', 'quarterly', 'monthly'];
  if (!value || !validSchedules.includes(value)) {
    return { isValid: false, error: 'Valid payment schedule is required' };
  }
  return { isValid: true };
}

function validateEscrowAccount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Escrow account must be true or false' };
  }
  return { isValid: true };
}

function validateEscrowMonthlyPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Escrow monthly payment must be 0 or greater' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Escrow monthly payment cannot exceed $10,000' };
  }
  
  // Cross-field validation with property value
  if (allInputs?.propertyValue && value > allInputs.propertyValue * 0.01) {
    return { isValid: false, error: 'Escrow monthly payment seems unusually high' };
  }
  
  return { isValid: true };
}

function validateEscrowBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Escrow balance must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Escrow balance cannot exceed $100,000' };
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
    if (!assessment.amount || assessment.amount < 0) {
      return { isValid: false, error: `Special assessment ${i + 1} amount must be 0 or greater` };
    }
    if (!assessment.duration || assessment.duration <= 0) {
      return { isValid: false, error: `Special assessment ${i + 1} duration must be greater than 0` };
    }
    if (!assessment.annualAmount || assessment.annualAmount < 0) {
      return { isValid: false, error: `Special assessment ${i + 1} annual amount must be 0 or greater` };
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
    if (!assessment.amount || assessment.amount < 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} amount must be 0 or greater` };
    }
    if (!assessment.duration || assessment.duration <= 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} duration must be greater than 0` };
    }
    if (!assessment.annualAmount || assessment.annualAmount < 0) {
      return { isValid: false, error: `Improvement assessment ${i + 1} annual amount must be 0 or greater` };
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
    if (!assessment.amount || assessment.amount < 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} amount must be 0 or greater` };
    }
    if (!assessment.duration || assessment.duration <= 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} duration must be greater than 0` };
    }
    if (!assessment.annualAmount || assessment.annualAmount < 0) {
      return { isValid: false, error: `Bond assessment ${i + 1} annual amount must be 0 or greater` };
    }
  }
  
  return { isValid: true };
}

function validateMarketAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Market appreciation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market appreciation rate cannot exceed 100%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Market appreciation rate seems unusually high' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Inflation rate must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Inflation rate cannot exceed 100%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Inflation rate seems unusually high' };
  }
  return { isValid: true };
}

function validateLocalEconomicGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < -50) {
    return { isValid: false, error: 'Local economic growth must be -50% or greater' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Local economic growth cannot exceed 100%' };
  }
  return { isValid: true };
}

function validatePropertyTaxCap(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Property tax cap must be 0 or greater' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Property tax cap cannot exceed 20%' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Property tax cap seems unusually high' };
  }
  return { isValid: true };
}

function validatePreviousYearTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Previous year tax must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Previous year tax cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateFiveYearAverageTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Five year average tax must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Five year average tax cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateTenYearAverageTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 0) {
    return { isValid: false, error: 'Ten year average tax must be 0 or greater' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Ten year average tax cannot exceed $100,000' };
  }
  return { isValid: true };
}

function validateTaxHistory(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Tax history must be an array' };
  }
  
  for (let i = 0; i < value.length; i++) {
    const history = value[i];
    if (!history.year || history.year < 2000) {
      return { isValid: false, error: `Tax history ${i + 1} year must be 2000 or greater` };
    }
    if (!history.assessedValue || history.assessedValue <= 0) {
      return { isValid: false, error: `Tax history ${i + 1} assessed value must be greater than 0` };
    }
    if (!history.taxAmount || history.taxAmount < 0) {
      return { isValid: false, error: `Tax history ${i + 1} tax amount must be 0 or greater` };
    }
    if (!history.taxRate || history.taxRate < 0) {
      return { isValid: false, error: `Tax history ${i + 1} tax rate must be 0 or greater` };
    }
  }
  
  return { isValid: true };
}

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
  }
  if (value > 30) {
    return { isValid: false, error: 'Analysis period longer than 30 years may not be meaningful' };
  }
  return { isValid: true };
}

function validateIncludeInflation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include inflation must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include appreciation must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeExemptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include exemptions must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeSpecialAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include special assessments must be true or false' };
  }
  return { isValid: true };
}

function validateCurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!value || !validCurrencies.includes(value)) {
    return { isValid: false, error: 'Valid currency is required' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!value || !validFormats.includes(value)) {
    return { isValid: false, error: 'Valid display format is required' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be true or false' };
  }
  return { isValid: true };
}

function validateIncludeComparisons(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include comparisons must be true or false' };
  }
  return { isValid: true };
}