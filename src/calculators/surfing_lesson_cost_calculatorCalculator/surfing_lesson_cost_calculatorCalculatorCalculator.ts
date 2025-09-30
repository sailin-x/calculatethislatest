import { Calculator } from '../../engines/CalculatorEngine';
import { surfing_lesson_cost_calculatorCalculatorInputs, surfing_lesson_cost_calculatorCalculatorResults, surfing_lesson_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class surfing_lesson_cost_calculatorCalculatorCalculator implements Calculator<surfing_lesson_cost_calculatorCalculatorInputs, surfing_lesson_cost_calculatorCalculatorResults> {
  readonly id = 'surfing_lesson_cost_calculatorCalculator';
  readonly name = 'surfing_lesson_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate surfing_lesson_cost_calculatorCalculator values';

  calculate(inputs: surfing_lesson_cost_calculatorCalculatorInputs): surfing_lesson_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: surfing_lesson_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: surfing_lesson_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
