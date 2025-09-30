import { Calculator } from '../../engines/CalculatorEngine';
import { brrrr_strategyCalculatorInputs, brrrr_strategyCalculatorResults, brrrr_strategyCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class brrrr_strategyCalculatorCalculator implements Calculator<brrrr_strategyCalculatorInputs, brrrr_strategyCalculatorResults> {
  readonly id = 'brrrr_strategyCalculator';
  readonly name = 'brrrr_strategyCalculator Calculator';
  readonly description = 'Calculate brrrr_strategyCalculator values';

  calculate(inputs: brrrr_strategyCalculatorInputs): brrrr_strategyCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: brrrr_strategyCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: brrrr_strategyCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
