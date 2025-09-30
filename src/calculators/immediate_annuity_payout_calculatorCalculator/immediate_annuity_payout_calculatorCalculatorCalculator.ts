import { Calculator } from '../../engines/CalculatorEngine';
import { immediate_annuity_payout_calculatorCalculatorInputs, immediate_annuity_payout_calculatorCalculatorResults, immediate_annuity_payout_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class immediate_annuity_payout_calculatorCalculatorCalculator implements Calculator<immediate_annuity_payout_calculatorCalculatorInputs, immediate_annuity_payout_calculatorCalculatorResults> {
  readonly id = 'immediate_annuity_payout_calculatorCalculator';
  readonly name = 'immediate_annuity_payout_calculatorCalculator Calculator';
  readonly description = 'Calculate immediate_annuity_payout_calculatorCalculator values';

  calculate(inputs: immediate_annuity_payout_calculatorCalculatorInputs): immediate_annuity_payout_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: immediate_annuity_payout_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: immediate_annuity_payout_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
