import { ValidationRule } from '../../../types/calculator';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Portfolio optimization calculator validation rules
 */
export const portfolioValidationRules: ValidationRule[] = [
  // Basic required fields
  ValidationRuleFactory.required('totalInvestment', 'Total investment amount is required'),
  ValidationRuleFactory.required('timeHorizon', 'Investment time horizon is required'),
  ValidationRuleFactory.required('riskTolerance', 'Risk tolerance is required'),
  ValidationRuleFactory.required('rebalanceFrequency', 'Rebalancing frequency is required'),

  // Investment amount validation
  ValidationRuleFactory.range('totalInvestment', 1000, 100000000, 'Investment amount must be between $1,000 and $100,000,000'),

  // Time horizon validation
  ValidationRuleFactory.range('timeHorizon', 1, 50, 'Time horizon must be between 1 and 50 years'),

  // Expected inflation validation
  ValidationRuleFactory.range('expectedInflation', -2, 15, 'Expected inflation must be between -2% and 15%'),

  // Tax rate validation
  ValidationRuleFactory.businessRule(
    'taxRate',
    (taxRate, allInputs) => {
      if (taxRate === undefined || taxRate === null || taxRate === '') return true;
      return taxRate >= 0 && taxRate <= 50;
    },
    'Tax rate must be between 0% and 50%'
  ),

  // Asset allocation validation - must sum to 100%
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets) || assets.length === 0) return false;
      const totalAllocation = assets.reduce((sum: number, asset: any) => sum + (asset.allocation || 0), 0);
      return Math.abs(totalAllocation - 100) < 0.01; // Allow for small rounding errors
    },
    'Asset allocations must sum to 100%'
  ),

  // Minimum number of assets
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return false;
      return assets.length >= 2;
    },
    'Portfolio must contain at least 2 assets for diversification'
  ),

  // Maximum number of assets
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      return assets.length <= 20;
    },
    'Portfolio should not exceed 20 assets to maintain manageability'
  ),

  // Individual asset allocation validation
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      return assets.every((asset: any) => {
        return asset.allocation >= 0 && asset.allocation <= 100;
      });
    },
    'Each asset allocation must be between 0% and 100%'
  ),

  // Expected return validation for individual assets
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      return assets.every((asset: any) => {
        return asset.expectedReturn >= -50 && asset.expectedReturn <= 100;
      });
    },
    'Asset expected returns must be between -50% and 100%'
  ),

  // Standard deviation validation for individual assets
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      return assets.every((asset: any) => {
        return asset.standardDeviation >= 0 && asset.standardDeviation <= 200;
      });
    },
    'Asset standard deviation must be between 0% and 200%'
  ),

  // Risk tolerance vs asset allocation consistency
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets) || !allInputs?.riskTolerance) return true;
      
      const stockAllocation = assets
        .filter((asset: any) => asset.assetClass === 'stocks')
        .reduce((sum: number, asset: any) => sum + asset.allocation, 0);
      
      const riskTolerance = allInputs?.riskTolerance;
      
      // Conservative: 10-50% stocks, Moderate: 40-80% stocks, Aggressive: 60-100% stocks
      if (riskTolerance === 'conservative' && stockAllocation > 50) {
        return false;
      }
      if (riskTolerance === 'moderate' && (stockAllocation < 30 || stockAllocation > 80)) {
        return false;
      }
      if (riskTolerance === 'aggressive' && stockAllocation < 50) {
        return false;
      }
      
      return true;
    },
    'Asset allocation should align with selected risk tolerance'
  ),

  // Time horizon vs risk tolerance consistency
  ValidationRuleFactory.businessRule(
    'timeHorizon',
    (timeHorizon, allInputs) => {
      if (!allInputs?.riskTolerance) return true;
      
      // Short time horizons should be more conservative
      if (timeHorizon < 5 && allInputs?.riskTolerance === 'aggressive') {
        // This is a warning, not an error
        return true;
      }
      
      return true;
    },
    'Consider more conservative allocation for shorter time horizons'
  ),

  // Diversification check
  ValidationRuleFactory.businessRule(
    'assets',
    (assets) => {
      if (!Array.isArray(assets)) return true;
      
      // Check if any single asset exceeds 50% allocation
      const maxAllocation = Math.max(...assets.map((asset: any) => asset.allocation || 0));
      if (maxAllocation > 50) {
        return false;
      }
      
      return true;
    },
    'No single asset should exceed 50% of portfolio for proper diversification'
  ),

  // Asset class diversification
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      
      const assetClasses = new Set(assets.map((asset: any) => asset.assetClass));
      return assetClasses.size >= 2;
    },
    'Portfolio should include at least 2 different asset classes'
  ),

  // Reasonable expected returns check
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets)) return true;
      
      return assets.every((asset: any) => {
        const expectedReturn = asset.expectedReturn || 0;
        const volatility = asset.standardDeviation || 0;
        
        // Sharpe ratio check - expected return shouldn't be too high relative to risk
        if (volatility > 0) {
          const impliedSharpe = (expectedReturn - 3) / volatility; // Assuming 3% risk-free rate
          return impliedSharpe <= 2.0; // Sharpe ratios above 2 are extremely rare
        }
        
        return true;
      });
    },
    'Expected returns seem unrealistic relative to risk levels'
  ),

  // Cash allocation warning for long-term portfolios
  ValidationRuleFactory.businessRule(
    'assets',
    (assets, allInputs) => {
      if (!Array.isArray(assets) || !allInputs?.timeHorizon) return true;
      
      const cashAllocation = assets
        .filter((asset: any) => asset.assetClass === 'cash')
        .reduce((sum: number, asset: any) => sum + asset.allocation, 0);
      
      // Warning for high cash allocation in long-term portfolios
      if (allInputs?.timeHorizon > 10 && cashAllocation > 20) {
        // This is a warning, not an error
        return true;
      }
      
      return true;
    },
    'High cash allocation may limit long-term growth potential'
  )
];

