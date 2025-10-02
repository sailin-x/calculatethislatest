import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Fixed index annuity validation rules
 */
export const fixedIndexAnnuityValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('initialInvestment', 'Initial investment is required'),
  ValidationRuleFactory.required('annuityPeriod', 'Annuity period is required'),
  ValidationRuleFactory.required('currentAge', 'Current age is required'),
  ValidationRuleFactory.required('withdrawalAge', 'Withdrawal age is required'),
  ValidationRuleFactory.required('participationRate', 'Participation rate is required'),

  // Investment validations
  ValidationRuleFactory.range('initialInvestment', 1000, 10000000, 'Initial investment must be between $1,000 and $10,000,000'),
  ValidationRuleFactory.range('monthlyContribution', 0, 100000, 'Monthly contribution must be between $0 and $100,000'),
  ValidationRuleFactory.range('contributionPeriod', 0, 50, 'Contribution period must be between 0 and 50 years'),

  // Index and growth validations
  ValidationRuleFactory.range('participationRate', 10, 200, 'Participation rate must be between 10% and 200%'),
  ValidationRuleFactory.businessRule(
    'capRate',
    (capRate, allInputs) => {
      if (!capRate) return true;
      return capRate >= 1 && capRate <= 50;
    },
    'Cap rate must be between 1% and 50%'
  ),
  ValidationRuleFactory.businessRule(
    'floorRate',
    (floorRate, allInputs) => {
      if (!floorRate) return true;
      return floorRate >= -10 && floorRate <= 10;
    },
    'Floor rate must be between -10% and 10%'
  ),
  ValidationRuleFactory.range('spreadRate', 0, 5, 'Spread rate must be between 0% and 5%'),

  // Time validations
  ValidationRuleFactory.range('annuityPeriod', 1, 50, 'Annuity period must be between 1 and 50 years'),
  ValidationRuleFactory.range('currentAge', 18, 80, 'Current age must be between 18 and 80'),
  ValidationRuleFactory.range('withdrawalAge', 50, 90, 'Withdrawal age must be between 50 and 90'),

  // Fee validations
  ValidationRuleFactory.range('annualFee', 0, 5, 'Annual fee must be between 0% and 5%'),
  ValidationRuleFactory.businessRule(
    'surrenderCharges',
    (surrenderCharges, allInputs) => {
      if (!surrenderCharges || !Array.isArray(surrenderCharges)) return true;
      return surrenderCharges.every(charge => charge >= 0 && charge <= 20);
    },
    'Surrender charges must be between 0% and 20%'
  ),
  ValidationRuleFactory.range('riderFees', 0, 10000, 'Rider fees must be between $0 and $10,000'),

  // Payout validations
  ValidationRuleFactory.range('payoutPeriod', 1, 50, 'Payout period must be between 1 and 50 years'),
  ValidationRuleFactory.range('payoutPercentage', 1, 20, 'Payout percentage must be between 1% and 20%'),

  // Tax validations
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
  ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),

  // Market validations
  ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation rate must be between 0% and 10%'),
  ValidationRuleFactory.range('marketVolatility', 5, 50, 'Market volatility must be between 5% and 50%'),
  ValidationRuleFactory.range('conservativeReturn', 0, 15, 'Conservative return must be between 0% and 15%'),
  ValidationRuleFactory.range('aggressiveReturn', 5, 30, 'Aggressive return must be between 5% and 30%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'withdrawalAge',
    (withdrawalAge, allInputs) => {
      if (!allInputs?.currentAge) return true;
      return withdrawalAge > allInputs.currentAge;
    },
    'Withdrawal age must be greater than current age'
  ),

  ValidationRuleFactory.businessRule(
    'contributionPeriod',
    (contributionPeriod, allInputs) => {
      if (!allInputs?.annuityPeriod) return true;
      return contributionPeriod <= allInputs.annuityPeriod;
    },
    'Contribution period cannot exceed annuity period'
  ),

  ValidationRuleFactory.businessRule(
    'participationRate',
    (participationRate, allInputs) => {
      if (!allInputs?.indexType) return true;
      // Higher participation rates for conservative indexes
      if (allInputs.indexType === 's-p-500' && participationRate > 100) {
        return false;
      }
      return true;
    },
    'Participation rate seems high for selected index'
  ),

  ValidationRuleFactory.businessRule(
    'annualFee',
    (annualFee, allInputs) => {
      if (!allInputs?.initialInvestment) return true;
      const feeAmount = allInputs.initialInvestment * (annualFee / 100);
      return feeAmount <= 5000; // Max $5,000 annual fee
    },
    'Annual fee amount seems unreasonably high'
  ),

  ValidationRuleFactory.businessRule(
    'payoutPercentage',
    (payoutPercentage, allInputs) => {
      if (!allInputs?.annuityPeriod) return true;
      // Basic payout percentage validation
      const maxReasonablePayout = 100 / allInputs.annuityPeriod;
      return payoutPercentage <= maxReasonablePayout * 1.5; // Allow 50% over reasonable
    },
    'Payout percentage seems high for the annuity period'
  )
];

/**
 * Get validation rules for fixed index annuity calculator
 */
export function getFixedIndexAnnuityValidationRules(): ValidationRule[] {
  return fixedIndexAnnuityValidationRules;
}