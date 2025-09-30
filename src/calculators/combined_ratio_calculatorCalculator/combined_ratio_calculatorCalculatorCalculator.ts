import { Calculator } from '../../engines/CalculatorEngine';
import { combined_ratio_calculatorCalculatorInputs, combined_ratio_calculatorCalculatorResults, combined_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class combined_ratio_calculatorCalculatorCalculator implements Calculator<combined_ratio_calculatorCalculatorInputs, combined_ratio_calculatorCalculatorResults> {
  readonly id = 'combined_ratio_calculatorCalculator';
  readonly name = 'combined_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate combined_ratio_calculatorCalculator values';

  calculate(inputs: combined_ratio_calculatorCalculatorInputs): combined_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: combined_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: combined_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
