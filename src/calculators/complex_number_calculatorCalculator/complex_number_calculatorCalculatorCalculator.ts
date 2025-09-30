import { Calculator } from '../../engines/CalculatorEngine';
import { complex_number_calculatorCalculatorInputs, complex_number_calculatorCalculatorResults, complex_number_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class complex_number_calculatorCalculatorCalculator implements Calculator<complex_number_calculatorCalculatorInputs, complex_number_calculatorCalculatorResults> {
  readonly id = 'complex_number_calculatorCalculator';
  readonly name = 'complex_number_calculatorCalculator Calculator';
  readonly description = 'Calculate complex_number_calculatorCalculator values';

  calculate(inputs: complex_number_calculatorCalculatorInputs): complex_number_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: complex_number_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: complex_number_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
