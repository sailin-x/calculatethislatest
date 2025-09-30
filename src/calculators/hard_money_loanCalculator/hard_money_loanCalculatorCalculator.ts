import { Calculator } from '../../engines/CalculatorEngine';
import { hard_money_loanCalculatorInputs, hard_money_loanCalculatorResults, hard_money_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hard_money_loanCalculatorCalculator implements Calculator<hard_money_loanCalculatorInputs, hard_money_loanCalculatorResults> {
  readonly id = 'hard_money_loanCalculator';
  readonly name = 'hard_money_loanCalculator Calculator';
  readonly description = 'Calculate hard_money_loanCalculator values';

  calculate(inputs: hard_money_loanCalculatorInputs): hard_money_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hard_money_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hard_money_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
