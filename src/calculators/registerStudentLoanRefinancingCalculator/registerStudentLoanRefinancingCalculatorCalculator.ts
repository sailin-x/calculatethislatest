import { Calculator } from '../../engines/CalculatorEngine';
import { registerStudentLoanRefinancingCalculatorInputs, registerStudentLoanRefinancingCalculatorResults, registerStudentLoanRefinancingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerStudentLoanRefinancingCalculatorCalculator implements Calculator<registerStudentLoanRefinancingCalculatorInputs, registerStudentLoanRefinancingCalculatorResults> {
  readonly id = 'registerStudentLoanRefinancingCalculator';
  readonly name = 'registerStudentLoanRefinancingCalculator Calculator';
  readonly description = 'Calculate registerStudentLoanRefinancingCalculator values';

  calculate(inputs: registerStudentLoanRefinancingCalculatorInputs): registerStudentLoanRefinancingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerStudentLoanRefinancingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerStudentLoanRefinancingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
