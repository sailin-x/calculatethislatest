import { Calculator } from '../../engines/CalculatorEngine';
import { fitness_calculatorCalculatorInputs, fitness_calculatorCalculatorResults, fitness_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fitness_calculatorCalculatorCalculator implements Calculator<fitness_calculatorCalculatorInputs, fitness_calculatorCalculatorResults> {
  readonly id = 'fitness_calculatorCalculator';
  readonly name = 'fitness_calculatorCalculator Calculator';
  readonly description = 'Calculate fitness_calculatorCalculator values';

  calculate(inputs: fitness_calculatorCalculatorInputs): fitness_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fitness_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fitness_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
