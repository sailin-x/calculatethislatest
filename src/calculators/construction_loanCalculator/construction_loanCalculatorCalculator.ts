import { Calculator } from '../../engines/CalculatorEngine';
import { construction_loanCalculatorInputs, construction_loanCalculatorResults, construction_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class construction_loanCalculatorCalculator implements Calculator<construction_loanCalculatorInputs, construction_loanCalculatorResults> {
  readonly id = 'construction_loanCalculator';
  readonly name = 'construction_loanCalculator Calculator';
  readonly description = 'Calculate construction_loanCalculator values';

  calculate(inputs: construction_loanCalculatorInputs): construction_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: construction_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: construction_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
