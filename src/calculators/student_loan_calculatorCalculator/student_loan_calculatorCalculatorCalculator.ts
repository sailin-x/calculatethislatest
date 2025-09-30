import { Calculator } from '../../engines/CalculatorEngine';
import { student_loan_calculatorCalculatorInputs, student_loan_calculatorCalculatorResults, student_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class student_loan_calculatorCalculatorCalculator implements Calculator<student_loan_calculatorCalculatorInputs, student_loan_calculatorCalculatorResults> {
  readonly id = 'student_loan_calculatorCalculator';
  readonly name = 'student_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate student_loan_calculatorCalculator values';

  calculate(inputs: student_loan_calculatorCalculatorInputs): student_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: student_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: student_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
