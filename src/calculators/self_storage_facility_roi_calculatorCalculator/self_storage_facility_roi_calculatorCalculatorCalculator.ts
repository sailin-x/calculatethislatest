import { Calculator } from '../../engines/CalculatorEngine';
import { self_storage_facility_roi_calculatorCalculatorInputs, self_storage_facility_roi_calculatorCalculatorResults, self_storage_facility_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class self_storage_facility_roi_calculatorCalculatorCalculator implements Calculator<self_storage_facility_roi_calculatorCalculatorInputs, self_storage_facility_roi_calculatorCalculatorResults> {
  readonly id = 'self_storage_facility_roi_calculatorCalculator';
  readonly name = 'self_storage_facility_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate self_storage_facility_roi_calculatorCalculator values';

  calculate(inputs: self_storage_facility_roi_calculatorCalculatorInputs): self_storage_facility_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: self_storage_facility_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: self_storage_facility_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
