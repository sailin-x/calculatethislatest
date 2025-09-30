import { Calculator } from '../../engines/CalculatorEngine';
import { registerSelfStorageFacilityROICalculatorInputs, registerSelfStorageFacilityROICalculatorResults, registerSelfStorageFacilityROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerSelfStorageFacilityROICalculatorCalculator implements Calculator<registerSelfStorageFacilityROICalculatorInputs, registerSelfStorageFacilityROICalculatorResults> {
  readonly id = 'registerSelfStorageFacilityROICalculator';
  readonly name = 'registerSelfStorageFacilityROICalculator Calculator';
  readonly description = 'Calculate registerSelfStorageFacilityROICalculator values';

  calculate(inputs: registerSelfStorageFacilityROICalculatorInputs): registerSelfStorageFacilityROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerSelfStorageFacilityROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerSelfStorageFacilityROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
