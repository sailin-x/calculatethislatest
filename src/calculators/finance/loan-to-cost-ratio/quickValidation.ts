import { ValidationResult } from './types';

export function validateProjectName(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Project name is required'],
      warnings: []
    };
  }
  
  if (value.trim().length < 3) {
    return {
      isValid: false,
      errors: ['Project name must be at least 3 characters long'],
      warnings: []
    };
  }
  
  if (value.trim().length > 100) {
    return {
      isValid: false,
      errors: ['Project name must be 100 characters or less'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateProjectType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['residential', 'commercial', 'industrial', 'mixed-use', 'hospitality', 'healthcare', 'educational', 'retail', 'office', 'warehouse'];
  
  if (!value || !validTypes.includes(value)) {
    return {
      isValid: false,
      errors: [`Project type must be one of: ${validTypes.join(', ')}`],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateProjectLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return {
      isValid: false,
      errors: ['Project location is required'],
      warnings: []
    };
  }
  
  if (value.trim().length < 5) {
    return {
      isValid: false,
      errors: ['Project location must be at least 5 characters long'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateTotalProjectCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'number' || value <= 0) {
    return {
      isValid: false,
      errors: ['Total project cost must be a positive number'],
      warnings: []
    };
  }
  
  if (value < 10000) {
    return {
      isValid: false,
      errors: ['Total project cost must be at least $10,000'],
      warnings: []
    };
  }
  
  if (value > 1000000000) {
    return {
      isValid: false,
      errors: ['Total project cost cannot exceed $1,000,000,000'],
      warnings: []
    };
  }
  
  // Check if total matches sum of components
  if (allInputs) {
    const landCost = allInputs.landCost || 0;
    const constructionCost = allInputs.constructionCost || 0;
    const softCosts = allInputs.softCosts || 0;
    const contingency = allInputs.contingency || 0;
    const developerProfit = allInputs.developerProfit || 0;
    
    const calculatedTotal = landCost + constructionCost + softCosts + contingency + developerProfit;
    
    if (Math.abs(calculatedTotal - value) > 1) {
      return {
        isValid: true,
        errors: [],
        warnings: [`Total project cost (${value.toLocaleString()}) doesn't match sum of components (${calculatedTotal.toLocaleString()})`]
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      errors: ['Land cost is required'],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Land cost must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Land cost cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 500000000) {
    return {
      isValid: false,
      errors: ['Land cost cannot exceed $500,000,000'],
      warnings: []
    };
  }
  
  // Check if land cost is reasonable relative to total project cost
  if (allInputs && allInputs.totalProjectCost) {
    const landCostPercentage = (value / allInputs.totalProjectCost) * 100;
    if (landCostPercentage > 70) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Land cost represents more than 70% of total project cost, which may indicate overvaluation']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: false,
      errors: ['Construction cost is required'],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Construction cost must be a number'],
      warnings: []
    };
  }
  
  if (value <= 0) {
    return {
      isValid: false,
      errors: ['Construction cost must be greater than 0'],
      warnings: []
    };
  }
  
  if (value > 500000000) {
    return {
      isValid: false,
      errors: ['Construction cost cannot exceed $500,000,000'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Soft costs must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Soft costs cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      errors: ['Soft costs cannot exceed $100,000,000'],
      warnings: []
    };
  }
  
  // Check if soft costs are reasonable relative to total project cost
  if (allInputs && allInputs.totalProjectCost) {
    const softCostsPercentage = (value / allInputs.totalProjectCost) * 100;
    if (softCostsPercentage > 30) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Soft costs represent more than 30% of total project cost, which may be unusually high']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateContingency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Contingency must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Contingency cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      errors: ['Contingency cannot exceed $100,000,000'],
      warnings: []
    };
  }
  
  // Check if contingency is reasonable relative to total project cost
  if (allInputs && allInputs.totalProjectCost) {
    const contingencyPercentage = (value / allInputs.totalProjectCost) * 100;
    if (contingencyPercentage < 5) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Contingency is less than 5% of total project cost, which may be insufficient']
      };
    }
    if (contingencyPercentage > 25) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Contingency is more than 25% of total project cost, which may indicate high uncertainty']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateDeveloperProfit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Developer profit must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Developer profit cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      errors: ['Developer profit cannot exceed $100,000,000'],
      warnings: []
    };
  }
  
  // Check if developer profit is reasonable relative to total project cost
  if (allInputs && allInputs.totalProjectCost) {
    const profitPercentage = (value / allInputs.totalProjectCost) * 100;
    if (profitPercentage > 20) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Developer profit represents more than 20% of total project cost, which may be unusually high']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateRequestedLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'number' || value <= 0) {
    return {
      isValid: false,
      errors: ['Requested loan amount must be a positive number'],
      warnings: []
    };
  }
  
  if (value < 10000) {
    return {
      isValid: false,
      errors: ['Requested loan amount must be at least $10,000'],
      warnings: []
    };
  }
  
  if (value > 1000000000) {
    return {
      isValid: false,
      errors: ['Requested loan amount cannot exceed $1,000,000,000'],
      warnings: []
    };
  }
  
  // Check if loan amount exceeds total project cost
  if (allInputs && allInputs.totalProjectCost) {
    if (value > allInputs.totalProjectCost) {
      return {
        isValid: false,
        errors: ['Requested loan amount cannot exceed total project cost'],
        warnings: []
      };
    }
    
    // Check LTC ratio
    const ltcRatio = (value / allInputs.totalProjectCost) * 100;
    if (ltcRatio > 95) {
      return {
        isValid: false,
        errors: ['LTC ratio cannot exceed 95%'],
        warnings: []
      };
    }
    
    if (ltcRatio > 85) {
      return {
        isValid: true,
        errors: [],
        warnings: ['LTC ratio is very high (>85%), which may limit lender options']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Interest rate is required'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Interest rate cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 25) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Interest rate seems unusually high (>25%)']
    };
  }
  
  if (value < 1) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Interest rate seems unusually low (<1%)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'number' || value <= 0) {
    return {
      isValid: false,
      errors: ['Loan term must be a positive number'],
      warnings: []
    };
  }
  
  if (value < 1) {
    return {
      isValid: false,
      errors: ['Loan term must be at least 1 month'],
      warnings: []
    };
  }
  
  if (value > 360) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Loan term seems unusually long (>30 years)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateInterestOnlyPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Interest-only period must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Interest-only period cannot be negative'],
      warnings: []
    };
  }
  
  // Check if interest-only period exceeds loan term
  if (allInputs && allInputs.loanTerm) {
    if (value > allInputs.loanTerm) {
      return {
        isValid: false,
        errors: ['Interest-only period cannot exceed loan term'],
        warnings: []
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateOriginationFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Origination fee must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Origination fee cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 1000000) {
    return {
      isValid: false,
      errors: ['Origination fee cannot exceed $1,000,000'],
      warnings: []
    };
  }
  
  // Check if origination fee is reasonable relative to loan amount
  if (allInputs && allInputs.requestedLoanAmount) {
    const feePercentage = (value / allInputs.requestedLoanAmount) * 100;
    if (feePercentage > 5) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Origination fee represents more than 5% of loan amount, which may be unusually high']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateOtherFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Other fees must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Other fees cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 1000000) {
    return {
      isValid: false,
      errors: ['Other fees cannot exceed $1,000,000'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateConstructionDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || typeof value !== 'number' || value <= 0) {
    return {
      isValid: false,
      errors: ['Construction duration must be a positive number'],
      warnings: []
    };
  }
  
  if (value < 1) {
    return {
      isValid: false,
      errors: ['Construction duration must be at least 1 month'],
      warnings: []
    };
  }
  
  if (value > 60) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Construction duration seems unusually long (>5 years)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateStabilizationPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Stabilization period must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Stabilization period cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 36) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Stabilization period seems unusually long (>3 years)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateProjectedRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Projected rental income must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Projected rental income cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      errors: ['Projected rental income cannot exceed $100,000,000'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateProjectedOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Projected operating expenses must be a number'],
      warnings: []
    };
  }
  
  if (value < 0) {
    return {
      isValid: false,
      errors: ['Projected operating expenses cannot be negative'],
      warnings: []
    };
  }
  
  if (value > 100000000) {
    return {
      isValid: false,
      errors: ['Projected operating expenses cannot exceed $100,000,000'],
      warnings: []
    };
  }
  
  // Check if operating expenses exceed rental income
  if (allInputs && allInputs.projectedRentalIncome) {
    if (value > allInputs.projectedRentalIncome) {
      return {
        isValid: true,
        errors: [],
        warnings: ['Projected operating expenses exceed projected rental income']
      };
    }
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateProjectedPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Projected property value must be a number'],
      warnings: []
    };
  }
  
  if (value <= 0) {
    return {
      isValid: false,
      errors: ['Projected property value must be greater than 0'],
      warnings: []
    };
  }
  
  if (value > 1000000000) {
    return {
      isValid: false,
      errors: ['Projected property value cannot exceed $1,000,000,000'],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Market growth rate must be a number'],
      warnings: []
    };
  }
  
  if (value < -20) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Market growth rate seems unusually low (<-20%)']
    };
  }
  
  if (value > 30) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Market growth rate seems unusually high (>30%)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return {
      isValid: true,
      errors: [],
      warnings: []
    };
  }
  
  if (typeof value !== 'number') {
    return {
      isValid: false,
      errors: ['Cap rate must be a number'],
      warnings: []
    };
  }
  
  if (value <= 0) {
    return {
      isValid: false,
      errors: ['Cap rate must be greater than 0'],
      warnings: []
    };
  }
  
  if (value > 20) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Cap rate seems unusually high (>20%)']
    };
  }
  
  if (value < 2) {
    return {
      isValid: true,
      errors: [],
      warnings: ['Cap rate seems unusually low (<2%)']
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}

export function validateRiskFactor(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validRiskLevels = ['low', 'medium', 'high'];
  
  if (!value || !validRiskLevels.includes(value)) {
    return {
      isValid: false,
      errors: [`Risk factor must be one of: ${validRiskLevels.join(', ')}`],
      warnings: []
    };
  }
  
  return {
    isValid: true,
    errors: [],
    warnings: []
  };
}
