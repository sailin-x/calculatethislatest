import { Calculator } from '../../engines/CalculatorEngine';
import { quick_ratio_calculatorCalculatorInputs, quick_ratio_calculatorCalculatorResults, quick_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class quick_ratio_calculatorCalculatorCalculator implements Calculator<quick_ratio_calculatorCalculatorInputs, quick_ratio_calculatorCalculatorResults> {
  readonly id = 'quick_ratio_calculatorCalculator';
  readonly name = 'quick_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate quick_ratio_calculatorCalculator values';

  calculate(inputs: quick_ratio_calculatorCalculatorInputs): quick_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: quick_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: quick_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
