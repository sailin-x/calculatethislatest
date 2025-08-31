import { RiskManagementCalculatorInputs } from './types';

export interface QuickValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(
  fieldName: string,
  value: any,
  allInputs: RiskManagementCalculatorInputs
): QuickValidationResult {
  const fieldPath = fieldName.split('.');
  
  // Portfolio info validations
  if (fieldPath[0] === 'portfolioInfo') {
    return validatePortfolioInfoField(fieldPath, value, allInputs);
  }
  
  // Risk metrics validations
  if (fieldPath[0] === 'riskMetrics') {
    return validateRiskMetricsField(fieldPath, value, allInputs);
  }
  
  // Risk factors validations
  if (fieldPath[0] === 'riskFactors') {
    return validateRiskFactorsField(fieldPath, value, allInputs);
  }
  
  // Stress testing validations
  if (fieldPath[0] === 'stressTesting') {
    return validateStressTestingField(fieldPath, value, allInputs);
  }
  
  // Risk limits validations
  if (fieldPath[0] === 'riskLimits') {
    return validateRiskLimitsField(fieldPath, value, allInputs);
  }
  
  // Monitoring validations
  if (fieldPath[0] === 'monitoring') {
    return validateMonitoringField(fieldPath, value, allInputs);
  }
  
  return { isValid: true };
}

function validatePortfolioInfoField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (fieldPath[1] === 'basicInfo') {
    return validateBasicInfoField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'portfolioHoldings') {
    return validateHoldingsField(fieldPath, value, allInputs);
  }
  
  return { isValid: true };
}

function validateBasicInfoField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'portfolioName':
      return validatePortfolioName(value);
    case 'portfolioType':
      return validatePortfolioType(value);
    case 'totalValue':
      return validateTotalValue(value);
    case 'currency':
      return validateCurrency(value);
    case 'investmentHorizon':
      return validateInvestmentHorizon(value);
    case 'riskTolerance':
      return validateRiskTolerance(value);
    case 'liquidityRequirements':
      return validateLiquidityRequirements(value);
    default:
      return { isValid: true };
  }
}

function validatePortfolioName(value: string): QuickValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Portfolio name is required' };
  }
  
  if (value.length > 100) {
    return { isValid: false, error: 'Portfolio name must be 100 characters or less' };
  }
  
  if (value.length < 3) {
    return { isValid: false, warning: 'Portfolio name should be at least 3 characters' };
  }
  
  return { isValid: true };
}

function validatePortfolioType(value: string): QuickValidationResult {
  const validTypes = ['equity', 'fixed_income', 'balanced', 'alternative', 'multi_asset'];
  
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid portfolio type' };
  }
  
  return { isValid: true };
}

function validateTotalValue(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Total portfolio value must be non-negative' };
  }
  
  if (value > 1000000000000) {
    return { isValid: false, error: 'Total portfolio value must be less than 1 trillion' };
  }
  
  if (value === 0) {
    return { isValid: false, warning: 'Portfolio value is zero - add some holdings' };
  }
  
  if (value < 1000) {
    return { isValid: false, warning: 'Very small portfolio value detected' };
  }
  
  return { isValid: true };
}

function validateCurrency(value: string): QuickValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  
  return { isValid: true };
}

function validateInvestmentHorizon(value: number): QuickValidationResult {
  if (value < 1 || value > 50) {
    return { isValid: false, error: 'Investment horizon must be between 1 and 50 years' };
  }
  
  if (value < 5) {
    return { isValid: false, warning: 'Short investment horizon may limit growth potential' };
  }
  
  if (value > 30) {
    return { isValid: false, warning: 'Very long investment horizon - consider shorter-term goals' };
  }
  
  return { isValid: true };
}

function validateRiskTolerance(value: string): QuickValidationResult {
  const validTolerances = ['conservative', 'moderate', 'aggressive', 'very_aggressive'];
  
  if (!validTolerances.includes(value)) {
    return { isValid: false, error: 'Invalid risk tolerance' };
  }
  
  return { isValid: true };
}

function validateLiquidityRequirements(value: string): QuickValidationResult {
  const validRequirements = ['high', 'medium', 'low'];
  
  if (!validRequirements.includes(value)) {
    return { isValid: false, error: 'Invalid liquidity requirements' };
  }
  
  return { isValid: true };
}

