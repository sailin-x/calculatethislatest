import { PropertyTaxInputs } from './types';

export function validatePropertyTaxInputs(inputs: PropertyTaxInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Property value validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.push({ field: 'propertyValue', message: 'Property value must be greater than 0' });
  }
  if (inputs.propertyValue && inputs.propertyValue > 100000000) {
    errors.push({ field: 'propertyValue', message: 'Property value cannot exceed $100,000,000' });
  }

  // Assessed value validation
  if (!inputs.assessedValue || inputs.assessedValue <= 0) {
    errors.push({ field: 'assessedValue', message: 'Assessed value must be greater than 0' });
  }

  // Tax rate validation
  if (!inputs.taxRate || inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 20) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 20%' });
  }

  // Assessment ratio validation
  if (inputs.assessmentRatio && (inputs.assessmentRatio <= 0 || inputs.assessmentRatio > 100)) {
    errors.push({ field: 'assessmentRatio', message: 'Assessment ratio must be between 0% and 100%' });
  }

  // Exemption validation
  if (inputs.homesteadExemption < 0) {
    errors.push({ field: 'homesteadExemption', message: 'Homestead exemption cannot be negative' });
  }
  if (inputs.seniorExemption < 0) {
    errors.push({ field: 'seniorExemption', message: 'Senior exemption cannot be negative' });
  }
  if (inputs.disabilityExemption < 0) {
    errors.push({ field: 'disabilityExemption', message: 'Disability exemption cannot be negative' });
  }
  if (inputs.veteranExemption < 0) {
    errors.push({ field: 'veteranExemption', message: 'Veteran exemption cannot be negative' });
  }
  if (inputs.otherExemptions < 0) {
    errors.push({ field: 'otherExemptions', message: 'Other exemptions cannot be negative' });
  }

  // Special district tax validation
  if (inputs.schoolDistrictTax < 0) {
    errors.push({ field: 'schoolDistrictTax', message: 'School district tax cannot be negative' });
  }
  if (inputs.fireDistrictTax < 0) {
    errors.push({ field: 'fireDistrictTax', message: 'Fire district tax cannot be negative' });
  }
  if (inputs.libraryDistrictTax < 0) {
    errors.push({ field: 'libraryDistrictTax', message: 'Library district tax cannot be negative' });
  }
  if (inputs.otherDistrictTaxes < 0) {
    errors.push({ field: 'otherDistrictTaxes', message: 'Other district taxes cannot be negative' });
  }

  // Income validation
  if (inputs.householdIncome < 0) {
    errors.push({ field: 'householdIncome', message: 'Household income cannot be negative' });
  }

  // Age validation
  if (inputs.ageOfHomeowner && (inputs.ageOfHomeowner < 0 || inputs.ageOfHomeowner > 150)) {
    errors.push({ field: 'ageOfHomeowner', message: 'Age must be between 0 and 150' });
  }

  // Number of dependents validation
  if (inputs.numberOfDependents < 0) {
    errors.push({ field: 'numberOfDependents', message: 'Number of dependents cannot be negative' });
  }

  // Market data validation
  if (inputs.averageTaxRate < 0 || inputs.averageTaxRate > 20) {
    errors.push({ field: 'averageTaxRate', message: 'Average tax rate must be between 0% and 20%' });
  }
  if (inputs.medianTaxRate < 0 || inputs.medianTaxRate > 20) {
    errors.push({ field: 'medianTaxRate', message: 'Median tax rate must be between 0% and 20%' });
  }
  if (inputs.localTaxRateRange.low < 0 || inputs.localTaxRateRange.high > 20) {
    errors.push({ field: 'localTaxRateRange', message: 'Local tax rate range must be between 0% and 20%' });
  }
  if (inputs.localTaxRateRange.low > inputs.localTaxRateRange.high) {
    errors.push({ field: 'localTaxRateRange', message: 'Low range cannot be higher than high range' });
  }

  // Assessment year validation
  if (inputs.assessmentYear && (inputs.assessmentYear < 1800 || inputs.assessmentYear > 2100)) {
    errors.push({ field: 'assessmentYear', message: 'Assessment year must be between 1800 and 2100' });
  }

  // Reassessment frequency validation
  if (inputs.reassessmentFrequency && inputs.reassessmentFrequency <= 0) {
    errors.push({ field: 'reassessmentFrequency', message: 'Reassessment frequency must be greater than 0 years' });
  }

  // Tax history validation
  if (inputs.previousYearTax < 0) {
    errors.push({ field: 'previousYearTax', message: 'Previous year tax cannot be negative' });
  }
  if (inputs.twoYearsAgoTax < 0) {
    errors.push({ field: 'twoYearsAgoTax', message: 'Two years ago tax cannot be negative' });
  }
  if (inputs.threeYearsAgoTax < 0) {
    errors.push({ field: 'threeYearsAgoTax', message: 'Three years ago tax cannot be negative' });
  }

  // Payment history validation
  if (inputs.lastPaymentAmount < 0) {
    errors.push({ field: 'lastPaymentAmount', message: 'Last payment amount cannot be negative' });
  }

  // Appeal validation
  if (inputs.appealFiled && inputs.appraisedValueAppeal && inputs.appraisedValueAppeal <= 0) {
    errors.push({ field: 'appraisedValueAppeal', message: 'Appeal appraised value must be greater than 0' });
  }
  if (inputs.appealFiled && inputs.assessmentAppeal && inputs.assessmentAppeal <= 0) {
    errors.push({ field: 'assessmentAppeal', message: 'Appeal assessment value must be greater than 0' });
  }

  // Projection validation
  if (inputs.expectedValueChange < -50 || inputs.expectedValueChange > 100) {
    errors.push({ field: 'expectedValueChange', message: 'Expected value change must be between -50% and 100%' });
  }
  if (inputs.expectedRateChange < -20 || inputs.expectedRateChange > 50) {
    errors.push({ field: 'expectedRateChange', message: 'Expected rate change must be between -20% and 50%' });
  }
  if (inputs.projectionYears < 0 || inputs.projectionYears > 50) {
    errors.push({ field: 'projectionYears', message: 'Projection years must be between 0 and 50' });
  }

  // Date validation
  if (!inputs.paymentDueDate) {
    errors.push({ field: 'paymentDueDate', message: 'Payment due date is required' });
  }
  if (!inputs.lastPaymentDate) {
    errors.push({ field: 'lastPaymentDate', message: 'Last payment date is required' });
  }
  if (!inputs.analysisDate) {
    errors.push({ field: 'analysisDate', message: 'Analysis date is required' });
  }
  if (!inputs.lastAssessmentDate) {
    errors.push({ field: 'lastAssessmentDate', message: 'Last assessment date is required' });
  }

  // Address validation
  if (!inputs.propertyAddress.trim()) {
    errors.push({ field: 'propertyAddress', message: 'Property address is required' });
  }
  if (!inputs.city.trim()) {
    errors.push({ field: 'city', message: 'City is required' });
  }
  if (!inputs.state.trim()) {
    errors.push({ field: 'state', message: 'State is required' });
  }
  if (!inputs.zipCode.trim()) {
    errors.push({ field: 'zipCode', message: 'Zip code is required' });
  }

  return errors;
}

