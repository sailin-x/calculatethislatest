export function quickValidateAverageOrderValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Average order value is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Average order value must be a valid number' };
  }
  
  if (numValue < 0.01) {
    return { isValid: false, message: 'Average order value must be at least $0.01' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Average order value cannot exceed $100,000' };
  }
  
  return { isValid: true };
}

export function quickValidatePurchaseFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Purchase frequency is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Purchase frequency must be a valid number' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Purchase frequency must be at least 0.1 purchases per year' };
  }
  
  if (numValue > 365) {
    return { isValid: false, message: 'Purchase frequency cannot exceed 365 purchases per year' };
  }
  
  // Cross-validation with business model
  const businessModel = allInputs?.businessModel;
  if (businessModel === 'subscription' && numValue < 12) {
    return { isValid: false, message: 'Subscription businesses typically have monthly or more frequent purchases' };
  }
  
  if (businessModel === 'transactional' && numValue > 100) {
    return { isValid: false, message: 'Transactional businesses typically have lower purchase frequencies' };
  }
  
  return { isValid: true };
}

export function quickValidateCustomerLifespan(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Customer lifespan is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Customer lifespan must be a valid number' };
  }
  
  if (numValue < 0.1) {
    return { isValid: false, message: 'Customer lifespan must be at least 0.1 years' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Customer lifespan cannot exceed 50 years' };
  }
  
  // Cross-validation with business model
  const businessModel = allInputs?.businessModel;
  if (businessModel === 'subscription' && numValue < 1) {
    return { isValid: false, message: 'Subscription businesses typically have customer lifespans of at least 1 year' };
  }
  
  if (businessModel === 'transactional' && numValue > 20) {
    return { isValid: false, message: 'Transactional businesses typically have shorter customer lifespans' };
  }
  
  return { isValid: true };
}

export function quickValidateAcquisitionCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Customer acquisition cost is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Customer acquisition cost must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Customer acquisition cost cannot be negative' };
  }
  
  if (numValue > 100000) {
    return { isValid: false, message: 'Customer acquisition cost cannot exceed $100,000' };
  }
  
  // Cross-validation with average order value
  const averageOrderValue = allInputs?.averageOrderValue;
  if (averageOrderValue) {
    const ratio = numValue / averageOrderValue;
    if (ratio < 0.1) {
      return { isValid: false, message: 'Acquisition cost seems too low relative to order value' };
    }
    if (ratio > 10) {
      return { isValid: false, message: 'Acquisition cost seems too high relative to order value' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateGrossMargin(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Gross margin is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Gross margin must be a valid number' };
  }
  
  if (numValue < 1) {
    return { isValid: false, message: 'Gross margin must be at least 1%' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Gross margin cannot exceed 100%' };
  }
  
  // Cross-validation with industry
  const industry = allInputs?.industry;
  if (industry) {
    const industryMargins = {
      ecommerce: { min: 20, max: 60 },
      saas: { min: 60, max: 90 },
      subscription: { min: 50, max: 80 },
      retail: { min: 15, max: 50 },
      b2b: { min: 30, max: 70 },
      marketplace: { min: 10, max: 40 }
    };
    
    const margin = industryMargins[industry as keyof typeof industryMargins];
    if (margin && (numValue < margin.min || numValue > margin.max)) {
      return { isValid: false, message: `Gross margin for ${industry} typically ranges from ${margin.min}% to ${margin.max}%` };
    }
  }
  
  return { isValid: true };
}

export function quickValidateRetentionRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Retention rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Retention rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Retention rate cannot be negative' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Retention rate cannot exceed 100%' };
  }
  
  // Cross-validation with churn rate
  const churnRate = allInputs?.churnRate;
  if (churnRate !== undefined) {
    const sum = numValue + churnRate;
    if (Math.abs(sum - 100) > 5) {
      return { isValid: false, message: 'Retention rate and churn rate should sum to approximately 100%' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateChurnRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Churn rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Churn rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Churn rate cannot be negative' };
  }
  
  if (numValue > 100) {
    return { isValid: false, message: 'Churn rate cannot exceed 100%' };
  }
  
  // Cross-validation with retention rate
  const retentionRate = allInputs?.retentionRate;
  if (retentionRate !== undefined) {
    const sum = retentionRate + numValue;
    if (Math.abs(sum - 100) > 5) {
      return { isValid: false, message: 'Churn rate and retention rate should sum to approximately 100%' };
    }
  }
  
  return { isValid: true };
}

export function quickValidateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Discount rate is required' };
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Discount rate must be a valid number' };
  }
  
  if (numValue < 0) {
    return { isValid: false, message: 'Discount rate cannot be negative' };
  }
  
  if (numValue > 50) {
    return { isValid: false, message: 'Discount rate cannot exceed 50%' };
  }
  
  // Cross-validation with risk factors
  const marketRisk = allInputs?.marketRisk || 0;
  const competitiveRisk = allInputs?.competitiveRisk || 0;
  const economicRisk = allInputs?.economicRisk || 0;
  
  const totalRisk = marketRisk + competitiveRisk + economicRisk;
  const expectedDiscountRate = Math.max(5, totalRisk * 0.5);
  
  if (numValue < expectedDiscountRate * 0.5) {
    return { isValid: false, message: 'Discount rate seems too low for the business risk level' };
  }
  
  if (numValue > expectedDiscountRate * 2) {
    return { isValid: false, message: 'Discount rate seems too high for the business risk level' };
  }
  
  return { isValid: true };
}

export function quickValidateGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }
  
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: 'Growth rate must be a valid number' };
  }
  
  if (numValue < -50) {
    return { isValid: false, message: 'Growth rate cannot be less than -50%' };
  }
  
  if (numValue > 200) {
    return { isValid: false, message: 'Growth rate cannot exceed 200%' };
  }
  
  // Cross-validation with business model
  const businessModel = allInputs?.businessModel;
  if (businessModel === 'startup' && numValue < 20) {
    return { isValid: false, message: 'Startups typically have higher growth rates' };
  }
  
  if (businessModel === 'mature' && numValue > 50) {
    return { isValid: false, message: 'Mature businesses typically have lower growth rates' };
  }
  
  return { isValid: true };
}
