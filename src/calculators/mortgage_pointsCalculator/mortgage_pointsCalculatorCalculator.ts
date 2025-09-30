import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_pointsCalculatorInputs, mortgage_pointsCalculatorResults, mortgage_pointsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_pointsCalculatorCalculator implements Calculator<mortgage_pointsCalculatorInputs, mortgage_pointsCalculatorResults> {
  readonly id = 'mortgage_pointsCalculator';
  readonly name = 'mortgage_pointsCalculator Calculator';
  readonly description = 'Calculate mortgage_pointsCalculator values';

  calculate(inputs: mortgage_pointsCalculatorInputs): mortgage_pointsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_pointsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_pointsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
