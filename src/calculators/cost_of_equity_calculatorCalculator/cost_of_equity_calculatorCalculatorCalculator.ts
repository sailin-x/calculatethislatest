import { Calculator } from '../../engines/CalculatorEngine';
import { cost_of_equity_calculatorCalculatorInputs, cost_of_equity_calculatorCalculatorResults, cost_of_equity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cost_of_equity_calculatorCalculatorCalculator implements Calculator<cost_of_equity_calculatorCalculatorInputs, cost_of_equity_calculatorCalculatorResults> {
  readonly id = 'cost_of_equity_calculatorCalculator';
  readonly name = 'cost_of_equity_calculatorCalculator Calculator';
  readonly description = 'Calculate cost_of_equity_calculatorCalculator values';

  calculate(inputs: cost_of_equity_calculatorCalculatorInputs): cost_of_equity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cost_of_equity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cost_of_equity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
