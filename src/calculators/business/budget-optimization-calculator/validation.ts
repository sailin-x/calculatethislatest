import { ValidationRuleFactory } from '../../utils/validation-rule-factory';
import { BudgetOptimizationInputs } from './types';

export const budgetOptimizationValidationRules = [
  // Required fields
  ValidationRuleFactory.required('budgetInfo.totalBudget', 'Total budget is required'),
  ValidationRuleFactory.required('budgetInfo.budgetPeriod', 'Budget period is required'),
  ValidationRuleFactory.required('budgetInfo.budgetType', 'Budget type is required'),
  ValidationRuleFactory.required('budgetInfo.budgetYear', 'Budget year is required'),
  ValidationRuleFactory.required('revenue.totalRevenue', 'Total revenue is required'),
  ValidationRuleFactory.required('objectives.primaryObjective', 'Primary objective is required'),
  ValidationRuleFactory.required('objectives.targetSavings', 'Target savings is required'),
  ValidationRuleFactory.required('objectives.targetROI', 'Target ROI is required'),
  ValidationRuleFactory.required('objectives.riskTolerance', 'Risk tolerance is required'),
  
  // Numeric ranges
  ValidationRuleFactory.range('budgetInfo.totalBudget', 1000, 1000000000, 'Total budget must be between $1,000 and $1 billion'),
  ValidationRuleFactory.range('budgetInfo.budgetPeriod', 1, 60, 'Budget period must be between 1 and 60 months'),
  ValidationRuleFactory.range('budgetInfo.budgetYear', 2020, 2030, 'Budget year must be between 2020 and 2030'),
  ValidationRuleFactory.range('revenue.totalRevenue', 1000, 1000000000, 'Total revenue must be between $1,000 and $1 billion'),
  ValidationRuleFactory.range('revenue.revenueGrowth', -50, 200, 'Revenue growth must be between -50% and 200%'),
  ValidationRuleFactory.range('revenue.revenueVolatility', 0, 100, 'Revenue volatility must be between 0% and 100%'),
  ValidationRuleFactory.range('objectives.targetSavings', 0, 100, 'Target savings must be between 0% and 100%'),
  ValidationRuleFactory.range('objectives.targetROI', -100, 1000, 'Target ROI must be between -100% and 1000%'),
  ValidationRuleFactory.range('objectives.targetEfficiency', 0, 100, 'Target efficiency must be between 0% and 100%'),
  ValidationRuleFactory.range('objectives.riskTolerance', 1, 10, 'Risk tolerance must be between 1 and 10'),
  
  // Personnel expenses
  ValidationRuleFactory.range('expenses.personnel.salaries', 0, 100000000, 'Salaries must be between $0 and $100 million'),
  ValidationRuleFactory.range('expenses.personnel.benefits', 0, 50000000, 'Benefits must be between $0 and $50 million'),
  ValidationRuleFactory.range('expenses.personnel.training', 0, 10000000, 'Training must be between $0 and $10 million'),
  ValidationRuleFactory.range('expenses.personnel.recruitment', 0, 5000000, 'Recruitment must be between $0 and $5 million'),
  ValidationRuleFactory.range('expenses.personnel.overtime', 0, 20000000, 'Overtime must be between $0 and $20 million'),
  ValidationRuleFactory.range('expenses.personnel.contractors', 0, 30000000, 'Contractors must be between $0 and $30 million'),
  
  // Operations expenses
  ValidationRuleFactory.range('expenses.operations.rent', 0, 50000000, 'Rent must be between $0 and $50 million'),
  ValidationRuleFactory.range('expenses.operations.utilities', 0, 20000000, 'Utilities must be between $0 and $20 million'),
  ValidationRuleFactory.range('expenses.operations.maintenance', 0, 15000000, 'Maintenance must be between $0 and $15 million'),
  ValidationRuleFactory.range('expenses.operations.supplies', 0, 10000000, 'Supplies must be between $0 and $10 million'),
  ValidationRuleFactory.range('expenses.operations.equipment', 0, 25000000, 'Equipment must be between $0 and $25 million'),
  ValidationRuleFactory.range('expenses.operations.insurance', 0, 10000000, 'Insurance must be between $0 and $10 million'),
  
  // Marketing expenses
  ValidationRuleFactory.range('expenses.marketing.advertising', 0, 50000000, 'Advertising must be between $0 and $50 million'),
  ValidationRuleFactory.range('expenses.marketing.promotions', 0, 20000000, 'Promotions must be between $0 and $20 million'),
  ValidationRuleFactory.range('expenses.marketing.events', 0, 15000000, 'Events must be between $0 and $15 million'),
  ValidationRuleFactory.range('expenses.marketing.digitalMarketing', 0, 30000000, 'Digital marketing must be between $0 and $30 million'),
  ValidationRuleFactory.range('expenses.marketing.publicRelations', 0, 10000000, 'Public relations must be between $0 and $10 million'),
  ValidationRuleFactory.range('expenses.marketing.marketResearch', 0, 8000000, 'Market research must be between $0 and $8 million'),
  
  // Technology expenses
  ValidationRuleFactory.range('expenses.technology.software', 0, 40000000, 'Software must be between $0 and $40 million'),
  ValidationRuleFactory.range('expenses.technology.hardware', 0, 30000000, 'Hardware must be between $0 and $30 million'),
  ValidationRuleFactory.range('expenses.technology.ITservices', 0, 25000000, 'IT services must be between $0 and $25 million'),
  ValidationRuleFactory.range('expenses.technology.cybersecurity', 0, 15000000, 'Cybersecurity must be between $0 and $15 million'),
  ValidationRuleFactory.range('expenses.technology.dataStorage', 0, 12000000, 'Data storage must be between $0 and $12 million'),
  ValidationRuleFactory.range('expenses.technology.systemMaintenance', 0, 18000000, 'System maintenance must be between $0 and $18 million'),
  
  // Sales expenses
  ValidationRuleFactory.range('expenses.sales.commissions', 0, 40000000, 'Commissions must be between $0 and $40 million'),
  ValidationRuleFactory.range('expenses.sales.travel', 0, 15000000, 'Travel must be between $0 and $15 million'),
  ValidationRuleFactory.range('expenses.sales.entertainment', 0, 8000000, 'Entertainment must be between $0 and $8 million'),
  ValidationRuleFactory.range('expenses.sales.salesTools', 0, 12000000, 'Sales tools must be between $0 and $12 million'),
  ValidationRuleFactory.range('expenses.sales.leadGeneration', 0, 20000000, 'Lead generation must be between $0 and $20 million'),
  ValidationRuleFactory.range('expenses.sales.customerSupport', 0, 18000000, 'Customer support must be between $0 and $18 million'),
  
  // Administration expenses
  ValidationRuleFactory.range('expenses.administration.legal', 0, 15000000, 'Legal must be between $0 and $15 million'),
  ValidationRuleFactory.range('expenses.administration.accounting', 0, 12000000, 'Accounting must be between $0 and $12 million'),
  ValidationRuleFactory.range('expenses.administration.consulting', 0, 20000000, 'Consulting must be between $0 and $20 million'),
  ValidationRuleFactory.range('expenses.administration.officeSupplies', 0, 5000000, 'Office supplies must be between $0 and $5 million'),
  ValidationRuleFactory.range('expenses.administration.communication', 0, 8000000, 'Communication must be between $0 and $8 million'),
  ValidationRuleFactory.range('expenses.administration.miscellaneous', 0, 10000000, 'Miscellaneous must be between $0 and $10 million'),
  
  // Performance metrics
  ValidationRuleFactory.range('performanceMetrics.currentEfficiency', 0, 100, 'Current efficiency must be between 0% and 100%'),
  ValidationRuleFactory.range('performanceMetrics.costEffectiveness', 0, 100, 'Cost effectiveness must be between 0% and 100%'),
  ValidationRuleFactory.range('performanceMetrics.revenueImpact', 0, 100, 'Revenue impact must be between 0% and 100%'),
  ValidationRuleFactory.range('performanceMetrics.qualityMetrics', 0, 100, 'Quality metrics must be between 0% and 100%'),
  ValidationRuleFactory.range('performanceMetrics.customerSatisfaction', 0, 100, 'Customer satisfaction must be between 0% and 100%'),
  ValidationRuleFactory.range('performanceMetrics.employeeSatisfaction', 0, 100, 'Employee satisfaction must be between 0% and 100%'),
  
  // Market conditions
  ValidationRuleFactory.range('marketConditions.inflationRate', -10, 50, 'Inflation rate must be between -10% and 50%'),
  ValidationRuleFactory.range('marketConditions.interestRate', 0, 30, 'Interest rate must be between 0% and 30%'),
  ValidationRuleFactory.range('marketConditions.marketVolatility', 0, 100, 'Market volatility must be between 0% and 100%'),
  ValidationRuleFactory.range('marketConditions.competitivePressure', 1, 10, 'Competitive pressure must be between 1 and 10'),
  
  // Risk factors
  ValidationRuleFactory.range('riskFactors.revenueRisk', 1, 10, 'Revenue risk must be between 1 and 10'),
  ValidationRuleFactory.range('riskFactors.costRisk', 1, 10, 'Cost risk must be between 1 and 10'),
  ValidationRuleFactory.range('riskFactors.operationalRisk', 1, 10, 'Operational risk must be between 1 and 10'),
  ValidationRuleFactory.range('riskFactors.marketRisk', 1, 10, 'Market risk must be between 1 and 10'),
  ValidationRuleFactory.range('riskFactors.regulatoryRisk', 1, 10, 'Regulatory risk must be between 1 and 10'),
  ValidationRuleFactory.range('riskFactors.technologyRisk', 1, 10, 'Technology risk must be between 1 and 10'),
  
  // Cross-field validations
  ValidationRuleFactory.custom('budgetInfo.totalBudget', (value, allInputs) => {
    if (!allInputs) return null;
    const totalExpenses = this.calculateTotalExpenses(allInputs.expenses);
    if (value < totalExpenses * 0.8) {
      return 'Total budget should be at least 80% of total expenses';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('revenue.totalRevenue', (value, allInputs) => {
    if (!allInputs) return null;
    const totalBudget = allInputs.budgetInfo?.totalBudget;
    if (totalBudget && value < totalBudget * 0.5) {
      return 'Total revenue should be at least 50% of total budget';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('objectives.targetSavings', (value, allInputs) => {
    if (!allInputs) return null;
    const totalBudget = allInputs.budgetInfo?.totalBudget;
    if (totalBudget && value > totalBudget * 0.3) {
      return 'Target savings should not exceed 30% of total budget';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('objectives.riskTolerance', (value, allInputs) => {
    if (!allInputs) return null;
    const primaryObjective = allInputs.objectives?.primaryObjective;
    if (primaryObjective === 'risk-minimization' && value > 5) {
      return 'Risk tolerance should be low (1-5) for risk-minimization objective';
    }
    if (primaryObjective === 'profit-maximization' && value < 6) {
      return 'Risk tolerance should be higher (6-10) for profit-maximization objective';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('performanceMetrics.currentEfficiency', (value, allInputs) => {
    if (!allInputs) return null;
    const targetEfficiency = allInputs.objectives?.targetEfficiency;
    if (targetEfficiency && value > targetEfficiency) {
      return 'Current efficiency should not exceed target efficiency';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('marketConditions.inflationRate', (value, allInputs) => {
    if (!allInputs) return null;
    const interestRate = allInputs.marketConditions?.interestRate;
    if (interestRate && value > interestRate) {
      return 'Inflation rate should not exceed interest rate';
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('riskFactors', (value, allInputs) => {
    if (!allInputs) return null;
    const riskTolerance = allInputs.objectives?.riskTolerance;
    if (riskTolerance) {
      const avgRisk = Object.values(value).reduce((sum, risk) => sum + risk, 0) / Object.values(value).length;
      if (riskTolerance < 5 && avgRisk > 7) {
        return 'Average risk factors should be low for conservative risk tolerance';
      }
      if (riskTolerance > 7 && avgRisk < 4) {
        return 'Risk factors should reflect higher risk for aggressive risk tolerance';
      }
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('expenses', (value, allInputs) => {
    if (!allInputs) return null;
    const totalBudget = allInputs.budgetInfo?.totalBudget;
    if (totalBudget) {
      const totalExpenses = this.calculateTotalExpenses(value);
      if (totalExpenses > totalBudget * 1.2) {
        return 'Total expenses should not exceed 120% of total budget';
      }
      if (totalExpenses < totalBudget * 0.5) {
        return 'Total expenses should be at least 50% of total budget';
      }
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('revenue.revenueStreams', (value, allInputs) => {
    if (!allInputs) return null;
    const totalRevenue = allInputs.revenue?.totalRevenue;
    if (totalRevenue && value.length > 0) {
      const streamTotal = value.reduce((sum, stream) => sum + stream.amount, 0);
      if (Math.abs(streamTotal - totalRevenue) > totalRevenue * 0.1) {
        return 'Revenue streams total should be within 10% of total revenue';
      }
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('constraints.mandatoryExpenses', (value, allInputs) => {
    if (!allInputs) return null;
    const totalBudget = allInputs.budgetInfo?.totalBudget;
    if (totalBudget && value.length > 0) {
      const mandatoryTotal = value.reduce((sum, expense) => sum + expense.minimumAmount, 0);
      if (mandatoryTotal > totalBudget * 0.8) {
        return 'Mandatory expenses should not exceed 80% of total budget';
      }
    }
    return null;
  }),
  
  ValidationRuleFactory.custom('scenarios', (value, allInputs) => {
    if (!allInputs) return null;
    if (value.length > 0) {
      const totalProbability = value.reduce((sum, scenario) => sum + scenario.probability, 0);
      if (Math.abs(totalProbability - 100) > 5) {
        return 'Scenario probabilities should sum to approximately 100%';
      }
    }
    return null;
  })
];

// Helper function to calculate total expenses
function calculateTotalExpenses(expenses: BudgetOptimizationInputs['expenses']): number {
  const personnel = Object.values(expenses.personnel).reduce((sum, val) => sum + val, 0);
  const operations = Object.values(expenses.operations).reduce((sum, val) => sum + val, 0);
  const marketing = Object.values(expenses.marketing).reduce((sum, val) => sum + val, 0);
  const technology = Object.values(expenses.technology).reduce((sum, val) => sum + val, 0);
  const sales = Object.values(expenses.sales).reduce((sum, val) => sum + val, 0);
  const administration = Object.values(expenses.administration).reduce((sum, val) => sum + val, 0);
  
  return personnel + operations + marketing + technology + sales + administration;
}

export function validateBudgetOptimizationInputs(inputs: BudgetOptimizationInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const rule of budgetOptimizationValidationRules) {
    const error = rule.validate(inputs);
    if (error) {
      errors.push(error);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
