import { Calculator } from '../../engines/CalculatorEngine';
import { bridge_loanCalculatorInputs, bridge_loanCalculatorResults, bridge_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bridge_loanCalculatorCalculator implements Calculator<bridge_loanCalculatorInputs, bridge_loanCalculatorResults> {
  readonly id = 'bridge_loanCalculator';
  readonly name = 'bridge_loanCalculator Calculator';
  readonly description = 'Calculate bridge_loanCalculator values';

  calculate(inputs: bridge_loanCalculatorInputs): bridge_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bridge_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bridge_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
