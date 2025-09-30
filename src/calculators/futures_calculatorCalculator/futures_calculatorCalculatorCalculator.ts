import { Calculator } from '../../engines/CalculatorEngine';
import { futures_calculatorCalculatorInputs, futures_calculatorCalculatorResults, futures_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class futures_calculatorCalculatorCalculator implements Calculator<futures_calculatorCalculatorInputs, futures_calculatorCalculatorResults> {
  readonly id = 'futures_calculatorCalculator';
  readonly name = 'futures_calculatorCalculator Calculator';
  readonly description = 'Calculate futures_calculatorCalculator values';

  calculate(inputs: futures_calculatorCalculatorInputs): futures_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: futures_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: futures_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
