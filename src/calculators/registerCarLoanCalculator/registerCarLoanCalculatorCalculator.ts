import { Calculator } from '../../engines/CalculatorEngine';
import { registerCarLoanCalculatorInputs, registerCarLoanCalculatorResults, registerCarLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCarLoanCalculatorCalculator implements Calculator<registerCarLoanCalculatorInputs, registerCarLoanCalculatorResults> {
  readonly id = 'registerCarLoanCalculator';
  readonly name = 'registerCarLoanCalculator Calculator';
  readonly description = 'Calculate registerCarLoanCalculator values';

  calculate(inputs: registerCarLoanCalculatorInputs): registerCarLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCarLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCarLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
