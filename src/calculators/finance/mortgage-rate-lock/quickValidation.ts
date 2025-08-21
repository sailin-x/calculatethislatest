import { MortgageRateLockInputs } from './validation';

export const quickValidateMortgageRateLock = (inputs: Partial<MortgageRateLockInputs>): boolean => {
  // Check essential required fields
  if (!inputs.currentRate && inputs.currentRate !== 0) return false;
  if (!inputs.lockRate && inputs.lockRate !== 0) return false;
  if (!inputs.loanAmount && inputs.loanAmount !== 0) return false;
  if (!inputs.loanTerm && inputs.loanTerm !== 0) return false;
  if (!inputs.lockDuration && inputs.lockDuration !== 0) return false;
  if (!inputs.lockFee && inputs.lockFee !== 0) return false;
  if (!inputs.extensionFee && inputs.extensionFee !== 0) return false;
  if (!inputs.expectedClosingDate) return false;
  if (!inputs.lockStartDate) return false;
  if (!inputs.lockType) return false;
  if (!inputs.breakLockPenalty && inputs.breakLockPenalty !== 0) return false;
  if (!inputs.processingTime && inputs.processingTime !== 0) return false;

  // Basic range checks
  if (inputs.currentRate !== undefined && (inputs.currentRate < 0 || inputs.currentRate > 25)) return false;
  if (inputs.lockRate !== undefined && (inputs.lockRate < 0 || inputs.lockRate > 25)) return false;
  if (inputs.loanAmount !== undefined && (inputs.loanAmount < 1000 || inputs.loanAmount > 10000000)) return false;
  if (inputs.loanTerm !== undefined && (inputs.loanTerm < 1 || inputs.loanTerm > 50)) return false;
  if (inputs.lockDuration !== undefined && (inputs.lockDuration < 1 || inputs.lockDuration > 365)) return false;
  if (inputs.lockFee !== undefined && (inputs.lockFee < 0 || inputs.lockFee > 10000)) return false;
  if (inputs.extensionFee !== undefined && (inputs.extensionFee < 0 || inputs.extensionFee > 1000)) return false;
  if (inputs.breakLockPenalty !== undefined && (inputs.breakLockPenalty < 0 || inputs.breakLockPenalty > 10000)) return false;
  if (inputs.processingTime !== undefined && (inputs.processingTime < 1 || inputs.processingTime > 90)) return false;

  // Basic date validation
  if (inputs.expectedClosingDate && inputs.lockStartDate) {
    const lockStart = new Date(inputs.lockStartDate);
    const closingDate = new Date(inputs.expectedClosingDate);
    
    if (isNaN(lockStart.getTime()) || isNaN(closingDate.getTime())) return false;
    if (lockStart >= closingDate) return false;
  }

  // Float-down specific checks
  if (inputs.lockType === 'float-down') {
    if (inputs.floatDownThreshold === undefined || inputs.floatDownThreshold < 0 || inputs.floatDownThreshold > 2) return false;
    if (inputs.floatDownFee === undefined || inputs.floatDownFee < 0 || inputs.floatDownFee > 5000) return false;
  }

  return true;
};