import { Calculator } from '../../engines/CalculatorEngine';
import { change_management_roi_calculatorCalculatorInputs, change_management_roi_calculatorCalculatorResults, change_management_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class change_management_roi_calculatorCalculatorCalculator implements Calculator<change_management_roi_calculatorCalculatorInputs, change_management_roi_calculatorCalculatorResults> {
  readonly id = 'change_management_roi_calculatorCalculator';
  readonly name = 'change_management_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate change_management_roi_calculatorCalculator values';

  calculate(inputs: change_management_roi_calculatorCalculatorInputs): change_management_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: change_management_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: change_management_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
