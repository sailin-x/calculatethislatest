import { Calculator } from '../../engines/CalculatorEngine';
import { registerRealEstateDepreciationScheduleCalculatorInputs, registerRealEstateDepreciationScheduleCalculatorResults, registerRealEstateDepreciationScheduleCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRealEstateDepreciationScheduleCalculatorCalculator implements Calculator<registerRealEstateDepreciationScheduleCalculatorInputs, registerRealEstateDepreciationScheduleCalculatorResults> {
  readonly id = 'registerRealEstateDepreciationScheduleCalculator';
  readonly name = 'registerRealEstateDepreciationScheduleCalculator Calculator';
  readonly description = 'Calculate registerRealEstateDepreciationScheduleCalculator values';

  calculate(inputs: registerRealEstateDepreciationScheduleCalculatorInputs): registerRealEstateDepreciationScheduleCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRealEstateDepreciationScheduleCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRealEstateDepreciationScheduleCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