export function validatePropertyTaxBusinessRules(inputs: PropertyTaxInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Assessment vs market value comparison
  if (inputs.assessedValue && inputs.propertyValue) {
    const assessmentRatio = (inputs.assessedValue / inputs.propertyValue) * 100;
    if (assessmentRatio > 120) {
      warnings.push({ field: 'assessedValue', message: 'Assessment appears significantly higher than market value - consider appeal' });
    } else if (assessmentRatio < 80) {
      warnings.push({ field: 'assessedValue', message: 'Assessment appears lower than market value - monitor for future increases' });
    }
  }

  // Tax rate warnings
  if (inputs.taxRate > 2.0) {
    warnings.push({ field: 'taxRate', message: 'Tax rate is above 2% - considered high for residential property' });
  }

  // Exemption eligibility warnings
  if (inputs.ageOfHomeowner && inputs.ageOfHomeowner >= 65 && inputs.seniorExemption === 0) {
    warnings.push({ field: 'seniorExemption', message: 'Senior exemption may be available for homeowners 65+' });
  }

  if (inputs.disabilityStatus && inputs.disabilityExemption === 0) {
    warnings.push({ field: 'disabilityExemption', message: 'Disability exemption may be available' });
  }

  if (inputs.veteranStatus && inputs.veteranExemption === 0) {
    warnings.push({ field: 'veteranExemption', message: 'Veteran exemption may be available' });
  }

  // Tax relief program eligibility
  if (inputs.householdIncome > 0 && inputs.householdIncome < 75000 && !inputs.propertyTaxRelief) {
    warnings.push({ field: 'propertyTaxRelief', message: 'May qualify for property tax relief based on income' });
  }

  if (inputs.householdIncome > 0) {
    const taxBurden = (inputs.previousYearTax / inputs.householdIncome) * 100;
    if (taxBurden > 4 && !inputs.circuitBreakerProgram) {
      warnings.push({ field: 'circuitBreakerProgram', message: 'May qualify for circuit breaker program due to tax burden' });
    }
  }

  // Assessment frequency warnings
  if (inputs.reassessmentFrequency && inputs.reassessmentFrequency > 5) {
    warnings.push({ field: 'reassessmentFrequency', message: 'Long reassessment cycle may lead to assessment lag' });
  }

  // Market comparison warnings
  if (inputs.averageTaxRate > 0 && inputs.taxRate > inputs.averageTaxRate * 1.5) {
    warnings.push({ field: 'taxRate', message: 'Tax rate significantly above local average' });
  }

  // Appeal opportunity warnings
  if (inputs.appealFiled && inputs.appraisedValueAppeal && inputs.assessedValue) {
    const potentialSavings = (inputs.assessedValue - inputs.appraisedValueAppeal) * (inputs.taxRate / 100);
    if (potentialSavings > 1000) {
      warnings.push({ field: 'appealFiled', message: `Potential tax savings of $${potentialSavings.toLocaleString()} from appeal` });
    }
  }

  // Property type specific warnings
  if (inputs.propertyType === 'Commercial' && inputs.homesteadExemption > 0) {
    warnings.push({ field: 'homesteadExemption', message: 'Homestead exemption typically not available for commercial properties' });
  }

  // Tax history trend warnings
  const taxHistory = [inputs.threeYearsAgoTax, inputs.twoYearsAgoTax, inputs.previousYearTax].filter(tax => tax > 0);
  if (taxHistory.length >= 2) {
    const recentIncrease = ((taxHistory[taxHistory.length - 1] - taxHistory[0]) / taxHistory[0]) * 100;
    if (recentIncrease > 20) {
      warnings.push({ field: 'previousYearTax', message: 'Tax has increased significantly in recent years' });
    }
  }

  // Payment status warnings
  if (inputs.paymentHistory) {
    const overduePayments = inputs.paymentHistory.filter(payment => payment.status === 'Overdue');
    if (overduePayments.length > 0) {
      warnings.push({ field: 'paymentHistory', message: `${overduePayments.length} payment(s) are overdue - contact tax authority` });
    }
  }

  // Projection warnings
  if (inputs.expectedValueChange > 20) {
    warnings.push({ field: 'expectedValueChange', message: 'High expected value increase may lead to significant tax increases' });
  }

  if (inputs.expectedRateChange > 10) {
    warnings.push({ field: 'expectedRateChange', message: 'High expected rate increase may substantially impact taxes' });
  }

  // State-specific warnings
  if (inputs.state === 'TX' && inputs.propertyType === 'Residential' && inputs.homesteadExemption === 0) {
    warnings.push({ field: 'homesteadExemption', message: 'Texas offers generous homestead exemptions for primary residences' });
  }

  if (inputs.state === 'FL' && inputs.ageOfHomeowner && inputs.ageOfHomeowner >= 65 && !inputs.propertyTaxRelief) {
    warnings.push({ field: 'propertyTaxRelief', message: 'Florida offers Save Our Homes tax relief for seniors' });
  }

  // Income-based warnings
  if (inputs.householdIncome > 0 && inputs.householdIncome < 30000) {
    warnings.push({ field: 'householdIncome', message: 'Low income may qualify for additional tax relief programs' });
  }

  // Large family warnings
  if (inputs.numberOfDependents > 4) {
    warnings.push({ field: 'numberOfDependents', message: 'Large families may qualify for additional exemptions' });
  }

  return warnings;
}