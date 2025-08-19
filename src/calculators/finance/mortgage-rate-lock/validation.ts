import { MortgageRateLockInputs } from './formulas';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validate mortgage rate lock inputs
 */
export function validateMortgageRateLockInputs(inputs: MortgageRateLockInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required field validations
  if (!inputs.loanAmount || inputs.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Loan Amount is required and must be positive', severity: 'error' });
  }

  if (!inputs.interestRate || inputs.interestRate <= 0 || inputs.interestRate > 20) {
    errors.push({ field: 'interestRate', message: 'Interest Rate must be between 0.1% and 20%', severity: 'error' });
  }

  if (!inputs.loanTerm || !['15', '20', '30'].includes(inputs.loanTerm)) {
    errors.push({ field: 'loanTerm', message: 'Loan Term must be 15, 20, or 30 years', severity: 'error' });
  }

  if (!inputs.lockPeriod || !['15', '30', '45', '60', '90', '120'].includes(inputs.lockPeriod)) {
    errors.push({ field: 'lockPeriod', message: 'Lock Period must be 15, 30, 45, 60, 90, or 120 days', severity: 'error' });
  }

  if (!inputs.processingTime || inputs.processingTime < 7 || inputs.processingTime > 120) {
    errors.push({ field: 'processingTime', message: 'Processing Time must be between 7 and 120 days', severity: 'error' });
  }

  if (!inputs.loanType || !['conventional', 'fha', 'va', 'usda'].includes(inputs.loanType)) {
    errors.push({ field: 'loanType', message: 'Loan Type must be conventional, fha, va, or usda', severity: 'error' });
  }

  // Range validations
  if (inputs.loanAmount && (inputs.loanAmount < 50000 || inputs.loanAmount > 10000000)) {
    errors.push({ field: 'loanAmount', message: 'Loan Amount must be between $50,000 and $10,000,000', severity: 'error' });
  }

  if (inputs.interestRate && (inputs.interestRate < 0.1 || inputs.interestRate > 20)) {
    errors.push({ field: 'interestRate', message: 'Interest Rate must be between 0.1% and 20%', severity: 'error' });
  }

  // Optional field validations
  if (inputs.lockFee !== undefined && inputs.lockFee !== null) {
    if (inputs.lockFee < 0 || inputs.lockFee > 5000) {
      errors.push({ field: 'lockFee', message: 'Lock Fee must be between $0 and $5,000', severity: 'error' });
    }
  }

  if (inputs.lockExtensionFee !== undefined && inputs.lockExtensionFee !== null) {
    if (inputs.lockExtensionFee < 0 || inputs.lockExtensionFee > 100) {
      errors.push({ field: 'lockExtensionFee', message: 'Lock Extension Fee must be between $0 and $100 per day', severity: 'error' });
    }
  }

  if (inputs.rateVolatility !== undefined && inputs.rateVolatility !== null) {
    if (inputs.rateVolatility < 0 || inputs.rateVolatility > 200) {
      errors.push({ field: 'rateVolatility', message: 'Rate Volatility must be between 0 and 200 basis points', severity: 'error' });
    }
  }

  if (inputs.marketTrend && !['rising', 'falling', 'stable'].includes(inputs.marketTrend)) {
    errors.push({ field: 'marketTrend', message: 'Market Trend must be rising, falling, or stable', severity: 'error' });
  }

  if (inputs.propertyType && !['primary', 'secondary', 'investment'].includes(inputs.propertyType)) {
    errors.push({ field: 'propertyType', message: 'Property Type must be primary, secondary, or investment', severity: 'error' });
  }

  if (inputs.creditScore !== undefined && inputs.creditScore !== null) {
    if (inputs.creditScore < 300 || inputs.creditScore > 850) {
      errors.push({ field: 'creditScore', message: 'Credit Score must be between 300 and 850', severity: 'error' });
    }
  }

  if (inputs.downPayment !== undefined && inputs.downPayment !== null) {
    if (inputs.downPayment < 0 || inputs.downPayment > 1000000) {
      errors.push({ field: 'downPayment', message: 'Down Payment must be between $0 and $1,000,000', severity: 'error' });
    }
  }

  // Date validations
  if (inputs.closingDate) {
    const closingDate = new Date(inputs.closingDate);
    if (isNaN(closingDate.getTime())) {
      errors.push({ field: 'closingDate', message: 'Closing Date must be a valid date', severity: 'error' });
    }
  }

  if (inputs.lockStartDate) {
    const lockStartDate = new Date(inputs.lockStartDate);
    if (isNaN(lockStartDate.getTime())) {
      errors.push({ field: 'lockStartDate', message: 'Lock Start Date must be a valid date', severity: 'error' });
    }
  }

  // Business logic validations
  const businessLogicErrors = validateBusinessLogic(inputs);
  errors.push(...businessLogicErrors);

  return errors;
}

