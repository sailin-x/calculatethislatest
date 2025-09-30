import { Calculator } from '../../engines/CalculatorEngine';
import { 401k_planCalculatorInputs, 401k_planCalculatorResults, 401k_planCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class 401k_planCalculatorCalculator implements Calculator<401k_planCalculatorInputs, 401k_planCalculatorResults> {
  readonly id = '401k_planCalculator';
  readonly name = '401k_planCalculator Calculator';
  readonly description = 'Calculate 401k_planCalculator values';

  calculate(inputs: 401k_planCalculatorInputs): 401k_planCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: 401k_planCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: 401k_planCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
