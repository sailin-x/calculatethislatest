import { Calculator } from '../../engines/CalculatorEngine';
import { franchise_roi_calculatorCalculatorInputs, franchise_roi_calculatorCalculatorResults, franchise_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class franchise_roi_calculatorCalculatorCalculator implements Calculator<franchise_roi_calculatorCalculatorInputs, franchise_roi_calculatorCalculatorResults> {
  readonly id = 'franchise_roi_calculatorCalculator';
  readonly name = 'franchise_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate franchise_roi_calculatorCalculator values';

  calculate(inputs: franchise_roi_calculatorCalculatorInputs): franchise_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: franchise_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: franchise_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
