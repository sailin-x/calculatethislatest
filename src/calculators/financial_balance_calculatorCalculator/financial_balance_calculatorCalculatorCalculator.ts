import { Calculator } from '../../engines/CalculatorEngine';
import { financial_balance_calculatorCalculatorInputs, financial_balance_calculatorCalculatorResults, financial_balance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_balance_calculatorCalculatorCalculator implements Calculator<financial_balance_calculatorCalculatorInputs, financial_balance_calculatorCalculatorResults> {
  readonly id = 'financial_balance_calculatorCalculator';
  readonly name = 'financial_balance_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_balance_calculatorCalculator values';

  calculate(inputs: financial_balance_calculatorCalculatorInputs): financial_balance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_balance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_balance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
