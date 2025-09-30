import { Calculator } from '../../engines/CalculatorEngine';
import { cash_flowCalculatorInputs, cash_flowCalculatorResults, cash_flowCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cash_flowCalculatorCalculator implements Calculator<cash_flowCalculatorInputs, cash_flowCalculatorResults> {
  readonly id = 'cash_flowCalculator';
  readonly name = 'cash_flowCalculator Calculator';
  readonly description = 'Calculate cash_flowCalculator values';

  calculate(inputs: cash_flowCalculatorInputs): cash_flowCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cash_flowCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cash_flowCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
