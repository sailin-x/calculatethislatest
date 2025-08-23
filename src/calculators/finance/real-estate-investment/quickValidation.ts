export function quickValidatePurchasePrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Purchase price is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Purchase price must be a valid number' };
  }
  
  if (numValue < 10000) {
    return { isValid: false, message: 'Purchase price must be at least $10,000' };
  }
  
  if (numValue > 10000000) {
    return { isValid: false, message: 'Purchase price cannot exceed $10,000,000' };
  }
  
  return { isValid: true };
}

export function quickValidateDownPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Down payment is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Down payment must be a valid number' };
  }
  
  if (numValue < 1000) {
    return { isValid: false, message: 'Down payment must be at least $1,000' };
  }
  
  if (numValue > 5000000) {
    return { isValid: false, message: 'Down payment cannot exceed $5,000,000' };
  }
  
  // Cross-validation with purchase price
  const purchasePrice = allInputs?.purchasePrice;
  if (purchasePrice) {
    const downPaymentPercent = (numValue / purchasePrice) * 100;
    if (downPaymentPercent < 3) {
      return { isValid: false, message: 'Down payment should be at least 3% of purchase price' };
    }
    if (downPaymentPercent > 50) {
      return { isValid: false, message: 'Down payment should not exceed 50% of purchase price' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateMonthlyRent(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Monthly rent is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Monthly rent must be a valid number' };
  }
  
  if (numValue < 100) {
    return { isValid: false, message: 'Monthly rent must be at least $100' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Monthly rent cannot exceed $100,000' };
  }
  
  // Cross-validation with property type and location
  const propertyType = allInputs?.propertyType;
  const location = allInputs?.location;
  if (propertyType && location) {
    const rentRanges = {
      'single-family': { min: 800, max: 8000 },
      'multi-family': { min: 600, max: 6000 },
      'condo': { min: 700, max: 7000 },
      'commercial': { min: 1000, max: 15000 },
      'industrial': { min: 2000, max: 20000 }
    };
    
    const range = rentRanges[propertyType as keyof typeof rentRanges];
    if (range) {
      const locationMultiplier = { 'a': 1.5, 'b': 1.2, 'c': 0.9, 'd': 0.7 };
      const multiplier = locationMultiplier[location as keyof typeof locationMultiplier] || 1;
      
      const adjustedMin = range.min * multiplier;
      const adjustedMax = range.max * multiplier;
      
      if (numValue < adjustedMin) {
        return { isValid: false, message: `Rent seems low for ${propertyType} in ${location} location` };
      }
      if (numValue > adjustedMax) {
        return { isValid: false, message: `Rent seems high for ${propertyType} in ${location} location` };
      }
    }
  }
  
  return { isValid: true };
}

export function quickValidateVacancyRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Vacancy rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Vacancy rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Vacancy rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Vacancy rate cannot exceed 50%' };
  }
  
  // Cross-validation with market condition
  const marketCondition = allInputs?.marketCondition;
  const location = allInputs?.location;
  if (marketCondition && location) {
    const expectedRanges = {
      'hot': { min: 0, max: 5 },
      'stable': { min: 2, max: 8 },
      'declining': { min: 5, max: 15 },
      'recovering': { min: 3, max: 10 }
    };
    
    const range = expectedRanges[marketCondition as keyof typeof expectedRanges];
    if (range) {
      const locationAdjustment = { 'a': -2, 'b': 0, 'c': 3, 'd': 5 };
      const adjustment = locationAdjustment[location as keyof typeof locationAdjustment] || 0;
      
      const adjustedMin = Math.max(0, range.min + adjustment);
      const adjustedMax = Math.min(50, range.max + adjustment);
      
      if (numValue < adjustedMin || numValue > adjustedMax) {
        return { isValid: false, message: `Vacancy rate seems unrealistic for ${marketCondition} market in ${location} location` };
      }
    }
  }
  
  return { isValid: true };
}

export function quickValidateAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Appreciation rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Appreciation rate must be a valid number' };
  }
  
  if (numValue < -20) {
    return { isValid: false, message: 'Appreciation rate cannot be less than -20%' };
  }
  
  if (numValue > 30) {
    return { isValid: false, message: 'Appreciation rate cannot exceed 30%' };
  }
  
  // Cross-validation with market condition
  const marketCondition = allInputs?.marketCondition;
  if (marketCondition) {
    const expectedRanges = {
      'hot': { min: 3, max: 15 },
      'stable': { min: 1, max: 5 },
      'declining': { min: -10, max: 0 },
      'recovering': { min: -2, max: 8 }
    };
    
    const range = expectedRanges[marketCondition as keyof typeof expectedRanges];
    if (range && (numValue < range.min || numValue > range.max)) {
      return { isValid: false, message: `Appreciation rate seems unrealistic for ${marketCondition} market` };
    }
  }
  
  return { isValid: true };
}

