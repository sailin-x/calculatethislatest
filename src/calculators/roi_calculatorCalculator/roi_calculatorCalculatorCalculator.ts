import { Calculator } from '../../engines/CalculatorEngine';
import { roi_calculatorCalculatorInputs, roi_calculatorCalculatorResults, roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roi_calculatorCalculatorCalculator implements Calculator<roi_calculatorCalculatorInputs, roi_calculatorCalculatorResults> {
  readonly id = 'roi_calculatorCalculator';
  readonly name = 'roi_calculatorCalculator Calculator';
  readonly description = 'Calculate roi_calculatorCalculator values';

  calculate(inputs: roi_calculatorCalculatorInputs): roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
