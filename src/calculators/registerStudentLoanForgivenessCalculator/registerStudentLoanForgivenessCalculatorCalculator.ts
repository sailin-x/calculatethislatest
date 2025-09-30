import { Calculator } from '../../engines/CalculatorEngine';
import { registerStudentLoanForgivenessCalculatorInputs, registerStudentLoanForgivenessCalculatorResults, registerStudentLoanForgivenessCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerStudentLoanForgivenessCalculatorCalculator implements Calculator<registerStudentLoanForgivenessCalculatorInputs, registerStudentLoanForgivenessCalculatorResults> {
  readonly id = 'registerStudentLoanForgivenessCalculator';
  readonly name = 'registerStudentLoanForgivenessCalculator Calculator';
  readonly description = 'Calculate registerStudentLoanForgivenessCalculator values';

  calculate(inputs: registerStudentLoanForgivenessCalculatorInputs): registerStudentLoanForgivenessCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerStudentLoanForgivenessCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerStudentLoanForgivenessCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