function validateHoldingsField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Portfolio holdings must be an array' };
  }
  
  if (value.length === 0) {
    return { isValid: false, warning: 'No holdings added to portfolio' };
  }
  
  // Check for duplicate assets
  const assetNames = value.map((holding: any) => holding.asset).filter(Boolean);
  const uniqueAssets = new Set(assetNames);
  if (assetNames.length !== uniqueAssets.size) {
    return { isValid: false, error: 'Duplicate assets detected in portfolio' };
  }
  
  // Check total weight
  const totalWeight = value.reduce((sum: number, holding: any) => sum + (holding.weight || 0), 0);
  if (Math.abs(totalWeight - 1) > 0.01) {
    return { isValid: false, warning: `Portfolio weights sum to ${(totalWeight * 100).toFixed(1)}% (should be 100%)` };
  }
  
  return { isValid: true };
}

function validateRiskMetricsField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (fieldPath[1] === 'valueAtRisk') {
    return validateVaRField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'volatilityMetrics') {
    return validateVolatilityField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'downsideRisk') {
    return validateDownsideRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'drawdownMetrics') {
    return validateDrawdownField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'correlationMetrics') {
    return validateCorrelationField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'betaMetrics') {
    return validateBetaField(fieldPath, value, allInputs);
  }
  
  return { isValid: true };
}

