import { Calculator } from '../../engines/CalculatorEngine';
import { matrix_calculatorCalculatorInputs, matrix_calculatorCalculatorResults, matrix_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class matrix_calculatorCalculatorCalculator implements Calculator<matrix_calculatorCalculatorInputs, matrix_calculatorCalculatorResults> {
  readonly id = 'matrix_calculatorCalculator';
  readonly name = 'matrix_calculatorCalculator Calculator';
  readonly description = 'Calculate matrix_calculatorCalculator values';

  calculate(inputs: matrix_calculatorCalculatorInputs): matrix_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: matrix_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: matrix_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
