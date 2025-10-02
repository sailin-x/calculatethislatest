import { ValidationRule } from '../../types/calculator';
import { ValidationRuleFactory } from '../../utils/validation';

/**
 * Annuity buyout validation rules
 */
export const annuityBuyoutValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('currentAnnuityValue', 'Current annuity value is required'),
  ValidationRuleFactory.required('monthlyPayment', 'Monthly payment is required'),
  ValidationRuleFactory.required('remainingPayments', 'Remaining payments is required'),
  ValidationRuleFactory.required('buyoutOffer', 'Buyout offer is required'),
  ValidationRuleFactory.required('timeHorizon', 'Time horizon is required'),
  ValidationRuleFactory.required('age', 'Age is required'),
  ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),

  // Financial validations
  ValidationRuleFactory.range('currentAnnuityValue', 1000, 10000000, 'Current annuity value must be between $1,000 and $10,000,000'),
  ValidationRuleFactory.range('monthlyPayment', 10, 100000, 'Monthly payment must be between $10 and $100,000'),
  ValidationRuleFactory.range('remainingPayments', 1, 600, 'Remaining payments must be between 1 and 600 months'),
  ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
  ValidationRuleFactory.range('buyoutOffer', 1000, 10000000, 'Buyout offer must be between $1,000 and $10,000,000'),

  // Fee and cost validations
  ValidationRuleFactory.range('buyoutFees', 0, 1000000, 'Buyout fees must be between $0 and $1,000,000'),
  ValidationRuleFactory.range('buyoutTaxes', 0, 5000000, 'Buyout taxes must be between $0 and $5,000,000'),
  ValidationRuleFactory.range('alternativeInvestmentFees', 0, 100000, 'Alternative investment fees must be between $0 and $100,000'),

  // Investment and analysis validations
  ValidationRuleFactory.range('alternativeInvestmentRate', 0, 30, 'Alternative investment rate must be between 0% and 30%'),
  ValidationRuleFactory.range('timeHorizon', 1, 50, 'Time horizon must be between 1 and 50 years'),
  ValidationRuleFactory.range('age', 18, 120, 'Age must be between 18 and 120'),
  ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),

  // Rate validations
  ValidationRuleFactory.businessRule(
    'inflationRate',
    (inflationRate, allInputs) => {
      if (!allInputs?.includeInflation) return true;
      return inflationRate >= 0 && inflationRate <= 10;
    },
    'Inflation rate must be between 0% and 10% when inflation is included'
  ),

  ValidationRuleFactory.range('discountRate', 0, 20, 'Discount rate must be between 0% and 20%'),

  // Business logic validations
  ValidationRuleFactory.businessRule(
    'buyoutOffer',
    (buyoutOffer, allInputs) => {
      if (!allInputs?.currentAnnuityValue) return true;
      // Buyout offer should be reasonable relative to current value
      const ratio = buyoutOffer / allInputs.currentAnnuityValue;
      return ratio >= 0.5 && ratio <= 3.0;
    },
    'Buyout offer seems unreasonable relative to current annuity value'
  ),

  ValidationRuleFactory.businessRule(
    'monthlyPayment',
    (monthlyPayment, allInputs) => {
      if (!allInputs?.currentAnnuityValue) return true;
      // Monthly payment should be reasonable relative to total value
      const annualPayment = monthlyPayment * 12;
      const ratio = annualPayment / allInputs.currentAnnuityValue;
      return ratio >= 0.01 && ratio <= 0.5; // 1% to 50% of value annually
    },
    'Monthly payment seems unreasonable relative to annuity value'
  ),

  ValidationRuleFactory.businessRule(
    'remainingPayments',
    (remainingPayments, allInputs) => {
      if (!allInputs?.age) return true;
      // Remaining payments should be reasonable for age
      const yearsRemaining = remainingPayments / 12;
      const lifeExpectancy = Math.max(80 - allInputs.age, 5);
      return yearsRemaining <= lifeExpectancy + 10; // Allow some buffer
    },
    'Remaining payments seem excessive relative to age'
  ),

  ValidationRuleFactory.businessRule(
    'alternativeInvestmentRate',
    (alternativeInvestmentRate, allInputs) => {
      if (!allInputs?.riskTolerance) return true;

      // Rate should be reasonable for risk tolerance
      switch (allInputs.riskTolerance) {
        case 'low':
          return alternativeInvestmentRate <= 6;
        case 'medium':
          return alternativeInvestmentRate <= 10;
        case 'high':
          return alternativeInvestmentRate <= 20;
        default:
          return true;
      }
    },
    'Alternative investment rate seems inconsistent with risk tolerance'
  ),

  ValidationRuleFactory.businessRule(
    'timeHorizon',
    (timeHorizon, allInputs) => {
      if (!allInputs?.age) return true;
      // Time horizon should be reasonable for age
      const retirementAge = 65;
      const maxHorizon = Math.max(100 - allInputs.age, 5);
      return timeHorizon <= maxHorizon;
    },
    'Time horizon seems excessive relative to age'
  ),

  ValidationRuleFactory.businessRule(
    'buyoutTaxes',
    (buyoutTaxes, allInputs) => {
      if (!allInputs?.buyoutOffer) return true;
      // Tax amount should be reasonable
      const taxRate = buyoutTaxes / allInputs.buyoutOffer;
      return taxRate <= 0.5; // Max 50% tax rate
    },
    'Tax amount seems unreasonably high'
  ),

  ValidationRuleFactory.businessRule(
    'buyoutFees',
    (buyoutFees, allInputs) => {
      if (!allInputs?.buyoutOffer) return true;
      // Fee amount should be reasonable
      const feeRate = buyoutFees / allInputs.buyoutOffer;
      return feeRate <= 0.1; // Max 10% fee
    },
    'Buyout fees seem unreasonably high'
  ),

  ValidationRuleFactory.businessRule(
    'alternativeInvestmentFees',
    (alternativeInvestmentFees, allInputs) => {
      if (!allInputs?.buyoutOffer) return true;
      // Alternative fees should be reasonable
      const feeRate = alternativeInvestmentFees / allInputs.buyoutOffer;
      return feeRate <= 0.05; // Max 5% of buyout amount
    },
    'Alternative investment fees seem unreasonably high'
  ),

  // Risk tolerance validation
  ValidationRuleFactory.businessRule(
    'riskTolerance',
    (riskTolerance) => {
      return ['low', 'medium', 'high'].includes(riskTolerance);
    },
    'Risk tolerance must be low, medium, or high'
  ),

  // Age-based validations
  ValidationRuleFactory.businessRule(
    'age',
    (age, allInputs) => {
      if (!allInputs?.timeHorizon) return true;
      // Ensure time horizon is reasonable for age
      return age + allInputs.timeHorizon <= 110; // Max age 110
    },
    'Age plus time horizon exceeds reasonable life expectancy'
  ),

  // Tax bracket validation
  ValidationRuleFactory.businessRule(
    'taxBracket',
    (taxBracket, allInputs) => {
      if (!allInputs?.age) return true;
      // Tax bracket should be reasonable for age/income
      return taxBracket >= 0 && taxBracket <= 37; // Current max federal rate
    },
    'Tax bracket seems outside reasonable range'
  )
];

/**
 * Get validation rules for annuity buyout calculator
 */
export function getAnnuityBuyoutValidationRules(): ValidationRule[] {
  return annuityBuyoutValidationRules;
}