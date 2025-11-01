import { LoanToCost-LtcRatioCalculatorinputs, LoanToCost-LtcRatioCalculatormetrics, LoanToCost-LtcRatioCalculatoranalysis } from './types';

// Loan to Cost Ratio Calculator
export function calculateLTC(loanAmount: number, propertyCost: number): number {
  return (loanAmount / propertyCost) * 100;
}

export function calculateMaxLoanAmount(propertyCost: number, maxLTC: number): number {
  return (propertyCost * maxLTC) / 100;
}

export function calculateEquityRequired(propertyCost: number, loanAmount: number): number {
  return propertyCost - loanAmount;
}

export function calculateResult(inputs: LoanToCost-LtcRatioCalculatorinputs): number {
  if ('loanAmount' in inputs && 'propertyCost' in inputs) {
    return calculateLTC(inputs.loanAmount, inputs.propertyCost);
  }
  return 0;
}

export function generateAnalysis(inputs: LoanToCost-LtcRatioCalculatorinputs, metrics: LoanToCost-LtcRatioCalculatormetrics): LoanToCost-LtcRatioCalculatoranalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 80) riskLevel = 'High';
  else if (result > 75) riskLevel = 'Medium';

  const recommendation = result <= 75 ?
    'LTC ratio within conventional lending guidelines' :
    'High LTC ratio may require alternative financing or additional equity';

  return { recommendation, riskLevel };
}