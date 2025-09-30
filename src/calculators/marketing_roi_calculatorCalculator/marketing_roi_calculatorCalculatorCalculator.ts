import { Calculator } from '../../engines/CalculatorEngine';
import { marketing_roi_calculatorCalculatorInputs, marketing_roi_calculatorCalculatorResults, marketing_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class marketing_roi_calculatorCalculatorCalculator implements Calculator<marketing_roi_calculatorCalculatorInputs, marketing_roi_calculatorCalculatorResults> {
  readonly id = 'marketing_roi_calculatorCalculator';
  readonly name = 'marketing_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate marketing_roi_calculatorCalculator values';

  calculate(inputs: marketing_roi_calculatorCalculatorInputs): marketing_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: marketing_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: marketing_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
