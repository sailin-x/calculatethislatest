import { Calculator } from '../../engines/CalculatorEngine';
import { registerImmediateAnnuityPayoutCalculatorInputs, registerImmediateAnnuityPayoutCalculatorResults, registerImmediateAnnuityPayoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerImmediateAnnuityPayoutCalculatorCalculator implements Calculator<registerImmediateAnnuityPayoutCalculatorInputs, registerImmediateAnnuityPayoutCalculatorResults> {
  readonly id = 'registerImmediateAnnuityPayoutCalculator';
  readonly name = 'registerImmediateAnnuityPayoutCalculator Calculator';
  readonly description = 'Calculate registerImmediateAnnuityPayoutCalculator values';

  calculate(inputs: registerImmediateAnnuityPayoutCalculatorInputs): registerImmediateAnnuityPayoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerImmediateAnnuityPayoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerImmediateAnnuityPayoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
