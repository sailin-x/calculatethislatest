import { Calculator } from '../../engines/CalculatorEngine';
import { tennis_lesson_cost_calculatorCalculatorInputs, tennis_lesson_cost_calculatorCalculatorResults, tennis_lesson_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tennis_lesson_cost_calculatorCalculatorCalculator implements Calculator<tennis_lesson_cost_calculatorCalculatorInputs, tennis_lesson_cost_calculatorCalculatorResults> {
  readonly id = 'tennis_lesson_cost_calculatorCalculator';
  readonly name = 'tennis_lesson_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate tennis_lesson_cost_calculatorCalculator values';

  calculate(inputs: tennis_lesson_cost_calculatorCalculatorInputs): tennis_lesson_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tennis_lesson_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tennis_lesson_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
