import { Calculator } from '../../engines/CalculatorEngine';
import { charitable_gift_annuityCalculatorInputs, charitable_gift_annuityCalculatorResults, charitable_gift_annuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class charitable_gift_annuityCalculatorCalculator implements Calculator<charitable_gift_annuityCalculatorInputs, charitable_gift_annuityCalculatorResults> {
  readonly id = 'charitable_gift_annuityCalculator';
  readonly name = 'charitable_gift_annuityCalculator Calculator';
  readonly description = 'Calculate charitable_gift_annuityCalculator values';

  calculate(inputs: charitable_gift_annuityCalculatorInputs): charitable_gift_annuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: charitable_gift_annuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: charitable_gift_annuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
