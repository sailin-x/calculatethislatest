import { Calculator } from '../../engines/CalculatorEngine';
import { autoLoanCalculatorInputs, autoLoanCalculatorResults, autoLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class autoLoanCalculatorCalculator implements Calculator<autoLoanCalculatorInputs, autoLoanCalculatorResults> {
  readonly id = 'autoLoanCalculator';
  readonly name = 'autoLoanCalculator Calculator';
  readonly description = 'Calculate autoLoanCalculator values';

  calculate(inputs: autoLoanCalculatorInputs): autoLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: autoLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: autoLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
