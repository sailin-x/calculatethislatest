import { Calculator } from '../../engines/CalculatorEngine';
import { personalLoanCalculatorInputs, personalLoanCalculatorResults, personalLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class personalLoanCalculatorCalculator implements Calculator<personalLoanCalculatorInputs, personalLoanCalculatorResults> {
  readonly id = 'personalLoanCalculator';
  readonly name = 'personalLoanCalculator Calculator';
  readonly description = 'Calculate personalLoanCalculator values';

  calculate(inputs: personalLoanCalculatorInputs): personalLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: personalLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: personalLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