/**
 * Get validation rules for portfolio calculator
 */
export function getPortfolioValidationRules(): ValidationRule[] {
  return portfolioValidationRules;
}

/**
 * Asset class information for validation context
 */
export const assetClassInfo = {
  stocks: {
    typicalReturn: '8-12%',
    typicalVolatility: '15-25%',
    description: 'Equity investments with higher growth potential and volatility'
  },
  bonds: {
    typicalReturn: '3-6%',
    typicalVolatility: '3-8%',
    description: 'Fixed income investments providing steady returns with lower volatility'
  },
  commodities: {
    typicalReturn: '4-8%',
    typicalVolatility: '20-30%',
    description: 'Physical goods and raw materials, inflation hedge'
  },
  reits: {
    typicalReturn: '6-10%',
    typicalVolatility: '15-20%',
    description: 'Real Estate Investment Trusts providing income and diversification'
  },
  cash: {
    typicalReturn: '1-4%',
    typicalVolatility: '0-2%',
    description: 'Cash equivalents and money market instruments'
  },
  alternatives: {
    typicalReturn: '5-15%',
    typicalVolatility: '10-25%',
    description: 'Alternative investments like hedge funds, private equity, etc.'
  }
};

/**
 * Risk tolerance guidelines
 */
export const riskToleranceGuidelines = {
  conservative: {
    description: 'Prioritizes capital preservation over growth',
    typicalAllocation: 'Stocks: 20-40%, Bonds: 50-70%, Alternatives: 5-15%',
    suitableFor: 'Near retirement, low risk tolerance, short time horizon'
  },
  moderate: {
    description: 'Balanced approach between growth and stability',
    typicalAllocation: 'Stocks: 50-70%, Bonds: 25-40%, Alternatives: 5-15%',
    suitableFor: 'Medium-term goals, moderate risk tolerance, 5-15 year horizon'
  },
  aggressive: {
    description: 'Maximizes growth potential, accepts higher volatility',
    typicalAllocation: 'Stocks: 70-90%, Bonds: 5-20%, Alternatives: 5-15%',
    suitableFor: 'Long-term goals, high risk tolerance, 15+ year horizon'
  }
};