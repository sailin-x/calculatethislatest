import { HedgeFundInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: keyof HedgeFundInputs,
  value: any,
  allInputs: HedgeFundInputs
): QuickValidationResult {
  switch (fieldName) {
    case 'fundName':
      return validateFundName(value);
    case 'strategy':
      return validateStrategy(value);
    case 'inceptionDate':
      return validateInceptionDate(value);
    case 'initialInvestment':
      return validateInitialInvestment(value);
    case 'currentValue':
      return validateCurrentValue(value, allInputs);
    case 'investmentPeriod':
      return validateInvestmentPeriod(value);
    case 'annualReturn':
      return validateAnnualReturn(value);
    case 'annualVolatility':
      return validateAnnualVolatility(value);
    case 'maxDrawdown':
      return validateMaxDrawdown(value);
    case 'beta':
      return validateBeta(value);
    case 'alpha':
      return validateAlpha(value);
    case 'trackingError':
      return validateTrackingError(value);
    case 'managementFee':
      return validateManagementFee(value, allInputs);
    case 'performanceFee':
      return validatePerformanceFee(value, allInputs);
    case 'hurdleRate':
      return validateHurdleRate(value);
    case 'highWaterMark':
      return validateHighWaterMark(value);
    case 'downsideDeviation':
      return validateDownsideDeviation(value, allInputs);
    case 'semiDeviation':
      return validateSemiDeviation(value, allInputs);
    case 'skewness':
      return validateSkewness(value);
    case 'kurtosis':
      return validateKurtosis(value);
    case 'benchmarkReturn':
      return validateBenchmarkReturn(value);
    case 'benchmarkVolatility':
      return validateBenchmarkVolatility(value);
    case 'riskFreeRate':
      return validateRiskFreeRate(value);
    case 'sp500Return':
      return validateSP500Return(value);
    case 'bondReturn':
      return validateBondReturn(value);
    case 'internationalReturn':
      return validateInternationalReturn(value);
    case 'upsideCaptureRatio':
      return validateUpsideCaptureRatio(value, allInputs);
    case 'downsideCaptureRatio':
      return validateDownsideCaptureRatio(value, allInputs);
    case 'winRate':
      return validateWinRate(value);
    case 'profitFactor':
      return validateProfitFactor(value, allInputs);
    case 'averageWin':
      return validateAverageWin(value);
    case 'averageLoss':
      return validateAverageLoss(value);
    case 'correlationWithBenchmark':
      return validateCorrelationWithBenchmark(value);
    case 'rSquared':
      return validateRSquared(value);
    default:
      return { isValid: true };
  }
}

function validateFundName(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Fund name is required' };
  }
  
  if (value.trim().length === 0) {
    return { isValid: false, error: 'Fund name cannot be empty' };
  }
  
  if (value.length > 100) {
    return { isValid: false, error: 'Fund name cannot exceed 100 characters' };
  }
  
  return { isValid: true };
}

function validateStrategy(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Strategy is required' };
  }
  
  const validStrategies = ['long-short', 'global-macro', 'event-driven', 'relative-value', 'managed-futures', 'multi-strategy', 'other'];
  if (!validStrategies.includes(value)) {
    return { isValid: false, error: 'Invalid strategy type' };
  }
  
  return { isValid: true };
}

function validateInceptionDate(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: true }; // Optional field
  }
  
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }
  
  if (date > new Date()) {
    return { isValid: false, error: 'Inception date cannot be in the future' };
  }
  
  return { isValid: true };
}

function validateInitialInvestment(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Initial investment cannot be negative' };
  }
  
  if (value === 0) {
    return { isValid: false, error: 'Initial investment must be greater than 0' };
  }
  
  if (value > 1000000000) {
    return { isValid: true, warning: 'Initial investment seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateCurrentValue(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Current value cannot be negative' };
  }
  
  if (value > 1000000000) {
    return { isValid: true, warning: 'Current value seems unusually high, please verify' };
  }
  
  if (allInputs.initialInvestment > 0 && value > 0) {
    const calculatedReturn = ((value - allInputs.initialInvestment) / allInputs.initialInvestment) * 100;
    if (Math.abs(calculatedReturn - allInputs.annualReturn) > 50) {
      return { isValid: true, warning: 'Calculated return differs significantly from provided annual return' };
    }
  }
  
  return { isValid: true };
}

function validateInvestmentPeriod(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Investment period must be greater than 0' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Investment period cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

function validateAnnualReturn(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Annual return cannot be less than -100%' };
  }
  
  if (value > 1000) {
    return { isValid: true, warning: 'Annual return seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateAnnualVolatility(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Annual volatility cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Annual volatility cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateMaxDrawdown(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Maximum drawdown cannot be less than -100%' };
  }
  
  if (value > 0) {
    return { isValid: false, error: 'Maximum drawdown should be negative' };
  }
  
  return { isValid: true };
}

function validateBeta(value: number): QuickValidationResult {
  if (value < -5) {
    return { isValid: false, error: 'Beta cannot be less than -5' };
  }
  
  if (value > 5) {
    return { isValid: false, error: 'Beta cannot exceed 5' };
  }
  
  return { isValid: true };
}

