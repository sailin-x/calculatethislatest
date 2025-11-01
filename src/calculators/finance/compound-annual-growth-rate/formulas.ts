import { CAGRInputs, CAGROutputs } from './types';

// Calculate compound annual growth rate
export function calculateCAGR(inputs: CAGRInputs): number {
  const { initialValue, finalValue, timePeriod, timePeriodUnit } = inputs;

  if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) {
    return 0;
  }

  // Convert time period to years
  let years: number;
  switch (timePeriodUnit) {
    case 'days':
      years = timePeriod / 365.25;
      break;
    case 'months':
      years = timePeriod / 12;
      break;
    case 'years':
    default:
      years = timePeriod;
      break;
  }

  // CAGR formula: (Final Value / Initial Value)^(1/years) - 1
  const cagr = Math.pow(finalValue / initialValue, 1 / years) - 1;
  return cagr;
}

// Calculate total return
export function calculateTotalReturn(inputs: CAGRInputs): number {
  return inputs.finalValue - inputs.initialValue;
}

// Calculate total return percentage
export function calculateTotalReturnPercentage(inputs: CAGRInputs): number {
  if (inputs.initialValue <= 0) return 0;
  return ((inputs.finalValue - inputs.initialValue) / inputs.initialValue) * 100;
}

// Calculate annualized return (same as CAGR for simple cases)
export function calculateAnnualizedReturn(inputs: CAGRInputs): number {
  return calculateCAGR(inputs);
}

// Calculate real CAGR (after inflation)
export function calculateRealCAGR(inputs: CAGRInputs): number {
  const cagr = calculateCAGR(inputs);
  const inflationRate = inputs.inflationRate || 0;
  return (1 + cagr) / (1 + inflationRate) - 1;
}

// Calculate after-tax CAGR
export function calculateAfterTaxCAGR(inputs: CAGRInputs): number {
  const cagr = calculateCAGR(inputs);
  const taxRate = inputs.taxRate || 0;

  // Simplified tax calculation - assumes capital gains tax on returns
  const afterTaxReturn = cagr * (1 - taxRate);
  return afterTaxReturn;
}

// Get compounding frequency number
export function getCompoundingFrequency(frequency: string): number {
  switch (frequency) {
    case 'daily': return 365;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annual': return 2;
    case 'annual':
    default: return 1;
  }
}

// Calculate future value projection
export function calculateFutureValue(inputs: CAGRInputs, projectionYears: number): number {
  const cagr = calculateCAGR(inputs);
  return inputs.finalValue * Math.pow(1 + cagr, projectionYears);
}

// Calculate investment multiple
export function calculateInvestmentMultiple(inputs: CAGRInputs): number {
  if (inputs.initialValue <= 0) return 0;
  return inputs.finalValue / inputs.initialValue;
}

// Calculate average annual return
export function calculateAverageAnnualReturn(inputs: CAGRInputs): number {
  return calculateTotalReturnPercentage(inputs) / getTimePeriodInYears(inputs);
}

// Get time period in years
function getTimePeriodInYears(inputs: CAGRInputs): number {
  const { timePeriod, timePeriodUnit } = inputs;

  switch (timePeriodUnit) {
    case 'days':
      return timePeriod / 365.25;
    case 'months':
      return timePeriod / 12;
    case 'years':
    default:
      return timePeriod;
  }
}

// Calculate CAGR with additional contributions
export function calculateCAGRWithContributions(inputs: CAGRInputs): number {
  // This is a simplified calculation for CAGR with regular contributions
  // In reality, this requires more complex calculations considering the timing of contributions
  const baseCAGR = calculateCAGR(inputs);

  if (!inputs.additionalContributions || inputs.additionalContributions <= 0) {
    return baseCAGR;
  }

  // Adjust for contributions (simplified approach)
  const totalInvested = inputs.initialValue + (inputs.additionalContributions * getTimePeriodInYears(inputs));
  const adjustedInitialValue = totalInvested * Math.pow(1 + baseCAGR, -getTimePeriodInYears(inputs));

  return calculateCAGR({
    ...inputs,
    initialValue: adjustedInitialValue
  });
}

// Main CAGR calculation function
export function calculateCAGRResult(inputs: CAGRInputs): CAGROutputs {
  const cagr = inputs.additionalContributions ?
    calculateCAGRWithContributions(inputs) :
    calculateCAGR(inputs);

  const totalReturn = calculateTotalReturn(inputs);
  const totalReturnPercentage = calculateTotalReturnPercentage(inputs);
  const annualizedReturn = calculateAnnualizedReturn(inputs);
  const realCAGR = calculateRealCAGR(inputs);
  const afterTaxCAGR = calculateAfterTaxCAGR(inputs);
  const compoundFrequency = getCompoundingFrequency(inputs.compoundingFrequency || 'annual');
  const futureValue = calculateFutureValue(inputs, 1); // 1-year projection
  const investmentMultiple = calculateInvestmentMultiple(inputs);
  const averageAnnualReturn = calculateAverageAnnualReturn(inputs);

  return {
    cagr,
    totalReturn,
    totalReturnPercentage,
    annualizedReturn,
    realCAGR,
    afterTaxCAGR,
    compoundFrequency,
    futureValue,
    investmentMultiple,
    averageAnnualReturn
  };
}