import { Calculator } from '../../engines/CalculatorEngine';
import { fitness_age_calculatorCalculatorInputs, fitness_age_calculatorCalculatorResults, fitness_age_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fitness_age_calculatorCalculatorCalculator implements Calculator<fitness_age_calculatorCalculatorInputs, fitness_age_calculatorCalculatorResults> {
  readonly id = 'fitness_age_calculatorCalculator';
  readonly name = 'fitness_age_calculatorCalculator Calculator';
  readonly description = 'Calculate fitness_age_calculatorCalculator values';

  calculate(inputs: fitness_age_calculatorCalculatorInputs): fitness_age_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fitness_age_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fitness_age_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
