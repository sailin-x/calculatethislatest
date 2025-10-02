import { ValidationRule } from '../../types/validation';
import { ValidationRuleFactory } from '../../utils/validation';
import { CustomerLifetimeValueInputs } from './types';

export const customerLifetimeValueValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('averageOrderValue', 'Average order value is required'),
  ValidationRuleFactory.required('purchaseFrequency', 'Purchase frequency is required'),
  ValidationRuleFactory.required('customerLifespan', 'Customer lifespan is required'),
  ValidationRuleFactory.required('acquisitionCost', 'Customer acquisition cost is required'),
  ValidationRuleFactory.required('grossMargin', 'Gross margin is required'),
  ValidationRuleFactory.required('retentionRate', 'Retention rate is required'),
  ValidationRuleFactory.required('churnRate', 'Churn rate is required'),
  ValidationRuleFactory.required('discountRate', 'Discount rate is required'),

  // Numeric validations
  ValidationRuleFactory.range('averageOrderValue', 0.01, 100000, 'Average order value must be between $0.01 and $100,000'),
  ValidationRuleFactory.range('purchaseFrequency', 0.1, 365, 'Purchase frequency must be between 0.1 and 365 purchases per year'),
  ValidationRuleFactory.range('customerLifespan', 0.1, 50, 'Customer lifespan must be between 0.1 and 50 years'),
  ValidationRuleFactory.range('acquisitionCost', 0, 100000, 'Acquisition cost must be between $0 and $100,000'),
  ValidationRuleFactory.range('grossMargin', 1, 100, 'Gross margin must be between 1% and 100%'),
  ValidationRuleFactory.range('retentionRate', 0, 100, 'Retention rate must be between 0% and 100%'),
  ValidationRuleFactory.range('churnRate', 0, 100, 'Churn rate must be between 0% and 100%'),
  ValidationRuleFactory.range('discountRate', 0, 50, 'Discount rate must be between 0% and 50%'),

  // Optional fields with ranges
  ValidationRuleFactory.range('referralValue', 0, 10000, 'Referral value must be between $0 and $10,000'),
  ValidationRuleFactory.range('crossSellValue', 0, 10000, 'Cross-sell value must be between $0 and $10,000'),
  ValidationRuleFactory.range('upSellValue', 0, 10000, 'Up-sell value must be between $0 and $10,000'),
  ValidationRuleFactory.range('supportCost', 0, 10000, 'Support cost must be between $0 and $10,000'),
  ValidationRuleFactory.range('marketingCost', 0, 10000, 'Marketing cost must be between $0 and $10,000'),
  ValidationRuleFactory.range('seasonalityFactor', 0.1, 10, 'Seasonality factor must be between 0.1 and 10'),
  ValidationRuleFactory.range('growthRate', -50, 200, 'Growth rate must be between -50% and 200%'),
  ValidationRuleFactory.range('inflationRate', -20, 50, 'Inflation rate must be between -20% and 50%'),
  ValidationRuleFactory.range('analysisPeriod', 1, 120, 'Analysis period must be between 1 and 120 months'),
  ValidationRuleFactory.range('projectionMonths', 1, 120, 'Projection months must be between 1 and 120'),
  ValidationRuleFactory.range('marketRisk', 0, 100, 'Market risk must be between 0% and 100%'),
  ValidationRuleFactory.range('competitiveRisk', 0, 100, 'Competitive risk must be between 0% and 100%'),
  ValidationRuleFactory.range('economicRisk', 0, 100, 'Economic risk must be between 0% and 100%'),

  // Cross-field validations
  ValidationRuleFactory.createRule('retentionRate', 'Retention rate and churn rate should be complementary', (value: any, allInputs?: Record<string, any>) => {
    const churnRate = allInputs?.churnRate;
    if (!churnRate || !value) return true;
    
    const sum = value + churnRate;
    return Math.abs(sum - 100) <= 5; // Allow 5% tolerance
  }),

  ValidationRuleFactory.createRule('customerLifespan', 'Customer lifespan should align with business model', (value: any, allInputs?: Record<string, any>) => {
    const businessModel = allInputs?.businessModel;
    if (!businessModel || !value) return true;
    
    if (businessModel === 'subscription' && value < 1) return false;
    if (businessModel === 'transactional' && value > 20) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('purchaseFrequency', 'Purchase frequency should align with business model', (value: any, allInputs?: Record<string, any>) => {
    const businessModel = allInputs?.businessModel;
    if (!businessModel || !value) return true;
    
    if (businessModel === 'subscription' && value < 12) return false;
    if (businessModel === 'transactional' && value > 100) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('grossMargin', 'Gross margin should be reasonable for the industry', (value: any, allInputs?: Record<string, any>) => {
    const industry = allInputs?.industry;
    if (!industry || !value) return true;
    
    const industryMargins = {
      ecommerce: { min: 20, max: 60 },
      saas: { min: 60, max: 90 },
      subscription: { min: 50, max: 80 },
      retail: { min: 15, max: 50 },
      b2b: { min: 30, max: 70 },
      marketplace: { min: 10, max: 40 }
    };
    
    const margin = industryMargins[industry as keyof typeof industryMargins];
    if (margin && (value < margin.min || value > margin.max)) return false;
    
    return true;
  }),

  ValidationRuleFactory.createRule('acquisitionCost', 'Acquisition cost should be reasonable relative to order value', (value: any, allInputs?: Record<string, any>) => {
    const averageOrderValue = allInputs?.averageOrderValue;
    if (!averageOrderValue || !value) return true;
    
    const ratio = value / averageOrderValue;
    return ratio >= 0.1 && ratio <= 10;
  }),

  ValidationRuleFactory.createRule('discountRate', 'Discount rate should align with business risk', (value: any, allInputs?: Record<string, any>) => {
    const marketRisk = allInputs?.marketRisk;
    const competitiveRisk = allInputs?.competitiveRisk;
    const economicRisk = allInputs?.economicRisk;
    
    if (!value) return true;
    
    const totalRisk = (marketRisk || 0) + (competitiveRisk || 0) + (economicRisk || 0);
    const expectedDiscountRate = Math.max(5, totalRisk * 0.5);
    
    return value >= expectedDiscountRate * 0.5 && value <= expectedDiscountRate * 2;
  }),

  ValidationRuleFactory.createRule('growthRate', 'Growth rate should be realistic for the business stage', (value: any, allInputs?: Record<string, any>) => {
    const businessModel = allInputs?.businessModel;
    if (!businessModel || !value) return true;
    
    if (businessModel === 'startup' && value < 20) return false;
    if (businessModel === 'mature' && value > 50) return false;
    
    return true;
  })
];

export function validateCustomerLifetimeValueInputs(inputs: CustomerLifetimeValueInputs, allInputs?: Record<string, any>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validations
  if (!inputs.averageOrderValue) errors.push('Average order value is required');
  if (!inputs.purchaseFrequency) errors.push('Purchase frequency is required');
  if (!inputs.customerLifespan) errors.push('Customer lifespan is required');
  if (!inputs.acquisitionCost) errors.push('Customer acquisition cost is required');
  if (!inputs.grossMargin) errors.push('Gross margin is required');
  if (!inputs.retentionRate) errors.push('Retention rate is required');
  if (!inputs.churnRate) errors.push('Churn rate is required');
  if (!inputs.discountRate) errors.push('Discount rate is required');
  
  // Numeric validations
  if (inputs.averageOrderValue < 0.01 || inputs.averageOrderValue > 100000) {
    errors.push('Average order value must be between $0.01 and $100,000');
  }
  
  if (inputs.purchaseFrequency < 0.1 || inputs.purchaseFrequency > 365) {
    errors.push('Purchase frequency must be between 0.1 and 365 purchases per year');
  }
  
  if (inputs.customerLifespan < 0.1 || inputs.customerLifespan > 50) {
    errors.push('Customer lifespan must be between 0.1 and 50 years');
  }
  
  if (inputs.acquisitionCost < 0 || inputs.acquisitionCost > 100000) {
    errors.push('Acquisition cost must be between $0 and $100,000');
  }
  
  if (inputs.grossMargin < 1 || inputs.grossMargin > 100) {
    errors.push('Gross margin must be between 1% and 100%');
  }
  
  if (inputs.retentionRate < 0 || inputs.retentionRate > 100) {
    errors.push('Retention rate must be between 0% and 100%');
  }
  
  if (inputs.churnRate < 0 || inputs.churnRate > 100) {
    errors.push('Churn rate must be between 0% and 100%');
  }
  
  if (inputs.discountRate < 0 || inputs.discountRate > 50) {
    errors.push('Discount rate must be between 0% and 50%');
  }
  
  // Optional field validations
  if (inputs.referralValue !== undefined) {
    if (inputs.referralValue < 0 || inputs.referralValue > 10000) {
      errors.push('Referral value must be between $0 and $10,000');
    }
  }
  
  if (inputs.crossSellValue !== undefined) {
    if (inputs.crossSellValue < 0 || inputs.crossSellValue > 10000) {
      errors.push('Cross-sell value must be between $0 and $10,000');
    }
  }
  
  if (inputs.upSellValue !== undefined) {
    if (inputs.upSellValue < 0 || inputs.upSellValue > 10000) {
      errors.push('Up-sell value must be between $0 and $10,000');
    }
  }
  
  if (inputs.supportCost !== undefined) {
    if (inputs.supportCost < 0 || inputs.supportCost > 10000) {
      errors.push('Support cost must be between $0 and $10,000');
    }
  }
  
  if (inputs.marketingCost !== undefined) {
    if (inputs.marketingCost < 0 || inputs.marketingCost > 10000) {
      errors.push('Marketing cost must be between $0 and $10,000');
    }
  }
  
  if (inputs.seasonalityFactor !== undefined) {
    if (inputs.seasonalityFactor < 0.1 || inputs.seasonalityFactor > 10) {
      errors.push('Seasonality factor must be between 0.1 and 10');
    }
  }
  
  if (inputs.growthRate !== undefined) {
    if (inputs.growthRate < -50 || inputs.growthRate > 200) {
      errors.push('Growth rate must be between -50% and 200%');
    }
  }
  
  if (inputs.inflationRate !== undefined) {
    if (inputs.inflationRate < -20 || inputs.inflationRate > 50) {
      errors.push('Inflation rate must be between -20% and 50%');
    }
  }
  
  if (inputs.analysisPeriod !== undefined) {
    if (inputs.analysisPeriod < 1 || inputs.analysisPeriod > 120) {
      errors.push('Analysis period must be between 1 and 120 months');
    }
  }
  
  if (inputs.projectionMonths !== undefined) {
    if (inputs.projectionMonths < 1 || inputs.projectionMonths > 120) {
      errors.push('Projection months must be between 1 and 120');
    }
  }
  
  if (inputs.marketRisk !== undefined) {
    if (inputs.marketRisk < 0 || inputs.marketRisk > 100) {
      errors.push('Market risk must be between 0% and 100%');
    }
  }
  
  if (inputs.competitiveRisk !== undefined) {
    if (inputs.competitiveRisk < 0 || inputs.competitiveRisk > 100) {
      errors.push('Competitive risk must be between 0% and 100%');
    }
  }
  
  if (inputs.economicRisk !== undefined) {
    if (inputs.economicRisk < 0 || inputs.economicRisk > 100) {
      errors.push('Economic risk must be between 0% and 100%');
    }
  }
  
  // Cross-field validations
  const retentionChurnSum = inputs.retentionRate + inputs.churnRate;
  if (Math.abs(retentionChurnSum - 100) > 5) {
    errors.push('Retention rate and churn rate should sum to approximately 100%');
  }
  
  if (inputs.businessModel === 'subscription' && inputs.customerLifespan < 1) {
    errors.push('Subscription businesses typically have customer lifespans of at least 1 year');
  }
  
  if (inputs.businessModel === 'subscription' && inputs.purchaseFrequency < 12) {
    errors.push('Subscription businesses typically have monthly or more frequent purchases');
  }
  
  const acquisitionToOrderRatio = inputs.acquisitionCost / inputs.averageOrderValue;
  if (acquisitionToOrderRatio < 0.1 || acquisitionToOrderRatio > 10) {
    errors.push('Acquisition cost should be reasonable relative to average order value');
  }
  
  const totalRisk = (inputs.marketRisk || 0) + (inputs.competitiveRisk || 0) + (inputs.economicRisk || 0);
  const expectedDiscountRate = Math.max(5, totalRisk * 0.5);
  if (inputs.discountRate < expectedDiscountRate * 0.5 || inputs.discountRate > expectedDiscountRate * 2) {
    errors.push('Discount rate should align with business risk factors');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
