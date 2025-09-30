import { Calculator } from '../../engines/CalculatorEngine';
import { registerStudentLoanRepaymentCalculatorInputs, registerStudentLoanRepaymentCalculatorResults, registerStudentLoanRepaymentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerStudentLoanRepaymentCalculatorCalculator implements Calculator<registerStudentLoanRepaymentCalculatorInputs, registerStudentLoanRepaymentCalculatorResults> {
  readonly id = 'registerStudentLoanRepaymentCalculator';
  readonly name = 'registerStudentLoanRepaymentCalculator Calculator';
  readonly description = 'Calculate registerStudentLoanRepaymentCalculator values';

  calculate(inputs: registerStudentLoanRepaymentCalculatorInputs): registerStudentLoanRepaymentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerStudentLoanRepaymentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerStudentLoanRepaymentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
