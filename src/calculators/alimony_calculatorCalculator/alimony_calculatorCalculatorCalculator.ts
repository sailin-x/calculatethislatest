import { Calculator } from '../../engines/CalculatorEngine';
import { alimony_calculatorCalculatorInputs, alimony_calculatorCalculatorResults, alimony_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class alimony_calculatorCalculatorCalculator implements Calculator<alimony_calculatorCalculatorInputs, alimony_calculatorCalculatorResults> {
  readonly id = 'alimony_calculatorCalculator';
  readonly name = 'alimony_calculatorCalculator Calculator';
  readonly description = 'Calculate alimony_calculatorCalculator values';

  calculate(inputs: alimony_calculatorCalculatorInputs): alimony_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: alimony_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: alimony_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
