import { Calculator } from '../../engines/CalculatorEngine';
import { fraction_calculatorCalculatorInputs, fraction_calculatorCalculatorResults, fraction_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fraction_calculatorCalculatorCalculator implements Calculator<fraction_calculatorCalculatorInputs, fraction_calculatorCalculatorResults> {
  readonly id = 'fraction_calculatorCalculator';
  readonly name = 'fraction_calculatorCalculator Calculator';
  readonly description = 'Calculate fraction_calculatorCalculator values';

  calculate(inputs: fraction_calculatorCalculatorInputs): fraction_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fraction_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fraction_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
