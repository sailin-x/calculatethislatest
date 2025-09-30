import { Calculator } from '../../engines/CalculatorEngine';
import { jumbo_loanCalculatorInputs, jumbo_loanCalculatorResults, jumbo_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class jumbo_loanCalculatorCalculator implements Calculator<jumbo_loanCalculatorInputs, jumbo_loanCalculatorResults> {
  readonly id = 'jumbo_loanCalculator';
  readonly name = 'jumbo_loanCalculator Calculator';
  readonly description = 'Calculate jumbo_loanCalculator values';

  calculate(inputs: jumbo_loanCalculatorInputs): jumbo_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: jumbo_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: jumbo_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
