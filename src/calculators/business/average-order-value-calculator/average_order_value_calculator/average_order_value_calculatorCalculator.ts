import { Calculator } from '../../engines/CalculatorEngine';
import { average_order_value_calculatorInputs, average_order_value_calculatorResults, average_order_value_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class average_order_value_calculatorCalculator implements Calculator<average_order_value_calculatorInputs, average_order_value_calculatorResults> {
  readonly id = 'average_order_value_calculator';
  readonly name = 'average_order_value_calculator Calculator';
  readonly description = 'Calculate average_order_value_calculator values';

  calculate(inputs: average_order_value_calculatorInputs): average_order_value_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: average_order_value_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: average_order_value_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
