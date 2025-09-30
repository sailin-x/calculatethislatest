import { Calculator } from '../../engines/CalculatorEngine';
import { free_cash_flow_to_equity_calculatorCalculatorInputs, free_cash_flow_to_equity_calculatorCalculatorResults, free_cash_flow_to_equity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class free_cash_flow_to_equity_calculatorCalculatorCalculator implements Calculator<free_cash_flow_to_equity_calculatorCalculatorInputs, free_cash_flow_to_equity_calculatorCalculatorResults> {
  readonly id = 'free_cash_flow_to_equity_calculatorCalculator';
  readonly name = 'free_cash_flow_to_equity_calculatorCalculator Calculator';
  readonly description = 'Calculate free_cash_flow_to_equity_calculatorCalculator values';

  calculate(inputs: free_cash_flow_to_equity_calculatorCalculatorInputs): free_cash_flow_to_equity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: free_cash_flow_to_equity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: free_cash_flow_to_equity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