/**
 * Validate business logic rules
 */
function validateBusinessLogic(inputs: MortgageRateLockInputs): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if processing time exceeds lock period significantly
  if (inputs.processingTime && inputs.lockPeriod) {
    const processingTime = inputs.processingTime;
    const lockPeriod = parseInt(inputs.lockPeriod);
    
    if (processingTime > lockPeriod * 2) {
      errors.push({
        field: 'processingTime',
        message: 'Processing time significantly exceeds lock period - consider a longer lock period',
        severity: 'warning'
      });
    }
  }

  // Check if down payment is reasonable for loan type
  if (inputs.downPayment && inputs.loanAmount && inputs.loanType) {
    const downPaymentPercent = (inputs.downPayment / inputs.loanAmount) * 100;
    
    switch (inputs.loanType) {
      case 'fha':
        if (downPaymentPercent < 3.5) {
          errors.push({
            field: 'downPayment',
            message: 'FHA loans typically require at least 3.5% down payment',
            severity: 'warning'
          });
        }
        break;
      case 'conventional':
        if (downPaymentPercent < 3) {
          errors.push({
            field: 'downPayment',
            message: 'Conventional loans typically require at least 3% down payment',
            severity: 'warning'
          });
        }
        break;
      case 'va':
      case 'usda':
        if (downPaymentPercent > 0) {
          errors.push({
            field: 'downPayment',
            message: 'VA and USDA loans typically allow 100% financing',
            severity: 'info'
          });
        }
        break;
    }
  }

  // Check if credit score is reasonable for loan type
  if (inputs.creditScore && inputs.loanType) {
    switch (inputs.loanType) {
      case 'conventional':
        if (inputs.creditScore < 620) {
          errors.push({
            field: 'creditScore',
            message: 'Conventional loans typically require a minimum credit score of 620',
            severity: 'warning'
          });
        }
        break;
      case 'fha':
        if (inputs.creditScore < 580) {
          errors.push({
            field: 'creditScore',
            message: 'FHA loans typically require a minimum credit score of 580',
            severity: 'warning'
          });
        }
        break;
    }
  }

  // Check if rate volatility is reasonable for market conditions
  if (inputs.rateVolatility && inputs.marketTrend) {
    if (inputs.marketTrend === 'stable' && inputs.rateVolatility > 50) {
      errors.push({
        field: 'rateVolatility',
        message: 'High volatility seems inconsistent with stable market trend',
        severity: 'warning'
      });
    }
    
    if (inputs.marketTrend === 'rising' && inputs.rateVolatility < 10) {
      errors.push({
        field: 'rateVolatility',
        message: 'Low volatility seems inconsistent with rising market trend',
        severity: 'warning'
      });
    }
  }

  // Check if lock fees are reasonable
  if (inputs.lockFee && inputs.lockPeriod) {
    const lockPeriod = parseInt(inputs.lockPeriod);
    const dailyFee = inputs.lockFee / lockPeriod;
    
    if (dailyFee > 50) {
      errors.push({
        field: 'lockFee',
        message: 'Lock fee seems unusually high for the lock period',
        severity: 'warning'
      });
    }
  }

  return errors;
}