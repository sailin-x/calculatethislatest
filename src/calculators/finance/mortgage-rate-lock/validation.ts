import { CalculatorInputs } from '../../../types/calculator';

export interface MortgageRateLockInputs extends CalculatorInputs {
  // Rate Information
  currentRate: number;
  lockRate: number;
  
  // Loan Details
  loanAmount: number;
  loanTerm: number;
  
  // Lock Details
  lockDuration: number;
  lockFee: number;
  extensionFee: number;
  expectedClosingDate: string;
  lockStartDate: string;
  
  // Market Conditions
  rateVolatility?: number;
  marketTrend?: 'rising' | 'falling' | 'stable' | 'volatile';
  
  // Lock Type
  lockType: 'float-down' | 'fixed' | 'one-time-float' | 'extended';
  floatDownThreshold?: number;
  floatDownFee?: number;
  
  // Costs and Penalties
  breakLockPenalty: number;
  processingTime: number;
  
  // Analysis Options
  includeExtensionRisk?: boolean;
  includeMarketScenarios?: boolean;
  includeBreakEvenAnalysis?: boolean;
}

export const validateMortgageRateLockInputs = (inputs: Partial<MortgageRateLockInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!inputs.currentRate && inputs.currentRate !== 0) {
    errors.push('Current market rate is required');
  }
  if (!inputs.lockRate && inputs.lockRate !== 0) {
    errors.push('Lock rate is required');
  }
  if (!inputs.loanAmount && inputs.loanAmount !== 0) {
    errors.push('Loan amount is required');
  }
  if (!inputs.loanTerm && inputs.loanTerm !== 0) {
    errors.push('Loan term is required');
  }
  if (!inputs.lockDuration && inputs.lockDuration !== 0) {
    errors.push('Lock duration is required');
  }
  if (!inputs.lockFee && inputs.lockFee !== 0) {
    errors.push('Lock fee is required');
  }
  if (!inputs.extensionFee && inputs.extensionFee !== 0) {
    errors.push('Extension fee is required');
  }
  if (!inputs.expectedClosingDate) {
    errors.push('Expected closing date is required');
  }
  if (!inputs.lockStartDate) {
    errors.push('Lock start date is required');
  }
  if (!inputs.lockType) {
    errors.push('Lock type is required');
  }
  if (!inputs.breakLockPenalty && inputs.breakLockPenalty !== 0) {
    errors.push('Break lock penalty is required');
  }
  if (!inputs.processingTime && inputs.processingTime !== 0) {
    errors.push('Processing time is required');
  }

  // Rate validation
  if (inputs.currentRate !== undefined && (inputs.currentRate < 0 || inputs.currentRate > 25)) {
    errors.push('Current rate must be between 0% and 25%');
  }
  if (inputs.lockRate !== undefined && (inputs.lockRate < 0 || inputs.lockRate > 25)) {
    errors.push('Lock rate must be between 0% and 25%');
  }

  // Loan validation
  if (inputs.loanAmount !== undefined && (inputs.loanAmount < 1000 || inputs.loanAmount > 10000000)) {
    errors.push('Loan amount must be between $1,000 and $10,000,000');
  }
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  // Lock duration validation
  if (inputs.lockDuration !== undefined && (inputs.lockDuration < 1 || inputs.lockDuration > 365)) {
    errors.push('Lock duration must be between 1 and 365 days');
  }

  // Fee validation
  if (inputs.lockFee !== undefined && (inputs.lockFee < 0 || inputs.lockFee > 10000)) {
    errors.push('Lock fee must be between $0 and $10,000');
  }
  if (inputs.extensionFee !== undefined && (inputs.extensionFee < 0 || inputs.extensionFee > 1000)) {
    errors.push('Extension fee must be between $0 and $1,000 per day');
  }

  // Date validation
  if (inputs.expectedClosingDate && inputs.lockStartDate) {
    const lockStart = new Date(inputs.lockStartDate);
    const closingDate = new Date(inputs.expectedClosingDate);
    
    if (isNaN(lockStart.getTime())) {
      errors.push('Invalid lock start date');
    }
    if (isNaN(closingDate.getTime())) {
      errors.push('Invalid expected closing date');
    }
    if (lockStart >= closingDate) {
      errors.push('Lock start date must be before expected closing date');
    }
  }

  // Rate volatility validation
  if (inputs.rateVolatility !== undefined && (inputs.rateVolatility < 0 || inputs.rateVolatility > 10)) {
    errors.push('Rate volatility must be between 0% and 10%');
  }

  // Market trend validation
  if (inputs.marketTrend && !['rising', 'falling', 'stable', 'volatile'].includes(inputs.marketTrend)) {
    errors.push('Market trend must be rising, falling, stable, or volatile');
  }

  // Lock type validation
  if (inputs.lockType && !['float-down', 'fixed', 'one-time-float', 'extended'].includes(inputs.lockType)) {
    errors.push('Lock type must be float-down, fixed, one-time-float, or extended');
  }

  // Float-down specific validation
  if (inputs.lockType === 'float-down') {
    if (inputs.floatDownThreshold === undefined || inputs.floatDownThreshold < 0 || inputs.floatDownThreshold > 2) {
      errors.push('Float-down threshold must be between 0% and 2%');
    }
    if (inputs.floatDownFee === undefined || inputs.floatDownFee < 0 || inputs.floatDownFee > 5000) {
      errors.push('Float-down fee must be between $0 and $5,000');
    }
  }

  // Break lock penalty validation
  if (inputs.breakLockPenalty !== undefined && (inputs.breakLockPenalty < 0 || inputs.breakLockPenalty > 10000)) {
    errors.push('Break lock penalty must be between $0 and $10,000');
  }

  // Processing time validation
  if (inputs.processingTime !== undefined && (inputs.processingTime < 1 || inputs.processingTime > 90)) {
    errors.push('Processing time must be between 1 and 90 days');
  }

  // Logical consistency checks
  if (inputs.lockDuration !== undefined && inputs.processingTime !== undefined) {
    if (inputs.processingTime > inputs.lockDuration) {
      errors.push('Processing time should not exceed lock duration');
    }
  }

  if (inputs.lockStartDate && inputs.expectedClosingDate && inputs.lockDuration !== undefined) {
    const lockStart = new Date(inputs.lockStartDate);
    const closingDate = new Date(inputs.expectedClosingDate);
    const lockEnd = new Date(lockStart.getTime() + inputs.lockDuration * 24 * 60 * 60 * 1000);
    
    if (closingDate > lockEnd) {
      errors.push('Expected closing date exceeds lock expiration date');
    }
  }

  // Rate comparison validation
  if (inputs.currentRate !== undefined && inputs.lockRate !== undefined) {
    const rateDifference = Math.abs(inputs.lockRate - inputs.currentRate);
    if (rateDifference > 5) {
      errors.push('Rate difference between current and lock rates is unusually large');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};