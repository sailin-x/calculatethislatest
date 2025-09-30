import { Calculator } from '../../engines/CalculatorEngine';
import { average_order_value_calculatorCalculatorInputs, average_order_value_calculatorCalculatorResults, average_order_value_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class average_order_value_calculatorCalculatorCalculator implements Calculator<average_order_value_calculatorCalculatorInputs, average_order_value_calculatorCalculatorResults> {
  readonly id = 'average_order_value_calculatorCalculator';
  readonly name = 'average_order_value_calculatorCalculator Calculator';
  readonly description = 'Calculate average_order_value_calculatorCalculator values';

  calculate(inputs: average_order_value_calculatorCalculatorInputs): average_order_value_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: average_order_value_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: average_order_value_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
