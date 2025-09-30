import { Calculator } from '../../engines/CalculatorEngine';
import { complex_numbersCalculatorInputs, complex_numbersCalculatorResults, complex_numbersCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class complex_numbersCalculatorCalculator implements Calculator<complex_numbersCalculatorInputs, complex_numbersCalculatorResults> {
  readonly id = 'complex_numbersCalculator';
  readonly name = 'complex_numbersCalculator Calculator';
  readonly description = 'Calculate complex_numbersCalculator values';

  calculate(inputs: complex_numbersCalculatorInputs): complex_numbersCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: complex_numbersCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: complex_numbersCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
