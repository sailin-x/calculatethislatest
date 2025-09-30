import { Calculator } from '../../engines/CalculatorEngine';
import { registerPensionLumpSumVsAnnuityCalculatorInputs, registerPensionLumpSumVsAnnuityCalculatorResults, registerPensionLumpSumVsAnnuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerPensionLumpSumVsAnnuityCalculatorCalculator implements Calculator<registerPensionLumpSumVsAnnuityCalculatorInputs, registerPensionLumpSumVsAnnuityCalculatorResults> {
  readonly id = 'registerPensionLumpSumVsAnnuityCalculator';
  readonly name = 'registerPensionLumpSumVsAnnuityCalculator Calculator';
  readonly description = 'Calculate registerPensionLumpSumVsAnnuityCalculator values';

  calculate(inputs: registerPensionLumpSumVsAnnuityCalculatorInputs): registerPensionLumpSumVsAnnuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerPensionLumpSumVsAnnuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerPensionLumpSumVsAnnuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
