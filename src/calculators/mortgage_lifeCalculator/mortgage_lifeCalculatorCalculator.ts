import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_lifeCalculatorInputs, mortgage_lifeCalculatorResults, mortgage_lifeCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_lifeCalculatorCalculator implements Calculator<mortgage_lifeCalculatorInputs, mortgage_lifeCalculatorResults> {
  readonly id = 'mortgage_lifeCalculator';
  readonly name = 'mortgage_lifeCalculator Calculator';
  readonly description = 'Calculate mortgage_lifeCalculator values';

  calculate(inputs: mortgage_lifeCalculatorInputs): mortgage_lifeCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_lifeCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_lifeCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
