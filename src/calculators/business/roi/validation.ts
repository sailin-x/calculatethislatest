import { ValidationRule, ValidationRuleFactory } from '../../../utils/ValidationRuleFactory';
import { ROIInputs } from './types';

export const roiValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('initialInvestment', 'Initial investment is required'),
  ValidationRuleFactory.required('finalValue', 'Final value is required'),
  ValidationRuleFactory.required('totalReturn', 'Total return is required'),
  ValidationRuleFactory.required('investmentPeriod', 'Investment period is required'),
  
  // Numeric ranges
  ValidationRuleFactory.range('initialInvestment', 0.01, 1000000000, 'Initial investment must be between $0.01 and $1 billion'),
  ValidationRuleFactory.range('finalValue', 0, 1000000000, 'Final value must be between $0 and $1 billion'),
  ValidationRuleFactory.range('totalReturn', 0, 1000000000, 'Total return must be between $0 and $1 billion'),
  ValidationRuleFactory.range('investmentPeriod', 1, 600, 'Investment period must be between 1 and 600 months'),
  
  // Revenue and cost validations
  ValidationRuleFactory.range('additionalRevenue', 0, 1000000000, 'Additional revenue must be between $0 and $1 billion'),
  ValidationRuleFactory.range('costSavings', 0, 1000000000, 'Cost savings must be between $0 and $1 billion'),
  ValidationRuleFactory.range('operationalCosts', 0, 1000000000, 'Operational costs must be between $0 and $1 billion'),
  ValidationRuleFactory.range('maintenanceCosts', 0, 1000000000, 'Maintenance costs must be between $0 and $1 billion'),
  ValidationRuleFactory.range('marketingCosts', 0, 1000000000, 'Marketing costs must be between $0 and $1 billion'),
  ValidationRuleFactory.range('personnelCosts', 0, 1000000000, 'Personnel costs must be between $0 and $1 billion'),
  
  // Rate validations
  ValidationRuleFactory.range('discountRate', 0, 100, 'Discount rate must be between 0% and 100%'),
  ValidationRuleFactory.range('inflationRate', 0, 100, 'Inflation rate must be between 0% and 100%'),
  ValidationRuleFactory.range('opportunityCost', 0, 100, 'Opportunity cost must be between 0% and 100%'),
  ValidationRuleFactory.range('taxRate', 0, 100, 'Tax rate must be between 0% and 100%'),
  ValidationRuleFactory.range('depreciationRate', 0, 100, 'Depreciation rate must be between 0% and 100%'),
  
  // Risk factor validations
  ValidationRuleFactory.range('competitivePressure', 1, 10, 'Competitive pressure must be between 1 and 10'),
  ValidationRuleFactory.range('regulatoryRisk', 1, 10, 'Regulatory risk must be between 1 and 10'),
  
  // Qualitative factor validations
  ValidationRuleFactory.range('strategicValue', 1, 10, 'Strategic value must be between 1 and 10'),
  ValidationRuleFactory.range('marketPositioning', 1, 10, 'Market positioning must be between 1 and 10'),
  ValidationRuleFactory.range('competitiveAdvantage', 1, 10, 'Competitive advantage must be between 1 and 10'),
  ValidationRuleFactory.range('scalability', 1, 10, 'Scalability must be between 1 and 10'),
  
  // Projection validations
  ValidationRuleFactory.range('projectionPeriod', 1, 120, 'Projection period must be between 1 and 120 months'),
  ValidationRuleFactory.range('growthRate', -50, 500, 'Growth rate must be between -50% and 500%'),
  ValidationRuleFactory.range('decayRate', 0, 100, 'Decay rate must be between 0% and 100%'),
  
  // Scenario validations
  ValidationRuleFactory.range('bestCaseScenario', 0, 1000, 'Best case scenario must be between 0% and 1000%'),
  ValidationRuleFactory.range('worstCaseScenario', -100, 100, 'Worst case scenario must be between -100% and 100%'),
  ValidationRuleFactory.range('mostLikelyScenario', 0, 500, 'Most likely scenario must be between 0% and 500%'),
  
  // Cross-field validations
  ValidationRuleFactory.createRule('finalValue', 'Final value should be reasonable relative to initial investment', (value: any, allInputs?: Record<string, any>) => {
    const initialInvestment = allInputs?.initialInvestment;
    if (!initialInvestment || !value) return true;
    
    const ratio = value / initialInvestment;
    return ratio >= 0.1 && ratio <= 100; // Allow 10% to 100x return
  }),
  
  ValidationRuleFactory.createRule('totalReturn', 'Total return should be consistent with final value and initial investment', (value: any, allInputs?: Record<string, any>) => {
    const initialInvestment = allInputs?.initialInvestment;
    const finalValue = allInputs?.finalValue;
    if (!initialInvestment || !finalValue || !value) return true;
    
    const expectedReturn = finalValue - initialInvestment;
    const tolerance = Math.abs(expectedReturn) * 0.1; // 10% tolerance
    return Math.abs(value - expectedReturn) <= tolerance;
  }),
  
  ValidationRuleFactory.createRule('investmentPeriod', 'Investment period should be reasonable for the investment type', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    if (!investmentType || !value) return true;
    
    const maxPeriods: Record<string, number> = {
      'marketing': 12,
      'advertising': 6,
      'software': 36,
      'equipment': 60,
      'real-estate': 300,
      'startup': 120,
      'business': 240,
      'stocks': 120,
      'crypto': 60,
      'other': 120
    };
    
    return value <= (maxPeriods[investmentType] || 120);
  }),
  
  ValidationRuleFactory.createRule('discountRate', 'Discount rate should be reasonable for the investment type and market conditions', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    const marketConditions = allInputs?.marketConditions;
    if (!value) return true;
    
    let maxRate = 20; // Default max 20%
    
    if (investmentType === 'crypto' || investmentType === 'startup') {
      maxRate = 50; // Higher risk investments
    } else if (investmentType === 'real-estate') {
      maxRate = 15; // Lower risk investments
    }
    
    if (marketConditions === 'recession') {
      maxRate += 10; // Higher rates in recession
    }
    
    return value <= maxRate;
  }),
  
  ValidationRuleFactory.createRule('scenarioConsistency', 'Scenario values should be logically consistent', (value: any, allInputs?: Record<string, any>) => {
    const bestCase = allInputs?.bestCaseScenario;
    const worstCase = allInputs?.worstCaseScenario;
    const mostLikely = allInputs?.mostLikelyScenario;
    
    if (!bestCase || !worstCase || !mostLikely) return true;
    
    return worstCase <= mostLikely && mostLikely <= bestCase;
  }),
  
  ValidationRuleFactory.createRule('cashFlowConsistency', 'Cash flows should be reasonable relative to investment size', (value: any, allInputs?: Record<string, any>) => {
    const initialInvestment = allInputs?.initialInvestment;
    const cashFlows = allInputs?.cashFlows;
    
    if (!initialInvestment || !cashFlows || !Array.isArray(cashFlows)) return true;
    
    const totalCashFlow = cashFlows.reduce((sum, flow) => {
      return sum + (flow.type === 'inflow' ? flow.amount : -flow.amount);
    }, 0);
    
    const ratio = Math.abs(totalCashFlow) / initialInvestment;
    return ratio <= 10; // Cash flows shouldn't exceed 10x investment
  }),
  
  ValidationRuleFactory.createRule('riskConsistency', 'Risk factors should be consistent with investment type', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    const riskLevel = allInputs?.riskLevel;
    const competitivePressure = allInputs?.competitivePressure;
    const regulatoryRisk = allInputs?.regulatoryRisk;
    
    if (!investmentType || !riskLevel) return true;
    
    let expectedRiskLevel = 'medium';
    
    if (investmentType === 'crypto' || investmentType === 'startup') {
      expectedRiskLevel = 'high';
    } else if (investmentType === 'real-estate' || investmentType === 'equipment') {
      expectedRiskLevel = 'low';
    }
    
    // Allow some flexibility but flag major inconsistencies
    if (expectedRiskLevel === 'high' && riskLevel === 'low') {
      return competitivePressure <= 5 && regulatoryRisk <= 5;
    }
    
    if (expectedRiskLevel === 'low' && riskLevel === 'high') {
      return competitivePressure >= 8 || regulatoryRisk >= 8;
    }
    
    return true;
  }),
  
  ValidationRuleFactory.createRule('qualitativeConsistency', 'Qualitative factors should be consistent with business context', (value: any, allInputs?: Record<string, any>) => {
    const businessStage = allInputs?.businessStage;
    const strategicValue = allInputs?.strategicValue;
    const scalability = allInputs?.scalability;
    
    if (!businessStage || !strategicValue || !scalability) return true;
    
    // Startups should have high strategic value and scalability
    if (businessStage === 'startup' && (strategicValue < 7 || scalability < 7)) {
      return false;
    }
    
    // Mature businesses might have lower scalability but higher strategic value
    if (businessStage === 'mature' && scalability > 8) {
      return strategicValue >= 6;
    }
    
    return true;
  })
];

export function validateROIInputs(
  inputs: ROIInputs,
  allInputs?: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const rule of roiValidationRules) {
    const value = inputs[rule.field as keyof ROIInputs];
    const isValid = rule.validate(value, allInputs);
    
    if (!isValid) {
      errors.push(rule.message);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
