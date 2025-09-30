import { Calculator } from '../../engines/CalculatorEngine';
import { realEstateSyndicationCalculatorInputs, realEstateSyndicationCalculatorResults, realEstateSyndicationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class realEstateSyndicationCalculatorCalculator implements Calculator<realEstateSyndicationCalculatorInputs, realEstateSyndicationCalculatorResults> {
  readonly id = 'realEstateSyndicationCalculator';
  readonly name = 'realEstateSyndicationCalculator Calculator';
  readonly description = 'Calculate realEstateSyndicationCalculator values';

  calculate(inputs: realEstateSyndicationCalculatorInputs): realEstateSyndicationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: realEstateSyndicationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: realEstateSyndicationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