function validateVaRField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'varConfidenceLevel':
      if (value < 0.5 || value > 0.999) {
        return { isValid: false, error: 'VaR confidence level must be between 0.5 and 0.999' };
      }
      if (value < 0.9) {
        return { isValid: false, warning: 'Low confidence level may not capture extreme risks' };
      }
      break;
    case 'varTimeHorizon':
      if (value < 1 || value > 365) {
        return { isValid: false, error: 'VaR time horizon must be between 1 and 365 days' };
      }
      if (value > 30) {
        return { isValid: false, warning: 'Long VaR horizon may not reflect short-term risks' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateVolatilityField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'portfolioVolatility':
    case 'annualizedVolatility':
      if (value < 0 || value > 1) {
        return { isValid: false, error: 'Volatility must be between 0 and 1' };
      }
      if (value > 0.5) {
        return { isValid: false, warning: 'Very high volatility detected' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateDownsideRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'downsideDeviation':
    case 'semiDeviation':
      if (value < 0) {
        return { isValid: false, error: 'Downside deviation must be non-negative' };
      }
      if (value > 0.3) {
        return { isValid: false, warning: 'High downside deviation indicates significant downside risk' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateDrawdownField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'maxDrawdown':
    case 'currentDrawdown':
      if (value < 0 || value > 1) {
        return { isValid: false, error: 'Drawdown must be between 0 and 1' };
      }
      if (value > 0.2) {
        return { isValid: false, warning: 'High drawdown indicates significant portfolio decline' };
      }
      break;
    case 'calmarRatio':
      if (value < -10 || value > 10) {
        return { isValid: false, error: 'Calmar ratio must be between -10 and 10' };
      }
      if (value < 0.5) {
        return { isValid: false, warning: 'Low Calmar ratio indicates poor risk-adjusted returns' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateCorrelationField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'portfolioCorrelation':
    case 'averageCorrelation':
      if (value < -1 || value > 1) {
        return { isValid: false, error: 'Correlation must be between -1 and 1' };
      }
      if (value > 0.8) {
        return { isValid: false, warning: 'High correlation may indicate poor diversification' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateBetaField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'portfolioBeta':
    case 'weightedBeta':
      if (value < -5 || value > 5) {
        return { isValid: false, error: 'Beta must be between -5 and 5' };
      }
      if (value > 1.5) {
        return { isValid: false, warning: 'High beta indicates high market sensitivity' };
      }
      if (value < 0) {
        return { isValid: false, warning: 'Negative beta indicates inverse market relationship' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateRiskFactorsField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (fieldPath[1] === 'marketRisk') {
    return validateMarketRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'factorRisk') {
    return validateFactorRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'sectorRisk') {
    return validateSectorRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'geographicRisk') {
    return validateGeographicRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'liquidityRisk') {
    return validateLiquidityRiskField(fieldPath, value, allInputs);
  }
  
  if (fieldPath[1] === 'concentrationRisk') {
    return validateConcentrationRiskField(fieldPath, value, allInputs);
  }
  
  return { isValid: true };
}

function validateMarketRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  if (value < 0 || value > 1) {
    return { isValid: false, error: `${field} risk must be between 0 and 1` };
  }
  
  if (value > 0.7) {
    return { isValid: false, warning: `High ${field} risk detected` };
  }
  
  return { isValid: true };
}

function validateFactorRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  if (value < 0 || value > 1) {
    return { isValid: false, error: `${field} risk must be between 0 and 1` };
  }
  
  if (value > 0.6) {
    return { isValid: false, warning: `High ${field} risk detected` };
  }
  
  return { isValid: true };
}

function validateSectorRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  if (value < 0 || value > 1) {
    return { isValid: false, error: `${field} risk must be between 0 and 1` };
  }
  
  if (value > 0.5) {
    return { isValid: false, warning: `High ${field} risk detected` };
  }
  
  return { isValid: true };
}

function validateGeographicRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  if (value < 0 || value > 1) {
    return { isValid: false, error: `${field} risk must be between 0 and 1` };
  }
  
  if (value > 0.6) {
    return { isValid: false, warning: `High ${field} risk detected` };
  }
  
  return { isValid: true };
}

function validateLiquidityRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'bidAskSpread':
    case 'liquidityScore':
    case 'illiquidAssets':
      if (value < 0 || value > 1) {
        return { isValid: false, error: `${field} must be between 0 and 1` };
      }
      if (value > 0.5) {
        return { isValid: false, warning: `High ${field} indicates liquidity concerns` };
      }
      break;
    case 'marketDepth':
    case 'tradingVolume':
      if (value < 0) {
        return { isValid: false, error: `${field} must be non-negative` };
      }
      if (value < 1000000) {
        return { isValid: false, warning: `Low ${field} may indicate liquidity issues` };
      }
      break;
  }
  
  return { isValid: true };
}

function validateConcentrationRiskField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  if (value < 0 || value > 1) {
    return { isValid: false, error: `${field} must be between 0 and 1` };
  }
  
  if (value > 0.3) {
    return { isValid: false, warning: `High ${field} indicates concentration risk` };
  }
  
  return { isValid: true };
}

function validateStressTestingField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (fieldPath[1] === 'scenarios') {
    if (!Array.isArray(value)) {
      return { isValid: false, error: 'Stress testing scenarios must be an array' };
    }
    
    if (value.length === 0) {
      return { isValid: false, warning: 'No stress testing scenarios defined' };
    }
  }
  
  if (fieldPath[1] === 'stressTestResults') {
    return validateStressTestResultsField(fieldPath, value, allInputs);
  }
  
  return { isValid: true };
}

function validateStressTestResultsField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  const field = fieldPath[2];
  
  switch (field) {
    case 'worstCaseScenario':
    case 'bestCaseScenario':
    case 'expectedScenario':
      if (value < -1 || value > 1) {
        return { isValid: false, error: `${field} must be between -1 and 1` };
      }
      break;
    case 'stressTestScore':
      if (value < 0 || value > 1) {
        return { isValid: false, error: 'Stress test score must be between 0 and 1' };
      }
      if (value < 0.5) {
        return { isValid: false, warning: 'Low stress test score indicates vulnerability' };
      }
      break;
  }
  
  return { isValid: true };
}

function validateRiskLimitsField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Risk limits must be an array' };
  }
  
  if (value.length === 0) {
    return { isValid: false, warning: 'No risk limits defined' };
  }
  
  return { isValid: true };
}

function validateMonitoringField(fieldPath: string[], value: any, allInputs: RiskManagementCalculatorInputs): QuickValidationResult {
  if (fieldPath[1] === 'alerts' || fieldPath[1] === 'reports' || fieldPath[1] === 'dashboards') {
    if (!Array.isArray(value)) {
      return { isValid: false, error: `${fieldPath[1]} must be an array` };
    }
  }
  
  if (fieldPath[1] === 'monitoringScore') {
    if (value < 0 || value > 1) {
      return { isValid: false, error: 'Monitoring score must be between 0 and 1' };
    }
    if (value < 0.6) {
      return { isValid: false, warning: 'Low monitoring score indicates inadequate oversight' };
    }
  }
  
  return { isValid: true };
}