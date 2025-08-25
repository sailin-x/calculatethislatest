import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for retirement calculator
 * Each function validates a single field and includes the allInputs parameter
 */

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentAge: 'Current age must be a valid number' } };
  }
  if (num < 18) {
    return { isValid: false, errors: { currentAge: 'Current age must be at least 18' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { currentAge: 'Current age cannot exceed 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be a valid number' } };
  }
  if (num < 55) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be at least 55' } };
  }
  if (num > 85) {
    return { isValid: false, errors: { retirementAge: 'Retirement age cannot exceed 85' } };
  }
  
  // Check if retirement age is after current age
  if (allInputs?.currentAge && num <= Number(allInputs.currentAge)) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be after current age' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be a valid number' } };
  }
  if (num < 70) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be at least 70' } };
  }
  if (num > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy cannot exceed 120' } };
  }
  
  // Check if life expectancy is after retirement age
  if (allInputs?.retirementAge && num <= Number(allInputs.retirementAge)) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be after retirement age' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateCurrentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentIncome: 'Current income must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { currentIncome: 'Current income must be greater than 0' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { currentIncome: 'Current income cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { expectedReturn: 'Expected return cannot be negative' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { expectedReturn: 'Expected return above 20% is unrealistic' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be a valid number' } };
  }
  if (num < -10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot be below -10%' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate above 20% is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDesiredRetirementIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { desiredRetirementIncome: 'Desired retirement income must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { desiredRetirementIncome: 'Desired retirement income must be greater than 0' } };
  }
  if (num > 1000000) {
    return { isValid: false, errors: { desiredRetirementIncome: 'Desired retirement income cannot exceed $1 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthly401kContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { monthly401kContribution: '401(k) contribution must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { monthly401kContribution: '401(k) contribution cannot be negative' } };
  }
  if (num > 50000) {
    return { isValid: false, errors: { monthly401kContribution: '401(k) contribution cannot exceed $50,000/month' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyIRAContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { monthlyIRAContribution: 'IRA contribution must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { monthlyIRAContribution: 'IRA contribution cannot be negative' } };
  }
  if (num > 10000) {
    return { isValid: false, errors: { monthlyIRAContribution: 'IRA contribution cannot exceed $10,000/month' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentSavings: 'Current savings must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrent401k(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { current401k: 'Current 401(k) balance must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { current401k: 'Current 401(k) balance cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { current401k: 'Current 401(k) balance cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentIRA(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { currentIRA: 'Current IRA balance must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { currentIRA: 'Current IRA balance cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { currentIRA: 'Current IRA balance cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherInvestments(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { otherInvestments: 'Other investments must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { otherInvestments: 'Other investments cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { otherInvestments: 'Other investments cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSocialSecurityMonthly(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { socialSecurityMonthly: 'Social Security benefit must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { socialSecurityMonthly: 'Social Security benefit cannot be negative' } };
  }
  if (num > 50000) {
    return { isValid: false, errors: { socialSecurityMonthly: 'Social Security benefit cannot exceed $50,000/month' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePensionMonthly(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { pensionMonthly: 'Pension benefit must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { pensionMonthly: 'Pension benefit cannot be negative' } };
  }
  if (num > 100000) {
    return { isValid: false, errors: { pensionMonthly: 'Pension benefit cannot exceed $100,000/month' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherIncomeMonthly(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { otherIncomeMonthly: 'Other income must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { otherIncomeMonthly: 'Other income cannot be negative' } };
  }
  if (num > 100000) {
    return { isValid: false, errors: { otherIncomeMonthly: 'Other income cannot exceed $100,000/month' } };
  }
  return { isValid: true, errors: {} };
}
