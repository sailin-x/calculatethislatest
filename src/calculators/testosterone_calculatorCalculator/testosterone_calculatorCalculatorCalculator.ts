import { Calculator } from '../../engines/CalculatorEngine';
import { testosterone_calculatorCalculatorInputs, testosterone_calculatorCalculatorResults, testosterone_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class testosterone_calculatorCalculatorCalculator implements Calculator<testosterone_calculatorCalculatorInputs, testosterone_calculatorCalculatorResults> {
  readonly id = 'testosterone_calculatorCalculator';
  readonly name = 'testosterone_calculatorCalculator Calculator';
  readonly description = 'Calculate testosterone_calculatorCalculator values';

  calculate(inputs: testosterone_calculatorCalculatorInputs): testosterone_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: testosterone_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: testosterone_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
