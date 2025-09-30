import { Calculator } from '../../engines/CalculatorEngine';
import { student_loanCalculatorInputs, student_loanCalculatorResults, student_loanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class student_loanCalculatorCalculator implements Calculator<student_loanCalculatorInputs, student_loanCalculatorResults> {
  readonly id = 'student_loanCalculator';
  readonly name = 'student_loanCalculator Calculator';
  readonly description = 'Calculate student_loanCalculator values';

  calculate(inputs: student_loanCalculatorInputs): student_loanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: student_loanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: student_loanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
