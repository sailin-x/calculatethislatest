import { Calculator } from '../../engines/CalculatorEngine';
import { title_loan_calculatorCalculatorInputs, title_loan_calculatorCalculatorResults, title_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class title_loan_calculatorCalculatorCalculator implements Calculator<title_loan_calculatorCalculatorInputs, title_loan_calculatorCalculatorResults> {
  readonly id = 'title_loan_calculatorCalculator';
  readonly name = 'title_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate title_loan_calculatorCalculator values';

  calculate(inputs: title_loan_calculatorCalculatorInputs): title_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: title_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: title_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
