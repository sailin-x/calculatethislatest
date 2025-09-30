import { Calculator } from '../../engines/CalculatorEngine';
import { hobbies_calculatorCalculatorInputs, hobbies_calculatorCalculatorResults, hobbies_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hobbies_calculatorCalculatorCalculator implements Calculator<hobbies_calculatorCalculatorInputs, hobbies_calculatorCalculatorResults> {
  readonly id = 'hobbies_calculatorCalculator';
  readonly name = 'hobbies_calculatorCalculator Calculator';
  readonly description = 'Calculate hobbies_calculatorCalculator values';

  calculate(inputs: hobbies_calculatorCalculatorInputs): hobbies_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hobbies_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hobbies_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
