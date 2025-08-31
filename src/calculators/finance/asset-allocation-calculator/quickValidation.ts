import { AssetAllocationCalculatorInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: string,
  value: any,
  allInputs: AssetAllocationCalculatorInputs
): QuickValidationResult {
  // Handle nested field paths
  const fieldPath = fieldName.split('.');
  
  // Basic portfolio info validation
  if (fieldPath[0] === 'portfolioInfo' && fieldPath[1] === 'basicInfo') {
    return validateBasicInfoField(fieldPath[2], value);
  }
  
  // Optimization settings validation
  if (fieldPath[0] === 'optimizationSettings') {
    if (fieldPath[1] === 'monteCarloSettings') {
      return validateMonteCarloField(fieldPath[2], value);
    }
    return validateOptimizationField(fieldPath[1], value, allInputs);
  }
  
  // Asset class validation
  if (fieldPath[0] === 'assetClasses') {
    return validateAssetClassField(fieldPath[1], fieldPath[2], fieldPath[3], value);
  }
  
  return { isValid: true };
}

function validateBasicInfoField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'portfolioName':
      return validatePortfolioName(value);
    case 'portfolioType':
      return validatePortfolioType(value);
    case 'totalValue':
      return validateTotalValue(value);
    case 'investmentHorizon':
      return validateInvestmentHorizon(value);
    case 'riskTolerance':
      return validateRiskTolerance(value);
    case 'liquidityRequirements':
      return validateLiquidityRequirements(value);
    case 'taxStatus':
      return validateTaxStatus(value);
    default:
      return { isValid: true };
  }
}

function validateOptimizationField(field: string, value: any, allInputs: AssetAllocationCalculatorInputs): QuickValidationResult {
  switch (field) {
    case 'optimizationMethod':
      return validateOptimizationMethod(value);
    case 'riskFreeRate':
      return validateRiskFreeRate(value);
    case 'targetReturn':
      return validateTargetReturn(value, allInputs);
    case 'targetVolatility':
      return validateTargetVolatility(value);
    case 'transactionCosts':
      return validateTransactionCosts(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    default:
      return { isValid: true };
  }
}

function validateMonteCarloField(field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'numberOfSimulations':
      return validateNumberOfSimulations(value);
    case 'timeHorizon':
      return validateTimeHorizon(value);
    case 'confidenceLevel':
      return validateConfidenceLevel(value);
    default:
      return { isValid: true };
  }
}

function validateAssetClassField(assetClass: string, subClass: string, field: string, value: any): QuickValidationResult {
  switch (field) {
    case 'expectedReturn':
      return validateExpectedReturn(value);
    case 'volatility':
      return validateVolatility(value);
    case 'correlation':
      return validateCorrelation(value);
    case 'beta':
      return validateBeta(value);
    case 'sharpeRatio':
      return validateSharpeRatio(value);
    case 'maxDrawdown':
      return validateMaxDrawdown(value);
    case 'liquidity':
      return validateLiquidity(value);
    case 'taxEfficiency':
      return validateTaxEfficiency(value);
    case 'minimumInvestment':
      return validateMinimumInvestment(value);
    case 'maximumInvestment':
      return validateMaximumInvestment(value);
    default:
      return { isValid: true };
  }
}

// Basic Info Validation Functions
function validatePortfolioName(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Portfolio name is required' };
  }
  
  if (value.trim().length === 0) {
    return { isValid: false, error: 'Portfolio name cannot be empty' };
  }
  
  if (value.length > 100) {
    return { isValid: false, error: 'Portfolio name cannot exceed 100 characters' };
  }
  
  return { isValid: true };
}

function validatePortfolioType(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Portfolio type is required' };
  }
  
  const validTypes = ['individual', 'institutional', 'endowment', 'pension', 'foundation'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid portfolio type' };
  }
  
  return { isValid: true };
}

function validateTotalValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Total portfolio value must be greater than 0' };
  }
  
  if (value > 10000000000) {
    return { isValid: true, warning: 'Total portfolio value seems unusually high, please verify' };
  }
  
  return { isValid: true };
}

function validateInvestmentHorizon(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Investment horizon must be greater than 0' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Investment horizon cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

function validateRiskTolerance(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Risk tolerance is required' };
  }
  
  const validLevels = ['very_conservative', 'conservative', 'moderate', 'aggressive', 'very_aggressive'];
  if (!validLevels.includes(value)) {
    return { isValid: false, error: 'Invalid risk tolerance level' };
  }
  
  return { isValid: true };
}

