import { Calculator } from '../../engines/CalculatorEngine';
import { flexible_spending_account_calculatorCalculatorInputs, flexible_spending_account_calculatorCalculatorResults, flexible_spending_account_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flexible_spending_account_calculatorCalculatorCalculator implements Calculator<flexible_spending_account_calculatorCalculatorInputs, flexible_spending_account_calculatorCalculatorResults> {
  readonly id = 'flexible_spending_account_calculatorCalculator';
  readonly name = 'flexible_spending_account_calculatorCalculator Calculator';
  readonly description = 'Calculate flexible_spending_account_calculatorCalculator values';

  calculate(inputs: flexible_spending_account_calculatorCalculatorInputs): flexible_spending_account_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flexible_spending_account_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flexible_spending_account_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
