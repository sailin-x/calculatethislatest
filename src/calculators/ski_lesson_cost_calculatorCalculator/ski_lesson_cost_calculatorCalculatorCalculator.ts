import { Calculator } from '../../engines/CalculatorEngine';
import { ski_lesson_cost_calculatorCalculatorInputs, ski_lesson_cost_calculatorCalculatorResults, ski_lesson_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ski_lesson_cost_calculatorCalculatorCalculator implements Calculator<ski_lesson_cost_calculatorCalculatorInputs, ski_lesson_cost_calculatorCalculatorResults> {
  readonly id = 'ski_lesson_cost_calculatorCalculator';
  readonly name = 'ski_lesson_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate ski_lesson_cost_calculatorCalculator values';

  calculate(inputs: ski_lesson_cost_calculatorCalculatorInputs): ski_lesson_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ski_lesson_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ski_lesson_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
