import { Calculator } from '../../engines/CalculatorEngine';
import { home_equity_loanCalculatorInputs, home_equity_loanCalculatorResults, home_equity_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_equity_loanCalculatorCalculator implements Calculator<home_equity_loanCalculatorInputs, home_equity_loanCalculatorResults> {
  readonly id = 'home_equity_loanCalculator';
  readonly name = 'home_equity_loanCalculator Calculator';
  readonly description = 'Calculate home_equity_loanCalculator values';

  calculate(inputs: home_equity_loanCalculatorInputs): home_equity_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_equity_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_equity_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
