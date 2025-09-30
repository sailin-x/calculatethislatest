import { Calculator } from '../../engines/CalculatorEngine';
import { registerRealEstateWaterfallModelCalculatorInputs, registerRealEstateWaterfallModelCalculatorResults, registerRealEstateWaterfallModelCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRealEstateWaterfallModelCalculatorCalculator implements Calculator<registerRealEstateWaterfallModelCalculatorInputs, registerRealEstateWaterfallModelCalculatorResults> {
  readonly id = 'registerRealEstateWaterfallModelCalculator';
  readonly name = 'registerRealEstateWaterfallModelCalculator Calculator';
  readonly description = 'Calculate registerRealEstateWaterfallModelCalculator values';

  calculate(inputs: registerRealEstateWaterfallModelCalculatorInputs): registerRealEstateWaterfallModelCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRealEstateWaterfallModelCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRealEstateWaterfallModelCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
