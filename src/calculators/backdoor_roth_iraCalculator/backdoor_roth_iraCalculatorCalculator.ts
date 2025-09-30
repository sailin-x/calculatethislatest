import { Calculator } from '../../engines/CalculatorEngine';
import { backdoor_roth_iraCalculatorInputs, backdoor_roth_iraCalculatorResults, backdoor_roth_iraCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class backdoor_roth_iraCalculatorCalculator implements Calculator<backdoor_roth_iraCalculatorInputs, backdoor_roth_iraCalculatorResults> {
  readonly id = 'backdoor_roth_iraCalculator';
  readonly name = 'backdoor_roth_iraCalculator Calculator';
  readonly description = 'Calculate backdoor_roth_iraCalculator values';

  calculate(inputs: backdoor_roth_iraCalculatorInputs): backdoor_roth_iraCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: backdoor_roth_iraCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: backdoor_roth_iraCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
