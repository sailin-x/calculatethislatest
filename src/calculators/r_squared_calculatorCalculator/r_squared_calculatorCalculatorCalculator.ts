import { Calculator } from '../../engines/CalculatorEngine';
import { r_squared_calculatorCalculatorInputs, r_squared_calculatorCalculatorResults, r_squared_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class r_squared_calculatorCalculatorCalculator implements Calculator<r_squared_calculatorCalculatorInputs, r_squared_calculatorCalculatorResults> {
  readonly id = 'r_squared_calculatorCalculator';
  readonly name = 'r_squared_calculatorCalculator Calculator';
  readonly description = 'Calculate r_squared_calculatorCalculator values';

  calculate(inputs: r_squared_calculatorCalculatorInputs): r_squared_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: r_squared_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: r_squared_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
