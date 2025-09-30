import { Calculator } from '../../engines/CalculatorEngine';
import { realEstateDepreciationScheduleCalculatorInputs, realEstateDepreciationScheduleCalculatorResults, realEstateDepreciationScheduleCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class realEstateDepreciationScheduleCalculatorCalculator implements Calculator<realEstateDepreciationScheduleCalculatorInputs, realEstateDepreciationScheduleCalculatorResults> {
  readonly id = 'realEstateDepreciationScheduleCalculator';
  readonly name = 'realEstateDepreciationScheduleCalculator Calculator';
  readonly description = 'Calculate realEstateDepreciationScheduleCalculator values';

  calculate(inputs: realEstateDepreciationScheduleCalculatorInputs): realEstateDepreciationScheduleCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: realEstateDepreciationScheduleCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: realEstateDepreciationScheduleCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