function validateAlpha(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Alpha cannot be less than -100%' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Alpha cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateTrackingError(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tracking error cannot be negative' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Tracking error cannot exceed 50%' };
  }
  
  return { isValid: true };
}

function validateManagementFee(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Management fee cannot be negative' };
  }
  
  if (value > 10) {
    return { isValid: false, error: 'Management fee cannot exceed 10%' };
  }
  
  if (allInputs.performanceFee > 0 && value + allInputs.performanceFee > 60) {
    return { isValid: true, warning: 'Total fees exceed typical hedge fund fee structure' };
  }
  
  return { isValid: true };
}

function validatePerformanceFee(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Performance fee cannot be negative' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Performance fee cannot exceed 50%' };
  }
  
  if (allInputs.managementFee > 0 && value + allInputs.managementFee > 60) {
    return { isValid: true, warning: 'Total fees exceed typical hedge fund fee structure' };
  }
  
  return { isValid: true };
}

function validateHurdleRate(value: number): QuickValidationResult {
  if (value < -50) {
    return { isValid: false, error: 'Hurdle rate cannot be less than -50%' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Hurdle rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

function validateHighWaterMark(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'High water mark cannot be negative' };
  }
  
  return { isValid: true };
}

function validateDownsideDeviation(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Downside deviation cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Downside deviation cannot exceed 100%' };
  }
  
  if (allInputs.annualVolatility > 0 && value > allInputs.annualVolatility) {
    return { isValid: true, warning: 'Downside deviation should typically be less than total volatility' };
  }
  
  return { isValid: true };
}

function validateSemiDeviation(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Semi-deviation cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Semi-deviation cannot exceed 100%' };
  }
  
  if (allInputs.annualVolatility > 0 && value > allInputs.annualVolatility) {
    return { isValid: true, warning: 'Semi-deviation should typically be less than total volatility' };
  }
  
  return { isValid: true };
}

function validateSkewness(value: number): QuickValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Skewness cannot be less than -10' };
  }
  
  if (value > 10) {
    return { isValid: false, error: 'Skewness cannot exceed 10' };
  }
  
  return { isValid: true };
}

function validateKurtosis(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Kurtosis cannot be negative' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Kurtosis cannot exceed 50' };
  }
  
  return { isValid: true };
}

function validateBenchmarkReturn(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Benchmark return cannot be less than -100%' };
  }
  
  if (value > 1000) {
    return { isValid: true, warning: 'Benchmark return seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateBenchmarkVolatility(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Benchmark volatility cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Benchmark volatility cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateRiskFreeRate(value: number): QuickValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Risk-free rate cannot be less than -10%' };
  }
  
  if (value > 20) {
    return { isValid: false, error: 'Risk-free rate cannot exceed 20%' };
  }
  
  return { isValid: true };
}

function validateSP500Return(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'S&P 500 return cannot be less than -100%' };
  }
  
  if (value > 1000) {
    return { isValid: true, warning: 'S&P 500 return seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateBondReturn(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Bond return cannot be less than -100%' };
  }
  
  if (value > 1000) {
    return { isValid: true, warning: 'Bond return seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateInternationalReturn(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'International return cannot be less than -100%' };
  }
  
  if (value > 1000) {
    return { isValid: true, warning: 'International return seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateUpsideCaptureRatio(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Upside capture ratio cannot be negative' };
  }
  
  if (value > 200) {
    return { isValid: false, error: 'Upside capture ratio cannot exceed 200%' };
  }
  
  if (allInputs.downsideCaptureRatio > 0 && value < allInputs.downsideCaptureRatio) {
    return { isValid: true, warning: 'Upside capture ratio should typically be greater than downside capture ratio' };
  }
  
  return { isValid: true };
}

function validateDownsideCaptureRatio(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Downside capture ratio cannot be negative' };
  }
  
  if (value > 200) {
    return { isValid: false, error: 'Downside capture ratio cannot exceed 200%' };
  }
  
  if (allInputs.upsideCaptureRatio > 0 && value > allInputs.upsideCaptureRatio) {
    return { isValid: true, warning: 'Downside capture ratio should typically be less than upside capture ratio' };
  }
  
  return { isValid: true };
}

function validateWinRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Win rate cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Win rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateProfitFactor(value: number, allInputs: HedgeFundInputs): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Profit factor cannot be negative' };
  }
  
  if (value > 10) {
    return { isValid: true, warning: 'Profit factor seems unusually high, please verify' };
  }
  
  if (allInputs.winRate > 0 && value < 1) {
    return { isValid: true, warning: 'Fund with positive win rate should typically have profit factor greater than 1' };
  }
  
  return { isValid: true };
}

function validateAverageWin(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Average win cannot be less than -100%' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Average win cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateAverageLoss(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Average loss cannot be less than -100%' };
  }
  
  if (value > 0) {
    return { isValid: false, error: 'Average loss should be negative' };
  }
  
  return { isValid: true };
}

function validateCorrelationWithBenchmark(value: number): QuickValidationResult {
  if (value < -1) {
    return { isValid: false, error: 'Correlation cannot be less than -1' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Correlation cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateRSquared(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'R-squared cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'R-squared cannot exceed 1' };
  }
  
  return { isValid: true };
}