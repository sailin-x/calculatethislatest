import { Calculator } from '../../engines/CalculatorEngine';
import { registerGrantorRetainedAnnuityTrustGratCalculatorInputs, registerGrantorRetainedAnnuityTrustGratCalculatorResults, registerGrantorRetainedAnnuityTrustGratCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerGrantorRetainedAnnuityTrustGratCalculatorCalculator implements Calculator<registerGrantorRetainedAnnuityTrustGratCalculatorInputs, registerGrantorRetainedAnnuityTrustGratCalculatorResults> {
  readonly id = 'registerGrantorRetainedAnnuityTrustGratCalculator';
  readonly name = 'registerGrantorRetainedAnnuityTrustGratCalculator Calculator';
  readonly description = 'Calculate registerGrantorRetainedAnnuityTrustGratCalculator values';

  calculate(inputs: registerGrantorRetainedAnnuityTrustGratCalculatorInputs): registerGrantorRetainedAnnuityTrustGratCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerGrantorRetainedAnnuityTrustGratCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerGrantorRetainedAnnuityTrustGratCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
