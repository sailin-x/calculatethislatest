import { ValidationRule } from '../../../types/validation';
import { ValidationRuleFactory } from '../../../utils/validation';
import { RealEstateInvestmentInputs } from './types';

export const realEstateInvestmentValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('propertyType', 'Property type is required'),
  ValidationRuleFactory.required('purchasePrice', 'Purchase price is required'),
  ValidationRuleFactory.required('downPayment', 'Down payment is required'),
  ValidationRuleFactory.required('closingCosts', 'Closing costs are required'),
  ValidationRuleFactory.required('loanType', 'Loan type is required'),
  ValidationRuleFactory.required('interestRate', 'Interest rate is required'),
  ValidationRuleFactory.required('loanTerm', 'Loan term is required'),
  ValidationRuleFactory.required('monthlyRent', 'Monthly rent is required'),
  ValidationRuleFactory.required('vacancyRate', 'Vacancy rate is required'),
  ValidationRuleFactory.required('propertyTax', 'Property tax is required'),
  ValidationRuleFactory.required('insurance', 'Insurance is required'),
  ValidationRuleFactory.required('maintenance', 'Maintenance costs are required'),
  ValidationRuleFactory.required('appreciationRate', 'Appreciation rate is required'),
  ValidationRuleFactory.required('rentGrowthRate', 'Rent growth rate is required'),
  ValidationRuleFactory.required('expenseGrowthRate', 'Expense growth rate is required'),
  ValidationRuleFactory.required('holdingPeriod', 'Holding period is required'),
  ValidationRuleFactory.required('sellingCosts', 'Selling costs are required'),
  ValidationRuleFactory.required('location', 'Location grade is required'),
  ValidationRuleFactory.required('marketCondition', 'Market condition is required'),
  ValidationRuleFactory.required('propertyAge', 'Property age is required'),
  ValidationRuleFactory.required('condition', 'Property condition is required'),
  ValidationRuleFactory.required('zoning', 'Zoning is required'),

  // Numeric validations
  ValidationRuleFactory.range('purchasePrice', 10000, 10000000, 'Purchase price must be between $10,000 and $10,000,000'),
  ValidationRuleFactory.range('downPayment', 1000, 5000000, 'Down payment must be between $1,000 and $5,000,000'),
  ValidationRuleFactory.range('closingCosts', 0, 500000, 'Closing costs must be between $0 and $500,000'),
  ValidationRuleFactory.range('renovationCosts', 0, 2000000, 'Renovation costs must be between $0 and $2,000,000'),
  ValidationRuleFactory.range('interestRate', 0.1, 25, 'Interest rate must be between 0.1% and 25%'),
  ValidationRuleFactory.range('loanTerm', 1, 50, 'Loan term must be between 1 and 50 years'),
  ValidationRuleFactory.range('points', 0, 10, 'Points must be between 0 and 10'),
  ValidationRuleFactory.range('monthlyRent', 100, 100000, 'Monthly rent must be between $100 and $100,000'),
  ValidationRuleFactory.range('otherIncome', 0, 50000, 'Other income must be between $0 and $50,000'),
  ValidationRuleFactory.range('vacancyRate', 0, 50, 'Vacancy rate must be between 0% and 50%'),
  ValidationRuleFactory.range('propertyTax', 0, 100000, 'Property tax must be between $0 and $100,000'),
  ValidationRuleFactory.range('insurance', 0, 50000, 'Insurance must be between $0 and $50,000'),
  ValidationRuleFactory.range('hoaFees', 0, 10000, 'HOA fees must be between $0 and $10,000'),
  ValidationRuleFactory.range('propertyManagement', 0, 20000, 'Property management must be between $0 and $20,000'),
  ValidationRuleFactory.range('maintenance', 0, 50000, 'Maintenance must be between $0 and $50,000'),
  ValidationRuleFactory.range('utilities', 0, 10000, 'Utilities must be between $0 and $10,000'),
  ValidationRuleFactory.range('landscaping', 0, 5000, 'Landscaping must be between $0 and $5,000'),
  ValidationRuleFactory.range('pestControl', 0, 3000, 'Pest control must be between $0 and $3,000'),
  ValidationRuleFactory.range('appreciationRate', -20, 30, 'Appreciation rate must be between -20% and 30%'),
  ValidationRuleFactory.range('rentGrowthRate', -10, 20, 'Rent growth rate must be between -10% and 20%'),
  ValidationRuleFactory.range('expenseGrowthRate', -5, 15, 'Expense growth rate must be between -5% and 15%'),
  ValidationRuleFactory.range('holdingPeriod', 1, 30, 'Holding period must be between 1 and 30 years'),
  ValidationRuleFactory.range('sellingCosts', 0, 200000, 'Selling costs must be between $0 and $200,000'),
  ValidationRuleFactory.range('propertyAge', 0, 200, 'Property age must be between 0 and 200 years'),
  ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),

  // Cross-field validations
  ValidationRuleFactory.createRule('downPayment', 'Down payment should be reasonable for purchase price', (value: any, allInputs?: Record<string, any>) => {
    const purchasePrice = allInputs?.purchasePrice;
    if (!purchasePrice || !value) return true;
    
    const downPaymentPercent = (value / purchasePrice) * 100;
    return downPaymentPercent >= 3 && downPaymentPercent <= 50;
  }),

  ValidationRuleFactory.createRule('closingCosts', 'Closing costs should be reasonable for purchase price', (value: any, allInputs?: Record<string, any>) => {
    const purchasePrice = allInputs?.purchasePrice;
    if (!purchasePrice || !value) return true;
    
    const closingCostPercent = (value / purchasePrice) * 100;
    return closingCostPercent >= 0.5 && closingCostPercent <= 8;
  }),

  ValidationRuleFactory.createRule('monthlyRent', 'Monthly rent should be realistic for property type and location', (value: any, allInputs?: Record<string, any>) => {
    const propertyType = allInputs?.propertyType;
    const location = allInputs?.location;
    if (!propertyType || !location || !value) return true;
    
    const rentRanges = {
      'single-family': { min: 800, max: 8000 },
      'multi-family': { min: 600, max: 6000 },
      'condo': { min: 700, max: 7000 },
      'commercial': { min: 1000, max: 15000 },
      'industrial': { min: 2000, max: 20000 }
    };
    
    const range = rentRanges[propertyType as keyof typeof rentRanges];
    if (!range) return true;
    
    // Adjust for location grade
    const locationMultiplier = { 'a': 1.5, 'b': 1.2, 'c': 0.9, 'd': 0.7 };
    const multiplier = locationMultiplier[location as keyof typeof locationMultiplier] || 1;
    
    const adjustedMin = range.min * multiplier;
    const adjustedMax = range.max * multiplier;
    
    return value >= adjustedMin && value <= adjustedMax;
  }),

  ValidationRuleFactory.createRule('vacancyRate', 'Vacancy rate should align with market condition and location', (value: any, allInputs?: Record<string, any>) => {
    const marketCondition = allInputs?.marketCondition;
    const location = allInputs?.location;
    if (!marketCondition || !location || !value) return true;
    
    const expectedRanges = {
      'hot': { min: 0, max: 5 },
      'stable': { min: 2, max: 8 },
      'declining': { min: 5, max: 15 },
      'recovering': { min: 3, max: 10 }
    };
    
    const range = expectedRanges[marketCondition as keyof typeof expectedRanges];
    if (!range) return true;
    
    // Adjust for location grade
    const locationAdjustment = { 'a': -2, 'b': 0, 'c': 3, 'd': 5 };
    const adjustment = locationAdjustment[location as keyof typeof locationAdjustment] || 0;
    
    const adjustedMin = Math.max(0, range.min + adjustment);
    const adjustedMax = Math.min(50, range.max + adjustment);
    
    return value >= adjustedMin && value <= adjustedMax;
  }),

  ValidationRuleFactory.createRule('appreciationRate', 'Appreciation rate should align with market condition', (value: any, allInputs?: Record<string, any>) => {
    const marketCondition = allInputs?.marketCondition;
    if (!marketCondition || !value) return true;
    
    const expectedRanges = {
      'hot': { min: 3, max: 15 },
      'stable': { min: 1, max: 5 },
      'declining': { min: -10, max: 0 },
      'recovering': { min: -2, max: 8 }
    };
    
    const range = expectedRanges[marketCondition as keyof typeof expectedRanges];
    if (!range) return true;
    
    return value >= range.min && value <= range.max;
  }),

  ValidationRuleFactory.createRule('propertyAge', 'Property age should be realistic for condition', (value: any, allInputs?: Record<string, any>) => {
    const condition = allInputs?.condition;
    if (!condition || !value) return true;
    
    const conditionRanges = {
      'excellent': { min: 0, max: 50 },
      'good': { min: 0, max: 75 },
      'fair': { min: 10, max: 100 },
      'poor': { min: 20, max: 150 }
    };
    
    const range = conditionRanges[condition as keyof typeof conditionRanges];
    if (!range) return true;
    
    return value >= range.min && value <= range.max;
  }),

  ValidationRuleFactory.createRule('maintenance', 'Maintenance costs should align with property condition and age', (value: any, allInputs?: Record<string, any>) => {
    const condition = allInputs?.condition;
    const propertyAge = allInputs?.propertyAge;
    const purchasePrice = allInputs?.purchasePrice;
    if (!condition || !propertyAge || !purchasePrice || !value) return true;
    
    const annualMaintenancePercent = (value / purchasePrice) * 100;
    
    const conditionMultipliers = {
      'excellent': 0.5,
      'good': 1.0,
      'fair': 2.0,
      'poor': 4.0
    };
    
    const ageMultiplier = propertyAge > 50 ? 1.5 : propertyAge > 25 ? 1.2 : 1.0;
    const expectedPercent = 1.5 * (conditionMultipliers[condition as keyof typeof conditionMultipliers] || 1) * ageMultiplier;
    
    return annualMaintenancePercent >= 0.5 && annualMaintenancePercent <= expectedPercent * 2;
  }),

  ValidationRuleFactory.createRule('sellingCosts', 'Selling costs should be reasonable for purchase price', (value: any, allInputs?: Record<string, any>) => {
    const purchasePrice = allInputs?.purchasePrice;
    if (!purchasePrice || !value) return true;
    
    const sellingCostPercent = (value / purchasePrice) * 100;
    return sellingCostPercent >= 1 && sellingCostPercent <= 12;
  })
];

