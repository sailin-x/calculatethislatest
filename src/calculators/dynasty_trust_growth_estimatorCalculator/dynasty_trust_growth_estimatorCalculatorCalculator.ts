import { Calculator } from '../../engines/CalculatorEngine';
import { dynasty_trust_growth_estimatorCalculatorInputs, dynasty_trust_growth_estimatorCalculatorResults, dynasty_trust_growth_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dynasty_trust_growth_estimatorCalculatorCalculator implements Calculator<dynasty_trust_growth_estimatorCalculatorInputs, dynasty_trust_growth_estimatorCalculatorResults> {
  readonly id = 'dynasty_trust_growth_estimatorCalculator';
  readonly name = 'dynasty_trust_growth_estimatorCalculator Calculator';
  readonly description = 'Calculate dynasty_trust_growth_estimatorCalculator values';

  calculate(inputs: dynasty_trust_growth_estimatorCalculatorInputs): dynasty_trust_growth_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dynasty_trust_growth_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dynasty_trust_growth_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
