import { PropertyTaxInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validatePropertyTaxInputs(inputs: PropertyTaxInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyValue || inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }
  if (inputs.propertyValue > 10000000) {
    errors.propertyValue = 'Property value cannot exceed $10 million';
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
  }

  if (!inputs.propertyType || !['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'industrial', 'land', 'agricultural'].includes(inputs.propertyType)) {
    errors.propertyType = 'Valid property type is required';
  }

  if (!inputs.propertySize || inputs.propertySize <= 0) {
    errors.propertySize = 'Property size must be greater than 0';
  }
  if (inputs.propertySize > 100000) {
    errors.propertySize = 'Property size cannot exceed 100,000 sq ft';
  }

  if (!inputs.propertyAge || inputs.propertyAge < 0) {
    errors.propertyAge = 'Property age must be 0 or greater';
  }
  if (inputs.propertyAge > 200) {
    errors.propertyAge = 'Property age cannot exceed 200 years';
  }

  if (!inputs.propertyUse || !['primary_residence', 'secondary_residence', 'investment', 'commercial', 'vacant'].includes(inputs.propertyUse)) {
    errors.propertyUse = 'Valid property use is required';
  }

  if (!inputs.propertyCondition || !['excellent', 'good', 'fair', 'poor', 'needs_repair'].includes(inputs.propertyCondition)) {
    errors.propertyCondition = 'Valid property condition is required';
  }

  // Location Information Validation
  if (!inputs.state || inputs.state.trim().length === 0) {
    errors.state = 'State is required';
  }

  if (!inputs.county || inputs.county.trim().length === 0) {
    errors.county = 'County is required';
  }

  if (!inputs.city || inputs.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!inputs.zipCode || inputs.zipCode.trim().length === 0) {
    errors.zipCode = 'ZIP code is required';
  }

  if (!inputs.schoolDistrict || inputs.schoolDistrict.trim().length === 0) {
    errors.schoolDistrict = 'School district is required';
  }

  // Tax Rates and Assessments Validation
  if (!inputs.countyTaxRate || inputs.countyTaxRate < 0) {
    errors.countyTaxRate = 'County tax rate must be 0 or greater';
  }
  if (inputs.countyTaxRate > 50) {
    errors.countyTaxRate = 'County tax rate cannot exceed 50 per $1000';
  }

  if (!inputs.cityTaxRate || inputs.cityTaxRate < 0) {
    errors.cityTaxRate = 'City tax rate must be 0 or greater';
  }
  if (inputs.cityTaxRate > 50) {
    errors.cityTaxRate = 'City tax rate cannot exceed 50 per $1000';
  }

  if (!inputs.schoolTaxRate || inputs.schoolTaxRate < 0) {
    errors.schoolTaxRate = 'School tax rate must be 0 or greater';
  }
  if (inputs.schoolTaxRate > 50) {
    errors.schoolTaxRate = 'School tax rate cannot exceed 50 per $1000';
  }

  if (!inputs.specialDistrictTaxRate || inputs.specialDistrictTaxRate < 0) {
    errors.specialDistrictTaxRate = 'Special district tax rate must be 0 or greater';
  }
  if (inputs.specialDistrictTaxRate > 50) {
    errors.specialDistrictTaxRate = 'Special district tax rate cannot exceed 50 per $1000';
  }

  if (!inputs.assessmentRatio || inputs.assessmentRatio <= 0) {
    errors.assessmentRatio = 'Assessment ratio must be greater than 0';
  }
  if (inputs.assessmentRatio > 200) {
    errors.assessmentRatio = 'Assessment ratio cannot exceed 200%';
  }

  if (typeof inputs.homesteadExemption !== 'boolean') {
    errors.homesteadExemption = 'Homestead exemption must be true or false';
  }

  if (!inputs.homesteadExemptionAmount || inputs.homesteadExemptionAmount < 0) {
    errors.homesteadExemptionAmount = 'Homestead exemption amount must be 0 or greater';
  }
  if (inputs.homesteadExemptionAmount > 100000) {
    errors.homesteadExemptionAmount = 'Homestead exemption amount cannot exceed $100,000';
  }

  if (typeof inputs.seniorExemption !== 'boolean') {
    errors.seniorExemption = 'Senior exemption must be true or false';
  }

  if (!inputs.seniorExemptionAmount || inputs.seniorExemptionAmount < 0) {
    errors.seniorExemptionAmount = 'Senior exemption amount must be 0 or greater';
  }
  if (inputs.seniorExemptionAmount > 100000) {
    errors.seniorExemptionAmount = 'Senior exemption amount cannot exceed $100,000';
  }

  if (typeof inputs.veteranExemption !== 'boolean') {
    errors.veteranExemption = 'Veteran exemption must be true or false';
  }

  if (!inputs.veteranExemptionAmount || inputs.veteranExemptionAmount < 0) {
    errors.veteranExemptionAmount = 'Veteran exemption amount must be 0 or greater';
  }
  if (inputs.veteranExemptionAmount > 100000) {
    errors.veteranExemptionAmount = 'Veteran exemption amount cannot exceed $100,000';
  }

  if (typeof inputs.disabilityExemption !== 'boolean') {
    errors.disabilityExemption = 'Disability exemption must be true or false';
  }

  if (!inputs.disabilityExemptionAmount || inputs.disabilityExemptionAmount < 0) {
    errors.disabilityExemptionAmount = 'Disability exemption amount must be 0 or greater';
  }
  if (inputs.disabilityExemptionAmount > 100000) {
    errors.disabilityExemptionAmount = 'Disability exemption amount cannot exceed $100,000';
  }

  // Assessment Information Validation
  if (!inputs.assessedValue || inputs.assessedValue <= 0) {
    errors.assessedValue = 'Assessed value must be greater than 0';
  }
  if (inputs.assessedValue > 10000000) {
    errors.assessedValue = 'Assessed value cannot exceed $10 million';
  }

  if (!inputs.previousAssessedValue || inputs.previousAssessedValue <= 0) {
    errors.previousAssessedValue = 'Previous assessed value must be greater than 0';
  }
  if (inputs.previousAssessedValue > 10000000) {
    errors.previousAssessedValue = 'Previous assessed value cannot exceed $10 million';
  }

  if (!inputs.assessmentDate || inputs.assessmentDate.trim().length === 0) {
    errors.assessmentDate = 'Assessment date is required';
  }

  if (!inputs.lastReassessmentDate || inputs.lastReassessmentDate.trim().length === 0) {
    errors.lastReassessmentDate = 'Last reassessment date is required';
  }

  if (!inputs.reassessmentCycle || inputs.reassessmentCycle <= 0) {
    errors.reassessmentCycle = 'Reassessment cycle must be greater than 0';
  }
  if (inputs.reassessmentCycle > 20) {
    errors.reassessmentCycle = 'Reassessment cycle cannot exceed 20 years';
  }

  // Tax Calculation Parameters Validation
  if (!inputs.taxYear || inputs.taxYear < 2000) {
    errors.taxYear = 'Tax year must be 2000 or greater';
  }
  if (inputs.taxYear > 2050) {
    errors.taxYear = 'Tax year cannot exceed 2050';
  }

  if (!inputs.paymentSchedule || !['annual', 'semi_annual', 'quarterly', 'monthly'].includes(inputs.paymentSchedule)) {
    errors.paymentSchedule = 'Valid payment schedule is required';
  }

  if (typeof inputs.escrowAccount !== 'boolean') {
    errors.escrowAccount = 'Escrow account must be true or false';
  }

  if (!inputs.escrowMonthlyPayment || inputs.escrowMonthlyPayment < 0) {
    errors.escrowMonthlyPayment = 'Escrow monthly payment must be 0 or greater';
  }
  if (inputs.escrowMonthlyPayment > 10000) {
    errors.escrowMonthlyPayment = 'Escrow monthly payment cannot exceed $10,000';
  }

  if (!inputs.escrowBalance || inputs.escrowBalance < 0) {
    errors.escrowBalance = 'Escrow balance must be 0 or greater';
  }
  if (inputs.escrowBalance > 100000) {
    errors.escrowBalance = 'Escrow balance cannot exceed $100,000';
  }

  // Additional Taxes and Fees Validation
  if (!inputs.specialAssessments || !Array.isArray(inputs.specialAssessments)) {
    errors.specialAssessments = 'Special assessments must be an array';
  } else {
    inputs.specialAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`specialAssessments.${index}.description`] = 'Assessment description is required';
      }
      if (!assessment.amount || assessment.amount < 0) {
        errors[`specialAssessments.${index}.amount`] = 'Assessment amount must be 0 or greater';
      }
      if (!assessment.duration || assessment.duration <= 0) {
        errors[`specialAssessments.${index}.duration`] = 'Assessment duration must be greater than 0';
      }
      if (!assessment.annualAmount || assessment.annualAmount < 0) {
        errors[`specialAssessments.${index}.annualAmount`] = 'Annual amount must be 0 or greater';
      }
    });
  }

  if (!inputs.improvementAssessments || !Array.isArray(inputs.improvementAssessments)) {
    errors.improvementAssessments = 'Improvement assessments must be an array';
  } else {
    inputs.improvementAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`improvementAssessments.${index}.description`] = 'Assessment description is required';
      }
      if (!assessment.amount || assessment.amount < 0) {
        errors[`improvementAssessments.${index}.amount`] = 'Assessment amount must be 0 or greater';
      }
      if (!assessment.duration || assessment.duration <= 0) {
        errors[`improvementAssessments.${index}.duration`] = 'Assessment duration must be greater than 0';
      }
      if (!assessment.annualAmount || assessment.annualAmount < 0) {
        errors[`improvementAssessments.${index}.annualAmount`] = 'Annual amount must be 0 or greater';
      }
    });
  }

  if (!inputs.bondAssessments || !Array.isArray(inputs.bondAssessments)) {
    errors.bondAssessments = 'Bond assessments must be an array';
  } else {
    inputs.bondAssessments.forEach((assessment, index) => {
      if (!assessment.description || assessment.description.trim().length === 0) {
        errors[`bondAssessments.${index}.description`] = 'Assessment description is required';
      }
      if (!assessment.amount || assessment.amount < 0) {
        errors[`bondAssessments.${index}.amount`] = 'Assessment amount must be 0 or greater';
      }
      if (!assessment.duration || assessment.duration <= 0) {
        errors[`bondAssessments.${index}.duration`] = 'Assessment duration must be greater than 0';
      }
      if (!assessment.annualAmount || assessment.annualAmount < 0) {
        errors[`bondAssessments.${index}.annualAmount`] = 'Annual amount must be 0 or greater';
      }
    });
  }

  // Market and Economic Factors Validation
  if (!inputs.marketAppreciationRate || inputs.marketAppreciationRate < -50) {
    errors.marketAppreciationRate = 'Market appreciation rate must be -50% or greater';
  }
  if (inputs.marketAppreciationRate > 100) {
    errors.marketAppreciationRate = 'Market appreciation rate cannot exceed 100%';
  }

  if (!inputs.inflationRate || inputs.inflationRate < -50) {
    errors.inflationRate = 'Inflation rate must be -50% or greater';
  }
  if (inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate cannot exceed 100%';
  }

  if (!inputs.localEconomicGrowth || inputs.localEconomicGrowth < -50) {
    errors.localEconomicGrowth = 'Local economic growth must be -50% or greater';
  }
  if (inputs.localEconomicGrowth > 100) {
    errors.localEconomicGrowth = 'Local economic growth cannot exceed 100%';
  }

  if (!inputs.propertyTaxCap || inputs.propertyTaxCap < 0) {
    errors.propertyTaxCap = 'Property tax cap must be 0 or greater';
  }
  if (inputs.propertyTaxCap > 20) {
    errors.propertyTaxCap = 'Property tax cap cannot exceed 20%';
  }

  // Historical Data Validation
  if (!inputs.previousYearTax || inputs.previousYearTax < 0) {
    errors.previousYearTax = 'Previous year tax must be 0 or greater';
  }
  if (inputs.previousYearTax > 100000) {
    errors.previousYearTax = 'Previous year tax cannot exceed $100,000';
  }

  if (!inputs.fiveYearAverageTax || inputs.fiveYearAverageTax < 0) {
    errors.fiveYearAverageTax = 'Five year average tax must be 0 or greater';
  }
  if (inputs.fiveYearAverageTax > 100000) {
    errors.fiveYearAverageTax = 'Five year average tax cannot exceed $100,000';
  }

  if (!inputs.tenYearAverageTax || inputs.tenYearAverageTax < 0) {
    errors.tenYearAverageTax = 'Ten year average tax must be 0 or greater';
  }
  if (inputs.tenYearAverageTax > 100000) {
    errors.tenYearAverageTax = 'Ten year average tax cannot exceed $100,000';
  }

  if (!inputs.taxHistory || !Array.isArray(inputs.taxHistory)) {
    errors.taxHistory = 'Tax history must be an array';
  } else {
    inputs.taxHistory.forEach((history, index) => {
      if (!history.year || history.year < 2000) {
        errors[`taxHistory.${index}.year`] = 'Tax history year must be 2000 or greater';
      }
      if (!history.assessedValue || history.assessedValue <= 0) {
        errors[`taxHistory.${index}.assessedValue`] = 'Tax history assessed value must be greater than 0';
      }
      if (!history.taxAmount || history.taxAmount < 0) {
        errors[`taxHistory.${index}.taxAmount`] = 'Tax history tax amount must be 0 or greater';
      }
      if (!history.taxRate || history.taxRate < 0) {
        errors[`taxHistory.${index}.taxRate`] = 'Tax history tax rate must be 0 or greater';
      }
    });
  }

  // Analysis Parameters Validation
  if (!inputs.analysisPeriod || inputs.analysisPeriod <= 0) {
    errors.analysisPeriod = 'Analysis period must be greater than 0';
  }
  if (inputs.analysisPeriod > 50) {
    errors.analysisPeriod = 'Analysis period cannot exceed 50 years';
  }

  if (typeof inputs.includeInflation !== 'boolean') {
    errors.includeInflation = 'Include inflation must be true or false';
  }

  if (typeof inputs.includeAppreciation !== 'boolean') {
    errors.includeAppreciation = 'Include appreciation must be true or false';
  }

  if (typeof inputs.includeExemptions !== 'boolean') {
    errors.includeExemptions = 'Include exemptions must be true or false';
  }

  if (typeof inputs.includeSpecialAssessments !== 'boolean') {
    errors.includeSpecialAssessments = 'Include special assessments must be true or false';
  }

  // Reporting Preferences Validation
  if (!inputs.currency || !['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Valid currency is required';
  }

  if (!inputs.displayFormat || !['percentage', 'decimal', 'currency'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Valid display format is required';
  }

  if (typeof inputs.includeCharts !== 'boolean') {
    errors.includeCharts = 'Include charts must be true or false';
  }

  if (typeof inputs.includeComparisons !== 'boolean') {
    errors.includeComparisons = 'Include comparisons must be true or false';
  }

  // Business Logic Validations
  // Check if assessed value is reasonable relative to property value
  const assessmentRatio = (inputs.assessedValue / inputs.propertyValue) * 100;
  if (assessmentRatio > 150) {
    errors.assessedValue = 'Assessed value seems unusually high relative to property value';
  }
  if (assessmentRatio < 50) {
    errors.assessedValue = 'Assessed value seems unusually low relative to property value';
  }

  // Check if assessment ratio matches calculated ratio
  const calculatedRatio = (inputs.assessedValue / inputs.propertyValue) * 100;
  if (Math.abs(inputs.assessmentRatio - calculatedRatio) > 5) {
    errors.assessmentRatio = 'Assessment ratio should match assessed value to property value ratio';
  }

  // Check if property size is reasonable for property type
  if (inputs.propertyType === 'single_family' && inputs.propertySize > 10000) {
    errors.propertySize = 'Property size seems unusually large for single family home';
  }
  if (inputs.propertyType === 'condo' && inputs.propertySize > 5000) {
    errors.propertySize = 'Property size seems unusually large for condominium';
  }
  if (inputs.propertyType === 'land' && inputs.propertySize < 1000) {
    errors.propertySize = 'Property size seems unusually small for land';
  }

  // Check if property age is reasonable for property type
  if (inputs.propertyType === 'new_construction' && inputs.propertyAge > 5) {
    errors.propertyAge = 'Property age seems inconsistent with new construction';
  }

  // Check if tax rates are reasonable
  const totalTaxRate = inputs.countyTaxRate + inputs.cityTaxRate + inputs.schoolTaxRate + inputs.specialDistrictTaxRate;
  if (totalTaxRate > 20) {
    errors.countyTaxRate = 'Total tax rate seems unusually high';
  }

  // Check if exemption amounts are reasonable
  const totalExemptions = (inputs.homesteadExemption ? inputs.homesteadExemptionAmount : 0) +
                         (inputs.seniorExemption ? inputs.seniorExemptionAmount : 0) +
                         (inputs.veteranExemption ? inputs.veteranExemptionAmount : 0) +
                         (inputs.disabilityExemption ? inputs.disabilityExemptionAmount : 0);
  
  if (totalExemptions > inputs.assessedValue) {
    errors.homesteadExemptionAmount = 'Total exemptions cannot exceed assessed value';
  }

  // Check if escrow payment is reasonable
  if (inputs.escrowAccount && inputs.escrowMonthlyPayment > inputs.propertyValue * 0.01) {
    errors.escrowMonthlyPayment = 'Escrow monthly payment seems unusually high';
  }

  // Check if analysis period is reasonable
  if (inputs.analysisPeriod > 30) {
    errors.analysisPeriod = 'Analysis period longer than 30 years may not be meaningful';
  }

  // Check if market appreciation rate is reasonable
  if (inputs.marketAppreciationRate > 20) {
    errors.marketAppreciationRate = 'Market appreciation rate seems unusually high';
  }

  // Check if inflation rate is reasonable
  if (inputs.inflationRate > 20) {
    errors.inflationRate = 'Inflation rate seems unusually high';
  }

  // Check if property tax cap is reasonable
  if (inputs.propertyTaxCap > 10) {
    errors.propertyTaxCap = 'Property tax cap seems unusually high';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

export function validatePropertyTaxOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate that all required output fields are present and have reasonable values
  if (typeof outputs.propertyValue !== 'number' || isNaN(outputs.propertyValue)) {
    errors.propertyValue = 'Property value must be a valid number';
  }

  if (typeof outputs.assessedValue !== 'number' || isNaN(outputs.assessedValue)) {
    errors.assessedValue = 'Assessed value must be a valid number';
  }

  if (typeof outputs.taxableValue !== 'number' || isNaN(outputs.taxableValue)) {
    errors.taxableValue = 'Taxable value must be a valid number';
  }

  if (typeof outputs.totalAnnualTax !== 'number' || isNaN(outputs.totalAnnualTax)) {
    errors.totalAnnualTax = 'Total annual tax must be a valid number';
  }

  if (typeof outputs.totalMonthlyTax !== 'number' || isNaN(outputs.totalMonthlyTax)) {
    errors.totalMonthlyTax = 'Total monthly tax must be a valid number';
  }

  if (typeof outputs.effectiveTaxRate !== 'number' || isNaN(outputs.effectiveTaxRate)) {
    errors.effectiveTaxRate = 'Effective tax rate must be a valid number';
  }

  if (typeof outputs.totalTaxRate !== 'number' || isNaN(outputs.totalTaxRate)) {
    errors.totalTaxRate = 'Total tax rate must be a valid number';
  }

  // Validate tax breakdown
  if (typeof outputs.countyTax !== 'number' || isNaN(outputs.countyTax)) {
    errors.countyTax = 'County tax must be a valid number';
  }

  if (typeof outputs.cityTax !== 'number' || isNaN(outputs.cityTax)) {
    errors.cityTax = 'City tax must be a valid number';
  }

  if (typeof outputs.schoolTax !== 'number' || isNaN(outputs.schoolTax)) {
    errors.schoolTax = 'School tax must be a valid number';
  }

  if (typeof outputs.specialDistrictTax !== 'number' || isNaN(outputs.specialDistrictTax)) {
    errors.specialDistrictTax = 'Special district tax must be a valid number';
  }

  if (typeof outputs.specialAssessmentsTotal !== 'number' || isNaN(outputs.specialAssessmentsTotal)) {
    errors.specialAssessmentsTotal = 'Special assessments total must be a valid number';
  }

  if (typeof outputs.improvementAssessmentsTotal !== 'number' || isNaN(outputs.improvementAssessmentsTotal)) {
    errors.improvementAssessmentsTotal = 'Improvement assessments total must be a valid number';
  }

  if (typeof outputs.bondAssessmentsTotal !== 'number' || isNaN(outputs.bondAssessmentsTotal)) {
    errors.bondAssessmentsTotal = 'Bond assessments total must be a valid number';
  }

  // Validate exemptions
  if (typeof outputs.totalExemptions !== 'number' || isNaN(outputs.totalExemptions)) {
    errors.totalExemptions = 'Total exemptions must be a valid number';
  }

  if (typeof outputs.exemptionSavings !== 'number' || isNaN(outputs.exemptionSavings)) {
    errors.exemptionSavings = 'Exemption savings must be a valid number';
  }

  if (typeof outputs.exemptionPercentage !== 'number' || isNaN(outputs.exemptionPercentage)) {
    errors.exemptionPercentage = 'Exemption percentage must be a valid number';
  }

  // Validate payment amounts
  if (!outputs.paymentAmounts || typeof outputs.paymentAmounts !== 'object') {
    errors.paymentAmounts = 'Payment amounts object is required';
  } else {
    if (typeof outputs.paymentAmounts.annual !== 'number' || isNaN(outputs.paymentAmounts.annual)) {
      errors.paymentAmounts = 'Annual payment amount must be a valid number';
    }
    if (typeof outputs.paymentAmounts.semiAnnual !== 'number' || isNaN(outputs.paymentAmounts.semiAnnual)) {
      errors.paymentAmounts = 'Semi-annual payment amount must be a valid number';
    }
    if (typeof outputs.paymentAmounts.quarterly !== 'number' || isNaN(outputs.paymentAmounts.quarterly)) {
      errors.paymentAmounts = 'Quarterly payment amount must be a valid number';
    }
    if (typeof outputs.paymentAmounts.monthly !== 'number' || isNaN(outputs.paymentAmounts.monthly)) {
      errors.paymentAmounts = 'Monthly payment amount must be a valid number';
    }
  }

  // Validate escrow analysis
  if (!outputs.escrowAnalysis || typeof outputs.escrowAnalysis !== 'object') {
    errors.escrowAnalysis = 'Escrow analysis object is required';
  } else {
    if (typeof outputs.escrowAnalysis.requiredMonthlyPayment !== 'number' || isNaN(outputs.escrowAnalysis.requiredMonthlyPayment)) {
      errors.escrowAnalysis = 'Required monthly payment must be a valid number';
    }
    if (typeof outputs.escrowAnalysis.currentEscrowPayment !== 'number' || isNaN(outputs.escrowAnalysis.currentEscrowPayment)) {
      errors.escrowAnalysis = 'Current escrow payment must be a valid number';
    }
    if (typeof outputs.escrowAnalysis.escrowDeficit !== 'number' || isNaN(outputs.escrowAnalysis.escrowDeficit)) {
      errors.escrowAnalysis = 'Escrow deficit must be a valid number';
    }
    if (typeof outputs.escrowAnalysis.escrowSurplus !== 'number' || isNaN(outputs.escrowAnalysis.escrowSurplus)) {
      errors.escrowAnalysis = 'Escrow surplus must be a valid number';
    }
  }

  // Validate assessment analysis
  if (typeof outputs.assessmentToMarketRatio !== 'number' || isNaN(outputs.assessmentToMarketRatio)) {
    errors.assessmentToMarketRatio = 'Assessment to market ratio must be a valid number';
  }

  if (typeof outputs.assessmentChange !== 'number' || isNaN(outputs.assessmentChange)) {
    errors.assessmentChange = 'Assessment change must be a valid number';
  }

  if (typeof outputs.assessmentChangePercentage !== 'number' || isNaN(outputs.assessmentChangePercentage)) {
    errors.assessmentChangePercentage = 'Assessment change percentage must be a valid number';
  }

  // Validate historical analysis
  if (typeof outputs.taxGrowthRate !== 'number' || isNaN(outputs.taxGrowthRate)) {
    errors.taxGrowthRate = 'Tax growth rate must be a valid number';
  }

  if (typeof outputs.fiveYearProjection !== 'number' || isNaN(outputs.fiveYearProjection)) {
    errors.fiveYearProjection = 'Five year projection must be a valid number';
  }

  if (typeof outputs.tenYearProjection !== 'number' || isNaN(outputs.tenYearProjection)) {
    errors.tenYearProjection = 'Ten year projection must be a valid number';
  }

  if (!outputs.taxBurdenTrend || !['increasing', 'decreasing', 'stable'].includes(outputs.taxBurdenTrend)) {
    errors.taxBurdenTrend = 'Valid tax burden trend is required';
  }

  // Validate comparative analysis
  if (typeof outputs.stateAverageTaxRate !== 'number' || isNaN(outputs.stateAverageTaxRate)) {
    errors.stateAverageTaxRate = 'State average tax rate must be a valid number';
  }

  if (typeof outputs.countyAverageTaxRate !== 'number' || isNaN(outputs.countyAverageTaxRate)) {
    errors.countyAverageTaxRate = 'County average tax rate must be a valid number';
  }

  if (typeof outputs.cityAverageTaxRate !== 'number' || isNaN(outputs.cityAverageTaxRate)) {
    errors.cityAverageTaxRate = 'City average tax rate must be a valid number';
  }

  if (typeof outputs.comparisonPercentile !== 'number' || isNaN(outputs.comparisonPercentile)) {
    errors.comparisonPercentile = 'Comparison percentile must be a valid number';
  }

  if (!outputs.taxEfficiency || !['low', 'medium', 'high'].includes(outputs.taxEfficiency)) {
    errors.taxEfficiency = 'Valid tax efficiency is required';
  }

  // Validate arrays
  if (!outputs.timelineAnalysis || !Array.isArray(outputs.timelineAnalysis)) {
    errors.timelineAnalysis = 'Timeline analysis array is required';
  }

  if (!outputs.sensitivityMatrix || !Array.isArray(outputs.sensitivityMatrix)) {
    errors.sensitivityMatrix = 'Sensitivity matrix array is required';
  }

  if (!outputs.scenarios || !Array.isArray(outputs.scenarios)) {
    errors.scenarios = 'Scenarios array is required';
  }

  if (!outputs.comparisonAnalysis || !Array.isArray(outputs.comparisonAnalysis)) {
    errors.comparisonAnalysis = 'Comparison analysis array is required';
  }

  if (!outputs.marketAnalysis || !Array.isArray(outputs.marketAnalysis)) {
    errors.marketAnalysis = 'Market analysis array is required';
  }

  // Validate analysis object
  if (!outputs.analysis || typeof outputs.analysis !== 'object') {
    errors.analysis = 'Analysis object is required';
  } else {
    if (!outputs.analysis.taxRating || !['Low', 'Medium', 'High', 'Very High'].includes(outputs.analysis.taxRating)) {
      errors.analysis = 'Valid tax rating is required';
    }
    if (!outputs.analysis.affordabilityRating || !['Excellent', 'Good', 'Fair', 'Poor'].includes(outputs.analysis.affordabilityRating)) {
      errors.analysis = 'Valid affordability rating is required';
    }
    if (!outputs.analysis.recommendation || typeof outputs.analysis.recommendation !== 'string') {
      errors.analysis = 'Recommendation is required';
    }
  }

  // Validate additional metrics
  if (typeof outputs.taxPerSquareFoot !== 'number' || isNaN(outputs.taxPerSquareFoot)) {
    errors.taxPerSquareFoot = 'Tax per square foot must be a valid number';
  }

  if (typeof outputs.taxPerBedroom !== 'number' || isNaN(outputs.taxPerBedroom)) {
    errors.taxPerBedroom = 'Tax per bedroom must be a valid number';
  }

  if (typeof outputs.taxPerBathroom !== 'number' || isNaN(outputs.taxPerBathroom)) {
    errors.taxPerBathroom = 'Tax per bathroom must be a valid number';
  }

  if (typeof outputs.taxBurdenRatio !== 'number' || isNaN(outputs.taxBurdenRatio)) {
    errors.taxBurdenRatio = 'Tax burden ratio must be a valid number';
  }

  if (typeof outputs.affordabilityIndex !== 'number' || isNaN(outputs.affordabilityIndex)) {
    errors.affordabilityIndex = 'Affordability index must be a valid number';
  }

  if (typeof outputs.taxEfficiencyScore !== 'number' || isNaN(outputs.taxEfficiencyScore)) {
    errors.taxEfficiencyScore = 'Tax efficiency score must be a valid number';
  }

  // Validate projections
  if (typeof outputs.fiveYearTaxProjection !== 'number' || isNaN(outputs.fiveYearTaxProjection)) {
    errors.fiveYearTaxProjection = 'Five year tax projection must be a valid number';
  }

  if (typeof outputs.tenYearTaxProjection !== 'number' || isNaN(outputs.tenYearTaxProjection)) {
    errors.tenYearTaxProjection = 'Ten year tax projection must be a valid number';
  }

  if (typeof outputs.lifetimeTaxProjection !== 'number' || isNaN(outputs.lifetimeTaxProjection)) {
    errors.lifetimeTaxProjection = 'Lifetime tax projection must be a valid number';
  }

  // Validate risk assessment
  if (typeof outputs.taxRiskScore !== 'number' || isNaN(outputs.taxRiskScore)) {
    errors.taxRiskScore = 'Tax risk score must be a valid number';
  }

  if (!outputs.assessmentRisk || !['low', 'medium', 'high'].includes(outputs.assessmentRisk)) {
    errors.assessmentRisk = 'Valid assessment risk is required';
  }

  if (!outputs.rateChangeRisk || !['low', 'medium', 'high'].includes(outputs.rateChangeRisk)) {
    errors.rateChangeRisk = 'Valid rate change risk is required';
  }

  if (!outputs.exemptionRisk || !['low', 'medium', 'high'].includes(outputs.exemptionRisk)) {
    errors.exemptionRisk = 'Valid exemption risk is required';
  }

  // Validate optimization opportunities
  if (typeof outputs.potentialSavings !== 'number' || isNaN(outputs.potentialSavings)) {
    errors.potentialSavings = 'Potential savings must be a valid number';
  }

  if (!outputs.optimizationOpportunities || !Array.isArray(outputs.optimizationOpportunities)) {
    errors.optimizationOpportunities = 'Optimization opportunities array is required';
  }

  if (!outputs.exemptionOpportunities || !Array.isArray(outputs.exemptionOpportunities)) {
    errors.exemptionOpportunities = 'Exemption opportunities array is required';
  }

  if (!outputs.appealOpportunities || !Array.isArray(outputs.appealOpportunities)) {
    errors.appealOpportunities = 'Appeal opportunities array is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}