import { Calculator } from '../../engines/CalculatorEngine';
import { free_cash_flow_to_equity_fcfe_valuationCalculatorInputs, free_cash_flow_to_equity_fcfe_valuationCalculatorResults, free_cash_flow_to_equity_fcfe_valuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class free_cash_flow_to_equity_fcfe_valuationCalculatorCalculator implements Calculator<free_cash_flow_to_equity_fcfe_valuationCalculatorInputs, free_cash_flow_to_equity_fcfe_valuationCalculatorResults> {
  readonly id = 'free_cash_flow_to_equity_fcfe_valuationCalculator';
  readonly name = 'free_cash_flow_to_equity_fcfe_valuationCalculator Calculator';
  readonly description = 'Calculate free_cash_flow_to_equity_fcfe_valuationCalculator values';

  calculate(inputs: free_cash_flow_to_equity_fcfe_valuationCalculatorInputs): free_cash_flow_to_equity_fcfe_valuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: free_cash_flow_to_equity_fcfe_valuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: free_cash_flow_to_equity_fcfe_valuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
