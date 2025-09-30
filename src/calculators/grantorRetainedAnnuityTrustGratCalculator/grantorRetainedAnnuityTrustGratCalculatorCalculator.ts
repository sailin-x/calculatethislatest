import { Calculator } from '../../engines/CalculatorEngine';
import { GrantorRetainedAnnuityTrustGratCalculatorInputs, GrantorRetainedAnnuityTrustGratCalculatorResults, GrantorRetainedAnnuityTrustGratCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class GrantorRetainedAnnuityTrustGratCalculatorCalculator implements Calculator<GrantorRetainedAnnuityTrustGratCalculatorInputs, GrantorRetainedAnnuityTrustGratCalculatorResults> {
  readonly id = 'GrantorRetainedAnnuityTrustGratCalculator';
  readonly name = 'GrantorRetainedAnnuityTrustGratCalculator Calculator';
  readonly description = 'Calculate GrantorRetainedAnnuityTrustGratCalculator values';

  calculate(inputs: GrantorRetainedAnnuityTrustGratCalculatorInputs): GrantorRetainedAnnuityTrustGratCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: GrantorRetainedAnnuityTrustGratCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: GrantorRetainedAnnuityTrustGratCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
