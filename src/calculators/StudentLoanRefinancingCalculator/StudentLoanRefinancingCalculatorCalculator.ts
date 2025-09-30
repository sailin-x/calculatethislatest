import { Calculator } from '../../engines/CalculatorEngine';
import { StudentLoanRefinancingCalculatorInputs, StudentLoanRefinancingCalculatorResults, StudentLoanRefinancingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class StudentLoanRefinancingCalculatorCalculator implements Calculator<StudentLoanRefinancingCalculatorInputs, StudentLoanRefinancingCalculatorResults> {
  readonly id = 'StudentLoanRefinancingCalculator';
  readonly name = 'StudentLoanRefinancingCalculator Calculator';
  readonly description = 'Calculate StudentLoanRefinancingCalculator values';

  calculate(inputs: StudentLoanRefinancingCalculatorInputs): StudentLoanRefinancingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: StudentLoanRefinancingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: StudentLoanRefinancingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
