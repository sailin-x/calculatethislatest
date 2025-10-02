import { ValidationRule, ValidationRuleFactory } from '../../utils/ValidationRuleFactory';
import { PaybackPeriodInputs } from './types';

export const paybackPeriodValidationRules: ValidationRule[] = [
  // Required fields
  ValidationRuleFactory.required('initialInvestment', 'Initial investment is required'),
  ValidationRuleFactory.required('annualCashFlow', 'Annual cash flow is required'),
  ValidationRuleFactory.required('monthlyCashFlow', 'Monthly cash flow is required'),
  ValidationRuleFactory.required('projectDuration', 'Project duration is required'),
  
  // Numeric ranges
  ValidationRuleFactory.range('initialInvestment', 0.01, 1000000000, 'Initial investment must be between $0.01 and $1 billion'),
  ValidationRuleFactory.range('annualCashFlow', -1000000000, 1000000000, 'Annual cash flow must be between -$1 billion and $1 billion'),
  ValidationRuleFactory.range('monthlyCashFlow', -1000000000, 1000000000, 'Monthly cash flow must be between -$1 billion and $1 billion'),
  ValidationRuleFactory.range('projectDuration', 1, 600, 'Project duration must be between 1 and 600 months'),
  
  // Revenue and cost validations
  ValidationRuleFactory.range('annualRevenue', 0, 1000000000, 'Annual revenue must be between $0 and $1 billion'),
  ValidationRuleFactory.range('annualCosts', 0, 1000000000, 'Annual costs must be between $0 and $1 billion'),
  ValidationRuleFactory.range('annualSavings', 0, 1000000000, 'Annual savings must be between $0 and $1 billion'),
  ValidationRuleFactory.range('annualExpenses', 0, 1000000000, 'Annual expenses must be between $0 and $1 billion'),
  
  // Rate validations
  ValidationRuleFactory.range('discountRate', 0, 100, 'Discount rate must be between 0% and 100%'),
  ValidationRuleFactory.range('inflationRate', 0, 100, 'Inflation rate must be between 0% and 100%'),
  ValidationRuleFactory.range('taxRate', 0, 100, 'Tax rate must be between 0% and 100%'),
  
  // Risk factor validations
  ValidationRuleFactory.range('competitivePressure', 1, 10, 'Competitive pressure must be between 1 and 10'),
  ValidationRuleFactory.range('regulatoryRisk', 1, 10, 'Regulatory risk must be between 1 and 10'),
  
  // Qualitative factor validations
  ValidationRuleFactory.range('strategicValue', 1, 10, 'Strategic value must be between 1 and 10'),
  ValidationRuleFactory.range('operationalEfficiency', 1, 10, 'Operational efficiency must be between 1 and 10'),
  ValidationRuleFactory.range('marketDemand', 1, 10, 'Market demand must be between 1 and 10'),
  ValidationRuleFactory.range('competitiveAdvantage', 1, 10, 'Competitive advantage must be between 1 and 10'),
  
  // Projection validations
  ValidationRuleFactory.range('projectionPeriod', 1, 120, 'Projection period must be between 1 and 120 months'),
  ValidationRuleFactory.range('expectedGrowthRate', -50, 500, 'Expected growth rate must be between -50% and 500%'),
  ValidationRuleFactory.range('expectedDecayRate', 0, 100, 'Expected decay rate must be between 0% and 100%'),
  ValidationRuleFactory.range('confidenceLevel', 0, 100, 'Confidence level must be between 0% and 100%'),
  
  // Scenario validations
  ValidationRuleFactory.range('bestCaseScenario', 0, 1000, 'Best case scenario must be between 0% and 1000%'),
  ValidationRuleFactory.range('worstCaseScenario', -100, 100, 'Worst case scenario must be between -100% and 100%'),
  ValidationRuleFactory.range('mostLikelyScenario', 0, 500, 'Most likely scenario must be between 0% and 500%'),
  
  // Additional factor validations
  ValidationRuleFactory.range('opportunityCost', 0, 100, 'Opportunity cost must be between 0% and 100%'),
  ValidationRuleFactory.range('costOfCapital', 0, 100, 'Cost of capital must be between 0% and 100%'),
  ValidationRuleFactory.range('hurdleRate', 0, 100, 'Hurdle rate must be between 0% and 100%'),
  
  // Cross-field validations
  ValidationRuleFactory.createRule('cashFlowConsistency', 'Annual and monthly cash flows should be consistent', (value: any, allInputs?: Record<string, any>) => {
    const annualCashFlow = allInputs?.annualCashFlow;
    const monthlyCashFlow = allInputs?.monthlyCashFlow;
    if (!annualCashFlow || !monthlyCashFlow) return true;
    
    const expectedMonthly = annualCashFlow / 12;
    const tolerance = Math.abs(expectedMonthly) * 0.2; // 20% tolerance
    return Math.abs(monthlyCashFlow - expectedMonthly) <= tolerance;
  }),
  
  ValidationRuleFactory.createRule('projectDuration', 'Project duration should be reasonable for the investment type', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    if (!investmentType || !value) return true;
    
    const maxDurations: Record<string, number> = {
      'marketing': 24,
      'software': 36,
      'equipment': 60,
      'real-estate': 300,
      'infrastructure': 120,
      'acquisition': 180,
      'expansion': 120,
      'r&d': 60,
      'business': 240,
      'other': 120
    };
    
    return value <= (maxDurations[investmentType] || 120);
  }),
  
  ValidationRuleFactory.createRule('discountRate', 'Discount rate should be reasonable for the investment type and risk level', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    const riskLevel = allInputs?.riskLevel;
    if (!value) return true;
    
    let maxRate = 20; // Default max 20%
    
    if (investmentType === 'r&d' || investmentType === 'startup') {
      maxRate = 50; // Higher risk investments
    } else if (investmentType === 'real-estate' || investmentType === 'infrastructure') {
      maxRate = 15; // Lower risk investments
    }
    
    if (riskLevel === 'high') {
      maxRate += 10; // Higher rates for high risk
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
  
  ValidationRuleFactory.createRule('cashFlowViability', 'Cash flows should be viable for payback', (value: any, allInputs?: Record<string, any>) => {
    const initialInvestment = allInputs?.initialInvestment;
    const annualCashFlow = allInputs?.annualCashFlow;
    const projectDuration = allInputs?.projectDuration;
    
    if (!initialInvestment || !annualCashFlow || !projectDuration) return true;
    
    // Check if total cash flow over project duration can cover investment
    const totalCashFlow = annualCashFlow * (projectDuration / 12);
    return totalCashFlow >= initialInvestment * 0.5; // At least 50% coverage
  }),
  
  ValidationRuleFactory.createRule('riskConsistency', 'Risk factors should be consistent with investment type', (value: any, allInputs?: Record<string, any>) => {
    const investmentType = allInputs?.investmentType;
    const riskLevel = allInputs?.riskLevel;
    const competitivePressure = allInputs?.competitivePressure;
    const regulatoryRisk = allInputs?.regulatoryRisk;
    
    if (!investmentType || !riskLevel) return true;
    
    let expectedRiskLevel = 'medium';
    
    if (investmentType === 'r&d' || investmentType === 'startup') {
      expectedRiskLevel = 'high';
    } else if (investmentType === 'real-estate' || investmentType === 'infrastructure') {
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
    const operationalEfficiency = allInputs?.operationalEfficiency;
    
    if (!businessStage || !strategicValue || !operationalEfficiency) return true;
    
    // Startups should have high strategic value
    if (businessStage === 'startup' && strategicValue < 7) {
      return false;
    }
    
    // Mature businesses should have good operational efficiency
    if (businessStage === 'mature' && operationalEfficiency < 6) {
      return false;
    }
    
    return true;
  })
];

export function validatePaybackPeriodInputs(
  inputs: PaybackPeriodInputs,
  allInputs?: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const rule of paybackPeriodValidationRules) {
    const value = inputs[rule.field as keyof PaybackPeriodInputs];
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
