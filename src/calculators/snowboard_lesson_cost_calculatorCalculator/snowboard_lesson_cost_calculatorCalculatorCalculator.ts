import { Calculator } from '../../engines/CalculatorEngine';
import { snowboard_lesson_cost_calculatorCalculatorInputs, snowboard_lesson_cost_calculatorCalculatorResults, snowboard_lesson_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class snowboard_lesson_cost_calculatorCalculatorCalculator implements Calculator<snowboard_lesson_cost_calculatorCalculatorInputs, snowboard_lesson_cost_calculatorCalculatorResults> {
  readonly id = 'snowboard_lesson_cost_calculatorCalculator';
  readonly name = 'snowboard_lesson_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate snowboard_lesson_cost_calculatorCalculator values';

  calculate(inputs: snowboard_lesson_cost_calculatorCalculatorInputs): snowboard_lesson_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: snowboard_lesson_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: snowboard_lesson_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
