import { Calculator } from '../../engines/CalculatorEngine';
import { auto_loan_calculatorCalculatorInputs, auto_loan_calculatorCalculatorResults, auto_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class auto_loan_calculatorCalculatorCalculator implements Calculator<auto_loan_calculatorCalculatorInputs, auto_loan_calculatorCalculatorResults> {
  readonly id = 'auto_loan_calculatorCalculator';
  readonly name = 'auto_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate auto_loan_calculatorCalculator values';

  calculate(inputs: auto_loan_calculatorCalculatorInputs): auto_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: auto_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: auto_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
