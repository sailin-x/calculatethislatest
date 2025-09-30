import { Calculator } from '../../engines/CalculatorEngine';
import { home_affordabilityCalculatorInputs, home_affordabilityCalculatorResults, home_affordabilityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_affordabilityCalculatorCalculator implements Calculator<home_affordabilityCalculatorInputs, home_affordabilityCalculatorResults> {
  readonly id = 'home_affordabilityCalculator';
  readonly name = 'home_affordabilityCalculator Calculator';
  readonly description = 'Calculate home_affordabilityCalculator values';

  calculate(inputs: home_affordabilityCalculatorInputs): home_affordabilityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_affordabilityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_affordabilityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
