import { Calculator } from '../../engines/CalculatorEngine';
import { customer_lifetime_valueCalculatorInputs, customer_lifetime_valueCalculatorResults, customer_lifetime_valueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class customer_lifetime_valueCalculatorCalculator implements Calculator<customer_lifetime_valueCalculatorInputs, customer_lifetime_valueCalculatorResults> {
  readonly id = 'customer_lifetime_valueCalculator';
  readonly name = 'customer_lifetime_valueCalculator Calculator';
  readonly description = 'Calculate customer_lifetime_valueCalculator values';

  calculate(inputs: customer_lifetime_valueCalculatorInputs): customer_lifetime_valueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: customer_lifetime_valueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: customer_lifetime_valueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
