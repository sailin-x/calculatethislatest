import { Calculator } from '../../engines/CalculatorEngine';
import { painting_cost_calculatorCalculatorInputs, painting_cost_calculatorCalculatorResults, painting_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class painting_cost_calculatorCalculatorCalculator implements Calculator<painting_cost_calculatorCalculatorInputs, painting_cost_calculatorCalculatorResults> {
  readonly id = 'painting_cost_calculatorCalculator';
  readonly name = 'painting_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate painting_cost_calculatorCalculator values';

  calculate(inputs: painting_cost_calculatorCalculatorInputs): painting_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: painting_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: painting_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
