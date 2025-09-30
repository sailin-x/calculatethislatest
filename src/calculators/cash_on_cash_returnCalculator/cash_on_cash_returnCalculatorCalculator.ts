import { Calculator } from '../../engines/CalculatorEngine';
import { cash_on_cash_returnCalculatorInputs, cash_on_cash_returnCalculatorResults, cash_on_cash_returnCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cash_on_cash_returnCalculatorCalculator implements Calculator<cash_on_cash_returnCalculatorInputs, cash_on_cash_returnCalculatorResults> {
  readonly id = 'cash_on_cash_returnCalculator';
  readonly name = 'cash_on_cash_returnCalculator Calculator';
  readonly description = 'Calculate cash_on_cash_returnCalculator values';

  calculate(inputs: cash_on_cash_returnCalculatorInputs): cash_on_cash_returnCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cash_on_cash_returnCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cash_on_cash_returnCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
