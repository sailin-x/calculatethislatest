import { Calculator } from '../../engines/CalculatorEngine';
import { payday_loan_calculatorCalculatorInputs, payday_loan_calculatorCalculatorResults, payday_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class payday_loan_calculatorCalculatorCalculator implements Calculator<payday_loan_calculatorCalculatorInputs, payday_loan_calculatorCalculatorResults> {
  readonly id = 'payday_loan_calculatorCalculator';
  readonly name = 'payday_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate payday_loan_calculatorCalculator values';

  calculate(inputs: payday_loan_calculatorCalculatorInputs): payday_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: payday_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: payday_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
