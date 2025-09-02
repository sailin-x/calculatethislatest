import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstateTaxDeductionsInputs(inputs: RealEstateTaxDeductionsInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information validation
  if (!['residential', 'commercial', 'mixed-use', 'industrial', 'rental', 'vacation-home', 'investment'].includes(inputs.propertyType)) {
    errors.propertyType = 'Invalid property type';
  }

  if (inputs.propertyValue <= 0) {
    errors.propertyValue = 'Property value must be greater than 0';
  }

  if (!inputs.acquisitionDate) {
    errors.acquisitionDate = 'Acquisition date is required';
  } else {
    const acquisitionDate = new Date(inputs.acquisitionDate);
    const today = new Date();
    if (acquisitionDate > today) {
      errors.acquisitionDate = 'Acquisition date cannot be in the future';
    }
  }

  if (!inputs.placedInServiceDate) {
    errors.placedInServiceDate = 'Placed in service date is required';
  } else {
    const placedInServiceDate = new Date(inputs.placedInServiceDate);
    const today = new Date();
    if (placedInServiceDate > today) {
      errors.placedInServiceDate = 'Placed in service date cannot be in the future';
    }
  }

  if (!['personal', 'rental', 'business', 'mixed'].includes(inputs.propertyUse)) {
    errors.propertyUse = 'Invalid property use';
  }

  if (inputs.personalUsePercentage < 0 || inputs.personalUsePercentage > 100) {
    errors.personalUsePercentage = 'Personal use percentage must be between 0% and 100%';
  }

  // Income Information validation
  if (inputs.rentalIncome < 0) {
    errors.rentalIncome = 'Rental income cannot be negative';
  }

  if (inputs.otherIncome < 0) {
    errors.otherIncome = 'Other income cannot be negative';
  }

  if (inputs.totalIncome < 0) {
    errors.totalIncome = 'Total income cannot be negative';
  }

  if (!['single', 'married-filing-jointly', 'married-filing-separately', 'head-of-household', 'qualifying-widow'].includes(inputs.filingStatus)) {
    errors.filingStatus = 'Invalid filing status';
  }

  if (inputs.taxYear < 2018 || inputs.taxYear > 2030) {
    errors.taxYear = 'Tax year must be between 2018 and 2030';
  }

  // Property Expenses validation
  if (inputs.mortgageInterest < 0) {
    errors.mortgageInterest = 'Mortgage interest cannot be negative';
  }

  if (inputs.propertyTaxes < 0) {
    errors.propertyTaxes = 'Property taxes cannot be negative';
  }

  if (inputs.insurance < 0) {
    errors.insurance = 'Insurance cannot be negative';
  }

  if (inputs.utilities < 0) {
    errors.utilities = 'Utilities cannot be negative';
  }

  if (inputs.maintenance < 0) {
    errors.maintenance = 'Maintenance cannot be negative';
  }

  if (inputs.repairs < 0) {
    errors.repairs = 'Repairs cannot be negative';
  }

  if (inputs.propertyManagement < 0) {
    errors.propertyManagement = 'Property management cannot be negative';
  }

  if (inputs.advertising < 0) {
    errors.advertising = 'Advertising cannot be negative';
  }

  if (inputs.legalFees < 0) {
    errors.legalFees = 'Legal fees cannot be negative';
  }

  if (inputs.accountingFees < 0) {
    errors.accountingFees = 'Accounting fees cannot be negative';
  }

  if (inputs.travelExpenses < 0) {
    errors.travelExpenses = 'Travel expenses cannot be negative';
  }

  if (inputs.homeOfficeExpenses < 0) {
    errors.homeOfficeExpenses = 'Home office expenses cannot be negative';
  }

  if (inputs.otherExpenses < 0) {
    errors.otherExpenses = 'Other expenses cannot be negative';
  }

  // Depreciation Information validation
  if (inputs.landValue < 0) {
    errors.landValue = 'Land value cannot be negative';
  }

  if (inputs.buildingValue < 0) {
    errors.buildingValue = 'Building value cannot be negative';
  }

  if (inputs.improvementsValue < 0) {
    errors.improvementsValue = 'Improvements value cannot be negative';
  }

  // Validate property value components
  if (inputs.landValue + inputs.buildingValue + inputs.improvementsValue > inputs.propertyValue * 1.1) {
    errors.buildingValue = 'Land + Building + Improvements cannot exceed property value by more than 10%';
  }

  if (!['straight-line', 'declining-balance', 'sum-of-years-digits'].includes(inputs.depreciationMethod)) {
    errors.depreciationMethod = 'Invalid depreciation method';
  }

  if (inputs.recoveryPeriod < 1 || inputs.recoveryPeriod > 50) {
    errors.recoveryPeriod = 'Recovery period must be between 1 and 50 years';
  }

  if (inputs.bonusDepreciationPercentage < 0 || inputs.bonusDepreciationPercentage > 100) {
    errors.bonusDepreciationPercentage = 'Bonus depreciation percentage must be between 0% and 100%';
  }

  if (inputs.section179Amount < 0) {
    errors.section179Amount = 'Section 179 amount cannot be negative';
  }

  // State and Local Information validation
  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 15%';
  }

  if (inputs.localTaxRate < 0 || inputs.localTaxRate > 10) {
    errors.localTaxRate = 'Local tax rate must be between 0% and 10%';
  }

  if (inputs.stateDeductions < 0) {
    errors.stateDeductions = 'State deductions cannot be negative';
  }

  if (inputs.localDeductions < 0) {
    errors.localDeductions = 'Local deductions cannot be negative';
  }

  // Additional Information validation
  if (inputs.casualtyLosses < 0) {
    errors.casualtyLosses = 'Casualty losses cannot be negative';
  }

  if (inputs.theftLosses < 0) {
    errors.theftLosses = 'Theft losses cannot be negative';
  }

  if (inputs.casualtyGains < 0) {
    errors.casualtyGains = 'Casualty gains cannot be negative';
  }

  if (inputs.netOperatingLoss < 0) {
    errors.netOperatingLoss = 'Net operating loss cannot be negative';
  }

  // Tax Credits validation
  if (inputs.energyEfficientImprovements < 0) {
    errors.energyEfficientImprovements = 'Energy efficient improvements cannot be negative';
  }

  if (inputs.renewableEnergyCredits < 0) {
    errors.renewableEnergyCredits = 'Renewable energy credits cannot be negative';
  }

  if (inputs.lowIncomeHousingCredits < 0) {
    errors.lowIncomeHousingCredits = 'Low income housing credits cannot be negative';
  }

  if (inputs.historicRehabilitationCredits < 0) {
    errors.historicRehabilitationCredits = 'Historic rehabilitation credits cannot be negative';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.rentalIncome === 0 && inputs.propertyUse === 'rental') {
    errors.rentalIncome = 'Rental income should be provided for rental properties';
  }

  if (inputs.mortgageInterest > 0 && inputs.propertyValue === 0) {
    errors.propertyValue = 'Property value should be provided when mortgage interest is claimed';
  }

  if (inputs.propertyTaxes > 0 && inputs.propertyValue === 0) {
    errors.propertyValue = 'Property value should be provided when property taxes are claimed';
  }

  if (inputs.bonusDepreciationEligible && inputs.bonusDepreciationPercentage === 0) {
    errors.bonusDepreciationPercentage = 'Bonus depreciation percentage should be provided when eligible';
  }

  if (inputs.section179Eligible && inputs.section179Amount === 0) {
    errors.section179Amount = 'Section 179 amount should be provided when eligible';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstateTaxDeductionsOutputs(outputs: RealEstateTaxDeductionsOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.taxSavings < 0) {
    errors.taxSavings = 'Tax savings cannot be negative';
  }

  if (outputs.metrics.totalDeductions < 0) {
    errors.totalDeductions = 'Total deductions cannot be negative';
  }

  if (outputs.metrics.effectiveTaxRate < 0 || outputs.metrics.effectiveTaxRate > 100) {
    errors.effectiveTaxRate = 'Effective tax rate must be between 0% and 100%';
  }

  if (outputs.metrics.federalTaxLiability < 0) {
    errors.federalTaxLiability = 'Federal tax liability cannot be negative';
  }

  if (outputs.metrics.stateTaxLiability < 0) {
    errors.stateTaxLiability = 'State tax liability cannot be negative';
  }

  if (outputs.metrics.localTaxLiability < 0) {
    errors.localTaxLiability = 'Local tax liability cannot be negative';
  }

  if (outputs.metrics.totalTaxLiability < 0) {
    errors.totalTaxLiability = 'Total tax liability cannot be negative';
  }

  if (outputs.metrics.totalIncome < 0) {
    errors.totalIncome = 'Total income cannot be negative';
  }

  if (outputs.metrics.rentalIncome < 0) {
    errors.rentalIncome = 'Rental income cannot be negative';
  }

  if (outputs.metrics.taxableIncome < 0) {
    errors.taxableIncome = 'Taxable income cannot be negative';
  }

  if (outputs.metrics.adjustedGrossIncome < 0) {
    errors.adjustedGrossIncome = 'Adjusted gross income cannot be negative';
  }

  if (outputs.metrics.itemizedDeductions < 0) {
    errors.itemizedDeductions = 'Itemized deductions cannot be negative';
  }

  if (outputs.metrics.standardDeduction < 0) {
    errors.standardDeduction = 'Standard deduction cannot be negative';
  }

  if (!['itemized', 'standard'].includes(outputs.metrics.usedDeduction)) {
    errors.usedDeduction = 'Used deduction must be itemized or standard';
  }

  if (outputs.metrics.mortgageInterestDeduction < 0) {
    errors.mortgageInterestDeduction = 'Mortgage interest deduction cannot be negative';
  }

  if (outputs.metrics.propertyTaxDeduction < 0) {
    errors.propertyTaxDeduction = 'Property tax deduction cannot be negative';
  }

  if (outputs.metrics.depreciationDeduction < 0) {
    errors.depreciationDeduction = 'Depreciation deduction cannot be negative';
  }

  if (outputs.metrics.operatingExpenseDeduction < 0) {
    errors.operatingExpenseDeduction = 'Operating expense deduction cannot be negative';
  }

  if (outputs.metrics.passiveLoss < 0) {
    errors.passiveLoss = 'Passive loss cannot be negative';
  }

  if (outputs.metrics.suspendedLoss < 0) {
    errors.suspendedLoss = 'Suspended loss cannot be negative';
  }

  if (outputs.metrics.activeLoss < 0) {
    errors.activeLoss = 'Active loss cannot be negative';
  }

  if (outputs.metrics.totalCredits < 0) {
    errors.totalCredits = 'Total credits cannot be negative';
  }

  if (outputs.metrics.refundableCredits < 0) {
    errors.refundableCredits = 'Refundable credits cannot be negative';
  }

  if (outputs.metrics.nonRefundableCredits < 0) {
    errors.nonRefundableCredits = 'Non-refundable credits cannot be negative';
  }

  // Validate deduction breakdown
  if (!outputs.deductionBreakdown || outputs.deductionBreakdown.length === 0) {
    errors.deductionBreakdown = 'Deduction breakdown is required';
  } else {
    outputs.deductionBreakdown.forEach((deduction, index) => {
      if (!deduction.category || deduction.category.trim().length === 0) {
        errors[`deductionBreakdown[${index}].category`] = 'Category is required';
      }
      if (deduction.amount < 0) {
        errors[`deductionBreakdown[${index}].amount`] = 'Amount cannot be negative';
      }
      if (deduction.percentage < 0 || deduction.percentage > 100) {
        errors[`deductionBreakdown[${index}].percentage`] = 'Percentage must be between 0% and 100%';
      }
      if (!deduction.form || deduction.form.trim().length === 0) {
        errors[`deductionBreakdown[${index}].form`] = 'Form is required';
      }
      if (!deduction.line || deduction.line.trim().length === 0) {
        errors[`deductionBreakdown[${index}].line`] = 'Line is required';
      }
      if (!deduction.description || deduction.description.trim().length === 0) {
        errors[`deductionBreakdown[${index}].description`] = 'Description is required';
      }
    });
  }

  // Validate depreciation schedule
  if (!outputs.depreciationSchedule || outputs.depreciationSchedule.length === 0) {
    errors.depreciationSchedule = 'Depreciation schedule is required';
  } else {
    outputs.depreciationSchedule.forEach((depreciation, index) => {
      if (depreciation.year < 1) {
        errors[`depreciationSchedule[${index}].year`] = 'Year must be greater than 0';
      }
      if (depreciation.beginningBasis < 0) {
        errors[`depreciationSchedule[${index}].beginningBasis`] = 'Beginning basis cannot be negative';
      }
      if (depreciation.depreciation < 0) {
        errors[`depreciationSchedule[${index}].depreciation`] = 'Depreciation cannot be negative';
      }
      if (depreciation.bonusDepreciation < 0) {
        errors[`depreciationSchedule[${index}].bonusDepreciation`] = 'Bonus depreciation cannot be negative';
      }
      if (depreciation.section179 < 0) {
        errors[`depreciationSchedule[${index}].section179`] = 'Section 179 cannot be negative';
      }
      if (depreciation.endingBasis < 0) {
        errors[`depreciationSchedule[${index}].endingBasis`] = 'Ending basis cannot be negative';
      }
      if (depreciation.accumulatedDepreciation < 0) {
        errors[`depreciationSchedule[${index}].accumulatedDepreciation`] = 'Accumulated depreciation cannot be negative';
      }
      if (depreciation.remainingLife < 0) {
        errors[`depreciationSchedule[${index}].remainingLife`] = 'Remaining life cannot be negative';
      }
    });
  }

  // Validate tax schedules
  if (!outputs.taxSchedules || outputs.taxSchedules.length === 0) {
    errors.taxSchedules = 'Tax schedules are required';
  } else {
    outputs.taxSchedules.forEach((schedule, index) => {
      if (!schedule.schedule || schedule.schedule.trim().length === 0) {
        errors[`taxSchedules[${index}].schedule`] = 'Schedule is required';
      }
      if (!schedule.form || schedule.form.trim().length === 0) {
        errors[`taxSchedules[${index}].form`] = 'Form is required';
      }
      if (!schedule.description || schedule.description.trim().length === 0) {
        errors[`taxSchedules[${index}].description`] = 'Description is required';
      }
      if (schedule.amount < 0) {
        errors[`taxSchedules[${index}].amount`] = 'Amount cannot be negative';
      }
      if (!schedule.line || schedule.line.trim().length === 0) {
        errors[`taxSchedules[${index}].line`] = 'Line is required';
      }
    });
  }

  // Validate analysis
  if (!outputs.analysis) {
    errors.analysis = 'Analysis is required';
  } else {
    if (!['low', 'medium', 'high'].includes(outputs.analysis.auditRisk)) {
      errors.auditRisk = 'Audit risk must be low, medium, or high';
    }
    if (!outputs.analysis.riskFactors || outputs.analysis.riskFactors.length === 0) {
      errors.riskFactors = 'Risk factors are required';
    }
    if (!outputs.analysis.keyDeductions || outputs.analysis.keyDeductions.length === 0) {
      errors.keyDeductions = 'Key deductions are required';
    }
    if (!outputs.analysis.taxSavingsOpportunities || outputs.analysis.taxSavingsOpportunities.length === 0) {
      errors.taxSavingsOpportunities = 'Tax savings opportunities are required';
    }
    if (!outputs.analysis.recommendations || outputs.analysis.recommendations.length === 0) {
      errors.recommendations = 'Recommendations are required';
    }
    if (!outputs.analysis.complianceNotes || outputs.analysis.complianceNotes.length === 0) {
      errors.complianceNotes = 'Compliance notes are required';
    }
    if (!outputs.analysis.documentationRequirements || outputs.analysis.documentationRequirements.length === 0) {
      errors.documentationRequirements = 'Documentation requirements are required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}