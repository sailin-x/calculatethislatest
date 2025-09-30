import { Calculator } from '../../engines/CalculatorEngine';
import { realEstateWaterfallModelCalculatorInputs, realEstateWaterfallModelCalculatorResults, realEstateWaterfallModelCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class realEstateWaterfallModelCalculatorCalculator implements Calculator<realEstateWaterfallModelCalculatorInputs, realEstateWaterfallModelCalculatorResults> {
  readonly id = 'realEstateWaterfallModelCalculator';
  readonly name = 'realEstateWaterfallModelCalculator Calculator';
  readonly description = 'Calculate realEstateWaterfallModelCalculator values';

  calculate(inputs: realEstateWaterfallModelCalculatorInputs): realEstateWaterfallModelCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: realEstateWaterfallModelCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: realEstateWaterfallModelCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
