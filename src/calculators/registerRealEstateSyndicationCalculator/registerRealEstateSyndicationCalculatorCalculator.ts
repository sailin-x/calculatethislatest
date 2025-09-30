import { Calculator } from '../../engines/CalculatorEngine';
import { registerRealEstateSyndicationCalculatorInputs, registerRealEstateSyndicationCalculatorResults, registerRealEstateSyndicationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRealEstateSyndicationCalculatorCalculator implements Calculator<registerRealEstateSyndicationCalculatorInputs, registerRealEstateSyndicationCalculatorResults> {
  readonly id = 'registerRealEstateSyndicationCalculator';
  readonly name = 'registerRealEstateSyndicationCalculator Calculator';
  readonly description = 'Calculate registerRealEstateSyndicationCalculator values';

  calculate(inputs: registerRealEstateSyndicationCalculatorInputs): registerRealEstateSyndicationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRealEstateSyndicationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRealEstateSyndicationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
