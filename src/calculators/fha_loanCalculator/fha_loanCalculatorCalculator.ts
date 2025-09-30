import { Calculator } from '../../engines/CalculatorEngine';
import { fha_loanCalculatorInputs, fha_loanCalculatorResults, fha_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fha_loanCalculatorCalculator implements Calculator<fha_loanCalculatorInputs, fha_loanCalculatorResults> {
  readonly id = 'fha_loanCalculator';
  readonly name = 'fha_loanCalculator Calculator';
  readonly description = 'Calculate fha_loanCalculator values';

  calculate(inputs: fha_loanCalculatorInputs): fha_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fha_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fha_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
