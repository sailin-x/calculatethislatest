import { Calculator } from '../../engines/CalculatorEngine';
import { fertilizer_calculatorCalculatorInputs, fertilizer_calculatorCalculatorResults, fertilizer_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fertilizer_calculatorCalculatorCalculator implements Calculator<fertilizer_calculatorCalculatorInputs, fertilizer_calculatorCalculatorResults> {
  readonly id = 'fertilizer_calculatorCalculator';
  readonly name = 'fertilizer_calculatorCalculator Calculator';
  readonly description = 'Calculate fertilizer_calculatorCalculator values';

  calculate(inputs: fertilizer_calculatorCalculatorInputs): fertilizer_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fertilizer_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fertilizer_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
