import { Calculator } from '../../engines/CalculatorEngine';
import { iso_9001_certification_roi_calculatorCalculatorInputs, iso_9001_certification_roi_calculatorCalculatorResults, iso_9001_certification_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class iso_9001_certification_roi_calculatorCalculatorCalculator implements Calculator<iso_9001_certification_roi_calculatorCalculatorInputs, iso_9001_certification_roi_calculatorCalculatorResults> {
  readonly id = 'iso_9001_certification_roi_calculatorCalculator';
  readonly name = 'iso_9001_certification_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate iso_9001_certification_roi_calculatorCalculator values';

  calculate(inputs: iso_9001_certification_roi_calculatorCalculatorInputs): iso_9001_certification_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: iso_9001_certification_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: iso_9001_certification_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
