import { Calculator } from '../../engines/CalculatorEngine';
import { personal_loan_calculatorCalculatorInputs, personal_loan_calculatorCalculatorResults, personal_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class personal_loan_calculatorCalculatorCalculator implements Calculator<personal_loan_calculatorCalculatorInputs, personal_loan_calculatorCalculatorResults> {
  readonly id = 'personal_loan_calculatorCalculator';
  readonly name = 'personal_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate personal_loan_calculatorCalculator values';

  calculate(inputs: personal_loan_calculatorCalculatorInputs): personal_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: personal_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: personal_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
