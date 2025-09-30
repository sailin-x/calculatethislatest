import { Calculator } from '../../engines/CalculatorEngine';
import { StudentLoanRepaymentCalculatorInputs, StudentLoanRepaymentCalculatorResults, StudentLoanRepaymentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class StudentLoanRepaymentCalculatorCalculator implements Calculator<StudentLoanRepaymentCalculatorInputs, StudentLoanRepaymentCalculatorResults> {
  readonly id = 'StudentLoanRepaymentCalculator';
  readonly name = 'StudentLoanRepaymentCalculator Calculator';
  readonly description = 'Calculate StudentLoanRepaymentCalculator values';

  calculate(inputs: StudentLoanRepaymentCalculatorInputs): StudentLoanRepaymentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: StudentLoanRepaymentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: StudentLoanRepaymentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
