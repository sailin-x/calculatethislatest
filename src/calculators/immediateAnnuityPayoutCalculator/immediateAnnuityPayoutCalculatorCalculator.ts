import { Calculator } from '../../engines/CalculatorEngine';
import { immediateAnnuityPayoutCalculatorInputs, immediateAnnuityPayoutCalculatorResults, immediateAnnuityPayoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class immediateAnnuityPayoutCalculatorCalculator implements Calculator<immediateAnnuityPayoutCalculatorInputs, immediateAnnuityPayoutCalculatorResults> {
  readonly id = 'immediateAnnuityPayoutCalculator';
  readonly name = 'immediateAnnuityPayoutCalculator Calculator';
  readonly description = 'Calculate immediateAnnuityPayoutCalculator values';

  calculate(inputs: immediateAnnuityPayoutCalculatorInputs): immediateAnnuityPayoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: immediateAnnuityPayoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: immediateAnnuityPayoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
