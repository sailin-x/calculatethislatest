import { Calculator } from '../../engines/CalculatorEngine';
import { fitness_class_cost_calculatorCalculatorInputs, fitness_class_cost_calculatorCalculatorResults, fitness_class_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fitness_class_cost_calculatorCalculatorCalculator implements Calculator<fitness_class_cost_calculatorCalculatorInputs, fitness_class_cost_calculatorCalculatorResults> {
  readonly id = 'fitness_class_cost_calculatorCalculator';
  readonly name = 'fitness_class_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate fitness_class_cost_calculatorCalculator values';

  calculate(inputs: fitness_class_cost_calculatorCalculatorInputs): fitness_class_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fitness_class_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fitness_class_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
