import { Calculator } from '../../engines/CalculatorEngine';
import { currency_exchange_cost_calculatorCalculatorInputs, currency_exchange_cost_calculatorCalculatorResults, currency_exchange_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class currency_exchange_cost_calculatorCalculatorCalculator implements Calculator<currency_exchange_cost_calculatorCalculatorInputs, currency_exchange_cost_calculatorCalculatorResults> {
  readonly id = 'currency_exchange_cost_calculatorCalculator';
  readonly name = 'currency_exchange_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate currency_exchange_cost_calculatorCalculator values';

  calculate(inputs: currency_exchange_cost_calculatorCalculatorInputs): currency_exchange_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: currency_exchange_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: currency_exchange_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