export function validateRealEstateInvestmentInputs(inputs: RealEstateInvestmentInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.propertyType) errors.push('Property type is required');
  if (!inputs.purchasePrice) errors.push('Purchase price is required');
  if (!inputs.downPayment) errors.push('Down payment is required');
  if (!inputs.closingCosts) errors.push('Closing costs are required');
  if (!inputs.loanType) errors.push('Loan type is required');
  if (!inputs.interestRate) errors.push('Interest rate is required');
  if (!inputs.loanTerm) errors.push('Loan term is required');
  if (!inputs.monthlyRent) errors.push('Monthly rent is required');
  if (!inputs.vacancyRate) errors.push('Vacancy rate is required');
  if (!inputs.propertyTax) errors.push('Property tax is required');
  if (!inputs.insurance) errors.push('Insurance is required');
  if (!inputs.maintenance) errors.push('Maintenance costs are required');
  if (!inputs.appreciationRate) errors.push('Appreciation rate is required');
  if (!inputs.rentGrowthRate) errors.push('Rent growth rate is required');
  if (!inputs.expenseGrowthRate) errors.push('Expense growth rate is required');
  if (!inputs.holdingPeriod) errors.push('Holding period is required');
  if (!inputs.sellingCosts) errors.push('Selling costs are required');
  if (!inputs.location) errors.push('Location grade is required');
  if (!inputs.marketCondition) errors.push('Market condition is required');
  if (!inputs.propertyAge) errors.push('Property age is required');
  if (!inputs.condition) errors.push('Property condition is required');
  if (!inputs.zoning) errors.push('Zoning is required');
  
  // Numeric validations
  if (inputs.purchasePrice < 10000 || inputs.purchasePrice > 10000000) {
    errors.push('Purchase price must be between $10,000 and $10,000,000');
  }
  
  if (inputs.downPayment < 1000 || inputs.downPayment > 5000000) {
    errors.push('Down payment must be between $1,000 and $5,000,000');
  }
  
  if (inputs.closingCosts < 0 || inputs.closingCosts > 500000) {
    errors.push('Closing costs must be between $0 and $500,000');
  }
  
  if (inputs.renovationCosts !== undefined) {
    if (inputs.renovationCosts < 0 || inputs.renovationCosts > 2000000) {
      errors.push('Renovation costs must be between $0 and $2,000,000');
    }
  }
  
  if (inputs.interestRate < 0.1 || inputs.interestRate > 25) {
    errors.push('Interest rate must be between 0.1% and 25%');
  }
  
  if (inputs.loanTerm < 1 || inputs.loanTerm > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }
  
  if (inputs.points !== undefined) {
    if (inputs.points < 0 || inputs.points > 10) {
      errors.push('Points must be between 0 and 10');
    }
  }
  
  if (inputs.monthlyRent < 100 || inputs.monthlyRent > 100000) {
    errors.push('Monthly rent must be between $100 and $100,000');
  }
  
  if (inputs.otherIncome !== undefined) {
    if (inputs.otherIncome < 0 || inputs.otherIncome > 50000) {
      errors.push('Other income must be between $0 and $50,000');
    }
  }
  
  if (inputs.vacancyRate < 0 || inputs.vacancyRate > 50) {
    errors.push('Vacancy rate must be between 0% and 50%');
  }
  
  if (inputs.propertyTax < 0 || inputs.propertyTax > 100000) {
    errors.push('Property tax must be between $0 and $100,000');
  }
  
  if (inputs.insurance < 0 || inputs.insurance > 50000) {
    errors.push('Insurance must be between $0 and $50,000');
  }
  
  if (inputs.hoaFees !== undefined) {
    if (inputs.hoaFees < 0 || inputs.hoaFees > 10000) {
      errors.push('HOA fees must be between $0 and $10,000');
    }
  }
  
  if (inputs.propertyManagement !== undefined) {
    if (inputs.propertyManagement < 0 || inputs.propertyManagement > 20000) {
      errors.push('Property management must be between $0 and $20,000');
    }
  }
  
  if (inputs.maintenance < 0 || inputs.maintenance > 50000) {
    errors.push('Maintenance must be between $0 and $50,000');
  }
  
  if (inputs.utilities !== undefined) {
    if (inputs.utilities < 0 || inputs.utilities > 10000) {
      errors.push('Utilities must be between $0 and $10,000');
    }
  }
  
  if (inputs.landscaping !== undefined) {
    if (inputs.landscaping < 0 || inputs.landscaping > 5000) {
      errors.push('Landscaping must be between $0 and $5,000');
    }
  }
  
  if (inputs.pestControl !== undefined) {
    if (inputs.pestControl < 0 || inputs.pestControl > 3000) {
      errors.push('Pest control must be between $0 and $3,000');
    }
  }
  
  if (inputs.appreciationRate < -20 || inputs.appreciationRate > 30) {
    errors.push('Appreciation rate must be between -20% and 30%');
  }
  
  if (inputs.rentGrowthRate < -10 || inputs.rentGrowthRate > 20) {
    errors.push('Rent growth rate must be between -10% and 20%');
  }
  
  if (inputs.expenseGrowthRate < -5 || inputs.expenseGrowthRate > 15) {
    errors.push('Expense growth rate must be between -5% and 15%');
  }
  
  if (inputs.holdingPeriod < 1 || inputs.holdingPeriod > 30) {
    errors.push('Holding period must be between 1 and 30 years');
  }
  
  if (inputs.sellingCosts < 0 || inputs.sellingCosts > 200000) {
    errors.push('Selling costs must be between $0 and $200,000');
  }
  
  if (inputs.propertyAge < 0 || inputs.propertyAge > 200) {
    errors.push('Property age must be between 0 and 200 years');
  }
  
  if (inputs.taxRate !== undefined) {
    if (inputs.taxRate < 0 || inputs.taxRate > 50) {
      errors.push('Tax rate must be between 0% and 50%');
    }
  }
  
  // Cross-field validations
  const downPaymentPercent = (inputs.downPayment / inputs.purchasePrice) * 100;
  if (downPaymentPercent < 3 || downPaymentPercent > 50) {
    errors.push('Down payment should be between 3% and 50% of purchase price');
  }
  
  const closingCostPercent = (inputs.closingCosts / inputs.purchasePrice) * 100;
  if (closingCostPercent < 0.5 || closingCostPercent > 8) {
    errors.push('Closing costs should be between 0.5% and 8% of purchase price');
  }
  
  const sellingCostPercent = (inputs.sellingCosts / inputs.purchasePrice) * 100;
  if (sellingCostPercent < 1 || sellingCostPercent > 12) {
    errors.push('Selling costs should be between 1% and 12% of purchase price');
  }
  
  // Market condition validation
  const marketConditionRanges = {
    'hot': { appreciation: { min: 3, max: 15 }, vacancy: { min: 0, max: 5 } },
    'stable': { appreciation: { min: 1, max: 5 }, vacancy: { min: 2, max: 8 } },
    'declining': { appreciation: { min: -10, max: 0 }, vacancy: { min: 5, max: 15 } },
    'recovering': { appreciation: { min: -2, max: 8 }, vacancy: { min: 3, max: 10 } }
  };
  
  const marketRange = marketConditionRanges[inputs.marketCondition as keyof typeof marketConditionRanges];
  if (marketRange) {
    if (inputs.appreciationRate < marketRange.appreciation.min || inputs.appreciationRate > marketRange.appreciation.max) {
      errors.push(`Appreciation rate for ${inputs.marketCondition} market should be between ${marketRange.appreciation.min}% and ${marketRange.appreciation.max}%`);
    }
    
    if (inputs.vacancyRate < marketRange.vacancy.min || inputs.vacancyRate > marketRange.vacancy.max) {
      errors.push(`Vacancy rate for ${inputs.marketCondition} market should be between ${marketRange.vacancy.min}% and ${marketRange.vacancy.max}%`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