function validateLiquidityRequirements(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Liquidity requirements are required' };
  }
  
  const validLevels = ['high', 'medium', 'low'];
  if (!validLevels.includes(value)) {
    return { isValid: false, error: 'Invalid liquidity requirements level' };
  }
  
  return { isValid: true };
}

function validateTaxStatus(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Tax status is required' };
  }
  
  const validStatuses = ['taxable', 'tax_deferred', 'tax_free'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Invalid tax status' };
  }
  
  return { isValid: true };
}

// Optimization Settings Validation Functions
function validateOptimizationMethod(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Optimization method is required' };
  }
  
  const validMethods = ['mean-variance', 'black-litterman', 'risk-parity', 'maximum-sharpe', 'minimum-variance'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Invalid optimization method' };
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

function validateTargetReturn(value: number, allInputs: AssetAllocationCalculatorInputs): QuickValidationResult {
  if (value < -50) {
    return { isValid: false, error: 'Target return cannot be less than -50%' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Target return cannot exceed 100%' };
  }
  
  if (allInputs.optimizationSettings.riskFreeRate > 0 && value < allInputs.optimizationSettings.riskFreeRate) {
    return { isValid: true, warning: 'Target return should be greater than risk-free rate' };
  }
  
  return { isValid: true };
}

function validateTargetVolatility(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Target volatility cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Target volatility cannot exceed 100%' };
  }
  
  if (value < 1) {
    return { isValid: true, warning: 'Target volatility seems unusually low for a diversified portfolio' };
  }
  
  return { isValid: true };
}

function validateTransactionCosts(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Transaction costs cannot be negative' };
  }
  
  if (value > 10) {
    return { isValid: false, error: 'Transaction costs cannot exceed 10%' };
  }
  
  return { isValid: true };
}

function validateTaxRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Tax rate cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateInflationRate(value: number): QuickValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Inflation rate cannot be less than -10%' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Inflation rate cannot exceed 50%' };
  }
  
  return { isValid: true };
}

// Monte Carlo Settings Validation Functions
function validateNumberOfSimulations(value: number): QuickValidationResult {
  if (value < 1000) {
    return { isValid: false, error: 'Number of simulations must be at least 1000' };
  }
  
  if (value > 100000) {
    return { isValid: false, error: 'Number of simulations cannot exceed 100000' };
  }
  
  return { isValid: true };
}

function validateTimeHorizon(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Time horizon must be greater than 0' };
  }
  
  if (value > 50) {
    return { isValid: false, error: 'Time horizon cannot exceed 50 years' };
  }
  
  return { isValid: true };
}

function validateConfidenceLevel(value: number): QuickValidationResult {
  if (value < 0.5) {
    return { isValid: false, error: 'Confidence level must be at least 0.5' };
  }
  
  if (value > 0.999) {
    return { isValid: false, error: 'Confidence level cannot exceed 0.999' };
  }
  
  return { isValid: true };
}

// Asset Class Validation Functions
function validateExpectedReturn(value: number): QuickValidationResult {
  if (value < -100) {
    return { isValid: false, error: 'Expected return cannot be less than -100%' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Expected return cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateVolatility(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Volatility cannot be negative' };
  }
  
  if (value > 100) {
    return { isValid: false, error: 'Volatility cannot exceed 100%' };
  }
  
  return { isValid: true };
}

function validateCorrelation(value: number): QuickValidationResult {
  if (value < -1) {
    return { isValid: false, error: 'Correlation cannot be less than -1' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Correlation cannot exceed 1' };
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

function validateSharpeRatio(value: number): QuickValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Sharpe ratio cannot be less than -10' };
  }
  
  if (value > 10) {
    return { isValid: false, error: 'Sharpe ratio cannot exceed 10' };
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

function validateLiquidity(value: string): QuickValidationResult {
  if (!value) {
    return { isValid: false, error: 'Liquidity is required' };
  }
  
  const validLevels = ['high', 'medium', 'low'];
  if (!validLevels.includes(value)) {
    return { isValid: false, error: 'Liquidity must be high, medium, or low' };
  }
  
  return { isValid: true };
}

function validateTaxEfficiency(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Tax efficiency cannot be negative' };
  }
  
  if (value > 1) {
    return { isValid: false, error: 'Tax efficiency cannot exceed 1' };
  }
  
  return { isValid: true };
}

function validateMinimumInvestment(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Minimum investment cannot be negative' };
  }
  
  return { isValid: true };
}

function validateMaximumInvestment(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Maximum investment must be greater than 0' };
  }
  
  return { isValid: true };
}