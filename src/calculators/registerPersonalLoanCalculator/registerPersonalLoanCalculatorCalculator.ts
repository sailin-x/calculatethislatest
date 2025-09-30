import { Calculator } from '../../engines/CalculatorEngine';
import { registerPersonalLoanCalculatorInputs, registerPersonalLoanCalculatorResults, registerPersonalLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerPersonalLoanCalculatorCalculator implements Calculator<registerPersonalLoanCalculatorInputs, registerPersonalLoanCalculatorResults> {
  readonly id = 'registerPersonalLoanCalculator';
  readonly name = 'registerPersonalLoanCalculator Calculator';
  readonly description = 'Calculate registerPersonalLoanCalculator values';

  calculate(inputs: registerPersonalLoanCalculatorInputs): registerPersonalLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerPersonalLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerPersonalLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
