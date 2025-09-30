import { Calculator } from '../../engines/CalculatorEngine';
import { golf_lesson_cost_calculatorCalculatorInputs, golf_lesson_cost_calculatorCalculatorResults, golf_lesson_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class golf_lesson_cost_calculatorCalculatorCalculator implements Calculator<golf_lesson_cost_calculatorCalculatorInputs, golf_lesson_cost_calculatorCalculatorResults> {
  readonly id = 'golf_lesson_cost_calculatorCalculator';
  readonly name = 'golf_lesson_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate golf_lesson_cost_calculatorCalculator values';

  calculate(inputs: golf_lesson_cost_calculatorCalculatorInputs): golf_lesson_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: golf_lesson_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: golf_lesson_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
