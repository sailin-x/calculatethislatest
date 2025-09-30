import { Calculator } from '../../engines/CalculatorEngine';
import { selfStorageFacilityROICalculatorInputs, selfStorageFacilityROICalculatorResults, selfStorageFacilityROICalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class selfStorageFacilityROICalculatorCalculator implements Calculator<selfStorageFacilityROICalculatorInputs, selfStorageFacilityROICalculatorResults> {
  readonly id = 'selfStorageFacilityROICalculator';
  readonly name = 'selfStorageFacilityROICalculator Calculator';
  readonly description = 'Calculate selfStorageFacilityROICalculator values';

  calculate(inputs: selfStorageFacilityROICalculatorInputs): selfStorageFacilityROICalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: selfStorageFacilityROICalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: selfStorageFacilityROICalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
