import { Calculator } from '../../engines/CalculatorEngine';
import { GiftTaxCalculatorInputs, GiftTaxCalculatorResults, GiftTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class GiftTaxCalculatorCalculator implements Calculator<GiftTaxCalculatorInputs, GiftTaxCalculatorResults> {
  readonly id = 'GiftTaxCalculator';
  readonly name = 'GiftTaxCalculator Calculator';
  readonly description = 'Calculate GiftTaxCalculator values';

  calculate(inputs: GiftTaxCalculatorInputs): GiftTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: GiftTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: GiftTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
