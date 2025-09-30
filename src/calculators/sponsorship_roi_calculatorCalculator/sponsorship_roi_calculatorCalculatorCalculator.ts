import { Calculator } from '../../engines/CalculatorEngine';
import { sponsorship_roi_calculatorCalculatorInputs, sponsorship_roi_calculatorCalculatorResults, sponsorship_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class sponsorship_roi_calculatorCalculatorCalculator implements Calculator<sponsorship_roi_calculatorCalculatorInputs, sponsorship_roi_calculatorCalculatorResults> {
  readonly id = 'sponsorship_roi_calculatorCalculator';
  readonly name = 'sponsorship_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate sponsorship_roi_calculatorCalculator values';

  calculate(inputs: sponsorship_roi_calculatorCalculatorInputs): sponsorship_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: sponsorship_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: sponsorship_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
