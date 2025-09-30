import { Calculator } from '../../engines/CalculatorEngine';
import { thyroid_calculatorCalculatorInputs, thyroid_calculatorCalculatorResults, thyroid_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class thyroid_calculatorCalculatorCalculator implements Calculator<thyroid_calculatorCalculatorInputs, thyroid_calculatorCalculatorResults> {
  readonly id = 'thyroid_calculatorCalculator';
  readonly name = 'thyroid_calculatorCalculator Calculator';
  readonly description = 'Calculate thyroid_calculatorCalculator values';

  calculate(inputs: thyroid_calculatorCalculatorInputs): thyroid_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: thyroid_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: thyroid_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
