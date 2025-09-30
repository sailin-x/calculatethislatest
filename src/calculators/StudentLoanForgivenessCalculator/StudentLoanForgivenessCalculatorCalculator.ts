import { Calculator } from '../../engines/CalculatorEngine';
import { StudentLoanForgivenessCalculatorInputs, StudentLoanForgivenessCalculatorResults, StudentLoanForgivenessCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class StudentLoanForgivenessCalculatorCalculator implements Calculator<StudentLoanForgivenessCalculatorInputs, StudentLoanForgivenessCalculatorResults> {
  readonly id = 'StudentLoanForgivenessCalculator';
  readonly name = 'StudentLoanForgivenessCalculator Calculator';
  readonly description = 'Calculate StudentLoanForgivenessCalculator values';

  calculate(inputs: StudentLoanForgivenessCalculatorInputs): StudentLoanForgivenessCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: StudentLoanForgivenessCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: StudentLoanForgivenessCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
