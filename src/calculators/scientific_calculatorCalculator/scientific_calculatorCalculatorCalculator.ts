import { Calculator } from '../../engines/CalculatorEngine';
import { scientific_calculatorCalculatorInputs, scientific_calculatorCalculatorResults, scientific_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class scientific_calculatorCalculatorCalculator implements Calculator<scientific_calculatorCalculatorInputs, scientific_calculatorCalculatorResults> {
  readonly id = 'scientific_calculatorCalculator';
  readonly name = 'scientific_calculatorCalculator Calculator';
  readonly description = 'Calculate scientific_calculatorCalculator values';

  calculate(inputs: scientific_calculatorCalculatorInputs): scientific_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: scientific_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: scientific_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
