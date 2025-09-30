import { Calculator } from '../../engines/CalculatorEngine';
import { reverse_mortgage_calculatorCalculatorInputs, reverse_mortgage_calculatorCalculatorResults, reverse_mortgage_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class reverse_mortgage_calculatorCalculatorCalculator implements Calculator<reverse_mortgage_calculatorCalculatorInputs, reverse_mortgage_calculatorCalculatorResults> {
  readonly id = 'reverse_mortgage_calculatorCalculator';
  readonly name = 'reverse_mortgage_calculatorCalculator Calculator';
  readonly description = 'Calculate reverse_mortgage_calculatorCalculator values';

  calculate(inputs: reverse_mortgage_calculatorCalculatorInputs): reverse_mortgage_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: reverse_mortgage_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: reverse_mortgage_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
