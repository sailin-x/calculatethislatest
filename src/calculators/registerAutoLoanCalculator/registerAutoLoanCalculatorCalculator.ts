import { Calculator } from '../../engines/CalculatorEngine';
import { registerAutoLoanCalculatorInputs, registerAutoLoanCalculatorResults, registerAutoLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerAutoLoanCalculatorCalculator implements Calculator<registerAutoLoanCalculatorInputs, registerAutoLoanCalculatorResults> {
  readonly id = 'registerAutoLoanCalculator';
  readonly name = 'registerAutoLoanCalculator Calculator';
  readonly description = 'Calculate registerAutoLoanCalculator values';

  calculate(inputs: registerAutoLoanCalculatorInputs): registerAutoLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerAutoLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerAutoLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
