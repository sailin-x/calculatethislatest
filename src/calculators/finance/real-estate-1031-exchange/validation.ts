import { RealEstate1031ExchangeInputs, RealEstate1031ExchangeOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstate1031ExchangeInputs(inputs: RealEstate1031ExchangeInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Relinquished Property validation
  if (inputs.relinquishedPropertyValue <= 0) {
    errors.relinquishedPropertyValue = 'Relinquished property value must be greater than 0';
  }

  if (inputs.relinquishedPropertyBasis <= 0) {
    errors.relinquishedPropertyBasis = 'Relinquished property basis must be greater than 0';
  }

  if (inputs.relinquishedPropertyDebt < 0) {
    errors.relinquishedPropertyDebt = 'Relinquished property debt cannot be negative';
  }

  if (!inputs.relinquishedPropertyAcquisitionDate) {
    errors.relinquishedPropertyAcquisitionDate = 'Relinquished property acquisition date is required';
  }

  if (!inputs.relinquishedPropertySaleDate) {
    errors.relinquishedPropertySaleDate = 'Relinquished property sale date is required';
  }

  if (inputs.relinquishedPropertySalePrice <= 0) {
    errors.relinquishedPropertySalePrice = 'Relinquished property sale price must be greater than 0';
  }

  if (inputs.relinquishedPropertySellingCosts < 0) {
    errors.relinquishedPropertySellingCosts = 'Relinquished property selling costs cannot be negative';
  }

  // Replacement Property validation
  if (inputs.replacementPropertyValue <= 0) {
    errors.replacementPropertyValue = 'Replacement property value must be greater than 0';
  }

  if (inputs.replacementPropertyBasis <= 0) {
    errors.replacementPropertyBasis = 'Replacement property basis must be greater than 0';
  }

  if (inputs.replacementPropertyDebt < 0) {
    errors.replacementPropertyDebt = 'Replacement property debt cannot be negative';
  }

  if (!inputs.replacementPropertyAcquisitionDate) {
    errors.replacementPropertyAcquisitionDate = 'Replacement property acquisition date is required';
  }

  if (inputs.replacementPropertyAcquisitionCosts < 0) {
    errors.replacementPropertyAcquisitionCosts = 'Replacement property acquisition costs cannot be negative';
  }

  // Exchange Information validation
  if (!['simultaneous', 'delayed', 'reverse', 'build-to-suit'].includes(inputs.exchangeType)) {
    errors.exchangeType = 'Invalid exchange type';
  }

  if (inputs.identificationPeriod < 0 || inputs.identificationPeriod > 45) {
    errors.identificationPeriod = 'Identification period must be between 0 and 45 days';
  }

  if (inputs.exchangePeriod < 0 || inputs.exchangePeriod > 180) {
    errors.exchangePeriod = 'Exchange period must be between 0 and 180 days';
  }

  if (inputs.exchangeFees < 0) {
    errors.exchangeFees = 'Exchange fees cannot be negative';
  }

  // Boot Information validation
  if (inputs.cashBoot < 0) {
    errors.cashBoot = 'Cash boot cannot be negative';
  }

  if (inputs.mortgageBoot < 0) {
    errors.mortgageBoot = 'Mortgage boot cannot be negative';
  }

  if (inputs.personalPropertyBoot < 0) {
    errors.personalPropertyBoot = 'Personal property boot cannot be negative';
  }

  if (inputs.otherBoot < 0) {
    errors.otherBoot = 'Other boot cannot be negative';
  }

  // Tax Information validation
  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.taxRate = 'Tax rate must be between 0% and 50%';
  }

  if (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15) {
    errors.stateTaxRate = 'State tax rate must be between 0% and 15%';
  }

  if (inputs.depreciationRecaptureRate < 0 || inputs.depreciationRecaptureRate > 50) {
    errors.depreciationRecaptureRate = 'Depreciation recapture rate must be between 0% and 50%';
  }

  // Additional Information validation
  if (inputs.holdingPeriod < 0) {
    errors.holdingPeriod = 'Holding period cannot be negative';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.relinquishedPropertySalePrice < inputs.relinquishedPropertySellingCosts) {
    errors.relinquishedPropertySalePrice = 'Sale price must be greater than selling costs';
  }

  const netSaleProceeds = inputs.relinquishedPropertySalePrice - inputs.relinquishedPropertySellingCosts;
  if (netSaleProceeds < inputs.relinquishedPropertyDebt) {
    errors.relinquishedPropertySalePrice = 'Net sale proceeds must be sufficient to pay off debt';
  }

  if (inputs.replacementPropertyDebt > inputs.replacementPropertyBasis) {
    errors.replacementPropertyDebt = 'Replacement property debt cannot exceed basis';
  }

  // Date validations
  if (inputs.relinquishedPropertyAcquisitionDate && inputs.relinquishedPropertySaleDate) {
    const acquisitionDate = new Date(inputs.relinquishedPropertyAcquisitionDate);
    const saleDate = new Date(inputs.relinquishedPropertySaleDate);
    if (saleDate <= acquisitionDate) {
      errors.relinquishedPropertySaleDate = 'Sale date must be after acquisition date';
    }
  }

  if (inputs.relinquishedPropertySaleDate && inputs.replacementPropertyAcquisitionDate) {
    const saleDate = new Date(inputs.relinquishedPropertySaleDate);
    const replacementDate = new Date(inputs.replacementPropertyAcquisitionDate);
    if (replacementDate < saleDate) {
      errors.replacementPropertyAcquisitionDate = 'Replacement property acquisition date cannot be before sale date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstate1031ExchangeOutputs(outputs: RealEstate1031ExchangeOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.realizedGain < 0) {
    errors.realizedGain = 'Realized gain cannot be negative';
  }

  if (outputs.metrics.recognizedGain < 0) {
    errors.recognizedGain = 'Recognized gain cannot be negative';
  }

  if (outputs.metrics.deferredGain < 0) {
    errors.deferredGain = 'Deferred gain cannot be negative';
  }

  if (outputs.metrics.bootReceived < 0) {
    errors.bootReceived = 'Boot received cannot be negative';
  }

  if (outputs.metrics.bootGiven < 0) {
    errors.bootGiven = 'Boot given cannot be negative';
  }

  if (outputs.metrics.taxLiability < 0) {
    errors.taxLiability = 'Tax liability cannot be negative';
  }

  if (outputs.metrics.taxSavings < 0) {
    errors.taxSavings = 'Tax savings cannot be negative';
  }

  if (outputs.metrics.effectiveTaxRate < 0 || outputs.metrics.effectiveTaxRate > 100) {
    errors.effectiveTaxRate = 'Effective tax rate must be between 0% and 100%';
  }

  if (outputs.metrics.equityReplacement < 0) {
    errors.equityReplacement = 'Equity replacement cannot be negative';
  }

  if (outputs.metrics.debtReplacement < 0) {
    errors.debtReplacement = 'Debt replacement cannot be negative';
  }

  if (outputs.metrics.totalReplacement < 0) {
    errors.totalReplacement = 'Total replacement cannot be negative';
  }

  if (outputs.metrics.exchangeRatio < 0) {
    errors.exchangeRatio = 'Exchange ratio cannot be negative';
  }

  if (outputs.metrics.daysRemaining < 0) {
    errors.daysRemaining = 'Days remaining cannot be negative';
  }

  if (outputs.metrics.qualificationPercentage < 0 || outputs.metrics.qualificationPercentage > 100) {
    errors.qualificationPercentage = 'Qualification percentage must be between 0% and 100%';
  }

  // Validate timeline
  if (!outputs.timeline || outputs.timeline.length === 0) {
    errors.timeline = 'Timeline is required';
  } else {
    outputs.timeline.forEach((event, index) => {
      if (!event.event || event.event.trim().length === 0) {
        errors[`timeline[${index}].event`] = 'Event is required';
      }
      if (!event.deadline || event.deadline.trim().length === 0) {
        errors[`timeline[${index}].deadline`] = 'Deadline is required';
      }
      if (!['completed', 'pending', 'overdue'].includes(event.status)) {
        errors[`timeline[${index}].status`] = 'Status must be completed, pending, or overdue';
      }
      if (!event.description || event.description.trim().length === 0) {
        errors[`timeline[${index}].description`] = 'Description is required';
      }
    });
  }

  // Validate boot analysis
  if (!outputs.bootAnalysis || outputs.bootAnalysis.length === 0) {
    errors.bootAnalysis = 'Boot analysis is required';
  } else {
    outputs.bootAnalysis.forEach((boot, index) => {
      if (!boot.type || boot.type.trim().length === 0) {
        errors[`bootAnalysis[${index}].type`] = 'Type is required';
      }
      if (boot.amount < 0) {
        errors[`bootAnalysis[${index}].amount`] = 'Amount cannot be negative';
      }
      if (boot.taxRate < 0 || boot.taxRate > 100) {
        errors[`bootAnalysis[${index}].taxRate`] = 'Tax rate must be between 0% and 100%';
      }
      if (boot.taxLiability < 0) {
        errors[`bootAnalysis[${index}].taxLiability`] = 'Tax liability cannot be negative';
      }
      if (!boot.description || boot.description.trim().length === 0) {
        errors[`bootAnalysis[${index}].description`] = 'Description is required';
      }
    });
  }

  // Validate tax forms
  if (!outputs.taxForms || outputs.taxForms.length === 0) {
    errors.taxForms = 'Tax forms are required';
  } else {
    outputs.taxForms.forEach((form, index) => {
      if (!form.form || form.form.trim().length === 0) {
        errors[`taxForms[${index}].form`] = 'Form is required';
      }
      if (!form.schedule || form.schedule.trim().length === 0) {
        errors[`taxForms[${index}].schedule`] = 'Schedule is required';
      }
      if (!form.description || form.description.trim().length === 0) {
        errors[`taxForms[${index}].description`] = 'Description is required';
      }
      if (form.amount < 0) {
        errors[`taxForms[${index}].amount`] = 'Amount cannot be negative';
      }
      if (!form.line || form.line.trim().length === 0) {
        errors[`taxForms[${index}].line`] = 'Line is required';
      }
    });
  }

  // Validate compliance checks
  if (!outputs.complianceChecks || outputs.complianceChecks.length === 0) {
    errors.complianceChecks = 'Compliance checks are required';
  } else {
    outputs.complianceChecks.forEach((check, index) => {
      if (!check.requirement || check.requirement.trim().length === 0) {
        errors[`complianceChecks[${index}].requirement`] = 'Requirement is required';
      }
      if (!['pass', 'fail', 'warning'].includes(check.status)) {
        errors[`complianceChecks[${index}].status`] = 'Status must be pass, fail, or warning';
      }
      if (!check.description || check.description.trim().length === 0) {
        errors[`complianceChecks[${index}].description`] = 'Description is required';
      }
      if (!check.impact || check.impact.trim().length === 0) {
        errors[`complianceChecks[${index}].impact`] = 'Impact is required';
      }
      if (!check.recommendation || check.recommendation.trim().length === 0) {
        errors[`complianceChecks[${index}].recommendation`] = 'Recommendation is required';
      }
    });
  }

  // Validate analysis
  if (!outputs.analysis) {
    errors.analysis = 'Analysis is required';
  } else {
    if (!outputs.analysis.keyBenefits || outputs.analysis.keyBenefits.length === 0) {
      errors.keyBenefits = 'Key benefits are required';
    }
    if (!outputs.analysis.taxSavingsOpportunities || outputs.analysis.taxSavingsOpportunities.length === 0) {
      errors.taxSavingsOpportunities = 'Tax savings opportunities are required';
    }
    if (!outputs.analysis.risks || outputs.analysis.risks.length === 0) {
      errors.risks = 'Risks are required';
    }
    if (!outputs.analysis.recommendations || outputs.analysis.recommendations.length === 0) {
      errors.recommendations = 'Recommendations are required';
    }
    if (outputs.analysis.complianceScore < 0 || outputs.analysis.complianceScore > 100) {
      errors.complianceScore = 'Compliance score must be between 0 and 100';
    }
    if (!outputs.analysis.complianceIssues || outputs.analysis.complianceIssues.length === 0) {
      errors.complianceIssues = 'Compliance issues are required';
    }
    if (!outputs.analysis.qualificationRequirements || outputs.analysis.qualificationRequirements.length === 0) {
      errors.qualificationRequirements = 'Qualification requirements are required';
    }
    if (!['low', 'medium', 'high'].includes(outputs.analysis.riskLevel)) {
      errors.riskLevel = 'Risk level must be low, medium, or high';
    }
    if (!outputs.analysis.riskFactors || outputs.analysis.riskFactors.length === 0) {
      errors.riskFactors = 'Risk factors are required';
    }
    if (!outputs.analysis.mitigationStrategies || outputs.analysis.mitigationStrategies.length === 0) {
      errors.mitigationStrategies = 'Mitigation strategies are required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}