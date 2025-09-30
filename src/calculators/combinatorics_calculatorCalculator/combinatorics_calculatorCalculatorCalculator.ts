import { Calculator } from '../../engines/CalculatorEngine';
import { combinatorics_calculatorCalculatorInputs, combinatorics_calculatorCalculatorResults, combinatorics_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class combinatorics_calculatorCalculatorCalculator implements Calculator<combinatorics_calculatorCalculatorInputs, combinatorics_calculatorCalculatorResults> {
  readonly id = 'combinatorics_calculatorCalculator';
  readonly name = 'combinatorics_calculatorCalculator Calculator';
  readonly description = 'Calculate combinatorics_calculatorCalculator values';

  calculate(inputs: combinatorics_calculatorCalculatorInputs): combinatorics_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: combinatorics_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: combinatorics_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
