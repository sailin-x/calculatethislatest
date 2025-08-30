import { PropertyTaxProrationInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validatePropertyTaxProrationInputs(inputs: PropertyTaxProrationInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  } else if (inputs.propertyValue > 100000000) {
    errors.propertyValue = 'Property value cannot exceed $100,000,000';
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
  } else if (inputs.propertyAddress.length > 200) {
    errors.propertyAddress = 'Property address cannot exceed 200 characters';
  }

  if (!inputs.propertyType) {
    errors.propertyType = 'Property type is required';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  } else if (inputs.propertySize > 1000000) {
    errors.propertySize = 'Property size cannot exceed 1,000,000 sq ft';
  }

  if (inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age cannot be negative';
  } else if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  if (!inputs.propertyUse) {
    errors.propertyUse = 'Property use is required';
  }

  if (!inputs.propertyCondition) {
    errors.propertyCondition = 'Property condition is required';
  }

  // Location Information Validation
  if (!inputs.state || inputs.state.trim().length === 0) {
    errors.state = 'State is required';
  } else if (inputs.state.length > 50) {
    errors.state = 'State name cannot exceed 50 characters';
  }

  if (!inputs.county || inputs.county.trim().length === 0) {
    errors.county = 'County is required';
  } else if (inputs.county.length > 100) {
    errors.county = 'County name cannot exceed 100 characters';
  }

  if (!inputs.city || inputs.city.trim().length === 0) {
    errors.city = 'City is required';
  } else if (inputs.city.length > 100) {
    errors.city = 'City name cannot exceed 100 characters';
  }

  if (!inputs.zipCode || inputs.zipCode.trim().length === 0) {
    errors.zipCode = 'ZIP code is required';
  } else if (!/^\d{5}(-\d{4})?$/.test(inputs.zipCode)) {
    errors.zipCode = 'ZIP code must be in valid format (e.g., 12345 or 12345-6789)';
  }

  if (!inputs.schoolDistrict || inputs.schoolDistrict.trim().length === 0) {
    errors.schoolDistrict = 'School district is required';
  } else if (inputs.schoolDistrict.length > 100) {
    errors.schoolDistrict = 'School district name cannot exceed 100 characters';
  }

  // Tax Rates and Assessments Validation
  if (inputs.countyTaxRate < 0) {
    errors.countyTaxRate = 'County tax rate cannot be negative';
  } else if (inputs.countyTaxRate > 50) {
    errors.countyTaxRate = 'County tax rate cannot exceed 50%';
  }

  if (inputs.cityTaxRate < 0) {
    errors.cityTaxRate = 'City tax rate cannot be negative';
  } else if (inputs.cityTaxRate > 50) {
    errors.cityTaxRate = 'City tax rate cannot exceed 50%';
  }

  if (inputs.schoolTaxRate < 0) {
    errors.schoolTaxRate = 'School tax rate cannot be negative';
  } else if (inputs.schoolTaxRate > 50) {
    errors.schoolTaxRate = 'School tax rate cannot exceed 50%';
  }

  if (inputs.specialDistrictTaxRate < 0) {
    errors.specialDistrictTaxRate = 'Special district tax rate cannot be negative';
  } else if (inputs.specialDistrictTaxRate > 50) {
    errors.specialDistrictTaxRate = 'Special district tax rate cannot exceed 50%';
  }

  if (inputs.assessmentRatio <= 0) {
    errors.assessmentRatio = 'Assessment ratio must be greater than 0';
  } else if (inputs.assessmentRatio > 200) {
    errors.assessmentRatio = 'Assessment ratio cannot exceed 200%';
  }

  // Exemptions Validation
  if (inputs.homesteadExemption && inputs.homesteadExemptionAmount < 0) {
    errors.homesteadExemptionAmount = 'Homestead exemption amount cannot be negative';
  } else if (inputs.homesteadExemption && inputs.homesteadExemptionAmount > inputs.assessedValue) {
    errors.homesteadExemptionAmount = 'Homestead exemption cannot exceed assessed value';
  }

  if (inputs.seniorExemption && inputs.seniorExemptionAmount < 0) {
    errors.seniorExemptionAmount = 'Senior exemption amount cannot be negative';
  } else if (inputs.seniorExemption && inputs.seniorExemptionAmount > inputs.assessedValue) {
    errors.seniorExemptionAmount = 'Senior exemption cannot exceed assessed value';
  }

  if (inputs.veteranExemption && inputs.veteranExemptionAmount < 0) {
    errors.veteranExemptionAmount = 'Veteran exemption amount cannot be negative';
  } else if (inputs.veteranExemption && inputs.veteranExemptionAmount > inputs.assessedValue) {
    errors.veteranExemptionAmount = 'Veteran exemption cannot exceed assessed value';
  }

  if (inputs.disabilityExemption && inputs.disabilityExemptionAmount < 0) {
    errors.disabilityExemptionAmount = 'Disability exemption amount cannot be negative';
  } else if (inputs.disabilityExemption && inputs.disabilityExemptionAmount > inputs.assessedValue) {
    errors.disabilityExemptionAmount = 'Disability exemption cannot exceed assessed value';
  }

  // Assessment Information Validation
  if (!inputs.assessedValue || inputs.assessedValue <= 0) {
    errors.assessedValue = 'Assessed value must be greater than 0';
  } else if (inputs.assessedValue > 100000000) {
    errors.assessedValue = 'Assessed value cannot exceed $100,000,000';
  }

  if (inputs.previousAssessedValue < 0) {
    errors.previousAssessedValue = 'Previous assessed value cannot be negative';
  } else if (inputs.previousAssessedValue > 100000000) {
    errors.previousAssessedValue = 'Previous assessed value cannot exceed $100,000,000';
  }

  if (!inputs.assessmentDate) {
    errors.assessmentDate = 'Assessment date is required';
  } else if (!isValidDate(inputs.assessmentDate)) {
    errors.assessmentDate = 'Assessment date must be a valid date';
  }

  if (!inputs.lastReassessmentDate) {
    errors.lastReassessmentDate = 'Last reassessment date is required';
  } else if (!isValidDate(inputs.lastReassessmentDate)) {
    errors.lastReassessmentDate = 'Last reassessment date must be a valid date';
  }

  if (inputs.reassessmentCycle < 0) {
    errors.reassessmentCycle = 'Reassessment cycle cannot be negative';
  } else if (inputs.reassessmentCycle > 20) {
    errors.reassessmentCycle = 'Reassessment cycle cannot exceed 20 years';
  }

  // Proration Specific Information Validation
  if (!inputs.closingDate) {
    errors.closingDate = 'Closing date is required';
  } else if (!isValidDate(inputs.closingDate)) {
    errors.closingDate = 'Closing date must be a valid date';
  }

  if (!inputs.taxYear || inputs.taxYear < 1900) {
    errors.taxYear = 'Tax year must be 1900 or later';
  } else if (inputs.taxYear > 2100) {
    errors.taxYear = 'Tax year cannot exceed 2100';
  }

  if (!inputs.prorationMethod) {
    errors.prorationMethod = 'Proration method is required';
  }

  if (!inputs.sellerOccupiedUntil) {
    errors.sellerOccupiedUntil = 'Seller occupied until date is required';
  } else if (!isValidDate(inputs.sellerOccupiedUntil)) {
    errors.sellerOccupiedUntil = 'Seller occupied until date must be a valid date';
  }

  if (!inputs.buyerOccupiedFrom) {
    errors.buyerOccupiedFrom = 'Buyer occupied from date is required';
  } else if (!isValidDate(inputs.buyerOccupiedFrom)) {
    errors.buyerOccupiedFrom = 'Buyer occupied from date must be a valid date';
  }

  if (!inputs.taxPaymentSchedule) {
    errors.taxPaymentSchedule = 'Tax payment schedule is required';
  }

  if (!inputs.lastTaxPaymentDate) {
    errors.lastTaxPaymentDate = 'Last tax payment date is required';
  } else if (!isValidDate(inputs.lastTaxPaymentDate)) {
    errors.lastTaxPaymentDate = 'Last tax payment date must be a valid date';
  }

  if (!inputs.nextTaxPaymentDate) {
    errors.nextTaxPaymentDate = 'Next tax payment date is required';
  } else if (!isValidDate(inputs.nextTaxPaymentDate)) {
    errors.nextTaxPaymentDate = 'Next tax payment date must be a valid date';
  }

  if (inputs.lastTaxPaymentAmount < 0) {
    errors.lastTaxPaymentAmount = 'Last tax payment amount cannot be negative';
  } else if (inputs.lastTaxPaymentAmount > 1000000) {
    errors.lastTaxPaymentAmount = 'Last tax payment amount cannot exceed $1,000,000';
  }

  if (inputs.nextTaxPaymentAmount < 0) {
    errors.nextTaxPaymentAmount = 'Next tax payment amount cannot be negative';
  } else if (inputs.nextTaxPaymentAmount > 1000000) {
    errors.nextTaxPaymentAmount = 'Next tax payment amount cannot exceed $1,000,000';
  }

  // Escrow Information Validation
  if (inputs.escrowMonthlyPayment < 0) {
    errors.escrowMonthlyPayment = 'Escrow monthly payment cannot be negative';
  } else if (inputs.escrowMonthlyPayment > 100000) {
    errors.escrowMonthlyPayment = 'Escrow monthly payment cannot exceed $100,000';
  }

  if (inputs.escrowBalance < 0) {
    errors.escrowBalance = 'Escrow balance cannot be negative';
  } else if (inputs.escrowBalance > 1000000) {
    errors.escrowBalance = 'Escrow balance cannot exceed $1,000,000';
  }

  if (!inputs.escrowProrationMethod) {
    errors.escrowProrationMethod = 'Escrow proration method is required';
  }

  if (inputs.customEscrowSplit < 0) {
    errors.customEscrowSplit = 'Custom escrow split cannot be negative';
  } else if (inputs.customEscrowSplit > 100) {
    errors.customEscrowSplit = 'Custom escrow split cannot exceed 100%';
  }

  // Additional Taxes and Fees Validation
  if (!Array.isArray(inputs.specialAssessments)) {
    errors.specialAssessments = 'Special assessments must be an array';
  } else {
    inputs.specialAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`specialAssessments.${index}.description`] = 'Special assessment description is required';
      }
      if (assessment.amount < 0) {
        errors[`specialAssessments.${index}.amount`] = 'Special assessment amount cannot be negative';
      }
      if (assessment.duration < 0) {
        errors[`specialAssessments.${index}.duration`] = 'Special assessment duration cannot be negative';
      }
      if (assessment.annualAmount < 0) {
        errors[`specialAssessments.${index}.annualAmount`] = 'Special assessment annual amount cannot be negative';
      }
    });
  }

  if (!Array.isArray(inputs.improvementAssessments)) {
    errors.improvementAssessments = 'Improvement assessments must be an array';
  } else {
    inputs.improvementAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`improvementAssessments.${index}.description`] = 'Improvement assessment description is required';
      }
      if (assessment.amount < 0) {
        errors[`improvementAssessments.${index}.amount`] = 'Improvement assessment amount cannot be negative';
      }
      if (assessment.duration < 0) {
        errors[`improvementAssessments.${index}.duration`] = 'Improvement assessment duration cannot be negative';
      }
      if (assessment.annualAmount < 0) {
        errors[`improvementAssessments.${index}.annualAmount`] = 'Improvement assessment annual amount cannot be negative';
      }
    });
  }

  if (!Array.isArray(inputs.bondAssessments)) {
    errors.bondAssessments = 'Bond assessments must be an array';
  } else {
    inputs.bondAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`bondAssessments.${index}.description`] = 'Bond assessment description is required';
      }
      if (assessment.amount < 0) {
        errors[`bondAssessments.${index}.amount`] = 'Bond assessment amount cannot be negative';
      }
      if (assessment.duration < 0) {
        errors[`bondAssessments.${index}.duration`] = 'Bond assessment duration cannot be negative';
      }
      if (assessment.annualAmount < 0) {
        errors[`bondAssessments.${index}.annualAmount`] = 'Bond assessment annual amount cannot be negative';
      }
    });
  }

  // Market and Economic Factors Validation
  if (inputs.marketAppreciationRate < -50) {
    errors.marketAppreciationRate = 'Market appreciation rate cannot be less than -50%';
  } else if (inputs.marketAppreciationRate > 100) {
    errors.marketAppreciationRate = 'Market appreciation rate cannot exceed 100%';
  }

  if (inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate cannot be less than -50%';
  } else if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
  }

  if (inputs.localEconomicGrowth < -50) {
    errors.localEconomicGrowth = 'Local economic growth cannot be less than -50%';
  } else if (inputs.localEconomicGrowth > 100) {
    errors.localEconomicGrowth = 'Local economic growth cannot exceed 100%';
  }

  if (inputs.propertyTaxCap < 0) {
    errors.propertyTaxCap = 'Property tax cap cannot be negative';
  } else if (inputs.propertyTaxCap > 50) {
    errors.propertyTaxCap = 'Property tax cap cannot exceed 50%';
  }

  // Historical Data Validation
  if (inputs.previousYearTax < 0) {
    errors.previousYearTax = 'Previous year tax cannot be negative';
  } else if (inputs.previousYearTax > 1000000) {
    errors.previousYearTax = 'Previous year tax cannot exceed $1,000,000';
  }

  if (inputs.fiveYearAverageTax < 0) {
    errors.fiveYearAverageTax = 'Five year average tax cannot be negative';
  } else if (inputs.fiveYearAverageTax > 1000000) {
    errors.fiveYearAverageTax = 'Five year average tax cannot exceed $1,000,000';
  }

  if (inputs.tenYearAverageTax < 0) {
    errors.tenYearAverageTax = 'Ten year average tax cannot be negative';
  } else if (inputs.tenYearAverageTax > 1000000) {
    errors.tenYearAverageTax = 'Ten year average tax cannot exceed $1,000,000';
  }

  if (!Array.isArray(inputs.taxHistory)) {
    errors.taxHistory = 'Tax history must be an array';
  } else {
    inputs.taxHistory.forEach((entry, index) => {
      if (entry.year < 1900 || entry.year > 2100) {
        errors[`taxHistory.${index}.year`] = 'Tax history year must be between 1900 and 2100';
      }
      if (entry.assessedValue < 0) {
        errors[`taxHistory.${index}.assessedValue`] = 'Tax history assessed value cannot be negative';
      }
      if (entry.taxAmount < 0) {
        errors[`taxHistory.${index}.taxAmount`] = 'Tax history tax amount cannot be negative';
      }
      if (entry.taxRate < 0) {
        errors[`taxHistory.${index}.taxRate`] = 'Tax history tax rate cannot be negative';
      }
      if (!entry.paymentDate || !isValidDate(entry.paymentDate)) {
        errors[`taxHistory.${index}.paymentDate`] = 'Tax history payment date must be a valid date';
      }
    });
  }

  // Proration Analysis Parameters Validation
  if (typeof inputs.includeInflation !== 'boolean') {
    errors.includeInflation = 'Include inflation must be a boolean value';
  }

  if (typeof inputs.includeAppreciation !== 'boolean') {
    errors.includeAppreciation = 'Include appreciation must be a boolean value';
  }

  if (typeof inputs.includeExemptions !== 'boolean') {
    errors.includeExemptions = 'Include exemptions must be a boolean value';
  }

  if (typeof inputs.includeSpecialAssessments !== 'boolean') {
    errors.includeSpecialAssessments = 'Include special assessments must be a boolean value';
  }

  if (!inputs.prorationAccuracy) {
    errors.prorationAccuracy = 'Proration accuracy is required';
  }

  // Reporting Preferences Validation
  if (!inputs.currency) {
    errors.currency = 'Currency is required';
  }

  if (!inputs.displayFormat) {
    errors.displayFormat = 'Display format is required';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be a boolean value';
  }

  if (typeof inputs.includeComparisons !== 'boolean') {
    errors.includeComparisons = 'Include comparisons must be a boolean value';
  }

  if (typeof inputs.includeTimeline !== 'boolean') {
    errors.includeTimeline = 'Include timeline must be a boolean value';
  }

  // Business Logic Validation
  const totalExemptions = (inputs.homesteadExemption ? inputs.homesteadExemptionAmount : 0) +
                         (inputs.seniorExemption ? inputs.seniorExemptionAmount : 0) +
                         (inputs.veteranExemption ? inputs.veteranExemptionAmount : 0) +
                         (inputs.disabilityExemption ? inputs.disabilityExemptionAmount : 0);

  if (totalExemptions > inputs.assessedValue) {
    errors.exemptions = 'Total exemptions cannot exceed assessed value';
  }

  if (inputs.assessedValue > inputs.propertyValue * 2) {
    errors.assessedValue = 'Assessed value cannot exceed 200% of property value';
  }

  if (inputs.propertySize < 100 && inputs.propertyType !== 'land') {
    errors.propertySize = 'Property size seems too small for the selected property type';
  }

  if (inputs.propertySize > 10000 && inputs.propertyType === 'single_family') {
    errors.propertySize = 'Property size seems too large for a single family home';
  }

  // Date Logic Validation
  if (inputs.closingDate && inputs.sellerOccupiedUntil && inputs.buyerOccupiedFrom) {
    const closingDate = new Date(inputs.closingDate);
    const sellerOccupiedUntil = new Date(inputs.sellerOccupiedUntil);
    const buyerOccupiedFrom = new Date(inputs.buyerOccupiedFrom);

    if (sellerOccupiedUntil > buyerOccupiedFrom) {
      errors.dates = 'Seller occupied until date must be before or equal to buyer occupied from date';
    }

    if (closingDate < sellerOccupiedUntil) {
      errors.closingDate = 'Closing date must be after or equal to seller occupied until date';
    }

    if (closingDate > buyerOccupiedFrom) {
      errors.closingDate = 'Closing date must be before or equal to buyer occupied from date';
    }
  }

  if (inputs.lastTaxPaymentDate && inputs.nextTaxPaymentDate) {
    const lastPayment = new Date(inputs.lastTaxPaymentDate);
    const nextPayment = new Date(inputs.nextTaxPaymentDate);

    if (lastPayment >= nextPayment) {
      errors.paymentDates = 'Last tax payment date must be before next tax payment date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validatePropertyTaxProrationOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Basic validation for required output fields
  if (typeof outputs.propertyValue !== 'number' || outputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be a positive number';
  }

  if (typeof outputs.assessedValue !== 'number' || outputs.assessedValue <= 0) {
    errors.assessedValue = 'Assessed value must be a positive number';
  }

  if (typeof outputs.totalAnnualTax !== 'number' || outputs.totalAnnualTax < 0) {
    errors.totalAnnualTax = 'Total annual tax must be a non-negative number';
  }

  if (typeof outputs.sellerTaxCredit !== 'number') {
    errors.sellerTaxCredit = 'Seller tax credit must be a number';
  }

  if (typeof outputs.buyerTaxDebit !== 'number') {
    errors.buyerTaxDebit = 'Buyer tax debit must be a number';
  }

  if (typeof outputs.prorationBalance !== 'number') {
    errors.prorationBalance = 'Proration balance must be a number';
  }

  if (!outputs.closingDate) {
    errors.closingDate = 'Closing date is required in outputs';
  }

  if (!outputs.taxYear || typeof outputs.taxYear !== 'number') {
    errors.taxYear = 'Tax year must be a number';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.prorationRating) {
      errors['analysis.prorationRating'] = 'Proration rating is required';
    }
    if (!outputs.analysis.recommendation) {
      errors['analysis.recommendation'] = 'Recommendation is required';
    }
  }

  // Validate arrays
  if (!Array.isArray(outputs.prorationTimeline)) {
    errors.prorationTimeline = 'Proration timeline must be an array';
  }

  if (!Array.isArray(outputs.paymentSchedule)) {
    errors.paymentSchedule = 'Payment schedule must be an array';
  }

  // Validate settlement summary
  if (!outputs.settlementSummary || typeof outputs.settlementSummary !== 'object') {
    errors.settlementSummary = 'Settlement summary is required';
  } else {
    if (typeof outputs.settlementSummary.totalCredits !== 'number') {
      errors['settlementSummary.totalCredits'] = 'Total credits must be a number';
    }
    if (typeof outputs.settlementSummary.totalDebits !== 'number') {
      errors['settlementSummary.totalDebits'] = 'Total debits must be a number';
    }
    if (typeof outputs.settlementSummary.netAmount !== 'number') {
      errors['settlementSummary.netAmount'] = 'Net amount must be a number';
    }
    if (!outputs.settlementSummary.responsibleParty) {
      errors['settlementSummary.responsibleParty'] = 'Responsible party is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

// Helper function to validate date strings
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}