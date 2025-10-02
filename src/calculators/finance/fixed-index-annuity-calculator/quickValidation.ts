import { ValidationResult } from '../../types/calculator';

export function validateInitialInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1000) {
    return { isValid: false, errors: { initialInvestment: 'Initial investment must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { initialInvestment: 'Initial investment cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateContributionPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { contributionPeriod: 'Contribution period must be between 0 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateParticipationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 10 || value > 200) {
    return { isValid: false, errors: { participationRate: 'Participation rate must be between 10% and 200%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined) return { isValid: true, errors: {} };
  if (value < 1 || value > 50) {
    return { isValid: false, errors: { capRate: 'Cap rate must be between 1% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFloorRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined) return { isValid: true, errors: {} };
  if (value < -10 || value > 10) {
    return { isValid: false, errors: { floorRate: 'Floor rate must be between -10% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpreadRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 5) {
    return { isValid: false, errors: { spreadRate: 'Spread rate must be between 0% and 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnuityPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 50) {
    return { isValid: false, errors: { annuityPeriod: 'Annuity period must be between 1 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 18 || value > 80) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 18 and 80' } };
  }
  return { isValid: true, errors: {} };
}

export function validateWithdrawalAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 50 || value > 90) {
    return { isValid: false, errors: { withdrawalAge: 'Withdrawal age must be between 50 and 90' } };
  }
  if (allInputs?.currentAge && value <= allInputs.currentAge) {
    return { isValid: false, errors: { withdrawalAge: 'Withdrawal age must be greater than current age' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 5) {
    return { isValid: false, errors: { annualFee: 'Annual fee must be between 0% and 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRiderFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { riderFees: 'Rider fees cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { riderFees: 'Rider fees cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 50) {
    return { isValid: false, errors: { payoutPeriod: 'Payout period must be between 1 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 20) {
    return { isValid: false, errors: { payoutPercentage: 'Payout percentage must be between 1% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 5 || value > 50) {
    return { isValid: false, errors: { marketVolatility: 'Market volatility must be between 5% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConservativeReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 15) {
    return { isValid: false, errors: { conservativeReturn: 'Conservative return must be between 0% and 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAggressiveReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 5 || value > 30) {
    return { isValid: false, errors: { aggressiveReturn: 'Aggressive return must be between 5% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateJointLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 50) {
    return { isValid: false, errors: { jointLifeExpectancy: 'Joint life expectancy must be between 1 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIndexType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['s-p-500', 'dow-jones', 'nasdaq', 'custom'].includes(value)) {
    return { isValid: false, errors: { indexType: 'Please select a valid index type' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['lifetime', 'period-certain', 'joint-life', 'single-life'].includes(value)) {
    return { isValid: false, errors: { payoutType: 'Please select a valid payout type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGender(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['male', 'female'].includes(value)) {
    return { isValid: false, errors: { gender: 'Please select a valid gender' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxDeferred(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { taxDeferred: 'Tax deferred must be true or false' } };
  }
  return { isValid: true, errors: {} };
}