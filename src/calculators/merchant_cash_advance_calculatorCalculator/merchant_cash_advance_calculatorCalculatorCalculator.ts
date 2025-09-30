import { Calculator } from '../../engines/CalculatorEngine';
import { merchant_cash_advance_calculatorCalculatorInputs, merchant_cash_advance_calculatorCalculatorResults, merchant_cash_advance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class merchant_cash_advance_calculatorCalculatorCalculator implements Calculator<merchant_cash_advance_calculatorCalculatorInputs, merchant_cash_advance_calculatorCalculatorResults> {
  readonly id = 'merchant_cash_advance_calculatorCalculator';
  readonly name = 'merchant_cash_advance_calculatorCalculator Calculator';
  readonly description = 'Calculate merchant_cash_advance_calculatorCalculator values';

  calculate(inputs: merchant_cash_advance_calculatorCalculatorInputs): merchant_cash_advance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: merchant_cash_advance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: merchant_cash_advance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