export function quickValidateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Interest rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Interest rate must be a valid number' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Interest rate must be at least 0.1%' };
  }
  
  if (numValue > 25) {
    return { isValid: false, message: 'Interest rate cannot exceed 25%' };
  }
  
  // Cross-validation with loan type
  const loanType = allInputs?.loanType;
  if (loanType) {
    const typicalRanges = {
      'conventional': { min: 3, max: 8 },
      'fha': { min: 2.5, max: 7 },
      'va': { min: 2, max: 6 },
      'usda': { min: 2.5, max: 7 },
      'hard-money': { min: 8, max: 18 },
      'cash': { min: 0, max: 0 }
    };
    
    const range = typicalRanges[loanType as keyof typeof typicalRanges];
    if (range && loanType !== 'cash') {
      if (numValue < range.min || numValue > range.max) {
        return { isValid: false, message: `Interest rate seems unusual for ${loanType} loan` };
      }
    }
  }
  
  return { isValid: true };
}

export function quickValidatePropertyAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Property age is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Property age must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Property age cannot be negative' };
  }
  
  if (numValue > 200) {
    return { isValid: false, message: 'Property age cannot exceed 200 years' };
  }
  
  // Cross-validation with condition
  const condition = allInputs?.condition;
  if (condition) {
    const conditionRanges = {
      'excellent': { min: 0, max: 50 },
      'good': { min: 0, max: 75 },
      'fair': { min: 10, max: 100 },
      'poor': { min: 20, max: 150 }
    };
    
    const range = conditionRanges[condition as keyof typeof conditionRanges];
    if (range && (numValue < range.min || numValue > range.max)) {
      return { isValid: false, message: `Property age seems inconsistent with ${condition} condition` };
    }
  }
  
  return { isValid: true };
}

export function quickValidateMaintenance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Maintenance costs are required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Maintenance costs must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Maintenance costs cannot be negative' };
  }
  
  if (numValue > 50000) {
    return { isValid: false, message: 'Maintenance costs cannot exceed $50,000' };
  }
  
  // Cross-validation with property condition and age
  const condition = allInputs?.condition;
  const propertyAge = allInputs?.propertyAge;
  const purchasePrice = allInputs?.purchasePrice;
  if (condition && propertyAge && purchasePrice) {
    const annualMaintenancePercent = (numValue / purchasePrice) * 100;
    
    const conditionMultipliers = {
      'excellent': 0.5,
      'good': 1.0,
      'fair': 2.0,
      'poor': 4.0
    };
    
    const ageMultiplier = propertyAge > 50 ? 1.5 : propertyAge > 25 ? 1.2 : 1.0;
    const expectedPercent = 1.5 * (conditionMultipliers[condition as keyof typeof conditionMultipliers] || 1) * ageMultiplier;
    
    if (annualMaintenancePercent > expectedPercent * 2) {
      return { isValid: false, message: `Maintenance costs seem high for ${condition} condition property` };
    }
  }
  
  return { isValid: true };
}
