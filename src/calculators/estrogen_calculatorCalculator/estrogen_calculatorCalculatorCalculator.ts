import { Calculator } from '../../engines/CalculatorEngine';
import { estrogen_calculatorCalculatorInputs, estrogen_calculatorCalculatorResults, estrogen_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estrogen_calculatorCalculatorCalculator implements Calculator<estrogen_calculatorCalculatorInputs, estrogen_calculatorCalculatorResults> {
  readonly id = 'estrogen_calculatorCalculator';
  readonly name = 'estrogen_calculatorCalculator Calculator';
  readonly description = 'Calculate estrogen_calculatorCalculator values';

  calculate(inputs: estrogen_calculatorCalculatorInputs): estrogen_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estrogen_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estrogen_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
