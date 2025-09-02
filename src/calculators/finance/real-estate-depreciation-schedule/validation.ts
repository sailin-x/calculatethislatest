import { RealEstateDepreciationScheduleInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateRealEstateDepreciationScheduleInputs(inputs: RealEstateDepreciationScheduleInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Property Information Validation
  if (!inputs.propertyName || inputs.propertyName.trim().length === 0) {
    errors.propertyName = 'Property name is required';
  } else if (inputs.propertyName.length > 100) {
    errors.propertyName = 'Property name must be 100 characters or less';
  }

  if (!inputs.propertyType) {
    errors.propertyType = 'Property type is required';
  }

  if (!inputs.propertyAddress || inputs.propertyAddress.trim().length === 0) {
    errors.propertyAddress = 'Property address is required';
  } else if (inputs.propertyAddress.length > 200) {
    errors.propertyAddress = 'Property address must be 200 characters or less';
  }

  if (!inputs.acquisitionDate) {
    errors.acquisitionDate = 'Acquisition date is required';
  } else if (!isValidDate(inputs.acquisitionDate)) {
    errors.acquisitionDate = 'Acquisition date must be a valid date';
  }

  if (!inputs.placedInServiceDate) {
    errors.placedInServiceDate = 'Placed in service date is required';
  } else if (!isValidDate(inputs.placedInServiceDate)) {
    errors.placedInServiceDate = 'Placed in service date must be a valid date';
  } else if (new Date(inputs.placedInServiceDate) < new Date(inputs.acquisitionDate)) {
    errors.placedInServiceDate = 'Placed in service date cannot be before acquisition date';
  }

  // Property Values Validation
  if (inputs.totalCost <= 0) {
    errors.totalCost = 'Total cost must be greater than 0';
  } else if (inputs.totalCost > 1000000000) {
    errors.totalCost = 'Total cost cannot exceed $1 billion';
  }

  if (inputs.landValue < 0) {
    errors.landValue = 'Land value cannot be negative';
  } else if (inputs.landValue > inputs.totalCost) {
    errors.landValue = 'Land value cannot exceed total cost';
  }

  if (inputs.buildingValue < 0) {
    errors.buildingValue = 'Building value cannot be negative';
  }

  if (inputs.improvementsValue < 0) {
    errors.improvementsValue = 'Improvements value cannot be negative';
  }

  if (inputs.personalPropertyValue < 0) {
    errors.personalPropertyValue = 'Personal property value cannot be negative';
  }

  // Validate that building + improvements + personal property doesn't exceed total cost - land value
  const totalImprovements = inputs.buildingValue + inputs.improvementsValue + inputs.personalPropertyValue;
  const maxImprovements = inputs.totalCost - inputs.landValue;
  if (totalImprovements > maxImprovements) {
    errors.buildingValue = 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value';
  }

  // Depreciation Method Validation
  if (!inputs.depreciationMethod) {
    errors.depreciationMethod = 'Depreciation method is required';
  }

  if (inputs.recoveryPeriod <= 0) {
    errors.recoveryPeriod = 'Recovery period must be greater than 0';
  } else if (inputs.recoveryPeriod > 50) {
    errors.recoveryPeriod = 'Recovery period cannot exceed 50 years';
  }

  if (!inputs.convention) {
    errors.convention = 'Convention is required';
  }

  if (inputs.salvageValue < 0) {
    errors.salvageValue = 'Salvage value cannot be negative';
  } else if (inputs.salvageValue > inputs.totalCost) {
    errors.salvageValue = 'Salvage value cannot exceed total cost';
  }

  if (inputs.salvageValuePercentage < 0) {
    errors.salvageValuePercentage = 'Salvage value percentage cannot be negative';
  } else if (inputs.salvageValuePercentage > 100) {
    errors.salvageValuePercentage = 'Salvage value percentage cannot exceed 100%';
  }

  // Cost Segregation Validation
  if (inputs.costSegregationStudy) {
    if (inputs.costSegregationStudyCost < 0) {
      errors.costSegregationStudyCost = 'Cost segregation study cost cannot be negative';
    } else if (inputs.costSegregationStudyCost > inputs.totalCost * 0.1) {
      errors.costSegregationStudyCost = 'Cost segregation study cost cannot exceed 10% of total cost';
    }

    if (inputs.segregatedComponents.length > 0) {
      for (let i = 0; i < inputs.segregatedComponents.length; i++) {
        const component = inputs.segregatedComponents[i];
        if (!component.componentName || component.componentName.trim().length === 0) {
          errors[`segregatedComponents.${i}.componentName`] = 'Component name is required';
        }
        if (component.originalCost <= 0) {
          errors[`segregatedComponents.${i}.originalCost`] = 'Component original cost must be greater than 0';
        }
        if (component.recoveryPeriod <= 0) {
          errors[`segregatedComponents.${i}.recoveryPeriod`] = 'Component recovery period must be greater than 0';
        }
      }
    }
  }

  // Bonus Depreciation Validation
  if (inputs.bonusDepreciationEligible) {
    if (inputs.bonusDepreciationPercentage < 0) {
      errors.bonusDepreciationPercentage = 'Bonus depreciation percentage cannot be negative';
    } else if (inputs.bonusDepreciationPercentage > 100) {
      errors.bonusDepreciationPercentage = 'Bonus depreciation percentage cannot exceed 100%';
    }

    if (inputs.bonusDepreciationYear < 2017) {
      errors.bonusDepreciationYear = 'Bonus depreciation year must be 2017 or later';
    } else if (inputs.bonusDepreciationYear > new Date().getFullYear() + 10) {
      errors.bonusDepreciationYear = 'Bonus depreciation year cannot be more than 10 years in the future';
    }
  }

  // Section 179 Validation
  if (inputs.section179Eligible) {
    if (inputs.section179Deduction < 0) {
      errors.section179Deduction = 'Section 179 deduction cannot be negative';
    } else if (inputs.section179Deduction > 1000000) {
      errors.section179Deduction = 'Section 179 deduction cannot exceed $1,000,000';
    }

    if (inputs.section179Year < 2017) {
      errors.section179Year = 'Section 179 year must be 2017 or later';
    } else if (inputs.section179Year > new Date().getFullYear() + 10) {
      errors.section179Year = 'Section 179 year cannot be more than 10 years in the future';
    }
  }

  // Property Improvements Validation
  if (inputs.improvements.length > 0) {
    for (let i = 0; i < inputs.improvements.length; i++) {
      const improvement = inputs.improvements[i];
      if (!improvement.improvementName || improvement.improvementName.trim().length === 0) {
        errors[`improvements.${i}.improvementName`] = 'Improvement name is required';
      }
      if (improvement.improvementCost <= 0) {
        errors[`improvements.${i}.improvementCost`] = 'Improvement cost must be greater than 0';
      }
      if (improvement.recoveryPeriod <= 0) {
        errors[`improvements.${i}.recoveryPeriod`] = 'Improvement recovery period must be greater than 0';
      }
    }
  }

  // Renovations Validation
  if (inputs.renovations.length > 0) {
    for (let i = 0; i < inputs.renovations.length; i++) {
      const renovation = inputs.renovations[i];
      if (!renovation.renovationName || renovation.renovationName.trim().length === 0) {
        errors[`renovations.${i}.renovationName`] = 'Renovation name is required';
      }
      if (renovation.renovationCost <= 0) {
        errors[`renovations.${i}.renovationCost`] = 'Renovation cost must be greater than 0';
      }
      if (renovation.recoveryPeriod <= 0) {
        errors[`renovations.${i}.recoveryPeriod`] = 'Renovation recovery period must be greater than 0';
      }
    }
  }

  // Additions Validation
  if (inputs.additions.length > 0) {
    for (let i = 0; i < inputs.additions.length; i++) {
      const addition = inputs.additions[i];
      if (!addition.additionName || addition.additionName.trim().length === 0) {
        errors[`additions.${i}.additionName`] = 'Addition name is required';
      }
      if (addition.additionCost <= 0) {
        errors[`additions.${i}.additionCost`] = 'Addition cost must be greater than 0';
      }
      if (addition.recoveryPeriod <= 0) {
        errors[`additions.${i}.recoveryPeriod`] = 'Addition recovery period must be greater than 0';
      }
    }
  }

  // Disposition Validation
  if (inputs.dispositionDate) {
    if (!isValidDate(inputs.dispositionDate)) {
      errors.dispositionDate = 'Disposition date must be a valid date';
    } else if (new Date(inputs.dispositionDate) < new Date(inputs.acquisitionDate)) {
      errors.dispositionDate = 'Disposition date cannot be before acquisition date';
    }

    if (inputs.dispositionAmount < 0) {
      errors.dispositionAmount = 'Disposition amount cannot be negative';
    }

    if (inputs.adjustedBasis < 0) {
      errors.adjustedBasis = 'Adjusted basis cannot be negative';
    }
  }

  // Tax Information Validation
  if (inputs.taxYear < 2017) {
    errors.taxYear = 'Tax year must be 2017 or later';
  } else if (inputs.taxYear > new Date().getFullYear() + 10) {
    errors.taxYear = 'Tax year cannot be more than 10 years in the future';
  }

  if (inputs.taxRate < 0) {
    errors.taxRate = 'Federal tax rate cannot be negative';
  } else if (inputs.taxRate > 50) {
    errors.taxRate = 'Federal tax rate cannot exceed 50%';
  }

  if (inputs.stateTaxRate < 0) {
    errors.stateTaxRate = 'State tax rate cannot be negative';
  } else if (inputs.stateTaxRate > 20) {
    errors.stateTaxRate = 'State tax rate cannot exceed 20%';
  }

  if (inputs.localTaxRate < 0) {
    errors.localTaxRate = 'Local tax rate cannot be negative';
  } else if (inputs.localTaxRate > 10) {
    errors.localTaxRate = 'Local tax rate cannot exceed 10%';
  }

  // Alternative Minimum Tax Validation
  if (inputs.amtEligible) {
    if (inputs.amtAdjustments < 0) {
      errors.amtAdjustments = 'AMT adjustments cannot be negative';
    }
  }

  // Business Logic Validation
  const totalTaxRate = inputs.taxRate + inputs.stateTaxRate + inputs.localTaxRate;
  if (totalTaxRate > 70) {
    errors.taxRate = 'Combined tax rate (federal + state + local) cannot exceed 70%';
  }

  // Property Type Specific Validation
  switch (inputs.propertyType) {
    case 'residential':
      if (inputs.recoveryPeriod !== 27.5) {
        errors.recoveryPeriod = 'Residential property typically uses 27.5-year recovery period';
      }
      break;
    case 'commercial':
    case 'office':
    case 'retail':
    case 'industrial':
      if (inputs.recoveryPeriod !== 39) {
        errors.recoveryPeriod = 'Commercial property typically uses 39-year recovery period';
      }
      break;
    case 'hotel':
      if (inputs.recoveryPeriod !== 39) {
        errors.recoveryPeriod = 'Hotel property typically uses 39-year recovery period';
      }
      break;
    case 'land-development':
      if (inputs.recoveryPeriod < 5 || inputs.recoveryPeriod > 15) {
        errors.recoveryPeriod = 'Land development typically uses 5-15 year recovery period';
      }
      break;
  }

  // Depreciation Method Specific Validation
  switch (inputs.depreciationMethod) {
    case 'straight-line':
      // No additional validation needed
      break;
    case 'accelerated':
      if (inputs.recoveryPeriod !== 27.5 && inputs.recoveryPeriod !== 39) {
        errors.depreciationMethod = 'Accelerated depreciation typically uses 27.5 or 39-year recovery periods';
      }
      break;
    case 'bonus':
    case 'bonus-depreciation':
      if (!inputs.bonusDepreciationEligible) {
        errors.depreciationMethod = 'Bonus depreciation requires bonus depreciation to be eligible';
      }
      break;
    case 'cost-segregation':
      if (!inputs.costSegregationStudy) {
        errors.depreciationMethod = 'Cost segregation depreciation requires cost segregation study';
      }
      break;
    case 'section-179':
      if (!inputs.section179Eligible) {
        errors.depreciationMethod = 'Section 179 depreciation requires Section 179 to be eligible';
      }
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateRealEstateDepreciationScheduleOutputs(outputs: any): ValidationResult {
  const errors: Record<string, string> = {};

  // Basic structure validation
  if (!outputs.metrics) {
    errors.metrics = 'Metrics are required';
  }

  if (!outputs.analysis) {
    errors.analysis = 'Analysis is required';
  }

  if (!outputs.depreciationSchedule) {
    errors.depreciationSchedule = 'Depreciation schedule is required';
  }

  if (!outputs.taxImpacts) {
    errors.taxImpacts = 'Tax impacts are required';
  }

  // Metrics validation
  if (outputs.metrics) {
    if (typeof outputs.metrics.totalDepreciableBasis !== 'number' || outputs.metrics.totalDepreciableBasis < 0) {
      errors['metrics.totalDepreciableBasis'] = 'Total depreciable basis must be a non-negative number';
    }

    if (typeof outputs.metrics.totalDepreciationTaken !== 'number' || outputs.metrics.totalDepreciationTaken < 0) {
      errors['metrics.totalDepreciationTaken'] = 'Total depreciation taken must be a non-negative number';
    }

    if (typeof outputs.metrics.remainingBasis !== 'number' || outputs.metrics.remainingBasis < 0) {
      errors['metrics.remainingBasis'] = 'Remaining basis must be a non-negative number';
    }

    if (typeof outputs.metrics.currentYearDepreciation !== 'number' || outputs.metrics.currentYearDepreciation < 0) {
      errors['metrics.currentYearDepreciation'] = 'Current year depreciation must be a non-negative number';
    }

    if (typeof outputs.metrics.taxSavings !== 'number') {
      errors['metrics.taxSavings'] = 'Tax savings must be a number';
    }

    if (typeof outputs.metrics.effectiveTaxRate !== 'number' || outputs.metrics.effectiveTaxRate < 0 || outputs.metrics.effectiveTaxRate > 100) {
      errors['metrics.effectiveTaxRate'] = 'Effective tax rate must be between 0 and 100';
    }

    if (typeof outputs.metrics.recoveryPercentage !== 'number' || outputs.metrics.recoveryPercentage < 0 || outputs.metrics.recoveryPercentage > 100) {
      errors['metrics.recoveryPercentage'] = 'Recovery percentage must be between 0 and 100';
    }

    if (typeof outputs.metrics.yearsRemaining !== 'number' || outputs.metrics.yearsRemaining < 0) {
      errors['metrics.yearsRemaining'] = 'Years remaining must be a non-negative number';
    }
  }

  // Analysis validation
  if (outputs.analysis) {
    if (!outputs.analysis.depreciationStrategy) {
      errors['analysis.depreciationStrategy'] = 'Depreciation strategy is required';
    }

    if (typeof outputs.analysis.strategyScore !== 'number' || outputs.analysis.strategyScore < 0 || outputs.analysis.strategyScore > 100) {
      errors['analysis.strategyScore'] = 'Strategy score must be between 0 and 100';
    }

    if (!Array.isArray(outputs.analysis.keyBenefits)) {
      errors['analysis.keyBenefits'] = 'Key benefits must be an array';
    }

    if (!Array.isArray(outputs.analysis.keyRisks)) {
      errors['analysis.keyRisks'] = 'Key risks must be an array';
    }

    if (!Array.isArray(outputs.analysis.recommendations)) {
      errors['analysis.recommendations'] = 'Recommendations must be an array';
    }
  }

  // Depreciation schedule validation
  if (outputs.depreciationSchedule) {
    if (!outputs.depreciationSchedule.propertyName) {
      errors['depreciationSchedule.propertyName'] = 'Property name is required';
    }

    if (typeof outputs.depreciationSchedule.totalCost !== 'number' || outputs.depreciationSchedule.totalCost <= 0) {
      errors['depreciationSchedule.totalCost'] = 'Total cost must be a positive number';
    }

    if (typeof outputs.depreciationSchedule.depreciableBasis !== 'number' || outputs.depreciationSchedule.depreciableBasis < 0) {
      errors['depreciationSchedule.depreciableBasis'] = 'Depreciable basis must be a non-negative number';
    }

    if (typeof outputs.depreciationSchedule.recoveryPeriod !== 'number' || outputs.depreciationSchedule.recoveryPeriod <= 0) {
      errors['depreciationSchedule.recoveryPeriod'] = 'Recovery period must be a positive number';
    }

    if (!Array.isArray(outputs.depreciationSchedule.years)) {
      errors['depreciationSchedule.years'] = 'Years must be an array';
    } else {
      outputs.depreciationSchedule.years.forEach((year: any, index: number) => {
        if (typeof year.year !== 'number') {
          errors[`depreciationSchedule.years.${index}.year`] = 'Year must be a number';
        }
        if (typeof year.depreciationAmount !== 'number' || year.depreciationAmount < 0) {
          errors[`depreciationSchedule.years.${index}.depreciationAmount`] = 'Depreciation amount must be a non-negative number';
        }
        if (typeof year.endingBasis !== 'number' || year.endingBasis < 0) {
          errors[`depreciationSchedule.years.${index}.endingBasis`] = 'Ending basis must be a non-negative number';
        }
      });
    }
  }

  // Tax impacts validation
  if (outputs.taxImpacts) {
    if (!Array.isArray(outputs.taxImpacts)) {
      errors.taxImpacts = 'Tax impacts must be an array';
    } else {
      outputs.taxImpacts.forEach((impact: any, index: number) => {
        if (typeof impact.year !== 'number') {
          errors[`taxImpacts.${index}.year`] = 'Year must be a number';
        }
        if (typeof impact.depreciationDeduction !== 'number' || impact.depreciationDeduction < 0) {
          errors[`taxImpacts.${index}.depreciationDeduction`] = 'Depreciation deduction must be a non-negative number';
        }
        if (typeof impact.taxSavings !== 'number') {
          errors[`taxImpacts.${index}.taxSavings`] = 'Tax savings must be a number';
        }
      });
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}