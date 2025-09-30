import { Calculator } from '../../engines/CalculatorEngine';
import { cost_segregation_depreciationCalculatorInputs, cost_segregation_depreciationCalculatorResults, cost_segregation_depreciationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cost_segregation_depreciationCalculatorCalculator implements Calculator<cost_segregation_depreciationCalculatorInputs, cost_segregation_depreciationCalculatorResults> {
  readonly id = 'cost_segregation_depreciationCalculator';
  readonly name = 'cost_segregation_depreciationCalculator Calculator';
  readonly description = 'Calculate cost_segregation_depreciationCalculator values';

  calculate(inputs: cost_segregation_depreciationCalculatorInputs): cost_segregation_depreciationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cost_segregation_depreciationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cost_segregation_depreciationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
